<template>
    <div>
        <h2>Add New Chemical</h2>
        <form class="addChemForm">
            <div>
                <label>Chemical Name</label>
                <input type="" />
            </div>
            <div>
                <label>Common Name</label>
                <input type="" />
            </div>
            <div>
                <label>SMN</label>
                <input type="" />
            </div>
            <div>
                <label>Vendor Name</label>
                <input type="" />
            </div>
            <div>
                <label>Vendor Catalog Number</label>
                <input type="" />
            </div>
            <div>
                <label>Lot Number</label>
                <input type="" />
            </div>
            <div>
                <label>Received Date</label>
                <input type="" />
            </div>
            <div>
                <label>Expiration Date</label>
                <input type="" />
            </div>
            <div>
                <label>Project Code</label>
                <input type="" />
            </div>
            <div>
                <label>Storage Temperature</label>
                <input type="" />
            </div>
            <div>
                <label>Location</label>
                <input type="" />
            </div>
            <div>
                <button class="submitNewChemical">Submit</button>
            </div>
        </form>
    </div>
</template>


<script>
    export default {
        name: 'AddChemical'
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