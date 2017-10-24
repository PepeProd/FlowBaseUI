<template>
    <form @submit.prevent="$emit('filterData',searchJsonData(rows, searchIn, searchTerm))">
        <select v-model="searchIn">
            <option disabled hidden value="">Search In</option>
            <option v-for="col in columnNames" v-bind:value="col">{{formatColumn(col)}}</option>
        </select>
        <input type="text" v-model="searchTerm"></input>
        <button class="btnSearch">Search</button>
    </form>
</template>

<script>
    export default {
        name: 'SearchTable',
        props: ['rows', 'columnNames'],
        data() {
            return {
                searchIn: '',
                searchTerm: '',
                result: []               
            }
        },
        methods: {
            searchJsonData: function(inputData, searchIn, valueToFind) {
                var result = []
                if (searchIn === '')
                    return inputData;
                for (var i=0; i < inputData.length; i++) {
                    if ((inputData[i][searchIn]).toString().toLowerCase().indexOf(valueToFind.toLowerCase()) >= 0)
                        result.push(inputData[i]);
                }
                if (result.length == 0)
                    return [];

                return result;
            },
            formatColumn: function(name) {
                return name.toString().split('_').join(' ');
            },
        },
    }
</script>

<style scoped>
    * {
        font-family: 'Open Sans', sans-serif;
        text-transform: uppercase;
        font-weight: bold;
        box-sizing: border-box;
        margin-bottom: 5px;        
    }
    form {
        display: flex;
        flex-flow: row nowrap;
        margin-left: auto;
        margin-right: auto;
        width: 75%;
        justify-content: flex-start;
    }
    form * {
        margin-left: 5px;
    }
    .btnSearch {
        border-radius: 5px;
        padding: 3px 25px 3px 25px;
        cursor: pointer;
        color: #fff;
        background-color: #00A6FF;
        font-family: 'Roboto';
        font-weight: 50;
        border: 1px solid rgb(56,56,56);
        transition-duration: 0.5s;
        -webkit-transition-duration: 0.5s;
        -moz-transition-duration: 0.5s;
    }
      .btnSearch:hover {
        color: rgb(56,56,56);
        opacity: 0.8;
        border: 1px solid rgb(56,56,56);
    }

    select, input {
        border-radius: 5px;
        border:1px solid rgb(56,56,56);
    }

    input[type=text] {
        padding-left: 5px;        
    }
</style>