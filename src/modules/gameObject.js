import { Plane } from 'cannon'

const THREE = require('three')
export class gameObject {
    /**
     * 
     * @param {THREE.Quaternion} param0.rotation 
     */
    constructor({position, rotation, mesh}){
        this.mesh = mesh
        this.body = null
        
        if (position !== undefined) {
            this.position = position
            this.meshSetPos(this.position)
        }
        if (rotation !== undefined) {
            this.rotation = rotation
            this.meshSetRot(this.rotation)
        }

    }
    meshSetPos(vec3) {
        if (this.mesh) {
            this.mesh.position.copy(vec3)
        }
    }
    meshSetRot(quat) {
        if (this.mesh) {
            this.mesh.quaternion.copy(quat)
        }
    }
}