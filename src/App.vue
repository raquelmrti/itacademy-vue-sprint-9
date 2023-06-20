<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheNavbar from './components/TheNavbar.vue'
import { onMounted } from 'vue'
import { auth } from '../firebaseConfig'

// const isHomepage = computed(() => )
import { useListStore } from "./stores/listStore";
const listStore = useListStore();

import { useUserStore } from "./stores/userStore";
const userStore = useUserStore();

// onMounted(async () => {
//   await userStore.getCurrentUser();
// });

</script>

<template>
  <div>
    <h1>VAMOS A VER</h1>
    <!-- <p>userData from userStore: {{ userStore.userData }}</p>
    <p>getCurrentUser from userStore: {{ userStore.userData }}</p> -->
    <!-- <p>lists from listStore: {{ listStore.lists }}</p> -->
    <!-- <p>current user from Auth: {{ auth.currentUser }}</p> -->
    <!-- <p>computed lists from listStore: {{ listStore.sortedLists }}</p> -->
  </div>
  <hr>
  <!-- <TheNavbar v-if=""/> -->
  <RouterView />
</template>

<style scoped>
</style>
