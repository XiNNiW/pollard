'use strict'

function Menu (client) {

    const generatePoem = () => client.output.generatePoem(client.structure._input.value)

    this.el = document.createElement('ul')
    this.el.id = 'menu'
    this.pollardItem = document.createElement('li')
    this.pollardLink = document.createElement('a')
    this.pollardItem.appendChild(this.pollardLink)
    this.pollardLink.innerText = "pollard"
    this.pollardItemMenu = document.createElement('ul')
    this.pollardItem.appendChild(this.pollardItemMenu)
    this.generate = document.createElement('li')
    this.generate.innerHTML = 'generate <i>control+enter</i>'
    this.pollardItemMenu.appendChild(this.generate)
    this.el.appendChild(this.pollardItem)


    this.install = function (host) {
        
        host.appendChild(this.el)
    }

    this.start = function() {
        this.bindEventListeners()      
    }

    this.onKeyDown = (e) => {

        if (event.ctrlKey && event.keyCode === 13) {
            client.output.generatePoem(client.structure._input.value)
        }
    }

    this.handleGestureStart = (e)=>{
        this.touchStartEvent = e
    }

    this.handleGestureMove = (e)=>{
        if(this.touchStartEvent&&this.touchStartEvent.targetTouches.length>1){
            this.touchMoveEvent = e
        }
    }

    this.handleGestureEnd = (e)=>{

        if(this.touchStartEvent && this.touchMoveEvent && this.touchStartEvent.targetTouches && this.touchMoveEvent.targetTouches) {
            const xi = this.touchStartEvent.targetTouches[0].clientX
            const yi = this.touchStartEvent.targetTouches[0].clientY
            const xf = this.touchMoveEvent.targetTouches[0].clientX
            const yf = this.touchMoveEvent.targetTouches[0].clientY

            const run = (xf - xi)
            const rise = (yf - yi)
            const slope = rise/run


            if (run>0 && slope > -1 && slope < 1){
                generatePoem()
            }
        }

        this.touchStartEvent = null
        this.touchMoveEvent = null
    }

    this.bindEventListeners = ()=> {
        this.generate.addEventListener('click',generatePoem)
        window.addEventListener('keydown', this.onKeyDown, false)
        window.addEventListener('touchstart', this.handleGestureStart, true)
        window.addEventListener('touchmove', this.handleGestureMove, true)
        window.addEventListener('touchend', this.handleGestureEnd, true)
    }
}