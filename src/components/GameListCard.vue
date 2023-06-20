<script setup>
const props = defineProps({
  list: Object,
});

import { computed } from "vue";
import { useListStore } from "../stores/listStore";
const listStore = useListStore();

const gamesQuantityText = computed(() => {
  return props.list.games.length === 1 ? "1 game" : `${props.list.games.length} games`;
});
</script>

<template>
  <div class="border p-4">
    <h2 class="text-2xl font-bold">{{ list.title }}</h2>
    <p>{{ list.description }}</p>
    <p>{{ gamesQuantityText }}</p>
    <p>{{ list.listId }}</p>
    <span class="text-xs">Last updated: {{ list.lastUpdatedDate }}</span>
  </div>
</template>
