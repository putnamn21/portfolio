import * as THREE from 'three';
import mapImage from '../../../images/earth.jpg';
import {addSat, addEarth, rotateAroundCenter} from './utils.js';


// earthAxis       : (new THREE.Vector3(Math.sin( this.earthTilt ), Math.cos( this.earthTilt ), 0)).normalize(),




export default (function(){

  const htmlContainer = document.getElementById('webgl');

  const CFG = {
    mapImage        : mapImage,
    sh    : htmlContainer.offsetHeight,
    sw     : htmlContainer.offsetWidth,
    screenBckgrndClr: 'rgb(15,15,15)',
    pixelRatio      : window.devicePixelRatio || 1,
    camera : {
      view_angle      : 20,
      view_aspect     : htmlContainer.offsetWidth / htmlContainer.offsetHeight,
      view_near       : 0.1,
      view_far        : 20000,
    },
    view_initialpos : [-300, 250, 4000],
    earthTilt       : Math.PI * 23 / 180,
    earth : {
      radius   : 200,
      segments : 50
    }
  };
  const renderer = new THREE.WebGLRenderer();
  const camera = new THREE.PerspectiveCamera(
    ...Object.values(CFG.camera)
  );
  const scene = new THREE.Scene();
  const group = new THREE.Group();

  /*
   ***** INITIALIZATION *****
   */


  // SET THE SIZE FOR THE RENDERER
  renderer.setSize(CFG.sw, CFG.sh);
  renderer.setPixelRatio(CFG.pixelRatio);

  // SET THE VIEW CAMERA
  camera.position.set(...CFG.view_initialpos);
  camera.rotation.set(0, 0,  CFG.earthTilt);

  // SET THE SCENE
  scene.background = new THREE.Color(CFG.screenBckgrndClr);
  scene.add(camera);
  scene.add(group);

  // Add it to the DOM
  htmlContainer.appendChild(renderer.domElement);


  /*
   ***** END INITIALIZATION ******
   */


  /*
   *  MAKE THE PLANETS
   */

  addEarth(group, CFG).then((earth) => {

    const satellite = addSat(group, 3, CFG.earth.radius * 2);
    const sat2 = addSat(group, 2, CFG.earth.radius * 1.2);
    const sat3 = addSat(group, 2, CFG.earth.radius * 1.2);

    let count = 0;

    (function update () {
      earth.rotation.y -= 0.0025;
      let step = count * -.01;
      sat3.position.y = (CFG.earth.radius * 2 / 2) * Math.cos(step * 12);
      sat2.position.y = (CFG.earth.radius * 1.2 / 2) * Math.sin(step);
      rotateAroundCenter(sat3, (CFG.earth.radius * 1.2), step * 12);
      rotateAroundCenter(sat2, (CFG.earth.radius * 1.2), -step );

      rotateAroundCenter(satellite, CFG.earth.radius * 2, step);
      count ++;
      renderer.render(scene, camera);
      requestAnimationFrame(update);
    })();
  });

  /*
   * END MAKE THE PLANETS
   */


})();
