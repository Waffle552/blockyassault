import { engine } from './engine.js'

const CANNON = require('cannon')
const THREE = require('three')
const gejs = require('../gejs.js')
export class GameObject {
    /**
     * 
     * @param {THREE.Quaternion} param1.rotation
     * @param {Number} shadows 0 = no shadows, 1 = cast shadows, 2 = receive shadows, 3 = cast and receive shadows
     * @param {Transform} transform
     */
    constructor(parent, { transform = new Transform({}), mesh, shadowMode, physics, syncObj, autoPost = true }) {
        this.parent = parent
        this.syncObj = syncObj

        this.transform = transform
        if (mesh) {
            this.mesh = mesh
        }
        if (physics) {
            this.body = physics
        }
        if (shadowMode) {
            this.shadowMode = shadowMode
        }
        this.transform = transform
        this.transform.initalize(this)
        if (autoPost) {
            this.post(this.parent)

        }

    }
    /**
     * Will post the body to physics world, and will post object to scene
     */
    post() {
        if (this.mesh && !this.isCamera) {
            this.parent.scene.add(this.mesh)
        }
        if (this.body) {
            this.parent.phyWorld.addBody(this.body)
        }
        if (this.syncObj) {
            this.transform.addSyncToSynchronizer(this.syncObj)
        }
    }
    remove() {
        if (this.syncObj) {
            this.syncObj.remove(this)
        }
        if (this.mesh) {
            gejs.engineInst.scene.remove(this.mesh)
        }
        if (this.mesh) {
            gejs.engineInst.phyWorld.remove(this.body)
        }
    }
    set shadowMode(mode) {
        let mesh = this.mesh
        var settings = [
            function () {
                mesh.receiveShadow = false
                mesh.castShadow = false
            },
            function () {
                mesh.receiveShadow = false
                mesh.castShadow = true
            },
            function () {
                mesh.receiveShadow = true
                mesh.castShadow = false
            },
            function () {
                mesh.receiveShadow = true
                mesh.castShadow = true
            },
        ]
        if (mode) {
            settings[mode]()
        }
    }
}

export class GameObjectSynchronizer {
    constructor() {
        this.syncList = []

    }

    sync() {
        for (var i = 0; i < this.syncList.length; i++) {
            this.syncList[i].sync()
        }
    }
    add(obj) {
        this.syncList.push(obj)
    }
    remove(obj) {
        this.syncList.splice(this.syncList.findIndex(function (opt) {return opt === obj}), 1)
    }
}

export class Transform {
    constructor({
        position = new THREE.Vector3(),
        rotation = new THREE.Quaternion(),
        positionOffset = new THREE.Vector3(),
        rotationOffset = new THREE.Vector3(),
        rotationLock = false,
        rotationSync = true,
    }) {
        this._position = position
        this._rotation = rotation
        this.positionOffset = positionOffset
        this.rotationOffset = rotationOffset
        this._rotationLock = rotationLock
        this.rotationSync = rotationSync
    }
    /**
     * @param {THREE.Vector3} pos 
     */
    set position(pos) {
        this._position.copy(pos)
        if (this.parent.mesh) {
            this.parent.mesh.position.copy(this.position)
        }
        if (this.parent.body) {
            this.parent.body.position.copy(this.position)
        }
    }
    get position() {
        return this._position
    }

    /**
     * @param {THREE.Quaternion} rot
     */
    set rotation(rot) {
        this._rotation.copy(rot)
        if (this.parent.mesh) {
            this.parent.mesh.quaternion.copy(this.rotation)
        }
        if (this.parent.body) {
            this.parent.body.quaternion.copy(this.rotation)
        }
    }
    get rotation() {
        return this._rotation
    }
    /**
     * 
     * @param {engine} parent 
     */
    initalize(parent) {
        this.parent = parent
        this.rotationLock = this._rotationLock
        this.parent.body.position.copy(this.position)
        this.parent.body.quaternion.copy(this.rotation)
        this.sync()

    }

    set rotationLock(bool) {
        this._rotationLock = bool
        if (bool == true) {
            this.parent.body.angularDamping = 1
        } else if (bool == false) {
            this.parent.body.angularDamping = 0
        }
    }
    get rotationLock() {
        return this._rotationLock
    }
    addSyncToSynchronizer(syncerObj) {
        syncerObj.add(this)
    }
    sync() {

        this.position.copy(this.parent.body.position)
        if (this.rotationSync == true) {
            this.rotation.copy(this.parent.body.quaternion)
        }

        this.parent.mesh.position.copy(this.position).add(this.positionOffset)
        if (this.rotationSync == true) {
            this.parent.mesh.rotation.setFromQuaternion(this.rotation)
        }
    }
}