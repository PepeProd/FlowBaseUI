<template>
  <div id="app">
    <LogInContainer :class="{'failedLogin': this.loginFailed}" @clickedOutside="handleClickOutside_Login" class='formOffset' v-if="this.showLogForm" @SubmitLog="logIn" @showRegisterClicked="handleShowRegisterClicked"></LogInContainer>
    <RegistrationContainer @clickedOutside="handleClickOutside_Register"  @registrationSubmissionClicked="handleRegistrationSubmissionClicked" v-if="this.showRegistrationForm" class="formOffset"></RegistrationContainer>
    <NavBar :class="{'modal-mask': showRegistrationForm}" :isLoggedIn="isUserLoggedIn" :isFormActive="this.showLogForm" @loginButtonClicked="handleLogInButtonClicked" @logOutClicked="handleLogOutButtonClicked"></NavBar>
    <router-view class='navOffset'>
    </router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import LogInContainer from './components/LogInContainer.vue';
import RegistrationContainer from './components/RegistrationContainer.vue';
import axios from 'axios';
import api from './util/api';
export default {  
  name: 'app',
  components: {
    NavBar,
    LogInContainer,
    RegistrationContainer,
  },
  data() {
    return {
      isUserLoggedIn: false,
      showLogForm: false,
      showRegistrationForm: false,
      loginFailed: false,
    }
  },
  methods: {
    showLoginContainer: function(state) {
      this.showLogForm = state;
    },
    showRegistrationContainer: function(state) {
      this.showRegistrationForm = state;
    },
    logIn: function(user) {
      var isUserValid = false;
      this.$store.dispatch('setActiveUser', user)
      .then(response => { 
        if (response) {
          this.isUserLoggedIn = true;
          this.showLogForm = false;
        } else {
          //alert('Login Failed');
          this.loginFailed = true;
          this.logOut();
          setTimeout(()=>{ this.loginFailed = false; }, 501);
        }
      })
      
      
    },
    logOut: function(e) {
      this.isUserLoggedIn = false;
      this.$store.dispatch('setActiveUser', {})
      if (e != null)
        this.redirect(e);
      
    },
    submitNewUser: function(e) {
      //mock api post to create new user
      var wrapperUser = [];
      wrapperUser.push(e);
      this.axios.post(api.getBaseUrl() + '/Users/CreateUser/', wrapperUser)
      .then(response => {
        if (response.status == 201) {
          this.showLogForm = true;   
          this.showRegistrationForm = false;       
        } else {
          //handle showing an error here
          this.showRegistrationForm = false;
        }
      })
      .catch(error => {

      });

    },
    handleLogOutButtonClicked: function() {
      this.logOut('/');
    },
    handleClickOutside_Login: function() {
      this.showLoginContainer(false);
      this.logOut();
    },
    handleLogInButtonClicked: function() {
      this.showLoginContainer(true);
    },
    handleRegistrationSubmissionClicked: function(e) {
      this.submitNewUser(e);
    },
    handleShowRegisterClicked: function() {
      this.showLoginContainer(false);
      this.showRegistrationForm = true;
      
    },
    handleClickOutside_Register: function() {
      this.showRegistrationContainer(false);
    },
    redirect: function(route) {
      this.$router.push(route);
    }
    
  },
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
  display: flex;
  flex-flow: column;
}
.navOffset {
  margin-top: 40px;
}
.formOffset {
  margin-top: 80px;
}
.modal-mask {
  position: fixed;
  z-index: 9996;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  transition: opacity .5s ease;
}
html {
  height: 100%;
}
body {
  /*min-height: 100%; not sure why this was included, change if needed */
  background-color: #AAB9BA;

}
.failedLogin {
   /* Start the shake animation and make the animation last for 0.5 seconds */
    animation: shake 0.5s; 
    /* When the animation is finished, start again */
    animation-iteration-count: 1; 
}

@keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>
