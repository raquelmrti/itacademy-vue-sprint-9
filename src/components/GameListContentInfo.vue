<script setup>
import { ref, computed, toRef, watch } from "vue";

const props = defineProps({
  list: Object,
  editing: Boolean,
});

defineEmits(["sendUpdatedTitle", "sendUpdatedDescription"]);

const gameList = toRef(props, "list");
const editTitle = ref("");
const editDescription = ref("");

const dataIsReady = computed(() => {
  return Object.keys(gameList.value).length > 0 ? true : false;
});

watch(dataIsReady, () => {
  editTitle.value = gameList.value.title;
  editDescription.value = gameList.value.description;
});
</script>

<template>
  <template v-if="dataIsReady">
    <input
      type="text"
      v-model="editTitle"
      v-if="editing"
      @keyup="$emit('sendUpdatedTitle', editTitle)"
    />
    <h1 v-else>{{ props.list.title }}</h1>

    <span>By {{ props.list.ownerDisplayName }}</span>
    <span>Created: {{ props.list.creationDate }}</span>
    <span>Last updated: {{ props.list.lastUpdatedDate }}</span>

    <input
      type="text"
      v-model="editDescription"
      v-if="editing"
      @keyup="$emit('sendUpdatedDescription', editDescription)"
    />
    <h2 v-else>{{ props.list.description }}</h2>
  </template>

  <template v-else>
    <div>
      <p>Loading...</p>
    </div>
  </template>
</template>
