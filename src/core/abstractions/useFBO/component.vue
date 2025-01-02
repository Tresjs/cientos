<script setup lang="ts">
import { useFBO } from './index.js'
import type { FboOptions } from './index.js'

const props = withDefaults(defineProps<FboOptions>(), {
  depth: false,
  settings: undefined,
  autoRender: true,
})

const target = useFBO(props)

defineExpose({
  instance: target,
})
</script>
