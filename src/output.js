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
        
        let wordIterator = words[Symbol.iterator]();
        let wildcardGroupIterator = wildcardGroups[Symbol.iterator]();

        let generatedLine = []
        let nextWord = wordIterator.next()
        let nextWildcardGroup = wildcardGroupIterator.next()

        while(!nextWord.done | !nextWildcardGroup.done) {
            
            if(nextWord.value && nextWord.value.length!==0){

                generatedLine.push(nextWord.value)

                while(!nextWildcardGroup.done && nextWildcardGroup.value.length===0){
                    nextWildcardGroup = wildcardGroupIterator.next()
                }
                nextWord = wordIterator.next()
                

            } else if (nextWildcardGroup.value && nextWildcardGroup.value.length!==0){

                while(!nextWord.done && nextWord.value.length===0){
                    nextWord = wordIterator.next()
                }
                generatedLine = nextWildcardGroup.value?this.generatePhraseInGroup(nextWildcardGroup.value,corpus,generatedLine):generatedLine
                nextWildcardGroup = wildcardGroupIterator.next()
                
            } else {
                break;
            }
            
        }

        return generatedLine.join(" ")
        
    }

    this.generatePhraseInGroup = (structure, corpus=client.corpus, wordsInGeneratedLine=[]) => {
        let syllablesInLine = structure.length
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

            

                if(possibleNextWords.length<1) {
                    possibleNextWords = filterOutWordsThatAreTooBig(wordsInTable, syllablesInLine, corpus.wordsBySyllable)

                } else if (possibleNextWords.length===1) {
                    possibleNextWords.push(corpus.getRandomWord())
                } 

                nextWord = getRandomWordFromList(possibleNextWords)

            }

            if(nextWord) {
                wordsInGeneratedLine.push(nextWord)
                let numberOfSyllablesInNextWord = client.corpus.countSyllablesInWord(nextWord)
                let remainingStructure = structure.slice(numberOfSyllablesInNextWord)

                const ret = this.generatePhraseInGroup(remainingStructure, corpus, wordsInGeneratedLine)
                
                return ret
            } else {
                return wordsInGeneratedLine.push(structure)
            }

        } else {
            return wordsInGeneratedLine
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