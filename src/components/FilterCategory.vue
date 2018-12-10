<template>
<div>
  <h3 class="category-name">{{categoryName}}</h3>
  <treeselect v-on:input="checked"  
    v-model="value" :multiple="true" :options="options" 
    :always-open="true" :flat="true" placeholder=""
    :auto-select-ancestors="true" :auto-deselect-descendants="true" 
    sort-value-by="INDEX" :searchable="false" 
    open-direction="below" :max-height="500" class="drop-downs"
    :key="this.filters[0].label"
  />
  
</div>
  
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  props: ["categoryName", "filters", "disabledList", "index", "text", "reset"],
  components: { Treeselect },
  data() {
    return {
      value: [],
      options: this.filters
    };
  },
  methods: {
    checked() {
      this.$emit("checked", {
        checked: this.value,
        index: this.index
      });
      this.expandTree(this);
      this.checkSingleChildren();
    },
    expandTree(location) {
      if (location.$children[0]) {
        location.$children.forEach(childLocation => {
          try {
            childLocation.$options.propsData.node.isExpanded = this.value.includes(
              childLocation.$options.propsData.node.id
            );
          } catch {
            null;
          }
          this.expandTree(childLocation);
        });
      }
    },
    checkSingleChildren() {
      //make me tomorrow
    },
    disableOptions(branch) {
      for (let i = 0; i < branch.length; i++) {
        this.$set(
          branch[i],
          "isDisabled",
          this.disabledList.includes(branch[i].id)
        );
        if (branch[0].children) this.disableOptions(branch[i].children);
      }
    },
    updateOptions() {
      this.options = this.filters;
      this.disableOptions(this.options);
    }
  },
  watch: {
    filters() {
      this.updateOptions();
    },
    disabledList() {
      this.updateOptions();
    },
    reset() {
      this.value = [];
    }
  }
};
</script>

<style>
.category-name {
  margin: 5px;
}
</style>
