<script setup>
const emit = defineEmits(["closeModal"]);

const close = () => {
  emit("closeModal");
};
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay">
      <div class="modal-container">
        <button class="modal-close-button" @click="close">X</button>
        <header class="modal-header">
          <slot name="modal-title"></slot>
        </header>
        <main class="modal-body">
          <slot name="modal-body"></slot>
        </main>
        <footer class="modal-footer">
          <slot name="modal-footer"></slot>
        </footer>
      </div>
    </div>
  </Teleport>
</template>