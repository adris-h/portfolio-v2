<script setup lang="ts">

  const cols = ref(0)
  const rows = ref(0)

  onMounted(() => {
    cols.value = Math.ceil(window.innerWidth / 64)
    rows.value = Math.ceil(window.innerHeight / 64)
  })


</script>
<template>
  <div class="main-layout w-full h-[100vh] bg-background relative overflow-hidden ">
    <NavBar />
    <div
        class="w-full h-full absolute top-0 left-0 grid border-t border-l z-0 border-faint"
        :style="{
        gridTemplateColumns: `repeat(${cols}, 6rem)`,
        gridTemplateRows: `repeat(${rows}, 6rem)`,
      }"
    >
      <div
          v-for="i in cols * rows"
          :key="i"
          class="border-r border-b border-2 border-faint w-full h-full"
      />
    </div>
    <slot  />
  </div>
</template>

