---
theme: seriph
highlighter: shiki
css: unocss
layout: cover
colorSchema: dark
drawings:
  persist: true
transition: fade-out
mdc: true
lang: zh-CN
title: 從習慣來學習 Vue 樣式綁定
---

# 樣式綁定與條件渲染

從開發習慣來學習 Vue 寫法

v1{.version}

<VueLogo class="top-44% right-17% translate-x-[-17%] translate-y-[-44%]" clicks="1" />

---

## Agenda{.mb-4}

<div duration-400 v-click>

- 樣式綁定
  - 動態樣式與響應式
  - Inline Styles
  - 樣式合併

</div>

<v-clicks>

- 條件渲染{.mt-3}
  - `v-if`、`v-show`
  - `v-if`、`computed`

</v-clicks>

---
layout: quote
transition: slide-left
---

# 動態樣式{.title-primary}與響應式

---
layout: fact
transition: slide-left
---

# 自動切換 class 或 style 來實現<span v-mark.wave="{at: 1,roughness:2,seed:146,color:'#047857',margin:1}">資料驅動樣式</span>的效果

<!-- [clike] 資料驅動樣式 -->

<div op50>

Vue 動態樣式綁定的語法搭配 `ref` 或 `reactive` 來綁定響應式狀態

</div>

---
layout: two-cols-duration
transition: slide-left
---

<div duration-slow :class="[{'scale-150 translate-y-60 translate-x-[32rem]' : $clicks < 1} ]">

## 兩種樣式綁定

</div>

::left::

<div delay-400 v-click="1">

### 靜態樣式

- 直接寫死在 HTML 屬性中
- 適合固定樣式，不需要根據狀態更新

```vue {monaco}
<template>
  <p class="text-red">這是一段紅色文字</p>
</template>
```

</div>

::right::

<div v-click="2">

### 動態樣式

- 透過 `:class｜:style` 來綁定 reactive 資料
- 適合根據響應式狀態來動態切換樣式

```vue {monaco}
<script setup>
import { ref } from 'vue'
const isError = ref(false)
</script>

<template>
  <!-- 動態 class：根據 isError 決定是否加上紅字 -->
  <p :class="{ 'text-red': isError }">
    這段文字會根據錯誤狀態變色
  </p>

  <!-- 動態 style：使用 computed 或條件運算式切換 style -->
  <p :style="{ color: isError ? 'red' : 'black' }">
    {{ isError ? '發生錯誤' : '一切正常' }}
  </p>
</template>
```

</div>

<!-- Vue 中的樣式綁定可以分為兩種情境 -->

---
layout: fact-monaco
transition: slide-left
class: w-2xl
---

# 字串拼接{.mb-4}

```vue {monaco}
<script setup>
  import { ref } from 'vue'
  const isActive = ref(true)
</script>

<template>
  <button :class="'btn ' + [isActive ? 'active' : '']">array</button>
  <button :class="'btn ' + {active: isActive}">object</button>
</template>

<style scoped>
.btn {
  background-color: blue;
}
.active {
  background-color: red;
}
</style>
```

<!-- 大家可以回答看看這兩個按鈕分別是什麼顏色，預設 btn 是藍色，如果有 active 樣式會變紅色 -->

---
layout: sfc
example: classConcat
transition: slide-left
---

<!-- 
array 是紅色，因為三元運算子的結果為 true 會添加 active。
object 是藍色，因為 class 沒有正確識別出 active 
[devTools] class 內的中括號裡面兩個 object 是 JS 將物件格式轉換為字串的結果
那為什麼為這樣？ [click]
-->

---
layout: center
transition: slide-left
---

<div duration-slow :class="[{'scale-120 translate-y-20' : $clicks < 1}]">

## JS 先運行了自動轉型，將物件<mark>轉為字串</mark>再傳給 Vue

</div>

<div duration-slow delay-400 m="t-4" v-click="1">

```ts {monaco-run}
let isActive = true
console.log('btn ' + [isActive ? 'active' : ''])
console.log('btn ' + {active: isActive})
```

</div>

<!-- 
[open] 因為一元運運算子的加號，導致[title]
所以在進到 v-bind 之前物件就先被轉型為中括號裡面兩個 object的字串
陣列可以正確轉換是因為 JS array 可以處理簡單的表達式，因此先將三元運算式的結果取得 active 後才轉為字串
[click]
-->

---
layout: header-two-cols
---

<!-- ## 綁定資料結構差異 -->

::left::

## ❌ 字串拼接{.mb-4}

<!-- JS 先處理字串拼接，將物件或陣列轉為字串再傳給 Vue -->

```vue{*|0|2-4}
<button
  :class="'btn' + 
  [isActive ? 'active' : ''] + 
  {border: isActive}"
  @click="isActive = !isActive"
>
  字串拼接
</button>
```

::right::

<div duration-slow v-click="6">

<div mb-4>

## ✅ [樣式綁定](https://vuejs.org/guide/essentials/class-and-style.html)

</div>

```vue{1,3-4}{at:6}
<!-- 推薦：樣式綁定 -->
<button
  class="btn"
  :class="['outline', { active: isActive }]"
  @click="isActive = !isActive"
>
  樣式綁定
</button>
```

</div>

::bottom::

<div v-click="1">

#### 當條件複雜時，容易出現以下問題

</div>

<v-click at="2">

- 無法靈活{.mark}使用 Vue 的物件 / 陣列語法

</v-click>

<v-click at="4">

- 需要手動{.mark} 處理 class 加入/移除邏輯

</v-click>

<CurvedArrow x1="365" y1="380" x2="270" y2="200" curvature="2" color="#953" v-click="[3, 6]" />
<CurvedArrow x1="355" y1="410" x2="370" y2="180" curvature="2" color="#cb5636" v-click="[5, 6]" />

<!-- 
[open]不推薦字串拼接寫法是因為 
[click][title]
[click][text]像是物件被自動轉型為字串 `[object Object]` 中括號裡面兩個 object 導致樣式失效
[click][text]開發體驗比較不好
[click]建議就參考官方文件範例來設置樣式綁定
-->

---
layout: fact
transition: slide-left
---

# 樣式綁定推薦使用<span title-primary>物件</span>或<span title-primary>陣列</span>

能更清晰地表達 class 的判斷條件與結構類型

---
layout: quote
---

<style scoped>
.slidev-layout p {
  margin-top: .5rem;
  margin-bottom: .75rem;
}
</style>

<div grid="~ cols-1 gap-8">
<div>

## 物件語法

<v-click>

適合透過布林作為<mark>條件判斷</mark>來動態切換 class

</v-click>

<div duration-slow :class="[{'translate-y--7' : $clicks < 1}]">
```vue
<div :style="{ display: ['-webit-box', '-ms-flexbox', 'flex'] }">
  渲染瀏覽器支持的最後一個值
</div>
```
</div>

</div>

<div v-click="2">

### 陣列語法

<p v-click="3">適合<mark>組合多種</mark> class 來源（靜態字串、動態變數、物件）設置條件渲染</p>

<div duration-slow :class="[{'translate-y--7' : $clicks < 3}]">
```vue
<button :class="['btn', isActive ? 'red' : 'blue', { isOutline: border }]">
  陣列結合多種來源
</button>
```
</div>

</div>
</div>

---
layout: fact
transition: slide-up
---

# Q: 大家如何選擇 ref、reactive 綁定響應式資料{.text-4xl.duration-slow :class="$clicks < 1 ? 'translate-y-[3rem]' : ''"}

<div duration-slow delay-100 v-click="1">
  <span class="block">ref 是一般物件 → Primitive Type</span>
  <span v-click>reactive 是 Proxy 物件 → Object Type</span>
</div>

<!-- 
llyaL： [Mike 空檔的交流，尤雨溪淺談 ref 跟 reactive 的看法 !!!](https://youtu.be/e8Wlv4AGJjk?si=JdZB-cpM2M5_sD3h)
> reactive 是為了支援 Vue2 的寫法
-->

---
layout: quote
transition: slide-up
---

<ol duration-slow :class="[{'translate-x-[22rem] translate-y-20 scale-150' : $clicks < 1}]">
  <li>容易<mark>失去</mark>響應式，無法追蹤原來 object data</li>
  <li>pass by value <mark>重新賦值</mark> (解法：Object.assign)</li>
</ol>

<div duration-slow delay-200 v-click="1">
```vue
<script setup>
  import { ref } from 'vue'
  const count = ref(0)
  const object = { id: ref(1) }
  const objectR = ref({id: 1})
</script>
```
</div v-click="1">

<!-- 想問大家平時使用 ref 會如何傳入物件 -->
<!-- llyaL： 直接傳入物件就可以了，會自動解構 -->

---
layout: fact
transition: slide-left
---

# Inline Styles

<!-- 分為單位處理、CSS variables -->

---
layout: quote
transition: slide-left
---

<div duration-slow :class="[{'translate-x-[.2rem] translate-y-20' : $clicks < 2}]">

# 單位處理{.mb-3}

````md magic-move {lines: true}
```vue
<p :style="{ fontSize: '20px', lineHeight: 2 }">小駝峰 lower camel case</p>
<p :style="{ 'font-size': 20 + 'px' }">烤肉串 kebab-cased</p>
```

```vue
<p :style="{ fontSize: '40' }">小駝峰 lower camel case</p>
```
````

</div>

<p class="text-5" v-click style="margin-top: 2rem; margin-bottom: 4px;">
CSS 屬性中以<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/length" title-primary target="_blank">長度</a>為值，必須指定單位 (例如：px、%、em)，否則該值會被視為<mark>無效</mark>
</p>

<v-clicks>

- width{.text-5}
- font-size{.text-5}
- margin{.text-5}

</v-clicks>


<!-- 
v-bind 支援使用小駝峰以及烤肉串方式來設置 class first_name
分別演示了兩種單位的寫法，直接撰寫在字串上以及透過字串拼接的方式
-->

---
layout: sfc
example: inline
transition: slide-up
---

## 若缺少單位瀏覽器將忽略該屬性，樣式<mark>不會生效</mark>

---

<div duration-slow :class="[{'scale-150 translate-y-55 translate-x-[30rem]' : $clicks < 1}]">

# CSS variables{.mb-3}

</div>

<div grid="~ cols-2 gap-5" m="t-5 b-4xl">

<div delay-200 duration-slow v-click>
  <h3>靜態變數</h3>
  <ul>
    <li>定義全域樣式 <code>:root</code> 設置靜態 CSS 變數</li>
  </ul>

```vue{3,7}
<style scoped>
:root {
  --gap: 1rem;
}

.wrapper {
  padding: var(--gap);
}
</>
```

</div>

<div v-click="2">
  <h3>動態變數</h3>
  <ul>
    <li>使用 <code>:style</code> 定義 CSS 變數值</li>
    <li>搭配 <code>ref</code> 響應式做為動態變數</li>
  </ul>

```ts {1,4,10}
const spacing = ref(1)

<div class="wrapper" 
  :style="{ '--gap': `${spacing}rem` }">
  <button @click="spacing++">增加間距（目前：{{ spacing }}rem）</button>
</div>

<style scoped>
.wrapper {
  padding: var(--gap);
}
</style>
```

</div>

</div>

---
layout: fact
transition: slide-up
---

<div duration-slow :class="[{'translate-y-10' : $clicks < 1}]">

## Q：`<style scoped>` 如何帶入動態變數

</div>

<v-click>

[v-bind() in CSS](https://vuejs.org/api/sfc-css-features.html#v-bind-in-css)

</v-click>

---
layout: fact
transition: slide-left
---

# 樣式合併

<!-- 會分為兩個部分，class 合併順序、CSS scoped -->

---
transition: slide-left
---

## class 合併順序

<div m="t-5">同時使用靜態的 class 與動態的 :class 時，會遵循<mark font-bold>後面覆蓋前面</mark>的原則</div>

- 靜態 class 永遠在前
- 動態綁定的 :class 永遠在後

<v-click>

```vue
<!-- ❌ 錯誤寫法：active 提早出現，可能被 btn 覆蓋 -->
<button :class="{ active: isActive }" class="btn" >
  "active btn"
</button>

<!-- ✅ 正確寫法：btn 在前、active 在後，覆蓋邏輯正確 -->
<button class="btn" :class="{ active: isActive }">
  "btn active"
</button>
```

</v-click>

---
layout: two-cols-header
layoutClass: grid-rows-[max-content_1fr] gap-6
transition: slide-up
---

## Component 樣式合併規則

::left::

<v-clicks>

### 元件根節點 class 自動合併

- 父元件傳入{.mark} class 優先權較高
- 會自動合併到子元件的根元素上

````md magic-move
```vue
// MyButton.vue
<template>
  <button class="btn">點我</button>
</template>

// 父元件
<MyButton class="active" />
```
```vue
<button class="btn active">點我</button>
```
````
</v-clicks>

::right::

<v-clicks>

### 元件根節點 class 自動合併

- 子元件<mark>不是根節點</mark>
- 需要 `$attrs` 手動綁定 class

````md magic-move
```vue
// MyButton.vue
<template>
  <div>
    <button class="btn"><slot /></button>
  </div>
</template>

// 父元件
<MyButton class="active">點我</MyButton>
```

```vue
<button class="btn" :class="$attrs.class">
  <slot />
</button>
```
````
</v-clicks>

---
layout: quote
transition: slide-left
---

## `<style>` vs. `<style scoped>` CSS scoped

<p m="t-8xl" />

| **類型** | **作用域** | **使用情境** | 
|---|---|---|
| `<style>` | 全域樣式 | 共用樣式、變數定義（:root） | 
| `<style scoped>` | 區域樣式，只作用當前元件內 | 元件私有樣式，避免影響其他元件 | 

---

<h2 mb-1 duration-slow :class="[{'translate-y-55' : $clicks < 1}]"> 編譯階段會自動將 scoped 樣式在 html、css 加上 <mark>data attribute</mark></h2>

- 為了將樣式作用範圍限制在當前元件內{.text-xl.transition.delay-300.mb-2.line-height-[3rem] v-click}

<img src="/css-scoped.png" v-click />

---
layout: fact
transition: slide-left
---

# 三個突破 scoped 的偽類

---
layout: quote
transition: slide-left
---

## Deep Selector{.mb-1}

- 用於穿透 `<style scoped>` 的限制，讓父層樣式能影響子元件或更深層結構

```vue
<style scoped>
:deep(.btn-red) {
  color: red;
}
</style>
```

---
layout: quote
transition: slide-left
---

| **寫法** | **適用版本** | **SCSS 支援** | **建議使用狀態** | 
|---|---|---|---|
| :deep() | Vue 3 | ✅ 支援 | ✅ Vue 3 偽類寫法 | 
| ::v-deep | Vue 2 / 3 | ✅ 支援 | ✅ 推薦用於所有版本 | 
| \>>> | Vue 2（非 pre-processor） | ❌ 不支援 | ⚠️ 過時，不推薦 | 
| /deep/ | Vue 2 | ❌ 不支援 | ❌ 已棄用 | 

---
layout: quote
transition: slide-left
---

## Global Selectors{.mb-1}

- 在 `<style scoped>` 中使用 `:global`，可以定義不受作用域限制的樣式（如 Reset 樣式、HTML 元素）

```vue
<style scoped>
:global(h3) {
  font-size: 36px;
}

.wrapper {
  padding: var(--gap);
}
</style>
```

---
layout: quote
---

## Slotted Selectors{.mb-1}

- `:slotted` 用於讓插槽 `<slot />` 傳入的內容，也能受當前元件的 `<style scoped>` 影響

```vue
<style scoped>
:slotted(h2) {
  color: red;
}
</style>
```

---
layout: fact
---

<div duration-slow :class="[{'translate-y-5' : $clicks < 1}]">

## Q：[Child Component Root Elements](https://vuejs.org/api/sfc-css-features.html#scoped-css)

</div>

[對於子元件根部的 CSS，父元件 CSS 會優先於子元件的 CSS](https://ithelp.ithome.com.tw/articles/10266005){v-click:1}

---
layout: center
---

<v-drag pos="418,239,154,70">

謝謝{.text-7xl}

</v-drag>