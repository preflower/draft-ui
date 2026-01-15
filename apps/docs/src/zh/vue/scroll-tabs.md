# Scroll Tabs

可滚动的标签页组件。点击标签页可平滑滚动到对应的内容区域，滚动内容区域也会自动更新选中的标签页。

## 安装

```bash
npx draft-cli vue add scroll-tabs
```

## 使用

### 基础用法

<div class="example-block">
  <DraftScrollTabsDemo />
</div>

将 `ScrollTabsList` 放在顶部（可以使用 `sticky` 定位），并将内容放在 `ScrollTabsContainer` 中。

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

根组件，提供上下文。

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `defaultValue` | `string` | - | 默认选中的标签页值 |
| `offset` | `number` | `16` | 滚动到目标位置时的顶部偏移量（像素） |

### ScrollTabsList

标签页列表容器，包含触发器和指示器。

### ScrollTabsTrigger

标签页触发器按钮。

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `value` | `string` | - | 标签页唯一标识符，对应 `ScrollTabsContent` 的 value |
| `class` | `string` | - | 自定义类名 |

### ScrollTabsIndicator

活动标签页指示器（背景滑块）。必须放置在 `ScrollTabsList` 内部。

### ScrollTabsContainer

内容区域容器，用于检测滚动位置。

### ScrollTabsContent

具体的内容区域。

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `value` | `string` | - | 内容区域标识符，对应 `ScrollTabsTrigger` 的 value |
