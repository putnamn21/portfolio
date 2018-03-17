import * as THREE from 'three'
import { latLongToVector3, pAtPosInRange } from './utils.js'
import config from './config.js'



/**
 * Plots an airline path from one point to another
 * @param  {THREE.Vector2} start
 * @param  {THREE.Vector2} end
 * @return {THREE.Line}
 */
export default class flightPath {
  constructor( start, end ){
    this.start = latLongToVector3(start.x, start.y, config.earth.radius, 2)
    this.end = latLongToVector3(end.x, end.y, config.earth.radius, 2)
    this.distance = start.distanceTo(end)
    this.distanceMaxMin = pAtPosInRange(0, config.earth.radius * 2, this.distance)
    console.log(this.distanceMaxMin)
    this.heightMultiplier = config.earth.radius + 10 + (this.distanceMaxMin * 300)
    this.center = this.createControlPoint(this.start, this.end, config.earth.radius + 2)
    this.startControl = this.createControlPoint(this.start)
    this.endControl = this.createControlPoint(this.end)
    this.bezier = new THREE.CubicBezierCurve3(
      this.start,
      this.startControl,
      this.endControl,
      this.end
    )
    this.plotPoints = this.bezier.getPoints(this.distance * config.pixelRatio)
    this.geometry = new THREE.BufferGeometry().setFromPoints( this.plotPoints )
    this.material = new THREE.LineBasicMaterial({
      color: this.color(this.distanceMaxMin),
      linewidth: 2
    })
    this.path = new THREE.Line(this.geometry, this.material)
  }
  color(p){
    let redMulti = 1,
      greenMulti = 1
    if( p <= 0.5){
      redMulti = pAtPosInRange(0, 0.5, p)
    } else {
      greenMulti = pAtPosInRange(0.5, 1.0, p)
    }
    let red = Math.floor( 255 * redMulti )
    let green = Math.floor( 255 * greenMulti )
    console.log(red, green)
    return `rgb(${red},${green}, 0)`
  }
  createControlPoint(start, end = this.center, multiplier = this.heightMultiplier){
    let control = start.clone().lerp(end, 0.5)
    control.normalize()
    control.multiplyScalar(multiplier)
    return control
  }
}
