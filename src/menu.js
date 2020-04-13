'use strict'

function Menu (client) {
    this.el = document.createElement('ul')
    this.el.id = 'menu'

    this.install = function (host) {
        host.appendChild(this.el)
    }

    this.start = function(){}

}