<script setup lang="ts">
  definePageMeta({
    layout: 'default',
  })
</script>

<template>
  <div class="w-full relative z-10 flex justify-center items-center  h-[100vh] ">
      <div class="flex flex-col items-center justify-center  h-full w-full">
        <small v-gsap.parallax class="text-muted text-lg text-center">[aspiring web dev/designer]</small>
        <h1 v-gsap.parallax.faster class="text-7xl text-text">Adris Han</h1>
        <!--<h2 class="text-muted text-center">
          My name is Adriana Hanousková actually... <br>
          and I like UX/UI design.
        </h2>-->
      </div>
  </div>
</template>

<style scoped>

</style>