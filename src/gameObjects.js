const THREE = require('three')
const CANNON = require('cannon')
const gejs = require('./gejs.js') 


export function gameObjects() {
    var gameObjects = {
        player: new gejs.GameObject(gejs.engineInst, {
            mesh: new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100000), camera: true,
            transform: new gejs.Transform({position: new THREE.Vector3(0, 0, -6), positionOffset: new THREE.Vector3(0, 1.8, 0), rotationLock: true, rotationSync: false}),   
            shadowMode: 0,
            syncObj: gejs.engineInst.GameObjectSynchronizer,
            physics: new CANNON.Body({
                mass: 62,
                shape: new CANNON.Cylinder(.5, 2, .5, 32),
                collisionFilterGroup: 2,
                collisionFilterMask: 1 | 2 | 4,
            })
        }),
        cube: new gejs.GameObject(gejs.engineInst, {
            mesh: new THREE.Mesh(new THREE.BoxBufferGeometry(2, 2, 2), new THREE.MeshPhongMaterial({ color: "#d12828" })),
            shadowMode: 3,
            syncObj: gejs.engineInst.GameObjectSynchronizer,
            physics: new CANNON.Body({
                mass: 689,
                shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
                type: CANNON.Body.DYNAMIC,
                collisionFilterGroup: 1,
                collisionFilterMask: 1 | 2 | 4,
            })        
        }),
        cube2: new gejs.GameObject(gejs.engineInst, {
            mesh: new THREE.Mesh(new THREE.BoxBufferGeometry(4, 4, 4),  new THREE.MeshPhongMaterial({ color: "#d12828" })),
            transform: new gejs.Transform({position: new THREE.Vector3(3, 0, 2)}),
            shadowMode: 3,
            syncObj: gejs.engineInst.GameObjectSynchronizer,
            physics: new CANNON.Body({
                mass: 689 * 4,
                shape: new CANNON.Box(new CANNON.Vec3(2, 2, 2)),
                type: CANNON.Body.DYNAMIC,
                collisionFilterGroup: 1,
                collisionFilterMask: 1 | 2 | 4,         
            })
        }),
        ground: new gejs.GameObject(gejs.engineInst, {
            mesh: new THREE.Mesh(new THREE.BoxBufferGeometry(100, .2, 100), new THREE.MeshPhongMaterial({ color: "#ECB712" })),
            transform: new gejs.Transform({position: new THREE.Vector3(0, -4, 0)}),
            shadowMode: 2,
            syncObj: gejs.engineInst.GameObjectSynchronizer,
            physics: new CANNON.Body({
                mass: 0,
                shape: new CANNON.Box(new CANNON.Vec3(50, .1, 50)),
                type: CANNON.Body.KINEMATIC,
                collisionFilterGroup: 1,
                collisionFilterMask: 1 | 2 | 4,
            })
        }),
        roof: new gejs.GameObject(gejs.engineInst, {
            mesh: new THREE.Mesh(new THREE.BoxBufferGeometry(10, 2, 10), new THREE.MeshPhongMaterial({ color: 0x9842f5 })),
            transform: new gejs.Transform({position: new THREE.Vector3(0, 2, 0)}),
            shadowMode: 3,
            syncObj: gejs.engineInst.GameObjectSynchronizer,
            physics: new CANNON.Body({
                mass: 0,
                shape: new CANNON.Box(new CANNON.Vec3(5, 1, 5)),
                type: CANNON.Body.KINEMATIC,
                collisionFilterGroup: 1,
                collisionFilterMask: 1 | 2 | 4,
            })
        })
    }

    // Modify the gameobject after creation here. Accses them with gameObjects.name of object

    gejs.engineInst.gameObjects = gameObjects
    gejs.engineInst.mainCamera = gameObjects.player.mesh
}