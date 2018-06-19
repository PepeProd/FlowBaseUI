<template>
    <div>
        <div v-if="isUserLoggedin">
            <h2>FlowBase Sitewide Configuration</h2>
            <div >
                <label>Current Temperature Zones</label>
                <img class="iconDisplay" :class="{iconDisplayActive : this.displayTemp}" src="../assets/chevron_blue.svg" 
                @click="displayTemp = !displayTemp"/>
                <div v-show="this.displayTemp" class="tempContainer">
                    <div>
                        <input v-model="newTemp" type="text"/>
                        <button class="submitBtn" @click="handleTempSubmitClicked()">Add</button>
                    </div>
                    <div class="bottomHalf">
                        <select v-model="selectedTemp">
                            <option disabled hidden value="">Select Temperature Zone</option>
                            <option v-for="tempZone in tempZones" :value="tempZone.storage_temperature">{{tempZone.storage_temperature}}</option>
                        </select>
                        <button class="removeBtn" @click="handleTempDeleteClicked()">Remove</button>
                    </div>
                    <div v-show="this.displayTempErrorBarcodes == true">
                        <label>The following chemicals prevent deletion of the selected item</label>
                        <li  v-for="chemical in this.tempError"> 
                            {{chemical['chemical_name']}} (Barcode: {{chemical.barcode}})
                        </li>
                    </div>
                </div>
            </div>
            <div class="outerLocContainer">
                <label>Current Locations</label>
                <img class="iconDisplay" :class="{iconDisplayActive : this.displayLocation}" src="../assets/chevron_blue.svg" 
                    @click="displayLocation = !displayLocation"/>
                <div v-show="this.displayLocation" class="locContainer">
                    <div>
                        <input v-model="newLocation" type="text"/>
                        <button class="submitBtn" @click="handleLocSubmitClicked()">Add</button>
                    </div>
                    <div class="bottomHalf">
                        <select v-model="selectedLocation">
                            <option disabled hidden value="">Select Storage Location</option>
                            <option v-for="location in locations" :value="location.location">{{location.location}}</option>
                        </select>
                        <button class="removeBtn" @click="handleLocDeletedClicked()">Remove</button>
                    </div>
                    <div v-if="displayLocErrorBarcodes == true">
                        <label>The following chemicals prevent deletion of the selected item</label>
                        <li  v-for="chemical in this.locError"> 
                            {{chemical['chemical_name']}} (Barcode: {{chemical.barcode}})
                        </li>
                    </div>
                </div>
            </div>
            <!--<div>
                <button class="submitBtn">Download Active Chemicals</button>
                <button class="submitBtn">Download Expired Chemicals</button>
            </div>-->
        </div>
        <div v-else>
            <label>You must be logged in to view this page</label>
        </div>
    </div>

</template>


<script>
    import DynamicTable from '../components/DynamicTable.vue';
    export default {
        name: 'SiteSettings',
        data() {
            return {
                displayTemp: false,
                displayLocation: false,
                selectedTemp: "",
                selectedLocation: "",
                newTemp: "",
                newLocation: "",
                hasErrorTemp: false,
                tempError: [],
                hasErrorLoc: false,
                locError: []
            }
        },
        components: {
            DynamicTable,
        },
        created: function() {
            this.$store.dispatch('setLocations');
            this.$store.dispatch('setTempZones');
        },
        computed: {
            locations: function() {
                return this.$store.getters.locations;
            },
            tempZones: function() {
                return this.$store.getters.tempZones;
            },
            displayTempErrorBarcodes: function() {
                return this.hasErrorTemp;
            },
            displayLocErrorBarcodes: function() {
                return this.hasErrorLoc;
            },
            isUserLoggedin: function() {
                var user = this.$store.getters.activeUser;
                if (typeof user.username == 'undefined' || user.username == "")
                    return false;
                return true;
            }
        },
        methods: {
            handleTempSubmitClicked: function() {
                var container = [];
                var newTempZone = {
                    storage_temperature: this.newTemp
                }
                container.push(newTempZone);
                this.$store.dispatch('addTempZone', container)
                .then(response => {
                    this.newTemp = "";
                })
                .catch (function(error) {

                });
            },
            handleLocSubmitClicked: function() {
                var container = [];
                var location = {
                    location: this.newLocation
                }
                container.push(location);
                this.$store.dispatch('addLocation', container)
                .then(response => {
                    this.newLocation = "";
                })
                .catch (function(error) {

                });
            },
            handleTempDeleteClicked: function() {
                var dtoTemp = {
                    storage_temperature: this.selectedTemp
                }
                this.$store.dispatch('deleteTempZone', dtoTemp)
                .then(response => {
                    console.log(response.hasOwnProperty('fail'))
                    if (response.hasOwnProperty('fail')) {
                        this.hasErrorTemp = true;
                        this.tempError = response.fail;
                    }
                    else {
                        this.hasErrorTemp = false;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            },
            handleLocDeletedClicked: function() {
                var dtoLocation = {location: this.selectedLocation};
                this.$store.dispatch('deleteLocation', dtoLocation)
                .then(response => {
                    if (response.hasOwnProperty('fail')) {
                        this.hasErrorLoc = true;
                        this.locError = response.fail;
                    }
                    else {
                        this.hasErrorLoc = false;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>
    .iconDisplay {
        display: inline;
        width: 15px;
        cursor: pointer;
    }
    .iconDisplayActive {
        transform: rotate(90deg);
    }
    .submitBtn {
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
    .submitBtn:hover {
        color: #006398;
        opacity: 0.8;
        border: 1px solid #006398;
    }
    .removeBtn {
        border-radius: 5px;
        padding: 3px 25px 3px 25px;
        cursor: pointer;
        color: black;
        background-color: red;
        border: 1px solid #fff;
        transition-duration: 0.5s;
        -webkit-transition-duration: 0.5s;
        -moz-transition-duration: 0.5s;
        outline: none;
        width: 100px;
        margin-right: auto;
        margin-left: auto;
        
    }
    .removeBtn:hover {
        color: #006398;
        opacity: 0.8;
        border: 1px solid #006398;
    }
    .outerLocContainer {
        margin-top: 20px;
    }
    .bottomHalf {
        margin-top: 5px;
    }
</style>