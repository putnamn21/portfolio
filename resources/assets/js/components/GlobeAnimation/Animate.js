export default class Animate {
  constructor(){
    this.needsUpdate = []
  }
  /**
     * [addUpdateHandler description]
     * @param {Function} callback   function to be called
     * @param {array}   args       deconstructed as callback args
     * @param {number}   [length=0] how long to run it for, -1 = infinity
     */
  addUpdateHandler(callback, args = [], length = -1){
    callback = callback.bind(this)
    const index = this.needsUpdate.length //add it as unique to needsUpdate
    let step = 0

    this.needsUpdate[index] = () => {
      callback(step, index, ...args)
      if (step === length) this.needsUpdate.splice(index, 1)
      step++
    }
  }

  update(){
    for(var i = 0; i < this.needsUpdate.length; i++){
      if (!this.needsUpdate[i]) continue
      this.needsUpdate[i]()
    }
  }
}
