const $ = require('jquery')
const THREE = require('three')
const CANNON = require('cannon')
import * as GEJS from './engine/engineExports'
import { movement } from './modules/movement.js'
import { gameObjects } from './gameObjects'
import { fullscreen } from './modules/fullscreen'

var gejs = new GEJS.Engine()
window.gejs = gejs
gejs.renderer.setClearColor("#ff0000")

new fullscreen(gejs)
gameObjects.addToInstance(gejs)

gejs.mainCamera = gejs.gameObjects.player.mesh

var mouse = new movement.mouse(gejs.gameObjects.player, 0.3)

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

gejs.scene.add(directionalLight)
gejs.scene.add(ambientLight)
gejs.scene.add(skybox)

var wasd = new movement.wasd(gejs.gameObjects.player.body, 14, 7)



var projectiles = []
var loopNum = 0
var velocityMult = 50

$(document).click(function () {
    if (projectiles.length > 100) {
        projectiles[loopNum].transform.position = new THREE.Vector3().copy(gejs.gameObjects.player.body.position)
        projectiles[loopNum].body.position.y += 1.6
        projectiles[loopNum].body.velocity = new CANNON.Vec3().copy(mouse.forward).mult(velocityMult)
        projectiles[loopNum].body.velocity.y = mouse.cameraTilt * (velocityMult / 20)

        loopNum++
        if (loopNum > projectiles.length - 1) {
            loopNum = 0
        }
    } else {
        let projectile = new GEJS.GameObject(
            new GEJS.Transform({ position: new THREE.Vector3().copy(gejs.gameObjects.player.body.position) }),
            {
                mesh: new THREE.Mesh(new THREE.SphereBufferGeometry(1), new THREE.MeshPhongMaterial({ color: 0xC4C4C4 })),
                syncObj: gejs.GameObjectSynchronizer,
                autoPost: false,
                shadowMode: 3,
                body: new CANNON.Body({
                    mass: 10000,
                    shape: new CANNON.Sphere(0.5),
                    type: CANNON.Body.DYNAMIC,
                    collisionFilterGroup: 4,
                    collisionFilterMask: 1 | 4,
                })
            })


        projectile.body.position.y += 1.6
        projectile.body.velocity = new CANNON.Vec3().copy(mouse.forward).mult(velocityMult)
        projectile.body.velocity.y = mouse.cameraTilt * (velocityMult / 20)
        projectile.parent = gejs
        gejs.GameObjectSynchronizer.add(projectile.transform)

        projectiles.push(projectile)
    }


})

gejs.updateOrderList.push(() => {
    wasd.run(gejs.delta)
})

gejs.startUpdateLoop()

