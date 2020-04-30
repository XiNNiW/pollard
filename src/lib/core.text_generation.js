function TextGenerationModule(){
    const TextAnalysis = new TextAnalysisModule

    this.getRandomWordFromList = (listOfWords)=>{
        return listOfWords[Math.floor(Math.random() * (listOfWords.length - 1))]
    }

    this.generatePoemFromStructure = (structure, transitionTable, wordsBySyllable, wordTokens)=>{
        const linesInStructure = structure.split("\n")
        const linesInPoem = linesInStructure.map((line)=>this.generateLineInStructure(line, transitionTable, wordsBySyllable, wordTokens))
        return linesInPoem.join("\n")
    }

    this.generateLineInStructure = (structureForLine, transitionTable, wordsBySyllable, wordTokens) => {
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
                generatedLine = nextWildcardGroup.value?this.generatePhraseInGroup(nextWildcardGroup.value,transitionTable, wordsBySyllable, wordTokens,generatedLine):generatedLine
                nextWildcardGroup = wildcardGroupIterator.next()
                
            } else {
                break;
            }
            
        }

        return generatedLine.join(" ")
        
    }

    this.generatePhraseInGroup = (structure, transitionTable, wordsBySyllable, wordTokens, wordsInGeneratedLine=[]) => {
        let syllablesInLine = structure.length
        const wordsInTable = Object.keys(transitionTable)
        if (syllablesInLine>0) {
            let nextWord
            let possibleNextWords
    
            if(wordsInGeneratedLine.length==0) {
                wordsInGeneratedLine = []
                possibleNextWords = filterOutWordsThatAreTooBig(wordsInTable, syllablesInLine, wordsBySyllable)
                nextWord = this.getRandomWordFromList(possibleNextWords)

            } else {
                let previousWord = wordsInGeneratedLine[wordsInGeneratedLine.length-1]
                possibleNextWords = transitionTable[previousWord]
                possibleNextWords = possibleNextWords?filterOutWordsThatAreTooBig(possibleNextWords, syllablesInLine, wordsBySyllable):[]

            

                if(possibleNextWords.length<1) {
                    possibleNextWords = filterOutWordsThatAreTooBig(wordsInTable, syllablesInLine, wordsBySyllable)

                } else if (possibleNextWords.length===1) {
                    possibleNextWords.push(this.getRandomWordFromList(wordTokens))
                } 

                nextWord = this.getRandomWordFromList(possibleNextWords)

            }

            if(nextWord) {
                wordsInGeneratedLine.push(nextWord)
                let numberOfSyllablesInNextWord = TextAnalysis.countSyllablesInWord(nextWord)
                let remainingStructure = structure.slice(numberOfSyllablesInNextWord)

                return this.generatePhraseInGroup(remainingStructure, transitionTable, wordsBySyllable, wordTokens, wordsInGeneratedLine)
                
            } else {
                return wordsInGeneratedLine.push(structure)
            }

        } else {
            return wordsInGeneratedLine
        }
    }

    function filterOutWordsThatAreTooBig(listOfWords, maxSyllables, tableOfSyllablesToWord) {
        let acceptableWords = []
        for (let step=1; step<=maxSyllables; step++) {
            acceptableWords.push(tableOfSyllablesToWord[step])
        }
        acceptableWords = acceptableWords.flat()

        return listOfWords.map((word)=>acceptableWords.includes(word)?word:[]).flat()
    }

}