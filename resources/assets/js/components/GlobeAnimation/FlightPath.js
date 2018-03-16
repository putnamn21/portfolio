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
    this.distance = start.distanceTo(end)
    this.vPath = end.clone().sub(start)
    this.vPath.normalize()
    this.bezier = this.latLongBezier([
      start,
      this.vPath.clone().multiplyScalar(this.distance * .333).add(start),
      this.vPath.clone().multiplyScalar(this.distance * .666).add(start),
      end
    ])
    this.bezier = new THREE.CubicBezierCurve3(...this.bezier)
    this.plotPoints = this.bezier.getPoints(this.distance * config.pixelRatio)
    this.geometry = new THREE.BufferGeometry().setFromPoints( this.plotPoints )
    this.material = new THREE.LineBasicMaterial({
      color: 0x00ff00,
      linewidth: 2
    })
    this.path = new THREE.Line(this.geometry, this.material)
  }
  latLongBezier(points){
    return points.map((v,i) => {
      console.log(v)
      let distanceAboveEarth = 2
      if( i === 1 || i === 2){
        distanceAboveEarth = pAtPosInRange(0, 200, this.distance) * 400 + 10
      }
      let vector = latLongToVector3(
        v.x,
        v.y,
        config.earth.radius,
        distanceAboveEarth
      )
      console.log(vector)
      return vector
    })
  }
}
