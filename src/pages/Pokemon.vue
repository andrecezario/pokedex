<template>
  <div v-if="pokemon && pokemon.types.length">
    <div
      class="toolbar row justify-between q-pa-md q-pt-xl"
      :style="`background: ${stylesTypes[pokemon.types[0].type.name].color}`"
    >
      <q-btn
        dense
        rounded
        no-caps
        outline
        size="md"
        icon="home"
        color="dark"
        @click="home"
        class="btn-home q-ma-md q-px-md"
        :label="$q.screen.lt.sm ? '' : 'Página Inicial'"
      />
      <div class="col-1 row items-center">
        <q-btn
          flat
          round
          color="text-dark"
          icon="chevron_left"
          @click="backPokemon"
          v-if="Number(id) > 1"
          :size="$q.screen.lt.sm ? 'md' : 'xl'"
        />
      </div>
      <div class="col">
        <div
          :class="$q.screen.lt.sm ? 'column' : 'flex'"
          class="justify-center items-center content-center"
        >
          <q-img
            spinner-color="secondary"
            :class="$q.screen.lt.sm ? 'mobile-img' : 'desktop-img'"
            :src="pokemon.sprites.other['home'].front_default"
          />
          <div :class="$q.screen.lt.sm ? 'q-pa-md' : 'q-pa-lg'">
            <div
              class="text-h5 text-grey-8 text-bold"
              :class="$q.screen.lt.sm ? 'text-subtitle1' : 'text-h3'"
            >
              #{{ id }}
            </div>
            <div
              class="text-h3 text-capitalize text-bold text-dark"
              :class="
                $q.screen.lt.sm
                  ? 'text-h5 text-center q-mb-sm'
                  : 'text-h3 q-my-md'
              "
            >
              {{ pokemon.name }}
            </div>
            <div
              style="max-width: 248px"
              class="row rounded-borders bg-grey-1 q-pa-xs"
            >
              <div
                v-for="item in pokemon.types"
                :key="item.name"
                class="row items-center rounded-borders q-pa-xs q-mr-sm"
                :style="`background: ${stylesTypes[item.type.name].color}`"
              >
                <q-icon
                  class="q-px-xs"
                  style="widht: 16px; height: 16px"
                  :name="`img:${stylesTypes[item.type.name].icon}`"
                />
                <span
                  class="text-capitalize text-white text-bold q-pl-xs q-pr-sm"
                  >{{ item.type.name }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-1 row items-center justify-end">
        <q-btn
          flat
          round
          color="text-dark"
          icon="chevron_right"
          @click="nextPokemon"
          v-if="Number(id) < 898"
          :size="$q.screen.lt.sm ? 'md' : 'xl'"
        />
      </div>
    </div>
    <q-tabs
      no-caps
      inline-label
      v-model="tab"
      switch-indicator
      active-color="white"
      class="tabs bg-dark text-grey-5 shadow-2"
      :style="`height: ${$q.screen.lt.sm ? '48px' : '64px'}`"
    >
      <q-tab name="games" icon="sports_esports" label="Jogos" />
      <q-tab name="cities" icon="place" label="Locais" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel
        name="games"
        :class="$q.screen.lt.sm ? 'row q-pa-lg' : 'row q-pa-xl'"
      >
        <div
          class="col-12 text-bold q-mb-md text-dark"
          :class="$q.screen.lt.sm ? 'text-h6' : 'text-h5'"
        >
          Games
        </div>
        <div
          v-for="game in games"
          :key="game.version.name"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <q-item>
            <q-item-section avatar>
              <q-icon class="text-red-7" size="md" name="catching_pokemon" />
            </q-item-section>
            <q-item-section
              class="text-capitalize text-grey-9"
              :class="$q.screen.lt.sm ? 'text-subtitle2' : 'text-subtitle1'"
              >Pokémon {{ game.version.name }}</q-item-section
            >
          </q-item>
        </div>

        <not-found-item
          v-if="!games.length"
          text="Não foram encontrados games para este pokémon."
        />
      </q-tab-panel>

      <q-tab-panel
        name="cities"
        :class="$q.screen.lt.sm ? 'row q-pa-lg' : 'row q-pa-xl'"
      >
        <div
          class="col-12 text-h5 text-bold q-mb-md text-dark"
          :class="$q.screen.lt.sm ? 'text-h6' : 'text-h5'"
        >
          Locais
        </div>
        <div
          class="col-12 col-sm-6 col-md-4 col-lg-3"
          v-for="region in cities"
          :key="region.game_index"
        >
          <q-item>
            <q-item-section avatar>
              <q-icon class="text-blue-7" size="md" name="map" />
            </q-item-section>
            <q-item-section
              class="text-capitalize text-grey-9"
              :class="$q.screen.lt.sm ? 'text-subtitle2' : 'text-subtitle1'"
              >{{ region.location_area.name }}</q-item-section
            >
          </q-item>
        </div>

        <not-found-item
          v-if="!cities.length"
          text="Não foram encontrados locais para este pokémon."
        />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ApiService from "../services/api.service";
import NotFoundItem from "../components/NotFoundItem.vue";
import StylePokemonService from "../services/style.pokemon.service";

export default defineComponent({
  name: "Pokedex",
  components: { NotFoundItem },
  data() {
    return {
      id: "",
      tab: "games",
      pokemon: {
        id: "",
        name: "",
        types: [],
        sprites: { other: "" },
      },
      cities: [],
      games: [],
      stylesTypes: {},
    };
  },
  async created() {
    this.id = this.$route.params.id;
    this.getData();
    this.stylesTypes = StylePokemonService.get();
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    // Carrega o pokémon próximo da lista
    async nextPokemon() {
      this.id = Number(this.id) + 1;
      const query = { id: this.id };
      this.$router.push({ params: query });
      this.getData();
    },
    // Vai o pokémon anterior da lista
    async backPokemon() {
      this.id = Number(this.id) - 1;
      const query = { id: this.id };
      this.$router.push({ params: query });
      this.getData();
    },
    // Carrega informações do pokemon, games e locais
    async getData() {
      const resourcePokemon = await ApiService.get(
        `/pokemon/${this.id}`
      );

      if (resourcePokemon.data) {
        this.pokemon = resourcePokemon.data;
        this.games = resourcePokemon.data.game_indices;
        const resourceCities = await ApiService.get(
          `/pokemon/${this.id}/encounters`
        );
        if (resourceCities.data) {
          this.cities = resourceCities.data;
        }
      }
    },
  },
});
</script>

<style scoped>
.toolbar {
  z-index: 0;
  position: relative;
  padding-bottom: 84px;
}
.toolbar::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  content: "";
  z-index: -1;
  opacity: 0.75;
  position: absolute;
  background: white;
}
.tabs {
  margin-top: -64px;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
}
.btn-home {
  top: 0;
  left: 0;
  position: absolute;
  font-size: 16px !important;
}
.mobile-img {
  height: 150px;
  max-width: 150px;
}
.desktop-img {
  height: 300px;
  max-width: 300px;
}
</style>
