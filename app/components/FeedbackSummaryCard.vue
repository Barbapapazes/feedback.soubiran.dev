<script lang="ts">
const feedbackSummaryCard = tv({
  slots: {
    base: '',
    icon: 'size-6 mt-[2px]',
    value: 'text-lg font-bold',
    label: 'text-sm text-muted',
  },
})

export interface FeedbackSummaryCardProps {
  icon: string
  label: string
  value: number | string
  class?: any
  ui?: Partial<typeof feedbackSummaryCard.slots>
}
export interface FeedbackSummaryCardEmits {}
export interface FeedbackSummaryCardSlots {}
</script>

<script lang="ts" setup>
const props = defineProps<FeedbackSummaryCardProps>()
defineEmits<FeedbackSummaryCardEmits>()
defineSlots<FeedbackSummaryCardSlots>()

const ui = computed(() => feedbackSummaryCard())
</script>

<template>
  <UCard
    :ui="{ body: 'flex flex-row gap-2' }"
    variant="soft"
  >
    <UIcon
      :name="props.icon"
      :class="ui.icon({ class: props.ui?.icon })"
    />
    <div>
      <div :class="ui.value({ class: props.ui?.value })">
        {{ props.value }}
      </div>
      <div :class="ui.label({ class: props.ui?.label })">
        {{ props.label }}
      </div>
    </div>
  </UCard>
</template>
