<template>
  <div class="space-y-4">
    <div class="overflow-x-auto rounded-lg border border-border">
      <table class="min-w-full bg-bg">
        <thead class="bg-primary text-primary-foreground">
          <tr>
            <th
              v-for="header in headers"
              :key="header.key"
              class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide"
            >
              {{ header.label }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-bg">
          <tr
            v-for="(row, index) in paginatedData"
            :key="row.id || row.plan_uuid"
            :class="[
              'hover:bg-bg-secondary transition-colors',
              index % 2 === 0 ? 'bg-bg' : 'bg-bg-secondary/50'
            ]"
          >
            <td
              v-for="header in headers"
              :key="header.key"
              class="px-6 py-4 text-sm text-text"
            >
              {{ getNestedValue(row, header.key) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Controls -->
    <div class="flex items-center justify-between">
      <div class="text-sm text-text-secondary">
        Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} results
      </div>
      <div class="flex items-center space-x-2">
        <button
          @click="$emit('page-change', currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 text-sm border border-border rounded hover:bg-bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <div class="flex space-x-1">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="$emit('page-change', page)"
            :class="[
              'px-3 py-1 text-sm border rounded transition-colors',
              page === currentPage
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border hover:bg-bg-secondary'
            ]"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="$emit('page-change', currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 text-sm border border-border rounded hover:bg-bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Header {
  key: string;
  label: string;
}

interface Props {
  headers: Header[];
  data: any[];
  currentPage?: number;
  pageSize?: number;
}

interface Emits {
  (e: 'page-change', page: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  pageSize: 10,
});

const emit = defineEmits<Emits>();

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

// Pagination computed properties
const totalItems = computed(() => props.data.length);
const totalPages = computed(() => Math.ceil(totalItems.value / props.pageSize));
const startItem = computed(() => (props.currentPage - 1) * props.pageSize + 1);
const endItem = computed(() => Math.min(props.currentPage * props.pageSize, totalItems.value));

const paginatedData = computed(() => {
  const start = (props.currentPage - 1) * props.pageSize;
  const end = start + props.pageSize;
  return props.data.slice(start, end);
});

const visiblePages = computed(() => {
  const pages: number[] = [];
  const maxVisible = 5;
  let start = Math.max(1, props.currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});
</script>
