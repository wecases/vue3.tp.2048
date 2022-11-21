<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Core from './plugins/core'
const main = ref<HTMLElement>()
const matrix = ref<rowNum[]>([])
const gameOver = ref(false)
let res: resType = { arr: [], over: false }

const core = new Core()

onMounted(() => {
  res = core.init()
  matrix.value = res.arr
})

const handleMainKeyDown = (e: KeyboardEvent) => {
  if (
    e.key !== 'ArrowUp' &&
    e.key !== 'ArrowDown' &&
    e.key !== 'ArrowLeft' &&
    e.key !== 'ArrowRight'
  )
    return

  if (gameOver.value) return

  switch (e.key) {
    case 'ArrowUp':
      res = core.move_up()
      break
    case 'ArrowDown':
      res = core.move_down()
      break
    case 'ArrowLeft':
      res = core.move_left()
      break
    case 'ArrowRight':
      res = core.move_right()
      break
    default:
      break
  }
  matrix.value = [...res.arr]
  gameOver.value = res.over!
}

const bg = (item: num) => {
  switch (item) {
    case 2:
      return 'bg-2'
    case 4:
      return 'bg-4'
    case 8:
      return 'bg-8'
    case 16:
      return 'bg-16'
    case 32:
      return 'bg-32'
    case 64:
      return 'bg-64'
    case 128:
      return 'bg-128'
    case 256:
      return 'bg-256'
    case 512:
      return 'bg-512'
    case 1024:
      return 'bg-1024'
    case 2048:
      return 'bg-2048'
    default:
      return 'bg-0'
  }
}
</script>

<template>
  <div class="box">
    <div class="main" ref="main" tabindex="1" @keydown="handleMainKeyDown">
      <div class="item-row" v-for="(item, index) in matrix" :key="index">
        <template v-for="row in item">
          <div class="item" :class="bg(row)">
            {{ row }}
          </div>
        </template>
      </div>
    </div>
    <div class="game-over" v-if="gameOver">Game Over</div>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
.main {
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  border: 10px solid #bbada0;
  background: #000;
  user-select: none;
  box-sizing: border-box;
}
.item-row {
  display: flex;
  width: 400px;
  line-height: 100px;
  text-align: center;
}
.item {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.bg-0 {
  background-color: #ccc0b3;
}
.bg-2 {
  background-color: #eee4da;
}
.bg-4 {
  background-color: #ede0c8;
}
.bg-8 {
  background-color: #f2b179;
}
.bg-16 {
  background-color: #f59563;
}
.bg-32 {
  background-color: #f67c5f;
}
.bg-64 {
  background-color: #f65e3b;
}
.bg-128 {
  background-color: #edcf72;
}
.bg-256 {
  background-color: #edcc61;
}
.bg-512 {
  background-color: #9c0;
}
.bg-1024 {
  background-color: #33b5e5;
}
.bg-2048 {
  background-color: #09c;
}
.game-over {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 50px;
  text-align: center;
  line-height: 100vh;
}
</style>
