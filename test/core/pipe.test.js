let UnitTest = require('../framework.js')
let pipeTest = new UnitTest('PipeTest')
const FunctionalUtilitiesModule = pipeTest.readJSFile('./src/core/functional_utilities.js')
const FunctionalUtilities = new FunctionalUtilitiesModule

pipeTest.testCase('pipe returns a composition of functions', (assert)=>{
    let pipeline = FunctionalUtilities.pipe(
        x=>x+5,
        x=>x*x,
        x=>`${x} is the value at the end of the pipe`
    )

    assert.equal('pipe line at 2',pipeline(2), '49 is the value at the end of the pipe')
    assert.equal('pipe line at 2',pipeline(3), '64 is the value at the end of the pipe')
})

