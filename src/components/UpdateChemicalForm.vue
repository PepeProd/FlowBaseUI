<template>
    <div class="floatCenter" >
        <div class="formWrapper">
            <h2 class="title">Update Chemical</h2>
            <!--<label class="chemDet" v-for="(propertyValue, key) in chemical"> {{key}}: {{propertyValue}} </label>-->
            <div v-for="(propertyValue, key) in chemical">
                <div class="inlineForm" >
                    <label class="inlineColumnLabel" v-if="(excludeCol().indexOf('id') > -1) && (key != 'id')" :class="{'errorMessage': errors.has(key)}">{{formatColumn(key).toUpperCase()}}</label>
                    <div  v-if="!(excludeCol().indexOf(key) > -1) && !(dropDownTemp(key)) && !(dropDownLocation(key)) && (key != 'project_code')">
                        <input :disabled="!loggedIn" class="inlineData" :name="key" :data-vv-as="formatColumn(key)" v-validate="{required: true}" data-vv-validate-on="blur" :class="{'error': errors.has(key)}" :ref="key" type="text" :placeholder="propertyValue"/>
                    </div>
                    <div  v-else-if="!(excludeCol().indexOf(key) > -1) && !(dropDownTemp(key)) && !(dropDownLocation(key))">
                        <input class="inlineData" :name="key" :data-vv-as="formatColumn(key)" :ref="key" type="text" :placeholder="propertyValue"/>
                    </div>
                    <select class="inlineData selectWidth"  v-model="chemical.storage_temperature" :ref="key" v-else-if="dropDownTemp(key)" type="text">
                        <option v-for="obj in tempZones" :value="obj.storage_temperature">{{obj.storage_temperature}}</option>
                    </select>
                    <select class="inlineData selectWidth" v-model="chemical.location" :ref="key" v-else-if="dropDownLocation(key)" type="text">
                        <option v-for="loc in location" :value="loc.location">{{loc.location}}</option>
                    </select>
                    <label class="inlineData" v-else-if="key != 'id'">{{propertyValue}}</label>
                </div>
            </div>
            <div class="buttonContainer">
                <button class="formBtn" v-on:click="updateChem(chemical)">Save</button>
                <button  class="formBtn" v-on:click="$emit('closeChemUpdateForm')">Cancel</button>
            </div>
        </div>
    </div>
</template>


<script>
    import {formatColumns} from '../mixins/formatColumns';
    export default {
        name: 'UpdateChemicalForm',
        mixins: [formatColumns],
        data() {
            return {
                firstLoad: true
            }
        },
        props: {
            chemical: {},
            loggedIn: false
        },
        methods: {
            updateChem: function(e) {
                this.$validator.validateAll().then( (result) => {
                    if (result) {
                        for(var property in e) {
                            if (e.hasOwnProperty(property) && !(this.excludeCol().indexOf(property) > -1)) {
                                e[property] = this.$refs[property][0].value;
                            }
                        }
                        this.$store.dispatch('updateChemical', e).then( () => {
                            this.$emit("saveUpdate");
                        });
                    }
                });
            },
            excludeCol: function() {
                var exclusionList = new Array("id", "barcode", "receive_date", "expiration_date");
                return exclusionList;
            },
            dropDownTemp: function(key) {
                var arr = new Array("storage_temperature")
                if (arr.indexOf(key) > -1)
                    return true;
                return false;
            },
            dropDownLocation: function(key) {
                var arr = new Array("location")
                if (arr.indexOf(key) > -1)
                    return true;
                return false;
            }
        },
        computed: {
            location: function() {
                return this.$store.getters.locations;
            },
            tempZones: function() {
                return this.$store.getters.tempZones;
            }
        },
        created: function() {
            this.$store.dispatch('setLocations');
            this.$store.dispatch('setTempZones');
        },
        updated: function() {
            if (this.firstLoad == true) {
            for(var property in this.chemical) {
                if (this.chemical.hasOwnProperty(property) && !(this.excludeCol().indexOf(property) > -1)) {
                    this.$refs[property][0].value = this.chemical[property];
                }
            }
            this.firstLoad = false;
            }
                
        }
    }
</script>


<style scoped>
    * {
        font-family: 'Open Sans', sans-serif;
    }
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
    .inlineForm {
        display: flex;
        flex-direction:row;
        color: white;
        margin-top: 5px;
        margin-bottom: 5px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }
    .inlineColumnLabel {
        justify-content: start;
        margin-right: auto;
        font-size: 0.9em;
        margin-top: auto;
        margin-bottom: auto;
    }
    .inlineData {
        justify-content: end;
        margin-left: auto;
        text-align: right;
    }
    .selectWidth {
        width: 37% !important;
        text-align: right;
    }
    select { 
        text-align-last: right; 
        height: 21px;
        margin-top: auto;
        margin-bottom: auto;
    }
    option { 
    }
    .error {
        border-color: red;
    }
    .errorMessage {
        color: red;
        width: 100%
    }
    .buttonContainer {
        margin-top: 15px;
    }
</style>