const THREE = require('three')

var yRotation

class mouse {
    /**
     * Mouse movement from players
     * @param {THREE.Renderer} renderer
     * @param {THREE.Mesh} mesh The camera mesh
     * @param {Number} sensitivity The sensitivity that the camera will move at
     */
    constructor(mesh, sensitivity) {
        this.sense = sensitivity
        this.mesh = mesh
        var uDRot = 0
        var yRot = 0

        document.addEventListener('mousemove', event => {
            yRot += (event.movementX * this.sense)
            if (uDRot + event.movementY * this.sense < 90 && uDRot + event.movementY * this.sense > -90) {
                uDRot += (event.movementY * this.sense)
            }

            var quaternionY = new THREE.Quaternion()
            var quaternionUD = new THREE.Quaternion()
            yRotation = -THREE.Math.degToRad(yRot)
            quaternionY.setFromAxisAngle(new THREE.Vector3(0, -1, 0), THREE.Math.degToRad(yRot))
            quaternionUD.setFromAxisAngle(new THREE.Vector3(-1, 0, 0), THREE.Math.degToRad(uDRot))
            var quaternion = quaternionY.multiply(quaternionUD)

            this.mesh.rotation.setFromQuaternion(quaternion)
            mesh.updateProjectionMatrix()
        })
    }
}

class wasd {
    /**
     * WASD movement for players
     * @param {THREE.Mesh} mesh The cameras mesh 
     * @param {Number} speed Units per second
     */
    constructor(mesh, speed) {
        this.w = false
        this.a = false
        this.s = false
        this.d = false
        this.mesh = mesh
        this.speed = speed

        // W
        document.addEventListener('keydown', event => {
            if (event.keyCode === 87) {
                this.w = true
            }
            if (event.keyCode === 65) {
                this.a = true
            }
            if (event.keyCode === 83) {
                this.s = true
            }
            if (event.keyCode === 68) {
                this.d = true
            }
        })
        document.addEventListener('keyup', event => {
            if (event.keyCode === 87) {
                this.w = false
            }
            if (event.keyCode === 65) {
                this.a = false
            }
            if (event.keyCode === 83) {
                this.s = false
            }
            if (event.keyCode === 68) {
                this.d = false
            }
        })
    }
    run(delta) {
        let mesh = this.mesh
        let speed = this.speed
        if (this.w) {
            mesh.position.z -= Math.cos(yRotation) * delta * speed
            mesh.position.x -= Math.sin(yRotation) * delta * speed
        }
        if (this.a) {
            mesh.position.z -= Math.cos(yRotation+ THREE.Math.degToRad(90)) * delta * speed
            mesh.position.x -= Math.sin(yRotation + THREE.Math.degToRad(90)) * delta * speed
        }
        if (this.s) {
            mesh.position.z += Math.cos(yRotation) * delta * speed
            mesh.position.x += Math.sin(yRotation) * delta * speed
        }
        if (this.d) {
            mesh.position.z += Math.cos(yRotation + THREE.Math.degToRad(90)) * delta * speed
            mesh.position.x += Math.sin(yRotation + THREE.Math.degToRad(90)) * delta * speed
        }
    }
}

export var movement = {
    mouse: mouse,
    wasd: wasd
}