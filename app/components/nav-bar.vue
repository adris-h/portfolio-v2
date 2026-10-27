<script setup lang="ts">
  const titleLink = "adris.dev"

  const currentTimeCZ = ref("")
  const menuOpen = ref(false);

  const links = [
    { to: '/work', label: 'Selected Work', z: 10, bg: 'bg-text-muted', bgHover: 'group-hover/menu:bg-text', rotate: "group-hover:rotate-[2deg]" },
    { to: '/contact', label: 'Contact', z: 9, bg: 'bg-text', bgHover: 'group-hover/menu:bg-text-muted', rotate: "group-hover:rotate-[-2deg]" },
  ]

  onMounted(() => {
    currentTimeCZ.value = new Date().toLocaleTimeString('en-US', { timeZone: 'Europe/Prague' })
  })

  const closing = ref(false)

  const toggleMenu = async () => {
    if (menuOpen.value) {
      closing.value = true
      await nextTick()
      menuOpen.value = false
      closing.value = false
    } else {
      menuOpen.value = true
    }
  }



  const dotCount = 20
  const middle = (dotCount - 1) / 2

  const dotSize = (i: number) => {
    const distance = Math.abs(i - middle)
    return 8 - distance
  }

  const mouseX = ref(0);
  const mouseY = ref(0);
  const offset = ref(0);

  function updateMouse(e: MouseEvent) {
    mouseX.value = e.clientX;
    mouseY.value = e.clientY;

  }

  const hoverOverTime = ref(false)
  const popupClosing = ref(false)

  const hidePopup = async () => {
    popupClosing.value = true   // step 1: flip the indexes
    await nextTick()            // step 2: let the page update
    hoverOverTime.value = false // step 3: now remove the popup
    popupClosing.value = false
  }

  onMounted(() => {
    window.addEventListener("mousemove", updateMouse);
    offset.value = 32;
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", updateMouse);
  });

</script>
<template>
  <nav class="fixed top-0 left-0 z-50 w-full">
    <div class="w-full relative bg-text text-background flex justify-between items-center px-navx">
      <!--LOGO LINK -->
      <NuxtLink class="cursor-pointer group text-xl w-1/3 flex justify-start" to="/">
      <span v-for="(char, index) in titleLink" :key="index" class="inline-block group-hover:-translate-x-2 group-hover:text-accent group-hover:scale-[1.1] duration-300 " :style="{ transitionDelay: `${index * 30}ms` }">
        {{ char }} <!-- EACH CHAR -->
      </span>
      </NuxtLink>

      <!-- HAMBURGER-->
      <div class="relative z-10 flex justify-center items-center w-full h-full bg-text text-background px-navx py-navy">
        <button
            class="relative w-8 aspect-square cursor-pointer animate-hamburger"
            @click="toggleMenu"
        >
        <span
            class="absolute left-0 top-1/2 w-full h-1 rounded-xl bg-background origin-center duration-300"
            :class="menuOpen ? '-translate-y-1/2 rotate-45' : '-translate-y-2'"
        />
          <span
              class="absolute left-0 top-1/2 w-full h-1 rounded-xl bg-background origin-center duration-300"
              :class="menuOpen ? '-translate-y-1/2 -rotate-45' : 'translate-y-1'"
          />
        </button>
      </div>

      <!-- MENU -->
      <div class="select-none absolute top-full left-0 w-full z-0 flex flex-col items-center">
        <div class=" group/menu flex flex-col justify-center items-center gap-0 text-2xl">
          <GSAPTransition group :hidden="{ yPercent: -200, opacity: 0.8, ease: 'expo.inOut'  }" :stagger="0.15" :duration=".8">
            <NuxtLink
                v-for="(link, idx) in (menuOpen ? links : [])"

                :key="link.to"
                :data-index="closing ? links.length - 1 - idx : idx"
                :to="link.to"
                class=" group relative text-background  w-96 flex justify-center pt-4 pb-6   rounded-lg"
                :class="[link.bg, link.bgHover]"
                :style="{ zIndex: link.z }"
                style="transition: 300ms background, 300ms color"
            >
              <span
                  class="group-hover:scale-[1.05]  duration-300"
                  :class="link.rotate"
              >
                {{ link.label }}
              </span>
              <span class="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-1">
                <span
                    v-for="(_, i) in dotCount"
                    :key="i"
                    class="rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform duration-300"

                    :style="{
                    width: `${dotSize(i)}px`,
                    height: `${dotSize(i)}px`,
                    transitionDelay: `${Math.abs(i - middle) * 25}ms`,
                  }"
                />
              </span>
            </NuxtLink>
          </GSAPTransition>
        </div>
      </div>

      <!-- TIME -->

      <NuxtLink
          class="flex gap-4 w-1/3 justify-end items-center cursor-pointer"
          @mouseenter="hoverOverTime = true"
          @mouseleave="hidePopup"
      >
        <span class="text-muted">my time</span>
        <span>{{currentTimeCZ}}</span>
      </NuxtLink>




      <div
          class="z-100 -translate-x-full flex flex-col"
          :style="{ position: 'fixed', top: `${mouseY + offset}px`, left: `${Math.max(0, mouseX + offset * 2)}px` }"
      >
        <GSAPTransition group  :hidden="{scale: 0.8, ease: 'back.out(2.5)'} " :stagger=".3" :duration=".3" >
         <span
             v-if="hoverOverTime"
             key="a"
             :data-index="0"
             class="px-2 whitespace-nowrap pointer-events-none bg-accent rounded-sm "
         >
            i reply within 24 hours (pinkie promise)
          </span>
          <span
              v-if="hoverOverTime"
              key="b"
              :data-index="popupClosing ? 0 : 1"

              class="px-2 whitespace-nowrap pointer-events-none w-fit bg-text-muted rounded-sm"
          >
            wsp
          </span>
        </GSAPTransition>
      </div>

    </div>
  </nav>
</template>


