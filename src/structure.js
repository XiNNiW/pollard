'use strict'

function Structure (client) {
    this.el = document.createElement('div')
    this.el.id = 'structure'
    this._input = document.createElement('textarea')
    this._input.id = 'structure-input'
    this._input.setAttribute('wrap','hard')
    this._input.value = '..-.-\n..-...-\n..---'
    this._label = document.createElement('label')
    this._label.setAttribute('for','structure-input')
    this._label.innerText = "structure"

    this.install = function (host) {
        this.el.appendChild(this._input)
        this.el.appendChild(this._label)
        host.appendChild(this.el)
    }

    this.start = function(){}

}