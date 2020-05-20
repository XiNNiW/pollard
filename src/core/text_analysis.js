function TextAnalysisModule(FunctionalUtilities){

    this.tokenizeWords = (text)=>
        FunctionalUtilities.pipe(
            text => text.match(/\S+/g),
            words => words?words.map((t)=>t.toLowerCase().replace(/[.,<>?\/#!@$%\^&\*;:{}\[\]=\-\+_`~()"“”]/g,"")):[]
        )(text)
      
    this.countTransitions = (tokens) => tokens.reduce((acc,token,index,tokens)=>{
        const getPreviousToken = tokens=>tokens[index - 1]
        const addToTransitionIfPresent = previousToken => 
            acc[previousToken] 
                ? { [previousToken]: acc[previousToken].concat([token]) } 
                : { [previousToken]: [token] }
        const filterOutUndefinedTransitions = transition => 
            transition[undefined] 
                ? { [token]: [] } 
                : transition
        const mergeWithPreviousTransitions = transition => { return { ...acc, ...transition } }
        return FunctionalUtilities.pipe(
            getPreviousToken,
            addToTransitionIfPresent,
            filterOutUndefinedTransitions,
            mergeWithPreviousTransitions
        )(tokens)

    },{})

    this.countSyllablesInWord = (word)=>{
        return FunctionalUtilities.pipe(
            word=>word.replace(/(?:[^laeiouy]es|e|[^laeiouy]e)$/, ''),
            word=>word.replace(/^y/, ''),
            word=>word.match(/[aeiouy]{1,2}/g),
            syllables=>syllables?syllables.length:word.length
        ) (word)
    }

    this.countSyllablesForTokens = (tokens) =>
        tokens.reduce((acc,token)=> {
                let count = this.countSyllablesInWord(token)
                if(acc[count]){
                    acc[count] = acc[count].concat([token])
                } else {
                    acc[count] = [token]
                }
                
                return acc
        },{})
    

}