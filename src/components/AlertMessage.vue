<template>
    <div class="alertWrapper">
        <label class="leadingText">{{messageText}}</label>
        <label class="formattedResponse" v-for="item in inputData">{{item}} </label>
        <button type="button" class="btnOK" @click="closeMessage()">OK</button>
    </div>

</template>

<script>
    export default {
        name: 'AlertMessage',
        props: {
            inputData: {type: Array},
            messageText: {type: String, required: true}
        },
        data() {
            return {

            }
        },
        methods: {
            closeMessage: function() {
                this.$emit('submitClose')
            }
        }
    }
</script>


<style scoped>

    .alertWrapper {
        border-top: 20px solid #00A6FF;  
        display: flex;
        flex-shrink: 0;
        flex-direction:column;
        align-items: center;
        justify-content:center;
        margin-left: auto;
        margin-top: 200px;
        margin-bottom: auto;
        margin-right: auto;
        padding: 10px 30px;
        background-color: rgb(56, 56, 56);
        width: 250px;
        top:0;
        left:0;
        right: 0;
        bottom: 0;
        overflow-y:auto;
    }
    .formattedResponse {
        color: white;
    }
    .leadingText {
        color: white;
    }
    .btnOK {
        border-radius: 5px;
        padding: 3px 25px 3px 25px;
        cursor: pointer;
        color: #fff;
        background-color: #00A6FF;
        font-family: 'Roboto';
        border: 1px solid rgb(56,56,56);
        transition-duration: 0.5s;
        -webkit-transition-duration: 0.5s;
        -moz-transition-duration: 0.5s;
        outline: none;
        font-weight: bold;
        font-size: 0.8em;
        width: 75px;
        margin-left: auto;
        margin-right: auto;

    }
      .btnOK:hover {
        color: rgb(56,56,56);
        opacity: 0.8;
        border: 1px solid rgb(56,56,56);
    }
</style>