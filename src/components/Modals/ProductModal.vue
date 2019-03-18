<template>
  <transition name="modal">
    <div @click="$emit('closeModal')" class="modal-mask">
      <div @click.stop class="modal-prod">
        <div class="display">
          <h2>{{prod.system_shown}}</h2>
          <img
            class="prod-photo"
            :src="`${assets}${encodeURIComponent(prod.image_location)}.png`"
            alt="placeholder"
          >
        </div>
        <div class="prod-text">
          <p>EZ-Path: {{prod.num_devices}}x {{prod.device_name}}</p>
          <p v-if="prod.plate_kit">{{ text["Plate Kit"] }}: {{prod.plate_kit}}</p>
          <p
            v-if="prod.additional_materials"
          >{{ text["Additional Material"] }}: {{prod.additional_materials}}</p>
          <p>{{ text["Performance"] }}: {{ text["up to"] }} El{{elRating}}</p>
          <p>{{ text["Cables"] }}: {{cables}}</p>
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
      assets: "https://assets.stifirestop.com/images/ezpath-eu/"
    };
  },
  methods: {
    inProps(prop) {
      return this.prod.properties.includes(prop);
    }
  },
  computed: {
    elRating() {
      if (this.inProps("el_180")) return 180;
      else if (this.inProps("el_120")) return 120;
      else if (this.inProps("el_90")) return 90;
      else if (this.inProps("el_60")) return 60;
      else return "?";
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
