import { Scene, Object3D, Mesh } from 'three'

class EnvSence extends Object3D {
  virtualScene = null as unknown as Scene
  constructor() {
    super()
    this.virtualScene = new Scene()
  }

  add(...object: Object3D[]): this {
    this.virtualScene.add(...object)
    return this
  }

  destructor() {
    this.virtualScene.traverse((object) => {
      if (object instanceof Mesh) {
        object.geometry.dispose()
        object.material.dispose()
        if (object.material.map) object.material.map.dispose()
        this.virtualScene.remove(object)
      }
    })
    this.virtualScene = null as unknown as Scene
  }
}

export default EnvSence