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
