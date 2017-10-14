<template>
  <div id="app">
    <NavBar :isLoggedIn="false"></NavBar>
    <LogIn class='navOffset2'></LogIn>
    <router-view class='navOffset'>
    </router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import LogIn from './components/LogIn.vue';
export default {  
  name: 'app',
  components: {
    NavBar,
    LogIn
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.navOffset {
  margin-top: 40px;
}
.navOffset2 {
  margin-top: 80px;
}
</style>
