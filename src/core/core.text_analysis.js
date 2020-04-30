function TextAnalysisModule(){

    this.tokenizeWords = (text)=>{
        return text.match(/\S+/g).map((t)=>t.toLowerCase().replace(/[.,<>?\/#!@$%\^&\*;:{}\[\]=\-\+_`~()"“”]/g,""))
    }

    this.countTransitions = (tokens) => {
        let transitions = {}
      
        tokens.forEach((token, index) => {
            const previousToken = tokens[index - 1]
            if (previousToken){
                if (!transitions[previousToken]) {
                    transitions[previousToken] = []
                }
                transitions[previousToken].push(token)
            }

        });

        return transitions
    }

    this.countSyllablesInWord = (word)=>{
        
        if (word.length <= 3) {
            return 1;
        }
        if (word.length == 0) {
            return 0;
        }
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        const syllables = word.match(/[aeiouy]{1,2}/g)
        return syllables?syllables.length:word.length
    }

    this.countSyllablesForTokens = (tokens) => {
        let syllableCounts = {}
        tokens.forEach((token)=>{
            const numberOfSyllables = this.countSyllablesInWord(token)
            if(!syllableCounts[numberOfSyllables]){

                syllableCounts[numberOfSyllables] = []
            }

            if(!syllableCounts[numberOfSyllables].includes[token]){
                syllableCounts[numberOfSyllables].push(token)
            }
        })

        return syllableCounts
    }

}