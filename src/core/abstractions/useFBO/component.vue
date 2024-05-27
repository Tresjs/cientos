<script setup lang="ts">
import type { FboOptions } from '.'
import { useFBO } from '.'

const props = withDefaults(defineProps<FboOptions>(), {
  depth: false,
  settings: undefined,
})

const target = useFBO(props)

defineExpose({
  instance: target,
})
</script>
