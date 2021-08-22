<template>
  <div class="row items-center justify-center q-py-sm" style="width: 100%">
    <q-img src="../assets/psyduck.svg" width="150px" class="col-12 q-mb-md" />
    <div
      class="col-12 text-bold text-red-7 text-center"
      :class="$q.screen.lt.sm ? 'text-h6 q-pa-sm' : 'text-h5 q-pa-md'"
    >
      Sem dados disponíveis :(
    </div>
    <div
      v-if="text"
      class="col-12 text-grey-8 text-center"
      :class="$q.screen.lt.sm ? 'text-subtitle2' : 'text-subtitle1'"
    >
      {{ text }}
    </div>
  </div>
</template>
<script>
export default {
  name: "CardPokemon",
  props: {
    text: {
      type: String,
      required: false,
    },
  },
};
</script>
