<!--
CurvedArrow.vue

A flexible SVG arrow component with adjustable curvature.

Usage examples:
<CurvedArrow x1="100" y1="100" x2="300" y2="200" curvature="0.5" color="red" />
<CurvedArrow x1="100" y1="100" x2="300" y2="200" curvature="-0.5" color="blue" />
<CurvedArrow x1="100" y1="100" x2="300" y2="200" curvature="0" color="green" />
-->

<script setup lang="ts">
import { computed } from 'vue'
import { makeId } from '../logic/utils'

const props = defineProps({
  x1: { type: [Number, String], required: true },
  y1: { type: [Number, String], required: true },
  x2: { type: [Number, String], required: true },
  y2: { type: [Number, String], required: true },
  width: { type: [Number, String], default: 2 },
  color: { type: String, default: 'currentColor' },
  twoWay: { type: Boolean, default: false },
  curvature: { type: Number, default: 0 }, // 0 = straight, >0/-<0 = curve
})

const id = makeId()
const markerAttrs = {
  markerUnits: 'strokeWidth',
  markerHeight: 7,
  refY: 3.5,
  orient: 'auto',
}

// 計算貝茲曲線控制點
const control = computed(() => {
  const x1 = +props.x1, y1 = +props.y1, x2 = +props.x2, y2 = +props.y2
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dx = x2 - x1, dy = y2 - y1
  const len = Math.sqrt(dx*dx + dy*dy) || 1
  const nx = -dy / len, ny = dx / len
  // 50 為最大偏移量，可依需求調整
  const offset = props.curvature * 50
  return { cx: mx + nx * offset, cy: my + ny * offset }
})

// 動態計算 SVG 畫布大小，避免裁切
const svgWidth = computed(() => Math.max(+props.x1, +props.x2) + 50)
const svgHeight = computed(() => Math.max(+props.y1, +props.y2) + 50)
</script>

<template>
  <svg
    class="absolute left-0 top-0"
    :width="svgWidth"
    :height="svgHeight"
    style="pointer-events: none;"
  >
    <defs>
      <marker :id="id" markerWidth="10" refX="9" v-bind="markerAttrs">
        <polygon points="0 0, 10 3.5, 0 7" :fill="props.color" />
      </marker>
      <marker v-if="props.twoWay" :id="`${id}-rev`" markerWidth="20" refX="11" v-bind="markerAttrs">
        <polygon points="20 0, 10 3.5, 20 7" :fill="props.color" />
      </marker>
    </defs>
    <path
      :d="`M ${props.x1} ${props.y1} Q ${control.cx} ${control.cy} ${props.x2} ${props.y2}`"
      :stroke="props.color"
      :stroke-width="props.width"
      fill="none"
      :marker-end="`url(#${id})`"
      :marker-start="props.twoWay ? `url(#${id}-rev)` : 'none'"
      style="pointer-events: auto;"
    />
    <!-- 透明點擊區域（可選）
    <path
      :d="`M ${props.x1} ${props.y1} Q ${control.cx} ${control.cy} ${props.x2} ${props.y2}`"
      stroke="transparent"
      fill="none"
      :stroke-width="20"
    />
    -->
  </svg>
</template>