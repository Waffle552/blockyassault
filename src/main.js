const $ = require('jquery')
const THREE = require('three')
const CANNON = require('cannon')
import { movement } from './modules/movement.js'
const gejs = require('./gejs.js')

// Declaring Vars for global use
var mouse, wasd, world

export function start() {
    // Movement
    mouse = new movement.mouse(gejs.engineInst.gameObjects.player, 0.3)

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

    gejs.engineInst.scene.add(directionalLight)
    gejs.engineInst.scene.add(ambientLight)
    gejs.engineInst.scene.add(skybox)

    wasd = new movement.wasd(gejs.engineInst.gameObjects.player.body, 14, 7)



    var projectiles = []
    var loopNum = 0
    var velocityMult = 50

    $(document).click(function () {
        if (projectiles.length > 100) {
            projectiles[loopNum].transform.position = new THREE.Vector3().copy(gejs.engineInst.gameObjects.player.body.position)
            projectiles[loopNum].body.position.y += 1.6
            projectiles[loopNum].body.velocity = new CANNON.Vec3().copy(mouse.forward).mult(velocityMult)
            projectiles[loopNum].body.velocity.y = mouse.cameraTilt * (velocityMult / 20)

            loopNum ++
            if (loopNum > projectiles.length - 1){
                loopNum = 0
            }
        } else {
            projectiles.push(new gejs.GameObject(gejs.engineInst, {
                mesh: new THREE.Mesh(new THREE.SphereBufferGeometry(1), new THREE.MeshPhongMaterial({ color: 0xC4C4C4 })),
                syncObj: gejs.engineInst.GameObjectSynchronizer,
                autoPost: false,
                transform: new gejs.Transform({ position: new THREE.Vector3().copy(gejs.engineInst.gameObjects.player.body.position) }),
                shadowMode: 3,
                physics: new CANNON.Body({
                    mass: 10000,
                    shape: new CANNON.Sphere(0.5),
                    type: CANNON.Body.DYNAMIC,
                    collisionFilterGroup: 4,
                    collisionFilterMask: 1 | 4,
                })
            }))
            projectiles[projectiles.length - 1].body.position.y += 1.6
            projectiles[projectiles.length - 1].body.velocity = new CANNON.Vec3().copy(mouse.forward).mult(velocityMult)
            projectiles[projectiles.length - 1].body.velocity.y = mouse.cameraTilt * (velocityMult / 20)
    
            projectiles[projectiles.length - 1].post()
        }
        

    })

    gejs.engineInst.updateOrderList.push(() => {
        wasd.run(gejs.engineInst.delta)
    })
}
