<template>
  <div
    ref="containerRef"
    style="position: absolute; inset: 0"
  >
    <canvas
      ref="canvasRef"
      style="display: block; width: 100%; height: 100%"
    />
  </div>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core' // 强烈推荐，用于简洁的暗黑模式检测
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'

// 1. Props (与之前相同)
interface DottedGlowBackgroundProps {
  gap?: number;
  radius?: number;
  color?: string;
  darkColor?: string;
  glowColor?: string;
  darkGlowColor?: string;
  colorLightVar?: string;
  colorDarkVar?: string;
  glowColorLightVar?: string;
  glowColorDarkVar?: string;
  opacity?: number;
  backgroundOpacity?: number;
  speedMin?: number;
  speedMax?: number;
  speedScale?: number;
  animate?: boolean;
}

const props = withDefaults(defineProps<DottedGlowBackgroundProps>(), {
  gap: 12,
  radius: 2,
  color: 'rgba(0,0,0,0.7)',
  glowColor: 'rgba(0, 170, 255, 0.85)',
  opacity: 0.6,
  backgroundOpacity: 0,
  speedMin: 0.4,
  speedMax: 1.3,
  speedScale: 1,
  animate: true
})

// 2. DOM Refs (标准 Vue 方式)
const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

// 3. 辅助函数 (CSS 变量)
const resolveCssVariable = (
  el: Element,
  variableName?: string
): string | null => {
  if (variableName == null) return null
  const normalized = variableName.startsWith('--')
    ? variableName
    : `--${variableName}`
  const fromEl = getComputedStyle(el as Element)
    .getPropertyValue(normalized)
    .trim()
  if (fromEl) return fromEl
  const root = document.documentElement
  const fromRoot = getComputedStyle(root).getPropertyValue(normalized).trim()
  return fromRoot || null
}

// 4. 响应式颜色 (使用 VueUse 和 Computed)
// useDark 会响应式地跟踪 <html class="dark">
const isDark = useDark({ attribute: 'class' })

const resolvedColor = computed(() => {
  const container = containerRef.value ?? document.documentElement
  if (isDark.value) {
    const varDot = resolveCssVariable(container, props.colorDarkVar)
    return varDot ?? props.darkColor ?? props.color
  } else {
    const varDot = resolveCssVariable(container, props.colorLightVar)
    return varDot ?? props.color
  }
})

const resolvedGlowColor = computed(() => {
  const container = containerRef.value ?? document.documentElement
  if (isDark.value) {
    const varGlow = resolveCssVariable(container, props.glowColorDarkVar)
    return varGlow ?? props.darkGlowColor ?? props.glowColor
  } else {
    const varGlow = resolveCssVariable(container, props.glowColorLightVar)
    return varGlow ?? props.glowColor
  }
})

interface Dot { x: number; y: number; phase: number; speed: number }
const dots = ref<Dot[]>([])

// 封装的点阵生成逻辑
const regenDots = (width: number, height: number) => {
  const newDots: Dot[] = []
  const { gap, speedMin, speedMax } = props // 总是读取最新的 props
  const cols = Math.ceil(width / gap) + 2
  const rows = Math.ceil(height / gap) + 2
  const min = Math.min(speedMin, speedMax)
  const max = Math.max(speedMin, speedMax)

  for (let i = -1; i < cols; i++) {
    for (let j = -1; j < rows; j++) {
      const x = i * gap + (j % 2 === 0 ? 0 : gap * 0.5)
      const y = j * gap
      const phase = Math.random() * Math.PI * 2
      const span = Math.max(max - min, 0)
      const speed = min + Math.random() * span
      newDots.push({ x, y, phase, speed })
    }
  }
  dots.value = newDots
}

// 用于清理的句柄
let stopMainLoop: () => void = () => { /* empty */ }

onMounted(() => {
  const canvasEl = canvasRef.value
  const containerEl = containerRef.value
  if (canvasEl == null || containerEl == null) return

  const ctx = canvasEl.getContext('2d')
  if (!ctx) return

  let raf = 0
  let stopped = false

  // 渲染循环
  const draw = (now: number) => {
    if (stopped) return

    // 在 draw 循环中直接读取响应式数据
    const { width, height } = containerEl.getBoundingClientRect()
    const { opacity, backgroundOpacity, speedScale, radius, animate } = props
    const color = resolvedColor.value
    const glowColor = resolvedGlowColor.value
    const currentDots = dots.value

    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
    ctx.globalAlpha = opacity

    // 绘制背景
    if (backgroundOpacity > 0) {
      const grad = ctx.createRadialGradient(
        width * 0.5, height * 0.4, Math.min(width, height) * 0.1,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.7
      )
      grad.addColorStop(0, 'rgba(0,0,0,0)')
      grad.addColorStop(1, `rgba(0,0,0,${Math.min(Math.max(backgroundOpacity, 0), 1)})`)
      ctx.fillStyle = grad as unknown as CanvasGradient
      ctx.fillRect(0, 0, width, height)
    }

    ctx.save()
    ctx.fillStyle = color

    // 绘制点
    const time = (now / 1000) * Math.max(speedScale, 0)

    for (const d of currentDots) {
      const mod = (time * d.speed + d.phase) % 2
      const lin = mod < 1 ? mod : 2 - mod
      const a = 0.25 + 0.55 * lin

      if (a > 0.6) {
        const glow = (a - 0.6) / 0.4
        ctx.shadowColor = glowColor // 使用 computed 值
        ctx.shadowBlur = 6 * glow
      } else {
        ctx.shadowColor = 'transparent'
        ctx.shadowBlur = 0
      }

      ctx.globalAlpha = a * opacity
      ctx.beginPath()
      ctx.arc(d.x, d.y, radius, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()

    if (animate) raf = requestAnimationFrame(draw)
  }

  // 启动循环
  raf = requestAnimationFrame(draw)

  const dpr = Math.max(1, window.devicePixelRatio || 1)

  // 调整大小的逻辑
  const resize = () => {
    const { width, height } = containerEl.getBoundingClientRect()
    canvasEl.width = Math.max(1, Math.floor(width * dpr))
    canvasEl.height = Math.max(1, Math.floor(height * dpr))
    canvasEl.style.width = `${Math.floor(width)}px`
    canvasEl.style.height = `${Math.floor(height)}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    // 关键：调整大小时重新生成点阵
    regenDots(width, height)
    raf = requestAnimationFrame(draw)
  }

  const ro = new ResizeObserver(resize)
  ro.observe(containerEl)
  resize() // 初始调整大小并生成点阵

  // 定义清理函数
  stopMainLoop = () => {
    stopped = true
    cancelAnimationFrame(raf)
    ro.disconnect()
  }
})

// 6.  granular watch for dot regeneration
// 仅在需要重新计算点阵的 prop 变化时才触发
watch(() => [props.gap, props.speedMin, props.speedMax], () => {
  if (containerRef.value) {
    // 重新计算点阵
    const { width, height } = containerRef.value.getBoundingClientRect()
    regenDots(width, height)
  }
})

// 7. Cleanup
onUnmounted(() => {
  stopMainLoop()
})
</script>
