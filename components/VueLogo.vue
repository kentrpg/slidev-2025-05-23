<!--
  ⚠️ Slidev v-motion + v-click 使用注意事項
  依據官方文件 https://sli.dev/guide/animations#motion-with-clicks 
  - 由於 Vue 內部的 bug，必須將 v-click 與 v-motion 綁在同一個元素上，動畫才能正確在 click 時觸發
  - 因此，不能只在 <VueLogo v-click="1" /> 這種 component instance 上設置 v-click
  - 而是要在元件內使用 v-motion 的 element 加上 v-click，才能確保動畫效果與 click 行為一致
-->

<template>
  <!-- <div :class="wrapperClass"> -->
  <div class="absolute" :class="$attrs.class">
    <div class="relative w-10 h-10">
      <svg
        v-click="props.clicks"
        v-motion
        :initial="{ y: 500, x: -100, scale: 2 }"
        :enter="final"
        class="absolute inset-0"
        viewBox="0 0 262 226"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style="transform: scaleY(-1);"
      >
        <polygon
          points="130.5,60 50,226 100,226 130.5,150 161,226 211,226"
          fill="#35495e"
        />
      </svg>
      <svg
        v-click="props.clicks"
        v-motion
        :initial="{ x: 800, y: -100, scale: 1.5, rotate: -50 }"
        :enter="final"
        class="absolute inset-0"
        viewBox="0 0 261 266"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style="transform: scaleY(-1);"
      >
        <polygon
          points="130.5,30 15,266 60,266 130.5,110 210,266 251,266"
          fill="#42b883"
        />
      </svg>
    </div>
    <div
      class="text-2xl absolute top-1 left-10 text-[#34d399] -z-1"
      v-click="props.clicks"
      v-motion
      :initial="{ x: -80, opacity: 0}"
      :enter="{ x: 0, opacity: 1, transition: { delay: 2000, duration: 1000 } }"
    >
      Vue.js
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  wrapperClass: {
    type: String,
    default: 'absolute top-45% right-17% translate-x-[-17%] translate-y-[-45%]'
  },
  clicks: {
    type: Number,
    default: 0
  }
})
const final = {
  x: 0,
  y: 0,
  rotate: 0,
  scale: 1,
  transition: {
    type: 'spring',
    damping: 10,
    stiffness: 20,
    mass: 2
  }
}
</script> 
