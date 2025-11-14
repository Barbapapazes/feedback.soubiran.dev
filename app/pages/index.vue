<script lang="ts" setup>
const items = ref(['24h', '7d', '30d'])
const value = ref('7d')
</script>

<template>
  <UContainer class="py-12">
    <div class="flex justify-between">
      <h1 class="text-xl font-bold">Feedback Overview</h1>

      <USelect
        v-model="value"
        variant="ghost"
        :items="items"
        :content="{ align: 'end' }"
        :ui="{ content: 'min-w-fit' }"
        :trailing-icon="''"
      />
    </div>

    <FeedbackSummary :period="value" class="mt-4" />

    <UCard class="mt-8">
      <FeedbackPerPageTable :period="value" />
    </UCard>
  </UContainer>
</template>
