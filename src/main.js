const THREE = require('three')
const CANNON = require('cannon')
import { movement } from './modules/movement.js'
import { gameObject } from './modules/gameObject.js'

// Declaring Vars for global use
var mouse, wasd, world

var cube, cube2, ground, player, roof

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
    player = new gameObject({
        mesh: game.camera,
        position: new THREE.Vector3(0, 0, -6)
    })
    cube2 = new gameObject({
        mesh: new THREE.Mesh(new THREE.BoxGeometry(4, 4, 4), new THREE.MeshPhongMaterial({ color: "#d12828" })),
        position: new THREE.Vector3(3, 0, 2)
    })
    cube = new gameObject({
        mesh: new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshPhongMaterial({ color: "#d12828" })),
        position: new THREE.Vector3(0, 0, 0)
    })
    ground = new gameObject({
        mesh: new THREE.Mesh(new THREE.BoxGeometry(30, .02, 30), new THREE.MeshPhongMaterial({ color: "#ECB712" })),
        position: new THREE.Vector3(0, -4, 0),
    })
    roof = new gameObject({
        mesh: new THREE.Mesh(new THREE.BoxGeometry(10, 1, 10), new THREE.MeshPhongMaterial({ color: 0xECB712 })),
        position: new THREE.Vector3(0, 2, 0)
    })

    var directionalLight = new THREE.DirectionalLight("#ffffff", 0.5)
    var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1)

    directionalLight.position.set(10, 10, 10)
    directionalLight.castShadow = true
    console.log(directionalLight.shadow.camera)
    directionalLight.shadow.mapSize.width = 10240
    directionalLight.shadow.mapSize.height = 10240
    directionalLight.shadow.camera = new THREE.OrthographicCamera(-100, 100, 100, -100, 0.5, 1000)

    cube.mesh.castShadow = true
    cube.mesh.receiveShadow = true
    cube2.mesh.castShadow = true
    cube2.mesh.receiveShadow = true
    roof.mesh.castShadow = true
    roof.mesh.receiveShadow = true
    ground.mesh.receiveShadow = true

    game.scene.add(cube.mesh)
    game.scene.add(ground.mesh)
    game.scene.add(directionalLight)
    game.scene.add(ambientLight)
    game.scene.add(skybox)
    game.scene.add(roof.mesh)
    game.scene.add(cube2.mesh)

    // Physics
    world = new CANNON.World()
    world.gravity.set( 0, -9.82, 0 )

    player.body = new CANNON.Body({
        mass: 62,
        shape: new CANNON.Cylinder( .5, 2, .5, 32 ),
        position: player.position
    })
    player.body.angularDamping = 1
    ground.body = new CANNON.Body({
        mass: 0,
        position: ground.position,
        shape: new CANNON.Box(new CANNON.Vec3( 15, .01, 15 )),
        type: CANNON.Body.KINEMATIC,
    })
    ground.meshSetPos(ground.body.position)
    ground.meshSetRot(ground.body.quaternion)

    cube.body = new CANNON.Body({
        mass: 5,
        position: cube.position,
        shape: new CANNON.Box(new CANNON.Vec3( 1, 1, 1 )),
        type: CANNON.Body.DYNAMIC
    })
    cube2.body = new CANNON.Body({
        mass: 10,
        position: cube2.position,
        shape: new CANNON.Box(new CANNON.Vec3( 2, 2, 2 )),
        type: CANNON.Body.DYNAMIC
    })
    roof.body = new CANNON.Body({
        mass: 0,
        position: roof.position,
        shape: new CANNON.Box(new CANNON.Vec3 ( 5, .5, 5 )),
        type: CANNON.Body.DYNAMIC
    })

    world.addBody(cube2.body)
    world.addBody(player.body)
    world.addBody(ground.body)
    world.addBody(cube.body)
    world.addBody(roof.body)

    wasd = new movement.wasd(player.body, 15, 7)

}
export function update(game) {
    // Movement
    wasd.run(game.delta)

    // Physics
    world.step(1.0 / 60.0, game.delta, 3)

    player.meshSetPos(new THREE.Vector3(0, 1.8, 0).add(player.body.position))

    cube.meshSetPos(cube.body.position)
    cube.meshSetRot(cube.body.quaternion)

    cube2.meshSetPos(cube2.body.position)
    cube2.meshSetRot(cube2.body.quaternion)
}