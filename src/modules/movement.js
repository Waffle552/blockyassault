const THREE = require('three')
const CANNON = require('cannon')

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
     * @param {*} body The cameras body 
     * @param {Number} speed Units per second
     */
    constructor(body, speed, jumpPower) {
        this.w = false
        this.a = false
        this.s = false
        this.d = false

        this.body = body
        this.speed = speed
        this.jumpPower = jumpPower

        var canJump = false
        var contactNormal = new CANNON.Vec3(); // Normal in the contact, pointing *out* of whatever the player touched
        var upAxis = new CANNON.Vec3(0, 1, 0);
        this.body.addEventListener("collide", function (e) {
            var contact = e.contact;

            // contact.bi and contact.bj are the colliding bodies, and contact.ni is the collision normal.
            // We do not yet know which one is which! Let's check.
            if (contact.bi.id == body.id)  // bi is the player body, flip the contact normal
                contact.ni.negate(contactNormal);
            else
                contactNormal.copy(contact.ni); // bi is something else. Keep the normal as it is

            // If contactNormal.dot(upAxis) is between 0 and 1, we know that the contact normal is somewhat in the up direction.
            if (contactNormal.dot(upAxis) > 0.5) // Use a "good" threshold value between 0 and 1 here!
                canJump = true
        });

        document.addEventListener('keydown', event => {
            switch (event.keyCode) {
                case 38: // up
                case 87: // w
                    this.w = true
                    break

                case 37: // left
                case 65: // a
                    this.a = true
                    break

                case 40: // down
                case 83: // s
                    this.s = true
                    break

                case 39: // right
                case 68: // d
                    this.d = true
                    break

                case 32: // space
                    if (canJump === true) {
                        body.velocity.y = this.jumpPower
                    }
                    canJump = false
                    break
            }
        })
        document.addEventListener('keyup', event => {
            switch (event.keyCode) {
                case 38: // up
                case 87: // w
                    this.w = false
                    break

                case 37: // left
                case 65: // a
                    this.a = false
                    break

                case 40: // down
                case 83: // s
                    this.s = false
                    break

                case 39: // right
                case 68: // d
                    this.d = false
                    break
            }
        })
    }
    run(delta) {
        let body = this.body
        let speed = this.speed
        if (this.w) {
            body.position.z -= Math.cos(yRotation) * delta * speed
            body.position.x -= Math.sin(yRotation) * delta * speed
        }
        if (this.a) {
            body.position.z -= Math.cos(yRotation + THREE.Math.degToRad(90)) * delta * speed
            body.position.x -= Math.sin(yRotation + THREE.Math.degToRad(90)) * delta * speed
        }
        if (this.s) {
            body.position.z += Math.cos(yRotation) * delta * speed
            body.position.x += Math.sin(yRotation) * delta * speed
        }
        if (this.d) {
            body.position.z += Math.cos(yRotation + THREE.Math.degToRad(90)) * delta * speed
            body.position.x += Math.sin(yRotation + THREE.Math.degToRad(90)) * delta * speed
        }
    }
}

export var movement = {
    mouse: mouse,
    wasd: wasd
}