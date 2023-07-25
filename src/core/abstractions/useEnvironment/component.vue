<script setup lang="ts">
import { EnvironmentOptions } from './const'
import { CubeTexture, Texture } from 'three'
import type { ShallowRef } from 'vue'
import { useEnvironment } from '.'

const props = withDefaults(defineProps<EnvironmentOptions>(), {
  background: false,
  blur: 0,
  files: () => ['/px.png', '/nx.png', '/py.png', '/ny.png', '/pz.png', '/nz.png'],
  path: '/',
  preset: undefined,
  encoding: undefined,
})

// Commenting out for now
// defineExpose({ getTexture: () => texture.value })

const texture: ShallowRef<Texture | CubeTexture | null> = await useEnvironment(props)
</script>
