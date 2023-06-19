<template>
 <h1>My lists</h1>
 <GameLists />
 <button type="button" @click="showModal = true">Create list</button>
 <GameListCreate v-if="showModal" @closeModal="showModal = false" />
</template>

<script setup>
import GameLists from '@/components/GameLists.vue'
import GameListCreate from '@/components/GameListCreate.vue'
import { ref } from 'vue'
const showModal = ref(false)
</script>