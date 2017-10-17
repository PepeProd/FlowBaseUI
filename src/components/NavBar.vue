<template>
<div v-bind:class="{'modal-mask': (this.isFormActive)}">
    <nav >
        <ul><li><span>FLOWBASE</span></li></ul>
        <ul class="navLinks">
            <li><router-link to="/">Overview</router-link></li>
            <li v-if="this.isLoggedIn"><router-link to="/addChem">Add Chemical</router-link></li>
            <li><router-link to="/disposal">Disposal</router-link></li>
            <li><router-link to="/dispRecords">Disposal Records</router-link></li>
            <li v-if="this.isLoggedIn"><router-link to="/siteSettings">Site Settings</router-link></li>
        </ul>
        <ul>
            <li>
                <button v-if="!this.isLoggedIn" class="btnLog" id="btnChangeLogState" @click="$emit('showLogin', true)"><span>Login</span></button>
                <button v-else class="btnLog" @click="$emit('logOut')"><span>Log Out</span></button>
            </li>
        </ul>
    </nav>
</div>
</template>

<script>
    export default {
        name: 'NavBar',
        props: ['isLoggedIn', 'isFormActive'],
    }
</script>
<style scoped>
    * {
        box-sizing: border-box;
    }
    nav {
        background-color: rgb(56,56,56);
        margin: 0;
        padding: 0;
        left: 0;
        top: 0;
        font-size: 15px;
        overflow: hidden;
        text-decoration: none;
        position: fixed;
        width: 100%;
        display: flex;
        z-index: 9997;
        justify-content: space-between;
    }
    nav ul {
        margin: 0;
        padding: 0;
        height: 45px;
    }
    nav ul li {
        display: inline-block;
        list-style-type: none;
        
    }
    .navLinks > li {
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
    nav > ul > li > span {
        color: white;        
        display: block;
        padding: 0.85em 0.25em 0em 1.25em;
        text-decoration: none;
    }
    nav button {
        /* float: right;*/
        margin: 0.85em 1.25em 0em 0.25em;
    }
    .hide {
        display: none;
    }
    .btnLog {
        border-radius: 5px;
        padding: 3px 25px 3px 25px;
        cursor: pointer;
        color: #fff;
        background-color: #00A6FF;
        font-family: 'Roboto';
        font-weight: 50;
        border: 1px solid #fff;
        transition-duration: 0.5s;
        -webkit-transition-duration: 0.5s;
        -moz-transition-duration: 0.5s;
    }
    .btnLog:hover {
        color: #006398;
        opacity: 0.8;
        border: 1px solid #006398;
    }
    .modal-mask {
        position: fixed;
        z-index: 9996;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s ease;
    }
</style>