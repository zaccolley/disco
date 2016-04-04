var gl;
var canvas;
var state = {
  keysPressed: [], // keep track of pressed down keys in a list
  imagesLoading: [],
  rotation: {
    x: 0,
    y: 0,
    z: 0
  },
  translation: {
    y: 0,
    z: 0
  },
  offset: {
    y: 0,
    z: 0
  },
  dragging: false
};

var shaderVertex = `
  attribute vec3 aVertexPosition;
  attribute vec3 aVertexNormal;
  attribute vec2 aTextureCoordinates;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  uniform mat3 uNMatrix;

  uniform vec3 uLightPosition;
  uniform vec3 uAmbientLightColor;
  uniform vec3 uDiffuseLightColor;
  uniform vec3 uSpecularLightColor;

  varying vec2 vTextureCoordinates;
  varying vec3 vLightWeighting;

  const float shininess = 32.0;

  void main() {
    // get the vertex position in eye coordinates
    vec4 vertexPositionEye4 = uMVMatrix * vec4(aVertexPosition, 1.0);
    vec3 vertexPositionEye3 = vertexPositionEye4.xyz / vertexPositionEye4.w;

    // calculate the vector (L) to the light source
    vec3 vectorToLightSource = normalize(uLightPosition - vertexPositionEye3);

    // transform the normal (N) to eye coordinates
    vec3 normalEye = normalize(uNMatrix * aVertexNormal);

    // calculate N dot L for diffuse lighting
    float diffuseLightWeighting = max(dot(normalEye, vectorToLightSource), 0.0);

    // calculate the reflection vector (R) that is needed for specular light
    vec3 reflectionVector = normalize(reflect(-vectorToLightSource, normalEye));

    // the camera in eye coordinates is located in the origin and is pointing along the negative z-axis. Calculate view vector (V) in eye coordinates as: (0.0, 0.0, 0.0) - vertexPositionEye3
    vec3 viewVectorEye = -normalize(vertexPositionEye3);

    float rdotv = max(dot(reflectionVector, viewVectorEye), 0.0);

    float specularLightWeighting = pow(rdotv, shininess);

    // sum up all three reflection components and send to the fragment shader
    vLightWeighting = uAmbientLightColor + uDiffuseLightColor * diffuseLightWeighting + uSpecularLightColor * specularLightWeighting;

    // finally transform the geometry
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoordinates = aTextureCoordinates;
  }
`;

var shaderFragment = `
  precision mediump float;
  varying vec2 vTextureCoordinates;
  varying vec3 vLightWeighting;
  uniform sampler2D uSampler;

  void main() {
    vec4 texelColor = texture2D(uSampler, vTextureCoordinates);
    gl_FragColor = vec4(vLightWeighting.rgb * texelColor.rgb, texelColor.a);
  }
`;

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
};

function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
};

function createGLContext(canvas) {
  var names = ['webgl', 'experimental-webgl'];
  var context = null;

  for (var i=0; i < names.length; i++) {
    try {
      context = canvas.getContext(names[i]);
    } catch(e) {}

    if (context) {
      break;
    }
  }

  if (context) {
    context.viewportWidth = canvas.width;
    context.viewportHeight = canvas.height;
  } else {
    return console.error('Failed to create WebGL context!');
  }
  return context;
}

function loadShader(shaderSource, shaderType) {
  var shader;

  if (!shaderSource) {
    return console.error('Couldn\'t find shader');
  }

  switch (shaderType) {
    case 'fragment':
      shader = gl.createShader(gl.FRAGMENT_SHADER);
      break;
    case 'vertex':
      shader = gl.createShader(gl.VERTEX_SHADER);
      break;
    default:
      return console.error('Not a valid shader script type :', shaderType);
  }

  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS) && !gl.isContextLost()) {
    return console.error(gl.getShaderInfoLog(shader));
  }

  return shader;
}

function setupShaders() {
  var vertexShader = loadShader(shaderVertex, 'vertex');
  var fragmentShader = loadShader(shaderFragment, 'fragment');
  var shaderProgram = gl.createProgram();

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);

  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS) && !gl.isContextLost()) {
    console.error('Failed to link shaders: ' + gl.getProgramInfoLog(shaderProgram));
  }

  gl.useProgram(shaderProgram);

  state.vertexPositionAttributeLoc = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
  state.vertexTextureAttributeLoc = gl.getAttribLocation(shaderProgram, 'aTextureCoordinates');
  state.uniformMVMatrixLoc = gl.getUniformLocation(shaderProgram, 'uMVMatrix');
  state.uniformProjMatrixLoc = gl.getUniformLocation(shaderProgram, 'uPMatrix');
  state.uniformSamplerLoc = gl.getUniformLocation(shaderProgram, 'uSampler');

  state.uniformNormalMatrixLoc = gl.getUniformLocation(shaderProgram, 'uNMatrix');
  state.vertexNormalAttributeLoc = gl.getAttribLocation(shaderProgram, 'aVertexNormal');
  state.uniformLightPositionLoc =gl.getUniformLocation(shaderProgram, 'uLightPosition');
  state.uniformAmbientLightColorLoc = gl.getUniformLocation(shaderProgram, 'uAmbientLightColor');
  state.uniformDiffuseLightColorLoc = gl.getUniformLocation(shaderProgram, 'uDiffuseLightColor');
  state.uniformSpecularLightColorLoc = gl.getUniformLocation(shaderProgram, 'uSpecularLightColor');

  gl.enableVertexAttribArray(state.vertexNormalAttributeLoc);
  gl.enableVertexAttribArray(state.vertexPositionAttributeLoc);
  gl.enableVertexAttribArray(state.vertexTextureAttributeLoc);

  state.modelViewMatrix = mat4.create();
  state.projectionMatrix = mat4.create();
  state.modelViewMatrixStack = [];
}

function pushModelViewMatrix() {
  var copyToPush = mat4.create(state.modelViewMatrix);
  state.modelViewMatrixStack.push(copyToPush);
}

function popModelViewMatrix() {
  if (state.modelViewMatrixStack.length === 0) {
    return console.error('popModelViewMatrix() - Stack was empty ');
  }
  state.modelViewMatrix = state.modelViewMatrixStack.pop();
}

function setupCubeBuffers() {
  var cubeVertexPosition = [
  // front face
     1.0,  1.0,  1.0, //  v0
    -1.0,  1.0,  1.0, //  v1
    -1.0, -1.0,  1.0, //  v2
     1.0, -1.0,  1.0, //  v3

  // back face
     1.0,  1.0, -1.0, //  v4
    -1.0,  1.0, -1.0, //  v5
    -1.0, -1.0, -1.0, //  v6
     1.0, -1.0, -1.0, //  v7

  // left face
    -1.0,  1.0,  1.0, //  v8
    -1.0,  1.0, -1.0, //  v9
    -1.0, -1.0, -1.0, // v10
    -1.0, -1.0,  1.0, // v11

  // right face
    1.0,  1.0,  1.0, // v12
    1.0, -1.0,  1.0, // v13
    1.0, -1.0, -1.0, // v14
    1.0,  1.0, -1.0, // v15

  // top face
     1.0,  1.0,  1.0, // v16
     1.0,  1.0, -1.0, // v17
    -1.0,  1.0, -1.0, // v18
    -1.0,  1.0,  1.0, // v19

  // bottom face
     1.0, -1.0,  1.0, // v20
     1.0, -1.0, -1.0, // v21
    -1.0, -1.0, -1.0, // v22
    -1.0, -1.0,  1.0, // v23
  ];

  var cubeVertexIndices = [
     0,  1,  2,    0,  2,  3, // front face
     4,  6,  5,    4,  7,  6, // back face
     8,  9, 10,    8, 10, 11, // left face
    12, 13, 14,   12, 14, 15, // right face
    16, 17, 18,   16, 18, 19, // top face
    20, 22, 21,   20, 23, 22  // bottom face
  ];

  var textureCoordinates = [
  // front face
    0.0, 0.0, // v0
    1.0, 0.0, // v1
    1.0, 1.0, // v2
    0.0, 1.0, // v3

  // back face
    0.0, 1.0, // v4
    1.0, 1.0, // v5
    1.0, 0.0, // v6
    0.0, 0.0, // v7

  // left face
    0.0, 1.0, // v1
    1.0, 1.0, // v5
    1.0, 0.0, // v6
    0.0, 0.0, // v2

  // right face
    0.0, 1.0, // v0
    1.0, 1.0, // v3
    1.0, 0.0, // v7
    0.0, 0.0, // v4

  // top face
    0.0, 1.0, // v0
    1.0, 1.0, // v4
    1.0, 0.0, // v5
    0.0, 0.0, // v1

  // bottom face
    0.0, 1.0, // v3
    1.0, 1.0, // v7
    1.0, 0.0, // v6
    0.0, 0.0, // v2
  ];

  var cubeVertexNormals = [
   // front face
     0.0,  0.0,  1.0, // v0
     0.0,  0.0,  1.0, // v1
     0.0,  0.0,  1.0, // v2
     0.0,  0.0,  1.0, // v3

   // back face
     0.0,  0.0, -1.0, // v4
     0.0,  0.0, -1.0, // v5
     0.0,  0.0, -1.0, // v6
     0.0,  0.0, -1.0, // v7

  // left face
    -1.0,  0.0,  0.0, // v1
    -1.0,  0.0,  0.0, // v5
    -1.0,  0.0,  0.0, // v6
    -1.0,  0.0,  0.0, // v2

  // right face
     1.0,  0.0,  0.0, // v0
     1.0,  0.0,  0.0, // v3
     1.0,  0.0,  0.0, // v7
     1.0,  0.0,  0.0, // v4

  // top face
     0.0,  1.0,  0.0, // v0
     0.0,  1.0,  0.0, // v4
     0.0,  1.0,  0.0, // v5
     0.0,  1.0,  0.0, // v1

  // bottom face
     0.0, -1.0,  0.0, // v3
     0.0, -1.0,  0.0, // v7
     0.0, -1.0,  0.0, // v6
     0.0, -1.0,  0.0, // v2
  ];

  // setup buffer with vetex positions
  state.cubeVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, state.cubeVertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertexPosition), gl.STATIC_DRAW);
  state.CUBE_VERTEX_POS_BUF_ITEM_SIZE = 3;
  state.CUBE_VERTEX_POS_BUF_NUM_ITEMS = cubeVertexPosition.length / state.CUBE_VERTEX_POS_BUF_ITEM_SIZE;

  // setup buffer with index
  state.cubeVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, state.cubeVertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
  state.CUBE_VERTEX_INDEX_BUF_ITEM_SIZE = 1;
  state.CUBE_VERTEX_INDEX_BUF_NUM_ITEMS = cubeVertexIndices.length / state.CUBE_VERTEX_INDEX_BUF_ITEM_SIZE;

  // setup buffer with texture coordinates
  state.cubeVertexTextureCoordinateBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, state.cubeVertexTextureCoordinateBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),gl.STATIC_DRAW);
  state.CUBE_VERTEX_TEX_COORD_BUF_ITEM_SIZE = 2;
  state.CUBE_VERTEX_TEX_COORD_BUF_NUM_ITEMS = textureCoordinates.length / state.CUBE_VERTEX_TEX_COORD_BUF_ITEM_SIZE;

  // specify normals to be able to do lighting calculations
  state.cubeVertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, state.cubeVertexNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertexNormals), gl.STATIC_DRAW);
  state.CUBE_VERTEX_NORMAL_BUF_ITEM_SIZE = 3;
  state.CUBE_VERTEX_NORMAL_BUF_NUM_ITEMS = cubeVertexNormals.length / state.CUBE_VERTEX_NORMAL_BUF_ITEM_SIZE;
}

function setupSphereBuffers() {
  var m = 30; // horizontal (latitudinal) strips
  var n = 30; // vertical (longitudinal) strips
  state.earth.radius = 5;
  var π = Math.PI;

  var textureCoordinates = [];
  var sphereVertexPosition = [];
  var sphereVertexNormals = [];
  for (var i = 0; i <= m; i++) {
    var θ = i * π / m;

    for (var j = 0; j <= n; j++) {
      var φ = 2 * j * π / n;
      /*
        x = r sinθ cosφ= r sin(iπ/m) cos(2jπ/n)
        y = r cosθ = r cos(iπ/m)
        z = r sinθ sinφ = r sin(iπ/m) sin(2jπ/n)
      */

      var x = Math.sin(θ) * Math.cos(φ);
      var y = Math.cos(θ);
      var z = Math.sin(θ) * Math.sin(φ);

      var u = 1 - (j / n);
      var v = 1 - (i / m);

      textureCoordinates.push(u);
      textureCoordinates.push(v);

      sphereVertexNormals.push(x);
      sphereVertexNormals.push(y);
      sphereVertexNormals.push(z);

      sphereVertexPosition.push(state.earth.radius * x);
      sphereVertexPosition.push(state.earth.radius * y);
      sphereVertexPosition.push(state.earth.radius * z);
    }
  }

  var sphereVertexIndices = [];
  for (var k = 0; k < m; k++) {
    for (var l = 0; l < n; l++) {
      /*
        index of vi,j = i*(n+1)+j
        index of vi,j+1 = index of vi,j + 1
        index of vi+1,j = index of vi,j + n + 1
        index of vi+1,j+1 = index of vi+1,j +1
      */

      var v1 = (k * (n + 1)) + l; // index of vi, l
      var v2 = v1 + n + 1;        // index of vi+1, l
      var v3 = v1 + 1;            // index of vi, l+1
      var v4 = v2 + 1;            // index of vi+1, l+1

      // indices of first triangle
      sphereVertexIndices.push(v1);
      sphereVertexIndices.push(v2);
      sphereVertexIndices.push(v3);

      // indices of second triangle
      sphereVertexIndices.push(v3);
      sphereVertexIndices.push(v2);
      sphereVertexIndices.push(v4);
    }
  }

  // setup vertex positions for sphere
  state.sphereVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, state.sphereVertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphereVertexPosition), gl.STATIC_DRAW);
  state.SPHERE_VERTEX_POS_BUF_ITEM_SIZE = 3;
  state.SPHERE_VERTEX_POS_BUF_NUM_ITEMS = sphereVertexPosition.length / state.SPHERE_VERTEX_POS_BUF_ITEM_SIZE;

  // setup buffer with texture coordinates
  state.sphereVertexTextureCoordinateBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, state.sphereVertexTextureCoordinateBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
  state.SPHERE_VERTEX_TEX_COORD_BUF_ITEM_SIZE = 2;
  state.SPHERE_VERTEX_TEX_COORD_BUF_NUM_ITEMS = textureCoordinates.length / state.SPHERE_VERTEX_TEX_COORD_BUF_ITEM_SIZE;

  // specify normals to be able to do lighting calculations
  state.sphereVertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, state.sphereVertexNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphereVertexNormals), gl.STATIC_DRAW);
  state.SPHERE_VERTEX_NORMAL_BUF_ITEM_SIZE = 3;
  state.SPHERE_VERTEX_NORMAL_BUF_NUM_ITEMS = sphereVertexNormals.length / state.SPHERE_VERTEX_NORMAL_BUF_ITEM_SIZE;

  // setup index buffer
  state.sphereVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, state.sphereVertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sphereVertexIndices), gl.STATIC_DRAW);
  state.SPHERE_VERTEX_INDEX_BUF_ITEM_SIZE = 1;
  state.SPHERE_VERTEX_INDEX_BUF_NUM_ITEMS = sphereVertexIndices.length;
}

function setupTextures() {
  // texture for the table
  state.earthTexture = gl.createTexture();
  loadImageForTexture('images/earth.jpg', state.earthTexture);

  // texture for the satellite side toward the earth
  state.satTowardsEarthTexture = gl.createTexture();
  loadImageForTexture('images/satellite--grey.png', state.satTowardsEarthTexture);

  // texture for the rest of the satellite sides
  state.satTexture = gl.createTexture();
  loadImageForTexture('images/satellite--gold.png', state.satTexture);
}

function loadImageForTexture(url, texture) {
  var image = new Image();
  image.onload = function() {
    state.imagesLoading.splice(state.imagesLoading.indexOf(image), 1);

    textureFinishedLoading(image, texture);
  };
  state.imagesLoading.push(image);
  image.src = url;
}

function textureFinishedLoading(image, texture) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  gl.generateMipmap(gl.TEXTURE_2D);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
  gl.bindTexture(gl.TEXTURE_2D, null);
}

function setupBuffers() {
  setupCubeBuffers();
  setupSphereBuffers();
}

function setupLights() {
  gl.uniform3fv(state.uniformLightPositionLoc, [0.0, 20.0, 5.0]);
  gl.uniform3fv(state.uniformAmbientLightColorLoc, [0.2, 0.2, 0.2]);
  gl.uniform3fv(state.uniformDiffuseLightColorLoc, [0.7, 0.7, 0.7]);
  gl.uniform3fv(state.uniformSpecularLightColorLoc, [0.8, 0.8, 0.8]);
}

function uploadNormalMatrixToShader() {
  var normalMatrix = mat3.create();
  mat4.toInverseMat3(state.modelViewMatrix, normalMatrix);
  mat3.transpose(normalMatrix);
  gl.uniformMatrix3fv(state.uniformNormalMatrixLoc, false, normalMatrix);
}

function uploadModelViewMatrixToShader() {
  gl.uniformMatrix4fv(state.uniformMVMatrixLoc, false, state.modelViewMatrix);
}

function uploadProjectionMatrixToShader() {
  gl.uniformMatrix4fv(state.uniformProjMatrixLoc, false, state.projectionMatrix);
}

function drawCube() {
  // bind position buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, state.cubeVertexPositionBuffer);
  gl.vertexAttribPointer(state.vertexPositionAttributeLoc, state.CUBE_VERTEX_POS_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);

  // bind normal buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, state.cubeVertexNormalBuffer);
  gl.vertexAttribPointer(state.vertexNormalAttributeLoc, state.CUBE_VERTEX_NORMAL_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);

  // bind texture coordinate buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, state.cubeVertexTextureCoordinateBuffer);
  gl.vertexAttribPointer(state.vertexTextureAttributeLoc, state.CUBE_VERTEX_TEX_COORD_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);

  gl.bindTexture(gl.TEXTURE_2D, state.satTowardsEarthTexture);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, state.cubeVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, state.CUBE_VERTEX_INDEX_BUF_NUM_ITEMS / 6, gl.UNSIGNED_SHORT, 0);

  gl.bindTexture(gl.TEXTURE_2D, state.satTexture);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, state.cubeVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, state.CUBE_VERTEX_INDEX_BUF_NUM_ITEMS, gl.UNSIGNED_SHORT, 0);
}

function drawSphere() {
  // bind position buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, state.sphereVertexPositionBuffer);
  gl.vertexAttribPointer(state.vertexPositionAttributeLoc, state.SPHERE_VERTEX_POS_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);

  // bind normal buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, state.sphereVertexNormalBuffer);
  gl.vertexAttribPointer(state.vertexNormalAttributeLoc, state.SPHERE_VERTEX_NORMAL_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);

  // bind texture coordinate buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, state.sphereVertexTextureCoordinateBuffer);
  gl.vertexAttribPointer(state.vertexTextureAttributeLoc, state.CUBE_VERTEX_TEX_COORD_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, state.earthTexture);

  // bind index buffer and draw sphere
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, state.sphereVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, state.SPHERE_VERTEX_INDEX_BUF_NUM_ITEMS, gl.UNSIGNED_SHORT, 0);
}

function draw() {
  state.requestId = requestAnimFrame(draw);

  var currentTime = Date.now();

  handlePressedDownKeys();

  // update FPS if a second or more has passed since last FPS update
  if (currentTime - state.animation.previous >= 1000) {
    state.fpsCounter.innerHTML = state.animation.fps;
    state.animation.fps = 0;
    state.animation.previous = currentTime;
  }

  document.querySelector('.speed').innerHTML = Math.round(state.satellite.speed * 100) / 100;
  document.querySelector('.orbit').innerHTML = Math.round(state.satellite.radius * 100) / 100;

  mat4.translate(state.modelViewMatrix, [0.0, state.translation.y, state.translation.z], state.modelViewMatrix);
  mat4.rotateX(state.modelViewMatrix, state.rotation.x / 50, state.modelViewMatrix);
  mat4.rotateY(state.modelViewMatrix, state.rotation.y / 50, state.modelViewMatrix);

  state.rotation.y = state.rotation.x = state.rotation.z = state.translation.y = state.translation.z = 0;

  uploadModelViewMatrixToShader();
  uploadProjectionMatrixToShader();
  uploadNormalMatrixToShader();
  gl.uniform1i(state.uniformSamplerLoc, 0);

  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // calculate the position for the box that is initially on top of the table but will then be moved during animation
  pushModelViewMatrix();
  if (currentTime === undefined) {
    currentTime = Date.now();
  }

  if (state.animation.start === undefined) {
    state.animation.start = currentTime;
  }

  // update the position of the box
  state.satellite.angle = -(currentTime - state.animation.start) / (state.animation.speed / state.satellite.speed) * 2 * Math.PI % (2 * Math.PI);
  state.earth.angle = -(currentTime - state.animation.start) / state.animation.speed * 2 * Math.PI % (2 * Math.PI);
  state.satellite.x = Math.cos(-state.satellite.angle) * state.satellite.radius;
  state.satellite.z = Math.sin(-state.satellite.angle) * state.satellite.radius;

  mat4.translate(state.modelViewMatrix, [state.satellite.x, state.satellite.y, state.satellite.z], state.modelViewMatrix);
  mat4.scale(state.modelViewMatrix, [0.5, 0.5, 0.5], state.modelViewMatrix);
  mat4.rotateY(state.modelViewMatrix, degreesToRadians(-90), state.modelViewMatrix);
  mat4.rotateY(state.modelViewMatrix, state.satellite.angle, state.modelViewMatrix);
  uploadModelViewMatrixToShader();
  uploadNormalMatrixToShader();
  drawCube();
  popModelViewMatrix();

  // draw sphere
  pushModelViewMatrix();
  mat4.translate(state.modelViewMatrix, [0.0, 0.0, 0.0], state.modelViewMatrix);
  mat4.rotateY(state.modelViewMatrix, state.earth.angle, state.modelViewMatrix);
  uploadModelViewMatrixToShader();
  uploadNormalMatrixToShader();
  drawSphere();
  popModelViewMatrix();

  // update number of drawn frames to be able to count fps
  state.animation.fps++;
}

function handleContextLost(event) {
  cancelRequestAnimFrame(state.requestId);

  // ignore all ongoing image loads by removing their onload handler
  for (var i = 0; i < state.imagesLoading.length; i++) {
    state.imagesLoading[i].onload = undefined;
  }
  state.imagesLoading = [];

  event.preventDefault();
}

function init() {
  state.satellite = {
    x: 0.0,
    y: 0.0,
    z: 0.0,
    radius: 7.0,
    angle: 0,
    speed: 1
  };

  state.earth = {
    angle: 0,
    radius: 5.0
  };

  state.animation = {
    speed: 10000,
    fps: 0,
    previous: Date.now()
  }

  setupShaders();
  setupBuffers();
  setupLights();
  setupTextures();
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // black background
  gl.enable(gl.DEPTH_TEST);

  mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 1, 100.0, state.projectionMatrix);
  mat4.identity(state.modelViewMatrix);
  mat4.lookAt([22, 0, 0], [0, 0, 0], [0, 1, 0], state.modelViewMatrix);
}

function handleContextRestored(event) {
  init();
  state.requestId = requestAnimFrame(draw, canvas);
}

function handleKeyDown(event) {
  state.keysPressed[event.keyCode] = true;
}

function handleKeyUp(event) {
  state.keysPressed[event.keyCode] = false;
}

function handlePressedDownKeys() {
  // speed down ← (left key)
  if (state.keysPressed[37]) {
    if (state.satellite.speed > 0.3) {
      state.satellite.speed -= 0.05;
    }
  }

  // speed up → (right key)
  if (state.keysPressed[39]) {
    if (state.satellite.speed < 5.0) {
      state.satellite.speed += 0.05;
    }
  }

  // orbit out ↑ (up key)
  if (state.keysPressed[38]) {
    if (state.satellite.radius < state.earth.radius + 10.0) {
      state.satellite.radius += 0.1;
    }
  }

  // orbit in ↓ (down key)
  if (state.keysPressed[40]) {
    if (state.satellite.radius > state.earth.radius + 1.0) {
      state.satellite.radius -= 0.1;
    }
  }
}

function mymousedown(event) {
  state.dragging = true;
  state.offset.x = event.clientX;
  state.offset.y = event.clientY;
}

function mymouseup(event) {
  state.dragging = false;
}

function mymousemove(event) {
  if (!state.dragging) {
    return false;
  }

  if (event.shiftKey) {
    state.translation.z = (event.clientY - state.offset.y) / 10;
    state.rotation.z = (state.offset.x - event.clientX)  * .3;
  } else if (event.altKey) {
    state.translation.y = -(event.clientY - state.offset.y) / 10;
  } else {
    state.rotation.y = - state.offset.x + event.clientX;
    state.rotation.x = - state.offset.y + event.clientY;
  }

  state.offset.x = event.clientX;
  state.offset.y = event.clientY;
}

function wheelHandler(event) {
  if (event.altKey) {
    state.translation.y = -event.detail / 10;
  } else {
    state.translation.z = event.detail / 10;
  }

  event.preventDefault();
}

function startup() {
  canvas = document.querySelector('.canvas');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas = WebGLDebugUtils.makeLostContextSimulatingCanvas(canvas);

  canvas.addEventListener('webglcontextlost', handleContextLost, false);
  canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

  document.addEventListener('keydown', handleKeyDown, false);
  document.addEventListener('keyup', handleKeyUp, false);
  canvas.addEventListener('mousemove', mymousemove, false);
  canvas.addEventListener('mousedown', mymousedown, false);
  canvas.addEventListener('mouseup', mymouseup, false);
  canvas.addEventListener('mousewheel', wheelHandler, false);
  canvas.addEventListener('DOMMouseScroll', wheelHandler, false);

  gl = createGLContext(canvas);

  init();

  state.fpsCounter = document.querySelector('.fps');

  // draw the complete scene
  draw();
}

document.addEventListener('DOMContentLoaded', startup);
