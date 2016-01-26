var gl;
var canvas;
var shaderProgram;
var vertexBuffer;

var shaderVertex = `
  attribute vec3 aVertexPosition;
  void main() {
    gl_Position = vec4(aVertexPosition, 1.0);
  }
`;

var shaderFragment = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
`;

document.addEventListener('DOMContentLoaded', startup);

function startup() {
  canvas = document.querySelector('.canvas');

  gl = WebGLDebugUtils.makeDebugContext(createGLContext(canvas));

  setupShaders();
  setupBuffers();

  // clears the canvas to white
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
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
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
}

function setupBuffers() {
  vertexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  var triangleVertices = [
     0.0,  0.5,  0.0,
    -0.5, -0.5,  0.0,
     0.5, -0.5,  0.0
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

  vertexBuffer.itemSize = 3; // 3 coords of each vertex
  vertexBuffer.numberOfItems = 3; // 3 vertixes in total in this buffer
}

function draw() {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numberOfItems);
}
