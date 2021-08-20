<template>
  <div class="q-pa-md q-pt-xl">
    <q-infinite-scroll @load="carregaPokemons" :offset="0">
      <div class="row q-gutter-lg justify-center items-center">
        <div
          v-for="item in dados"
          :key="item.name"
          class="row col-12 col-sm-4 col-md-3 col-lg-2 q-pt-xl q-pb-sm justify-center"
        >
          <card-pokemon
            :id="item.id"
            :name="item.name"
            :image="item.sprites.other['official-artwork'].front_default"
            :background="types[item.types[0].type.name].color"
            :types="item.types"
            @click="exibePokemon(item.id)"
          />
        </div>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<script>
import ApiService from "../services/api.service";
import CardPokemon from "../components/CardPokemon.vue";
import StylePokemonService from "../services/style.pokemon.service";

export default {
  name: "Página Inicial",
  components: { CardPokemon },
  data() {
    return {
      types: {},
      dados: [],
    };
  },
  created() {
    this.types = StylePokemonService.get();
  },
  methods: {
    exibePokemon(id) {
      this.$router.push("/pokemon/" + id);
    },
    async carregaPokemons(index, done) {
      const retorno = await ApiService.get(
        `https://pokeapi.co/api/v2/pokemon?limit=15&offset=${(index - 1) * 15}`
      );

      if (retorno.data) {
        const listaPokemons = [];
        if (retorno.data.results) {
          for (const item of retorno.data.results) {
            const pokemon = await ApiService.get(item.url);

            if (pokemon.data) {
              this.dados.push(pokemon.data);
            }
          }
        }
        done();
      }
    },
  },
};
</script>

<style>
.card {
  cursor: pointer;
}
.card:before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  content: "";
  opacity: 0.75;
  position: absolute;
  background: white;
}
.card:hover {
  transform: scale(1.15);
}
.card-text {
  background: #fff;
}
</style>
