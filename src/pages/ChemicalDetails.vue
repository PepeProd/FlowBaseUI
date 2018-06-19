<template>
  <div>
    <!--<img style="width: 10%;" src="../assets/Logo_1.png" />-->
    <h2 class="title">Details for "{{this.chemName}}"</h2>
    <div class="updateFamDetailsContainer" v-show="isUserLoggedIn">
      <label >Reorder Threshold: </label>
      <!-- {{this.chemFam["reorder_quantity"]}}{{this.chemFam["threshold"]}} -->
      <input ref="threshold" type="number" min="-1"/> 
      <label> Reorder Quantity: </label>
      <input ref="reorderQuant" type="number" min="-1"/>
      <label> Current Quantity: {{this.chemQuantity}}</label>
      <button class="updateChemFam" @click="handleUpdateClicked()">Update</button>
      <div class="modal-container" :class="{alertToFront: this.displayUpdate}">
          <AlertMessage @submitClose="handleClose" v-if="this.displayUpdate"  :messageText="this.updateText"></AlertMessage>
      </div>
    </div>
    <TableSearcher  class="searcherSpacing" :rows="this.chemData" :columnNames="columns" @submitClicked="handleSubmitClicked" ></TableSearcher>    
    <DynamicTable :rows="this.dynamicTableDataSource" v-if="this.dynamicTableDataSource.length > 0" :columnNames="columns" :defaultSort="columns[0]" :excludeColumns="getExcludedColumns">
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
              <!-- recreate as custom TD -->
              <!--<td  v-for="(col, index) in columns">{{row[col]}} <span v-show="(index == 1 && isUserLoggedIn == true)" >Edit</span></td>-->
              <td  v-for="(col, index) in columns" v-if="!(getExcludedColumns.indexOf(col) > -1)"><InnerTableDetail @showUpdateChemForm="ShowUpdateForm(row)" :index="index" :displayOnIndex="0" :isUserLoggedIn="isUserLoggedIn" :detail="row[col]"></InnerTableDetail></td>
          </tr>
      </template>
    </DynamicTable>
    <div v-show="this.dynamicTableDataSource.length == 0" >
      <!-- Make better implementation for this scenario -->
      <span>No data for {{this.chemName}}</span>
    </div>
    <UpdateChemicalForm v-if="this.showForm" :chemical="this.chemicalToUpdate" @closeChemUpdateForm="closeUpdateForm" @saveUpdate="handleChemUpdate"></UpdateChemicalForm>
  </div>
</template>

<script>
import DynamicTable from '../components/DynamicTable.vue';
import TableSearcher from '../components/TableSearcher.vue';
import {dateComparison} from '../mixins/dateComparison.js';
import InnerTableDetail from '../components/InnerTableDetail.vue';
import UpdateChemicalForm from '../components/UpdateChemicalForm.vue';
import AlertMessage from '../components/AlertMessage.vue';
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
      showByIndex: 1,
      chemicalToUpdate: {},
      showForm: false,
      chemFamily: {},
      firstLoad: true,
      displayUpdate: false,
      updateText: ""
    }
  },
  components: {
    DynamicTable,
    TableSearcher,
    InnerTableDetail,
    UpdateChemicalForm,
    AlertMessage
  },
  methods: {
    handleClose: function() {
        this.displayUpdate = false;
    },
    handleSubmitClicked: function(filteredData) {
      this.dynamicTableDataSource = filteredData;
    },
    handleChemUpdate: function() {
      this.showForm = false;
      this.dynamicTableDataSource = this.$store.getters.findChemicalByName(this.chemName);
      //console.log(this.$store.getters.findChemicalByName(this.chemName));
    },
    ShowUpdateForm: function(e) {
      this.chemicalToUpdate = e;
      this.showForm = true;
    },
    closeUpdateForm: function() {
      this.showForm = false;
    },
    handleUpdateClicked: function() {
      var container = {
        chemical_name: this.chemName,
        threshold: this.$refs["threshold"].value,
        reorder_quantity: this.$refs["reorderQuant"].value
      };
      this.$store.dispatch('updateFamily', container)
      .then( (response) => {
        if (response) {
          this.updateText = "Updated Reorder Information";
        } else {
          this.updateText = "Updating Reorder Information Failed";
        }
        this.displayUpdate = true;
      } );
    }
    
  },
  computed: {
    
    chemData: function() {
      this.dynamicTableDataSource = this.$store.getters.findChemicalByName(this.chemName);
      return this.$store.getters.findChemicalByName(this.chemName);
    },
    columns: function() {
      return (Object.keys(this.chemData[0] || [])).slice(1);
    },
    isUserLoggedIn: function() {
      var user = this.$store.getters.activeUser;
      //if (user != null) {
        if (typeof user.username != 'undefined' && user.username != '')
          return true;
      //}
      return false;
    },
    getExcludedColumns: function() {
      var arr = new Array('id');
      return arr;
    },
    chemFam: function() {
      return this.$store.getters.activeFamily;
    },
    chemQuantity: function() {
      return this.$store.getters.findChemicalByName(this.chemName).length;
    }
  },
  mounted: function() {
    //api call here to get data
    //this.dynamicTableDataSource = this.chemData;
    var dto = { chemical_name: this.chemName};
    this.chemFamily = this.$store.dispatch("setFamily", dto); 
    
    /*this.$refs["threshold"].value = this.chemFam["threshold"];
    this.$refs["reorderQuant"].value = this.chemFam["reorder_quantity"];
    this.threshold = this.$refs["threshold"].value;
    this.reorderQuantity = this.$refs["reorderQuant"].value;*/
  },
  watch: {
    chemFam: function() {
        this.$refs["threshold"].value = this.chemFam["threshold"];
        this.$refs["reorderQuant"].value = this.chemFam["reorder_quantity"];
    }
  }

}
</script>

<style scoped>
* {
    font-family: 'Open Sans', sans-serif;
}
.active {
  display: none;
}
.active:hover {
  display: block;
}
.searcherSpacing {
  margin-bottom: 10px;
}
.expired {
    background-color: #CC414B;
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
    background-color: #CC414B;
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
.title {
  margin-bottom: 0px;
}
.updateFamDetailsContainer {
  margin-bottom: 10px;
}
.updateFamDetailsContainer > input {
  margin-right: 10px;
  width: 75px;
}
.updateFamDetailsContainer > button {
  margin-top: 10px;
}
.updateChemFam {
  display: block;
  border-radius: 5px;
  padding: 3px 25px 3px 25px;
  cursor: pointer;
  color: #fff;
  background-color: #00A6FF;
  border: 1px solid #fff;
  transition-duration: 0.5s;
  -webkit-transition-duration: 0.5s;
  -moz-transition-duration: 0.5s;
  outline: none;
  width: 100px;
  margin-right: auto;
  margin-left: auto;
  
}
.updateChemFam:hover {
  color: #006398;
  opacity: 0.8;
  border: 1px solid #006398;
}

.modal-container {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 40px;
    left: 0;
    z-index: -1;
    background-color: transparent;
    
}
.alertToFront {
    z-index: 99999 !important;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .5s ease;
}
</style>
