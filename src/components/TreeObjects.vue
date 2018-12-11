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
import allProducts from "../../data.json";
import filterStructure from "../../filter-structure.json";

export default {
  components: {
    FilterCategory
  },
  props: ["text", "allText"],
  data() {
    return {
      allProducts,
      allChecked: [],
      filteredProdList: this.allProducts,
      reset: false,
      filterStructureEng: [...filterStructure],
      filterStructureTranslated: filterStructure,
      //list of all checked id's
      isDisabled: [],
      phrases: Object.keys(this.allText.english)
    };
  },
  mounted() {
    this.filteredProdList = this.allProducts;
    this.isDisabled = disableCheckboxes(this.filteredProdList);
    setTimeout(this.cloneAndStartTranslate, 0);
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
    },
    cloneAndStartTranslate() {
      this.filterStructureTranslated = JSON.parse(
        JSON.stringify(this.filterStructureEng)
      );
      console.log(this.filterStructureTranslated);
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
