const fs = require('fs')
console.log(`Starting Tests`)


const coreTests = fs.readdirSync('./test/core').filter((file) => { return file.indexOf('.test.js') > 0 })

coreTests.forEach((testPath)=>{
  require('./test/core/'+testPath)
})

console.log(`Done!`)