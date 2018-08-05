<template>
        <div class="modal" @click="clickedOutside">
            <form @submit.prevent="submitRegistrationForm(newUser)" class="modal-container registrationForm" style="background-color: rgb(56,56,56)" @click.stop>
                <span><strong>FlowBase Registration</strong></span>
                <label>User Name</label>
                <input ref="usernameInput" type="text" v-model="newUser.username" name="User Name" v-validate="'required|min: 5'"  :class="{'error': errors.has('User Name')}"></input>
                <label class="errorMessage" v-show="errors.has('User Name')">{{errors.first('User Name')}}</label>
                <label>Email</label>
                <input type="text" v-model="newUser.email" name="Email" v-validate="'required|email'"  :class="{'error': errors.has('Email')}"></input>
                <label class="errorMessage" v-show="errors.has('Email')">{{errors.first('Email')}}</label>
                <div class="flex-row">
                    <input id="emailNotifications" type="checkbox" v-model="newUser.notifications" @click="showFreq = !showFreq"></input>
                    <label class="lblEmail" for="emailNotifications">Email Notifications</label>
                    
                </div>
                <div v-show="showFreq == true">
                    <div>
                        <input v-model="newUser.frequency" id="daily" type="radio" value="Daily" name="frequency"/>
                        <label for="daily" >Daily</label>
                    </div>
                    <div>
                        <input v-model="newUser.frequency" id="weekly" type="radio" value="Weekly" name="frequency" />
                        <label for="weekly" >Weekly</label>
                    </div>
                    <div>
                        <input v-model="newUser.frequency" id="monthly" type="radio" value="Monthly" name="frequency" />
                        <label for="monthly" >Monthly</label>
                    </div>
                </div>
                <label>Password</label>
                <input  type="password" v-model="newUser.password" name="Password" v-validate="'required|min:5'"  :class="{'error': errors.has('Password')}"></input>
                <label class="errorMessage" v-show="errors.has('Password')">{{errors.first('Password')}}</label>
                <label>Registration Code</label>
                <input type="text" v-model="newUser.registration_code" name="registrationCode" v-validate="'required'" :class="{'error': errors.has('registrationCode')}"></input> 
                <label class="errorMessage" v-show="errors.has('registrationCode')">{{errors.first('registrationCode')}}</label>
                <button class="btnRegister">Register</button>
            </form>
        </div>
</template>

<script>
    export default {
        name: 'RegistrationContainer',
        props: [],
        data() {
            return {
                newUser: { frequency: 'Daily'},
                showFreq: false
            }
        },
        methods: {
            clickedOutside: function() {
                this.$emit('clickedOutside');
            },
            submitRegistrationForm: function(newUser) {
                if (!this.showFreq) 
                    this.showFreq = "";
                this.$validator.validateAll().then( (result) => {
                    if (result) {
                        this.$emit('registrationSubmissionClicked', newUser);
                        return;
                    }
                })
                .catch(function(error){

                });
            }
        },
        mounted: function () {
            this.$refs.usernameInput.focus();
            document.addEventListener("keydown", (e) => {
                if (e.keyCode == 27) {
                    this.$emit('clickedOutside');
                }
            });
        }
    }
</script>

<style scope>
    .modal > * {
        font-family: 'Open Sans', sans-serif;
        text-transform: uppercase;
        font-weight: bold;
        box-sizing: border-box;
    }
    .registrationForm {
        display: flex;
        flex-flow: column;
        width: 300px;
        margin-left: auto;
        margin-right: auto;    
        justify-content: space-between;    
    }
    .registrationForm {
        border-top: 20px solid #00A6FF;        
    }
    .registrationForm label, 
    .registrationForm input, 
    .registrationForm button, 
    .registrationForm span {
        flex: 1 0 auto;       
    }
    .registrationForm input,
    .registrationForm button {
        margin-bottom: 15px;
    }
    .registrationForm input {
        text-transform: none;
    }
    .registrationForm input[type=checkbox] {
        flex: 1 0;
    }
    lblEmail {
        flex: 0 0;
        
    }
    .flex-row {
        display: flex;
        margin: 0;
        padding: 0;
        flex-flow: row;
        margin-left: auto;
        margin-right: auto;
        width: 240px;
        justify-content: space-between;
        text-align: left;
    }
    .registrationForm span {
        margin-bottom: 20px;
        color: white;
    }
    .registrationForm input {
        text-align: center;
    }
    .registrationForm label {
        color: white;
    }
    .btnRegister {
        border-radius: 5px;
        padding: 3px 25px 3px 25px;
        cursor: pointer;
        color: #fff;
        background-color: #00A6FF;
        font-family: 'Roboto';
        font-weight: 50;
        border: 1px solid #fff;
        transition-duration: 0.5s;
        -webkit-transition-duration: 0.5s;
        -moz-transition-duration: 0.5s;
        outline: none;

    }
    .btnRegister:hover {
        color: #006398;
        border: 1px solid #006398;
    }
    .modal-container {
        width: 300px;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
        z-index: 9999;
    }
    .modal {
        display: flex;
        flex-flow: column;
        width: 300px;
        margin-left: auto;
        margin-right: auto;    
        justify-content: space-between; 
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
         z-index: 9998;
        /*
        
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s ease; */
    }
    .error {
        border-color: red;
    }
    .errorMessage {
        color: red !important;
        margin-top: -10px;
        margin-bottom: 8px;
        font-size: 0.8em !important;
        text-transform: none !important;
        font-weight: normal !important;
    }
    
</style>