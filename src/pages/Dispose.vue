<template>
    <div>
        <div class="searchStyle">
            <label  class="alignTop">Enter Barcodes To Dispose</label>
            <!--<input v-model="barcodesRaw" type="text" />-->
            <textarea class="alignTop" cols="13" rows="10"  v-model="barcodesRaw"></textarea>
            <button  class="alignTop" v-on:click="setProcessedBarcodes()">Review</button>
        </div>
        <div>
            <div class="chemicalPreviewContainer" v-for="chemical in getChemicalByProcessedBarcodes()">
                <div class="chemicalPreview">
                    <label  v-for="(propertyValue, key) in chemical"> {{capitalizeFirstLetter(key)}}: {{propertyValue}} </label>
                    <button v-on:click="removeChemicalFromPreviewByProcessedBarcode(chemical.barcode)">X</button>
                </div>
            </div>
            <button v-on:click="disposeChemicals">Dispose all</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Dispose',
        data() {
            return {
                barcodesRaw: '',
                barcodesProcessList: []
            }
        },
        computed: {
        },
        methods: {
            //Transform raw string into array of barcodes
            setProcessedBarcodes: function() {
                if (this.barcodesRaw != "") {
                    //this.barcodesProcessList = this.barcodesRaw.split(' '); //for input text
                    //for textarea
                    this.barcodesProcessList = this.barcodesRaw.replace( /\n/g, " " ).split( " " )

                }
                else {
                    //error handling to alert user that no barcodes entered
                }
            },
            //get array of chemicals based off of barcodes
            getChemicalByProcessedBarcodes: function() {
                var result = []
                for(var i=0; i<this.barcodesProcessList.length; i++) {
                    var chemical = this.$store.getters.findChemicalByBarcode(this.barcodesProcessList[i]);
                    if (typeof chemical != "undefined") {
                        result.push(chemical);
                    }
                    else {
                        //error handling to alert user that barcode not found
                    }
                }
                return result;
            },
            //remove chemical from dispose selection
            removeChemicalFromPreviewByProcessedBarcode: function(barcode) {
                for(var i=0; i < this.barcodesProcessList.length; i++) {
                    if ((this.barcodesProcessList[i]).toString() === barcode.toString()) {
                        this.barcodesProcessList.splice(i, 1);
                    }
                }                
            },
            disposeChemicals: function() {
                var result = ''
                for(var i=0; i<this.barcodesProcessList.length; i++) {
                    result += this.barcodesProcessList[i].toString() + ' ';
                }
                alert(result);
            },
            capitalizeFirstLetter: function(word) {
                return word.split('_').join(' ').toLowerCase().replace(/(^| )(\w)/g, s => s.toUpperCase());
            },
            
        },
    }
</script>

<style scoped>
.chemicalPreviewContainer {
    box-sizing: border-box;
    display: flex;
    flex-flow: row;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    list-style: none;
    justify-content: center;
}
.chemicalPreview  {
    margin-bottom: 5px;
    box-sizing: border-box;
}
.searchStyle {
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    flex-wrap: wrap;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
}
.alignTop {
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5px;
    justify-content: center;
    display: flex;
    flex: 1 0 auto;
}
</style>