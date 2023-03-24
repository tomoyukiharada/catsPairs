<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-btn
        to="/game"
          >
            {{ howManyCards }} 枚でゲームを始める
      </v-btn>
      <p>
        input even value:
        <input type="number" v-model.number="howManyCards" @change="manager()"/>
      </p> 
      </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      howManyCards: 8
    }
  },
  methods: {
    manager() {
      this.$store.dispatch('game/chNum', { howManyCards: this.howManyCards })
    }
  },
}
</script>
