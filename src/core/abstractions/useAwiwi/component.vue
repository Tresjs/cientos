<script setup lang="ts">
import type { FboOptions } from '.'
import { useFBO } from '.'

const props = withDefaults(defineProps<FboOptions>(), {
  depth: false,
  samples: 0,
  settings: undefined,
})

const target = useFBO(props)

defineExpose({
  value: target,
})
</script>
