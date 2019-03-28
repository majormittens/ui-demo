<template>
</template>

<script>
import Sockette from 'sockette'
const socketUrl = 'wss://stream.binance.com:9443/ws/btcusdt@ticker'

export default {
    name: 'ticker-socket',
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
  console.log('TICKER Connection CLOSED ')
},
onopen: e => {
  console.log('TICKER Connection OPENED')
},
onmessage: e => {
  let items = JSON.parse(e.data);
  console.log('TICKER Message received', items)
  this.$store.dispatch('SetTicker', items)
},
onreconnect: e => {
  console.log('TICKER RATES SOCKET RECONNECT TRIGGERED')
}
})
    }
}
</script>
