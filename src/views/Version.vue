<template>
<span>{{appVersion}}</span>
</template>

<script>

const pack = require('../../package.json');

export default {
  name: 'version',
  data: function () {
    return {
        appVersion: pack.version
    }
  }
}
</script>

<style>
</style>
