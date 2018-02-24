<template>
    <div>
        <h2>Add New Chemical</h2>
        <form ref="newChemicalForm" @submit.prevent="submitNewChemicalFormClicked($event)" class="addChemForm">
            <div>
                <label>Chemical Name</label>
                <input v-model="chemName" name="Chemical Name" v-validate="{required: true}" type="text" :class="{'error': errors.has('Chemical Name')}"/>
            </div>
            <label class="errorMessage" v-show="errors.has('Chemical Name')">{{errors.first('Chemical Name')}}</label>
            <div>
                <label>Common Name</label>
                <input type="text" v-model="commonName" name="Common Name" v-validate="{required: true}"  :class="{'error': errors.has('Common Name')}"/>
            </div>
            <label class="errorMessage" v-show="errors.has('Common Name')">{{errors.first('Common Name')}}</label>
            <div>
                <label>Quantity</label>
                <input type="text" v-model="quantity" name="Quantity" v-validate="{required: true, numeric: true, min_value: 1, max_value: 99}"  :class="{'error': errors.has('Quantity')}"/>
            </div>
            <label class="errorMessage" v-show="errors.has('Quantity')">{{errors.first('Quantity')}}</label>
            <div>
                <label>SMN</label>
                <input v-model="SMN" type="text" name="SMN" v-validate="{required: true}"  :class="{'error': errors.has('SMN')}"/>
            </div>
            <label class="errorMessage" v-show="errors.has('SMN')">{{errors.first('SMN')}}</label>
            <div>
                <label>Vendor Name</label>
                <input v-model="vendorName" type="text" name="Vendor Name" v-validate="{required: true}"  :class="{'error': errors.has('Vendor Name')}"/>
            </div>
            <label class="errorMessage" v-show="errors.has('Vendor Name')">{{errors.first('Vendor Name')}}</label>
            <div>
                <label>Vendor Catalog Number</label>
                <input v-model="vendorCatNumber" type="text" name="Vendor Catalog Number" v-validate="{required: true}"  :class="{'error': errors.has('Vendor Catalog Number')}"/>
            </div>
            <label class="errorMessage" v-show="errors.has('Vendor Catalog Number')">{{errors.first('Vendor Catalog Number')}}</label>
            <div>
                <label>Lot Number</label>
                <input v-model="lotNumber" type="text" name="Lot Number" v-validate="{required: true}"  :class="{'error': errors.has('Lot Number')}"/>
            </div>
            <label class="errorMessage" v-show="errors.has('Lot Number')">{{errors.first('Lot Number')}}</label>
            <div>
                <label>Received Date</label>
                <flat-pickr placeholder="Select a Date" :config="receiveDatePickerConfig" v-model="receivedDate" name="Received Date" v-validate="{required: true, date_format:'MM/DD/YYYY'}"  :class="{'error': errors.has('Received Date')}"></flat-pickr>
            </div>
            <label class="errorMessage" v-show="errors.has('Received Date')">{{errors.first('Received Date')}}</label>
            <div>
                <label>Expiration Date</label>
                <flat-pickr placeholder="Select a Date" :config="expireDatePickerConfig" v-model="expireDate" name="Expiration Date" v-validate="'required|date_format:MM/DD/YYYY|after:Received Date,true'"  :class="{'error': errors.has('Expiration Date')}"></flat-pickr>
            </div>
            <label class="errorMessage" v-show="errors.has('Expiration Date')">{{errors.first('Expiration Date')}}</label>
            <div>
                <label>Project Code</label>
                <input v-model="projectCode" type="text" name="Project Code" v-validate="{required: true}"  :class="{'error': errors.has('Project Code')}"/>
            </div>
            <label class="errorMessage" v-show="errors.has('Project Code')">{{errors.first('Project Code')}}</label>
            <div>
                <label>Storage Temperature</label>
                <select class="dropDownEdges dropDown" v-model="storageTemp" type="text" name="Storage Temperature" v-validate="{required: true}"  :class="{'error': errors.has('Storage Temperature')}">
                    <option disabled hidden value="">Select Temperature Zone</option>
                    <option v-for="tempZone in tempZones" :value="tempZone">{{tempZone}}</option>
                </select>
            </div>
            <label class="errorMessage" v-show="errors.has('Storage Temperature')">{{errors.first('Storage Temperature')}}</label>
            <div>
                <label>Location</label>
                <select class="dropDownEdges dropDown" v-model="location" name="Location" v-validate="{required: true}"  :class="{'error': errors.has('Location')}">
                    <option disabled hidden value="">Select Storage Location</option>
                    <option v-for="location in locations" :value="location">{{location}}</option>
                </select>
            </div>
            <label class="errorMessage" v-show="errors.has('Location')">{{errors.first('Location')}}</label>
            <div>
                <button class="submitNewChemical">Submit</button>
            </div>
        </form>
    </div>
</template>


<script>
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import 'flatpickr/dist/themes/material_blue.css';
    export default {
        name: 'AddChemical',
        components : {
            flatPickr
        },
        methods: {
            submitNewChemicalFormClicked: function(e) {
                //format form data into json object
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
                        this.$store.dispatch('addNewChemical', arr);
                        formSubmitted = true;
                        alert("Successfully Added " + this.chemName)
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
                        alert("correct errors");
                    }

                })
                .catch(function(error) {

                });
            },
        },
        computed: {
            locations: function() {
                var locations = []; //implement api to get locations, vuex access throughg getters
                locations.push("Lab 1");
                locations.push("Lab 2");
                locations.push("Lab 3");
                return locations;
            },
            tempZones: function() {
                var tempZones = []; //implement api to get locations, vuex access throughg getters
                tempZones.push("RT");
                tempZones.push("2-8C");
                tempZones.push("-20C");
                tempZones.push("-80C");
                return tempZones;
            }
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
                    minDate: "today"
                },
                receiveDatePickerConfig: {
                    wrap: false,
                    dateFormat: 'm/d/Y',
                    maxDate: "today"
                }
            }
        }
    }

</script>


<style scoped>
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
        color: red;
        margin-top: -8px;
        margin-bottom: 5px;
        font-size: 0.8em;
    }
    .dropDownEdges:hover {
        border-radius: 5px 5px 0px 0px;
    }
    .dropDown {
        width: 173px;
        outline: none;
    }
</style>