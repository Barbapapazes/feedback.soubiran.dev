<script lang="ts" setup>
import { PiniaColadaDevtools } from '@pinia/colada-devtools'
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />

    <NuxtPage />
  </UApp>

  <PiniaColadaDevtools />
</template>
