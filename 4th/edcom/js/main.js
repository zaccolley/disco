var camera, scene, renderer;
var effect, controls;
var element, container;

var recognition;

var right, wrong;

var clock = new THREE.Clock();

document.addEventListener('DOMContentLoaded', function(event) {
  recog();
  init();
  animate();
});

function recog() {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
  var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

  var words = ['perro', 'chorizo', 'hola'];

  var grammar = '#JSGF V1.0; grammar words; public <word> = ' + words.join(' | ') + ';';
  recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  // recognition.continuous = false;
  // recognition.lang = 'en-US';
  recognition.lang = 'es-ES';
  // recognition.interimResults = false;
  // recognition.maxAlternatives = 1;

  document.body.onclick = function() {
    recognition.start();
    console.log('listening');
  }

  recognition.onresult = function(event) {
    console.log(event);
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The first [0] returns the SpeechRecognitionResult at position 0.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The second [0] returns the SpeechRecognitionAlternative at position 0.
    // We then Rreturn the transcript property of the SpeechRecognitionAlternative object
    var result = event.results[0][0].transcript;
    console.log('Result received: ' + result + '. Confidence: ' + event.results[0][0].confidence);
  };

  recognition.onspeechend = function() {
    recognition.stop();
    console.log('speechend');
  };

  recognition.onnomatch = function(event) {
    console.log('I didnt recognise that word.');
  };

  recognition.onerror = function(event) {
    console.log('Error occurred in recognition: ' + event.error);
  };
}

function init() {
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000);
  element = renderer.domElement;
  container = document.getElementById('container');
  container.appendChild(element);

  effect = new THREE.StereoEffect(renderer);

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.05);

  camera = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
  camera.position.set(0, 12, 0);
  scene.add(camera);

  controls = new THREE.OrbitControls(camera, element);
  controls.rotateUp(Math.PI / 4);
  controls.target.set(
    camera.position.x + 0.1,
    camera.position.y,
    camera.position.z
  );
  controls.noZoom = true;
  controls.noPan = true;

  function setOrientationControls(e) {
    if (!e.alpha) {
      return;
    }

    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();

    document.querySelector('canvas').addEventListener('click', fullscreen);

    window.removeEventListener('deviceorientation', setOrientationControls, true);
  }
  window.addEventListener('deviceorientation', setOrientationControls, true);

  // lights
  var light = new THREE.HemisphereLight(0xffffff, 0x000000, 0.6);
  scene.add(light);

  // floor
  var texture = new THREE.TextureLoader().load('images/patterns/hardwood.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat = new THREE.Vector2(50, 50);
  texture.anisotropy = renderer.getMaxAnisotropy();

  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 100,
    shading: THREE.SmoothShading,
    map: texture
  });

  var geometry = new THREE.PlaneGeometry(1000, 1000);

  var mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;

  scene.add(mesh);

  // image

  var texture = new THREE.TextureLoader().load('images/elhombre.png');

  var geometry = new THREE.PlaneGeometry(2, 2);
  var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.FrontSide});
  var mesh = new THREE.Mesh(geometry, material);
  mesh.applyMatrix( new THREE.Matrix4().makeTranslation(3, 12, 0) );
  mesh.rotation.x = 0;
  mesh.rotation.y = 4.5;
  mesh.rotation.z = 0;

  right = function() {
    new Audio('sounds/right_answer.mp3').play();

    mesh.material.map = new THREE.TextureLoader().load('images/elhombre--good.png');
    mesh.material.needsUpdate = true;
  }

  wrong = function() {
    new Audio('sounds/wrong_answer.mp3').play();

    mesh.material.map = new THREE.TextureLoader().load('images/elhombre--bad.png');
    mesh.material.needsUpdate = true;
  }

  scene.add(mesh);

  // on resize do some shit

  window.addEventListener('resize', resize, false);
  setTimeout(resize, 1);
}

function resize() {
  var width = container.offsetWidth;
  var height = container.offsetHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  effect.setSize(width, height);
}

function update(dt) {
  resize();

  camera.updateProjectionMatrix();

  controls.update(dt);
}

function render(dt) {
  effect.render(scene, camera);
}

function animate(t) {
  requestAnimationFrame(animate);

  update(clock.getDelta());
  render(clock.getDelta());
}

function fullscreen() {
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.msRequestFullscreen) {
    container.msRequestFullscreen();
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  }
}
