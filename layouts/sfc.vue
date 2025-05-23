<template>
  <div class="slidev-layout default">
    <div :class="['sfc', 'justify-items-stretch', 'w-full', 'h-full', { 'sfc-has-slot': hasSlot }]">
      <slot />
      <div class="overflow-hidden h-full">
        <iframe
          :src="exampleLink()"
          frameborder="0"
          width="960"
          height="460"
          class="sfc-iframe-full -mt-14 mb-2"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { inject, useAttrs, useSlots, computed } from 'vue';

  const attrs = useAttrs();
  const slots = useSlots();

  const hasSlot = computed(() => !!slots.default && slots.default().length > 0);

  const examples = inject('sfc-examples', {});

  function exampleLink() {
    if (typeof window === 'undefined') return '';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const src = examples[attrs.example];

    const content =
      typeof src === 'object'
        ? src
        : {
            'App.vue': src,
          };

    const encoded = window.btoa(JSON.stringify(content));

    return `https://sfc.vuejs.org/#${encoded}`;
  }
</script>

<style scoped>
  .sfc-iframe-full {
    height: calc(100% + 3.5rem);
  }

  .sfc {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .sfc-has-slot {
    grid-template-rows: max-content 1fr;
  }
</style>
