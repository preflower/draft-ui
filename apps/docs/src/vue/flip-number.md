# Flip Number

A classic flip animation component for numbers or characters.

## Installation

```bash
npx draft-vue add flip-countdown
```

## Usage

### Basic

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

## Examples

### Countdown

Combine multiple `FlipNumber` components to create a countdown.

<div class="example-block">
  <DraftFlipCountdown :time="Date.now() + 1000 * 60 * 60 * 24" />
</div>

> This example uses the `FlipCountdown` component which composes multiple `FlipNumber` components.

## API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | Required | The character or number to display. |
