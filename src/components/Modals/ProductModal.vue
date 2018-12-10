<template>
  <transition name="modal">
    <div @click="$emit('closeModal')" class="modal-mask">
      <div @click.stop class="modal-prod">
        <div class="display">
          <h2>{{prod.details.system_shown}}</h2>
          <img class="prod-photo" :src="prod.details.imageLocation" alt="placeholder">
        </div>
        <div class="prod-text">
          <p>EZ-Path: {{prod.details.numDevices}}x {{prod.details.deviceName}}</p>
          <p v-if="prod.details.plateKit">{{ text.plateKit }}: {{prod.details.plateKit}}</p>
          <p
            v-if="prod.details.addtlMaterial"
          >{{ text.addtlMaterial }}: {{prod.details.addtlMaterial}}</p>
          <p>{{ text.performance }}: {{ text.upTo }} El{{elRating}}</p>
          <p>{{ text.cables }}: {{cables}}</p>
          <p>{{barrierTypes}}</p>
          <p v-if="pvc">{{pvc}}</p>
        </div>
        <button class="close-button" @click="$emit('closeModal')">Close</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["prod", "text"],
  data() {
    return {
      stuff: "stuff"
    };
  },
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
.modal-mask {
  position: fixed;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}
.modal-prod {
  background-color: white;
  padding: 15px 20px;
  z-index: 1000;
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  border-radius: 3px;
  transition: all 0.3s ease;
  margin: 0 20px;
}
.prod-photo {
  width: 300px;
}
.prod-text {
  margin-left: 10px;
}
.close-button {
  align-self: flex-end;
}
.display h2 {
  text-align: center;
}

/* enter/leave transitions */
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-prod,
.modal-leave-active .modal-prod {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
