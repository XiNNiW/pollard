'use strict'

function Output (client) {
    this.el = document.createElement('div')
    this.el.id = 'output'
    this._textarea = document.createElement('textarea')
    this._textarea.setAttribute('wrap','hard')

    this.install = function (host) {
        this.el.appendChild(this._textarea)
        host.appendChild(this.el)
    }

    this.start = function(){}

    this.generatePoem = (structure)=>{
        const linesInStructure = structure.split("\n")
        const linesInPoem = linesInStructure.map((line)=>this.generateLineInStructure(line))
        this._textarea.value = linesInPoem.join("\n")
    }

    this.generateLineInStructure = (structureForLine, corpus=client.corpus) => {
        let wildcardGroups = structureForLine.match(/[.-]*/g)
        let words = structureForLine.match(/[^.-]*/g)
        let generatedWords = wildcardGroups.map((group)=>this.generatePhraseInGroup(group, corpus=client.corpus))
        let generatedWordsIterator = generatedWords[Symbol.iterator]();
        
        let wordsInLine = words.map((word)=>{
            if(word){
                return word
            } else {
                let nextWord = generatedWordsIterator.next()
                while(!nextWord.done & (nextWord.value == "" | nextWord.value == " ")){

                    nextWord = generatedWordsIterator.next()
                }
                return nextWord.value?nextWord.value:undefined
            }
        })

        let filteredWords = wordsInLine.filter(w=>w!==undefined).filter(w=>w!==" ")
 
        return filteredWords.join(" ")
        
    }

    this.generatePhraseInGroup = (structure, corpus=client.corpus, wordsInGeneratedLine=[]) => {
        // structureForLine.match(/[.-]/g)
        let syllablesInLine = structure.length //match(/[.-]/g)
        const wordsInTable = Object.keys(corpus.transitionTable)

        if (syllablesInLine>0) {
            let nextWord
            let possibleNextWords
    
            if(wordsInGeneratedLine.length==0) {
                wordsInGeneratedLine = []
                possibleNextWords = filterOutWordsThatAreTooBig(wordsInTable, syllablesInLine, corpus.wordsBySyllable)
                nextWord = getRandomWordFromList(possibleNextWords)

            } else {
                let previousWord = wordsInGeneratedLine[wordsInGeneratedLine.length-1]
                possibleNextWords = corpus.transitionTable[previousWord]
                possibleNextWords = possibleNextWords?filterOutWordsThatAreTooBig(possibleNextWords, syllablesInLine, corpus.wordsBySyllable):[]

            }

            if(possibleNextWords.length>0) {
                nextWord = getRandomWordFromList(possibleNextWords)

            } else {
                possibleNextWords = filterOutWordsThatAreTooBig(wordsInTable, syllablesInLine, corpus.wordsBySyllable)
                nextWord = getRandomWordFromList(possibleNextWords)

            }

            if(nextWord) {
                wordsInGeneratedLine.push(nextWord)
                let numberOfSyllablesInNextWord = client.corpus.countSyllablesInWord(nextWord)
                let remainingStructure = structure.slice(numberOfSyllablesInNextWord)

                return this.generatePhraseInGroup(remainingStructure, corpus, wordsInGeneratedLine)
            } else {

                return wordsInGeneratedLine.join(" ") + structure
            }

        } else {
            return wordsInGeneratedLine.join(" ")
        }
    }

    function filterOutWordsThatAreTooBig(listOfWords, maxSyllables, tableOfSyllablesToWord=corpus.wordsBySyllable) {
        let acceptableWords = []
        for (let step=1; step<=maxSyllables; step++) {
            acceptableWords.push(tableOfSyllablesToWord[step])
        }
        acceptableWords = acceptableWords.flat()

        return listOfWords.map((word)=>acceptableWords.includes(word)?word:[]).flat()
    }

    function getRandomWordFromList(wordsInTable) {
        return wordsInTable[Math.floor(Math.random() * wordsInTable.length)]
    }
}