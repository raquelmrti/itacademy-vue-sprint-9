<script setup>
defineProps({
  list: Object,
});
</script>

<template>
  <div class="border p-4">
    <h2 class="text-2xl font-bold">{{ list.title }}</h2>
    <p>{{ list.description }}</p>
    <span class="text-xs">Last updated: {{ list.lastUpdatedDate }}</span>
  </div>
</template>