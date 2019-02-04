function plane_prim() {

}

function cube_prim(length, c) {
	var geo = new THREE.BoxGeometry(length, length, length);
	var mat = new THREE.MeshBasicMaterial( {color: c, wireframe: true } );
	return new THREE.Mesh(geo, mat);
}

function sphere_prim() {

}

function cylinder_prim() {

}

function cone_prim() {

}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var cube = cube_prim(1, 0x00ff00);
cube.rotation.x += 1;
cube.rotation.y += 1;
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}
animate();