<template>
    <div class="tableObj">
        <div class="dropdownContainer">
            <slot name="legend"></slot>
            <div class="dropdown">
                <button class="btnDrop">Page Size: {{itemsPerPage}}</button>
                <div class="dropdown-content">
                    <span href="#" v-on:click="setPageSize(10)">10 items</span>
                    <span href="#" v-on:click="setPageSize(25)">25 items</span>
                    <span href="#" v-on:click="setPageSize(50)">50 items</span>
                </div>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th v-for="col in columnNames" v-on:click="sortTable(col)">
                        {{formatColumn(col)}}
                        <div class="arrow" v-if="col == sortColumn" :class="[ascending ? 'arrow_up' : 'arrow_down']">
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <slot name="tableRows" v-for="row in get_rows()" v-bind="row">
                    <tr v-for="row in get_rows()" class="backgroundHoverColor">
                        <td v-for="col in columnNames">{{row[col]}}</td>
                    </tr>
                </slot>
            </tbody>
        </table>
        <div class="pagination">
            <div class="number" v-for="pageNumber in num_pages()" 
            v-if="pageNumber == 1 || Math.abs(pageNumber - currentPage) < 3 || pageNumber == totalPages"
            :class="[pageNumber == currentPage ? 'active' : '']"
            v-on:click="change_page(pageNumber)">
                {{pageNumber}}
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'DynamicTable',
        props: ['rows', 'defaultSort', 'columnNames'],
        data() {
            return {
            currentPage: 1,
            itemsPerPage: 10,
            ascending: false,
            sortColumn: this.defaultSort,
        }},
        methods: {
            sortTable: function(col) {
                if (this.sortColumn === col) {
                    this.ascending = !this.ascending;
                } else {
                    this.ascending = true;
                    this.sortColumn = col;
                }

                var ascending = this.ascending;
                
                this.rows.sort(function(a, b) {
                    if (col == "expiration_date" || col=="received_date") {
                        if (new Date(a[col]) > new Date(b[col]) ) {
                            return ascending ? 1 : -1
                        } else if ( new Date(a[col]) < new Date(b[col]) ) {
                            return ascending ? -1 : 1
                        }
                    } else {
                        if (a[col] > b[col]) {
                            return ascending ? 1 : -1
                        } else if (a[col] < b[col]) {
                            return ascending ? -1 : 1
                        }
                    }
                    return 0;
                })
            },
            num_pages: function() {
                return Math.ceil(this.rows.length / this.itemsPerPage);
            },
            get_rows: function() {
                var start = (this.currentPage-1) * this.itemsPerPage;
                var end = start + this.itemsPerPage;
                return this.rows.slice(start, end);
            },            
            change_page: function(page) {
                this.currentPage = page;
            },
            setPageSize: function(size) {
                this.itemsPerPage = size;
                if (this.currentPage > this.totalPages)
                    this.change_page(this.totalPages);
            },
            getData: function(payload) {
                this.rows = payload;
            },
            formatColumn: function(name) {
                return name.toString().split('_').join(' ');
            },

        },
        computed: {            
            totalPages: function() {
                return Math.ceil(this.rows.length/this.itemsPerPage)
            }
        },
        mounted: function() {
            this.$nextTick( function() {
                this.sortTable(this.sortColumn);
            })
        },
        watch: {
            totalPages: function(val, oldVal){
                if (this.currentPage > this.totalPages)
                    this.currentPage = this.totalPages
            },
            currentPage: function(val, oldVal) {
                if (this.currentPage < 1)
                    this.currentPage = 1;
            }
        }
    }
</script>

<style scoped>
* {
    font-family: 'Open Sans', sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    box-sizing: border-box;
}
/* page size dropdown */
tableObj {
    text-align: left;
    width: 75%;
}
.btnDrop {
    background-color: rgb(56,56,56);
    color: white;
    padding: 10px;
    font-size: 12px;
    border: none;
    cursor: pointer;
}

/* The container <div> - needed to position the dropdown content */
.dropdownContainer {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    /*text-align: right;*/
    justify-content: space-between;
    width: 75%;
}
.dropdown {
    position: relative;
    display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
 
}

/* Links inside the dropdown */
.dropdown-content span {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;
    text-transform: lowercase;
    font-weight: normal;
    text-align: center;
}

/* Change color of dropdown links on hover */
.dropdown-content span:hover {background-color: #00A6FF}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
    display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .btnDrop {
    background-color: rgb(56,56,56);
    opacity: 0.9;
}
/*Table styling*/

table {
  font-family: 'Open Sans', sans-serif;
  width: 75%;
  border-collapse: collapse;
  border: 3px solid rgb(56,56,56);
  margin: 10px 10px 0 10px;
  margin-left: auto;
  margin-right: auto;
}


table th {
  text-align: center;
  background: rgb(56,56,56);
  color: #FFF;
  cursor: pointer;
  padding: 8px;
  min-width: 50px;
}
table th:hover {
  background: #00A6FF;
}
table td {
  text-align: center;
  padding: 8px;
  border-right: 2px solid rgb(56,56,56);
  text-transform: none;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(n) td {
    border-bottom: 2px solid rgb(56,56,56);
}
.backgroundHoverColor:hover {
    background-color: #00A6FF;
    opacity: 0.8;
}

.pagination {
  text-align: right;
  width: 75%;
  padding: 8px;
  margin-left: auto;
  margin-right: auto;
}

.arrow_down {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAaCAYAAABPY4eKAAAAAXNSR0IArs4c6QAAAvlJREFUSA29Vk1PGlEUHQaiiewslpUJiyYs2yb9AyRuJGm7c0VJoFXSX9A0sSZN04ULF12YEBQDhMCuSZOm1FhTiLY2Rky0QPlQBLRUsICoIN/0PCsGyox26NC3eTNn3r3n3TvnvvsE1PkwGo3yUqkkEQqFgw2Mz7lWqwng7ztN06mxsTEv8U0Aam5u7r5EInkplUol/f391wAJCc7nEAgE9Uwmkzo4OPiJMa1Wq6cFs7Ozt0H6RqlUDmJXfPIx+qrX69Ti4mIyHA5r6Wq1egND+j+IyW6QAUoul18XiUTDNHaSyGazKcZtdgk8wqhUKh9o/OMvsVgsfHJy0iWqVrcQNRUMBnd6enqc9MjISAmRP3e73T9al3XnbWNjIw2+KY1Gc3imsNHR0YV4PP5+d3e32h3K316TySQFoX2WyWR2glzIO5fLTSD6IElLNwbqnFpbWyO/96lCoai0cZjN5kfYQAYi5H34fL6cxWIZbya9iJyAhULBHAqFVlMpfsV/fHxMeb3er+Vy+VUzeduzwWC45XA4dlD/vEXvdDrj8DvURsYEWK3WF4FA4JQP9mg0WrHZbEYmnpa0NxYgPVObm5teiLABdTQT8a6vrwdRWhOcHMzMzCiXlpb2/yV6qDttMpkeshEzRk4Wo/bfoe4X9vb2amzGl+HoXNT29vZqsVi0sK1jJScG+Xx+HGkL4Tew2TPi5zUdQQt9otPpuBk3e0TaHmMDh1zS7/f780S0zX6Yni+NnBj09fUZUfvudDrNZN+GkQbl8Xi8RLRtHzsB9Hr9nfn5+SjSeWUCXC7XPq5kw53wsNogjZNohYXL2EljstvtrAL70/mVaW8Y4OidRO1/gwgbUMvcqGmcDc9aPvD1gnTeQ+0nmaInokRj0nHh+uvIiVOtVvt2a2vLv7Ky0tL3cRTXIcpPAwMDpq6R4/JXE4vFQ5FI5CN+QTaRSFCYc8vLy1l0rge4ARe5kJ/d27kYkLXoy2Jo4C7K8CZOsEBvb+9rlUp1xNXPL7v3IDwxvPD6AAAAAElFTkSuQmCC')
}
.arrow_up {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAAAXNSR0IArs4c6QAAAwpJREFUSA21Vt1PUmEYP4dvkQ8JFMwtBRocWAkDbiqXrUWXzU1rrTt0bdVqXbb1tbW16C9IBUSmm27cODdneoXjputa6069qwuW6IIBIdLvdaF4OAcOiGeDc87zPs/vd57P96WpFq7p6enbGo1mjKZpeTabjU1MTCRagGnOZHFxcXxtbe1XKpUq7+zslJeXl//Mz8+Hy+Uy3RxSE9qTk5M3otFooVQqgef4Wl9f343FYoEmoISrxuNxFX5f9vb2jhn/PxUKhfLS0tIPfFifUESRUMV8Pv/M6XReRm5rTGQyGeXxeGxYe1ezeBpBOBx2rKysbO7v79d4Wy3Y2Nj4GQqFbgnhaugxwiuGJx99Pp9FLBbXxYTXvTqd7v3MzIy6riIWGxJnMpl7AwMD14xGYyMsSq1WUyQdUqn0eSPlusQIsbGrq+vl4OCgvhFQZd1utyv1en0gEolcqsi47nWJlUrlG5fLZVcoFFy2nDKSDpIWlUoVTCQSEk4lCHmJMZ2GTCbTiMVikfIZ88l7enoos9l8dXt7+z6fDicxSJUokqDX6xXcl2wCROoc0vQCWL3sNfLOSdzR0fHY4XC4tVotl40gmVwup9xuN4OQv+UyqCFGH9rg7SOGYVRcBs3IEG4J0nVnamrqOtvuBDGGgQg9+wHFcVEi4a0LNkbdd6TrPKo8ODc311mteIIYjT/a398/jK+s1jnVM0kXoufCFvq0GuiIGEVgQIhfoygM1QrteEa9dAL7ITiYCt4RMabOK5AyKKzKWtvupLcRciu8D5J0EuDDPyT/Snd39yh6VtY2NhYQSR9G79Ds7OxdskRjEyAufvb7/cPoO5Z6e1+xtVKrq6vfcFzyi/A3ZrPZ3GdNSlwgo5ekE4X2RIQGf2C1WlufFE0GBeGWYQ8YERWLxQtnUVB830MKLZfL9RHir8lkssCn2G751tZWEWe03zTKm15YWPiEiXXTYDB0Ig/t7yd8PRws4EicwWHxO4jHD8/C5HiTTqd1BwcHFozKU89origB+y/kmzgYpgOBQP4fGmUiZmJ+WNgAAAAASUVORK5CYII=')
}
.arrow {
  float: right;
  width: 12px;
  height: 15px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: bottom;
}

.number {
  display: inline-block;
  padding: 4px 10px;
  color: #FFF;
  border-radius: 4px;
  background: #44475C;
  margin: 0px 5px;
  cursor: pointer;
}
.number.active {
  background: rgb(56,56,56);
}
.number:hover {
    background: #00A6FF;
}
</style>
