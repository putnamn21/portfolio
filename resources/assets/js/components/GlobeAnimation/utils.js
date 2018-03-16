import * as THREE from 'three'

export function rand(min, max){
  return Math.random() * (max - min) + min
}

export function degToRad(deg){
  return deg * Math.PI / 180
}

export function radToDeg(rad){
  return rad * 180 / Math.PI
}
/**
 * Position At Percentage In Range
 * @param  {Number} min
 * @param  {Number} max
 * @param  {Number} p   Position
 * @return {Number}     position
 */
export function posAtPInRange(min, max, p){
  return max - ((max - min) * (1 - p))
}
/**
 * Percentage at Postition In Range
 * @param  {Number} min
 * @param  {Number} max
 * @param  {Number} p   Percentage
 * @return {Number}     Percentage between two numbers
 */
export function pAtPosInRange(min, max, pos){
  return (pos - min) / (max - min)
}
export function rN(){
  return Math.random() > 0.5 ? -1 : 1
}
/**
 * [latLongToVector3 description]
 * @param  {Number} lat
 * @param  {Number} lon
 * @param  {Number} radius Earth Radius
 * @param  {Number} heigth height above earth at point
 * @return {THREE.Vector3}
 */
export function latLongToVector3(lat, lon, radius, height = 0) {
  var phi = (lat)*Math.PI/180
  var theta = (lon-180)*Math.PI/180

  var x = -(radius+height) * Math.cos(phi) * Math.cos(theta)
  var y = (radius+height) * Math.sin(phi)
  var z = -((radius+height) * Math.cos(phi) * Math.sin(theta))

  return new THREE.Vector3(x,y,z)
}
