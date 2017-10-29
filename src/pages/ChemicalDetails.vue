<template>
  <div>
    <img style="width: 10%;" src="../assets/Logo_1.png">
    <TableSearcher :rows="this.$store.getters.chemicals" :columnNames="columns" @submitClicked="handleSubmitClicked"></TableSearcher>    
    <DynamicTable :rows="this.dynamicTableDataSource" :columnNames="columns" defaultSort="id">
      <template slot="tableRows" scope="row" >
          <tr class="backgroundHoverColor" :class="{expiring : compareExpiration(row['Expiration_Date']), soonToExpire : compareSoonExpiration(row['Expiration_Date']), notExpiring : compareNotExpiring(row['Expiration_Date'])}">
              <td v-for="col in columns">{{row[col]}}</td>
          </tr>
      </template>
    </DynamicTable>
  </div>
</template>

<script>
import DynamicTable from '../components/DynamicTable.vue';
import TableSearcher from '../components/TableSearcher.vue';
import {dateComparison} from '../mixins/dateComparison.js';
export default {
  name: 'Overview',
  mixins: [dateComparison],
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
.expiring {
    background-color: rgb(244, 66, 66);
}
.soonToExpire {
    background-color: rgb(238, 244, 65);
}
.notExpiring {
    background-color: rgb(91, 244, 65);
}
</style>
