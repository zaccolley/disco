var gl;
var canvas;
var shaderProgram;
var vertexBuffer;
var vertexColorBuffer;

var shaderVertex = `
  attribute vec3 aVertexPosition;
  attribute vec4 aVertexColor;
  varying vec4 vColor;

  void main() {
    vColor = aVertexColor;
    gl_Position = vec4(aVertexPosition, 1.0);
  }
`;

var shaderFragment = `
  precision mediump float;
  varying vec4 vColor;

  void main() {
    gl_FragColor = vColor;
  }
`;

document.addEventListener('DOMContentLoaded', startup);

function startup() {
  canvas = document.querySelector('.canvas');

  gl = WebGLDebugUtils.makeDebugContext(createGLContext(canvas));

  setupShaders();
  setupBuffers();

  // clears the canvas to white
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  draw();
}

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

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return console.log(gl.getShaderInfoLog(shader));
  }

  return shader;
}

function setupShaders() {
  vertexShader = loadShader(shaderVertex, 'vertex');
  fragmentShader= loadShader(shaderFragment, 'fragment');

  shaderProgram = gl.createProgram();

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);

  gl.linkProgram(shaderProgram);
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log('Failed to setup shaders...');
  }

  gl.useProgram(shaderProgram);

  shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");

  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
  gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
}

function setupBuffers() {
  vertexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  var triangleVertices = [
     0.0,  0.5,  0.0, // V0
    -0.5, -0.5,  0.0, // V1
     0.5, -0.5,  0.0  // V2
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

  vertexBuffer.itemSize = 3; // 3 coords of each vertex
  vertexBuffer.numberOfItems = 3; // 3 vertixes in total in this buffer

  vertexColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);

  var colors = [
    1.0, 0.0, 0.0, 1.0, // V0
    0.0, 1.0, 0.0, 1.0, // V1
    0.0, 0.0, 1.0, 1.0  // V2
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  vertexColorBuffer.itemSize = 4;
  vertexColorBuffer.numberOfItems = 3;
}

function draw() {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numberOfItems);
}
