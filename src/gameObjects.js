const THREE = require('three')
const CANNON = require('cannon')
const gejs = require('./gejs.js') 


export function gameObjects() {
    var gameObjects = {
        player: new gejs.gameObject(gejs.engineInst, {
            mesh: { full: new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100000), camera: true },
            position: new THREE.Vector3(0, 0, -6),
            shadows: 3,
            physics: {
                mass: 62,
                shape: new CANNON.Cylinder(.5, 2, .5, 32),
                collisionFilterGroup: 2,
                collisionFilterMask: 1 | 2 | 4,
            }
        }),
        cube: new gejs.gameObject(gejs.engineInst, {
            mesh: { geometry: new THREE.BoxBufferGeometry(2, 2, 2), material: new THREE.MeshPhongMaterial({ color: "#d12828" }) },
            position: new THREE.Vector3(0, 0, 0),
            shadows: 3,
            physics: {
                mass: 689,
                shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
                type: CANNON.Body.DYNAMIC,
                collisionFilterGroup: 1,
                collisionFilterMask: 1 | 2 | 4,
            }        
        }),
        cube2: new gejs.gameObject(gejs.engineInst, {
            mesh: { geometry: new THREE.BoxBufferGeometry(4, 4, 4), material: new THREE.MeshPhongMaterial({ color: "#d12828" }) },
            position: new THREE.Vector3(3, 0, 2),
            shadows: 3,
            physics: {
                mass: 689 * 4,
                shape: new CANNON.Box(new CANNON.Vec3(2, 2, 2)),
                type: CANNON.Body.DYNAMIC,
                collisionFilterGroup: 1,
                collisionFilterMask: 1 | 2 | 4,         
            }
        }),
        ground: new gejs.gameObject(gejs.engineInst, {
            mesh: { geometry: new THREE.BoxBufferGeometry(100, .2, 100), material: new THREE.MeshPhongMaterial({ color: "#ECB712" }) },
            position: new THREE.Vector3(0, -4, 0),
            shadows: 2,
            physics: {
                mass: 0,
                shape: new CANNON.Box(new CANNON.Vec3(50, .1, 50)),
                type: CANNON.Body.KINEMATIC,
                collisionFilterGroup: 1,
                collisionFilterMask: 1 | 2 | 4,
            }
        }),
        roof: new gejs.gameObject(gejs.engineInst, {
            mesh: { geometry: new THREE.BoxBufferGeometry(10, 2, 10), material: new THREE.MeshPhongMaterial({ color: 0x9842f5 }) },
            position: new THREE.Vector3(0, 2, 0),
            shadows: 3,
            physics: {
                mass: 0,
                shape: new CANNON.Box(new CANNON.Vec3(5, 1, 5)),
                type: CANNON.Body.KINEMATIC,
                collisionFilterGroup: 1,
                collisionFilterMask: 1 | 2 | 4,
            }
        })
    }

    // Modify the gameobject after creation here. Accses them with gameObjects.name of object

    gameObjects.player.lockRotation(true)
    gejs.engineInst.mainCamera = gameObjects.player.mesh


    // info for the object to be updated every frame
    var gameObjectUpdateInfo = [
        { gameObject: gameObjects.player, options: { mode: 0, posOffset: new THREE.Vector3(0, 1.8, 0) } },
        { gameObject: gameObjects.cube },
        { gameObject: gameObjects.cube2 },
        { gameObject: gameObjects.ground },
        { gameObject: gameObjects.roof }
    ]

    gejs.engineInst.gameObjects = gameObjects
    gejs.engineInst.gameObjectUpdater.addArray(gameObjectUpdateInfo)
    gejs.engineInst.updateOrderList.push(() => {
        gejs.engineInst.gameObjectUpdater.update()
    })
}