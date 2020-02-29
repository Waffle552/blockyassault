const THREE = require('three')
const THREEx = require('threex.oimo')
const OIMO = require('oimo')
import { movement } from './modules/movement.js'

// Declaring Vars for global use
var mouse, wasd, world
// THREE.js Objects
var cube, plane
// Oimo bodys
var cubeBody, planeBody
// Oimo object updaters
var cubeUpdate

export function start(game) {
    // Movement
    mouse = new movement.mouse(game.camera, 0.3)
    wasd = new movement.wasd(game.camera, 5)

    var skybox = new THREE.Mesh(new THREE.BoxGeometry(10000, 10000, 10000), new THREE.MultiMaterial([
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./textures/skybox/right.png"), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./textures/skybox/left.png"), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./textures/skybox/top.png"), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./textures/skybox/bottom.png"), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./textures/skybox/front.png"), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./textures/skybox/back.png"), side: THREE.BackSide })       
    ],
    ))
    cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({ color: "#d12828" }))
    plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 10), new THREE.MeshPhongMaterial({ color: "#ECB712" }))
    var directionalLight = new THREE.DirectionalLight("#ffffff", 0.5, 100)
    var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1)

    plane.position.y = -2
    plane.rotation.x = THREE.Math.degToRad(-90)
    directionalLight.rotation.x = THREE.Math.degToRad(-40)
    directionalLight.rotation.y = THREE.Math.degToRad(40)
    directionalLight.position.set(0, 100, 100)
    directionalLight.castShadow = true

    cube.castShadow = true
    plane.receiveShadow = true

    game.scene.add(cube)
    game.scene.add(plane)
    game.scene.add(directionalLight)
    game.scene.add(ambientLight)
    game.scene.add(skybox)

    // Physics
    world = new OIMO.World()
    cubeBody = THREEx.createBodyFromMesh(world, cube, true)
    planeBody = THREEx.createBodyFromMesh(world, plane, false)

    cubeUpdate = THREEx.Body2MeshUpdater(cubeBody, cube)

}
export function update(game) {
    // Movement
    wasd.run(game.delta)

    //Physics
    world.step()
    cubeUpdate.update()


}