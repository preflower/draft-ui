# Dotted Glow Background

An animated dotted background with glowing effects that supports dark mode.

## Installation

```bash
npx draft-cli vue add dotted-glow-background
```

## Usage

### Basic

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
      <!-- Your content here -->
    </div>
  </div>
</template>
```

You can customize colors, animation speed, and other properties via props.

## API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `gap` | `number` | `12` | Distance between dots in pixels. |
| `radius` | `number` | `2` | Radius of each dot in pixels. |
| `color` | `string` | `'rgba(0,0,0,0.7)'` | Base color of the dots in light mode. |
| `darkColor` | `string` | - | Base color of the dots in dark mode (falls back to `color`). |
| `glowColor` | `string` | `'rgba(0, 170, 255, 0.85)'` | Glow color in light mode. |
| `darkGlowColor` | `string` | - | Glow color in dark mode (falls back to `glowColor`). |
| `colorLightVar` | `string` | - | CSS variable name for light mode dot color. |
| `colorDarkVar` | `string` | - | CSS variable name for dark mode dot color. |
| `glowColorLightVar` | `string` | - | CSS variable name for light mode glow color. |
| `glowColorDarkVar` | `string` | - | CSS variable name for dark mode glow color. |
| `opacity` | `number` | `0.6` | Overall opacity of the canvas (0-1). |
| `backgroundOpacity` | `number` | `0` | Opacity of the radial gradient background (0-1). |
| `speedMin` | `number` | `0.4` | Minimum animation speed multiplier. |
| `speedMax` | `number` | `1.3` | Maximum animation speed multiplier. |
| `speedScale` | `number` | `1` | Global speed scale for all animations. |
| `animate` | `boolean` | `true` | Whether to animate the dots. |

## Notes

- The component uses `position: absolute; inset: 0` so it needs to be placed inside a positioned container.
- Content should be placed in a sibling element with `position: relative` and appropriate `z-index` to appear above the background.
- The component automatically adapts to dark mode when using `@vueuse/core`'s dark mode detection.
- Uses `ResizeObserver` to automatically adjust to container size changes.
