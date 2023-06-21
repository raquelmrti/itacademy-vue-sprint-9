<script setup>
import { ref, watch } from "vue";
import router from "@/router/index"
import { useRoute } from "vue-router";
import { auth } from "@/../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import GameListContentInfo from "@/components/GameListContentInfo.vue";
import GameListContentGames from "@/components/GameListContentGames.vue";
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
const list = ref({});
const listId = route.params.id;

watch(lists, () => {
  list.value = listStore.getListById(listId);
});

const editMode = ref(false)

const onDelete = () => {
  const response = confirm(`Are you sure you want to delete "${list.value.title}"?`);
  if (!response) return;
  listStore.deleteList(listId);
  router.push("/home")
};

const onSave = () => {
  editMode.value = false
}


</script>

<template>
  {{ editMode }}
  <button type="button" @click="editMode = true">Edit list</button>
  <button type="button" @click="onDelete">Delete list</button>
  <button type="button" @click="onSave" v-if="editMode">Save</button>

  <GameListContentInfo :list="list" :editing="editMode"/>
  <GameListContentGames :list="list" :editing="editMode"/>
</template>
