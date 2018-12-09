// function factorial(n){
//     return n ===  0 ? 1 : factorial(n-1) * n
// }

// function fibonacci(n) {
//     return n == 1 || n == 2 ? 1 : fibonacci(n-1) + fibonacci(n-2)
// }


// function fibonacci(n) {
//   let [a,b] = [0,1]
//   for(let i=0; i<n; i++){
//       [a,b] = [b,a+b]
//   }
//   return b
// }

// console.log(fibonacci(10))

// function fibonacci(n) {
//   return Array(n).fill().reduce(([a,b], _) => {
//     return [b, a+b]
//   }, [0,1])[1]
// }

// function get_layout(ele){
//   const layout  = {
//     width: ele.offsetWidth,
//     height: ele.offsetHeight,
//     left: ele.offsetLeft,
//     top: ele.offsetTop
//   }
//   if(ele.offsetParent) {
//     const parentLayout = get_layout(ele.offsetParent)
//     layout.left += parentLayout.left
//     layout.top += parentLayout.top
//   }
//   return layout
// }

// function get_layout(ele) {
//   let left  = ele.offsetLeft, top = ele.offsetTop
//   let  p  = ele.offsetParent
//   while(p){
//     left += p.offsetLeft
//     top += p.offsetTop
//     p = p.offsetParent
//   }
//   return {
//     width: ele.offsetWidth,
//     height: ele.offsetHeight,
//     left: left,
//     top: top
//   }
// }


// function clone (obj) {
//   if(obj == null || typeof obj !== 'object') return obj
//   const newObj = new obj.constructor()
//   for(let key in Object.getOwnPropertyDescriptors(obj)){
//     newObj[key] = clone( obj[key] )
//   }
//   return newObj
// }

// function deepCompare(a, b){
//   if(a === null || typeof a !== 'object' || b === null || typeof b !== 'object'){
//     return a === b
//   }
//   const propsA = Object.getOwnPropertyDescriptors(a)
//   const propsB = Object.getOwnPropertyDescriptors(b)
//   if(Object.keys(propsA).length !== Object.keys(propsB).length){
//     return false
//   }
//   return Object.keys(propsA).every( key => {
//     deepCompare(a[key], b[key])
//   })
// }


