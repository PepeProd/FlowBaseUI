<template>
  <div class="autocomplete-input">
    <p class="">
      <input v-model="keyword" type="text" class="input is-large" placeholder="Search For..." @input="onInput($event.target.value)" @keyup.esc="closeDropDown()" @blur="isOpen = false" @keydown.down="moveDown" @keydown.up="moveUp" @keydown.enter="select">
    </p>
    <ul v-show="isOpen" class="options-list">
      <li v-for="(option, index) in fOptions" :class="{
          'highlighted': index === highlightedPosition
        }" @mouseenter="highlightedPosition = index" @mousedown="select">
        <slot name="item" :searchSuggestion="option.key"/>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
    name: 'AutoComplete',
    props: {
        options: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            isOpen: false,
            highlightedPosition: 0,
            keyword: ''
        }
    },
    computed: {
        optionsWithNoDuplicates: function() {
          var lookup = {};
          var items = this.options;
          var result = [];

          for (var item, i=0; item=items[i++];) {
              var key = item.key;
              if (!(key in lookup)) {
                  lookup[key]=1;
                  result.push(item);
              }
          }
        return result;   
      },
      fOptions() {
            const re = new RegExp(this.keyword, 'i')
            var results = this.optionsWithNoDuplicates.filter(o => o['key'].match(re));
            if (results.length == 0) {
                this.isOpen = false;
                this.$emit('optionClicked', true)
            }
            return results;
      },
      
    },
    methods: {
      onInput(value) {
            this.highlightedPosition = 0
            this.isOpen = !!value
        },
        closeDropDown() {
            this.isOpen = false;
            this.$emit('optionClicked', true)
        },
        moveDown() {
            if (!this.isOpen) {
                return
            }
            this.highlightedPosition =
                (this.highlightedPosition + 1) % this.fOptions.length
        },
        moveUp() {
          if (!this.isOpen) {
            return
          }
          this.highlightedPosition = this.highlightedPosition - 1 < 0 ? this.fOptions.length - 1 : this.highlightedPosition - 1
        },
        select() {
            if (this.isOpen == false & this.keyword == null) {
                this.keyword = ""
            } else if (this.isOpen == true) {
                const selectedOption = this.fOptions[this.highlightedPosition]
                this.keyword = selectedOption.key
                this.isOpen = false
                this.$emit('optionClicked', this.isOpen)
            }
        }
    },
    watch: {
        keyword: function(val, oldVal) {
            this.$emit('keywordChanged', val);
        }
    },
}

</script>

<style scoped>
   * {
    font-family: 'Open Sans', sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    box-sizing: border-box;
}

    *:focus,*:active:focus,*.active:focus,
    *.focus,*:active.focus,*.active.focus {
        outline: none;
        box-shadow: none;
    }


.autocomplete-input ul {
  list-style-type: none;
  padding: 0;
}

.autocomplete-input p {
    margin: 0px;
    padding: 0px;
}

.autocomplete-input li {
  display: inline-block;
  margin: 0 10px;
}

.autocomplete-input input {
  height: 26px;
  padding: 0;
  margin: 0px;
  border: 1px solid rgb(56,56,56);
  border-radius: 5px;
}

.autocomplete-input {
  position: relative;
  height: 26px;
  margin-bottom: 0px;
}

ul.options-list {
  display: flex;
  flex-direction: column;
  margin-top: 0px;
  border: 1px solid rgb(56,56,56);
  border-radius: 0 0 3px 3px;
  position: absolute;
  width: 100%;
  overflow: hidden;
  z-index: 99999;
}

ul.options-list li {
  width: 100%;
  flex-wrap: wrap;
  background: white;
  margin: 0;
  border-bottom: 1px solid #eeeeee;
  color: #363636;
  padding: 7px;
  cursor: pointer;
}

ul.options-list li.highlighted {
  background: #00A6FF
}
    input[type=text] {
        padding-left: 5px;        
    }
</style>