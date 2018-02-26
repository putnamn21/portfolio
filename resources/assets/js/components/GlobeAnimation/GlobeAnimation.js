import * as THREE from 'three';
import mapImage from '../../../images/earth.jpg';

const htmlContainer = document.getElementById('webgl');


// earthAxis       : (new THREE.Vector3(Math.sin( this.earthTilt ), Math.cos( this.earthTilt ), 0)).normalize(),




export default (function(){

  const CFG = {
    mapImage        : mapImage,
    screenHeight    : htmlContainer.offsetHeight,
    screenWidth     : htmlContainer.offsetWidth,
    screenBckgrndClr: 0x000000,
    pixelRatio      : window.devicePixelRatio || 1,
    view_angle      : 55,
    view_near       : 0.1,
    view_far        : 20000,
    view_initialpos : [-300, 250, 1500],
    earthTilt       : Math.PI * 23 / 180,
    earth : {
      radius   : 200,
      segments : 50
    }
  };
  console.log(CFG);
  /**
  * SET THE SIZE FOR THE RENDERER
  */
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(CFG.screenWidth, CFG.screenHeight);
  renderer.setPixelRatio(CFG.pixelRatio);

  /*
  * SET THE VIEW CAMERA
  */
  const camera = new THREE.PerspectiveCamera(
    CFG.view_angle,
    ( CFG.screenWidth / CFG.screenHeight ),
    CFG.view_near,
    CFG.view_far
  );
  camera.position.set(...CFG.view_initialpos);
  camera.rotation.set(0, 0,  CFG.earthTilt);

  /*
  * SET THE SCENE
  */
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(CFG.screenBckgrndClr);
  scene.add(camera);

  htmlContainer.appendChild(renderer.domElement);

  const
    globe = new THREE.Group();

  scene.add(globe);


  let loader = new THREE.TextureLoader();
  let earth;
  let mesh2;

  loader.load( CFG.mapImage , function(texture){

    let sphere = new THREE.SphereGeometry(CFG.earth.radius, CFG.earth.segments, CFG.earth.segments);
    let material = new THREE.MeshBasicMaterial( {map: texture, overdraw: 0.7 } );

    let sphere2 = new THREE.SphereGeometry(CFG.earth.radius *1.1, CFG.earth.segments, CFG.earth.segments);
    let material2 = new THREE.MeshBasicMaterial( {color: 0x2980b9, wireframe: true} );
    let mesh2Size = 1;

    earth = new THREE.Mesh(sphere, material);
    mesh2 = new THREE.Mesh(sphere2, material2);

    //mesh2.rotation.set( 0, 0,  Math.PI * 23 / 180 ); // this plus mesh uncommented plus globe rotate works.
    //mesh.rotation.set( 0, 0,  Math.PI * 23 / 180 ); // tilt
    //globe.rotation.set( 0,0, - Math.PI * 23 / 180  );
    globe.add(earth);
    globe.add(mesh2);
    globe.position.z = -1000;
    //let speed = 10;
    //let breakingPercentage = .007 * (speed / 10);
    let count = 0;

    var r = CFG.earth.radius / 3959 * 22236;

    var theta = 0;
    const size = 2;
    let marker = new THREE.SphereGeometry(size, 2, 2);
    let pointColor = new THREE.MeshBasicMaterial({color: 'rgb(155,155,155)'});
    let pointMesh = new THREE.Mesh(marker, pointColor);

    function update () {
      //globe.rotation.y -= 0.01;
      //globe.rotateOnAxis( earthAxis, -.01 );
      earth.rotation.y -= 0.005;
      mesh2.scale.x  = mesh2Size,
      mesh2.scale.y  = mesh2Size;
      mesh2.scale.z = mesh2Size;
      if( mesh2Size < 2) {
        mesh2Size += 1/50;
      }

      if (count === 30 ){
        globe.add(pointMesh);
      }
      if (count > 30){
        theta += 0.005;
        pointMesh.position.x = r * Math.cos(theta);
        pointMesh.position.z = r * Math.sin(theta);
      }
      count ++;
      renderer.render(scene, camera);
      requestAnimationFrame(update);
    }
    update();
  });

})();
