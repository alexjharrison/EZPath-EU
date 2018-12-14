<template>
  <div class="tree-column">
    <button class="reset" @click="clear">{{ text["Clear All"] }}</button>
    <FilterCategory
      v-for="(category,index) in filterStructureTranslated"
      class="filter-prop"
      :categoryName="category.category"
      :filters="category.filters"
      :disabledList="isDisabled"
      v-on:checked="onCheckClick"
      :key="category.filters[category.filters.length-1].label"
      :index="index"
      :text="text"
      :reset="reset"
    />
  </div>
</template>

<script>
import FilterCategory from "./FilterCategory";
import axios from "axios";

export default {
  components: {
    FilterCategory
  },
  props: ["text", "allText"],
  data() {
    return {
      allProducts: [],
      allChecked: [],
      fullPropertiesList: [],
      filteredProdList: this.allProducts,
      reset: false,
      filterStructureEng: [],
      filterStructureTranslated: [],
      //list of all checked id's
      isDisabled: ["el_other"],
      phrases: Object.keys(this.allText.english)
    };
  },
  mounted() {
    setTimeout(this.cloneAndStartTranslate, 0);
    axios
      .get("https://alex-dev-api.stifirestop.com/ezpath-eu/products")
      .then(({ data }) => {
        this.fullPropertiesList = data.allProperties.map(
          property => property.js_id
        );
        //find where parent is blank and create array of category objects
        let categories = data.allProperties
          .filter(category => !category.parent)
          .map(category => {
            return this.generateTree(category, data.allProperties);
          });
        this.filterStructureEng = [...categories];
        this.allProducts = this.filteredProdList = data.allProducts;
        this.cloneAndStartTranslate();
        this.disableCheckboxes();
      })
      .catch(err => console.log(err));
  },
  methods: {
    //push list of checked items from component and remove dupes
    onCheckClick(values) {
      this.allChecked[values.index] = values.checked;
      const checkedFlatArr = this.allChecked.reduce(
        (acc, val) => acc.concat(val),
        []
      );
      this.filteredProdList = this.filterProds(checkedFlatArr);
      console.log(this.filteredProdList);
      this.isDisabled = this.disableCheckboxes();
      this.$emit("checked", {
        filteredProdList: this.filteredProdList,
        noneChecked: !values.checked.length
      });
    },
    disableCheckboxes() {
      if (!this.filteredProdList[0]) return [];
      let enabledItems = [];
      this.filteredProdList.forEach(prod => {
        prod.properties.forEach(property => {
          if (!enabledItems.includes(property)) {
            enabledItems.push(property);
          }
        });
      });
      return this.fullPropertiesList.filter(
        property => !enabledItems.includes(property)
      );
    },
    filterProds(checkedFlatArr) {
      return this.allProducts.filter(prod => {
        for (let i = 0; i < checkedFlatArr.length; i++) {
          if (!prod.properties.includes(checkedFlatArr[i])) {
            return false;
          }
        }
        return true;
      });
    },
    generateTree(category, properties) {
      let rootBranch = {
        id: category.js_id,
        category: category.label,
        filters: properties
          .filter(property => property.parent === category.js_id)
          .map(property => {
            let check = {
              id: property.js_id,
              label: property.label,
              children: this.generateTreeBranchRecursive(
                property.js_id,
                properties
              )
            };
            if (check.children.length === 0) delete check.children;
            return check;
          })
      };
      return rootBranch;
    },
    generateTreeBranchRecursive(parentId, properties) {
      let output = properties.filter(property => parentId === property.parent);
      if (output !== []) {
        output = output.map(property => {
          let check = {
            id: property.js_id,
            label: property.label.replace("@less_than", "≤"),
            children: this.generateTreeBranchRecursive(
              property.js_id,
              properties
            )
          };
          if (check.children.length === 0) delete check.children;
          return check;
        });
      }
      return output;
    },
    clear() {
      this.reset = !this.reset;
    },
    cloneAndStartTranslate() {
      this.filterStructureTranslated = JSON.parse(
        JSON.stringify(this.filterStructureEng)
      );
      for (let i = 0; i < this.filterStructureTranslated.length; i++) {
        this.recursiveTranslate(this.filterStructureTranslated[i]);
      }
    },
    recursiveTranslate(node) {
      if (node.category) {
        //stuff on category
        this.phrases.forEach(phrase => {
          node.category = node.category.split(phrase).join(this.text[phrase]);
          for (let i = 0; i < node.filters.length; i++) {
            this.recursiveTranslate(node.filters[i]);
          }
        });
      } else {
        //stuff on label
        this.phrases.forEach(phrase => {
          node.label = node.label.split(phrase).join(this.text[phrase]);
        });
        if (node.children) {
          for (let i = 0; i < node.children.length; i++) {
            this.recursiveTranslate(node.children[i]);
          }
        }
      }
    }
  },
  watch: {
    text() {
      //translate checkboxes
      this.cloneAndStartTranslate();

      //clear product list
      for (let i = 0; i < this.filteredProdList.length; i++)
        this.onCheckClick({ value: i, checked: [] });
    }
  }
};
</script>

<style scoped>
.reset {
  position: absolute;
  right: 40px;
  top: 16px;
  background-color: white;
  border: 2px solid rgb(224, 224, 222);
  border-radius: 5px;
  color: rgb(60, 36, 2);
  font-weight: 600;
  transition: all linear 200ms;
  outline: none;
  cursor: pointer;
  z-index: 1000;
}
.reset:hover {
  border: #888 2px solid;
}
.filter-prop {
  margin-top: 15px;
}
</style>
