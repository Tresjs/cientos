<script setup lang="ts">
import { OrbitControls, TextTroika } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping } from 'three'

const fontURL = 'https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff'
</script>

<template>
  <TresCanvas clear-color="#fbb03b" :tone-mapping="NoToneMapping">
    <TresPerspectiveCamera :position="[0, 0, 3]" />
    <OrbitControls />
    <Suspense>
      <TextTroika
        text="hola"
        :font="fontURL"
        :font-size="1"
        anchor-x="center"
        anchor-y="middle"
      />
    </Suspense>
  </TresCanvas>
</template>
