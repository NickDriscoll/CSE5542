function plane_prim(width, height, c) {
	var geo = new THREE.PlaneGeometry(width, height);
	var mat = new THREE.MeshBasicMaterial( {color: c, wireframe: true} );
	return new THREE.Mesh(geo, mat);
}

function cube_prim(length, c) {
	var geo = new THREE.BoxGeometry(length, length, length);
	var mat = new THREE.MeshBasicMaterial( {color: c, wireframe: true } );
	return new THREE.Mesh(geo, mat);
}

function sphere_prim(radius, widthSegments, heightSegments, c) {
	var geo = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
	var mat = new THREE.MeshBasicMaterial( {color: c, wireframe: true} );
	return new THREE.Mesh(geo, mat);
}

function cylinder_prim(radius, height, radialSegments, heightSegments, c) {
	var geo = new THREE.CylinderGeometry(radius, radius, height, radialSegments, heightSegments);
	var mat = new THREE.MeshBasicMaterial( {color: c, wireframe: true} );
	return new THREE.Mesh(geo, mat);
}

function cone_prim(radius, height, radialSegments, heightSegments, c) {
	var geo = new THREE.ConeGeometry(radius, height, radialSegments, heightSegments);
	var mat = new THREE.MeshBasicMaterial( {color: c, wireframe: true} );
	return new THREE.Mesh(geo, mat);
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Create our geometries
var plane = plane_prim(15, 15, 0xFFFFFF);
plane.rotation.x += 1.5;
plane.position.y -= 3;
scene.add( plane );

var left_foot = cone_prim(1, 2, 8, 1, 0xFF0000);
left_foot.position.x -= 3;
left_foot.position.y -= 3;
scene.add( left_foot );

var right_foot = cone_prim(1, 2, 8, 1, 0xFF0000);
right_foot.position.x += 3;
right_foot.position.y -= 3;
scene.add( right_foot );

var left_leg = cylinder_prim(1, 4, 8, 1, 0x0000FF);
left_leg.position.x -= 3;
scene.add(left_leg);

var right_leg = cylinder_prim(1, 4, 8, 1, 0x0000FF);
right_leg.position.x += 3;
scene.add(right_leg);

var body = cube_prim(4, 0x00FF00);
body.position.y += 4;
scene.add(body);

var head = sphere_prim(3, 8, 6, 0xFFFFFF);
head.position.y += 9;
scene.add(head);


camera.position.z = 15;
camera.position.y += 3;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();