<script setup>
import { computed, ref } from "vue";
const props = defineProps({
  list: Object,
  editing: Boolean
});
import AddGameToList from './AddGameToList.vue'

// using the optional chaining operation ?. because the data
// isn't immediately ready
const gamesArrLength = computed(() => {
  return props.list?.games?.length || 0
});

const games = computed(() => {
  return props.list?.games || ref([])
});

const showModal = ref(false);
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
  <button type="button" @click="showModal = true">Add new game</button>
  <AddGameToList v-if="showModal" @closeModal="showModal = false" />

</template>
