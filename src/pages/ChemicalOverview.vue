<template>
    <div class="chemicalOverview">
        <h1>Chemical Inventory</h1>
        <div class="listContainer">
            <label class="listTitle">Expired Chemicals</label>
            <img class="iconDisplay" :class="{iconDisplayActive : this.displayExpired}" src="../assets/chevron_blue.svg" 
                @click="displayExpired = !displayExpired"/>
            <div v-show="this.displayExpired" class="chemFamilies">
                <div v-for="chem in getExpiredChemicals" class="card" :class="{expired: compareExpired(chem['expiration_date'])}">
                    <div class="cardInner" >
                        <strong><label style="text-decoration: underline;" class="colorWhite" >{{chem["chemical_name"]}}</label></strong>
                        <div> 
                            <label class="listBarcode colorWhite">Barcode: {{chem["barcode"]}}</label>
                        </div>
                        <div>
                            <label class="listExpire colorWhite">Expired On: {{chem["expiration_date"]}}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="{spacingSmall: !this.displayExpired, spacingBig: this.displayExpired}"  class="listContainer">
            <label class="listTitle">Expiring Soon Chemicals</label>
            <img class="iconDisplay" :class="{iconDisplayActive : this.displayExpiringSoon}" src="../assets/chevron_blue.svg" 
                @click="displayExpiringSoon = !displayExpiringSoon"/>
            <div v-show="this.displayExpiringSoon" class="chemFamilies">
                <div v-for="chem in getExpiringSoonChemicals" class="card" :class="{soonColor: compare1DayToExpiration(chem['expiration_date']), soon30Color: compareSoonExpiration(chem['expiration_date'])}">
                    <div class="cardInner">
                        <strong><label style="text-decoration: underline; font-size: 1.25em;" :class="{colorBlack: compareSoonExpiration(chem['expiration_date'])}" class="colorWhite">{{chem["chemical_name"]}}</label></strong>
                        <div> 
                            <label class="listBarcode colorWhite" :class="{colorBlack: compareSoonExpiration(chem['expiration_date'])}">Barcode: {{chem["barcode"]}}</label>
                        </div>
                        <div>
                            <label class="listExpire colorWhite" :class="{colorBlack: compareSoonExpiration(chem['expiration_date'])}">Expires On: {{chem["expiration_date"]}}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <TableSearcher :exceptionToAutoComplete="['quantity']" class="tableSearch" :rows="chemicalsWithNoDuplicates" :columnNames="this.columnsForSearcher" @submitClicked="handleSubmitClicked"></TableSearcher> 
        <div class="chemFamilies">
            <div v-for="chemical in chemicalFamiliesReactiveGetter" >
                <div class="noStyleLink card">
                    <div class="cardInner">
                        <router-link style="width: 125px; color: white;"  class="dont-break-out" :to="{name: 'ChemicalDetails', params: {chemName: chemical.name}}">{{chemical.name}}</router-link>
                        <img class="iconDisplay" :class="{iconDisplayActive : chemical.displayDetails}" src="../assets/chevron_blue.svg" 
                            @click="chemical.displayDetails = !chemical.displayDetails"/>
                        <div class="detailsContainer" :id="chemical.name" v-show="chemical.displayDetails">
                            <div >Quantity: {{chemical.quantity}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TableSearcher from '../components/TableSearcher.vue';
    import {dateComparison} from '../mixins/dateComparison.js';
    export default {
        name: "Overview",
        components: {
            TableSearcher
        },
        mixins: [dateComparison],
        data() {
            return {
                chemicalFamilies: [],
                columnsForSearcher: ['name', 'quantity'],
                displayExpired: false,
                displayExpiringSoon: false,
            }
        },     
        computed: {
            chemicalsWithNoDuplicates: function() {
                var items = this.$store.getters.chemicals;
                
                var lookup = {};
                var result = [];
                for (var item, i=0; item=items[i++];) {
                    var key = item.chemical_name.toLowerCase();
                    if (typeof key != "undefined" & !(key in lookup)) {
                        lookup[key]=1;
                        result.push({name: key, quantity: items.filter(i => i.chemical_name.toLowerCase() === key).length, displayDetails: false});
                    }
                }
                this.chemicalFamilies = result;
                return result;
            },
            chemicalFamiliesReactiveGetter: function() {
                return this.chemicalFamilies.sort(function (a, b){
                    var textA = a.name.toUpperCase();
                    var textB = b.name.toUpperCase();

                    return textA.localeCompare(textB);
                });
            },
            getExpiredChemicals: function() {
                var items = this.$store.getters.chemicals;
                var expiredChemicals = [];
                
                for (var item, i=0; item=items[i++];) {
                    if (this.compareExpired(item["expiration_date"])) {
                        expiredChemicals.push(item);
                    }                    
                } 
                return expiredChemicals;
            },
            getExpiringSoonChemicals: function() {
                var items = this.$store.getters.chemicals;
                var expiringSoonChemicals = [];

                for (var item, i=0; item=items[i++];) {
                    if (this.compareSoonExpiration(item["expiration_date"]) || this.compare1DayToExpiration(item["expiration_date"])) {
                        expiringSoonChemicals.push(item);
                    }                    
                } 
                return expiringSoonChemicals;
            }
        },
        methods: {
            handleSubmitClicked: function(filteredData) {
                this.chemicalFamilies = filteredData;
            },
        },
        created: function() {
            this.$store.dispatch('setChemicals');
        }
    }
</script>

<style scoped>
* {
    font-family: 'Open Sans', sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    box-sizing: border-box;
}
.expired {
    background-color: #AA0D12 !important;
    border: 3px solid #AA0D12 !important;
    /* CC414B  */
}
.soonColor {
    background-color: #F78B05 !important;
    border: 3px solid #F78B05 !important;
}
.soon30Color {
    background-color: #FFD41F !important;
    border: 3px solid #FFD41F !important;
}
.chemicalOverview {
    display: flex;
    flex-direction: column;
    width: 75%;
    margin-left: auto;
    margin-right: auto;
}
.tableSearch {
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
}
.chemFamilies {
    display: flex;
    flex-flow: row wrap;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    width: 100%;
    margin-bottom: 15px;
}
.iconDisplay {
    display: inline;
    width: 15px;
    cursor: pointer;
}

.listBarcode, .listExpire{
    font-weight: normal;
    font-size: 10pt;
}
.listContainer > div {
    font-size: 11pt;
}
.listTitle {
    font-size: 14pt;
    font-weight: 600;
    color: black;
}

.spacingSmall {
    margin-top: 5px;
}

.spacingBig {
    margin-top: 25px;
}

.iconDisplayActive {
    transform: rotate(90deg);
}
.noStyleLink {
}
.noStyleLink > a {
    color: black !important;
}
.noStyleLink > a:hover {
    color: #00A6FF !important;
}
.detailsContainer {
    font-size: 12px;
}
h1 {color: black;}
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
    /*opacity: 0.5;*/
    border: 3px solid #56DBE8;
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

.colorWhite {
    color: white;
}
.colorBlack {
    color: #2c3e50 !important;
}
</style>