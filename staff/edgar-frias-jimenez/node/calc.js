// const [, , a, b] = process.argv

// console.log(`Your value is ${Number(a) + Number(b)}`)

// const [, , ...nums] = process.argv

// console.log(nums.reduce((accum, num) => accum + Number(num), 0))

const [, , operator, ...nums] = process.argv

switch (operator) {
  case 'sum':
    console.log('Your number is:', nums.reduce((accum, num) => accum + Number(num), 0))
    break;
  case 'mul':
    console.log('Your number is:', nums.reduce((accum, num) => accum * Number(num), 1))
    break;
  case 'div':
    console.log('Your number is:', nums.reduce((accum, num) => accum / Number(num), 1))
    break;
  case 'res':
    console.log('Your number is:', nums.reduce((accum, num) => accum - Number(num), 0))
    break;
}
