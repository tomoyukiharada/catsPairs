const CLOSED = 0
const BACK   = 1
const OPENED = 2

export const state = () => ({
    flg: [CLOSED, CLOSED, CLOSED, CLOSED, CLOSED, CLOSED, CLOSED, CLOSED],
    cardPairs: [0,0,1,1,2,2,3,3],
    count: 0,
    isReact: true,
})

export const getters = {
    flg(state) {
        return state.flg
    },
    cardPairs(state) {
        return state.cardPairs
    },
    count(state) {
        return state.count
    },
    isReact(state) {
        return state.isReact
    },
}

export const mutations = {
    flg(state, { newFlg }) {
        state.flg = newFlg
    },
    cardPairs(state, { newcardPairs }) {
        state.cardPairs = newcardPairs
    },
    count(state, { newCount}) {
        state.count = newCount
    },
    isReact(state, { newIsReact }) {
        state.isReact = newIsReact
    },
}

export const actions = {
    fripCard ({ commit, state }, { cardNumber }) {

        //isPair
        let newIsReact = state.isReact
        let newFlg = state.flg
        //function
        function isPair(newcardPairs, firstindex, lastindex) {
            if (newcardPairs[firstindex] === newcardPairs[lastindex]) {
                newFlg[firstindex] = OPENED
                newFlg[lastindex] = OPENED
            }
            else {
                newFlg[firstindex] = CLOSED
                newFlg[lastindex] = CLOSED
            }
            commit('flg', { newFlg })

            //終了条件
            //calcnumOpened
            let filter = newFlg.filter((num) => num === OPENED)
            const numOpened = filter.length
            if (numOpened === 8) {
                //initializer
                newFlg = [CLOSED, CLOSED, CLOSED, CLOSED, CLOSED, CLOSED, CLOSED, CLOSED]
            }
            commit('flg', { newFlg })

            newIsReact = true
            commit('isReact', { newIsReact })

            //count
            const newCount = state.count + 1
            commit('count', { newCount })   
        }

        if (newIsReact) {
            //fripCard

            const selectedCardState = state.flg[cardNumber]
            let nextCardState = null
            //クリックされたカードを裏返すか？
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

            //memory
            const newcardPairs = state.cardPairs
            //calcnumBack
            let filter = newFlg.filter((num) => num === BACK)
            const numBack = filter.length
            //神経衰弱
            if (numBack === 2) {
                // backになっているカードのインデックスを取得
                const firstindex = newFlg.indexOf(BACK)
                const lastindex = newFlg.lastIndexOf(BACK)
                //2枚のカードの柄は同じか？
                newIsReact = false
                setTimeout(isPair, 1000, newcardPairs, firstindex, lastindex)
            }

            //commit
            commit('flg', { newFlg })
            commit('cardPairs', { newcardPairs })
        }
        // commmit
        commit('isReact', { newIsReact })
    },
    initializer ({commit, state}) {
        //カードをすべて裏にする
        const newFlg = [CLOSED, CLOSED, CLOSED, CLOSED, CLOSED, CLOSED, CLOSED, CLOSED]
        //カードのペアをシャッフルする
        let newcardPairs = state.cardPairs
        for (let i = 1; i < newcardPairs.length; i++) {
            const index = newcardPairs[Math.floor(Math.random() * (newcardPairs.length - i)) + i]
            const stack = newcardPairs[index]
            newcardPairs[index] = newcardPairs[i]
            newcardPairs[i] = stack
        }
        console.log('シャッフル後' + newcardPairs)
        //commit
        commit('flg', { newFlg })
        commit('cardPairs', { newcardPairs })
    },
}