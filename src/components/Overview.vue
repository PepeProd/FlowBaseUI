<template>
  <div>
    <img src="../assets/logo.png">
    <SearchTable :rows="this.$store.getters.chemicals" :columnNames="columns" @filterData="setData"></SearchTable>    
    <DynamicTable :rows="this.dataForTable" :columnNames="columns" defaultSort="id"></DynamicTable>
  </div>
</template>

<script>
import DynamicTable from './DynamicTable.vue';
import SearchTable from './SearchTable.vue';
export default {
  name: 'Overview',
  data () {
    return {
      dataForTable: [], //need to decide if this should be part of the store or just local placeholder variable      
    }
  },
  components: {
    DynamicTable,
    SearchTable
  },
  methods: {
    setData: function(e) {
      this.dataForTable = e;
    }
  },
  computed: {
    columns: function() {
      if (this.$store.getters.chemicals.length == 0)
        return [];                    
      return Object.keys(this.$store.getters.chemicals[0])
    }
  },
  mounted: function() {
    this.dataForTable = this.$store.getters.chemicals;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
