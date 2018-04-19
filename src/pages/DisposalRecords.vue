<template>
  <div>
    <!--<img style="width: 10%;" src="../assets/Logo_1.png" />-->
    <h2>Disposal Records</h2>
    <div v-if="this.chemData.length > 0">
      <TableSearcher class="searcherSpacing" :rows="this.chemData" :columnNames="columns" @submitClicked="handleSubmitClicked"></TableSearcher>    
      <DynamicTable :rows="this.dynamicTableDataSource" :columnNames="columns" :defaultSort="columns[0]" :excludeColumns="getExcludedColumns">
    </DynamicTable>
    </div>
    <div v-else>
      <h3>There are no records of any chemicals being disposed!</h3>
    </div>
  </div>
</template>

<script>
import DynamicTable from '../components/DynamicTable.vue';
import TableSearcher from '../components/TableSearcher.vue';
export default {
  name: 'DisposalRecords',
  props: {
  },
  data () {
    return {
      dynamicTableDataSource: [], //need to decide if this should be part of the store or just local placeholder variable      
    }
  },
  components: {
    DynamicTable,
    TableSearcher
  },
  methods: {
    handleSubmitClicked: function(filteredData) {
      this.dynamicTableDataSource = filteredData;
    },

  },
  computed: {
    
    chemData: function() {
      return this.$store.getters.disposedChemicals;
    },
    columns: function() {
      return (Object.keys(this.chemData[0] || []))
    },
    getExcludedColumns: function() {
      var arr = new Array('id');
      return arr;
    }
  },
  created: function() {
    this.$store.dispatch('setDisposedChemicals');
  },
  mounted: function() {
    //api call here to get data
    this.dynamicTableDataSource = this.chemData;
  }
}
</script>

<style scoped>
.searcherSpacing {
  margin-bottom: 10px;
}
</style>