<script setup>
  import { ref } from 'vue'
  const isActive = ref(true)
</script>
<template>
  <button :class="'btn ' + [isActive ? 'active' : '']">
    array
  </button>
  <button :class="'btn ' + {active: isActive}">
    object
  </button>
</template>
<style scoped>
.btn {
  margin: 1rem 1rem 0 0;
  padding: 0.5rem 1rem;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.active {
  background-color: red;
}
</style>