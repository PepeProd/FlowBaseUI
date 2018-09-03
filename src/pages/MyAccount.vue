<template>
    <div>
        <div v-if="userInfo" class="accountContainer card">
            <div class="innerCard">
                <h2>My Account</h2>
                <label><strong>Username:</strong> {{userInfo.username}}</label>
                <label class="botMargin"><strong>Email:</strong> {{userInfo.email}}</label>
                <strong><label class="topBotMargin">Change Password</label></strong>
                <div class="spaceBtwn ">
                    <label>Type New Password</label>
                    <input v-model="newPassword1" type="password" name="New Password" v-validate="'required|min:5'"  :class="{'error': errors.has('New Password')}"/>
                </div>
                <label class="errorMessage" v-show="errors.has('New Password')">{{errors.first('New Password')}}</label>

                <div class="spaceBtwn topBotMargin">
                    <label>Confirm New Password</label>
                    <input v-model="newPassword2" type="password" name="Confirm Password" v-validate="'required|min:5'"  :class="{'error': errors.has('Confirm Password')}"></input>
                </div>
                <label class="errorMessage" v-show="errors.has('Confirm Password')">{{errors.first('Confirm Password')}}</label>

                <div><button class="btnSubmit pwTopBotMargin" @click="handleUpdatePassword()">Change</button></div>
                <div class="freqContainer topBotMargin">
                    <strong><label>Current Email Frequency: {{this.userInfo.frequency}}</label></strong>
                        <div>
                            <input v-model="user.frequency" id="daily" type="radio" value="Daily" name="frequency"/>
                            <label for="daily" >Daily</label>
                        </div>
                        <div>
                            <input v-model="user.frequency" id="weekly" type="radio" value="Weekly" name="frequency" />
                            <label for="weekly" >Weekly</label>
                        </div>
                        <div>
                            <input v-model="user.frequency" id="monthly" type="radio" value="Monthly" name="frequency" />
                            <label for="monthly" >Monthly</label>
                        </div>
                </div>
                <div><button class="btnSubmit freqTopBotMargin" @click="handleUpdateFrequency()">Update</button></div>
                <div class="modal-container" :class="{alertToFront: this.displayUpdate}">
                    <AlertMessage @submitClose="handleClose" v-if="this.displayUpdate"  :messageText="this.updateText"></AlertMessage>
                </div>
            </div>
        </div>
        <div v-else>
            You must be logged in to view this page
        </div>
    </div>
</template>

<script>
    import AlertMessage from '../components/AlertMessage';

    export default {
        name: 'MyAccount',
        components: {
            AlertMessage
        },
        data() {
            return {
                newFrequency: '',
                displayUpdate: false,
                updateText: '',
                newPassword1: '',
                newPassword2: '',
                user: {
                    frequency: this.$store.getters.activeUser.frequency
                }
            }
        },
        methods: {
            handleClose: function() {
                this.displayUpdate = false;
            },
            handleUpdateFrequency: function() {
                if (!this.user.frequency){
                    this.updateText = 'Please select a new email frequency!';
                    this.displayUpdate = true;
                    return;
                }
                //console.log(this.userInfo);
                
                /*var user = [this.$store.getters.activeUser, this.newFrequency];
                console.log(this.userInfo);

                var updateUserInfo = {
                    username: this.$store.getters.activeUser.username,
                    notifications: this.$store.getters.activeUser.notifications,
                    email: this.$store.getters.activeUser.email,
                    frequency: this.$store.getters.activeUser.frequency,
                    password: this.newPassword1 
                };*/
                this.user.username= this.$store.getters.activeUser.username,
                this.user.notifications= this.$store.getters.activeUser.notifications,
                this.user.email= this.$store.getters.activeUser.email,
                this.user.frequency= this.user.frequency,
                this.user.password= this.newPassword1

                //user.frequency = this.newFrequency;
                this.$store.dispatch('updateFrequencyUser', this.user)
                .then(response => {
                    if (response) {
                        this.$forceUpdate();
                        this.updateText = 'Successfully updated user email frequency!';
                        this.displayUpdate = true;
                    } else {
                        this.updateText = "Failed to update user email frequency!";
                        this.displayUpdate = true;
                        return;
                    }
                })
                .catch(error => {

                });
                
            },
            handleUpdatePassword: function() {
                this.$validator.validateAll()
                .then( (result) => {
                    var error = false;
                    if (!this.newPassword1 || !this.newPassword2) {
                        this.updateText = 'Please complete the required fields';
                        error = true;
                    }

                    if (this.newPassword1 != this.newPassword2) {
                        this.updateText = 'Try again. The passwords do not match!';
                        error = true;
                    }

                    if (error) {
                        this.displayUpdate = true;
                        return;
                    }

                    var updateUserInfo = {
                        username: this.$store.getters.activeUser.username,
                        notifications: this.$store.getters.activeUser.notifications,
                        email: this.$store.getters.activeUser.email,
                        frequency: this.$store.getters.activeUser.frequency,
                        password: this.newPassword1 
                    };
                    console.log(updateUserInfo);
                    this.$store.dispatch('updateUserPassword', updateUserInfo)
                    .then(response => {
                        if (response) {
                            this.updateText = 'Successfully update user password';
                            this.newPassword1 = '';
                            this.newPassword2 = '';
                        } else {
                            this.updateText = 'Password update failed';
                        }
                        this.displayUpdate = true;
                    });
                })
                .catch(error => {
                    console.log(error);
                    this.updateText = 'Something went wrong';
                    this.displayUpdate = true;
                })
                
            }
        },
        computed: {
            userInfo: function() {
                var user = this.$store.getters.activeUser;
                if (typeof user.username == 'undefined' || user.username == "")
                    return false;
                return user;
            }
        }

    }
</script>

<style scoped>
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
        display: flex;
        flex-direction: column;
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
    .btnSubmit {
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

    }
    .btnSubmit:hover {
        color: #006398;
        opacity: 0.8;
        border: 1px solid #006398;
    }
    .freqContainer {
    }
    .accountContainer {
        display: flex;
        flex-direction: column;
        margin-left: auto;
        margin-right: auto;
        width: 400px;
        margin-top: 30px;
    }
    .topBotMargin {
        margin-top: 10px;
    }
    .pwTopBotMargin {
        margin-top: 10px;
        margin-bottom: 30px;
    }
    .freqTopBotMargin {
        margin-top: 10px;
        margin-bottom: 30px;
    }
    .spaceBtwn {
        display: flex;
        justify-content: space-between;
    }
    .botMargin {
        margin-bottom: 30px;
    }
    .error {
        border-color: red;
    }
    .errorMessage {
        color: red !important;
        margin-top: 0px;
        margin-bottom: 8px;
        font-size: 0.8em !important;
        text-transform: none !important;
        font-weight: normal !important;
    }
</style>