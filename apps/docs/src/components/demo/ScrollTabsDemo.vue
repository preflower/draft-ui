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
  <div class="not-prose w-full">
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
  </div>
</template>
