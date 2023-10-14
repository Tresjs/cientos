<script lang="ts" setup>
import { REVISION, Points, ShaderMaterial, Uniform, AdditiveBlending, Vector3, IcosahedronGeometry } from 'three'
import type { ShaderMaterialParameters, Blending, BufferGeometry, Object3D } from 'three'
import type { TresColor } from '@tresjs/core'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import { onUnmounted, shallowRef, watch, onMounted, toRefs } from 'vue'
import type { Gradient } from './Gradient'
import { ShaderDataBuilder } from './shaderDataBuilder'

const props = withDefaults(defineProps<SparkleProps>(), {
  geometry: undefined,
  directionalLight: undefined,

  lifetimeS: 0.4,
  cooldownS: 2.0,

  size: 2.0,
  alpha: 1.0,
  noiseScale: 3.0,

  scaleNoise: 1.0,
  offsetNoise: 0.1,
  lifetimeNoise: 0.0,

  colorSequence: () => ['purple', 'blue', 'green', 'red'],
  alphaSequence: () => [[0.0, 0.0], [0.10, 1.0], [0.5, 1.0], [0.9, 0.0]],
  offsetSequence: () => [[1.0, 1.0, 1.0]],
  surfaceDistanceSequence: () => [0.05, 0.1, 0.15],
  sizeSequence: () => [0.0, 1.0],
  noiseSequence: () => [1.0, 1.0, 1.0],

  normalThreshold: 0.7,

  mixNormalLifetimeColor: 0.5,
  mixNormalLifetimeAlpha: 1.,
  mixNormalLifetimeOffset: 1.,
  mixNormalLifetimeSize: 0.,
  mixNormalLifetimeSurfaceDistance: 1.,
  mixNormalLifetimeNoise: 1.,

  blending: AdditiveBlending,
  transparent: true,
  depthWrite: false,
})

const version = parseInt(REVISION.replace(/\D+/g, ''))

interface SparkleProps {
  geometry?: Object3D | BufferGeometry

  directionalLight?: Object3D

  /** How long a particle lives in seconds (default: 1) */
  lifetimeS?: number
  /** How long a particle cools down before respawning in seconds (default: 1) */
  cooldownS?: number

  /** Threshold for normal, lol */
  normalThreshold?: number
  /** Number of particles (default: 100) */
  noiseScale?: number
  /** Noise applied to particle scale (default: 1) */
  scaleNoise?: number
  /** Noise applied to particle offset (default: 1) */
  offsetNoise?: number
  /** Noise applied to particle lifetime (default: 1) */
  lifetimeNoise?: number
  /** Size of all particles (default: 1) */
  size?: number
  /** Opacity of particles (default: 1) */
  alpha?: number
  /** Color of particles over lifetime (default: 'white') */
  colorSequence?: Gradient<TresColor>
  /** Opacity of particles over lifetime (default: [0, 1, 1, 1, 0]) */
  alphaSequence?: Gradient<number>
  /** Distance the particles should travel x, y, z over lifetime (default: [0, 1, 0]) */
  offsetSequence?: Gradient<[number, number, number]>
  /** Translation noise factor (default: [0, 1, 0]) */
  noiseSequence?: Gradient<[number, number, number]>
  /** Size of particles over lifetime (default: [0, 1, 1, 1, 1, 1, 0]) */
  sizeSequence?: Gradient<number>
  /** Distance from surface over the lifetime of the particle (default: [0., 1.]) */
  surfaceDistanceSequence?: Gradient<number>
  /** Material blending (default: THREE.AdditiveBlending) */

  mixNormalLifetimeColor?: number
  mixNormalLifetimeAlpha?: number
  mixNormalLifetimeOffset?: number
  mixNormalLifetimeSize?: number
  mixNormalLifetimeSurfaceDistance?: number
  mixNormalLifetimeNoise?: number

  blending?: Blending
  /** Material transparency (default: true) */
  transparent?: boolean
  /** Material depth write (default: true) */
  depthWrite?: boolean
  startPoints?: Float32Array
}

const refs = toRefs(props)

const { texture, shaderProps, materialWatcher, addUniform: addTextureUniform } = new ShaderDataBuilder(256)
  .add.GradientTresColor(refs.colorSequence).id('colorSequence')
  .add.Gradient01(refs.alphaSequence).id('alphaSequence')
  .add.Gradient01(refs.surfaceDistanceSequence).id('surfaceDistanceSequence')
  .add.Gradient01(refs.sizeSequence).id('sizeSequence')
  .add.GradientXyz(refs.offsetSequence, -1, 1).id('offsetSequence')
  .add.GradientXyz(refs.noiseSequence, 0, 1).id('noiseSequence')
  .build()
  .useTexture('uInfo')

/*
// NOTE: Also works 'non-fluently' using classes:
const shaderData = new ShaderData([
  new ShaderDataEntryTresColorGradient(refs.colorSequence, 'colorSequence'),
  new ShaderDataEntryScalarGradient(refs.alphaSequence, 'alphaSequence'),
  new ShaderDataEntryScalarGradient(refs.surfaceDistanceSequence, 'surfaceDistanceSequence'),
  new ShaderDataEntryScalarGradient(refs.sizeSequence, 'sizeSequence'),
  new ShaderDataEntryXyzGradient(refs.offsetSequence, 'offsetSequence', -1, 1),
  new ShaderDataEntryXyzGradient(refs.noiseSequence, 'noiseSequence', 0, 1),
], 128)

const { texture, shaderProps, materialWatcher, addUniform:addTextureUniform } = shaderData.useTexture('uInfo')

  */

const shaderMaterialParameters: ShaderMaterialParameters = {
  blending: props.blending,
  transparent: props.transparent,
  depthWrite: props.depthWrite,
  uniforms: addTextureUniform({
    uPixelRatio: new Uniform(1),
    uNormal: new Uniform(new Vector3(0, 1, 0)),
    uNormalThreshold: new Uniform(props.normalThreshold),
    uTime: new Uniform(0),
    uCooldownRatio: new Uniform(1),
    // Alternative: instead of using addTextureUniform, use:
    // uInfo: new Uniform(texture.value),
    uSize: new Uniform(props.size),
    uAlpha: new Uniform(props.alpha),
    uNoiseScale: new Uniform(props.noiseScale),
    uScaleNoise: new Uniform(props.scaleNoise),
    uOffsetNoise: new Uniform(props.offsetNoise),
    uLifetimeNoise: new Uniform(props.lifetimeNoise),
    uMixNormalLifetimeColor: new Uniform(props.mixNormalLifetimeColor),
    uMixNormalLifetimeAlpha: new Uniform(props.mixNormalLifetimeAlpha),
    uMixNormalLifetimeOffset: new Uniform(props.mixNormalLifetimeOffset),
    uMixNormalLifetimeSize: new Uniform(props.mixNormalLifetimeSize),
    uMixNormalLifetimeSurfaceDistance: new Uniform(props.mixNormalLifetimeSurfaceDistance),
    uMixNormalLifetimeNoise: new Uniform(props.mixNormalLifetimeNoise),
  }),
  vertexShader: `
    uniform float uPixelRatio;
    uniform vec3 uNormal;
    uniform float uNormalThreshold;
    uniform float uTime;
    uniform float uCooldownRatio;
    uniform float uSize;
    uniform float uAlpha;
    uniform float uNoiseScale;
    uniform float uScaleNoise;
    uniform float uOffsetNoise;
    uniform float uLifetimeNoise;
    uniform float uMixNormalLifetimeColor;
    uniform float uMixNormalLifetimeAlpha;
    uniform float uMixNormalLifetimeOffset;
    uniform float uMixNormalLifetimeSize;
    uniform float uMixNormalLifetimeSurfaceDistance;
    uniform float uMixNormalLifetimeNoise;
    ${shaderProps.uniformDeclaration};

    varying float vProgressColor;
    varying float vProgressAlpha;

    void main() {
      float dotNormal = dot(normal, uNormal) * 0.5 + 0.5;
      float normalP = smoothstep(uNormalThreshold, 1., dotNormal);
      float lifetimeNoise = uLifetimeNoise * mix(normalP, 1.0, uMixNormalLifetimeNoise);

      float t = uTime + position.x * 1. * uNoiseScale + position.y * 10. * uNoiseScale + 
      position.z * 7.3 * uNoiseScale + sin(lifetimeNoise * (position.x + 13. * position.y)) * lifetimeNoise;

      float lifetimeP = max(-0.0001, mix(-uCooldownRatio, 1. + cos(t) * lifetimeNoise, fract(t)));
      float surfaceDistance = ${shaderProps.use('surfaceDistanceSequence')
      .at('mix(normalP, lifetimeP, uMixNormalLifetimeSurfaceDistance)').get()};

      vec4 modelPosition = modelMatrix * vec4(position, 1.0) +  vec4(normal * surfaceDistance, 0.0);
      vec3 noise = ${shaderProps.use('noiseSequence').at('mix(normalP, lifetimeP, uMixNormalLifetimeNoise)').get()};
      noise = vec3(0., 0., 0.);
      vec3 offset = ${shaderProps.use('offsetSequence').at('mix(normalP, lifetimeP, uMixNormalLifetimeOffset)').get()};
      modelPosition.x += cos(t * uNoiseScale * 10.0) * 0.2 * uOffsetNoise * noise.x * offset.x;
      modelPosition.y += sin(t * uNoiseScale * 10.0) * 0.2 * uOffsetNoise * noise.y * offset.y;
      modelPosition.z += cos(t * uNoiseScale * 10.0) * 0.2 * uOffsetNoise * noise.z * offset.z;

      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectionPostion = projectionMatrix * viewPosition;
      gl_Position = projectionPostion;

      gl_PointSize = 1.
      * ${shaderProps.use('sizeSequence').at('mix(normalP, lifetimeP, uMixNormalLifetimeSize)').get()}
      * mix(1., abs(sin(t * uNoiseScale + position.x * 13.9 + position.y * 73.1)), uScaleNoise)
      * uSize * (100.0 / -viewPosition.z) * uPixelRatio;

      if (gl_PointSize < 0.6 || lifetimeP < 0.0) { gl_Position = vec4(2, 2, 2, 1); }
      vProgressColor = mix(normalP, lifetimeP, uMixNormalLifetimeColor);
      vProgressAlpha = ${shaderProps.use('alphaSequence')
      .at('mix(normalP, lifetimeP, uMixNormalLifetimeAlpha)').get()} * uAlpha; 
    }`,
  fragmentShader: `
    varying float vProgressColor;
    varying float vProgressAlpha;

    ${shaderProps.uniformDeclaration};
    void main() {
      float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
      float strength = (1.0 * .05) / distanceToCenter - (1.0 * 0.1);
      gl_FragColor = ${shaderProps.use('colorSequence').at('vProgressColor').getRaw()};
      gl_FragColor.a = strength * vProgressAlpha;
      #include <tonemapping_fragment>
      #include <${version >= 154 ? 'colorspace_fragment' : 'encodings_fragment'}>
    }`,
}

function setPixelRatio(mat: ShaderMaterial, pixelRatio: number) {
  mat.uniforms.uPixelRatio.value = pixelRatio
}

function setAlpha(mat: ShaderMaterial, alpha: number) {
  mat.uniforms.uAlpha.value = alpha
}

function setOffsetNoise(mat: ShaderMaterial, offsetNoise: number) {
  mat.uniforms.uOffsetNoise.value = offsetNoise
}

function isObject3D(o: any): o is Object3D { 
  return o && 'isObject3D' in o
}

function isBufferGeometry(o: any): o is BufferGeometry { 
  return o && 'isBufferGeometry' in o 
}

const mat = new ShaderMaterial(shaderMaterialParameters)
const sparkles = new Points(undefined, mat)
onMounted(() => {
  if (props.geometry) {
    if (isBufferGeometry(props.geometry)) {
      sparkles.geometry.copy(props.geometry)
    }
    else if (isObject3D(props.geometry) && 'geometry' in props.geometry && isBufferGeometry(props.geometry.geometry)) {
      sparkles.geometry.copy(props.geometry.geometry)
    }
  }
  else if (isObject3D(sparkles.parent) && 'geometry' in sparkles.parent && isBufferGeometry(sparkles.parent.geometry)) {
    sparkles.geometry.copy(sparkles.parent.geometry)
  }
  else {
    sparkles.geometry = new IcosahedronGeometry(1, 16)
  }
})

const aspect = useTresContext().sizes.aspectRatio
const NOW = { immediate: true }
const u = mat.uniforms

watch(aspect, 
  () => { setPixelRatio(mat, aspect.value) }, 
  NOW)

watch(refs.size, 
  () => { u.uSize.value = refs.size.value }, 
  NOW)

watch(refs.normalThreshold, 
  () => { u.uNormalThreshold.value = refs.normalThreshold.value }, 
  NOW)

watch(refs.alpha, 
  () => { setAlpha(mat, refs.alpha.value) }, 
  NOW)

watch([refs.noiseScale, refs.lifetimeS], 
  () => {
  // NOTE: Scale noise by lifetime so that scaling lifetime keeps same noise period
    u.uNoiseScale.value = refs.noiseScale.value * refs.lifetimeS.value
  }, 
  NOW)

watch([refs.lifetimeS, refs.cooldownS], 
  () => {
    u.uCooldownRatio.value = refs.cooldownS.value / refs.lifetimeS.value
  }, 
  NOW)

watch(refs.offsetNoise, 
  () => { setOffsetNoise(mat, refs.offsetNoise.value) }, 
  NOW)

watch(refs.mixNormalLifetimeColor, 
  () => { u.uMixNormalLifetimeColor.value = refs.mixNormalLifetimeColor.value }, 
  NOW)

watch(refs.mixNormalLifetimeAlpha, 
  () => { u.uMixNormalLifetimeAlpha.value = refs.mixNormalLifetimeAlpha.value }, 
  NOW)

watch(refs.mixNormalLifetimeOffset, 
  () => { u.uMixNormalLifetimeOffset.value = refs.mixNormalLifetimeOffset.value }, 
  NOW)

watch(refs.mixNormalLifetimeSize, 
  () => { u.uMixNormalLifetimeSize.value = refs.mixNormalLifetimeSize.value }, 
  NOW)

watch(refs.mixNormalLifetimeSurfaceDistance, 
  () => { u.uMixNormalLifetimeSurfaceDistance.value = refs.mixNormalLifetimeSurfaceDistance.value }, 
  NOW)

watch(refs.mixNormalLifetimeNoise, 
  () => { u.uMixNormalLifetimeNoise.value = refs.mixNormalLifetimeNoise.value },
  NOW)

// NOTE: equivalient to:
// watch(texture, () => { u.uInfo.value = texture.value })
materialWatcher(mat)

useRenderLoop().onLoop(({ elapsed }) => {
  if (props.directionalLight) {
    mat.uniforms.uNormal.value = new Vector3().applyMatrix4(props.directionalLight.matrixWorld).normalize()
  }
  mat.uniforms.uTime.value = elapsed / (props.cooldownS + props.lifetimeS)
})

onUnmounted(() => {
  mat.dispose()
  texture.value.dispose()
})

const sparkleRef = shallowRef()
</script>

<template>
  <primitive
    ref="sparkleRef"
    :object="sparkles"
  />
</template>