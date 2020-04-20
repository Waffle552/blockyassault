const CANNON = require('cannon')
const THREE = require('three')
export class gameObject {
    /**
     * 
     * @param {THREE.Quaternion} param1.rotation
     * @param {Number} shadows 0 = no shadows, 1 = cast shadows, 2 = receive shadows, 3 = cast and receive shadows
     */
    constructor(gameInstance, { position, rotation, mesh, shadows, physics, autoPost = true }) {
        this.gameInstance = gameInstance
        if (mesh) {
            if (mesh.full) {
                this.mesh = mesh.full
            } else {
                this.mesh = new THREE.Mesh(mesh.geometry, mesh.material)
                if(shadows){
                    this.meshSetShadows(shadows)
                }
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
            if (this.position) {
                this.body.position.copy(this.position)
            }
            if (this.rotation) {
                this.body.quaternion = this.rotation
            }
            this.phyOpts = physics

        }
        if (autoPost) {
            this.post(this.gameInstance)
        }

    }
    /**
     * Will post the body to physics world, and will post object to scene
     */
    post(gameInstance) {
        if (this.mesh) {
            gameInstance.scene.add(this.mesh)
        }
        if (this.body) {
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
    /**
     * 
     * @param {Number} peram0.mode 0 = posistion only, 1 = rotation only, 2 posistion and rotation (default)  
     */
    bodyToMeshUpdate({mode = 2, posOffset, rotOffset}) {
        let self = this
        if (this.mesh && mode < 3 && mode > -1) {
            let options = [
                function () {
                    self.meshSetPos(self.body.position)
                },
                function () {
                    self.meshSetRot(self.body.quaternion)
                },
                function () {
                    self.meshSetPos(self.body.position)
                    self.meshSetRot(self.body.quaternion)
                }
            ]
            options[mode]()
            if (posOffset) {
                this.mesh.position.add(posOffset)
            }
            if (rotOffset) {
                this.mesh.rotation.add(rotOffset)
            }
        } else throw ('no mesh or option not 0 - 2')
    }
}