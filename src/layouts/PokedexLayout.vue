<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-dark toolbar">
      <q-toolbar class="row justify-center items-center q-px-xl q-py-md">
        <q-avatar>
          <q-icon
            name="catching_pokemon"
            :size="$q.screen.lt.sm ? 'md' : 'lg'"
          />
        </q-avatar>
        <div
          class="text-h4 q-ml-xs text-bold"
          :class="$q.screen.lt.sm ? 'text-h6' : 'text-h4'"
        >
          Pokédex
        </div>
      </q-toolbar>
    </q-header>
    <q-footer class="bg-dark footer">
      <q-toolbar></q-toolbar>
    </q-footer>
    <q-page-container>
      <router-view />
      <q-page-scroller
        position="bottom-right"
        :scroll-offset="150"
        :offset="[18, 18]"
      >
        <q-btn fab icon="keyboard_arrow_up" color="secondary" />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Pokedex",
});
</script>

<style scoped>
.toolbar {
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
}
.footer {
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
}
</style>
