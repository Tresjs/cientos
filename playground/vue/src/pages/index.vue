<script setup lang="ts">
import { categories, components } from '../../../../metadata/index.json'

const icons = { abstractions: '📦', controls: '🕹️', staging: '🎭', loaders: '⏳', materials: '👔', shapes: '🔷', misc: '🛠️' } as const
</script>

<template>
  <div
    class="
  container mx-auto max-w-3xl
  font-sans text-xs color-gray
  bg-white
  "
  >
    <div class="mx-4">
      <div
        class="
    mt-24 mb-12 text-center align-baseline items-center gap-6
    sm:mt-16 sm:mb-6 sm:text-left sm:flex sm:flex-row-reverse
    "
      >
        <div>
          <img
            src="/logo.svg"
            alt="Cientos logo"
            class="max-w-36 sm:max-w-xs align-baseline"
          />
        </div>
        <div class="sm:w-2/3">
          <h1
            class="
        w-auto max-w-75 mx-auto text-5xl text-zinc-700 mb-3
        sm:mx-none sm:w-1/2 sm:max-w-72
        "
          >
            <span class="text-cientos-blue">Cientos</span> Playground
          </h1>
          <p class="text-lg">
            Testing zone for TresJS/Cientos components
          </p>
        </div>
      </div>
      <div class="text-center sm:text-left sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="category in categories"
          :key="category"
          class="
          p-4 my-4 leading-normal size-m weight-600 bg-zinc-50 rounded
          sm:my-0
          "
        >
          <div class="inline-block p-2 p-x-3 m-b-3 text-2xl bg-zinc-200 rounded">
            {{ icons[category as keyof typeof icons] ?? '❓' }}
          </div>
          <h2 class="text-sm p-0 m-0 mb-1.5 font-semibold text-zinc-600">
            {{ category }}
          </h2>
          <div
            v-for="component in components.filter(c => c.category === category && c.playground)"
            :key="component.name"
            class="link-wrapper"
          >
            <router-link
              class="no-underline text-zinc-700 visited:text-zinc-400 hover:text-cientos-blue"
              :to="`/${component.package}/${component.name}`"
            >
              <span>{{ component.name }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
