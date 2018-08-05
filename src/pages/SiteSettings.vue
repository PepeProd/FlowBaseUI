<template>
    <div>
        <div class="cardContainer">
            <div class="innerCardContainer" v-if="isUserLoggedin">
                <h2 class="pageHeader">FlowBase Sitewide Configuration</h2>
                <div >
                    <h5>Proceed with caution. Changes may be permanent!</h5>
                    <label><strong>Manage Users</strong></label>
                    <img class="iconDisplay" :class="{iconDisplayActive : this.displayManageUser}" src="../assets/chevron_blue.svg" 
                    @click="displayManageUser = !displayManageUser"/>
                    <div v-show="this.displayManageUser" class="manageUsersContainer">
                        <div >
                            <h4>Authorized User Emails</h4>
                            <div>
                                <label >New Email:</label>
                                <input v-model="newWhitelistEmail" type="text" name="Email" v-validate="'required|email'"  :class="{'error': errors.has('Email')}"></input>
                                <label class="errorMessage" v-show="errors.has('Email')">{{errors.first('Email')}}</label>
                                <button class="btnOK addEmailSubmit"@click="handleNewWhitelistEmail()" >Submit</button>
                            </div>
                            <div>
                                <div v-for="emailItem in whitelistEmails">
                                    <div class="bottomMargin">
                                        <label>{{emailItem.email}}</label>
                                        <button @click="handleResendCode(emailItem.email)" class="btnResendCode">Resend Code</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4>Remove Active User</h4>
                            <div class="removeUserItem" v-for="user in activeUsers">
                                <div class="actUserContainer manageUsersContainer">
                                    <div class="actUserItem">
                                        <label>Username: {{user.username}}</label><label> email: {{user.email}}</label>
                                    <button class="btnOK" @click="handleUserDelete(user)">X</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="outerLocContainer">
                    <label><strong>Current Temperature Zones</strong></label>
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
                            <div class="chemicalsPrevent">
                                <div  v-for="chemical in this.tempError"> 
                                    <div class="card"><div class="cardInner dont-break-out">{{chemical['chemical_name']}} (Barcode: {{chemical.barcode}})</div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="outerLocContainer">
                    <label><strong>Current Locations</strong></label>
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
                            <div class="chemicalsPrevent">
                                <div  v-for="chemical in this.locError"> 
                                    <div class="card"><div class="cardInner dont-break-out">{{chemical['chemical_name']}} <div>(Barcode: {{chemical.barcode}})</div></div></div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="modal-container" :class="{alertToFront: this.displayUpdate}">
                    <AlertMessage @submitClose="handleClose" v-if="this.displayUpdate"  :messageText="this.updateText"></AlertMessage>
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
    </div>

</template>


<script>
    import DynamicTable from '../components/DynamicTable.vue';
    import AlertMessage from '../components/AlertMessage.vue';
    export default {
        name: 'SiteSettings',
        data() {
            return {
                displayTemp: false,
                displayLocation: false,
                displayManageUser: false,
                selectedTemp: "",
                selectedLocation: "",
                newTemp: "",
                newLocation: "",
                hasErrorTemp: false,
                tempError: [],
                hasErrorLoc: false,
                locError: [],
                displayUpdate: false,
                updateText: "",
                newWhitelistEmail: ""
            }
        },
        components: {
            DynamicTable,
            AlertMessage
        },
        created: function() {
            this.$store.dispatch('setUsers');
            this.$store.dispatch('setWhiteListEmails');
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
            },
            activeUsers: function() {
                return this.$store.getters.users;
            },
            whitelistEmails: function() {
                return this.$store.getters.whitelistEmails;
            }
        },
        methods: {
            handleNewWhitelistEmail: function() {
                var emailForRegistrationCode = { email: this.newWhitelistEmail}
                alert("test");
                this.$store.dispatch('handleNewUserEmail', emailForRegistrationCode)
                .then(response => {
                    console.log(response);
                    if (response) {
                        this.$store.dispatch('resendRegistrationCode', emailForRegistrationCode)
                                    .then(response => {
                                        if (response) {
                                            this.updateText = "Successfully emailed registration code";
                                        } else {
                                            this.updateText = "Registered email, but failed to send registration code";
                                        }
                                        this.displayUpdate=true;
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })
                    } else {
                        this.updateText = "Failed to add new email for registration";
                        this.displayUpdate = true;
                    }
                })
                .catch(error => {

                });
            },
            handleClose: function() {
                this.displayUpdate = false;
            },
            handleResendCode: function(userEmail) {
                var userWithRegistrationCode = { email: userEmail}
                this.$store.dispatch('resendRegistrationCode', userWithRegistrationCode)
                    .then(response => {
                        if (response) {
                            this.updateText = "Successfully emailed registration code";
                        } else {
                            this.updateText = "Failed to resend registration code";
                        }
                        this.displayUpdate=true;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            handleUserDelete: function(user) {
                this.$store.dispatch('removeUser', user)
                .then(response => {
                    console.log(response);
                    if (response) {
                        this.updateText = "Successfully removed User: " + user.username;
                    } else {
                        this.updateText = "Failed to remove User: " + user.username;
                    }
                    this.displayUpdate = true;
                })
                .catch();
            },
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
    .chemicalsPrevent {
        display: flex;
        flex-flow: row wrap;
        margin-left: auto;
        margin-right: auto;
        justify-content: center;
        width: 100%;
        margin-bottom: 15px;
    }
    .card {
        height: 150px;
        width: 175px;
        min-width: 150px;
        border: 3px solid #4CB6DE;
        background-color: #4CB6DE;
        margin: 10px 10px;
        display: flex;
        flex-direction: column;
        align-content: center;
        border-radius: 10px;
        box-shadow: 1px 2px 10px 0px rgba(0,0,0,0.3);
    }
    .card:hover {
        opacity: 0.5;
    }
    .cardInner {
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 15px;
        margin-right: 15px;
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

    .btnResendCode {
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
        width: 125px;
        margin-left: auto;
        margin-right: auto;

    }
      .btnResendCode:hover {
        color: rgb(56,56,56);
        opacity: 0.8;
        border: 1px solid rgb(56,56,56);
    }

    .removeUserItem {
        margin-bottom: 25px;
    }

    .bottomMargin {
        margin-bottom: 15px;
    }

    .cardContainer {
        width: 750px;
        height: 100%;
        margin-left: auto;
        margin-right: auto;
        background-color: rgb(56, 56, 56);
        color: white;
        border-radius: 10px;
        box-shadow: 1px 2px 10px 0px rgba(0,0,0,0.3);
    }
    .innerCardContainer {
        margin: 20px;
    }
    .pageHeader {
        padding-top: 25px;
    }
    .error {
        border-color: red;
    }
    .errorMessage {
        color: red !important;
        margin-top: -10px;
        margin-bottom: 8px;
        font-size: 0.8em !important;
        text-transform: none !important;
        font-weight: normal !important;
    }
    .actUserContainer {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 10px;
    }
    .actUserItem {
        display: flex; 
        flex-direction: column;
    }
    .addEmailSubmit {
        display: flex;
        justify-content: center;
        margin-top: 10px;
        margin-bottom: 30px;
    }
    .manageUsersContainer {
        border: 3px solid white;
        padding: 15px;
    }
</style>