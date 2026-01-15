# Scroll Tabs

Scrollable tabs component. Clicking on a tab smoothly scrolls to the corresponding content area, and scrolling the content area automatically updates the selected tab.

## Installation

```bash
npx draft-cli vue add scroll-tabs
```

## Usage

### Basic Usage

<div class="example-block">
  <DraftScrollTabsDemo />
</div>

Place `ScrollTabsList` at the top (can use `sticky` positioning), and place content inside `ScrollTabsContainer`.

```vue
<script setup lang="ts">
import {
  ScrollTabsContainer,
  ScrollTabsContent,
  ScrollTabsIndicator,
  ScrollTabsList,
  ScrollTabsRoot,
  ScrollTabsTrigger,
} from '@draft-ui/vue'
</script>

<template>
  <ScrollTabsRoot default-value="account" class="min-h-full flex flex-col relative">
    <ScrollTabsList class="rounded-none">
      <ScrollTabsIndicator class="bg-gray-300 dark:bg-zinc-800" />
      <ScrollTabsTrigger value="account">
        Account
      </ScrollTabsTrigger>
      <ScrollTabsTrigger value="password">
        Password
      </ScrollTabsTrigger>
      <ScrollTabsTrigger value="notifications">
        Notifications
      </ScrollTabsTrigger>
    </ScrollTabsList>

    <ScrollTabsContainer class="h-[400px] p-6 space-y-12 overflow-y-auto border">
      <ScrollTabsContent value="account" class="space-y-4 scroll-mt-20">
        <h3 class="text-xl font-semibold">
          Account
        </h3>
        <div class="h-64 rounded-xl border-2 border-dashed border-gray-200 dark:border-zinc-800 flex items-center justify-center bg-gray-50/50 dark:bg-zinc-900/50">
          <span class="text-gray-400">Account Settings Form</span>
        </div>
      </ScrollTabsContent>

      <ScrollTabsContent value="password" class="space-y-4 scroll-mt-20">
        <h3 class="text-xl font-semibold">
          Password
        </h3>
        <div class="h-64 rounded-xl border-2 border-dashed border-gray-200 dark:border-zinc-800 flex items-center justify-center bg-gray-50/50 dark:bg-zinc-900/50">
          <span class="text-gray-400">Password Change Form</span>
        </div>
      </ScrollTabsContent>

      <ScrollTabsContent value="notifications" class="space-y-4 scroll-mt-20">
        <h3 class="text-xl font-semibold">
          Notifications
        </h3>
        <div class="h-64 rounded-xl border-2 border-dashed border-gray-200 dark:border-zinc-800 flex items-center justify-center bg-gray-50/50 dark:bg-zinc-900/50">
          <span class="text-gray-400">Notification Preferences</span>
        </div>
      </ScrollTabsContent>
    </ScrollTabsContainer>
  </ScrollTabsRoot>
</template>
```

## API

### ScrollTabsRoot

The root component that provides context.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultValue` | `string` | - | The default selected tab value |
| `offset` | `number` | `16` | Top offset in pixels when scrolling to target |

### ScrollTabsList

Tab list container, contains triggers and indicator.

### ScrollTabsTrigger

Tab trigger button.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | - | Unique identifier for the tab, corresponds to `ScrollTabsContent` value |
| `class` | `string` | - | Custom class name |

### ScrollTabsIndicator

Active tab indicator (background slider). Must be placed inside `ScrollTabsList`.

### ScrollTabsContainer

Content area container, used for scroll position detection.

### ScrollTabsContent

Specific content area.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | - | Content area identifier, corresponds to `ScrollTabsTrigger` value |
