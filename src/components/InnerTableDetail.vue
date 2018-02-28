<template>
    <div>
        <div v-on:mouseenter="toggleState()" v-on:mouseleave="toggleState()">{{detail}} <a class="link" v-on:click="$emit('showUpdateChemForm')" :class="[this.visibilityState ? '' : 'hidden']" v-show="(displayOnIndex == index && isUserLoggedIn == true)" >Edit</a></div>
    </div>
</template>


<script>
export default {
  name: 'InnerTableDetail',
  data() {
      return {
          visibilityState: false,
      }
  },
  props: {
      isUserLoggedIn: false,
      displayOnIndex: 0,
      index: 0,
      detail: {}
  },
  methods: {
      toggleState: function() {
          this.visibilityState = !this.visibilityState;
      }
  },
  components: {
  }
}
</script>

<style scoped>
.hidden {
    display: none;
}
.link {
    color: #ffe818;
    text-decoration: underline;
    cursor: pointer;
}
</style>