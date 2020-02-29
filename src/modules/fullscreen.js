const $ = require('jquery')

class fullscreen {
    /**
     * Will put game into fullscreen mode and resize
     * @param {*} game
     * @param {Function} eventIn Will run whenever app goes into full screen mode.
     * @param {Function} eventOut Will run whenever app goes out of full screen mode.
     */
    constructor(game, eventIn, eventOut) {
        //fullscreen mode
        this.active = false
        let active = this.active
        $(game.renderer.domElement).click(function () {
            if (!active) {
                active = true
                game.renderer.domElement.requestFullscreen()
                game.renderer.domElement.requestPointerLock()
                game.renderer.setSize(window.innerWidth, window.innerHeight)
                game.camera.aspect = window.innerWidth / window.innerHeight
                game.camera.updateProjectionMatrix()
                
                if (eventIn) { eventIn() }
            }
        })
        $(game.renderer.domElement).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function (e) {
            var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
            var event = state ? 'FullscreenOn' : 'FullscreenOff';
            if (event == "FullscreenOff") {
                active = false
                game.renderer.domElement.requestFullscreen()
                game.renderer.setSize(window.innerWidth, window.innerHeight)
                game.camera.aspect = window.innerWidth / window.innerHeight
                game.camera.updateProjectionMatrix()

                if (eventOut) { eventOut() }

            }
        });
    }
}

export default fullscreen