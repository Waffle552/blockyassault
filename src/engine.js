const THREE = require('three')
const CANNON = require('cannon')
const Stats = require('stats.js')
const gejs = require('./gejs.js')
window.THREE = THREE
import fullscreen from './modules/fullscreen.js'


export class engine {
    constructor() {
        this.scene = new THREE.Scene()
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setClearColor("#e5e5e5")
        this.gameActive = false
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        document.body.appendChild(this.renderer.domElement)
        this.time = new THREE.Clock()
        this.phyWorld = new CANNON.World()
        this.phyWorld.gravity.set(0, -9.83, 0)
        var game = this
        this.stats = new Stats()
        this.stats.showPanel(0)
        document.body.appendChild(this.stats.dom)
        new fullscreen(this,
            function () {
                game.gameActive = true
                console.log('Fullscreen in')
            },
            function () {
                game.gameActive = false
                console.log('Fullscreen out')
            })
        this.gameObjectUpdater = new gejs.gameObjectUpdater()
        this.updateOrderList = []
    }

    startUpdateLoop() {
        let game = this
        let stats = this.stats
        function update() {

            if (game.gameActive) {
                game.stats.begin()
                game.delta = game.time.getDelta()
                game.phyWorld.step(1.0 / 60.0, game.delta, 3)
                for (var i = 0; game.updateOrderList.length > i; i++) {
                    game.updateOrderList[i]()
                }
                game.renderer.render(game.scene, game.mainCamera)
                game.stats.end()
            }
            requestAnimationFrame(update)
        }
        update()

    }
}