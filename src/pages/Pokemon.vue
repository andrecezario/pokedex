<template>
  <div class="row justify-center q-pa-md">
    <div class="text-h6 text-capitalize text-bold text-grey-9 q-mb-xs">
      {{ pokemon.name }}
    </div>
  </div>
</template>

<script>
import ApiService from "../services/api.service";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Pokedex",
  data() {
    return {
      id: "",
      pokemon: {},
      cities: {},
      games: [],
    };
  },
  async created() {
    this.id = this.$route.params.id;
    this.getData();
  },
  methods: {
    async getData() {
      const resourcePokemon = await ApiService.get(
        `https://pokeapi.co/api/v2/pokemon/${this.id}`
      );

      if (resourcePokemon.data) {
        this.pokemon = resourcePokemon.data;
        this.games = resourcePokemon.data.game_indices;
        const resourceCities = await ApiService.get(
          `https://pokeapi.co/api/v2/pokemon/${this.id}/encounters`
        );
        if (resourceCities.data) {
          this.cities = resourceCities.data;
        }
      }
    },
  },
});
</script>
