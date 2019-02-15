function plane_prim(width, height, c) {
	var geo = new THREE.PlaneGeometry(width, height);
	var mat = new THREE.MeshBasicMaterial( {color: c, wireframe: false} );
	return new THREE.Mesh(geo, mat);
}

function cube_prim(length, c) {
	var geo = new THREE.BoxGeometry(length, length, length);
	var mat = new THREE.MeshBasicMaterial( {color: c, wireframe: false } );
	return new THREE.Mesh(geo, mat);
}

function sphere_prim(radius, widthSegments, heightSegments, c) {
	var geo = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
	var mat = new THREE.MeshBasicMaterial( {color: c, wireframe: false} );
	return new THREE.Mesh(geo, mat);
}

function cylinder_prim(radius, height, radialSegments, heightSegments, c) {
	var geo = new THREE.CylinderGeometry(radius, radius, height, radialSegments, heightSegments);
	var mat = new THREE.MeshBasicMaterial( {color: c, wireframe: false} );
	return new THREE.Mesh(geo, mat);
}

function cone_prim(radius, height, radialSegments, heightSegments, c) {
	var geo = new THREE.ConeGeometry(radius, height, radialSegments, heightSegments);
	var mat = new THREE.MeshBasicMaterial( {color: c, wireframe: false} );
	return new THREE.Mesh(geo, mat);
}

var views = [
	{
		left: 0,
		top: 0,
		width: 0.5,
		height: 1.0,
		background: new THREE.Color( 0.5, 0.5, 0.7 ),
		eye: [ 0, 0, 0 ],
		up: [ 0, 1, 0 ],
		fov: 75,
		updateCamera: function ( camera, scene, mouseX ) {
		  camera.position.x += mouseX * 0.05;
		  camera.position.x = Math.max( Math.min( camera.position.x, 2000 ), - 2000 );
		  camera.lookAt( scene.position );
		}
	},
	{
		left: 0.5,
		top: 0.0,
		width: 0.5,
		height: 1.0,
		background: new THREE.Color( 0.5, 0.5, 0.7 ),
		eye: [ 0, 1800, 0 ],
		up: [ 0, 0, 1 ],
		fov: 45,
		updateCamera: function ( camera, scene, mouseX ) {
		  camera.position.x -= mouseX * 0.05;
		  camera.position.x = Math.max( Math.min( camera.position.x, 2000 ), - 2000 );
		  camera.lookAt( camera.position.clone().setY( 0 ) );
		}
	}
];

function onDocumentMouseMove( event ) {
	mouseX = ( event.clientX - window.innerWidth / 2 );
	mouseY = ( event.clientY - window.innerHeight / 2 );
}

var mouseX = 0, mouseY = 0;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );

for (var i = 0; i < views.length; i++) {
	var view = views[i];
	var camera = new THREE.PerspectiveCamera(view.fov, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.fromArray(view.eye);
	camera.up.fromArray(view.up);
	view.camera = camera;
}

var scene = new THREE.Scene();

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


views[0].camera.position.z = 15;
views[0].camera.position.y += 3;

console.log(views[0].camera);

function animate() {
	requestAnimationFrame( animate );

	for (var i = 0; i < views.length; i++) {
		var view = views[i];
		var camera = view.camera;
		view.updateCamera( camera, scene, mouseX, mouseY );
		var left = Math.floor( window.innerWidth * view.left );
		var top = Math.floor( window.innerHeight * view.top );
		var width = Math.floor( window.innerWidth * view.width );
		var height = Math.floor( window.innerHeight * view.height );
		renderer.setViewport( left, top, width, height );
		renderer.setScissor( left, top, width, height );
		renderer.setScissorTest( true );
		renderer.setClearColor( view.background );
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.render( scene, camera );
	}

	renderer.render( scene, views[0].camera );
}
animate();