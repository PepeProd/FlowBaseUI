<template>
    <transition name="modalTrans">
    <div class="modal" @click="close">
        <form @keyup.enter="$emit('SubmitLog', user)" @submit.prevent="$emit('SubmitLog', user)" class="modal-container" @click.stop>
            <span><strong>FlowBase Login</strong></span>
            <label>UserName</label>
            <input type="text" v-model="user.username"></input>
            
            <label>Password</label>
            <input  type="password" v-model="user.password"></input>

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
        },
        methods: {
            close: function() {
                this.$emit('close', 'stayOnPage');
            }
        },
        mounted: function () {
            document.addEventListener("keydown", (e) => {
                if (e.keyCode == 27) {
                    this.$emit('close', 'stayOnPage');
                }
            });
        }
    }    
</script>>

<style scoped>
    * {
        box-sizing: border-box;
    }
    div, form {
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
    span {
        margin-bottom: 20px;
    }
    input {
        text-align: center;
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

    .modalTrans-enter,   {
        transition: all .1s ease
    }

    .modalTrans-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .modalTrans-enter ,
    .modalTrans-leave-to  {
        transform: translateX(100px);
        opacity: 0
    }
    
</style>