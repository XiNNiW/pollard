let UnitTest = require('../framework.js')
let textAnalysisTest = new UnitTest('TextAnalysisTest','./src/core/core.text_generation.js')
TextAnalysisModule = textAnalysisTest.readJSFile('./src/core/core.text_analysis.js')
let TextAnalysis = new TextAnalysisModule

textAnalysisTest.testCase("get random word from list", (assert, TextGenertation) => {
    let tokens = ['one','two','three']
    let resultCounts = {
        'one':0,
        'two':0,
        'three':0
    }
    const iterations = 10000;
    for(let i=0;i<iterations;i++){
        let randomWord = TextGenertation.getRandomWordFromList(tokens)
        resultCounts[randomWord]++
    }
    const percentOne = resultCounts["one"] / iterations;
    const percentTwo = resultCounts["two"] / iterations;
    const percentThree = resultCounts["three"] / iterations;
    assert.between(`one gets 33%`,percentOne,0.329,0.34)
    assert.between(`two gets 33%`,percentTwo,0.329,0.34)
    assert.between(`three gets 33%`,percentThree,0.329,0.34)

});

textAnalysisTest.testCase("generate poem from structure", (assert, TextGenertation) => {
    let corpus = "I have instant conductors all over me whether I pass or stop"
    let structure = '..-.-\n..----'
    let wordTokens = TextAnalysis.tokenizeWords(corpus)
    let transitionTable = TextAnalysis.countTransitions(wordTokens)
    let wordsBySyllable = TextAnalysis.countSyllablesForTokens(wordTokens)
    
    let poem = TextGenertation.generatePoemFromStructure(structure, transitionTable, wordsBySyllable, wordTokens)

    let lines = poem.split('\n')
    assert.equal("should create 2 lines", lines.length, 2)

    let wordsInLineOne = lines[0].split(' ')
    let syllablesInLineOne = wordsInLineOne.reduce((acc,word)=>acc+TextAnalysis.countSyllablesInWord(word),0)
    assert.equal("line one should have 5 syllables", syllablesInLineOne,5)

    let wordsInLineTwo = lines[1].split(' ')
    let syllablesInLineTwo = wordsInLineTwo.reduce((acc,word)=>acc+TextAnalysis.countSyllablesInWord(word),0)
    assert.equal("line one should have 6 syllables", syllablesInLineTwo,6)
});

