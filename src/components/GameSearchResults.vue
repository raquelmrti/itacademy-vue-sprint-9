<script setup>
import { useGameStore } from "../stores/gameStore";
const gameStore = useGameStore();
</script>

<template>
 <h2>Results</h2>

  <ul>
   <li v-for="game in gameStore.fetchedGames" :key="game.id">
    <a :href="'/game/' + game.id">{{ game.name }}</a>
<button type="button" @click="gameStore.addGameToList(game)">Add game</button>
  </li>
  </ul>
</template>
