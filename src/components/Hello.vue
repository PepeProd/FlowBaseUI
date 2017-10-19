<template>
  <div class="hello">
    <img src="../assets/logo.png">    
    <DynamicTable :rows="dataForTable"></DynamicTable>
  </div>
</template>

<script>
import DynamicTable from './DynamicTable.vue';
export default {
  name: 'hello',
  data () {
    return {
      dataForTable: [
        {id: 1, chemical_Name: "PBasdsad sadsadasS asdasd", vendor: "VWR", vendor_catalog_number: "1234", 
        Received_Date: "10/11/2016", Expiration_Date: "12/10/2017", Project_Code: "", 
        Storage_Temp: "-20C", Location: "Middle Lab"},
        {id: 2, chemical_Name: "PBS", vendor: "VWRasdsad asdsadasdsa asdsadasd", vendor_catalog_number: "1234", 
        Received_Date: "10/11/2015", Expiration_Date: "12/10/2017", Project_Code: "", 
        Storage_Temp: "-20C", Location: "Middle Lab"},
        {id: 3, chemical_Name: "PBS", vendor: "VWR", vendor_catalog_number: "1234", 
        Received_Date: "10/11/2017", Expiration_Date: "12/10/2017", Project_Code: "", 
        Storage_Temp: "-20C", Location: "Middle Lab"},
         {id: 4, chemical_Name: "PBS", vendor: "VWR", vendor_catalog_number: "1234", 
        Received_Date: "10/11/2017", Expiration_Date: "12/10/2017", Project_Code: "", 
        Storage_Temp: "-20C", Location: "Middle Lab"},
        {id: 5, chemical_Name: "PBS", vendor: "VWR", vendor_catalog_number: "1234", 
        Received_Date: "10/11/2017", Expiration_Date: "12/10/2017", Project_Code: "", 
        Storage_Temp: "-20C", Location: "Middle Lab"},
        {id: 6, chemical_Name: "PBS", vendor: "VWR", vendor_catalog_number: "1234", 
        Received_Date: "10/11/2017", Expiration_Date: "12/10/2017", Project_Code: "", 
        Storage_Temp: "-20C", Location: "Middle Lab"},
         {id: 7, chemical_Name: "PBS", vendor: "VWR", vendor_catalog_number: "1234", 
        Received_Date: "10/11/2017", Expiration_Date: "12/10/2017", Project_Code: "", 
        Storage_Temp: "-20C", Location: "Middle Lab"},
        {id: 8, chemical_Name: "PBS", vendor: "VWR", vendor_catalog_number: "1234", 
        Received_Date: "10/11/2017", Expiration_Date: "12/10/2017", Project_Code: "", 
        Storage_Temp: "-20C", Location: "Middle Lab"},
        {id: 9, chemical_Name: "PBS", vendor: "VWR", vendor_catalog_number: "1234", 
        Received_Date: "10/11/2017", Expiration_Date: "12/10/2017", Project_Code: "", 
        Storage_Temp: "-20C", Location: "Middle Lab"},
        {id: 10, chemical_Name: "PBS", vendor: "VWR", vendor_catalog_number: "1234", 
        Received_Date: "10/11/2017", Expiration_Date: "12/10/2017", Project_Code: "", 
        Storage_Temp: "-20C", Location: "Middle Lab"},
        {id: 11, chemical_Name: "PBS", vendor: "VWR", vendor_catalog_number: "1234", 
        Received_Date: "10/11/2017", Expiration_Date: "12/10/2017", Project_Code: "", 
        Storage_Temp: "-20C", Location: "Middle Lab"},
        {id: 12, chemical_Name: "PBS", vendor: "VWR", vendor_catalog_number: "1234", 
        Received_Date: "10/11/2017", Expiration_Date: "12/10/2017", Project_Code: "", 
        Storage_Temp: "-20C", Location: "Middle Lab"},
         {id: 13, chemical_Name: "PBS", vendor: "VWR", vendor_catalog_number: "1234", 
        Received_Date: "10/11/2017", Expiration_Date: "12/10/2017", Project_Code: "", 
        Storage_Temp: "-20C", Location: "Middle Lab"},
        {id: 14, chemical_Name: "PBS", vendor: "VWR", vendor_catalog_number: "1234", 
        Received_Date: "10/11/2017", Expiration_Date: "12/10/2017", Project_Code: "", 
        Storage_Temp: "-20C", Location: "Middle Lab"},
        {id: 15, chemical_Name: "PBS", vendor: "VWR", vendor_catalog_number: "1234", 
        Received_Date: "10/11/2017", Expiration_Date: "12/10/2017", Project_Code: "", 
        Storage_Temp: "-20C", Location: "Middle Lab"},
         {id: 16, chemical_Name: "PBS", vendor: "VWR", vendor_catalog_number: "1234", 
        Received_Date: "10/11/2017", Expiration_Date: "12/10/2017", Project_Code: "", 
        Storage_Temp: "-20C", Location: "Middle Lab"},
        {id: 17, chemical_Name: "PBS", vendor: "VWR", vendor_catalog_number: "1234", 
        Received_Date: "10/11/2017", Expiration_Date: "12/10/2017", Project_Code: "", 
        Storage_Temp: "-20C", Location: "Middle Lab"},
        {id: 18, chemical_Name: "PBS", vendor: "VWR", vendor_catalog_number: "1234", 
        Received_Date: "10/11/2017", Expiration_Date: "12/10/2017", Project_Code: "", 
        Storage_Temp: "-20C", Location: "Middle Lab"}
      ]
    }
  },
  components: {
    DynamicTable
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
