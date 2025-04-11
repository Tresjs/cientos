# useAnimations

`useAnimation` is a composable that returns a `shallowReactive` with all the models actions based on the animations provided. It is a wrapper around the [AnimationMixer](https://threejs.org/docs/#api/en/animation/AnimationMixer) class.

<StackBlitzEmbed projectId="tresjs-use-animations" />

## Usage

```ts
import { useAnimations, useGLTF } from '@tresjs/cientos'

const { state } = useGLTF('/models/ugly-naked-bunny.gltf')

const { actions, mixer } = useAnimations(state?.animations, state?.scene)

const currentAction = actions.Greeting

currentAction.play()
```
