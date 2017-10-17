<template>
  <div id="app">
    <LogIn class='loginOffset' v-if="this.showLogForm" @SubmitLog="authUser"></LogIn>
    <NavBar :isLoggedIn="logState" :isFormActive="this.showLogForm" @showLogin="display" @logOut="logOutState"></NavBar>
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
  },
  data() {
    return {
      logState: false,
      showLogForm: false
    }
  },
  methods: {
    display: function(state) {
      this.showLogForm = state;
    },
    authUser: function(user) {
      //mock api verification
      this.logState = true;
      this.showLogForm = false;
    },
    logOutState: function() {
      this.logState = false;
      this.showLogForm = false;
    }
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
.loginOffset {
  margin-top: 80px;
}
</style>
