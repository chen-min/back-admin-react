// const s = new Set([1,2,3,4,5])
// const it = s.values()
// console.log(it)
// //[Set Iterator] { 1, 2, 3, 4, 5 }

// // let val = null
// // while( !(val = it.next()).done){
// //     console.log(val)
// // }
// // // { value: 1, done: false }
// // { value: 2, done: false }
// // { value: 3, done: false }
// // { value: 4, done: false }
// // { value: 5, done: false }
// //另一种形式迭代
// for (const val of it){
//     console.log(val)
// }
// function *fibonacci() {
//     let a  = 1 , b = 1
//     yield a; 
//     yield b
//     while(true) {
//         const t = b
//         b = a + b
//         a = t
//         yield b
//     }
// }

// const it  = fibonacci()
// const feb10 = Array.from(Array(10), it.next, it).map(x => x.value)
// console.log(feb10,'feb')
// //[ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ] 'feb'

// function* flatten(arr) {
//   for(let i = 0; i < arr.length; i++){
//     if(Array.isArray(arr[i])){
//       yield *flatten(arr[i])
//     }  else {
//       yield arr[i]
//     }
//   }
// }

// console.log([...flatten([1,2,[3,4,[[5]]]])])
// //[ 1, 2, 3, 4, 5 ]

function request(url){
  return cb  => {
    setTimeout( () => {
      cb(Math.random())
    }, 1000)
  }
}
create_runner(function*(){
  const val1 = yield request('some url')
  const val2 = yield request('some url')
  console.log(val1,val2)
})()

function create_runner(genFunc) {
  const it = genFunc()
  function run(data) {
    const itVal = it.next(data)
    if(!itVal.done){
      itVal.value(run)
    }
  }
  return run
}