

function UnitTest(className, pathToScriptUnderTest) {

    let fs = require('fs')
    
    
    this.testCase = (caseName, implementation)=>{

        let assert = {}
        assert.true = (message, booleanStatement)=>{
            const passed = booleanStatement
            if (passed){
                console.log(className,': ',caseName,'--',message,'--',"PASSED")
            } else {
                console.log(className,': ',caseName,'--',message,'--',"FAILED")
            }
        }

        assert.equal = (message, actual, expected)=>{
            let passed = actual === expected
            if(Array.isArray(expected)){
                passed = checkArraysEqual(actual,expected)
            }
            if (passed){
                console.log(className,': ',caseName,'--',message,'--',"PASSED")
            } else {
                console.log(className,': ',caseName,'--',message,'--',"FAILED")
                console.log('---> ', 'expected: ',expected, 'actual: ', actual)
            }
        }
        let module = Function('return ('+fs.readFileSync(pathToScriptUnderTest)+')')()
        let instance = new module
        implementation(assert, instance)
    }

    function checkArraysEqual(array1,array2){
        if(array1.length!==array2.length){
            return false
        }

        let equal = true;

        for(let i=0; i<array1.length; i++){
            equal &= array1[i]===array2[i]
        }

        return equal
    }

}

module.exports = UnitTest

