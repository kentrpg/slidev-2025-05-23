---
theme: seriph
highlighter: shiki
css: unocss
# colorSchema: dark
layout: cover
drawings:
  persist: true
transition: fade-out
mdc: true
lang: zh-CN
title: 從習慣來學習 Vue 樣式綁定
---

# 習慣樣式綁定與條件渲染 <uim-rocket class="text-2xl text-green-300 animate-ping" />

從開發習慣來學習 Vue 寫法

v1

---
src: ./markdown/highlight-example.md
---

<div class="twoslash">
  <div class="twoslash-tag-line twoslash-tag-warn-line">
    這是自訂警告訊息
  </div>
</div>

---

```ts {1|2|3|4}{at:3}
function add(
  a: Ref<number> | number,
  b: Ref<number> | number
) {
  return computed(() => unref(a) + unref(b))
  // console
}
```

---

```ts {6,7}
// step 2
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  }
}
```

---
layout: sfc
example: simple
---

# Firing up a Vue SFC playground

<!-- <iframe src="https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHRlbXBsYXRlPlxuXHRIaSBLaWEgOilcbjwvdGVtcGxhdGU+In0=" /> -->


---

## v-clicks depth

<v-clicks depth="2">

- item
  - item1
- item
  - item1
    - item2

</v-clicks>

---

## every

<v-clicks every="2" >

- Item 1.1
  - Item 1.1.1
    - Item 1.1.1.1
- Item 1.2
- Item 2.1
- Item 2.2

</v-clicks>

---
layout: cover
---

# Learn More

[Documentation](https://sli.dev) · [GitHub](https://github.com/slidevjs/slidev) · [Showcases](https://sli.dev/resources/showcases)

<Repo name="antfu/eslint-config" /> <span flex="~ inline gap-0.5 items-center" text-amber bg-amber:15 px1 rounded text-xs>4.1k</span>

<div color="[#10b981]">test</div>

---

### Rough Markers

<v-click>

The <span v-mark="2"><code>v-mark</code> directive</span>
also allows you to add
<span v-mark="{ at: 3, color: 'orange', type: 'circle' }">inline marks</span>
, powered by [Rough Notation](https://roughnotation.com/):

```html
<span v-mark.underline.orange>inline markers</span>
```

</v-click>

<tabler-aerial-lift-filled class="text-3xl my-2" />
<uim-rocket />
<uim-rocket class="text-3xl text-red-400 mx-2" />
<uim-rocket class="text-3xl text-orange-400 animate-ping" />

---

# twoslash 範例

```ts
const a = 1 // [!code highlight:3]
```

```ts twoslash
import { ref } from 'vue'

const count = ref(0)
//    ^?
```

---
layout: image-right
image: https://cover.sli.dev
---

# Code

Use code snippets and get the highlighting directly, and even types hover!

```ts {all|5|7|7-8|10|all} twoslash
// TwoSlash enables TypeScript hover information
// and errors in markdown code blocks
// More at https://shiki.style/packages/twoslash

import { computed, ref } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

doubled.value = 2
```

<arrow v-click="[4, 5]" x1="350" y1="310" x2="195" y2="334" color="#953" width="2" arrowSize="1" />

<!-- This allow you to embed external code blocks -->
<<< @/snippets/external.ts#snippet

<!-- Footer -->

[Learn more](https://sli.dev/features/line-highlighting)

<!-- Inline style -->
<style>
.footnotes-sep {
  @apply mt-5 opacity-10;
}
.footnotes {
  @apply text-sm opacity-75;
}
.footnote-backref {
  display: none;
}
</style>

<!--
Notes can also sync with clicks

[click] This will be highlighted after the first click

[click] Highlighted with `count = ref(0)`

[click:3] Last click (skip two clicks)
-->

---

<v-clicks depth="3">

- 純函數
  - 輸出完全由引數（arguments）決定且完全沒有 side effects 的函數
  - 當傳入的引數相同時，純函數永遠會傳回相同的值
  - 經常將此類函數稱為數學函式，藉以和程式語言中的函式做區分
- 迷思：
  - ❌ 為徹底避免 side effects 發生，FP 程式設計師只能使用純函數
  - ⭕️ 真正的 FP 程式設計師也會運用 side effects 和非純函數

</v-clicks>
