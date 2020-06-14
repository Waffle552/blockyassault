import { GameObject, GameObjectSynchronizer } from './gameObject.js'

const THREE = require('three')
const CANNON = require('cannon')

window.THREE = THREE


export class Engine {
    /**
    * @param {Object} options Options of the Engine class
    */
    constructor(options = {}) {
        this.scene = new THREE.Scene()
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        document.body.appendChild(this.renderer.domElement)
        this.clock = new THREE.Clock()

        this.world = new CANNON.World()
        this.world.gravity.set(0, -9.83, 0)

        this.gameActive = false
        this.GameObjectSynchronizer = new GameObjectSynchronizer(this)
        this.updateOrderList = []
    }

    startUpdateLoop() {
        let game = this
        function update() {
            if (game.gameActive) {
                game.delta = game.clock.getDelta()
                game.world.step(1.0 / 60.0, game.delta, 3)
                for (var i = 0; game.updateOrderList.length > i; i++) {
                    game.updateOrderList[i]()
                }
                game.GameObjectSynchronizer.sync()
                game.renderer.render(game.scene, game.mainCamera)
            }
            requestAnimationFrame(update)
        }
        update()

    }
}