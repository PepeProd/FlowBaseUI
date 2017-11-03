<template>
    <div>
        <TableSearcher :rows="chemicalsNoDuplicates" :columnNames="Object.keys(chemicalsNoDuplicates[0])" @submitClicked="handleSubmitClicked"></TableSearcher> 
        <div v-for="chemical in this.chemicalData">
            <router-link :to="{name: 'ChemicalDetails', params: {chemName: chemical.name}}">{{chemical.name}}</router-link>
            <span>{{chemical.quantity}}</span>
        </div>
    </div>
</template>

<script>
    import TableSearcher from '../components/TableSearcher.vue';
    export default {
        name: "Overview",
        props: ["chemicals"],
        components: {
            TableSearcher
        },
        data() {
            return {
                chemicalData: []
            }
        },     
        computed: {
            chemicalsNoDuplicates: function() {
                var items = this.$store.getters.chemicals;
                
          /*      var result = items.reduce( (acc, o) => (acc[o.chemical_name] = (acc[o.chemial_name] || 0)+1, acc), {} )

                return result;
                //var unique = [...new Set(array.map(item => item.chemical_name))];
                var lookup = {};
                var result = []; */
                var lookup = {};
                var result = [];
                for (var item, i=0; item=items[i++];) {
                    var key = item.chemical_name;
                    if (!(key in lookup)) {
                        lookup[key]=1;
                        result.push({name: key, quantity: items.filter(i => i.chemical_name === key).length});
                    }
                }
                return result;
                /* var result = items.reduce(function(r, o) {
                    if (r[o.chemical_name]){
                        ++r[o.chemical_name].count;
                    } else {
                        r[o.chemical_name] = {count: 1};
                    }
                    return r;
                }, {});


                return result; */
           /*      var chemicalFamilies = {},e;
                var result=[]
                for (var i = 0,l=items.length; i < l; i++) { 
                    e = items[i];
                    chemicalFamilies[e.chemical_name] = (chemicalFamilies[e.chemical_name] || 0) + 1;
                    //result.push({name: e.chemical_name, quantity: chemicalFamilies[e.chemical_name]});
                }
                                
                return chemicalFamilies;   */ 
            }
        },
        methods: {
            handleSubmitClicked: function(filteredData) {
                this.chemicalData = filteredData;
            },
        },
        mounted: function() {
            this.chemicalData = this.chemicalsNoDuplicates;
        }

    }
</script>

<style scoped>

</style>