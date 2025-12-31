# Dotted Glow Background

一个支持暗黑模式的动画点状背景组件，带有发光效果。

## 安装

```bash
npx draft-cli vue add dotted-glow-background
```

## 使用

### 基础用法

<div class="example-block" style="position: relative; height: 300px; border-radius: 8px; overflow: hidden;">
  <DraftDottedGlowBackground />
  <div style="position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; height: 100%;">
    <h2>Dotted Glow Background</h2>
  </div>
</div>

```vue
<script setup>
import { DottedGlowBackground } from '@draft-ui/vue'
</script>

<template>
  <div style="position: relative; height: 300px;">
    <DottedGlowBackground />
    <div style="position: relative; z-index: 1;">
      <!-- 你的内容 -->
    </div>
  </div>
</template>
```

你可以通过 props 自定义颜色、动画速度和其他属性。

## API

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `gap` | `number` | `12` | 点之间的距离（像素）。 |
| `radius` | `number` | `2` | 每个点的半径（像素）。 |
| `color` | `string` | `'rgba(0,0,0,0.7)'` | 亮色模式下点的基础颜色。 |
| `darkColor` | `string` | - | 暗黑模式下点的基础颜色（默认使用 `color`）。 |
| `glowColor` | `string` | `'rgba(0, 170, 255, 0.85)'` | 亮色模式下的发光颜色。 |
| `darkGlowColor` | `string` | - | 暗黑模式下的发光颜色（默认使用 `glowColor`）。 |
| `colorLightVar` | `string` | - | 亮色模式点颜色的 CSS 变量名。 |
| `colorDarkVar` | `string` | - | 暗黑模式点颜色的 CSS 变量名。 |
| `glowColorLightVar` | `string` | - | 亮色模式发光颜色的 CSS 变量名。 |
| `glowColorDarkVar` | `string` | - | 暗黑模式发光颜色的 CSS 变量名。 |
| `opacity` | `number` | `0.6` | 画布的整体透明度（0-1）。 |
| `backgroundOpacity` | `number` | `0` | 径向渐变背景的透明度（0-1）。 |
| `speedMin` | `number` | `0.4` | 最小动画速度倍数。 |
| `speedMax` | `number` | `1.3` | 最大动画速度倍数。 |
| `speedScale` | `number` | `1` | 全局速度缩放。 |
| `animate` | `boolean` | `true` | 是否启用动画。 |

## 注意事项

- 组件使用 `position: absolute; inset: 0`，因此需要放置在一个定位容器内。
- 内容应该放在一个兄弟元素中，并设置 `position: relative` 和适当的 `z-index` 以显示在背景之上。
- 组件会自动适配暗黑模式（使用 `@vueuse/core` 的暗黑模式检测）。
- 使用 `ResizeObserver` 自动适应容器大小变化。
