<script setup>
import { useListStore } from "../stores/listStore";
const listStore = useListStore();
const lists = listStore.lists

import GameListCard from "./GameListCard.vue";
import { computed } from "vue";

const areThereNoLists = computed(() => lists.length === 0);
</script>

<template>
  <div>Lists</div>
  <div>
    <ul v-if="!areThereNoLists">
      <li v-for="list of lists" :key="list.listId">
        <router-link :to="{ name: 'list', params: { id: list.listId } }">
          <GameListCard :list="list" />
        </router-link>
      </li>
    </ul>
    <div v-else>
      <p>No lists</p>
    </div>
  </div>
</template>
