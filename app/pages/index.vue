<template>
  <div class="min-h-screen bg-bg p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-text mb-6">Plan Summary</h1>
      <div class="bg-bg-secondary rounded-lg border border-border p-6 shadow-sm">
        <DataTable
          :headers="headers"
          :data="plans"
          :current-page="currentPage"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDirectusClientInstance } from '~/composables/directus';
import type { Plan } from '~/models/plan';

const client = useDirectusClientInstance();

const headers = [
  { key: 'plan_uuid', label: 'Plan UUID' },
  { key: 'cms_plan.page_plan_coverage.metadata', label: 'Metadata' },
  { key: 'plan_id', label: 'Plan ID' },
  { key: 'is_waive', label: 'Is Waive' },
];

const plans = ref<Plan[]>([]);
const currentPage = ref(1);

const fetchPlans = async () => {
  try {
    const response = await client.plan.readMany({
      fields: ['plan_uuid', 'plan_id', 'is_waive', { cms_plan: [{ page_plan_coverage: ['metadata'] }] }],
    });
    const result = (Array.isArray(response) ? response : response.data) as unknown as Plan[];
    plans.value = result;
  } catch (error) {
    console.error('Error fetching plans:', error);
  }
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

onMounted(() => fetchPlans());

</script>
