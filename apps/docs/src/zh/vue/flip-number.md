# Flip Number

一个经典的数字或字符翻转动画组件。

## 安装

```bash
npx draft-vue add flip-countdown
```

## 使用

### 基础用法

<div class="example-block">
  <DraftFlipNumber value="5" class="size-10" />
</div>

```vue
<script setup>
import { FlipNumber } from '@draft-ui/vue'
</script>

<template>
  <FlipNumber value="5" class="size-10" />
</template>
```

## 示例

### 倒计时

组合多个 `FlipNumber` 组件创建倒计时。

<div class="example-block">
  <DraftFlipCountdown :time="Date.now() + 1000 * 60 * 60 * 24" />
</div>

> 此示例使用 `FlipCountdown` 组件，它由多个 `FlipNumber` 组件组成。

## API

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `value` | `string` | 必填 | 要显示的字符或数字。 |
