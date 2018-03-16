import * as THREE from 'three'
import Animate from './Animate.js'
import { pAtPosInRange } from './utils.js'


export default class Planet extends Animate {
  /**
   * @param {object} cfg  configurations for radius, segments, scale, material
   * @param {THREE.Group} group optionally add it to the group at instantiation.
   */
  constructor(cfg, group){
    super()
    const {radius, segments, scale} = cfg
    this.opacityLength = cfg.opacityLength
    this.material = new THREE.MeshBasicMaterial(cfg.material)
    this.geometry = new THREE.SphereGeometry(radius, segments, segments)
    this.pivotPoint = new THREE.Group()
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.scale.set(scale, scale, scale)
    this.pivotPoint.add(this.mesh)
    group && group.add(this.pivotPoint)
    this.animateOpactiyOnRotate = this.animateOpactiyOnRotate.bind(this)
  }

  rotate(step){
    this.mesh.rotation.y -= step
  }

  rotateAroundCenter(step, index, r, speed, offset = 0, callback = false) {
    let xAmp = Math.cos((step * speed) + offset)
    let yAmp = Math.sin(step * speed + offset)
    this.mesh.position.x = r * xAmp
    this.mesh.position.z = r * yAmp
    if( typeof callback === 'function' ) callback(xAmp, yAmp, r, speed, offset)
  }

  grow(step, index, growth){
    this.mesh.scale.x += growth
    this.mesh.scale.y += growth
    this.mesh.scale.z += growth
  }

  animateOpactiyOnRotate(xAmp){
    if( Math.abs(xAmp) >= 1 - this.opacityLength){
      this.material.opacity = pAtPosInRange(1 - this.opacityLength, 1, xAmp)
      this.material.needsUpdate = true
    } else {
      this.material.opacity = 0
    }
  }

  addTexture(image){
    this.texture = new THREE.TextureLoader().load(image)
    this.material.setValues({
      map: this.texture,
      wireframe: false
    })
    this.material.needsUpdate = true
  }

}
