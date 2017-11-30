<template>
  <div>
    <img style="width: 10%;" src="../assets/Logo_1.png" />
    <TableSearcher class="searcherSpacing" :rows="this.chemData" :columnNames="columns" @submitClicked="handleSubmitClicked"></TableSearcher>    
    <DynamicTable :rows="this.dynamicTableDataSource" :columnNames="columns" :defaultSort="columns[0]">
    </DynamicTable>
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