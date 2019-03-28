<template>
  <div class="animated fadeIn">
        <b-container fluid class="bv-example-row">
    <b-row>
        <b-col>
    <main-layout>
      <template slot="order-table">

        <b-card no-body style="height: 400px; overflow-y: scroll;">
                         <h6 slot="header">
                           OrderBook (BTC/USD)
            </h6>
         <b-table class="mb-0 table-outline orderbook-table-size" responsive="sm" hover :items="binanceOrderBook.asks" small :fields="tableFields"  head-variant="light">

           <template slot="price" slot-scope="data">
      <span style="color:red">
        {{parseFloat(data.item[0])}}
      </span>
           </template>
               <template slot="amount" slot-scope="data" >
      {{data.item[1]}}
            </template>
               <template slot="total" slot-scope="data" >
      {{parseFloat(data.item[0]) * parseFloat(data.item[1])}}
            </template>
           </b-table>

<span id="ticker-span" :class="{ 'text-danger': sign < 0, 'text-success': sign > 0 }">{{parseFloat(currentPrice)}}
  <i :class="{'fa fa-arrow-down' : sign < 0, 'fa fa-arrow-up' : sign > 0}"></i>
</span>
         <b-table class="mb-0 table-outline orderbook-table-size" responsive="sm" hover :items="binanceOrderBook.bids" small :fields="tableFields"  head-variant="light">
           <template slot="price" slot-scope="data">
      <span style="color:green">
        {{parseFloat(data.item[0])}}
      </span>
           </template>
        <template slot="HEAD_price" slot-scope="data">
    <!-- A custom formatted header cell for field 'name' -->
  </template>
               <template slot="amount" slot-scope="data" >
      {{data.item[1]}}
            </template>
        <template slot="HEAD_amount" slot-scope="data">
    <!-- A custom formatted header cell for field 'name' -->
  </template>
               <template slot="total" slot-scope="data" >
      {{parseFloat(data.item[0]) * parseFloat(data.item[1])}}
            </template>
        <template slot="HEAD_total" slot-scope="data">
    <!-- A custom formatted header cell for field 'name' -->
  </template>
  
           </b-table>
        </b-card>
      </template>

      <template slot="high-stock">
        <!-- highcharts -->
    <highcharts :options="chartOptions"></highcharts>
      </template>

            <template slot="footer">
  <b-card
    title="Average Price"
    class="mb-2"
  >
      {{avgPrice}}

  </b-card>
      </template>
    </main-layout>
</b-col>
    </b-row>
</b-container>
  </div>
</template>

<script>

import MainLayout from '../views/main-layout/MainLayout'
import {Chart} from 'highcharts-vue'
import {mapGetters} from 'vuex'

export default {
  name: 'dashboard',
  components: {
    MainLayout,
    highcharts: Chart,
  },
  data: function () {
    return {
      avgPrice: 0,
      chartOptions: {
        title: 'BTC/USD Price',
        series: [{
          name: 'Price',
          data: [] 
        }]
      },
      sign: 1,
      currentPrice: undefined,
      orderBookItems : [],
      binanceOrderBook: {
        asks: [],
        bids: []
      },
      tableFields: {
        price: {
          label: 'Price',
          sortable: true
        },
        amount: {
          label: 'Amount'
        },
        total: {
          label: 'Total',
          // class: 'text-center'
        }
      },
    }
  },
  created() {
  },
  methods: {
  },
  computed: {
      ...mapGetters([
      'orderBookBuffer',
      'price'
    ])
  },
    watch: {
    price: function (newValue, oldValue) {
      if(!newValue || !newValue.o || !oldValue || !oldValue.o) {
        return
      }
      this.currentPrice = newValue.o
      this.chartOptions.series[0].data.push(parseFloat(newValue.o))
      let allData = this.chartOptions.series[0].data;
      let sum = 0;
      allData.forEach((el) => {
        sum += el;
      });
      let avg = sum / allData.length;
      this.avgPrice = avg.toFixed(5);

      this.sign = parseFloat(newValue.o) >= parseFloat(oldValue.o) ? 1 : -1
    },
    orderBookBuffer: function (newValue, oldValue) {
      console.log("orderBookBuffer CHANGE DETECTION TRIGGERED", {
        oldValue: oldValue,
        newValue: newValue
      })
      function sortDescFunction (a, b) {
        return a[0] > b[0] ? -1 : (a[0] === b[0] ? 0 : 1)
      }
      function sortAscFunction (a, b) {
        return a[0] > b[0] ? 1 : (a[0] === b[0] ? 0 : -1)
      }

      let limit = 10
      // let asks = newValue.map(val => val.a).flatten()
      let asks = newValue.asks
      let askLimit = asks.length >= limit ? limit : asks.length

      asks = asks.filter(elem => parseFloat(elem[1]) > 0).sort(sortAscFunction)
      let newAsks = []
      for(let i = 0; i < askLimit; i++) {
        if(asks[i] !== undefined)
          newAsks.unshift(asks[i])
      }

      // let bids = newValue.map(val => val.b).flatten()
      let bids = newValue.bids
      let bidsLimit = bids.length >= limit ? limit : bids.length

      bids = bids.filter(elem => parseFloat(elem[1]) > 0).sort(sortDescFunction)
        let newBids = []
        for(let i = 0; i < bidsLimit; i++) {
          if(bids[i] !== undefined)
          newBids.push(bids[i])
      }

      let orderBook = {
        asks: newAsks,
        bids: newBids
      }
      if(!newAsks || !newBids)
      debugger

    // if(orderBook.asks.length > 17) {
    //   orderBook.asks = orderBook.asks.slice(orderBook.asks.length - 17, orderBook.asks.length)
    // }
    // if(orderBook.bids.length > 17) {
    //   orderBook.bids = orderBook.bids.slice(orderBook.bids.length - 17, orderBook.bids.length)
    // }
    this.binanceOrderBook = orderBook

      console.log('New OrderBook Items', this.binanceOrderBook)
    }
  },
}
</script>

<style>

  .orderbook-table-size > tbody {
    height: 100px !important;
  }

  #ticker-span {
    margin: auto !important;
  }

</style>
