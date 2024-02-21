<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="white"
        navigation
        padding
        arrows
        height="450px"
        class="bg-color text-white shadow-1 rounded-borders"
        :autoplay="autoplay"
      >
        <q-carousel-slide
          name="style"
          class="column no-wrap flex-center"
          img-src="src/assets/wallhaven-3lyzyv_1920x1200.png"
        >
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="tv"
          class="column no-wrap flex-center"
          img-src="src/assets/wallhaven-o5vyxl_1920x1200.png"
        >
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="layers"
          class="column no-wrap flex-center"
          img-src="src/assets/wallhaven-x6w3vl_1920x1200.png"
        >
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    return {
      slide: ref('style'),
      autoplay: ref(true),
      lorem:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.',
    };
  },
};
</script>
<style scoped>
.q-carousel-slide {
  opacity:100;

  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}
</style>
