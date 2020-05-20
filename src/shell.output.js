'use strict'

function Output (client) {
    
    this.el = document.createElement('div')
    this.el.id = 'output'
    this._textarea = document.createElement('textarea')
    this._textarea.setAttribute('wrap','hard')
    this._textarea.id = "output-area"

    this._label = document.createElement('label')
    this._label.setAttribute('for',"output-area")
    this._label.innerText = "output"

    this.install = function (host) {
        this.el.appendChild(this._textarea)
        this.el.appendChild(this._label)
        host.appendChild(this.el)
    }

    this.start = function(){}

    this.generatePoem = (structure)=>{
        let transisionTable = client.corpus.transitionTable
        let wordsBySyllable = client.corpus.wordsBySyllable
        let wordTokens = client.corpus.wordTokens
        this._textarea.value = client.TextGeneration.generatePoemFromStructure(structure,transisionTable,wordsBySyllable,wordTokens)
    }

}