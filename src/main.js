const THREE = require('three')
import { movement } from './modules/movement.js'

var mouse
var wasd

export function start(game){
    // Movement
    mouse = new movement.mouse(game.renderer, game.camera, 0.3)
    wasd = new movement.wasd(game.camera, 2)

    var skybox = new THREE.Mesh( new THREE.BoxGeometry(10000, 10000, 10000), new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("./textures/skybox.png") , side: THREE.BackSide} ) )
    var cube = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ),  new THREE.MeshPhongMaterial( {color: "#d12828"} ) )
    var plane = new THREE.Mesh( new THREE.PlaneGeometry(10, 10, 10), new THREE.MeshPhongMaterial( {color: "#ECB712"} ) )
    var directionalLight = new THREE.DirectionalLight("#ffffff", 0.5, 100)
    var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1)


    cube.position.z = -5
    plane.position.y = -2
    plane.rotation.x = THREE.Math.degToRad(-90)
    directionalLight.rotation.x = THREE.Math.degToRad(-40)
    directionalLight.rotation.y = THREE.Math.degToRad(40)
    directionalLight.position.set( 0, 100, 100 )
    directionalLight.castShadow = true

    cube.castShadow = true
    plane.receiveShadow = true

    game.scene.add( cube )
    game.scene.add( plane )
    game.scene.add( directionalLight )
    game.scene.add( ambientLight )
    game.scene.add( skybox )
}
export function update(game){
    // Movement
    wasd.run(game.delta)


}