const THREE = require('three')
const CANNON = require('cannon')
import { movement } from './modules/movement.js'
import './gejs.js'

// Declaring Vars for global use
var mouse, wasd, world

export function start() {
    // Movement
    mouse = new movement.mouse(engineInst.gameObjects.player.mesh, 0.3)

    var skybox = new THREE.Mesh(new THREE.BoxBufferGeometry(10000, 10000, 10000), new THREE.MultiMaterial([
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

    engineInst.scene.add(directionalLight)
    engineInst.scene.add(ambientLight)
    engineInst.scene.add(skybox)

    wasd = new movement.wasd(engineInst.gameObjects.player.body, 14, 7)

    var projectile = {
        mesh: { geometry: new THREE.SphereBufferGeometry(0.2), material: new THREE.MeshPhongMaterial({ color: 0xC4C4C4 }) },
        position: new THREE.Vector3(2.5, -1, 5),
        physics: {
            mass: 10000,
            shape: new CANNON.Sphere(0.1),
            type: CANNON.Body.DYNAMIC
        }
    }
    var pro1 = new gameObject(engineInst, projectile)
    pro1.body.velocity = new CANNON.Vec3(0,0,-30)

    engineInst.gameObjectRuntime.add({gameObject: pro1})
}
export function update(engineInst) {
    wasd.run(engineInst.delta)
}
