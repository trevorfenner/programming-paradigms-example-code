const myFunction = ( function () {
  let counter =0
  return function() {
    ++counter
    return counter
    }
})()

const x = function(a, b) { return a * b }

export {myFunction, x}