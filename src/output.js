'use strict'

function Output (client) {
    this.el = document.createElement('div')
    this.el.id = 'output'
    this._input = document.createElement('textarea')
    this._input.setAttribute('wrap','hard')

    this.install = function (host) {
        this.el.appendChild(this._input)
        host.appendChild(this.el)
    }

    this.start = function(){}
}