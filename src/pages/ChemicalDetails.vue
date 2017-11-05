<template>
  <div>
    <img style="width: 10%;" src="../assets/Logo_1.png" />
    <TableSearcher :rows="this.chemData" :columnNames="columns" @submitClicked="handleSubmitClicked"></TableSearcher>    
    <DynamicTable :rows="this.dynamicTableDataSource" :columnNames="columns" defaultSort="id">
      <template slot="tableRows" scope="row" >
          <tr class="backgroundHoverColor" :class="{expiring : compareExpiration(row['expiration_date']), soonToExpire : compareSoonExpiration(row['expiration_date']), notExpiring : compareNotExpiring(row['expiration_date'])}">
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
  name: 'Details',
  props: {
    chemName: {
      type: String,
      required: true
    }
  },
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
    
    chemData: function() {
      var lookup = this.chemName;
      var items = this.$store.getters.chemicals;
      var result = [];
      for(var item, i=0; item=items[i++];) {
        if ((item.chemical_name).toLowerCase() == lookup.toLowerCase()) {
          result.push(item);
        }
      }
      return result;
    },
    columns: function() {
      if (this.chemData.length == 0)
        return [];                    
      return Object.keys(this.chemData[0])
    },
  },
  mounted: function() {
    //api call here to get data
    this.dynamicTableDataSource = this.chemData;
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
