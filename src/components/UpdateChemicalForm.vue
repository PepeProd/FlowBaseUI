<template>
    <div class="floatCenter" >
        <div class="formWrapper">
            <h2 class="title">Update Chemical</h2>
            <label class="chemDet" v-for="(propertyValue, key) in chemical"> {{key}}: {{propertyValue}} </label>
            <button class="formBtn">Save</button>
            <button  class="formBtn" v-on:click="$emit('closeChemUpdateForm')">Cancel</button>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'UpdateChemicalForm',
        data() {
            return {

            }
        },
        props: {
            chemical: {}
        },
        methods: {

        }
    }
</script>


<style scoped>
    .floatCenter1 {
        position:absolute;
        top:0;
        left:0;
        display: flex;
        flex-direction:column;
        justify-content:center;
        width:100%;
        height:100%;
    }
    .formWrapper {
        border-top: 20px solid #00A6FF;  
        display: flex;
        position:absolute;
        flex-direction:column;
        justify-content:center;
        margin-left: auto;
        margin-top: auto;
        margin-bottom: auto;
        margin-right: auto;
        padding: 10px 30px;
        background-color: rgb(56, 56, 56);
        width: 350px;
        height: 500px;
        top:0;
        left:0;
        right: 0;
        bottom: 0;

    }
    .chemDet {
        display: flex;
        flex: 0 1 auto;
        flex-direction:column;
        justify-content:center;
        color: white;
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .title {
        padding: 0;
        margin: 0;
        margin-bottom: 15px;
        color: #00A6FF;
    }
    .formBtn {
        margin-top: 5px;
        height: 30px;
        margin-bottom: 5px;
        margin-left: auto;
        margin-right: auto;
        width: 75px;
        border-radius: 5px;
        text-align: center;
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
</style>