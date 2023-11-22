<template>
  <div class="q-pa-md q-pt-lg">
    <div class="col-12 row justify-center">
      <q-input
        rounded
        outlined
        debounce="300"
        v-model="query"
        color="secondary"
        class="col-12 col-sm-6 col-md-4 q-mb-lg"
        input-class="q-mx-md text-dark text-h6"
      >
        <template v-slot:append>
          <q-icon v-if="query === ''" name="search" color="secondary" />
          <q-icon
            v-else
            name="clear"
            color="secondary"
            @click="query = ''"
            class="cursor-pointer"
          />
        </template>
      </q-input>
    </div>
    <q-infinite-scroll :offset="500" @load="loadPokemons" v-if="!query.length">
      <div class="row q-gutter-lg justify-center items-center">
        <div
          :key="item.name"
          v-for="item in data"
          class="row col-12 col-sm-4 col-md-3 col-lg-2 q-pt-xl q-pb-sm justify-center"
        >
          <card-pokemon
            :id="item.id"
            :name="item.name"
            :types="item.types"
            @click="goPokemon(item.id)"
            :background="types[item.types[0].type.name].color"
            :image="item.sprites.other['home'].front_default"
          />
        </div>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="secondary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
    <search-pokemon
      :types="types"
      :data="dataSearch"
      :action="goPokemon"
      v-if="query.length > 1"
    />
  </div>
</template>

<script>
import ApiService from "../services/api.service";
import CardPokemon from "../components/CardPokemon.vue";
import SearchPokemon from "../components/SearchPokemon.vue";
import StylePokemonService from "../services/style.pokemon.service";

const ITEMS_PAGE = 15;
const MAX_POKEMONS = 898;

export default {
  name: "Página Inicial",
  components: { CardPokemon, SearchPokemon },
  data() {
    return {
      types: {},
      data: [],
      dataSearch: [],
      query: "",
    };
  },
  created() {
    this.types = StylePokemonService.get();
  },
  watch: {
    query: function (newValue) {
      if (newValue.length > 1) {
        this.searchPokemon(newValue);
      } else if (!newValue) {
        this.query = "";
        this.data = [];
        this.dataSearch = [];
      }
    },
  },
  methods: {
    // Redireciona para a página de detalhes do pokémon
    goPokemon(id) {
      this.$router.push("/pokemon/" + id);
    },
    // Busca pokémon a partir de uma query com mais de 2 caracteres
    async searchPokemon(query) {
      const allPokemons = await ApiService.get(
        `/pokemon?limit=${MAX_POKEMONS}`
      );

      this.dataSearch = [];
      if (allPokemons.data.results) {
        for (const item of allPokemons.data.results) {
          const name = query.toLowerCase();
          var regex = new RegExp(name, "g");
          const match = item.name.match(regex);

          if (match) {
            const pokemon = await ApiService.get(`/pokemon/${item.name}`);

            if (pokemon.data) {
              this.dataSearch.push(pokemon.data);
            }
          }
        }
      }
    },
    // Carrega lista de pokémons (os 15 iniciais) e ao rolar o scroll carrega + 15
    async loadPokemons(index, done) {
      const listPokemons = await ApiService.get(
        `/pokemon?limit=${ITEMS_PAGE}&offset=${(index - 1) * ITEMS_PAGE}`
      );

      if (listPokemons.data) {
        if (listPokemons.data.results) {
          for (const item of listPokemons.data.results) {
            const pokemon = await ApiService.get(`/pokemon/${item.name}`);

            if (pokemon.data) {
              this.data.push(pokemon.data);
            }
          }
        }
        done();
      }
    },
  },
};
</script>
result
