<script setup>
import { computed, watch, ref } from "vue";
const props = defineProps({
  list: Object,
  editing: Boolean
});

// using the optional chaining operation ?. because the data
// isn't immediately ready
const gamesArrLength = computed(() => {
  return props.list?.games?.length || 0
});

const games = computed(() => {
  return props.list?.games || ref([])
});
</script>

<template>
  <h2>Games</h2>
  <template v-if="gamesArrLength === 0">
    <p>No games.</p>
  </template>
  <template v-else>
    <div v-for="game in games" :key="game?.id">
      <p>{{ game?.name }}</p>
      <p>{{ game?.summary }}</p>
    </div>
  </template>
  <button type="button">Add new game</button>
</template>
