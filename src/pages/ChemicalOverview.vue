<template>
    <div class="chemicalOverview">
        <h1>Chemical Inventory</h1>
        <div class="listContainer">
            <label class="listTitle">Expired Chemicals</label>
            <img class="iconDisplay" :class="{iconDisplayActive : this.displayExpired}" src="../assets/chevron_blue.svg" 
                @click="displayExpired = !displayExpired"/>
            <div v-show="this.displayExpired" >
                <div v-for="chem in getExpiredChemicals">
                    <div style="margin-top: 10px; ">
                        <label style="text-decoration: underline;">{{chem["chemical_name"]}}</label>
                        <div> 
                            <label class="listBarcode">Barcode: {{chem["barcode"]}}</label>
                        </div>
                        <div>
                            <label class="listExpire">Expired On: {{chem["expiration_date"]}}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="{spacingSmall: !this.displayExpired, spacingBig: this.displayExpired}"  class="listContainer">
            <label class="listTitle">Expiring Soon Chemicals</label>
            <img class="iconDisplay" :class="{iconDisplayActive : this.displayExpiringSoon}" src="../assets/chevron_blue.svg" 
                @click="displayExpiringSoon = !displayExpiringSoon"/>
            <div v-show="this.displayExpiringSoon">
                <div v-for="chem in getExpiringSoonChemicals">
                    <div style="margin-top: 10px; ">
                        <label style="text-decoration: underline;">{{chem["chemical_name"]}}</label>
                        <div> 
                            <label class="listBarcode">Barcode: {{chem["barcode"]}}</label>
                        </div>
                        <div>
                            <label class="listExpire">Expired On: {{chem["expiration_date"]}}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <TableSearcher class="tableSearch" :rows="chemicalsWithNoDuplicates" :columnNames="this.columnsForSearcher" @submitClicked="handleSubmitClicked"></TableSearcher> 
        <div v-for="chemical in chemicalFamiliesReactiveGetter" class="chemFamilies">
            <div class="noStyleLink">
                <router-link  :to="{name: 'ChemicalDetails', params: {chemName: chemical.name}}">{{chemical.name}}</router-link>
                <img class="iconDisplay" :class="{iconDisplayActive : chemical.displayDetails}" src="../assets/chevron_blue.svg" 
                    @click="chemical.displayDetails = !chemical.displayDetails"/>
                <div class="detailsContainer" :id="chemical.name" v-show="chemical.displayDetails">
                    <div >Quantity: {{chemical.quantity}}</div>
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
                return this.chemicalFamilies;
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
                    if (this.compareSoonExpiration(item["expiration_date"])) {
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
        flex-flow: row nowrap;
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
img {
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
</style>