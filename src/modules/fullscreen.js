const $ = require('jquery')

export class fullscreen {
    /**
     * Will put game into fullscreen mode and resize
     * @param {*} game
     * @param {Function} eventIn Will run whenever app goes into full screen mode.
     * @param {Function} eventOut Will run whenever app goes out of full screen mode.
     */
    constructor(game, events = {}) {
        //fullscreen mode
        this.active = false
        let active = this.active
        $(game.renderer.domElement).click(function () {
            if (!active) {
                active = true
                game.renderer.domElement.requestFullscreen()
                game.renderer.domElement.requestPointerLock()
                console.log(window.innerHeight)
                game.renderer.setSize(window.screen.width, window.screen.height)
                game.mainCamera.aspect = window.screen.width / window.screen.height
                game.mainCamera.updateProjectionMatrix()
                game.gameActive = true
                if (events.eventIn) { events.eventIn() }
                console.log(game)
            }
        })
        $(document.body).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function (e) {
            var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
            var event = state ? 'FullscreenOn' : 'FullscreenOff';
            if (event == "FullscreenOff") {
                active = false
                game.renderer.setSize(window.innerWidth, window.innerHeight)
                game.mainCamera.aspect = window.innerWidth / window.innerHeight
                game.mainCamera.updateProjectionMatrix()
                game.gameActive = false
                if (events.eventOut) { events.eventOut() }

            }
        });
    }
}