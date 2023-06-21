<script setup>
import { ref, computed, watch, toRef } from "vue";

const props = defineProps({
  list: Object,
  editing: Boolean,
});

const dataIsReady = computed(() => {
  return props.list && props.list.games;
});

const titleEdit = computed(() => {
  return props.list.title || ref("");
});

const descriptionEdit = computed(() => {
  return props.list.description || ref("");
});
</script>

<template>
  <template v-if="dataIsReady">
    <input type="text" v-model="titleEdit" v-if="editing" />
    <h1 v-else>{{ props.list?.title }}</h1>
    <span>By {{ props.list.ownerDisplayName }}</span>
    <span>Created: {{ props.list.creationDate }}</span>
    <span>Last updated: {{ props.list.lastUpdatedDate }}</span>
    <input type="text" v-model="descriptionEdit" v-if="editing" />
    <h2 v-else>{{ props.list.description }}</h2>
  </template>
  <template v-else>
    <div>
      <p>Loading...</p>
    </div>
  </template>
</template>
