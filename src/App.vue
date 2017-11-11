<template>
  <div id="app">
    <LogInContainer @clickedOutside="handleClickOutside_Login" class='formOffset' v-if="this.showLogForm" @SubmitLog="logIn" @showRegisterClicked="handleShowRegisterClicked"></LogInContainer>
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
      //mock api verification
      user.email = "testemail"; //get email from api
      user.notifications = "testnotifications"; //get notification status from api
      if (user.username == "asd") {
        this.isUserLoggedIn = true;
        this.showLogForm = false;
        this.$store.dispatch('setActiveUser', user)
      } else {
        this.logOut();
      }
    },
    logOut: function(e) {
      this.isUserLoggedIn = false;
      this.$store.dispatch('setActiveUser', {})
      if (e != null)
        this.redirect(e);
      
    },
    submitNewUser: function(e) {
      //mock api post to create new user
      this.showRegistrationForm = false;
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
  created: function() {
   // var initialChemicals = this.$http.get('http://flowbase-api-lb-1387389396.us-east-2.elb.amazonaws.com/chemicals');
      //this.$store.dispatch('setChemicals', initialChemicals);
      var initialChemicals = [
        {id: 1, barcode: 11111, chemical_name: 'test2', expiration_date: '10/9/2017'}, 
        {id: 2, barcode: 11112, chemical_name: 'test2', expiration_date: '11/11/2017'},
        {id: 3, barcode: 11113, chemical_name: 'test2', expiration_date: '12/15/2018'},
        {id: 4, barcode: 11114, chemical_name: 'test2', expiration_date: '12/31/2017'}
      ];
      this.$store.dispatch('setChemicals', initialChemicals);
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
  display: flex;
  flex-flow: column
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
</style>
