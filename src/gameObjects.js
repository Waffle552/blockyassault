const THREE = require('three')
const CANNON = require('cannon')
import { gameObject } from "./modules/gameObject.js"
import './gejs.js' 

export function gameObjects() {
    var gameObjects = {
        player: new gameObject(engineInst, {
            mesh: { full: new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100000), camera: true },
            position: new THREE.Vector3(0, 0, -6),
            shadows: 3,
            physics: {
                mass: 62,
                shape: new CANNON.Cylinder(.5, 2, .5, 32)
            }
        }),
        cube: new gameObject(engineInst, {
            mesh: { geometry: new THREE.BoxBufferGeometry(2, 2, 2), material: new THREE.MeshPhongMaterial({ color: "#d12828" }) },
            position: new THREE.Vector3(0, 0, 0),
            shadows: 3,
            physics: {
                mass: 689,
                shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
                type: CANNON.Body.DYNAMIC
            }
        }),
        cube2: new gameObject(engineInst, {
            mesh: { geometry: new THREE.BoxBufferGeometry(4, 4, 4), material: new THREE.MeshPhongMaterial({ color: "#d12828" }) },
            position: new THREE.Vector3(3, 0, 2),
            shadows: 3,
            physics: {
                mass: 689 * 4,
                shape: new CANNON.Box(new CANNON.Vec3(2, 2, 2)),
                type: CANNON.Body.DYNAMIC
            }
        }),
        ground: new gameObject(engineInst, {
            mesh: { geometry: new THREE.BoxBufferGeometry(100, .02, 100), material: new THREE.MeshPhongMaterial({ color: "#ECB712" }) },
            position: new THREE.Vector3(0, -4, 0),
            shadows: 2,
            physics: {
                mass: 0,
                shape: new CANNON.Box(new CANNON.Vec3(50, .01, 50)),
                type: CANNON.Body.KINEMATIC,
            }
        }),
        roof: new gameObject(engineInst, {
            mesh: { geometry: new THREE.BoxBufferGeometry(10, 2, 10), material: new THREE.MeshPhongMaterial({ color: 0x9842f5 }) },
            position: new THREE.Vector3(0, 2, 0),
            shadows: 3,
            physics: {
                mass: 0,
                shape: new CANNON.Box(new CANNON.Vec3(5, 1, 5)),
                type: CANNON.Body.KINEMATIC
            }
        })
    }

    // Modify the gameobject after creation here. Accses them with gameObjects.name of object

    gameObjects.player.lockRotation(true)


    // info for the object to be updated every frame
    var gameObjectUpdateInfo = [
        { gameObject: engineInst.gameObjects.player, options: { mode: 0, posOffset: new THREE.Vector3(0, 1.8, 0) } },
        { gameObject: engineInst.gameObjects.cube },
        { gameObject: engineInst.gameObjects.cube2 },
        { gameObject: engineInst.gameObjects.ground },
        { gameObject: engineInst.gameObjects.roof }
    ]

    engineInst.gameObjects = gameObjects
    engineInst.gameObjectUpdater.addArray(gameObjectUpdateInfo)
}