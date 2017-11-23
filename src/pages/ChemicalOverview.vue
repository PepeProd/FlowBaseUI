<template>
    <div class="chemicalOverview">
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
    export default {
        name: "Overview",
        components: {
            TableSearcher
        },
        data() {
            return {
                chemicalFamilies: [],
                columnsForSearcher: ['name', 'quantity']
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
                        result.push({name: key, quantity: items.filter(i => i.chemical_name === key).length, displayDetails: false});
                    }
                }
                this.chemicalFamilies = result;
                return result;
            },
            chemicalFamiliesReactiveGetter: function() {
                return this.chemicalFamilies;
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

.iconDisplayActive {
    transform: rotate(90deg);
}
.noStyleLink {
}
.noStyleLink > a {
    color: black !important;
}
.detailsContainer {
    font-size: 12px;
}
</style>