<script lang="ts">
import type { FeedbackSummary } from '~/types/feedback'

const feedbackSummary = tv({
  slots: {
    base: '',
  },
})

export interface FeedbackSummaryProps {
  period: string
  class?: any
  ui?: Partial<typeof feedbackSummary.slots>
}
export interface FeedbackSummaryEmits {}
export interface FeedbackSummarySlots {}
</script>

<script lang="ts" setup>
const props = defineProps<FeedbackSummaryProps>()
defineEmits<FeedbackSummaryEmits>()
defineSlots<FeedbackSummarySlots>()

const { state } = useQuery({
  key: () => ['feedback', { period: props.period }],
  query: () => $fetch<{ data: FeedbackSummary }>('/api/feedback/summary.json', {
    params: { period: props.period },
  }),
})

const averageRating = computed(() => {
  if (state.value.status === 'pending') return '...'
  else if (state.value.error) return 'Error'
  return state.value.data.data.average_rating
})

const negativeFeedbackValue = computed(() => {
  if (state.value.status === 'pending') return '...'
  else if (state.value.error) return 'Error'
  return state.value.data.data.negative.total
})
const negativeFeedbackLabel = computed(() => {
  if (state.value.status === 'pending' || state.value.error) return 'Negative'
  return `Negative (${state.value.data.data.negative.percent}%)`
})

const positiveFeedbackValue = computed(() => {
  if (state.value.status === 'pending') return '...'
  else if (state.value.error) return 'Error'
  return state.value.data.data.positive.total
})
const positiveFeedbackLabel = computed(() => {
  if (state.value.status === 'pending' || state.value.error) return 'Positive'
  return `Positive (${state.value.data.data.positive.percent}%)`
})

const feedbackComments = computed(() => {
  if (state.value.status === 'pending') return '...'
  else if (state.value.error) return 'Error'
  return state.value.data.data.comments
})


const ui = computed(() => feedbackSummary())
</script>

<template>
  <UCard
    :ui="{ body: 'grid grid-cols-2 lg:grid-cols-4 gap-4' }"
    :class="ui.base({ class: [props.ui?.base, props.class] })"
  >
    <FeedbackSummaryCard
      :value="averageRating"
      icon="i-ph:chart-line"
      label="Average Rating"
    />
    <FeedbackSummaryCard
      icon="i-ph:thumbs-down"
      :value="negativeFeedbackValue"
      :label="negativeFeedbackLabel"
      :ui="{ icon: 'text-error' }"
    />
    <FeedbackSummaryCard
      icon="i-ph:thumbs-up"
      :value="positiveFeedbackValue"
      :label="positiveFeedbackLabel"
      :ui="{ icon: 'text-success' }"
    />
    <FeedbackSummaryCard
      icon="i-ph:chat-teardrop"
      :value="feedbackComments"
      label="Comments"
    />
  </UCard>
</template>
