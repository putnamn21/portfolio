const htmlContainer = document.getElementById('webgl')

export default {
  sh : htmlContainer.offsetHeight,
  sw : htmlContainer.offsetWidth,
  screenBckgrndClr: 'rgb(25,25,25)',
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
    mapImage : require('../../../images/earth-2.jpg'),
    radius   : 200,
    segments : 50,
    sScale   : 0.5
  },
  earthRotation: (2 * Math.PI) / 1000
}
