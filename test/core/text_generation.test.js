let UnitTest = require('../framework.js')
let textGenerationTest = new UnitTest('TextGenerationTest')
let TextAnalysisModule = textGenerationTest.readJSFile('./src/core/text_analysis.js')
let FunctionalUtilities = textGenerationTest.readJSFile('./src/core/functional_utilities.js')
let TextAnalysis = new TextAnalysisModule(new FunctionalUtilities)


textGenerationTest.testCase("get random word from 2 element list", (assert) => {
    TextGenerationModule = textGenerationTest.readJSFile('./src/core/text_generation.js')
    let TextGeneration = new TextGenerationModule(TextAnalysis,new FunctionalUtilities)
    let randomGenerator = Math.random
    let tokens = ['one','two','three']
    let resultCounts = {
        'one':0,
        'two':0,
        'three':0
    }
    const iterations = 20000;
    for(let i=0;i<iterations;i++){
        let randomWord = TextGeneration.getRandomWordFromList(tokens,randomGenerator)
        resultCounts[randomWord]++
    }
    const percentOne = resultCounts["one"] / iterations;
    const percentTwo = resultCounts["two"] / iterations;
    const percentThree = resultCounts["three"] / iterations;
    assert.between(`one gets 33%`, percentOne, 0.32, 0.34)
    assert.between(`two gets 33%`, percentTwo, 0.32, 0.341)
    assert.between(`three gets 33%`, percentThree, 0.32, 0.34)

});

textGenerationTest.testCase("get random word from 2 element list", (assert) => {
    TextGenerationModule = textGenerationTest.readJSFile('./src/core/text_generation.js')
    let TextGeneration = new TextGenerationModule(TextAnalysis,new FunctionalUtilities)
    let randomGenerator = Math.random
    let tokens = ['one','two']
    let resultCounts = {
        'one':0,
        'two':0,
    }
    const iterations = 100000;
    for(let i=0;i<iterations;i++){
        let randomWord = TextGeneration.getRandomWordFromList(tokens,randomGenerator)
        resultCounts[randomWord]++
    }
    const percentOne = resultCounts["one"] / iterations;
    const percentTwo = resultCounts["two"] / iterations;
    assert.between(`one gets 50%`, percentOne, 0.49, 0.51)
    assert.between(`two gets 50%`, percentTwo, 0.49, 0.51)

});

textGenerationTest.testCase("generate poem from structure", (assert) => {
    TextGenerationModule = textGenerationTest.readJSFile('./src/core/text_generation.js')
    let TextGeneration = new TextGenerationModule(TextAnalysis,new FunctionalUtilities)
    let corpus = "I have instant conductors all over me whether I pass or stop"
    const wordsInCorpus = TextAnalysis.tokenizeWords(corpus)
    let structure = '..-.-\n..----'
    let wordTokens = TextAnalysis.tokenizeWords(corpus)
    let transitionTable = TextAnalysis.countTransitions(wordTokens)
    let wordsBySyllable = TextAnalysis.countSyllablesForTokens(wordTokens)
    
    let poem = TextGeneration.generatePoemFromStructure(structure, transitionTable, wordsBySyllable, wordTokens)

    let lines = poem.split('\n')
    assert.equal("should create 2 lines", lines.length, 2)

    let wordsInLineOne = lines[0].split(' ')
    let syllablesInLineOne = wordsInLineOne.reduce((acc,word)=>acc+TextAnalysis.countSyllablesInWord(word),0)
    assert.equal(`line one should have 5 syllables: ${lines[0]}`, syllablesInLineOne, 5)
    wordsInLineOne.forEach((word)=>{
        assert.true(`${word} is in corpus`,wordsInCorpus.includes(word))
    })
   
    let wordsInLineTwo = lines[1].split(' ')
    let syllablesInLineTwo = wordsInLineTwo.reduce((acc,word)=>acc+TextAnalysis.countSyllablesInWord(word),0)
    assert.equal(`line one should have 6 syllables: ${lines[1]}`, syllablesInLineTwo, 6)
    wordsInLineTwo.forEach((word)=>{
        assert.true(`${word} is in corpus`,wordsInCorpus.includes(word))
    })
});

