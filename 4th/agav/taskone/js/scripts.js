var gl;
var pwgl = {}; // many variables are added to this as properties
pwgl.ongoingImageLoads = [];
var canvas;

// variables for interactive control
var transY = 0, transZ = 0;
var xRot = 0, yRot = 0, zRot = 0;
var xOffs = 0, yOffs = 0;
var drag = 0;
pwgl.listOfPressedKeys = []; // keep track of pressed down keys in a list

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
    return console.log('Failed to create WebGL context!');
  }
  return context;
}

function loadShader(shaderSource, shaderType) {
  var shader;

  if (!shaderSource) {
    return console.log('Couldn\'t find shader');
  }

  switch (shaderType) {
    case 'fragment':
      shader = gl.createShader(gl.FRAGMENT_SHADER);
      break;
    case 'vertex':
      shader = gl.createShader(gl.VERTEX_SHADER);
      break;
    default:
      return console.log('Not a valid shader script type');
  }

  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS) && !gl.isContextLost()) {
    return console.log(gl.getShaderInfoLog(shader));
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
    console.log('Failed to link shaders: ' + gl.getProgramInfoLog(shaderProgram));
  }

  gl.useProgram(shaderProgram);

  pwgl.vertexPositionAttributeLoc = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
  pwgl.vertexTextureAttributeLoc = gl.getAttribLocation(shaderProgram, 'aTextureCoordinates');
  pwgl.uniformMVMatrixLoc = gl.getUniformLocation(shaderProgram, 'uMVMatrix');
  pwgl.uniformProjMatrixLoc = gl.getUniformLocation(shaderProgram, 'uPMatrix');
  pwgl.uniformSamplerLoc = gl.getUniformLocation(shaderProgram, 'uSampler');

  pwgl.uniformNormalMatrixLoc = gl.getUniformLocation(shaderProgram, 'uNMatrix');
  pwgl.vertexNormalAttributeLoc = gl.getAttribLocation(shaderProgram, 'aVertexNormal');
  pwgl.uniformLightPositionLoc =gl.getUniformLocation(shaderProgram, 'uLightPosition');
  pwgl.uniformAmbientLightColorLoc = gl.getUniformLocation(shaderProgram, 'uAmbientLightColor');
  pwgl.uniformDiffuseLightColorLoc = gl.getUniformLocation(shaderProgram, 'uDiffuseLightColor');
  pwgl.uniformSpecularLightColorLoc = gl.getUniformLocation(shaderProgram, 'uSpecularLightColor');

  gl.enableVertexAttribArray(pwgl.vertexNormalAttributeLoc);
  gl.enableVertexAttribArray(pwgl.vertexPositionAttributeLoc);
  gl.enableVertexAttribArray(pwgl.vertexTextureAttributeLoc);

  pwgl.modelViewMatrix = mat4.create();
  pwgl.projectionMatrix = mat4.create();
  pwgl.modelViewMatrixStack = [];
}

function pushModelViewMatrix() {
  var copyToPush = mat4.create(pwgl.modelViewMatrix);
  pwgl.modelViewMatrixStack.push(copyToPush);
}

function popModelViewMatrix() {
  if (pwgl.modelViewMatrixStack.length === 0) {
    throw 'Error popModelViewMatrix() - Stack was empty ';
  }
  pwgl.modelViewMatrix = pwgl.modelViewMatrixStack.pop();
}

function setupCubeBuffers() {
  pwgl.cubeVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.cubeVertexPositionBuffer);

  var cubeVertexPosition = [
    // front face
    -1.0,  1.0,  1.0, //  V0
    -1.0,  1.0,  1.0, //  V1
    -1.0, -1.0,  1.0, //  V2
     1.0, -1.0,  1.0, //  V3

     // back face
     1.0,  1.0, -1.0, //  V4
    -1.0,  1.0, -1.0, //  V5
    -1.0, -1.0, -1.0, //  V6
     1.0, -1.0, -1.0, //  V7

     // left face
    -1.0,  1.0,  1.0, //  V8
    -1.0,  1.0, -1.0, //  V9
    -1.0, -1.0, -1.0, // xV10
    -1.0, -1.0,  1.0, // V11

     // right face
     1.0,  1.0,  1.0, // V12
     1.0, -1.0,  1.0, // V13
     1.0, -1.0, -1.0, // V14
     1.0,  1.0, -1.0, // V15

    // top face
     1.0,  1.0,  1.0, // V16
     1.0,  1.0, -1.0, // V17
    -1.0,  1.0, -1.0, // V18
    -1.0,  1.0,  1.0, // V19

    // bottom face
     1.0, -1.0,  1.0, // V20
     1.0, -1.0, -1.0, // V21
    -1.0, -1.0, -1.0, // V22
    -1.0, -1.0,  1.0, // V23
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertexPosition), gl.STATIC_DRAW);
  pwgl.CUBE_VERTEX_POS_BUF_ITEM_SIZE = 3;
  pwgl.CUBE_VERTEX_POS_BUF_NUM_ITEMS = 24;

  // setup buffer with index
  pwgl.cubeVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.cubeVertexIndexBuffer);

  var cubeVertexIndices = [
    0, 1, 2,      0, 2, 3,    // front face
    4, 6, 5,      4, 7, 6,    // back face
    8, 9, 10,     8, 10, 11,  // left face
    12, 13, 14,   12, 14, 15, // right face
    16, 17, 18,   16, 18, 19, // top face
    20, 22, 21,   20, 23, 22  // bottom face
  ];

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
  pwgl.CUBE_VERTEX_INDEX_BUF_ITEM_SIZE = 1;
  pwgl.CUBE_VERTEX_INDEX_BUF_NUM_ITEMS = 36;

  // Setup buffer with texture coordinates
  pwgl.cubeVertexTextureCoordinateBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.cubeVertexTextureCoordinateBuffer);
  var textureCoordinates = [
    // front face
    0.0, 0.0, // V0
    1.0, 0.0, // V1
    1.0, 1.0, // V2
    0.0, 1.0, // V3

    // back face
    0.0, 1.0, // V4
    1.0, 1.0, // V5
    1.0, 0.0, // V6
    0.0, 0.0, // V7

    // left face
    0.0, 1.0, // V1
    1.0, 1.0, // V5
    1.0, 0.0, // V6
    0.0, 0.0, // V2

    // right face
    0.0, 1.0, // V0
    1.0, 1.0, // V3
    1.0, 0.0, // V7
    0.0, 0.0, // V4

    // top face
    0.0, 1.0, // V0
    1.0, 1.0, // V4
    1.0, 0.0, // V5
    0.0, 0.0, // V1

    // bottom face
    0.0, 1.0, // V3
    1.0, 1.0, // V7
    1.0, 0.0, // V6
    0.0, 0.0, // V2
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
  pwgl.CUBE_VERTEX_TEX_COORD_BUF_ITEM_SIZE = 2;
  pwgl.CUBE_VERTEX_TEX_COORD_BUF_NUM_ITEMS = 24;

  // specify normals to be able to do lighting calculations
  pwgl.cubeVertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.cubeVertexNormalBuffer);
  var cubeVertexNormals = [
     // front face
     0.0,  0.0,  1.0, // V0
     0.0,  0.0,  1.0, // V1
     0.0,  0.0,  1.0, // V2
     0.0,  0.0,  1.0, // V3

     // back face
     0.0,  0.0, -1.0, // V4
     0.0,  0.0, -1.0, // V5
     0.0,  0.0, -1.0, // V6
     0.0,  0.0, -1.0, // V7

    // left face
    -1.0,  0.0,  0.0, // V1
    -1.0,  0.0,  0.0, // V5
    -1.0,  0.0,  0.0, // V6
    -1.0,  0.0,  0.0, // V2

    // right face
    1.0,  0.0,  0.0, // V0
    1.0,  0.0,  0.0, // V3
    1.0,  0.0,  0.0, // V7
    1.0,  0.0,  0.0, // V4

    // top face
    0.0,  1.0,  0.0, // V0
    0.0,  1.0,  0.0, // V4
    0.0,  1.0,  0.0, // V5
    0.0,  1.0,  0.0, // V1

    // bottom face
    0.0, -1.0,  0.0, // V3
    0.0, -1.0,  0.0, // V7
    0.0, -1.0,  0.0, // V6
    0.0, -1.0,  0.0, // V2
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertexNormals), gl.STATIC_DRAW);
  pwgl.CUBE_VERTEX_NORMAL_BUF_ITEM_SIZE = 3;
  pwgl.CUBE_VERTEX_NORMAL_BUF_NUM_ITEMS = 24;
}

function setupSphereBuffers() {
  var m = 50; // horizontal (latitudinal) strips
  var n = 50; // vertical (longitudinal) strips
  var radius = 5;
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

      sphereVertexPosition.push(radius * x);
      sphereVertexPosition.push(radius * y);
      sphereVertexPosition.push(radius * z);
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
  pwgl.sphereVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.sphereVertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphereVertexPosition), gl.STATIC_DRAW);
  pwgl.SPHERE_VERTEX_POS_BUF_ITEM_SIZE = 3;
  pwgl.SPHERE_VERTEX_POS_BUF_NUM_ITEMS = sphereVertexPosition.length / pwgl.SPHERE_VERTEX_POS_BUF_ITEM_SIZE;

  // setup buffer with texture coordinates
  pwgl.sphereVertexTextureCoordinateBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.sphereVertexTextureCoordinateBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
  pwgl.SPHERE_VERTEX_TEX_COORD_BUF_ITEM_SIZE = 2;
  pwgl.SPHERE_VERTEX_TEX_COORD_BUF_NUM_ITEMS = textureCoordinates.length / pwgl.SPHERE_VERTEX_TEX_COORD_BUF_ITEM_SIZE;

  // specify normals to be able to do lighting calculations
  pwgl.sphereVertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.sphereVertexNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphereVertexNormals), gl.STATIC_DRAW);
  pwgl.SPHERE_VERTEX_NORMAL_BUF_ITEM_SIZE = 3;
  pwgl.SPHERE_VERTEX_NORMAL_BUF_NUM_ITEMS = sphereVertexNormals.length / pwgl.SPHERE_VERTEX_NORMAL_BUF_ITEM_SIZE;

  // setup index buffer
  pwgl.sphereVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.sphereVertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sphereVertexIndices), gl.STATIC_DRAW);
  pwgl.SPHERE_VERTEX_INDEX_BUF_ITEM_SIZE = 1;
  pwgl.SPHERE_VERTEX_INDEX_BUF_NUM_ITEMS = sphereVertexIndices.length;
}

function setupTextures() {
  // texture for the table
  pwgl.earthTexture = gl.createTexture();
  loadImageForTexture('images/earth.jpg', pwgl.earthTexture);

  // texture for the box on the table
  pwgl.boxTexture = gl.createTexture();
  loadImageForTexture('images/metal.jpg', pwgl.boxTexture);
}

function loadImageForTexture(url, texture) {
  var image = new Image();
  image.onload = function() {
    pwgl.ongoingImageLoads.splice(pwgl.ongoingImageLoads.indexOf(image), 1);

    textureFinishedLoading(image, texture);
  };
  pwgl.ongoingImageLoads.push(image);
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
  gl.uniform3fv(pwgl.uniformLightPositionLoc, [0.0, 20.0, 5.0]);
  gl.uniform3fv(pwgl.uniformAmbientLightColorLoc, [0.2, 0.2, 0.2]);
  gl.uniform3fv(pwgl.uniformDiffuseLightColorLoc, [0.7, 0.7, 0.7]);
  gl.uniform3fv(pwgl.uniformSpecularLightColorLoc, [0.8, 0.8, 0.8]);
}

function uploadNormalMatrixToShader() {
  var normalMatrix = mat3.create();
  mat4.toInverseMat3(pwgl.modelViewMatrix, normalMatrix);
  mat3.transpose(normalMatrix);
  gl.uniformMatrix3fv(pwgl.uniformNormalMatrixLoc, false, normalMatrix);
}

function uploadModelViewMatrixToShader() {
  gl.uniformMatrix4fv(pwgl.uniformMVMatrixLoc, false, pwgl.modelViewMatrix);
}

function uploadProjectionMatrixToShader() {
  gl.uniformMatrix4fv(pwgl.uniformProjMatrixLoc, false, pwgl.projectionMatrix);
}

function drawCube(texture) {
  // Bind position buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.cubeVertexPositionBuffer);
  gl.vertexAttribPointer(pwgl.vertexPositionAttributeLoc, pwgl.CUBE_VERTEX_POS_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);

  // bind normal buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.cubeVertexNormalBuffer);
  gl.vertexAttribPointer(pwgl.vertexNormalAttributeLoc, pwgl.CUBE_VERTEX_NORMAL_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);

  // bind texture coordinate buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.cubeVertexTextureCoordinateBuffer);
  gl.vertexAttribPointer(pwgl.vertexTextureAttributeLoc, pwgl.CUBE_VERTEX_TEX_COORD_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // bind index buffer and draw cube
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.cubeVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, pwgl.CUBE_VERTEX_INDEX_BUF_NUM_ITEMS, gl.UNSIGNED_SHORT, 0);
}

function drawSphere() {
  // Bind position buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.sphereVertexPositionBuffer);
  gl.vertexAttribPointer(pwgl.vertexPositionAttributeLoc, pwgl.SPHERE_VERTEX_POS_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);

  // bind normal buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.sphereVertexNormalBuffer);
  gl.vertexAttribPointer(pwgl.vertexNormalAttributeLoc, pwgl.SPHERE_VERTEX_NORMAL_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);

  // bind texture coordinate buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.sphereVertexTextureCoordinateBuffer);
  gl.vertexAttribPointer(pwgl.vertexTextureAttributeLoc, pwgl.CUBE_VERTEX_TEX_COORD_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, pwgl.earthTexture);

  // bind index buffer and draw sphere
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.sphereVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, pwgl.SPHERE_VERTEX_INDEX_BUF_NUM_ITEMS, gl.UNSIGNED_SHORT, 0);
}

function draw() {
  pwgl.requestId = requestAnimFrame(draw);

  var currentTime = Date.now();

  handlePressedDownKeys();

  // update FPS if a second or more has passed since last FPS update
  if (currentTime - pwgl.previousFrameTimeStamp >= 1000) {
    pwgl.fpsCounter.innerHTML = pwgl.nbrOfFramesForFPS;
    pwgl.nbrOfFramesForFPS = 0;
    pwgl.previousFrameTimeStamp = currentTime;
  }

  mat4.translate(pwgl.modelViewMatrix, [0.0, transY, transZ], pwgl.modelViewMatrix);
  mat4.rotateX(pwgl.modelViewMatrix, xRot / 50, pwgl.modelViewMatrix);
  mat4.rotateY(pwgl.modelViewMatrix, yRot / 50, pwgl.modelViewMatrix);

  yRot = xRot = zRot = transY = transZ = 0;

  uploadModelViewMatrixToShader();
  uploadProjectionMatrixToShader();
  uploadNormalMatrixToShader();
  gl.uniform1i(pwgl.uniformSamplerLoc, 0);

  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // calculate the position for the box that is initially on top of the table but will then be moved during animation
  pushModelViewMatrix();
  if (currentTime === undefined) {
    currentTime = Date.now();
  }

  if (pwgl.animationStartTime === undefined) {
    pwgl.animationStartTime = currentTime;
  }

  // Update the position of the box
  var animationSpeed = 10000;
  pwgl.angleSat = -(currentTime - pwgl.animationStartTime) / (animationSpeed * pwgl.speedSat) * 2 * Math.PI % (2 * Math.PI);
  pwgl.angleEarth = -(currentTime - pwgl.animationStartTime) / animationSpeed * 2 * Math.PI % (2 * Math.PI);
  pwgl.x = Math.cos(-pwgl.angleSat) * pwgl.circleRadius;
  pwgl.z = Math.sin(-pwgl.angleSat) * pwgl.circleRadius;

  mat4.translate(pwgl.modelViewMatrix, [pwgl.x, pwgl.y, pwgl.z], pwgl.modelViewMatrix);
  mat4.scale(pwgl.modelViewMatrix, [0.5, 0.5, 0.5], pwgl.modelViewMatrix);
  mat4.rotateY(pwgl.modelViewMatrix, pwgl.angleSat, pwgl.modelViewMatrix);
  uploadModelViewMatrixToShader();
  uploadNormalMatrixToShader();
  drawCube(pwgl.boxTexture);
  popModelViewMatrix();

  // draw sphere
  pushModelViewMatrix();
  mat4.translate(pwgl.modelViewMatrix, [0.0, 0.0, 0.0], pwgl.modelViewMatrix);
  mat4.rotateY(pwgl.modelViewMatrix, pwgl.angleEarth, pwgl.modelViewMatrix);
  uploadModelViewMatrixToShader();
  uploadNormalMatrixToShader();
  drawSphere();
  popModelViewMatrix();

  // update number of drawn frames to be able to count fps
  pwgl.nbrOfFramesForFPS++;
}

function handleContextLost(event) {
  event.preventDefault();
  cancelRequestAnimFrame(pwgl.requestId);
  // ignore all ongoing image loads by removing their onload handler
  for (var i = 0; i < pwgl.ongoingImageLoads.length; i++) {
    pwgl.ongoingImageLoads[i].onload = undefined;
  }
  pwgl.ongoingImageLoads = [];
}

function init() {
  // initialization that is performed during first startup and when the event webglcontextrestored is received is included in this function.
  setupShaders();
  setupBuffers();
  setupLights();
  setupTextures();
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // initialize some variables for the moving box
  pwgl.x = 0.0;
  pwgl.y = 0.0;
  pwgl.z = 0.0;
  pwgl.circleRadius = 7.0;
  pwgl.angleSat = 0;
  pwgl.speedSat = 1;

  pwgl.angleEarth = 0;

  // initialize some variables related to the animation
  pwgl.animationStartTime = undefined;
  pwgl.nbrOfFramesForFPS = 0;
  pwgl.previousFrameTimeStamp = Date.now();

  mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 1, 100.0, pwgl.projectionMatrix);
  mat4.identity(pwgl.modelViewMatrix);
  mat4.lookAt([22, 0, 0], [0, 0, 0], [0, 1, 0], pwgl.modelViewMatrix);
}

function handleContextRestored(event) {
  init();
  pwgl.requestId = requestAnimFrame(draw, canvas);
}

function handleKeyDown(event) {
  pwgl.listOfPressedKeys[event.keyCode] = true;
}

function handleKeyUp(event) {
  pwgl.listOfPressedKeys[event.keyCode] = false;
}

function handlePressedDownKeys() {
  // arrow up, increase radius of circle
  if (pwgl.listOfPressedKeys[38]) {
    pwgl.circleRadius += 0.1;
  }

  // arrow down, decrease radius of circle
  if (pwgl.listOfPressedKeys[40]) {
    pwgl.circleRadius -= 0.1;
    if (pwgl.circleRadius < 0) {
      pwgl.circleRadius = 0;
    }
  }
}

function startup() {
  canvas = document.querySelector('.canvas');
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

  pwgl.fpsCounter = document.querySelector('.fps');

  // draw the complete scene
  draw();
}

function mymousedown(event) {
  drag  = 1;
  xOffs = event.clientX;
  yOffs = event.clientY;
}

function mymouseup(event) {
  drag  = 0;
}

function mymousemove(event) {
  if (drag === 0) {
    return false;
  }

  if (event.shiftKey) {
    transZ = (event.clientY - yOffs) / 10;
    //zRot = (xOffs - event.clientX)  * .3;
  } else if (event.altKey) {
    transY = -(event.clientY - yOffs) / 10;
  } else {
    yRot = - xOffs + event.clientX;
    xRot = - yOffs + event.clientY;
  }

  xOffs = event.clientX;
  yOffs = event.clientY;
}

function wheelHandler(event) {
  if (event.altKey) {
    transY = -event.detail / 10;
  } else {
    transZ = event.detail / 10;
  }

  event.preventDefault();
}

document.addEventListener('DOMContentLoaded', startup);
