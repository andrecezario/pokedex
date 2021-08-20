<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-grey-9" elevated>
      <q-toolbar class="row q-px-xl q-py-lg">
        <q-toolbar-title class="text-h4 text-bold text-white">
          Pokédex
        </q-toolbar-title>
        <q-input
          dark
          standout
          debounce="300"
          v-model="text"
          class="col-4"
          input-class="text-right"
        >
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="text = ''"
            />
          </template>
        </q-input>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Pokedex",
  data() {
    return {
      text: "",
    };
  },
});
</script>
