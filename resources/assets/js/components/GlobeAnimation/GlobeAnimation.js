import * as THREE from 'three'
/*import {degToRad, rand, rN, latLongToVector3} from './utils.js'*/
import Planet from './Planet.js'
import FlightPath from './FlightPath.js'
import CFG from './config.js'

// earthAxis       : (new THREE.Vector3(Math.sin( this.earthTilt ), Math.cos( this.earthTilt ), 0)).normalize(),




export default (function(){

  const htmlContainer = document.getElementById('webgl')

  const renderer = new THREE.WebGLRenderer()
  const camera = new THREE.PerspectiveCamera(
    ...Object.values(CFG.camera)
  )
  const scene = new THREE.Scene()
  const group = new THREE.Group()

  /*
   ***** INITIALIZATION *****
   */


  // SET THE SIZE FOR THE RENDERER
  renderer.setSize(CFG.sw, CFG.sh)
  renderer.setPixelRatio(CFG.pixelRatio)

  // SET THE VIEW CAMERA
  camera.position.set(...CFG.view_initialpos)
  camera.rotation.set(0, 0,  CFG.earthTilt)

  // SET THE SCENE
  scene.background = new THREE.Color(CFG.screenBckgrndClr)
  scene.add(camera)
  scene.add(group)

  // Add it to the DOM
  htmlContainer.appendChild(renderer.domElement)

  //resize if screen changes
  window.addEventListener('resize', function() {
    let WIDTH = htmlContainer.offsetWidth,
      HEIGHT = htmlContainer.offsetHeight
    renderer.setSize(WIDTH, HEIGHT)
    camera.aspect = WIDTH / HEIGHT
    camera.updateProjectionMatrix()
  })
  /*
   ***** END INITIALIZATION ******
   */

  const Earth = new Planet({
    radius: CFG.earth.radius,
    segments: CFG.earth.segments,
    scale: CFG.earth.sScale,
    material: {
      color: 'rgb(150,150,150)', wireframe: true
    }
  }, group)


  const SeaToOma = new FlightPath(
    new THREE.Vector2(47.6062, 122.3321),
    new THREE.Vector2(41.2524, 95.9980)
  )
  const SeaToBangkok = new FlightPath(
    new THREE.Vector2(47.6062, 122.3321),
    new THREE.Vector2(13.7563, -100.5018)
  )
  group.add(SeaToOma.path, SeaToBangkok.path)


  // let satellites = []
  // for (var i = 0; i < 1000; i++){
  //   satellites.push(new Planet({
  //     radius: 1,
  //     segments: 2,
  //     scale: 1,
  //     opacityLength: rand(.01, .003),
  //     material: {
  //       color: 0xffffff,
  //       transparent: true,
  //       opacity: 1
  //     }
  //   }, group))
  // }

  let count = 0;

  (function update(){
    group.rotation.y -= CFG.earthRotation // earth rotation...
    Earth.update()
    // satellites.forEach((child) => {child.update()})

    switch(count){
    case 15:
      Earth.addUpdateHandler(Earth.grow, [.5/50], 50)
      // satellite.addUpdateHandler(satellite.rotateAroundCenter, [
      //   CFG.earth.radius * 1.1,
      //   0
      // ])
      // satellites.forEach((child) => {
      //   child.pivotPoint.rotation.x = (rand(degToRad(-360), degToRad(360)))
      //   child.pivotPoint.rotation.y = (rand(degToRad(-360), degToRad(360)))
      //   child.pivotPoint.rotation.z = (rand(degToRad(-360), degToRad(360)))
      //   child.addUpdateHandler(child.rotateAroundCenter, [
      //     CFG.earth.radius * 1.02,
      //     rand(.01, .015) * rN(),
      //     rand(0, (2 * Math.PI))
      //   ], -1)
      // })
      break
    case 200:
      Earth.addTexture(CFG.earth.mapImage)
      break
    case 300:
      break
    }

    renderer.render(scene, camera)
    requestAnimationFrame(update)
    count ++
  })()



})()
