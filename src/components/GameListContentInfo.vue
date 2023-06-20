<script setup>
const props = defineProps({
  list: Object,
});
</script>

<template>
  <template v-if="props.list">
    <h1>{{ props.list.title }}</h1>
    <span>By {{ props.list.ownerDisplayName }}</span>
    <span>Created: {{ props.list.creationDate }}</span>
    <span>Last updated: {{ props.list.lastUpdatedDate }}</span>
    <h2>{{ props.list.description }}</h2>
  </template>
  <template v-else>
    <div>
      <p>Loading...</p>
    </div>
  </template>
</template>
