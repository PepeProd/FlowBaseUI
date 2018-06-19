<template>
    <form @submit.prevent="emitSearchKeyWord">
        <select class="dropDownEdges" v-model="searchBy">
            <option disabled hidden value="">Search In</option>
            <option v-for="col in columnNames" v-bind:value="col">{{formatColumn(col)}}</option>
        </select>
        <AutoComplete @optionClicked="handleOptionClicked"  :options="getAutoCompleteData(rows, searchBy)" @keywordChanged="updateSearchTerm">
            <template slot="item" scope="option">
                <p>
                    <strong >{{ option.searchSuggestion }}</strong>
                </p>
            </template>
        </AutoComplete>
        <button class="btnSearch">Search</button>
    </form>
</template>

<script>
    import AutoComplete from './AutoComplete.vue';
    import {formatColumns} from '../mixins/formatColumns';
    export default {
        name: 'TableSearcher',
        props: ['rows', 'columnNames'],
        components: {
            AutoComplete
        },
        mixins: [formatColumns],
        data() {
            return {
                searchBy: '',
                searchTerm: '',
                result: [],
                readyForSearch: true                
            }
        },
        methods: {
            
            updateSearchTerm: function(newKeyWord) {
                this.searchTerm = newKeyWord;
            },
            searchJsonData: function(inputData, searchBy, valueToFind) {
                var result = []
                if (searchBy === '')
                    return inputData;
                for (var i=0; i < inputData.length; i++) {
                    if ((inputData[i][searchBy]).toString().toLowerCase().indexOf(valueToFind.toLowerCase()) >= 0)
                        result.push(inputData[i]);
                }
                if (result.length == 0)
                    return [];
                return result;
            },
            getAutoCompleteData: function(inputData, column) {
                var result = [];
                if (column == "")
                    return result;
                for (var i=0; i < inputData.length; i++) {
                    result.push( {key: inputData[i][column].toString()});
                }
                return result;
            },
            handleOptionClicked: function(searchState) {
                this.readyForSearch = searchState;                
            },
            emitSearchKeyWord: function() {
                if (this.readyForSearch || this.searchTerm == "")
                    this.$emit('submitClicked',this.searchJsonData(this.rows, this.searchBy, this.searchTerm));
                this.readyForSearch = !this.readyForSearch;
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
}
    .dropDownEdges:focus,.dropDownEdges:active:focus,.dropDownEdges.active:focus,
    .dropDownEdges.focus,.dropDownEdges:active.focus,.dropDownEdges.active.focus {
        outline: none;
        box-shadow: none;
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
        border: 1px solid rgb(56,56,56);
        transition-duration: 0.5s;
        -webkit-transition-duration: 0.5s;
        -moz-transition-duration: 0.5s;
        outline: none;
        font-weight: bold;
        font-size: 0.8em;

    }
      .btnSearch:hover {
        color: rgb(56,56,56);
        opacity: 0.8;
        border: 1px solid rgb(56,56,56);
    }
    .dropDownEdges:hover {
        border-radius: 5px 5px 0px 0px;
    }
    select, input {
        border-radius: 5px;
        border:1px solid rgb(56,56,56);
    }

    input[type=text] {
        padding-left: 5px;        
    }
</style>