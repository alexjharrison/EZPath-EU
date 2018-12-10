<template>
  <div class="tree-column">
    <button class="reset" @click="clear">{{ text.clearAll }}</button>
    <FilterCategory
      v-for="(category,index) in filterStructure"
      class="filter-prop"
      :categoryName="category.category"
      :filters="category.filters"
      :disabledList="isDisabled"
      v-on:checked="onCheckClick"
      :key="index"
      :index="index"
      :text="text"
      :reset="reset"
    />
  </div>
</template>

<script>
import FilterCategory from "./FilterCategory";
import allProducts from "../../data.json";
import filterStructure from "../../filter-structure.json";

export default {
  components: {
    FilterCategory
  },
  props: ["text"],
  data() {
    return {
      allProducts,
      allChecked: [],
      filteredProdList: this.allProducts,
      reset: false,
      //list of all checked id's
      isDisabled: []
    };
  },
  mounted() {
    this.filteredProdList = this.allProducts;
    this.isDisabled = disableCheckboxes(this.filteredProdList);
  },
  methods: {
    //push list of checked items from component and remove dupes
    onCheckClick(values) {
      this.allChecked[values.index] = values.checked;
      const checkedFlatArr = this.allChecked.reduce(
        (acc, val) => acc.concat(val),
        []
      );
      this.filteredProdList = filterProds(this.allProducts, checkedFlatArr);
      this.isDisabled = disableCheckboxes(this.filteredProdList);
      this.$emit("checked", {
        filteredProdList: this.filteredProdList,
        noneChecked: !values.checked.length
      });
    },
    clear() {
      this.reset = !this.reset;
    }
  },
  computed: {
    filterStructure() {
      return filterStructure[this.text.lang];
    }
  }
};

const filterProds = (allProducts, allChecked) => {
  return allProducts.filter(prod => {
    for (let i = 0; i < allChecked.length; i++) {
      if (!prod["filters"][allChecked[i]]) {
        return false;
      }
    }
    return true;
  });
};

const disableCheckboxes = filteredProds => {
  if (!filteredProds[0]) return [];
  let propertiesList = Object.keys(filteredProds[0].filters);
  return propertiesList.filter(property => {
    for (let i = 0; i < filteredProds.length; i++) {
      if (filteredProds[i]["filters"][property]) return false;
    }
    return true;
  });
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
