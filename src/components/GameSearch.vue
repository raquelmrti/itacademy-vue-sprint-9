<script setup>
import { ref } from "vue";
import { useGameStore } from "../stores/gameStore";
const gameStore = useGameStore();
const searchTerm = ref("");
</script>

<template>
 <label for="searchTerm">Search game by name</label>
        <input type="search" id="searchTerm" v-model.trim="searchTerm" required />
    <button type="button" @click="gameStore.searchGames(searchTerm)">Search</button>
</template>

<style scoped>

</style>