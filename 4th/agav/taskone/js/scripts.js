var gl;
var canvas;
var shaderProgram;
var vertexBuffer;

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

  // the vertex coordinates and colours are interleaved
  var vertices = [
  //  x     y     z   |   r     g    b    a
     0.0,  0.5,  0.0,    255,   0,   0,  255, // V0
     0.5, -0.5,  0.0,     0,   250,  6,  255, // V1
    -0.5, -0.5,  0.0,     0,    0,  255, 255  // V2
   ];

  var verticesAmount = 3; // total number of vertices

  // calculate how many bytes that are needed for one vertex element that consists of (x,y,z) + (r,g,b,a)
  var vertexSizeInBytes = 3 * Float32Array.BYTES_PER_ELEMENT + 4 * Uint8Array.BYTES_PER_ELEMENT;
  var vertexSizeInFloats = vertexSizeInBytes / Float32Array.BYTES_PER_ELEMENT;

  // allocate the buffer
  var buffer = new ArrayBuffer(verticesAmount * vertexSizeInBytes);

  // map the buffer to a Float32Array view to access the position
  var positionView = new Float32Array(buffer);

  // map the same buffer to a Uint8Array to access the color
  var colorView = new Uint8Array(buffer);

  // populate the ArrayBuffer from the array
  var positionOffsetInFloats = 0;
  var colorOffsetInBytes = 12;

  var k = 0; // index for array
  for (var i = 0; i < verticesAmount; i++) {
    positionView[positionOffsetInFloats + 0] = vertices[k + 0]; // x
    positionView[positionOffsetInFloats + 1] = vertices[k + 1]; // y
    positionView[positionOffsetInFloats + 2] = vertices[k + 2]; // z

    colorView[colorOffsetInBytes + 0] = vertices[k + 3]; // r
    colorView[colorOffsetInBytes + 1] = vertices[k + 4]; // g
    colorView[colorOffsetInBytes + 2] = vertices[k + 5]; // b
    colorView[colorOffsetInBytes + 3] = vertices[k + 6]; // a

    positionOffsetInFloats += vertexSizeInFloats;
    colorOffsetInBytes += vertexSizeInBytes;

    k += 7;
  }

  gl.bufferData(gl.ARRAY_BUFFER, buffer, gl.STATIC_DRAW);
  vertexBuffer.positionSize = 3;
  vertexBuffer.colorSize = 4;
  vertexBuffer.numberOfItems = 3;
}

function draw() {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // bind the buffer containing both position and color
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // describe how the positions are organized in the vertex array
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexBuffer.positionSize, gl.FLOAT, false, 16, 0);

  // describe how colors are organized in the vertex array
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, vertexBuffer.colorSize, gl.UNSIGNED_BYTE, true, 16, 12);

  // draw the triangle
  gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numberOfItems);
}
