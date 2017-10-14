<template>
    <div>
        <label>UserName</label>
        <input></input>
        
        <label>Password</label>
        <input></input>

        <button>Submit</button>
    </div>
</template>

<script>
    export default {
        name: 'LogIn'
    }    
</script>>

<style scoped>
    div {
        display: flex;
        flex-flow: column wrap;
        width: 300px;
        margin-left: auto;
        margin-right: auto;        
    }
    label, input, button {
        flex: 1 100%;        
    }
    input,button {
        margin-bottom: 15px;
    }
    
</style>