<template>
    <v-container class="bg-surface-variant">
    <v-row>
      <v-col cols="3" v-for="idx in howManyCards">
        <card
          :idx="idx-1"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn cols="2"> トライ回数: {{ count }} &lt; {{ howManyCards * 3 / 2 }}</v-btn>
        <v-btn cols="2"> 作ったペア数: {{ pairs }} </v-btn>
        <v-btn cols="2"> 残りのペア数: {{ ((howManyCards / 2) - pairs) }} </v-btn>
        <!-- <v-btn to="/game"> <input type="number" v-model.number="howManyCards" @change="manager(howManyCards)"/> 枚でゲームを始める </v-btn> -->
        <v-btn cols="2" to="/"> 枚数を変える / 戻る  </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  computed: {
    count() {
      return this.$store.getters['game/count']
    },
    pairs() {
      const flg = this.$store.getters['game/flg']
      let filter = flg.filter((num) => num === 2)
      return (filter.length) / 2
    },
    howManyCards() {
      return this.$store.getters['game/howManyCards']
    },
  },
  // method: {
  //   manager() {
  //     this.$store.dispatch('game/chNum', { howManyCards: this.howManyCards})
  //   }
  // },
  async created() {
    this.$store.dispatch('game/initializer')
  },
}
</script>