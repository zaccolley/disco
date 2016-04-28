var camera, scene, renderer;
var effect, controls;
var element, container;

var recognition;

var right, wrong;

var pictureMesh;

var vocab = [
  { spanish: "ano", english: "year" },
  { spanish: "casa", english: "house" },
  { spanish: "hombre", english: "man" },
  { spanish: "mano", english: "hand" },
  { spanish: "tiempo", english: "time" },
];

var vocabPosition = 0;

var text = vocab[vocabPosition].english;
var textColour = 0xffffff;
var changeText;
var generateTextGeometry;

var clock = new THREE.Clock();

document.addEventListener('DOMContentLoaded', function(event) {
  var menuEl = document.querySelector('.menu');
  var startButtonEl = document.querySelector('.start-button');
  container = document.getElementById('container');

  startButtonEl.addEventListener('click', function(event) {
    menuEl.style.display = 'none'; // hide the menu

    fullscreen();
    init();
    recog();
    animate();
  });
});

function nextVocab() {
  vocabPosition++;
  if (vocabPosition > vocab.length - 1) {
    vocabPosition = 0;
  }

  textColour = 0xffffff;
  updateTextColour();

  text = vocab[vocabPosition].english;
  generateTextGeometry();
  updateImage();
}

// http://dense13.com/blog/2009/05/03/converting-string-to-slug-javascript/
function convertToASCII(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

changeText = function (newText) {
  text = newText;
  console.log('text', text);
  console.log('vocab[vocabPosition]', vocab[vocabPosition].spanish);
  if (text.toLowerCase().indexOf(vocab[vocabPosition].spanish) !== -1) {
    right();
    textColour = 0x00ff00;
    updateTextColour();
    setTimeout(function() {
      nextVocab();
    }, 1500);
  } else {
    textColour = 0xff0000;
    updateTextColour();
    wrong();
  }
  generateTextGeometry();
}

function recog() {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
  var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

  var words = vocab.map(function(word){ return word.spanish });
  console.log(words);

  var grammar = '#JSGF V1.0; grammar words; public <word> = ' + words.join(' | ') + ';';
  recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition = new SpeechRecognition();
  recognition.lang = 'es-ES';
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  function resetRecog() {
    console.log('stopping');
    recognition.stop();
    setTimeout(function() {
      console.log('restarting');
      recognition.start();
    }, 1500);
  }

  recognition.onstart = function() {
    console.log('starting');
  };

  recognition.onresult = function(event) {
    var result = event.results[0][0].transcript;
    console.log('Result received: ' + result + '. Confidence: ' + event.results[0][0].confidence);

    changeText(convertToASCII(result));

    resetRecog();
  };

  recognition.onnomatch = function(event) {
    console.log('I didnt recognise that word.');

    changeText('Try again!');

    resetRecog();
  };

  recognition.onspeechend = function() {
    console.log('speechend');
  };

  recognition.onerror = function(event) {
    console.log('Error occurred in recognition: ' + event.error);
  };

  setTimeout(function() {
    recognition.start();
  }, 1000);
}

function updateGroupGeometry(mesh, geometry) {
	mesh.children[0].geometry.dispose();
	mesh.children[1].geometry.dispose();

	mesh.children[0].geometry = new THREE.WireframeGeometry(geometry);
	mesh.children[1].geometry = geometry;

	// these do not update nicely together if shared
}

function init() {
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000);
  element = renderer.domElement;
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

  var texture = new THREE.TextureLoader().load('images/' + vocab[vocabPosition].spanish + '.png');

  var geometry = new THREE.PlaneGeometry(2, 2);
  var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.FrontSide});
  pictureMesh = new THREE.Mesh(geometry, material);
  pictureMesh.applyMatrix( new THREE.Matrix4().makeTranslation(5, 12, 0) );
  pictureMesh.rotation.x = 0;
  pictureMesh.rotation.y = 4.5;
  pictureMesh.rotation.z = 0;

  updateImage = function() {
    pictureMesh.material.map = new THREE.TextureLoader().load('images/' + vocab[vocabPosition].spanish + '.png');
    pictureMesh.material.needsUpdate = true;
  }

  right = function() {
    new Audio('sounds/right_answer.mp3').play();
  }

  wrong = function() {
    new Audio('sounds/wrong_answer.mp3').play();
  }

  scene.add(pictureMesh);

  // text result

  var mesh = new THREE.Object3D();

  mesh.add(new THREE.LineSegments(

    new THREE.Geometry(),

    new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0
    })

  ));

  var textMesh = new THREE.Mesh(

    new THREE.Geometry(),

    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      shading: THREE.FlatShading
    })

  );

  mesh.add(textMesh);

  updateTextColour = function () {
    textMesh.material.color.setHex(textColour);
  };

  mesh.applyMatrix( new THREE.Matrix4().makeTranslation(5, 10, 0) );
  mesh.rotation.x = 0;
  mesh.rotation.y = 4.5;
  mesh.rotation.z = 0;

  generateTextGeometry = function() {
    var loader = new THREE.FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.js', function(font) {
      var geometry = new THREE.TextGeometry(text, {
        font: font,
        size: 1,
        height: 0.1,
        curveSegments: 12,
      });
      geometry.center();

      updateGroupGeometry( mesh, geometry );
    });
  }

  generateTextGeometry();

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
