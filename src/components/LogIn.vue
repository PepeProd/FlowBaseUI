<template>
    <transition>
    <div class="modal">
        <form @submit.prevent="$emit('SubmitLog', user)" class="modal-container">
            <span><strong>FlowBase Login</strong></span>
            <label>UserName</label>
            <input type="text" v-model="user.username"></input>
            
            <label>Password</label>
            <input  type="text" v-model="user.password"></input>

            <button class="btnLogIn">Login</button>
        </form>
    </div>
    </transition>
</template>

<script>
    export default {
        name: 'LogIn',
        data() {
            return {
                user: {}
            }
        }
    }    
</script>>

<style scoped>
    * {
        box-sizing: border-box;
    }
    div, form {
        display: flex;
        flex-flow: column wrap;
        width: 300px;
        margin-left: auto;
        margin-right: auto;    
        justify-content: space-between;    
    }
    label, input, button, span {
        flex: none;        
    }
    input,button {
        margin-bottom: 15px;
    }
    span {
        margin-bottom: 20px;
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
</style>