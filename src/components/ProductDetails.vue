<template>
<div class="prod-deets">
    <p>EZ-Path: {{prod.details.numDevices}}x {{prod.details.deviceName}}</p>
    <p v-if="prod.details.plateKit">{{ text.plateKit }}: {{prod.details.plateKit}}</p>
    <p v-if="prod.details.addtlMaterial">{{ text.addtlMaterial }}: {{prod.details.addtlMaterial}}</p>
    <p>{{ text.performance }}: {{ text.upTo }} El{{elRating}}</p>
    <p>{{ text.cables }}: {{cables}}</p>
    <p>{{barrierTypes}}</p>
    <p v-if="pvc">{{pvc}}</p>
</div>
</template>

<script>
export default {
  props: ["prod", "text"],
  computed: {
    elRating() {
      if (this.prod.filters.el120) return 120;
      else if (this.prod.filters.el90) return 90;
      else if (this.prod.filters.el60) return 60;
      else return "?";
    },
    barrierTypes() {
      const { wallFlexible, wallRigid, floorRigid } = this.prod.filters;
      if (wallFlexible && wallRigid)
        return `${this.text.wall}: ${this.text.flexible} & ${this.text.rigid}`;
      else if (wallFlexible) return `${this.text.wall}: ${this.text.flexible}`;
      else if (wallRigid) return `${this.text.wall}: ${this.text.rigid}`;
      else if (floorRigid) return `${this.text.floor}: ${this.text.rigid}`;
    },
    cables() {
      const { cabUnder21mm, cab21To50mm, cab50To80mm } = this.prod.filters;
      if (cabUnder21mm && cab21To50mm && cab50To80mm) return "Ø ≤ 80mm";
      else if (cab21To50mm && cab50To80mm) return "21mm < Ø ≤ 80mm";
      else if (cab50To80mm) return "50mm < Ø ≤ 80mm";
      else if (cab21To50mm) return "21mm < Ø ≤ 50mm";
      else if (cabUnder21mm) return "Ø ≤ 21mm";
      else return "";
    },
    pvc() {
      return this.prod.filters.pvcUnder16mm
        ? this.text.tubes + ": Ø ≤ 16.6mm"
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
