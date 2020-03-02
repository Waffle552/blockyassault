const CANNON = require('cannon')
const THREE = require('three')
export class gameObject {
    /**
     * 
     * @param {THREE.Quaternion} param1.rotation 
     */
    constructor(gameInstance, {position, rotation, mesh, physics, autoPost = true}){
        this.gameInstance = gameInstance
        if (mesh) {
            if (mesh.full){
                this.mesh = mesh.full
            } else {
                this.mesh = new THREE.Mesh(mesh.geometry, mesh.material)
            }
        }
        
        if (position) {
            this.position = position
            this.meshSetPos(this.position)
        }
        if (rotation) {
            this.rotation = rotation
            this.meshSetRot(this.rotation)
        }
        if (physics) {
            this.body = new CANNON.Body(physics)
            if(this.position){
                this.body.position.copy(this.position)
            }
            if(this.rotation) {
                this.body.quaternion = this.rotation
            }
            
        }
        if(autoPost){
            this.post(this.gameInstance)
        }

    }
    /**
     * Will post the body to physics world, and will post object to scene
     */
    post(gameInstance){
        if(this.mesh){
            gameInstance.scene.add(this.mesh)
        }
        if(this.body){
            gameInstance.phyWorld.addBody(this.body)
        }
    }

    // Mesh methods
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
    /**
     * 
     * @param {Number} setting 0 = no shadows, 1 = cast shadows, 2 = receive shadows, 3 = cast and receive shadows 
     */
    meshSetShadows(setting) {
        var mesh = this.mesh
        var settings = [
            function (){
                mesh.receiveShadow  = false
                mesh.castShadow = false
            },
             function (){
                mesh.receiveShadow  = false
                mesh.castShadow = true
            },
             function (){
                mesh.receiveShadow  = true
                mesh.castShadow = false
            },
             function (){
                mesh.receiveShadow  = true
                mesh.castShadow = true
            },
        ]
        if (mesh) {
            settings[setting]()
        }
    }
    
    // Physics methods

    lockRotation(bool) {
        if (bool) {
            this.body.angularDamping = 1
        } else {
            this.body.angularDamping = 0
        }
    }

    bodyToMeshUpdate() {
        this.mesh.position.copy(this.body.position)
        this.mesh.quaternion.copy(this.body.quaternion)
    }
}