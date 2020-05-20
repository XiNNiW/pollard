let UnitTest = require('../framework.js')
let maybeMonadTest = new UnitTest('MaybeMonadTest')
const FunctionalUtilitesModule = maybeMonadTest.readJSFile('./src/core/functional_utilities.js')
const FunctionalUtilites = new FunctionalUtilitesModule
const Maybe = FunctionalUtilites.Maybe

maybeMonadTest.testCase('nothing should contain null or undefined', (assert)=>{
    let maybeNothing = Maybe.nothing()
    assert.equal('nothing has null',maybeNothing._value, null)
    assert.true('nothing know its nothing', maybeNothing.isNothing())

    let alsoNothing = Maybe.of(null)
    assert.equal('nothing has null',alsoNothing._value, null)
    assert.true('nothing know its nothing', alsoNothing.isNothing())

    let thisToo = Maybe.of(undefined)
    assert.equal('nothing has null',thisToo._value, undefined)
    assert.true('nothing know its nothing', thisToo.isNothing())
})

maybeMonadTest.testCase('map should operate on Maybe (if somthing) and return Maybe (always)',(assert)=>{
    let somthing = Maybe.of(5)
    let maybeEight = somthing.map((value)=>value+3)
    assert.equal('somthing is 5', somthing._value, 5)
    assert.true('maybeEight is not nothing', !maybeEight.isNothing())
    assert.equal('maybeEight is 8', maybeEight._value, 8)

    let nothing = Maybe.nothing()
    let alsoNothing = nothing.map((value)=> value+3)
    assert.true('return value is Maybe.nothing',alsoNothing.isNothing())

})

maybeMonadTest.testCase('map should return Maybe.nothing() if function returns null',(assert)=>{
    let somthing = Maybe.of('sandwitches')
    let nothing = somthing.map((value)=> null)
    assert.true('nothing is nothing',nothing.isNothing())
    assert.true('somthing is somthing',!somthing.isNothing())

    let alsoSomthing = Maybe.of('aren\'t we somthing?')
    let alsoNothing = somthing.map((value)=> undefined)
    assert.true('nothing is nothing',alsoNothing.isNothing())
    assert.true('somthing is somthing',!alsoSomthing.isNothing())
})

maybeMonadTest.testCase('flatMap should not return nested maybe values when fed a function that returns maybes',(assert)=>{
    let somthing = Maybe.of(5)
    let maybeEight = somthing.flatMap((value)=>Maybe.of(value+3))
    assert.equal('somthing is 5', somthing._value, 5)
    assert.true('maybeEight is not nothing', !maybeEight.isNothing())
    assert.equal('maybeEight is 8', maybeEight._value, 8)

    let nothing = Maybe.nothing()
    let alsoNothing = nothing.map((value)=> Maybe.of(value+3))
    assert.true('return value is Maybe.nothing',alsoNothing.isNothing())

})

maybeMonadTest.testCase('flatMap should return Maybe.nothing() if function returns maybe.nothing()',(assert)=>{
    let somthing = Maybe.of('sandwitches')
    let nothing = somthing.flatMap((value)=> Maybe.nothing())
    assert.true('nothing is nothing',nothing.isNothing())
    assert.equal('nothing is null',nothing._value,null)
    assert.true('somthing is somthing',!somthing.isNothing())

})

maybeMonadTest.testCase('getOrElse gets the wrapped value if its somthing, else returns its argument',(assert)=>{
    let maybeFish = Maybe.of('fish')
    assert.equal('its fish',maybeFish.getOrElse('not fish'),'fish')

    let maybeNotFish = Maybe.nothing()
    assert.equal('its not fish',maybeNotFish.getOrElse('not fish'),'not fish')
})

maybeMonadTest.testCase('apply takes in a maybe and calls map feeding in its value provided its a function and not nothing',(assert)=>{
    let maybeAFunction = Maybe.of((value)=>value + 5)
    let maybeNotAFunction = Maybe.nothing()
    assert.equal('maps the function', maybeAFunction.apply(Maybe.of(4))._value,9)

    assert.true('returns nothing of applied with nothing',maybeAFunction.apply(Maybe.nothing()).isNothing())

    assert.true('returns nothing it was nothing',maybeNotAFunction.apply(Maybe.of(3)).isNothing())
    assert.true('returns nothing it was nothing',maybeNotAFunction.apply(Maybe.nothing()).isNothing())

    let maybeAFunctionThatReturnsNothing = Maybe.of((value)=>null)
    assert.true('returns nothing wrapped function returns nothing',maybeAFunctionThatReturnsNothing.apply(Maybe.of(4)).isNothing())

    let maybeAFunctionThatReturnsMaybe = Maybe.of((value)=>Maybe.of('nests'))
    assert.true('returns nested maybes',maybeAFunctionThatReturnsMaybe.apply(Maybe.of(4))._value._value,'nests')
    
})

maybeMonadTest.testCase('join flattens out nested maybe, returning maybe of value',(assert)=>{
    let nestedMaybe = Maybe.of(Maybe.of(7))
    assert.equal('flattens',Maybe.join(nestedMaybe)._value,7)
})

maybeMonadTest.testCase('to string', (assert)=>{
    assert.equal('to string prints, maybe: value', Maybe.of('fish').toString(),"Maybe: fish")
    assert.equal('to string prints, maybe: value', Maybe.nothing().toString(),"Maybe: null")
    assert.equal('to string prints, maybe: value', Maybe.of(undefined).toString(),"Maybe: undefined")
})