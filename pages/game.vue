<template>
    <v-container class="bg-surface-variant">
    <v-row>
      <v-col cols="3" v-for="i, idx in cardNumbers">
        <v-card @click="handler(idx)" :height="210" :width="140">
          {{ flg[idx] }}
        </v-card>
      </v-col>
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
    flg() {
      return this.$store.getters['game/flg']
    },
    // numBack() {
    //   return this.$store.getters['game/numBack']
    // },
    // numOpened() {
    //   return this.$store.getters['game/numOpened']
    // },
    cardPairs() {
      return this.$store.getters['game/cardPairs']
    }
  },
  methods: {
    handler(idx){      
      this.$store.dispatch('game/fripCard', { cardNumber: idx })
      // this.$store.dispatch('game/memory')
    },
  }
}
</script>
