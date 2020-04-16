'use strict'

function Menu (client) {

    this.el = document.createElement('ul')
    this.el.id = 'menu'

    this.install = function (host) {
        host.appendChild(this.el)
    }

    this.start = function() {
        window.addEventListener('keydown', this.onKeyDown, false)

    }

    this.onKeyDown = (e) => {
        if (event.ctrlKey && event.keyCode === 13) {
            client.output.generatePoem(client.structure._input.value)
        }
    }

}