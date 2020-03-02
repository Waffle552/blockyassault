const THREE = require('three')
const CANNON = require('cannon')
import { gameObject } from "./modules/gameObject.js"

var gameObjects, engine

export function gameObjectsLoader(game) {
    gameObjects = {
        update: update(),
        player: new gameObject(game, {
            position: new THREE.Vector3(0, 0, -6),
            physics: {
                mass: 62,
                shape: new CANNON.Cylinder(.5, 2, .5, 32)
            }
        }),
        cube: new gameObject(game, {
            mesh: { geometry: new THREE.BoxGeometry(2, 2, 2), material: new THREE.MeshPhongMaterial({ color: "#d12828" }) },
            position: new THREE.Vector3(0, 0, 0),
            physics: {
                mass: 689,
                shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
                type: CANNON.Body.DYNAMIC
            }
        }),
        cube2: new gameObject(game, {
            mesh: { geometry: new THREE.BoxGeometry(4, 4, 4), material: new THREE.MeshPhongMaterial({ color: "#d12828" }) },
            position: new THREE.Vector3(3, 0, 2),
            physics: {
                mass: 689 * 4,
                shape: new CANNON.Box(new CANNON.Vec3(2, 2, 2)),
                type: CANNON.Body.DYNAMIC
            }
        }),
        ground: new gameObject(game, {
            mesh: { geometry: new THREE.BoxGeometry(30, .02, 30), material: new THREE.MeshPhongMaterial({ color: "#ECB712" }) },
            position: new THREE.Vector3(0, -4, 0),
            physics: {
                mass: 0,
                shape: new CANNON.Box(new CANNON.Vec3(15, .01, 15)),
                type: CANNON.Body.KINEMATIC,
            }
        }),
        roof: new gameObject(game, {
            mesh: { geometry: new THREE.BoxGeometry(10, 2, 10), material: new THREE.MeshPhongMaterial({ color: 0xECB712 }) },
            position: new THREE.Vector3(0, 2, 0),
            physics: {
                mass: 0,
                shape: new CANNON.Box(new CANNON.Vec3(5, 1, 5)),
                type: CANNON.Body.KINEMATIC
            }
        })

    }

    gameObjects.player.lockRotation(true)

    game.gameObjects = gameObjects

    engine = game
}
function update(game){
    console.log(engine)
    game.gameObjects.player.bodyToMeshUpdate()
    game.gameObjects.cube.bodyToMeshUpdate()
    game.gameObjects.cube2.bodyToMeshUpdate()
    game.gameObjects.ground.bodyToMeshUpdate()
    game.gameObjects.roof.bodyToMeshUpdate()
}