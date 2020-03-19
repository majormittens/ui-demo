<template>
  <div class="animated fadeIn">
 <grid-layout
            :layout="layout"
            :col-num="3"
            :col-width="150"
            :row-height="400"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
    >
        <grid-item :x="layout[0].x"
                   :y="layout[0].y"
                   :w="layout[0].w"
                   :h="layout[0].h"
                   :i="layout[0].i">
            <slot name="order-table"></slot>
        </grid-item> 
        <grid-item :x="layout[1].x"
                   :y="layout[1].y"
                   :w="layout[1].w"
                   :h="layout[1].h"
                   :i="layout[1].i">
            <slot name="high-stock"></slot>
        </grid-item> 
        <grid-item :x="layout[2].x"
                   :y="layout[2].y"
                   :w="layout[2].w"
                   :h="layout[2].h"
                   :i="layout[2].i">
            <slot name="footer"></slot>
        </grid-item> 
    </grid-layout>
  </div>
</template>

<script>

import VueGridLayout from 'vue-grid-layout';
	var testLayout = [
      {"x":0,"y":0,"w":1,"h":1,"i":"0"},
      {"x":1,"y":0,"w":2,"h":1,"i":"1"},
	    {"x":0,"y":2,"w":3,"h":1,"i":"2"},
	];
	
	var GridLayout = VueGridLayout.GridLayout;
	var GridItem = VueGridLayout.GridItem;

export default {
  name: 'main-layout',
  components: {
    GridLayout,
    GridItem
  },
	    data() {
	        return {
                layout: testLayout
            }
	    },
  created() {
  },
  mounted() {
    function insertAndExecute(id, text) {
    document.getElementById(id).innerHTML = text;
    var scripts = Array.prototype.slice.call(document.getElementById(id).getElementsByTagName("script"));
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src != "") {
            var tag = document.createElement("script");
            tag.src = scripts[i].src;
            document.getElementsByTagName("head")[0].appendChild(tag);
        }
        else {
            eval(scripts[i].innerHTML);
        }
    }
}
  },
  methods: {
    variant (value) {
      let $variant
      if (value <= 25) {
        $variant = 'info'
      } else if (value > 25 && value <= 50) {
        $variant = 'success'
      } else if (value > 50 && value <= 75) {
        $variant = 'warning'
      } else if (value > 75 && value <= 100) {
        $variant = 'danger'
      }
      return $variant
    },
    flag (value) {
      return 'flag-icon flag-icon-' + value
    }
  }
}
</script>
