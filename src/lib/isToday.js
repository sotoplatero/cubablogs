String.prototype.isToday = function(){
   const stringDate = new Date(this)
   const currentDate = new Date

   return stringDate.toDateString() === currentDate.toDateString()
}

