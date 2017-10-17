<template>
  <div id="app">
    <LogInContainer @clickedOutside="handleClickOutside_Login" class='loginOffset' v-if="this.showLogForm" @SubmitLog="logIn"></LogInContainer>
    <NavBar :isLoggedIn="isUserLoggedIn" :isFormActive="this.showLogForm" @showLogin="display" @logOutClicked="handleLogOutButtonClicked"></NavBar>
    <router-view class='navOffset'>
    </router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import LogInContainer from './components/LogInContainer.vue';
export default {  
  name: 'app',
  components: {
    NavBar,
    LogInContainer
  },
  data() {
    return {
      isUserLoggedIn: false,
      showLogForm: false
    }
  },
  methods: {
    display: function(state) {
      this.showLogForm = state;
    },
    logIn: function(user) {
      //mock api verification
      if (user.username == "asd") {
        this.isUserLoggedIn = true;
        this.showLogForm = false;
      } else {
        this.logOut();
      }
    },
    logOut: function(e) {
      this.isUserLoggedIn = false;
      this.showLogForm = false;
      if (e != null)
        this.redirect(e);
      
    },
    handleLogOutButtonClicked: function() {
      this.logOut('/');
    },
    handleClickOutside_Login: function() {
      this.logOut();
    },
    redirect: function(route) {
      this.$router.push(route);
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
