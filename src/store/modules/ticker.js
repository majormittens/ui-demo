
const ticker = {
    state: {
        price: undefined
    },
    mutations: {
        SET_TICKER: (state, data) => {
            state.price = data
        }
    },
    actions: {
        SetTicker({ commit, state }, items) {
            return new Promise ((resolve, reject) => {
                commit('SET_TICKER', items)
                resolve([...state.price])
            })
        }
    }   
}

export default ticker