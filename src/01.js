// example -01 
const pageNo = Math.ceil((index+1) / pageSize)

//pageSize = 10
// 0->1
// 9->1
// 10->2

const A = [1,2,3,5,6]
const max =  Math.max(...A)
//等价于: const max = Math.max.apply(null, A)  -> 早期写法
//等价于： const max =  Math.max(1,2,3,5,6)
//同理
const  min = Math.min(...A)

Math.round(20 + Math.random()*10 )



function is_prime(n) {
  if(n <=1 ) {return false}
  const N = Math.floor(Math.sqrt(n))
  let is_prime = true  
  for (let i = 2 ; i <= N; i++) {
    if( n % i === 0) {
      is_prime = false
      break
    }
  }
  return is_prime
}


function match(n, c){
  return (c=='[' && n==']') || (c=='(' && n==')')
}

function is_balance( str ) {
  const [first, ...others] = str
  const stack = [first]
  while(others.length > 0 ) {
    const c = stack[stack.length - 1]
    const n = others.shift()
    if(!match(n, c)) {
      stack.push(n)
    } else {
      stack.pop()
    }
  }
  return stack.length ===0
}


[...new Set(['a', 'b', 'c', 'f'])]





