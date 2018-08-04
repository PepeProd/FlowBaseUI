<template>
    <div class="modal" @click="clickedOutside">
        <!-- keyup.enter and submit,prevent cause double ajax call @keyup.enter="submitLogIn(user)" -->
        <form style="background-color: rgb(56,56,56)" @submit.prevent="submitLogIn(user)" class="modal-container" @click.stop>
            <span><strong>FlowBase Login</strong></span>
            <label>UserName</label>
            <input type="text" v-model="user.username" name="User Name" v-validate="'required|min:5'"  :class="{'error': errors.has('User Name')}"></input>
            <label class="errorMessage" v-show="errors.has('User Name')">{{errors.first('User Name')}}</label>
            <label>Password</label>
            <input  type="password" v-model="user.password" name="Password" v-validate="'required|min:5'"  :class="{'error': errors.has('Password')}"></input>
            <label class="errorMessage" v-show="errors.has('Password')">{{errors.first('Password')}}</label>
            <button class="btnLogIn">Login</button>
            <button class="btnLogIn" @click.prevent="$emit('showRegisterClicked')">Register</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'LogInContainer',
        data() {
            return {
                user: {}
            }
        },
        methods: {
            clickedOutside: function() {
                this.$emit('clickedOutside');
            },
            submitLogIn: function(user) {
                this.$validator.validateAll().then( (result) => {
                    if (result) {
                        this.$emit('SubmitLog', user);
                        return;
                    }
                })
                .catch(function(error) {

                });
            }
        },
        mounted: function () {
            document.addEventListener("keydown", (e) => {
                if (e.keyCode == 27) {
                    this.$emit('clickedOutside');
                }
            });
        }
    }    
</script>>

<style scoped>
    .modal > * {
    font-family: 'Open Sans', sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    box-sizing: border-box;
}
    .modal div, 
    .modal form {
        display: flex;
        flex-flow: column;
        width: 300px;
        margin-left: auto;
        margin-right: auto;    
        justify-content: space-between;    
    }
    .modal form {
        border-top: 20px solid #00A6FF;        
    }
    .modal label, 
    .modal input, 
    .modal button, 
    .modal span {
        flex: 1 0 auto;       
    }
    .modal input,
    .modal button {
        margin-bottom: 15px;
    }
    .modal span {
        margin-bottom: 20px;
        color: white;
    }
    .modal input {
        text-align: center;
        text-transform: none;
    }
    label {
        color: white;
    }
    .btnLogIn {
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
    .btnLogIn:hover {
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