const THREE = require('three')
const Stats = require('stats.js')
window.THREE = THREE
import fullscreen from './modules/fullscreen.js'
import * as main from './main'

export class engine {
    constructor() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100000)
        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setClearColor("#e5e5e5")
        this.gameActive = false
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        document.body.appendChild(this.renderer.domElement)
        this.time = new THREE.Clock()
        var game = this
        this.stats = new Stats()
        this.stats.showPanel(0)
        document.body.appendChild( this.stats.dom )
        new fullscreen(this,
            function () {
                game.gameActive = true
                console.log('Fullscreen in')
            },
            function () {
                game.gameActive = false
                console.log('Fullscreen out')
            })
        main.start(this)
        this.update()
    }

    update() {
        let game = this
        let stats = this.stats
        function update() {

            if (game.gameActive) {
                stats.begin()
                game.delta = game.time.getDelta()
                main.update(game)
                game.renderer.render(game.scene, game.camera)
                stats.end()
            }
            requestAnimationFrame(update)
        }
        update()

    }
}

new engine()