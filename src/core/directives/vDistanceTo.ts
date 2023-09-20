import { ArrowHelper } from 'three'
import { extractBindingPosition } from '../../utils/index'

export const vDistanceTo = {
  updated: (el: any, binding: any) => {
    const observer = extractBindingPosition(binding)
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
    console.table([
      ['Distance:', el.position.distanceTo(observer)],
      [`origin: ${el.name || el.type}`, `x:${el.position.x}, y:${el.position.y}, z:${el.position?.z}`],
      [`Destiny: ${el.name || el.type}`, `x:${observer.x}, y:${observer.y}, z:${observer?.z}`],
    ],
    )
  },
  unmounted: (el: any) => {
    arrowHelper?.dispose()
    el.parent.remove(arrowHelper)
  },
}
let arrowHelper: ArrowHelper | null = null