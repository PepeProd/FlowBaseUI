<template>
    <div>
        <div v-if="isUserLoggedin" class="card">
            <div class="innerCard">
                <h2 class="pageHeader">Add New Chemical</h2>
                <form ref="newChemicalForm" @submit.prevent="submitNewChemicalFormClicked($event)" class="addChemForm">
                    <div>
                        <label class="strongFont">Chemical Name</label>
                        <!--<input v-model="chemName" name="Chemical Name" v-validate="{required: true}" type="text" :class="{'error': errors.has('Chemical Name')}"/>-->
                        <AutoComplete v-model="chemName" @optionClicked="handleOptionClicked" :minimumAutoLength="3"  :options="getAutoCompleteData(chemicalsWithNoDuplicates)" @keywordChanged="updateSearchTerm">
                            <template slot="item" scope="option">
                                <p>
                                    <strong class="dont-break-out">{{ option.searchSuggestion }}</strong>
                                </p>
                            </template>
                        </AutoComplete>
                    </div>
                    <label class="errorMessage" v-show="errors.has('Chemical Name')">{{errors.first('Chemical Name')}}</label>
                    <div>
                        <label class="strongFont">Common Name</label>
                        <input type="text" v-model="commonName" name="Common Name" v-validate="{required: true}"  :class="{'error': errors.has('Common Name')}"/>
                    </div>
                    <label class="errorMessage" v-show="errors.has('Common Name')">{{errors.first('Common Name')}}</label>
                    <div>
                        <label class="strongFont">Quantity</label>
                        <input type="text" v-model="quantity" name="Quantity" v-validate="{required: true, numeric: true, min_value: 1, max_value: 99}"  :class="{'error': errors.has('Quantity')}"/>
                    </div>
                    <label class="errorMessage" v-show="errors.has('Quantity')">{{errors.first('Quantity')}}</label>
                    <div>
                        <div>
                        <label class="strongFont">SMN (Exists</label>
                        <input class="alignChckBx" type="checkbox" v-model="smnExists" @click="toggleExists()"/>)
                        </div>
                        <input v-model="SMN" :disabled="smnExists != true" type="text" name="SMN" v-validate="smnExists ? {required: true} : ''"  :class="smnExists ? {'error': errors.has('SMN')} : ''"/>
                    </div>
                    <label class="errorMessage" v-show="smnExists ? errors.has('SMN') : false">{{errors.first('SMN')}}</label>
                    <div>
                        <label class="strongFont">Vendor Name</label>
                        <input v-model="vendorName" type="text" name="Vendor Name" v-validate="{required: true}"  :class="{'error': errors.has('Vendor Name')}"/>
                    </div>
                    <label class="errorMessage" v-show="errors.has('Vendor Name')">{{errors.first('Vendor Name')}}</label>
                    <div>
                        <label class="strongFont">Vendor Catalog Number</label>
                        <input v-model="vendorCatNumber" type="text" name="Vendor Catalog Number" v-validate="{required: true}"  :class="{'error': errors.has('Vendor Catalog Number')}"/>
                    </div>
                    <label class="errorMessage" v-show="errors.has('Vendor Catalog Number')">{{errors.first('Vendor Catalog Number')}}</label>
                    <div>
                        <label class="strongFont">Lot Number</label>
                        <input v-model="lotNumber" type="text" name="Lot Number" v-validate="{required: true}"  :class="{'error': errors.has('Lot Number')}"/>
                    </div>
                    <label class="errorMessage" v-show="errors.has('Lot Number')">{{errors.first('Lot Number')}}</label>
                    <div>
                        <label class="strongFont">Received Date</label>
                        <flat-pickr autocomplete="off" placeholder="Select a Date" :config="receiveDatePickerConfig" v-model="receivedDate" name="Received Date" v-validate="{required: true, date_format:'MM/DD/YYYY'}"  :class="{'error': errors.has('Received Date')}"></flat-pickr>
                    </div>
                    <label class="errorMessage" v-show="errors.has('Received Date')">{{errors.first('Received Date')}}</label>
                    <div>
                        <label class="strongFont">Expiration Date</label>
                        <flat-pickr autocomplete="off" placeholder="Select a Date" :config="expireDatePickerConfig" v-model="expireDate" name="Expiration Date" v-validate="'required|date_format:MM/DD/YYYY|after:Received Date,true'"  :class="{'error': errors.has('Expiration Date')}"></flat-pickr>
                    </div>
                    <label class="errorMessage" v-show="errors.has('Expiration Date')">{{errors.first('Expiration Date')}}</label>
                    <div>
                        <label class="strongFont">Project Code</label>
                        <input v-model="projectCode" type="text" name="Project Code"  :class="{'error': errors.has('Project Code')}"/>
                    </div>
                    <label class="errorMessage" v-show="errors.has('Project Code')">{{errors.first('Project Code')}}</label>
                    <div>
                        <label class="strongFont">Storage Temperature</label>
                        <select class="dropDownEdges dropDown" v-model="storageTemp" type="text" name="Storage Temperature"  :class="{'error': errors.has('Storage Temperature')}">
                            <option disabled hidden value="">Select Temperature Zone</option>
                            <option v-for="tempZone in tempZones" :value="tempZone.storage_temperature">{{tempZone.storage_temperature}}</option>
                        </select>
                    </div>
                    <label class="errorMessage" v-show="errors.has('Storage Temperature')">{{errors.first('Storage Temperature')}}</label>
                    <div>
                        <label class="strongFont">Location</label>
                        <select class="dropDownEdges dropDown" v-model="location" name="Location"  :class="{'error': errors.has('Location')}">
                            <option disabled hidden value="">Select Storage Location</option>
                            <option v-for="location in locations" :value="location.location">{{location.location}}</option>
                        </select>
                    </div>
                    <label class="errorMessage" v-show="errors.has('Location')">{{errors.first('Location')}}</label>
                    <div>
                        <button class="submitNewChemical">Submit</button>
                    </div>
                    <div class="modal-container" :class="{alertToFront: this.displayNewBarcodes}">
                        <AlertMessage @submitClose="handleClose" v-if="this.displayNewBarcodes" :inputData="this.barcodeArrayResponse" :messageText="'New barcodes can only be viewed now, please take note of the following generated barcodes:'"></AlertMessage>
                    </div>
                </form>
            </div>
        </div>
        <div v-else class="card">
            <label >You must be logged in to view this page</label>
        </div>
    </div>
</template>


<script>
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import 'flatpickr/dist/themes/material_blue.css';
    import AlertMessage from '../components/AlertMessage.vue';
    import AutoComplete from '../components/AutoComplete';
    export default {
        name: 'AddChemical',
        components : {
            flatPickr,
            AlertMessage,
            AutoComplete
        },
        methods: {
            getAutoCompleteData: function(inputData) {
                var result = [];
                for (var i=0; i < inputData.length; i++) {
                    result.push( {key: inputData[i].name.toString()});
                }
                return result;
            },
            handleOptionClicked: function() {
                return;
            },
            updateSearchTerm: function(newKeyWord) {
                this.searchTerm = newKeyWord;
            },
            handleClose: function() {
                this.displayNewBarcodes = false;
            },
            toggleExists: function() {
                if (this.smnExists)
                    this.SMN = "";
                else
                    this.SMN = "Unassigned";
            },
            submitNewChemicalFormClicked: function(e) {
                //format form data into json object
                this.barcodeArrayResponse = [];
                var formSubmitted = false;
                this.$validator.validateAll().then( (result) => {
                    if (result) {
                        var chemical = {
                            chemical_name: this.chemName,
                            common_name: this.commonName,
                            siemens_material_number: this.SMN,
                            vendor_name: this.vendorName,
                            vendor_catalog_number: this.vendorCatNumber,
                            lot_number: this.lotNumber,
                            receive_date: this.receivedDate,
                            expiration_date: this.expireDate,
                            project_code: this.projectCode,
                            storage_temperature: this.storageTemp,
                            location: this.location
                        };
                        var arr = [];
                        for (var i=0; i < this.quantity; i++) {
                            arr.push(chemical);
                        }
                        //e.target.submit(); use this to programmatically submit form
                        //this.$refs.newChemicalForm.submit();
                        /*async () => {for (var i=1; i<=this.quantity; i++) {
                            await this.$store.dispatch('addNewChemical', arr);
                        }}*/
                        var chemNameHolder = this.chemName;
                        this.$store.dispatch('addNewChemical', arr)
                        .then(response => {
                            var alertText = "";
                            for (var i=0; i < response.length; i++) {
                                alertText += 'Barcode: ' + response[i].barcode + '\n';
                                this.barcodeArrayResponse.push(response[i].barcode);
                            }
                            //alert("Successfully Added " + this.chemName)
                            this.displayNewBarcodes = true;
                            this.$store.dispatch('setChemicals');
                            //alert('The new barcodes for ' + chemNameHolder + '\n' + alertText)
                        })
                        .catch(function(error) {
                            console.log(error)
                        });
                        formSubmitted = true;
                        //alert("Successfully Added " + this.chemName)
                        this.chemName = '';
                        this.commonName = '';
                        this.SMN = '';
                        this.vendorName = '';
                        this.vendorCatNumber = '';
                        this.lotNumber = '';
                        this.receivedDate = '';
                        this.expireDate = '';
                        this.projectCode = '';
                        this.storageTemp = '';
                        this.location = '';
                        this.quantity = 1;
                    } 
                } )
                .catch(function(error) {

                })
                .then(() => {
                    if (formSubmitted) {
                        this.$validator.reset();
                        return;
                    } else {
                        //alert("correct errors");
                    }

                })
                .catch(function(error) {

                });
            },
        },
        computed: {
            chemicalsWithNoDuplicates: function() {
                var items = this.$store.getters.chemicals;
                
                var lookup = {};
                var result = [];
                for (var item, i=0; item=items[i++];) {
                    var key = item.chemical_name.toLowerCase();
                    if (typeof key != "undefined" & !(key in lookup)) {
                        lookup[key]=1;
                        result.push({name: key, quantity: items.filter(i => i.chemical_name.toLowerCase() === key).length, displayDetails: false});
                    }
                }
                return result;
            },
            locations: function() {
                return this.$store.getters.locations;
            },
            tempZones: function() {
                return this.$store.getters.tempZones;
            },
            isUserLoggedin: function() {
                var user = this.$store.getters.activeUser;
                if (typeof user.username == 'undefined' || user.username == "")
                    return false;
                return true;
            }
        },
        created: function() {
            this.$store.dispatch('setLocations');
            this.$store.dispatch('setTempZones');
            this.$store.dispatch('setChemicals');
            //add to update chemicals this.$store.dispatch('');
        },
        data() {
            return {
                chemName: '',
                commonName: '',
                SMN: '',
                vendorName: '',
                vendorCatNumber: '',
                lotNumber: '',
                receivedDate: '',
                expireDate: '',
                projectCode: '',
                storageTemp: '',
                location: '',
                quantity: 1,
                expireDatePickerConfig: {
                    wrap: false,
                    dateFormat: 'm/d/Y',
                    minDate: "today",
                    allowInput: false
                },
                receiveDatePickerConfig: {
                    wrap: false,
                    dateFormat: 'm/d/Y',
                    maxDate: "today",
                    allowInput: false
                },
                barcodeArrayResponse: [],
                displayNewBarcodes: false,
                smnExists: true
            }
        }
    }

</script>


<style scoped>
    * {
        font-family: 'Open Sans', sans-serif;
    }
    .addChemForm {
        display: flex;
        flex-flow: column;
        margin-left: auto;
        margin-right: auto;    
        justify-content: space-between;
        width: 400px;    
    }
    .addChemForm > div {
        margin-bottom: 10px;
        display: flex;
        flex-flow: row;
        justify-content: space-between;    
    }
    .addChemForm > div > label {
        margin-right: 15px;
    }
    .submitNewChemical {
        border-radius: 5px;
        padding: 3px 25px 3px 25px;
        cursor: pointer;
        color: #fff;
        background-color: #00A6FF;
        border: 1px solid #fff;
        transition-duration: 0.5s;
        -webkit-transition-duration: 0.5s;
        -moz-transition-duration: 0.5s;
        outline: none;
        width: 100px;
        margin-right: auto;
        margin-left: auto;
        
    }
    .submitNewChemical:hover {
        color: #006398;
        opacity: 0.8;
        border: 1px solid #006398;
    }
    .error {
        border-color: red;
    }
    .errorMessage {
        color: #CC414B;
        margin-top: -8px;
        margin-bottom: 5px;
        font-size: 1em;
        font-weight: bold;
    }
    .dropDownEdges:hover {
        border-radius: 5px 5px 0px 0px;
    }
    .dropDown {
        width: 173px;
        outline: none;
    }
    .strongFont {
        font-weight: bold;
    }
    
    .modal-container {
        position: fixed;
        height: 100%;
        width: 100%;
        top: 40px;
        left: 0;
        z-index: -1;
        background-color: transparent;
        
    }
    .alertToFront {
        z-index: 99999 !important;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .5s ease;
    }
    .alertMsg {
        z-index: 99999999;
    }
    .alignChckBx {
        vertical-align: top;
    }
    .card {
        width: 450px;
        height: 100%;
        margin: auto;
        background-color: rgb(56, 56, 56);
        color: white;
        border-radius: 10px;
        box-shadow: 1px 2px 10px 0px rgba(0,0,0,0.3);
    }
    .innerCard {
        margin: 20px;
    }
    .pageHeader {
        padding-top: 25px;
    }
    .dont-break-out {

        /* These are technically the same, but use both */
        overflow-wrap: break-word;
        word-wrap: break-word;

        -ms-word-break: break-all;
        /* This is the dangerous one in WebKit, as it breaks things wherever */
        word-break: break-all;
        /* Instead use this non-standard one: */
        word-break: break-word;

        /* Adds a hyphen where the word breaks, if supported (No Blink) */
        -ms-hyphens: auto;
        -moz-hyphens: auto;
        -webkit-hyphens: auto;
        hyphens: auto;

    }
</style>