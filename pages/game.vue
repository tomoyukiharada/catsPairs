<template>
    <v-container class="bg-surface-variant">
    <v-row>
      <v-col cols="3" v-for="i, idx in cardNumbers">
        <card
          :idx="idx"
        />
      </v-col>
      <v-btn> Count: {{ count }} </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      cardNumbers: [1,2,3,4,5,6,7,8],
    }
  },
  computed: {
    count() {
      return this.$store.getters['game/count']
    },
  },
  async created() {
    this.$store.dispatch('game/initializer')
  },
}
</script>