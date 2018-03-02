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

export class Planet {
  constructor(group, cfg){
    const {radius, segments, scale} = cfg;
    this.needsUpdate = {}; //callback functions
    this.material = new THREE.MeshBasicMaterial(cfg.material);
    this.geometry = new THREE.SphereGeometry(radius, segments, segments);

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.scale.set(scale, scale, scale);
    this.mesh.name = 'earth';
    group.add(this.mesh);
  }

  rotate(step){
    this.mesh.rotation.y -= step;
  }

  rotateAroundCenter(r, speed, step) {
    this.mesh.position.x = r * Math.cos(step * speed);
    this.mesh.position.z = r * Math.sin(step * speed);
  }

  grow(step){
    this.mesh.scale.x += step;
    this.mesh.scale.y += step;
    this.mesh.scale.z += step;
  }

  addTexture(image){
    this.texture = new THREE.TextureLoader().load(image);
    this.material.setValues({
      map: this.texture,
      wireframe: false
    });
    this.material.needsUpdate = true;
  }
  /**
   * [addUpdateHandler description]
   * @param {Function} callback   function to be called
   * @param {array}   args       deconstructed as callback args
   * @param {number}   [length=0] how long to run it for, -1 = infinity
   */
  addUpdateHandler(callback, args, length = 0){

    const index = Object.keys(this.needsUpdate).length + 1; //add it as unique to needsUpdate

    let step = 0;
    callback = callback.bind(this);

    this.needsUpdate[index] = function(){
      callback(...args, step);
      step++;
      if (step === length) delete this.needsUpdate[index];
    };
    this.needsUpdate[index] = this.needsUpdate[index].bind(this);

  }

  update(){
    Object.values(this.needsUpdate).forEach(callback => {
      callback();
    });
  }
}
