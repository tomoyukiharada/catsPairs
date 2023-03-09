const CLOSED = 0
const BACK   = 1
const OPENED = 2

export const state = () => ({
    flg: [CLOSED, CLOSED, CLOSED, CLOSED, CLOSED, CLOSED, CLOSED, CLOSED],
    cardPairs: [0,0,1,1,2,2,3,3],
})

export const getters = {
    flg(state) {
        return state.flg
    },
    // numBack(state) {
    //     const flg = state.flg
    //     const filter = flg.filter((num) => num === 1)
    //     return filter.length
    // },
    // numOpened(state) {
    //     const flg = state.flg
    //     const filter = flg.filter((num) => num === 2)
    //     return filter.length
    // },
    cardPairs(state) {
        return state.cardPairs
    },
}

export const mutations = {
    flg(state, { newFlg }) {
        state.flg = newFlg
    },
    // numBack(state, { newnumBack }) {
    //     state.numBack = newnumBack
    // },
    // numOpened(state, { newnumOpened }) {
    //     state.numOpened = newnumOpened
    // },
    cardPairs(state, { newcardPairs }) {
        state.cardPairs = newcardPairs
    },
}

export const actions = {
    fripCard ({ commit, state }, { cardNumber }) {
        const selectedCardState = state.flg[cardNumber]
        let nextCardState = null
        //クリックされたカードを裏返す
        if (selectedCardState === CLOSED) {
            nextCardState = BACK
        }
        else if (selectedCardState === BACK) {
            nextCardState = BACK
        }
        else if (selectedCardState === OPENED) {
            nextCardState = OPENED
        }
        //フラグの更新
        let newFlg =state.flg.map((flg, idx) => {
            if (idx !== cardNumber) {
                return flg
            }
            return nextCardState
        })

        // let newnumOpened = getters.numOpened
        const newcardPairs = state.cardPairs

        //calcnumBack
        let filter = newFlg.filter((num) => num === BACK)
        const numBack = filter.length
        //神経衰弱
        if (numBack === 2) {
            // console.log(1)
            // backになっているカードのインデックスを取得
            const firstindex = newFlg.indexOf(BACK)
            const lastindex = newFlg.lastIndexOf(BACK)
            //2枚のカードの柄が同じだったら
            if (newcardPairs[firstindex] === newcardPairs[lastindex]) {
                newFlg[firstindex] = OPENED
                newFlg[lastindex] = OPENED
                // console.log(2)
                // newnumOpened += 2
                // newnumBack = 0
            }
            else {
                newFlg[firstindex] = CLOSED
                newFlg[lastindex] = CLOSED
                // newnumBack = 0
            }
        }
        //終了条件
        //calcnumOpened
        filter = newFlg.filter((num) => num === OPENED)
        const numOpened = filter.length
        if (numOpened === 8) {
            newFlg = [CLOSED, CLOSED, CLOSED, CLOSED, CLOSED, CLOSED, CLOSED, CLOSED]
            // newnumOpened = 0
        }

        //newFlgの値を引き継ぐ

        // let newnumBack = getters.numBack
        
        // newを作っておく
        commit('flg', { newFlg })
        // commit('numBack', { newnumBack })
        // commit('numOpened', { newnumOpened })
        commit('cardPairs', { newcardPairs })
    },
    // memory ({commit, state }) {
    //     const newcardPairs = state.cardPairs
    //     //calcnumBack
    //     let filter = newFlg.filter((num) => num === BACK)
    //     const numBack = filter.length
    //     //神経衰弱
    //     if (numBack === 2) {
    //         console.log(1)
    //         // backになっているカードのインデックスを取得
    //         const firstindex = newFlg.indexOf(BACK)
    //         const lastindex = newFlg.lastIndexOf(BACK)
    //         //2枚のカードの柄が同じだったら
    //         if (newcardPairs[firstindex] === newcardPairs[lastindex]) {
    //             newFlg[firstindex] = OPENED
    //             newFlg[lastindex] = OPENED
    //         }
    //         else {
    //             newFlg[firstindex] = CLOSED
    //             newFlg[lastindex] = CLOSED
    //         }
    //     }
    //     //終了条件
    //     //calcnumOpened
    //     filter = newFlg.filter((num) => num === OPENED)
    //     const numOpened = filter.length
    //     if (numOpened === 8) {
    //         newFlg = [CLOSED, CLOSED, CLOSED, CLOSED, CLOSED, CLOSED, CLOSED, CLOSED]
    //     }
    //     // newを作っておく
    //     commit('flg', { newFlg })
    //     commit('cardPairs', { newcardPairs })
    // }
}