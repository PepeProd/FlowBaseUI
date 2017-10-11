<template>
    <nav>
        <ul>
            <li><router-link to="/">Overview</router-link></li>
            <li v-if="isLogIn"><router-link to="/addChem">Add Chemical</router-link></li>
            <li><router-link to="/disposal">Disposal</router-link></li>
            <li><router-link to="/dispRecords">Disposal Records</router-link></li>
            <li v-if="isLogIn"><router-link to="/siteSettings">Site Settings</router-link></li>
            <button id="btnChangeLogState" @click="changeLogState()">Login</button>
        </ul>
        
    </nav>
</template>

<script>
    export default {
        props: ['isLoggedIn'],
        data() {
            return {
                isLogIn: this.isLoggedIn
            }
        },
        methods: {
            changeLogState: function() {
                this.isLogIn = !this.isLogIn
            }
        }
    }
</script>
<style scoped>
    nav {
        background-color: grey;
        margin: 0;
        padding: 0;
        top: 0;
        font-size: 15px;
        overflow: hidden;
        text-decoration: none;
        position: fixed;
        width: 100%;
    }
    nav ul {
        margin: 0;
        padding: 0;
        height: 45px;
    }
    nav ul li {
        display: inline-block;
        list-style-type: none;
        border-bottom: 5px solid transparent;
        
    }
    nav li:hover {
        border-color: #00A6FF;
    }
    nav > ul > li > a {
        color: white;        
        display: block;
        padding: 0.85em 0.25em 0em 0.25em;
        text-decoration: none;
    }
    nav button {
        float: right;
        margin: 0.85em 5em 0em 0.25em;
    }
    .hide {
        display: none;
    }
    
</style>