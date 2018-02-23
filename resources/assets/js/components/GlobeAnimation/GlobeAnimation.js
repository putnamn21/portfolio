import * as THREE from 'three';
import mapImage from '../../../images/earth.jpg';


export default (function(){
  /**
  * SET THE SIZE FOR THE RENDERER
  */
  const htmlContainer = document.getElementById('webgl');
  const renderer = new THREE.WebGLRenderer();
  const WIDTH = htmlContainer.offsetWidth;
  const HEIGHT = htmlContainer.offsetHeight;
  const earthTiltRadians = Math.PI * 23 / 180;
  const earthAxis = new THREE.Vector3(Math.sin(  earthTiltRadians ), Math.cos(  earthTiltRadians ), 0);
  earthAxis.normalize();

  renderer.setSize(WIDTH, HEIGHT);
  renderer.setPixelRatio(window.devicePixelRatio);

  /*
  * SET THE VIEW CAMERA
  */
  const VIEW_ANGLE = 45;
  const ASPECT = WIDTH / HEIGHT;
  const NEAR = 0.1;
  const FAR = 10000;
  const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set( -300, 250, 500 );


  /*
  * SET THE SCENE
  */
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.add(camera);

  htmlContainer.appendChild(renderer.domElement);

  const RADIUS = 200,
    SEGMENTS = 50,
    RINGS = 50,
    globe = new THREE.Group();

  scene.add(globe);


  let loader = new THREE.TextureLoader();
  let mesh;
  let mesh2;

  loader.load( mapImage , function(texture){

    let sphere = new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS);
    let material = new THREE.MeshBasicMaterial( {map: texture, overdraw: 0.7 } );

    let sphere2 = new THREE.SphereGeometry(RADIUS * 1.2, SEGMENTS, RINGS);
    let material2 = new THREE.MeshBasicMaterial( {color: 0x2980b9, wireframe: true} );

    mesh = new THREE.Mesh(sphere, material);
    mesh2 = new THREE.Mesh(sphere2, material2);

    //mesh2.rotation.set( 0, 0,  Math.PI * 23 / 180 ); // this plus mesh uncommented plus globe rotate works.
    //mesh.rotation.set( 0, 0,  Math.PI * 23 / 180 ); // tilt
    globe.rotation.set( 0,0, - Math.PI * 23 / 180  );
    globe.add(mesh);
    globe.position.z = -1000;
    //let speed = 10;
    //let breakingPercentage = .007 * (speed / 10);
    let count = 0;

    function update () {
      //globe.rotateOnAxis( earthAxis, -.01 );
      //mesh.rotateOnAxis( noAxis, -.01 );
      //mesh2.rotateOnAxis( earthAxis, -.01 );

      if (count === 30 * 1 ){
        globe.add(mesh2);
      }
      count ++;
      renderer.render(scene, camera);
      requestAnimationFrame(update);
    }
    update();
  });

})();
