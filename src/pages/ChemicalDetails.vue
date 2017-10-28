<template>
  <div>
    <img style="width: 10%;" src="../assets/Logo_1.png">
    <SearchTable :rows="this.$store.getters.chemicals" :columnNames="columns" @submitClicked="handleSubmitClicked"></SearchTable>    
    <DynamicTable :rows="this.dynamicTableDataSource" :columnNames="columns" defaultSort="id"></DynamicTable>
  </div>
</template>

<script>
import DynamicTable from '../components/DynamicTable.vue';
import SearchTable from '../components/SearchTable.vue';
export default {
  name: 'Overview',
  data () {
    return {
      dynamicTableDataSource: [], //need to decide if this should be part of the store or just local placeholder variable      
    }
  },
  components: {
    DynamicTable,
    SearchTable
  },
  methods: {
    handleSubmitClicked: function(filteredData) {
      this.dynamicTableDataSource = filteredData;
    },
 
  },
  computed: {
    columns: function() {
      if (this.$store.getters.chemicals.length == 0)
        return [];                    
      return Object.keys(this.$store.getters.chemicals[0])
    }
  },
  mounted: function() {
    //api call here to get data
    this.dynamicTableDataSource = this.$store.getters.chemicals;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
