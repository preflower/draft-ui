# Star Rate

A star rating component with support for half stars and custom styling.

## Installation

```bash
npx draft-vue add star-rate
```

## Usage

### Basic

<div class="example-block">
  <DraftStarRate value="3.5" class="text-2xl text-yellow-500" />
</div>

```vue
<script setup>
import { StarRate } from '@draft-ui/vue'
</script>

<template>
  <StarRate value="3.5" class="text-2xl text-yellow-500" />
</template>
```

### Different Sizes

<div class="example-block flex-col gap-4">
  <DraftStarRate value="4" class="text-sm text-yellow-500" />
  <DraftStarRate value="4" class="text-base text-yellow-500" />
  <DraftStarRate value="4" class="text-2xl text-yellow-500" />
  <DraftStarRate value="4" class="text-4xl text-yellow-500" />
</div>

```vue
<template>
  <StarRate value="4" class="text-sm text-yellow-500" />
  <StarRate value="4" class="text-base text-yellow-500" />
  <StarRate value="4" class="text-2xl text-yellow-500" />
  <StarRate value="4" class="text-4xl text-yellow-500" />
</template>
```

### Different Colors

<div class="example-block flex-col gap-4">
  <DraftStarRate value="3.5" class="text-2xl text-yellow-500" />
  <DraftStarRate value="3.5" class="text-2xl text-orange-500" />
  <DraftStarRate value="3.5" class="text-2xl text-red-500" />
  <DraftStarRate value="3.5" class="text-2xl text-blue-500" />
</div>

```vue
<template>
  <StarRate value="3.5" class="text-2xl text-yellow-500" />
  <StarRate value="3.5" class="text-2xl text-orange-500" />
  <StarRate value="3.5" class="text-2xl text-red-500" />
  <StarRate value="3.5" class="text-2xl text-blue-500" />
</template>
```

## API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string \| number` | Required | The rating value (supports decimals for half stars). |
| `count` | `number` | `5` | Total number of stars to display. |
| `strokeWidth` | `number` | `1.5` | The stroke width of the star icons. |
