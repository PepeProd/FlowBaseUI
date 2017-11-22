<template>
    <div>
        <h2>Add New Chemical</h2>
        <form @submit.prevent="submitNewChemicalFormClicked()" class="addChemForm">
            <div>
                <label>Chemical Name</label>
                <input v-model="chemName" type="text" />
            </div>
            <div>
                <label>Common Name</label>
                <input v-model="commonName" type="text" />
            </div>
            <div>
                <label>SMN</label>
                <input v-model="SMN" type="text" />
            </div>
            <div>
                <label>Vendor Name</label>
                <input v-model="vendorName" type="text" />
            </div>
            <div>
                <label>Vendor Catalog Number</label>
                <input v-model="vendorCatNumber" type="text" />
            </div>
            <div>
                <label>Lot Number</label>
                <input v-model="lotNumber" type="text" />
            </div>
            <div>
                <label>Received Date</label>
                <flat-pickr placeholder="Select a Date" :config="receiveDatePickerConfig" v-model="receivedDate" ></flat-pickr>
            </div>
            <div>
                <label>Expiration Date</label>
                <flat-pickr placeholder="Select a Date" :config="expireDatePickerConfig" v-model="expireDate"></flat-pickr>
            </div>
            <div>
                <label>Project Code</label>
                <input v-model="projectCode" type="text" />
            </div>
            <div>
                <label>Storage Temperature</label>
                <input v-model="storageTemp" type="text" />
            </div>
            <div>
                <label>Location</label>
                <input v-model="location" type="" />
            </div>
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
            submitNewChemicalFormClicked: function() {
                //format form data into json object
                var chemical = {
                    chemical_name: this.chemName,
                    common_name: this.commonName,
                    siemens_material_number: this.SMN,
                    vendor_name: this.vendorName,
                    vendor_catalog_number: this.vendorCatNumber,
                    lot_number: this.lotNumber,
                    receive_date: this.receivedDate,
                    expiration_date: this.expireDate,
                    project_code: this.project_code,
                    storage_temperature: this.storageTemp,
                    location: this.location
                };
                alert(chemical["receive_date"] + " " + chemical["expiration_date"]);
            },
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
                expireDatePickerConfig: {
                    wrap: false,
                    dateFormat: 'm/d/Y',
                    minDate: new Date(Date.now())
                },
                receiveDatePickerConfig: {
                    wrap: false,
                    dateFormat: 'm/d/Y',
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
</style>