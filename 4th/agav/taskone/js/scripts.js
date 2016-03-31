var gl;
var pwgl = {};

var inc = 0; // variable for lost context test

pwgl.ongoingImageLoads = [];
var canvas;

var shaderVertex = `
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoordinates;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;

  varying vec2 vTextureCoordinates;

  void main() {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoordinates = aTextureCoordinates;
  }
`;

var shaderFragment = `
  precision mediump float;
  varying vec2 vTextureCoordinates;
  uniform sampler2D uSampler;
  void main() {
    gl_FragColor = texture2D(uSampler, vTextureCoordinates);
  }
`;

function createGLContext(canvas) {
  var names = ['webgl', 'experimental-webgl'];
  var context = null;

  for (var i = 0; i < names.length; i++) {

    var name = names[i];
    try {
      context = canvas.getContext(name);
    } catch (e) {
      console.log(e);
    }

    if (context) {
      break;
    }

  }

  if (context) {
    context.viewportWidth =  canvas.width;
    context.viewportHeight = canvas.height;
  } else {
    console.log('Failed to created WebGL context');
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
  var fragmentShader= loadShader(shaderFragment, 'fragment');

  var shaderProgram = gl.createProgram();

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS) && !gl.isContextLost()) {
    console.log('Failed to setup shaders...');
  }

  gl.useProgram(shaderProgram);

  pwgl.vertexPositionAttributeLoc = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  pwgl.vertexTextureAttributeLoc = gl.getAttribLocation(shaderProgram, "aTextureCoordinates");
  pwgl.uniformMVMatrixLoc = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  pwgl.uniformProjMatrixLoc = gl.getUniformLocation(shaderProgram, "uPMatrix");
  pwgl.uniformSamplerLoc = gl.getUniformLocation(shaderProgram, "uSampler");

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
  if (pwgl.modelViewMatrixStack.length == 0) {
    throw "Error popModelViewMatrix() - Stack was empty ";
  }
  modelViewMatrix = pwgl.modelViewMatrixStack.pop();
}

function setupFloorBuffers() {
  pwgl.floorVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.floorVertexPositionBuffer);

  // plane in y=0
  var floorVertexPosition = [
     5.0,   0.0,  5.0,  // V0
     5.0,   0.0, -5.0,  // V1
    -5.0,   0.0, -5.0,  // V2
    -5.0,   0.0,  5.0   // V3
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(floorVertexPosition), gl.STATIC_DRAW);
  pwgl.FLOOR_VERTEX_POS_BUF_ITEM_SIZE = 3;
  pwgl.FLOOR_VERTEX_POS_BUF_NUM_ITEMS = 4;

  // floor index
  pwgl.floorVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.floorVertexIndexBuffer);
  var floorVertexIndices = [0, 1, 2, 3];

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(floorVertexIndices), gl.STATIC_DRAW);

  pwgl.FLOOR_VERTEX_INDEX_BUF_ITEM_SIZE = 1;
  pwgl.FLOOR_VERTEX_INDEX_BUF_NUM_ITEMS = 4;

  // floor texture coordinates
  pwgl.floorVertexTextureCoordinateBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.floorVertexTextureCoordinateBuffer);

  // floor texture coordinates. Note that wrapping is used
  var floorVertexTextureCoordinates = [
    2.0, 0.0,
    2.0, 2.0,
    0.0, 2.0,
    0.0, 0.0
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(floorVertexTextureCoordinates),gl.STATIC_DRAW);

  pwgl.FLOOR_VERTEX_TEX_COORD_BUF_ITEM_SIZE = 2;
  pwgl.FLOOR_VERTEX_TEX_COORD_BUF_NUM_ITEMS = 4;
}

function setupCubeBuffers() {
  pwgl.cubeVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.cubeVertexPositionBuffer);

  //draw an illustration to understand the coordinates, if necessary
  var cubeVertexPosition = [
    // Front face
    1.0,  1.0,  1.0, //v0
    -1.0,  1.0,  1.0, //v1
    -1.0, -1.0,  1.0, //v2
    1.0, -1.0,  1.0, //v3

    // Back face
    1.0,  1.0, -1.0, //v4
    -1.0,  1.0, -1.0, //v5
    -1.0, -1.0, -1.0, //v6
    1.0, -1.0, -1.0, //v7

    // Left face
    -1.0,  1.0,  1.0, //v8
    -1.0,  1.0, -1.0, //v9
    -1.0, -1.0, -1.0, //v10
    -1.0, -1.0,  1.0, //v11

    // Right face
    1.0,  1.0,  1.0, //12
    1.0, -1.0,  1.0, //13
    1.0, -1.0, -1.0, //14
    1.0,  1.0, -1.0, //15

    // Top face
    1.0,  1.0,  1.0, //v16
    1.0,  1.0, -1.0, //v17
    -1.0,  1.0, -1.0, //v18
    -1.0,  1.0,  1.0, //v19

    // Bottom face
    1.0, -1.0,  1.0, //v20
    1.0, -1.0, -1.0, //v21
    -1.0, -1.0, -1.0, //v22
    -1.0, -1.0,  1.0, //v23
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertexPosition), gl.STATIC_DRAW);

  pwgl.CUBE_VERTEX_POS_BUF_ITEM_SIZE = 3;
  pwgl.CUBE_VERTEX_POS_BUF_NUM_ITEMS = 24;

  pwgl.cubeVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.cubeVertexIndexBuffer);

  var cubeVertexIndices = [
    0, 1, 2,      0, 2, 3,    // Front face
    4, 6, 5,      4, 7, 6,    // Back face
    8, 9, 10,     8, 10, 11,  // Left face
    12, 13, 14,   12, 14, 15, // Right face
    16, 17, 18,   16, 18, 19, // Top face
    20, 22, 21,   20, 23, 22  // Bottom face
  ];

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new
  Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
  pwgl.CUBE_VERTEX_INDEX_BUF_ITEM_SIZE = 1;
  pwgl.CUBE_VERTEX_INDEX_BUF_NUM_ITEMS = 36;

  // Setup buffer with texture coordinates
  pwgl.cubeVertexTextureCoordinateBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.cubeVertexTextureCoordinateBuffer);

  //Think about how the coordinates are assigned. Ref. vertex coords.
  var textureCoordinates = [
    //Front face
    0.0, 0.0, //v0
    1.0, 0.0, //v1
    1.0, 1.0, //v2
    0.0, 1.0, //v3

    // Back face
    0.0, 1.0, //v4
    1.0, 1.0, //v5
    1.0, 0.0, //v6
    0.0, 0.0, //v7

    // Left face
    0.0, 1.0, //v1
    1.0, 1.0, //v5
    1.0, 0.0, //v6
    0.0, 0.0, //v2

    // Right face
    0.0, 1.0, //v0
    1.0, 1.0, //v3
    1.0, 0.0, //v7
    0.0, 0.0, //v4

    // Top face
    0.0, 1.0, //v0
    1.0, 1.0, //v4
    1.0, 0.0, //v5
    0.0, 0.0, //v1

    // Bottom face
    0.0, 1.0, //v3
    1.0, 1.0, //v7
    1.0, 0.0, //v6
    0.0, 0.0, //v2
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),gl.STATIC_DRAW);
  pwgl.CUBE_VERTEX_TEX_COORD_BUF_ITEM_SIZE = 2;
  pwgl.CUBE_VERTEX_TEX_COORD_BUF_NUM_ITEMS = 24;
}

function setupTextures() {
  // texture for the table
  pwgl.woodTexture = gl.createTexture();
  loadImageForTexture("images/wood_128x128.jpg", pwgl.woodTexture);

  // texture for the floor
  pwgl.groundTexture = gl.createTexture();
  loadImageForTexture("images/wood_floor_256.jpg", pwgl.groundTexture);

  // texture for the box on the table
  pwgl.boxTexture = gl.createTexture();
  loadImageForTexture("images/wicker_256.jpg", pwgl.boxTexture);
}

function loadImageForTexture(url, texture) {
  var image = new Image();
  image.onload = function() {
    pwgl.ongoingImageLoads.splice(pwgl.ongoingImageLoads.indexOf(image), 1);
    // the splice() method adds/removes items to/from an array, and returns the removed item(s).
    // syntax: array.splice(index,howmany,item1,.....,itemX)
    textureFinishedLoading(image, texture);
  }
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
  setupFloorBuffers();
  setupCubeBuffers();
}

function uploadModelViewMatrixToShader() {
  gl.uniformMatrix4fv(pwgl.uniformMVMatrixLoc, false, pwgl.modelViewMatrix);
}

function uploadProjectionMatrixToShader() {
  gl.uniformMatrix4fv(pwgl.uniformProjMatrixLoc, false, pwgl.projectionMatrix);
}

function drawFloor() {
  // draw the floor
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.floorVertexPositionBuffer);
  gl.vertexAttribPointer(pwgl.vertexPositionAttributeLoc, pwgl.FLOOR_VERTEX_POS_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.floorVertexTextureCoordinateBuffer);
  gl.vertexAttribPointer(pwgl.vertexTextureAttributeLoc, pwgl.FLOOR_VERTEX_TEX_COORD_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, pwgl.groundTexture);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.floorVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLE_FAN, pwgl.FLOOR_VERTEX_INDEX_BUF_NUM_ITEMS, gl.UNSIGNED_SHORT, 0);
}

function drawCube(texture) {
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.cubeVertexPositionBuffer);
  gl.vertexAttribPointer(pwgl.vertexPositionAttributeLoc, pwgl.CUBE_VERTEX_POS_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.cubeVertexTextureCoordinateBuffer);
  gl.vertexAttribPointer(pwgl.vertexTextureAttributeLoc, pwgl.CUBE_VERTEX_TEX_COORD_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.cubeVertexIndexBuffer);

  gl.drawElements(gl.TRIANGLES, pwgl.CUBE_VERTEX_INDEX_BUF_NUM_ITEMS, gl.UNSIGNED_SHORT, 0);
}

function drawTable(){
  // draw table top
  pushModelViewMatrix();
  mat4.translate(pwgl.modelViewMatrix, [0.0, 1.0, 0.0], pwgl.modelViewMatrix);
  mat4.scale(pwgl.modelViewMatrix, [2.0, 0.1, 2.0], pwgl.modelViewMatrix);

  uploadModelViewMatrixToShader();

  // draw the actual cube (now scaled to a cuboid) with woodTexture
  drawCube(pwgl.woodTexture);
  popModelViewMatrix();

  // Draw table legs
  for (var i =- 1; i <= 1; i += 2) {
    for (var j = -1; j <= 1; j += 2) {
      pushModelViewMatrix();
      mat4.translate(pwgl.modelViewMatrix, [i * 1.9, -0.1, j * 1.9], pwgl.modelViewMatrix);
      mat4.scale(pwgl.modelViewMatrix, [0.1, 1.0, 0.1], pwgl.modelViewMatrix);
      uploadModelViewMatrixToShader();
      drawCube(pwgl.woodTexture);
      popModelViewMatrix();
    }
  }
}

function draw() {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 1, 100.0, pwgl.projectionMatrix);
  mat4.identity(pwgl.modelViewMatrix);
  mat4.lookAt([8, 5, -10],[0, 0, 0], [0, 1,0], pwgl.modelViewMatrix);

  uploadModelViewMatrixToShader();
  uploadProjectionMatrixToShader();
  gl.uniform1i(pwgl.uniformSamplerLoc, 0);

  drawFloor();

  // Draw table
  pushModelViewMatrix();
  mat4.translate(pwgl.modelViewMatrix, [0.0, 1.1, 0.0], pwgl.modelViewMatrix);
  uploadModelViewMatrixToShader();
  drawTable();
  popModelViewMatrix();

  // Draw box on top of the table
  pushModelViewMatrix();
  mat4.translate(pwgl.modelViewMatrix, [0.0, 2.7 ,0.0], pwgl.modelViewMatrix);
  mat4.scale(pwgl.modelViewMatrix, [0.5, 0.5, 0.5], pwgl.modelViewMatrix);
  uploadModelViewMatrixToShader();
  drawCube(pwgl.boxTexture);
  popModelViewMatrix();

  pwgl.requestId = requestAnimFrame(draw,canvas);
}


function startup() {
  canvas = document.querySelector(".canvas");
  canvas = WebGLDebugUtils.makeLostContextSimulatingCanvas(canvas);
  canvas.addEventListener('webglcontextlost', handleContextLost, false);
  canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

  window.addEventListener('mousedown', function() {
    canvas.loseContext();
  });

  gl = createGLContext(canvas);
  setupShaders();
  setupBuffers();
  setupTextures();
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  draw();
}

function handleContextLost(event) {
  event.preventDefault();
  cancelRequestAnimFrame(pwgl.requestId);

  // Ignore all ongoing image loads by removing
  // their onload handler
  for (var i = 0; i < pwgl.ongoingImageLoads.length; i++) {
    pwgl.ongoingImageLoads[i].onload = undefined;
  }
  pwgl.ongoingImageLoads = [];
}

function handleContextRestored(event) {
  setupShaders();
  setupBuffers();
  setupTextures();
  inc = inc + 0.1;
  gl.clearColor(0.0 + inc, 0.0 + inc, 0.0 + inc, 1.0);
  gl.enable(gl.DEPTH_TEST);
  pwgl.requestId = requestAnimFrame(draw,canvas);
}

document.addEventListener('DOMContentLoaded', startup);
