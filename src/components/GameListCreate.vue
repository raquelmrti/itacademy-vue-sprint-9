<script setup>
import { ref } from "vue";
import BaseModal from "./BaseModal.vue";

import { useListStore } from "../stores/listStore";
const listStore = useListStore();
const { createList } = listStore;

const listTitle = ref("List title");
const listDescription = ref("List description");

const resetForm = () => {
  listTitle.value = "";
  listDescription.value = "";
};

const onSubmit = () => {
  const date = new Date().toLocaleString();
  createList(listTitle.value, listDescription.value, date);
  resetForm();
};
</script>

<template>
  <BaseModal>
    <template #modal-title>
      <h1 class="modal-title">Create a list</h1>
    </template>

    <template #modal-body>
      <form @submit.prevent="onSubmit">
        <div class="modal-input-group">
          <label for="listTitle">Title</label>
          <span>Give your list a title</span>
          <input type="text" id="listTitle" v-model.trim="listTitle" required />
        </div>

        <div class="modal-input-group">
          <label for="listDescription">Description</label>
          <span>Describe the purpose of this list</span>
          <textarea id="listDescription" v-model.trim="listDescription" />
        </div>
        <button type="submit" class="modal-button">Create a new list</button>
      </form>
    </template>
  </BaseModal>
</template>
