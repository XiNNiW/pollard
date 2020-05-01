function UnitTest(className, pathToScriptUnderTest) {

    let fs = require('fs')
    
    this.testCase = (caseName, implementation)=>{

        let assert = {}
        assert.true = (message, booleanStatement)=>{
            const passed = booleanStatement
            if (passed) {
                console.log(className, ': ', caseName, '--', message, '--', "PASSED")
            }
            else {
                console.log(className, ': ', caseName, '--', message, '--', "FAILED")
            }
            return passed

        }

        assert.equal = (message, actual, expected)=>{
            let passed = actual === expected
            if(Array.isArray(expected)){
                passed = deepEqualArrays(actual,expected)
            }
            printPassed(passed, caseName, message, expected, actual)
            return passed
        }

        assert.deepEqual= (message, actual,expected)=>{
            let passed = deepEqual(actual,expected)
            printPassed(passed, caseName, message, expected, actual)
            return passed

        }

        assert.between= (message,actual,lowbound,highbound)=>{
            let passed = (actual>lowbound) && (actual<highbound)
            printPassed(passed, caseName, message, `between ${lowbound} and ${highbound}`, actual)
            return passed
        }

        let instance
        if(pathToScriptUnderTest){
            let module = this.readJSFile(pathToScriptUnderTest)
            instance = new module
        }
        implementation(assert, instance)
    }

    this.readJSFile = (path) => Function('return ('+fs.readFileSync(path)+')')()
    

    function printPassed(passed, caseName, message, expected, actual) {
        if (passed) {
            console.log(className, ': ', caseName, '--', message, '--', "PASSED")
        }
        else {
            console.log(className, ': ', caseName, '--', message, '--', "FAILED")
            console.log('---> ', 'expected: ', expected, 'actual: ', actual)
        }
    }

    function deepEqualArrays(array1,array2){
        if(array1.length!==array2.length){
            return false
        }

        let equal = true;

        for(let i=0; i<array1.length; i++){
            equal &= array1[i]===array2[i]
        }

        return equal
    }

    function deepEqualArrays(array1,array2){
        if(array1.length!==array2.length){
            return false
        }

        let equal = true;

        for(let i=0; i<array1.length; i++){
            equal &= deepEqual(array1[i],array2[i])
        }

        return equal
    }

    function deepEqual(a, b) {
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);

        const propsHaveDifferentLengths = aProps.length != bProps.length
        if (propsHaveDifferentLengths) {
            return false;
        }
    
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];

            if(Array.isArray(a[propName])){
                if(!deepEqualArrays(a[propName],b[propName])){
                    return false
                }
            }
            else {
                if (a[propName] !== b[propName]) {
                    return false;
                }
            } 
        }
    
        return true;
    }

}

module.exports = UnitTest

