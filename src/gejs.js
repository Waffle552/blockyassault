//This file makes shure every file is loaded in the currect order and is the entry point for webpack
import _ from 'lodash'
import { engine } from './engine/engine.js'
import { GameObject, GameObjectSynchronizer, Transform } from './engine/gameObject.js'
import { gameObjects } from './gameObjects.js'
import * as main from './main.js'

var engineInst = new engine()
gameObjects()
main.start()
engineInst.startUpdateLoop()

export {engineInst, GameObject, GameObjectSynchronizer, Transform, main, engine}