<template>
</template>

<script>
import Sockette from 'sockette'
const socketUrl = 'wss://stream.binance.com:9443/ws/btcusdt@depth'

export default {
    name: 'orderbook-socket',
    data: function() {
            return {
                socketInstance: undefined
            }
        },
    created() {
    this.socketInstance = new Sockette(socketUrl, {
  timeout: 5e3,
  maxAttempts: 20,
  onclose : e =>  {
  console.log('Connection CLOSED ')
},
onopen: e => {
  console.log('Connection OPENED')
},
onmessage: e => {
  let items = JSON.parse(e.data);
  console.log('Message received', items)
  this.$store.dispatch('AddToBuffer', items)
},
onreconnect: e => {
  console.log('MARKET RATES SOCKET RECONNECT TRIGGERED')
}
})
    }
}
</script>
