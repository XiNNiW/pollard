let UnitTest = require('../framework.js')

let textAnalysisTest = new UnitTest('TextAnalysisTest','./src/core/core.text_analysis.js')

textAnalysisTest.testCase("tokenize words", (assert, TextAnalysis) => {

    assert.equal('should create array of words without spaces', TextAnalysis.tokenizeWords('hello my name is david'), ['hello','my','name','is','david'])

    assert.equal('should remove punctuation', TextAnalysis.tokenizeWords('hel;:/?.>,<!@#$%^&**()_+-=`~lo %^there*'), ['hello', 'there'])
});

textAnalysisTest.testCase("countSyllablesInWord", (assert, TextAnalysis) => {
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


});