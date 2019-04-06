var vertices;
var vertex_colors;
var indices;
var gl;
var points = [];
var num_vertices = 36;
var matrix;
var model_view_matrix;

var thetas = [0, 0, 0];
var rot_funcs = [rotateX, rotateY, rotateZ];

function render()
{
	//Compute rotation matrix
	matrix = mat4();
	for (var i = 0; i < rot_funcs.length; i++)
	{
		matrix = mult(matrix, rot_funcs[i](thetas[i]));
	}

	//matrix = mult(rotateZ(theta), mult(rotateX(theta), rotateY(theta)));

	//Send the new matrix to the GPU
	gl.uniformMatrix4fv(model_view_matrix, false, flatten(matrix));

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0);
	requestAnimFrame(render);
}

window.onload = function main()
{
	var canvas = document.getElementById("gl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) {
		alert("WebGL is unavailable on your system");
	}

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0.1, 0.1, 0.1, 1.0);
	gl.enable(gl.DEPTH_TEST);

	//Array of cube vertices
	vertices = [
		vec3(-0.5, -0.5, 0.5),
		vec3(-0.5, 0.5, 0.5),
		vec3(0.5, 0.5, 0.5),
		vec3(0.5, -0.5, 0.5),
		vec3(-0.5, -0.5, -0.5),
		vec3(-0.5, 0.5, -0.5),
		vec3(0.5, 0.5, -0.5),
		vec3(0.5, -0.5, -0.5)
	];

	vertex_colors = [
		vec4(0.0, 0.0, 0.0, 1.0),
		vec4(1.0, 0.0, 0.0, 1.0),
		vec4(1.0, 1.0, 0.0, 1.0),
		vec4(0.0, 1.0, 0.0, 1.0),
		vec4(0.0, 0.0, 1.0, 1.0),
		vec4(1.0, 0.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(0.0, 1.0, 1.0, 1.0)
	];

	if (vertices.length != vertex_colors.length)
	{
		alert("vertices and vertex_colors are of differing lengths.");
	}

	//Define the indices of each triangle
	indices = [
		1, 0, 3,
		3, 2, 1,
		2, 3, 7,
		7, 6, 2,
		3, 0, 4,
		4, 7, 3,
		6, 5, 1,
		1, 2, 6,
		4, 5, 6,
		6, 7, 4,
		5, 4, 0,
		0, 1, 5
	];

	var program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	model_view_matrix = gl.getUniformLocation(program, "model_view_matrix");

	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);

	var cbuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cbuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertex_colors), gl.STATIC_DRAW);

	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vColor);

	var iBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

	render();
}

document.getElementById("sliderX").oninput = function()
{
	thetas[0] = this.value;
}

document.getElementById("sliderY").oninput = function()
{
	thetas[1] = this.value;
}

document.getElementById("sliderZ").oninput = function()
{
	thetas[2] = this.value;
}