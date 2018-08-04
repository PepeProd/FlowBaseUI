<template>
    <div v-if="this.$store.getters.chemicals.length > 0"> <!-- check if with no chemicals if this works" -->
        <div v-show="this.barcodesNotFound.trim().length > 0" class="bannerStyle"><label class="errorMsg"><strong>Barcode(s) Not Found: {{this.barcodesNotFound}}</strong></label></div>
        <div class="searchStyle">
            <label  class="alignTop lblBarcodeTitle">Enter Barcodes To Dispose</label>
            <!--<input v-model="barcodesRaw" type="text" />-->
            <textarea  @keydown.enter="getBarcodes()" class="alignTop textArea" cols="13" rows="10"  v-model="barcodesRaw"></textarea>
            <button  class="alignTop" v-on:click="getBarcodes()">Review Barcodes</button>
        </div>
        <!--<div>
            <div class="chemicalPreviewContainer" v-for="chemical in getChemicalByProcessedBarcodes()">
                <div class="chemicalPreview">
                    <label class="alignLabelToButton"  v-for="(propertyValue, key) in chemical"> {{capitalizeFirstLetter(key)}}: {{propertyValue}} </label>
                    <button v-on:click="removeChemicalFromPreviewByProcessedBarcode(chemical.barcode)">X</button>
                </div>
            </div>
            <button v-show="showDisposeAllButton & this.barcodesList.length > 0" v-on:click="disposeChemicals">Dispose All</button>
        </div>-->
        <DynamicTable v-if="numBarcodes > 0" :rows="getChemicalByProcessedBarcodes()" :columnNames="column_Names" :defaultSort="column_Names[1]" :excludeColumns="getExcludedColumns()">
            <template slot="tableRows" scope="row" >
                <tr>
                    <td  v-for="(col, index) in column_Names" v-if="!(getExcludedColumns().indexOf(col) > -1)">
                        <div v-if="col == 'barcode'"><button v-on:click="removeChemicalFromPreviewByProcessedBarcode(row['barcode'])">X</button>{{row[col]}}</div>
                        <span v-else>{{row[col]}}</span>
                    </td>
                </tr>
            </template>
        </DynamicTable>
        <button v-show="showDisposeAllButton & this.barcodesList.length > 0" v-on:click="disposeChemicals">Dispose All</button>
    </div>
</template>

<script>
    import {stringUtil} from '../mixins/stringUtil';
    import DynamicTable from '../components/DynamicTable.vue';
    export default {
        name: 'Dispose',
        data() {
            return {
                barcodesRaw: '',
                barcodesList: [],
                showDisposeAllButton: false,
                barcodesNotFound: '',
                columns: []
            }
        },
        components: {
            DynamicTable
        },
        mixins: [stringUtil],
        computed: {
            column_Names: function() {
                return Object.keys(this.$store.getters.chemicals[0])
            },
            numBarcodes: function() {
                var count = this.barcodesList.length;

                if (typeof count == "undefined")
                    return 0;

                return count;
            }
        },
        methods: {
            //Transform raw string into array of barcodes
            getBarcodes: function() {
                if (this.barcodesRaw != "") {
                    //this.barcodesList = this.barcodesRaw.split(' '); //for input text
                    //for textarea
                    this.barcodesNotFound = '';
                    this.barcodesList = this.barcodesRaw.replace( /\n/g, " " ).split( " " )
                    this.showDisposeAllButton = true;
                }
                else {
                    //error handling to alert user that no barcodes entered
                    this.barcodesNotFound = '';
                }
            },
            //get array of chemicals based off of barcodes
            getChemicalByProcessedBarcodes: function() {
                var result = []
                for(var i=0; i<this.barcodesList.length; i++) {
                    var chemical = this.$store.getters.findChemicalByBarcode(this.barcodesList[i]);
                    if (typeof chemical != "undefined") {
                        if (result.indexOf(chemical) == -1)
                            result.push(chemical);
                    }
                    else {
                        this.barcodesNotFound += this.barcodesList[i] + " ";
                        this.barcodesList.splice(i,1);
                        i--;
                        //error handling to alert user that barcode not found
                    }
                }
                return result;
            },
            //remove chemical from dispose selection
            removeChemicalFromPreviewByProcessedBarcode: function(barcode) {
                for(var i=0; i < this.barcodesList.length; i++) {
                    if ((this.barcodesList[i]).toString() === barcode.toString()) {
                        this.barcodesList.splice(i, 1);
                    }
                }                
            },
            disposeChemicals: function() {
                if (this.barcodesList.length == 1)
                    this.$store.dispatch('deleteChemicalByBarcodes',this.barcodesList)
                else {
                    var barcodeArr = [];
                    for (var i =0; i < this.barcodesList.length; i++) {
                        barcodeArr.push({barcode: this.barcodesList[i]});
                    }
                    //var listBarcodeObj = {'barcodes': temp};
                    this.$store.dispatch('deleteChemicalByList', barcodeArr);
                }
                for(var i=0; i<this.barcodesList.length; i++) {
                    this.barcodesRaw = this.barcodesRaw.replace(this.barcodesList[i].toString(), '');
                }
                this.barcodesList = [];
                this.barcodesRaw = this.barcodesRaw.replace(/[\r\n]{2,}/g, "\n");
                this.barcodesRaw = this.barcodesRaw.replace(/^\n|\n$/g, '');
                this.showDisposeAllButton = false;
            },
            getExcludedColumns: function() {
                var arr = new Array('id');
                return arr;
            }
        },
    }
</script>

<style scoped>
* {
    font-family: 'Open Sans', sans-serif;
}
.bannerStyle {
    background-color: red;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 5px;
    margin-top: 10px;
}
.lblBarcodeTitle {
    font-weight: bold;
    margin-top: 20px;
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
    outline: none;
    
}
button:hover {
    color: #006398;
    opacity: 0.8;
    border: 1px solid #006398;
}
.textArea {
    resize: none;
}
.errorMsg {
    color: white;
}
</style>