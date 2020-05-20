function FunctionalUtilities(){
    this.pipe = (...operations)=>{
        const _pipe = (a, b) => (arg) => b(a(arg));
        return operations.reduce(_pipe) 
    }
    this.Maybe = class Maybe{
        constructor(value){
            this._value = value
        }
        static of(value){
            return new Maybe(value)
        }
        static nothing(){
            return new Maybe(null)
        }
        static join(nestedMaybe){
            return nestedMaybe.flatMap(x=>x)
        }
    
        isNothing(){
            return this._value===null||this._value===undefined
        }
        map(fn){
            return this.isNothing()?Maybe.nothing():Maybe.of(fn(this._value))
        }
    
        flatMap(fn){
            if(this.isNothing()){
                return Maybe.nothing()
            } else {
                let result = fn(this._value)
                return result.isNothing()?Maybe.nothing():Maybe.of(result._value)
            }
        }
    
        apply(maybeValue){
            return this.isNothing()?Maybe.nothing():maybeValue.map(this._value)
        }
    
        getOrElse(valueIfNothing){
            return this.isNothing()?valueIfNothing:this._value
        }
    
        toString(){
            return `Maybe: ${this._value}`
        }
    }
}