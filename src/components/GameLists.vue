<template>
  <div>Lists</div>
  <div>
    <ul v-if="lists">
      <li v-for="list of lists" :key="list.listId">
        {{ list.title }} - {{ list.description }}
      </li>
    </ul>
    <div v-else>
      <p>No lists</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  lists: Array,
});
</script>
