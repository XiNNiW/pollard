'use strict'

function Corpus (client) {
    this.el = document.createElement('div')
    this.el.id = 'corpus'
    this._input = document.createElement('textarea')
    this._input.setAttribute('wrap','hard')
    this._input.id = "corpus-input"
    this._label = document.createElement('label')
    this._label.setAttribute('for','corpus-input')
    this._label.innerText = "corpus"


    this.install = function (host) {
        this.el.appendChild(this._input)
        this.el.appendChild(this._label)
        host.appendChild(this.el)
    }

    this.start = function(){}

}