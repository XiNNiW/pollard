let UnitTest = require('../framework.js')

let textAnalysisTest = new UnitTest('TextAnalysisTest','./src/core/text_analysis.js')
TextAnalysisModule = textAnalysisTest.readJSFile('./src/core/text_analysis.js')
const FunctionalUtilitiesModule = textAnalysisTest.readJSFile('./src/core/functional_utilities.js')
const FunctionalUtilities = new FunctionalUtilitiesModule

textAnalysisTest.testCase("tokenize words", (assert) => {
    let TextAnalysis = new TextAnalysisModule(FunctionalUtilities)

    assert.equal('should create array of words without spaces', TextAnalysis.tokenizeWords('hello my name is david'), ['hello','my','name','is','david'])

    assert.equal('should remove punctuation', TextAnalysis.tokenizeWords('hel;:/?.>,<!@#$%^&**()_+-=`~lo %^there*'), ['hello', 'there'])

    assert.equal('should not return null', TextAnalysis.tokenizeWords(''), [])
});

textAnalysisTest.testCase("countSyllablesInWord", (assert) => {
    let TextAnalysis = new TextAnalysisModule(FunctionalUtilities)
    assert.equal('one is 1', TextAnalysis.countSyllablesInWord('one'), 1)
    assert.equal('two is 1', TextAnalysis.countSyllablesInWord('two'), 1)
    assert.equal('hi is 1', TextAnalysis.countSyllablesInWord('hi'), 1)
    assert.equal('when is 1', TextAnalysis.countSyllablesInWord('when'), 1)
    assert.equal('1 is 1', TextAnalysis.countSyllablesInWord('1'), 1)

    assert.equal('whisper is 2', TextAnalysis.countSyllablesInWord('whisper'), 2)
    assert.equal('welcome is 2', TextAnalysis.countSyllablesInWord('welcome'), 2)
    assert.equal('open is 2', TextAnalysis.countSyllablesInWord('open'), 2)
    assert.equal('joker is 2', TextAnalysis.countSyllablesInWord('joker'), 2)

    assert.equal('opera is 3', TextAnalysis.countSyllablesInWord('opera'), 3)
    assert.equal('opener is 3', TextAnalysis.countSyllablesInWord('opener'), 3)
    assert.equal('appleton is 3', TextAnalysis.countSyllablesInWord('appleton'), 3)
    assert.equal('tardiness is 3', TextAnalysis.countSyllablesInWord('tardiness'), 3)

    assert.equal('analysis is 4', TextAnalysis.countSyllablesInWord('analysis'), 4)
    assert.equal('incompleted is 4', TextAnalysis.countSyllablesInWord('incompleted'), 4) 


    assert.equal('"" is 0', TextAnalysis.countSyllablesInWord(''), 0) 

});

textAnalysisTest.testCase("countTransitions", (assert)=>{
    let TextAnalysis = new TextAnalysisModule(FunctionalUtilities)
    let tokens = ['1','2','3','4','1','2','4','3','4','2','1','1']
    let expectedTransisionTable = {
        '1':['2','2','1'],
        '2':['3','4','1'],
        '3':['4','4'],
        '4':['1','3','2'],
    }
    assert.deepEqual("should create proper transition table",TextAnalysis.countTransitions(tokens),expectedTransisionTable)
});

textAnalysisTest.testCase("countSyllablesForTokens", (assert)=>{
    let TextAnalysis = new TextAnalysisModule(FunctionalUtilities)
    let tokens = ["one", "hello", "opening", "analysis", "summary", "fledgling", "owls", "nest" ]
    let expectedSyllableCounts = {
        '1':['one','owls', 'nest'],
        '2':['hello','fledgling'],
        '3':['opening','summary'],
        '4':['analysis'],
    }
    assert.deepEqual("should return dictionary of words by syllable count", TextAnalysis.countSyllablesForTokens(tokens), expectedSyllableCounts)
})