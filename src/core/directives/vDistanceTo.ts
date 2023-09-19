import { Vector3, ArrowHelper } from 'three'

export const vDistanceTo = {
  updated: (el: any, binding: any) => {
    let observer = binding.value
    if (binding.value && binding.value?.value?.isMesh) {
      observer = binding.value.value.position
    }
    if (Array.isArray(binding.value)) observer = new Vector3(...observer)
    if (arrowHelper) {
      arrowHelper.dispose()
      el.parent.remove(arrowHelper) 
    }
    const dir = observer.clone().sub(el.position)
    dir.normalize()
    arrowHelper = new ArrowHelper( dir, el.position, el.position.distanceTo(observer) / 1.5, 0xffff00 )
    el.parent.add( arrowHelper )
    // TODO see other way to show the distance
    // eslint-disable-next-line no-console
    console.log('v-distance-to', el.position.distanceTo(observer))
  },
  unmounted: (el: any) => {
    arrowHelper?.dispose()
    el.parent.remove(arrowHelper)
  },
}
let arrowHelper: ArrowHelper | null = null