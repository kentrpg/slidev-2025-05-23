<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
  },
})
</script>

<template>
  <div class="slidev-layout fact-monaco place-content-center mx-auto" :class="props.class">
    <slot />
  </div>
</template>

<style scoped>
:deep(h1) {
  text-align: center !important;
}
</style>
