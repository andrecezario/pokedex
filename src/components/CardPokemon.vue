<template>
  <q-card
    style="width: 280px"
    class="card rounded-borders"
    :style="`background: ${background}`"
  >
    <q-card-section class="row justify-center q-pb-xs">
      <q-img
        class="col"
        :src="image"
        style="height: 150px; max-width: 150px; margin-top: -64px"
      />
    </q-card-section>
    <q-card-section>
      <div class="col card-text rounded-borders q-pa-md">
        <div class="text-body2 text-grey-7 text-bold q-mb-xs">#{{ id }}</div>
        <div class="text-h6 text-capitalize text-bold text-grey-9 q-mb-xs">
          {{ name }}
        </div>
        <div class="row q-gutter-sm">
          <div
            :key="item[name]"
            v-for="item in types"
            class="row items-center rounded-borders q-pa-xs"
            :style="`background: ${stylesTypes[item.type.name].color}`"
          >
            <q-icon
              class="q-px-xs"
              :name="`img:${stylesTypes[item.type.name].icon}`"
              style="widht: 16px; height: 16px"
            />
            <span
              class="text-capitalize text-white text-bold q-pl-xs q-pr-sm"
              >{{ item.type.name }}</span
            >
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import StylePokemonService from "../services/style.pokemon.service";

export default {
  name: "CardPokemon",
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      required: true,
    },
    types: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      stylesTypes: {},
    };
  },
  created() {
    this.stylesTypes = StylePokemonService.get();
  },
  methods: {},
};
</script>
