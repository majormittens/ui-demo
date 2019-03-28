<template>
  <div class="app">
    <AppHeader fixed>
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="img/brand/logo.svg" height="60" alt="Logo">
        <img class="navbar-brand-minimized" src="img/brand/logo.svg" width="30" height="30" alt="CoreUI Logo">
      </b-link>
    </AppHeader>
    <div class="app-body">

      <main class="main">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
      <version></version>
      <!--footer-->
  <order-book-socket></order-book-socket>
  <ticker-socket></ticker-socket>
  </div>

</template>

<script>
import { Header as AppHeader } from '@coreui/vue'
import {mapGetters} from 'vuex'
import OrderBookSocket from '../views/OrderBookSocket'
import TickerSocket from '../views/TickerSocket'

import Version from '../views/Version'
const isProd = process.env.NODE_ENV === 'production'

export default {
  name: 'full',
  components: {
    AppHeader,
    OrderBookSocket,
    TickerSocket,
    Version
  },
  data () {
    return {
      items: []
    }
  },
  created() {

  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    },
    selectedIndex: {
      get() {
      let foundItemIndex = this.items.findIndex((item) => item.symbol === this.selected);
      return foundItemIndex ? foundItemIndex : 0
      },
      set(value) {

      }
    },
      ...mapGetters([
      'selected'
    ])
  },
  methods: {
    selectItem (item) {
      console.log("ITEM SELECTED ", item)
    this.$store.dispatch('Select', item)
    }
  }
}
</script>
