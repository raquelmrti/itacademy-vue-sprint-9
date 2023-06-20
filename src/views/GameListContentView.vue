<script setup>
import { ref, watch } from "vue";
import router from "@/router/index"
import { useRoute } from "vue-router";
import { auth } from "@/../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import GameListContentInfo from "@/components/GameListContentInfo.vue";
import { useListStore } from "@/stores/listStore";
const listStore = useListStore();
const route = useRoute();

//fetch lists from the current user
onAuthStateChanged(auth, async (user) => {
  if (user) {
    await listStore.getLists(user.uid);
  }
});

const lists = listStore.lists;
const list = ref(null);
const listId = route.params.id;

watch(lists, () => {
  list.value = listStore.getListById(listId);
});

const onDelete = () => {
  const response = confirm(`Are you sure you want to delete "${list.value.title}"?`);
  if (!response) return;
  listStore.deleteList(listId);
  router.push("/home")
};

</script>

<template>
  <button type="button">Edit list</button>
  <button type="button" @click="onDelete">Delete list</button>
  <GameListContentInfo :list="list"/>
</template>
