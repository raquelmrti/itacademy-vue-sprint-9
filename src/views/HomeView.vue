<template>
  <h1>My lists</h1>
  <GameLists :lists="listStore.lists" />
  <button type="button" @click="showModal = true">Create list</button>
  <GameListCreate v-if="showModal" @closeModal="showModal = false" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth'

import GameLists from "@/components/GameLists.vue";
import GameListCreate from "@/components/GameListCreate.vue";

import { useListStore } from "../stores/listStore";
const listStore = useListStore();

import { useUserStore } from "../stores/userStore";
const userStore = useUserStore();

const showModal = ref(false);

// onMounted(async () => {
//   await userStore.getCurrentUser();
//   if (userStore.userData) {
//     alert(userStore.userData.email)
//   }
// });

onAuthStateChanged(auth, async (user) => {
  if (user) {
    await listStore.getLists(user.uid)
  }
})

onUnmounted(() => {
  listStore.$reset()
})

</script>
