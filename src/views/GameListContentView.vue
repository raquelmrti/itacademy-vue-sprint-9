<script setup>
import { ref, onMounted, watch } from "vue";
import router from "@/router/index";
import { useRoute } from "vue-router";
import GameListContentInfo from "@/components/GameListContentInfo.vue";
import GameListContentGames from "@/components/GameListContentGames.vue";
import { useListStore } from "@/stores/listStore";
const listStore = useListStore();
const route = useRoute();
const listId = route.params.id;

const list = ref({});
const title = ref("");
const description = ref("");
onMounted(async () => {
  list.value = await listStore.getListById(listId);
  title.value = list.value.title;
  description.value = list.value.description;
});

const editMode = ref(false);
const onDelete = () => {
const response = confirm(`Are you sure you want to delete "${list.value.title}"?`);
  if (response) {
    listStore.deleteList(listId);
    router.push("/home");
  }
};

const getUpdatedTitle = (newTitle) => {
    list.value.title = newTitle
};
const getUpdatedDescription = (newDescription) => {
  list.value.description = newDescription;
};

const onSave = () => {
  editMode.value = false;
  const date = new Date().toLocaleString();
  listStore.updateListTitleAndDescription(listId, list.value.title, list.value.description, date);
  list.value.lastUpdatedDate = date;
};
</script>

<template>
  <button type="button" @click="editMode = true" @sendUpdatedTitle="getUpdatedTitle">
    Edit list
  </button>
  <button type="button" @click="onDelete">Delete list</button>
  <button type="button" @click="onSave" v-if="editMode">Save</button>

  <GameListContentInfo
    :list="list"
    :editing="editMode"
    @sendUpdatedTitle="getUpdatedTitle"
    @sendUpdatedDescription="getUpdatedDescription"
  />
  <GameListContentGames :list="list" :editing="editMode" />
</template>
