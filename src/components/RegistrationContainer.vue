<template>
   <transition name="modalTrans" appear>
        <div class="modal" @click="clickedOutside">
            <form @submit.prevent="$emit('registrationClicked', newUser)" class="modal-container" style="background-color: rgb(56,56,56)" >
                <span><strong>FlowBase Registration</strong></span>
                <label>UserName</label>
                <input type="text" v-model="newUser.username"></input>
                <label>Email</label>
                <input type="text" v-model="newUser.email"></input>
                <div class="flex-row">
                    <input id="emailNotifications" type="checkbox" v-model="newUser.notifications"></input>
                    <label class="lblEmail" for="emailNotifications">Email Notifications</label>
                </div>
                <label>Password</label>
                <input  type="password" v-model="newUser.password"></input>
                <button class="btnRegister">Register</button>
            </form>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'RegistrationContainer',
        props: [],
        data() {
            return {
                newUser: {}
            }
        },
        methods: {
            clickedOutside: function() {
                this.$emit('clickedOutside');
            }
        },
    }
</script>

<style scope>
    * {
        box-sizing: border-box;
    }
    form {
        display: flex;
        flex-flow: column;
        width: 300px;
        margin-left: auto;
        margin-right: auto;    
        justify-content: space-between;    
    }
    form {
        border-top: 20px solid #00A6FF;        
    }
    label, input, button, span {
        flex: 1 0 auto;       
    }
    input,button {
        margin-bottom: 15px;
    }
    input[type=checkbox] {
        flex: 0 0 auto;
    }
    lblEmail {
        flex: 0 0 auto;
    }
    .flex-row {
        display: flex;
        flex-flow: row;
        margin-left: auto;
        margin-right: auto;
        width: 240px;
        justify-content: space-between;
    }
    span {
        margin-bottom: 20px;
        color: white;
    }
    input {
        text-align: center;
    }
    label {
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
    }
    .btnRegister:hover {
        color: #006398;
        opacity: 0.8;
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
    
    /* can not get transition enter to work */
    .modalTrans-enter-active,   {
        transition: all 1s ease !important;
    }

    .modalTrans-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .modalTrans-enter ,
    .modalTrans-leave-to  {
        transform: translateX(100px) !important;
        opacity: 0 !important;
    }
</style>