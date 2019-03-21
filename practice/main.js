var points = [];

function triangle(a, b, c)
{
	points.push(a, b,c);
}

function divide_triangle(a, b, c, count)
{
	if (count == 0)
	{
		triangle(a, b, c);
		return;
	}

	var ab = mix(a, b, 0.5);
	var ac = mix(a, c, 0.5);
	var bc = mix(b, c, 0.5);

	count--;
	divide_triangle(a, ab, ac, count);
	divide_triangle(c, ac, bc, count);
	divide_triangle(b, bc, ab, count);
}

window.onload = function main()
{
	var canvas = document.getElementById("gl-canvas");
	var gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) {
		alert("WebGL is unavailable");
	}

	var vertices = [
		vec2(-1, -1),
		vec2(0, 1),
		vec2(1, -1)
	];

	const depth = 8;
	var numpoints = Math.pow(3, depth) - 1;
	divide_triangle(vertices[0], vertices[1], vertices[2], depth);

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(1.0, 1.0, 1.0, 1.0);

	var program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);

	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, numpoints);
}
