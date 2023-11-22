<template>
  <div
    class="row q-gutter-lg justify-center items-center"
    v-if="data.length > 0"
  >
    <div
      :key="item.name"
      v-for="item in data"
      class="row col-12 col-sm-4 col-md-3 col-lg-2 q-pt-xl q-pb-sm justify-center"
    >
      <card-pokemon
        :id="item.id"
        :name="item.name"
        :types="item.types"
        @click="() => action(item.id)"
        :background="types[item.types[0].type.name].color"
        :image="item.sprites.other['home'].front_default"
      />
    </div>
  </div>
  <not-found-item
    v-else
    text="Não foi encontrado nenhum pokémon com este nome"
  />
</template>

<script>
import CardPokemon from "./CardPokemon.vue";
import NotFoundItem from "../components/NotFoundItem.vue";

export default {
  name: "SearchPokemon",
  components: { CardPokemon, NotFoundItem },
  props: {
    data: [],
    types: {},
    action: {
      type: Function,
      required: true,
    },
  },
};
</script>
