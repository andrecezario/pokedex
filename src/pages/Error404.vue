<template>
  <div
    class="fullscreen bg-dark text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Página não encontrada...</div>

      <q-btn
        to="/"
        no-caps
        unelevated
        color="white"
        class="q-mt-xl"
        label="Ir para Home"
        text-color="grey-9"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Error404",
});
</script>
