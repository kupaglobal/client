// function isPrimeNumber(number) {
//     if (number === 2 || number === 3) {
//         return true;
//     }
//     if (number < 2 || number % 2 === 0 || number % 3 === 0) {
//         return false;
//     }

//     for (let i = 5; i * i <= number; i += 6) {
//         if (number % i === 0 || number % (i + 2) === 0) {
//           return false;
//         }
//     }
//     return true
// }
// let visitors = {
//     1:4,
//     2:5,
//     3:3,
//     4:5,
//     5:7,
//     6:9,
//     7:10,
//     8:11,
//     9:13,
//     10:17,
//     11:22,
//     12:100
// }
// const visitorIds = Object.keys(visitors)
// let primeFloorVisitors = []
// Object.values(visitors).forEach((floor, index) => {
//     if (isPrimeNumber(floor)) {
//         primeFloorVisitors.push(visitorIds[index])
//     }
// })
// console.log(primeFloorVisitors)

function isPrimeNumber(number) {
    if (number === 2 || number === 3) {
        return true;
    }
    if (number < 2 || number % 2 === 0 || number % 3 === 0) {
        return false;
    }

    for (let i = 5; i * i <= number; i += 6) {
        if (number % i === 0 || number % (i + 2) === 0) {
          return false;
        }
    }
    return true
}

const visitorIdFloor = {
    1: 5,
    2: 3,
    3: 7,
    4: 2,
    5: 9,
    6: 4,
    7: 6,
    8: 11,
    9: 23,
    10: 41,
    11: 15
}
const max_capacity = 4

const visitorIds = Object.keys(visitorIdFloor)
let primeFloorVisitor = {}

Object.values(visitorIdFloor).forEach((floor, index) => {
    if (isPrimeNumber(floor)) {
        primeFloorVisitor[visitorIds[index]] = floor
    }
})
const primeFloorVisitorIds = Object.keys(primeFloorVisitor)
let trips = {}

for (let i = 0; i < primeFloorVisitorIds.length )
// now we break the prime number floor visitors into groups of four
for (let i = 0; i < primeFloorVisitorIds.length; i += max_capacity) {
    const group = arr.slice(i, i + chunkSize);
    trips[`trip_${i+1}`] = []
    trips[`trip_${i+1}`].
}
  

console.log(primeFloorVisitor)
