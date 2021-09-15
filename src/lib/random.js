Array.prototype.random = function(){
   let index = Math.floor(Math.random() * this.length) 
   return this[index]
}