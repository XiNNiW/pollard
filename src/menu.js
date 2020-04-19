'use strict'

function Menu (client) {

    this.el = document.createElement('ul')
    this.el.id = 'menu'

    this.install = function (host) {
        host.appendChild(this.el)
    }

    this.start = function() {
        window.addEventListener('keydown', this.onKeyDown, false)

        window.addEventListener('touchstart', this.handleGestureStart, true);
        window.addEventListener('touchmove', this.handleGestureMove, true);
        window.addEventListener('touchend', this.handleGestureEnd, true);
      

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
                
                client.output.generatePoem(client.structure._input.value)
            }
        }

        this.touchStartEvent = null
        this.touchMoveEvent = null
    }
}