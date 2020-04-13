'use strict'

function Client() {

    this.el = document.createElement('div')
    this.el.id = 'pollard'

    this.structure = new Structure(this)
    this.corpus = new Corpus(this)
    this.output = new Output(this)
    this.menu = new Menu(this)

    this.install = function (host = document.body) {
        this._wrapper = document.createElement('div')
        this._wrapper.id = 'wrapper'
        this.structure.install(this._wrapper)
        this.corpus.install(this._wrapper)
        this.output.install(this._wrapper)

        this.menu.install(this._wrapper)

        this.el.appendChild(this._wrapper)
        host.appendChild(this.el)
    }

    this.start = function() {
        this.structure.start()
        this.corpus.start()
        this.output.start()
        this.menu.start()
    }
}

