<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">

      <v-card>

        <v-card-title class="headline">
          神経衰弱
        </v-card-title>
        <v-img :src="imgSrc" :height="300"></v-img>
        <v-card-text>
          <p>
            同じ画像のカードをペアにして、カードをすべて表にしましょう
          </p>
          <hr class="my-3" />
          <p>
            カードの枚数を入力してください：
            <input 
              type="number"
              v-model.number="howManyCards"
              @change="manager()" 
              class="inputForm"
            />
            枚
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            v-if="isOdd"
            @click="dialog = true"
            style="background-color: mediumslateblue;"
          >
             {{ howManyCards }} 枚でゲームを始める 
          </v-btn>
          <v-btn v-else
            to="/game"
            style="background-color: darkred;"
          >
            {{ howManyCards }} 枚でゲームを始める 
          </v-btn>
        </v-card-actions>

        <v-dialog
          v-model="dialog"
          width="550"
        >
        
          <v-card text-align="center">
            <v-card-title class="headline grey">
              カードの枚数には奇数を入力してください
            </v-card-title>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="dialog = false"
              >
              閉じる
              </v-btn>
            </v-card-actions>
          </v-card>

        </v-dialog>

      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      howManyCards: 8, //初期値
      dialog: 0
    }
  },
  computed: {
    isOdd() {
      if (this.howManyCards % 2 === 1) return true
      else return false
    },
    imgSrc() {
      return this.$store.getters['game/imgSrc'][0]
    }
  },
  methods: {
    manager() {
      this.$store.dispatch('game/chNum', { howManyCards: this.howManyCards })
    },
  },
  async created() {
    this.$store.dispatch('game/initializer')
  },
}
</script>
<style>
.inputForm {
  color: white;
  max-width: 30px;
}
</style>