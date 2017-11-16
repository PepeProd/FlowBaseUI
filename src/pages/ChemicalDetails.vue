<template>
  <div>
    <img style="width: 10%;" src="../assets/Logo_1.png" />
    <TableSearcher class="searcherSpacing" :rows="this.chemData" :columnNames="columns" @submitClicked="handleSubmitClicked"></TableSearcher>    
    <DynamicTable :rows="this.dynamicTableDataSource" :columnNames="columns" :defaultSort="columns[0]">
      <template slot="legend">
        <div class="tableLegend">
          <div class="legendContainer">        
            <label class="lblText">Days to Expiration: </label>
            <div class="legendExpired"></div>
            <label class="lblText">Expired</label>
            <div class="legend1DayWarning"></div>
            <label class="lblText">0-1 Day</label>
            <div class="legendSoon"></div>
            <label class="lblText">2-30 Days</label>
            <div class="legendGood"></div>
            <label class="lblText">30+ Days</label>
          </div>
        </div>
      </template>
      <template slot="tableRows" scope="row" >
          <tr class="backgroundHoverColor" :class="{expired: compareExpired(row['expiration_date']),expiring : compare1DayToExpiration(row['expiration_date']), soonToExpire : compareSoonExpiration(row['expiration_date']), notExpiring : compareNotExpiring(row['expiration_date'])}">
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
      return this.$store.getters.findChemicalByName(this.chemName);
    },
    columns: function() {
      return (Object.keys(this.chemData[0] || []))
    },
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
.expired {
    background-color: rgb(244, 66, 66);
}
.expiring {
  background-color: rgb(229, 109, 22);
}
.soonToExpire {
    background-color: rgb(238, 244, 65);
}
.notExpiring {
    background-color: rgb(45, 188, 20);
}
.legendExpired {
    height: 15px;
    width: 15px;
    background-color: rgb(244, 66, 66);
    display: inline-block;
    box-sizing: border-box;
    vertical-align: middle;
    border: 1px solid black;
    border-radius: 10px;
}
.legend1DayWarning {
    height: 15px;
    width: 15px;
    background-color: rgb(229, 109, 22);
    display: inline-block;
    box-sizing: border-box;
    vertical-align: middle;
    border: 1px solid black;
    border-radius: 10px;
}
.legendSoon {
    height: 15px;
    width: 15px;
    background-color: rgb(238, 244, 65);
    display: inline-block;
    box-sizing: border-box;
    vertical-align: middle;
    border: 1px solid black;
    border-radius: 10px;
}
.legendGood {
    height: 15px;
    width: 15px;
    background-color: rgb(45, 188, 20);
    display: inline-block;
    box-sizing: border-box;
    vertical-align: middle;
    border: 1px solid black;
    border-radius: 10px;
}
.legendContainer {
    margin-top: 9px;
    height: 20px;
}
.lblText {
  box-sizing: border-box;
  height: 20px;
  vertical-align: middle;
}
</style>
