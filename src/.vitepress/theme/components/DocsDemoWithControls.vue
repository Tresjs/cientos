<script setup lang="ts">
</script>

<template>
  <ClientOnly>
    <div
      class="relative aspect-video"
      style=" height: auto; margin: 2rem 0 0; border-radius: 8px 8px 0 0; overflow:hidden;"
    >
      <Suspense>
        <slot></slot>
      </Suspense>
    </div>
  </ClientOnly>
</template>
