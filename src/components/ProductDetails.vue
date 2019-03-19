<template>
  <div class="prod-deets">
    <p>EZ-Path: {{prod.num_devices}}x {{prod.device_name}}</p>
    <p v-if="prod.plate_kit">{{ text["Plate Kit"] }}: {{prod.plate_kit}}</p>
    <p
      v-if="prod.additional_materials"
    >{{ text["Additional Material"] }}: {{prod.additional_materials}}</p>
    <p>{{ text["Performance"] }}: {{ text["up to"] }} {{elRating}}</p>
    <p>{{ text["Cables"] }}: {{cables}}</p>
    <p>{{barrierTypes}}</p>
    <p v-if="pvc">{{pvc}}</p>
    <p v-if="inProps('existing')">{{text["For existing cables"]}}</p>
    <p v-if="inProps('new')">{{text["For new construction"]}}</p>
  </div>
</template>

<script>
export default {
  props: ["prod", "text"],
  methods: {
    inProps(prop) {
      return this.prod.properties.includes(prop);
    }
  },
  computed: {
    elRating() {
      let ratings = [];
      if (this.inProps("el_180")) ratings.push("El 180");
      else if (this.inProps("el_120")) ratings.push("El 120");
      else if (this.inProps("el_90")) ratings.push("El 90");
      else if (this.inProps("el_60")) ratings.push("El 60");

      if (this.inProps("e_240")) ratings.push("E 240");
      else if (this.inProps("e_180")) ratings.push("E 180");
      else if (this.inProps("e_120")) ratings.push("E 120");
      else if (this.inProps("e_90")) ratings.push("E 90");
      else if (this.inProps("e_60")) ratings.push("E 60");

      return ratings.join(", ");
    },
    barrierTypes() {
      if (this.inProps("wall_flexible") && this.inProps("wall_rigid"))
        return `${this.text["Wall"]}: ${this.text["Flexible"]} & ${
          this.text["Rigid"]
        }`;
      else if (this.inProps("wall_flexible"))
        return `${this.text["Wall"]}: ${this.text["Flexible"]}`;
      else if (this.inProps("wall_rigid"))
        return `${this.text["Wall"]}: ${this.text["Rigid"]}`;
      else if (this.inProps("floor_rigid"))
        return `${this.text["Floor"]}: ${this.text["Rigid"]}`;
    },
    cables() {
      if (
        this.inProps("cables_21") &&
        this.inProps("cables_21_50") &&
        this.inProps("cables_50_80")
      )
        return "Ø ≤ 80mm";
      else if (this.inProps("cables_21_50") && this.inProps("cables_50_80"))
        return "21mm < Ø ≤ 80mm";
      else if (this.inProps("cables_50_80")) return "50mm < Ø ≤ 80mm";
      else if (this.inProps("cables_21_50")) return "21mm < Ø ≤ 50mm";
      else if (this.inProps("cables_21")) return "Ø ≤ 21mm";
      else return "";
    },
    pvc() {
      return this.inProps("pvc_tubes_16")
        ? this.text["PVC Tubes"] + ": Ø ≤ 16.6mm"
        : "";
    }
  }
};
</script>

<style>
.prod-deets p {
  margin: 0;
  font-size: 14px;
  line-height: 21px;
}
</style>
