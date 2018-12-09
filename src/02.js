// function solve(arr, N) {
//     const s = new Set([arr.shift() % N])
//     while(arr.length > 0 ) {
//         const ak = arr.pop()
//         s.add(ak)
//         s.forEach( t => s.add( (t + ak) % N))
//     }
//     return s.has(0)
// }

// const arr = [1,2,3,4,5,6,7]
// console.log( arr.splice(2,2,'x'))
// //[3,4]
// console.log(arr)
// [1,2,'x',5,6,7]
// console.log()
// arr.splice(2,1) //删除x
// arr.splice(2,0,'y') //在5后面添加2

const students = [
{id:1, name:'Ruler', group_id: 1, score:92},
{id:2, name:'Super', group_id: 1, score:81},
{id:3, name:'Dog', group_id: 1, score:30},
{id:4, name:'Beaty', group_id: 2, score:75},
{id:5, name:'Jason', group_id: 2, score:88},
{id:6, name:'Water', group_id: 2, score:59},
{id:7, name:'Codez', group_id: 3, score:21},
{id:8, name:'Wonderfull', group_id: 3, score:98},
{id:9, name:'Caous', group_id: 3, score:67},
]

const groups = [
    {id: 1, name: 'Red'},
    {id: 2, name: 'Yellow'},
    {id: 3, name: 'Green'},
]


const studentsWithGrade = students.map( student => {
    return {
        ...student,
        grade: student.score >= 60? '通过' : '不合格'
    }
})

//通过的学员
const passedStudents  = students.filter(x => x.score > 60)

//组1的学员
const group1Students = students.filter(x => x.group_id === 1)

const studentsInGroups  = students.reduce(
    (groups, student) => {
        groups[student.group_id]  = [ ...(groups[student.group_id] || []), student]
        return groups
    }, {}
)

const studentsWithGroupInfo = students.map(student  => {
    const group = groups.find(g => g.id === student.group_id)
    return {
        ...student,
        groupName: group.name
    }
})

const sortedByScoreAsc = students.sort((a,b) => {
    return a.score - b.score
})
const sortedByScoreDesc = students.sort((a,b) => {
    return b.score - a.score
})


console.log(sortedByScoreAsc,'sortedByScoreAsc')
// console.log(sortedByScoreDesc,'sortedByScoreDesc')


