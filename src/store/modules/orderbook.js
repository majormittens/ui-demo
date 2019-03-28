
const orderbook = {
    state: {
        orderBookBuffer: {
            asks: [],
            bids: []
        },
        maxBufferSize: 10
    },
    mutations: {
        SET_BUFFER: (state, buffer) => {
            state.orderBookBuffer = buffer
        },
        ADD_TO_BUFFER: (state, items) => {
            let asks = items.a
            let bids = items.b

            let oldAsks = state.orderBookBuffer.asks
            let oldBids = state.orderBookBuffer.bids
            

            // need to iterate over the pairs in received asks and bids 
            asks.forEach((pair) => {
                let foundFlag = false;
                for(let i = 0; i < oldAsks.length; i++) {
                    if(oldAsks[i][0] === pair[0]) {
                        oldAsks[i][1] = pair[1]
                        foundFlag = true
                    }
                }
                if(!foundFlag) 
                oldAsks.push(pair)
            })

            bids.forEach((pair) => {
                let foundFlag = false;
                for(let i = 0; i < oldBids.length; i++) {
                    if(oldBids[i][0] === pair[0]) {
                        oldBids[i][1] = pair[1]
                        foundFlag = true
                    }
                }
                if(!foundFlag) 
                    oldBids.push(pair)
            })

            let newBuffer = {
                asks: oldAsks,
                bids: oldBids
            }
            state.orderBookBuffer = {...newBuffer}

        },
        REMOVE_ITEM: (state, item) => {
            state.orderBookBuffer = state.orderBookBuffer.filter(element => element !== item)
        },
        FILTER_BUFFER: (state, snapshot) => {
            // implement snapshot filtering

            console.log("FILTER_BUFFER", {
                oldBuffer: state.orderBookBuffer,
                lastUpdateId: snapshot.lastUpdateId
            })
            state.orderBookBuffer = state.orderBookBuffer.filter ((elem) => elem.u > snapshot.lastUpdateId )
        }
    },
    actions: {
        SetBuffer({ commit, state }, items) {
            return new Promise ((resolve, reject) => {
                commit('SET_BUFFER', items)
                resolve([...state.orderBookBuffer])
            })
        },
        AddToBuffer({ commit, state }, items) {
            return new Promise ((resolve, reject) => {
                commit('ADD_TO_BUFFER', items)
                resolve([...state.orderBookBuffer])
            })
        },
        RemoveItem({ commit, state}, item) {
            return new Promise ((resolve, reject) => {
                commit('REMOVE_ITEM', item)
                resolve([...state.orderBookBuffer])
            })
        },
        filterBuffer({ commit, state}, snapshot) {
            return new Promise ((resolve, reject) => {
                commit('FILTER_BUFFER', snapshot)
                resolve([...state.orderBookBuffer])
            })       
        }
    }   
}

export default orderbook