<template>
    <div>
        <v-card outlined class="card" :img="cardImg" @click="handler(idx)" :height="210" :width="140">
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'CardPage',
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
/* cardHeight() {
    const height = window.height
    return 210
},
    cardWidth() {
    const width = window.width
    return 140
}, */
</style>