# Star Rate

一个可交互的星级评分组件。

## 安装

```bash
npx draft-cli vue add star-rate
```

## 使用

### 基础用法

<div class="example-block">
  <DraftStarRate :modelValue="3.5" />
</div>

```vue
<script setup>
import { ref } from 'vue'
import { StarRate } from '@draft-ui/vue'

const rating = ref(3.5)
</script>

<template>
  <StarRate v-model="rating" />
</template>
```

## API

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `modelValue` | `number` | `0` | 当前评分值。 |
| `max` | `number` | `5` | 最大星级数。 |
| `readonly` | `boolean` | `false` | 是否只读。 |

## 事件

| 事件名 | 参数 | 描述 |
| --- | --- | --- |
| `update:modelValue` | `(value: number)` | 评分值改变时触发。 |
