import * as THREE from 'three';

/**
 * Returns a little marke
 * @param {THREE.Group} group    Group to add the satellite to
 * @param {integer} size         size of satellite
 * @param {integer} radius       distance from center
 * @param {String} [color='rgb(200,200,200)'] [description]
 * @return Satellite Group
 */
export const addSat = (group, size, radius, color = 'rgb(200,200,200)' ) => {
  let marker = new THREE.SphereGeometry(size, 10, 10);
  let pointColor = new THREE.MeshBasicMaterial({color: color});
  let satellite =  new THREE.Mesh(marker, pointColor);
  group.add(satellite);
  return satellite;
};

export const rotateAroundCenter = (object, r, step) => {
  object.position.x = r * Math.cos(step);
  object.position.z = r * Math.sin(step);
};
/**
 * Adds earth to the group and returns it
 * @param {THREE.Group} group Group that holds all the elements
 * @param {Object} cfg   configuration object
 * @return {Promise} a promise that resolves with the earth
 */
export const addEarth = (group, cfg) => {
  return new Promise((res) => {
    let loader = new THREE.TextureLoader();
    loader.load( cfg.mapImage , function(texture){
      const sphere = new THREE.SphereGeometry(cfg.earth.radius, cfg.earth.segments, cfg.earth.segments);
      const material = new THREE.MeshBasicMaterial( {map: texture, overdraw: 0.7 } );
      const earth = new THREE.Mesh(sphere, material);
      group.add(earth);
      res(earth);
    });
  });
};
