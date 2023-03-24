<template>
    <div>
        <v-card class="card" :img="cardImg" @click="handler(idx)" :height="210" :width="140">
        </v-card>
    </div>
</template>

<script>
export default {
    props: ["idx"],
    computed: {
        cardImg() {
            if (this.$store.getters['game/flg'][this.idx] !== 0) {
                return this.$store.getters['game/imgSrc'][this.$store.getters['game/cardPairs'][this.idx]]
            }
            else {
                return ""
            }
        },
    },
    methods: {
        handler(idx){
            this.$store.dispatch('game/fripCard', { cardNumber: idx })
        },
    },
}
</script>
<style>
.card {
    font-size: 60px;
    text-align: center;
}
</style>