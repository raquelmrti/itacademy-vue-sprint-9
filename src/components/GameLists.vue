<script setup>
defineProps({
  lists: Array,
});

import GameListCard from './GameListCard.vue';
</script>

<template>
  <div>Lists</div>
  <div>
    <ul v-if="lists">
      <li v-for="list of lists" :key="list.listId">
        <GameListCard :list="list"/>
      </li>
    </ul>
    <div v-else>
      <p>No lists</p>
    </div>
  </div>
</template>
