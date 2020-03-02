const THREE = require('three')
const CANNON = require('cannon')
import { movement } from './modules/movement.js'
import { gameObject } from './modules/gameObject.js'

// Declaring Vars for global use
var mouse, wasd, world

export function start(game) {
    // Movement
    mouse = new movement.mouse(game.camera, 0.3)

    var skybox = new THREE.Mesh(new THREE.BoxGeometry(10000, 10000, 10000), new THREE.MultiMaterial([
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./textures/skybox/right.png"), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./textures/skybox/left.png"), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./textures/skybox/top.png"), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./textures/skybox/bottom.png"), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./textures/skybox/front.png"), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./textures/skybox/back.png"), side: THREE.BackSide })
    ],
    ))

    var directionalLight = new THREE.DirectionalLight("#ffffff", 0.8)
    var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5)

    directionalLight.position.set(10, 10, 10)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 5120
    directionalLight.shadow.mapSize.height = 5120
    directionalLight.shadow.camera = new THREE.OrthographicCamera(-50, 50, 50, -50, 0.5, 1000)

    game.scene.add(directionalLight)
    game.scene.add(ambientLight)
    game.scene.add(skybox)

    // Physics
    

    wasd = new movement.wasd(game.gameObjects.player.body, 14, 7)

}
export function update(game) {
    wasd.run(game.delta)
}
