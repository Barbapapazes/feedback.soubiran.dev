<script lang="ts">
import { h } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { FeedbackPage } from '~/types/feedback'

const UBadge = resolveComponent('UBadge')
const UPopover = resolveComponent('UPopover')

const feedbackPerPageTable = tv({
  slots: {
    base: ''
  },
})

export interface FeedbackPerPageTableProps {
  period: string
  class?: any
  ui?: Partial<typeof feedbackPerPageTable.slots>
}
export interface FeedbackPerPageTableEmits {}
export interface FeedbackPerPageTableSlots {}
</script>

<script lang="ts" setup>
const props = defineProps<FeedbackPerPageTableProps>()
const emit = defineEmits<FeedbackPerPageTableEmits>()
defineSlots<FeedbackPerPageTableSlots>()

const { state } = useQuery({
  key: () => ['feedback', 'per-page', { period: props.period }],
  query: () => $fetch<{ data: FeedbackPage[] }>('/api/feedback/per-page.json', {
    params: { period: props.period },
  }),
})

const columns: TableColumn<FeedbackPage>[] = [
  {
    accessorKey: 'url',
    header: 'URL'
  },
  {
    header: 'Satisfaction',
    meta: {
      class: {
        th: 'text-end',
        td: 'text-end',
      }
    },
    cell: ({ row }) => {
      const positive = row.original.positive.percent
      let style = 'background-color: transparent; color: inherit;'
      if (positive < 60) {
        const intensity = ((60 - positive) / 60) * 100
        style = `background-color: color-mix(in oklab, var(--ui-error) ${intensity}%, transparent); color: white;`
      }
      return h(UBadge, { style }, () => `${positive}%`)
    }
  },
  {
    header: 'Negative',
    meta: {
      class: {
        th: 'text-end',
        td: 'text-end',
      }
    },
    cell: ({ row }) => {
      return h(UPopover, {
        mode: 'hover',
        content: {
          align: 'end'
        }
      }, {
        default: () => h('div', null, row.original.negative.total),
        content: () => h('div', { class: 'p-2 text-sm flex flex-col gap-1' }, [
          h('span', null, [
            h('span', { class: 'text-muted' }, '☹️ Not great: '),
            h('span', null, row.original.negative.breakdown['Not great'])
          ]),
          h('span', null, [
            h('span', { class: 'text-muted' }, '😭 Hate it: '),
            h('span', null, row.original.negative.breakdown['Hate it'])
          ]),

        ])
      })
    }
  },
  {
    header: 'Positive',
    meta: {
      class: {
        th: 'text-end',
        td: 'text-end',
      }
    },
    cell: ({ row }) => {
      return h(UPopover, {
        mode: 'hover',
        content: {
          align: 'end'
        }
      }, {
        default: () => h('div', null, row.original.positive.total),
        content: () => h('div', { class: 'p-2 text-sm flex flex-col gap-1' }, [
          h('span', null, [
            h('span', { class: 'text-muted' }, '🙂 It\'s ok: '),
            h('span', null, row.original.positive.breakdown['It\'s ok'])
          ]),
          h('span', null, [
            h('span', { class: 'text-muted' }, '🤩 Love it: '),
            h('span', null, row.original.positive.breakdown['Love it'])
          ]),

        ])
      })
    }
  },
  // {
  //   accessorFn: (row) => row.negative.breakdown['Hate it'],
  //   header: '😭 Hate it'
  // },
  // {
  //   accessorFn: (row) => row.negative.breakdown['Not great'],
  //   header: '☹️ Not great'
  // },
  // {
  //   accessorFn: (row) => row.positive.breakdown['It\'s ok'],
  //   header: '🙂 It\'s ok'
  // },
  // {
  //   accessorFn: (row) => row.positive.breakdown['Love it'],
  //   header: '🤩 Love it'
  // },
  {
    header: 'Comments',
    accessorKey: 'comments',
    meta: {
      class: {
        th: 'text-end',
        td: 'text-end',
      }
    },
  }
]

const ui = computed(() => feedbackPerPageTable())
</script>

<template>
  <UTable
    :columns="columns"
    :loading="state.status === 'pending'"
    :data="state.data?.data"
  />
</template>
