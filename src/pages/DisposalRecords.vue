<template>
  <div>
    <!--<img style="width: 10%;" src="../assets/Logo_1.png" />-->
    <h2>Disposal Records</h2>
    <div class="dateContainer spacer">
      <div>
          <label class="strongFont">Date From:</label>
          <flat-pickr placeholder="Select a Date" :config="fromDatePickerConfig" v-model="fromDate" name="Date From" v-validate="{required: true, date_format:'MM/DD/YYYY'}"  :class="{'error': errors.has('Date From')}"></flat-pickr>
      </div>
      <label class="errorMessage" v-show="errors.has('Date From')">{{errors.first('Date From')}}</label>
      <div>
          <label class="strongFont">Date To:</label>
          <flat-pickr placeholder="Select a Date" :config="toDatePickerConfig" v-model="toDate" name="Date To" v-validate="'required|date_format:MM/DD/YYYY|after:Date From,true'"  :class="{'error': errors.has('Date To')}"></flat-pickr>
      </div>
      <label class="errorMessage" v-show="errors.has('Date To')">{{errors.first('Date To')}}</label>
      <div>
          <button @click="fetchDisposedByDateRange()" class="submitDates">Submit</button>
      </div>
    </div>
    <div v-if="this.chemData.length > 0">
      <TableSearcher class="spacer" :rows="this.chemData" :columnNames="columns" @submitClicked="handleSubmitClicked"></TableSearcher>    
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
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/material_blue.css';
export default {
  name: 'DisposalRecords',
  props: {
  },
  data () {
    return {
      dynamicTableDataSource: [], //need to decide if this should be part of the store or just local placeholder variable 
      fromDate: '',
      toDate: '',
      toDatePickerConfig: {
          wrap: false,
          dateFormat: 'm/d/Y',
      },
      fromDatePickerConfig: {
          wrap: false,
          dateFormat: 'm/d/Y',
          maxDate: "today"
      }     
    }
  },
  components: {
    DynamicTable,
    TableSearcher,
    flatPickr
  },
  methods: {
    handleSubmitClicked: function(filteredData) {
      this.dynamicTableDataSource = filteredData;
    },
    fetchDisposedByDateRange: function() {
      var arr = [];
      arr.push(this.toDate);
      arr.push(this.fromDate);
      this.$store.dispatch("setDisposedChemicalsByDate",arr);
    }
  },
  computed: {
    
    chemData: function() {
      this.dynamicTableDataSource = this.$store.getters.disposedChemicals;
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
    //this.$store.dispatch('setDisposedChemicals');
    this.$store.dispatch('setMostRecentDisposedChemicals', 1000);
  },
  mounted: function() {
    //api call here to get data
    //this.dynamicTableDataSource = this.chemData;
  }
}
</script>

<style scoped>
* {
    font-family: 'Open Sans', sans-serif;
}
  .spacer {
    margin-bottom: 10px;
  }
  .error {
      border-color: red;
  }
  .errorMessage {
      color: #CC414B;
      font-size: 1em;
      font-weight: bold;
  }
  .submitDates {
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
  .submitDates:hover {
      color: #006398;
      opacity: 0.8;
      border: 1px solid #006398;
  }
  .dateContainer {
      display: flex;
      flex-flow: row nowrap;
      margin-left: auto;
      margin-right: auto;
      width: 75%;
      justify-content: flex-start;
  }
  .dateContainer * {
      margin-right: 5px;
  }
  .strongFont {
      font-weight: bold;
  }
</style>