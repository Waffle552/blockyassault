const THREE = require('three')
const CANNON = require('cannon')
import { GameObject, Transform } from './engine/gameObject'
import { Engine } from './engine/engine'

export var gameObjects = {
    player: new GameObject(
        new Transform({ position: new THREE.Vector3(0, 0, -6), positionOffset: new THREE.Vector3(0, 1.8, 0), rotationLock: true, rotationSync: false }),
        {
        mesh: new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100000), camera: true,
        shadowMode: 0,
        body: new CANNON.Body({
            mass: 62,
            shape: new CANNON.Cylinder(.5, 2, .5, 32),
            collisionFilterGroup: 2,
            collisionFilterMask: 1 | 2 | 4,
        })
    }),
    cube: new GameObject(
        new Transform({}),
        {
        mesh: new THREE.Mesh(new THREE.BoxBufferGeometry(2, 2, 2), new THREE.MeshPhongMaterial({ color: "#d12828" })),
        shadowMode: 3,
        body: new CANNON.Body({
            mass: 689,
            shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
            type: CANNON.Body.DYNAMIC,
            collisionFilterGroup: 1,
            collisionFilterMask: 1 | 2 | 4,
        })
    }),
    cube2: new GameObject(
        new Transform({ position: new THREE.Vector3(3, 0, 2) }),
        {
        mesh: new THREE.Mesh(new THREE.BoxBufferGeometry(4, 4, 4), new THREE.MeshPhongMaterial({ color: "#d12828" })),
        shadowMode: 3,
        body: new CANNON.Body({
            mass: 689 * 4,
            shape: new CANNON.Box(new CANNON.Vec3(2, 2, 2)),
            type: CANNON.Body.DYNAMIC,
            collisionFilterGroup: 1,
            collisionFilterMask: 1 | 2 | 4,
        })
    }),
    ground: new GameObject(
        new Transform({ position: new THREE.Vector3(0, -4, 0) }),
        {
        mesh: new THREE.Mesh(new THREE.BoxBufferGeometry(100, .2, 100), new THREE.MeshPhongMaterial({ color: "#ECB712" })),
        shadowMode: 2,
        body: new CANNON.Body({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(50, .1, 50)),
            type: CANNON.Body.KINEMATIC,
            collisionFilterGroup: 1,
            collisionFilterMask: 1 | 2 | 4,
        })
    }),
    roof: new GameObject(
        new Transform({ position: new THREE.Vector3(0, 2, 0) }),
        {
        mesh: new THREE.Mesh(new THREE.BoxBufferGeometry(10, 2, 10), new THREE.MeshPhongMaterial({ color: 0x9842f5 })),
        shadowMode: 3,
        body: new CANNON.Body({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(5, 1, 5)),
            type: CANNON.Body.KINEMATIC,
            collisionFilterGroup: 1,
            collisionFilterMask: 1 | 2 | 4,
        })
    }),
    /**
     * 
     * @param {Engine} instance 
     */
    addToInstance: function(instance) {
        instance.gameObjects = this
        let objects = Object.values(instance.gameObjects)
        objects.pop()
        for(var i = 0; i < objects.length; i++){
            objects[i].parent = instance
            instance.GameObjectSynchronizer.add(objects[i].transform)
        }
    }
}