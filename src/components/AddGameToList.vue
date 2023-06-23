<script setup>
import { ref } from "vue";
import BaseModal from "./BaseModal.vue";
import GameSearch from "./GameSearch.vue";
import GameSearchResults from './GameSearchResults.vue'

// import { useListStore } from "../stores/listStore";
// const listStore = useListStore();

const emit = defineEmits(["closeModal"]);
const close = () => {
  emit("closeModal");
};

</script>

<template>
  <BaseModal>
    <template #modal-title>
      <h1 class="modal-title">Add games</h1>
    </template>

    <template #modal-body>
      <GameSearch />
      <GameSearchResults />
    </template>

  </BaseModal>
</template>
