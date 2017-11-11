<template>
    <div>
        <div class="searchStyle">
            <label  class="alignTop lblBarcodeTitle">Enter Barcodes To Dispose</label>
            <!--<input v-model="barcodesRaw" type="text" />-->
            <textarea class="alignTop textArea" cols="13" rows="10"  v-model="barcodesRaw"></textarea>
            <button  class="alignTop" v-on:click="setProcessedBarcodes()">Review Barcodes</button>
        </div>
        <div>
            <div class="chemicalPreviewContainer" v-for="chemical in getChemicalByProcessedBarcodes()">
                <div class="chemicalPreview">
                    <label class="alignLabelToButton"  v-for="(propertyValue, key) in chemical"> {{capitalizeFirstLetter(key)}}: {{propertyValue}} </label>
                    <button v-on:click="removeChemicalFromPreviewByProcessedBarcode(chemical.barcode)">X</button>
                </div>
            </div>
            <button v-on:click="disposeChemicals">Dispose All</button>
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
* {
    font-family: 'Open Sans', sans-serif;
}
.lblBarcodeTitle {
    font-weight: bold;
}
.chemicalPreviewContainer {
    box-sizing: border-box;
    display: flex;
    flex-flow: row;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    justify-content: center;
}
.chemicalPreview  {
    margin-bottom: 5px;
    box-sizing: border-box;
}
.alignLabelToButton {
    vertical-align: middle;
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
button {
    border-radius: 5px;
    padding: 3px 25px 3px 25px;
    cursor: pointer;
    color: #fff;
    background-color: #00A6FF;
    border: 1px solid #fff;
    transition-duration: 0.5s;
    -webkit-transition-duration: 0.5s;
    -moz-transition-duration: 0.5s;
}
button:hover {
    color: #006398;
    opacity: 0.8;
    border: 1px solid #006398;
}
.textArea {
    resize: none;
}
</style>