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
          <p>{{ text["Performance"] }}: {{ text["up to"] }} {{elRating}}</p>
          <p>{{ text["Cables"] }}: {{cables}}</p>
          <p>{{barrierTypes}}</p>
          <p v-if="pvc">{{pvc}}</p>
          <p v-if="inProps('existing')">{{text["For existing cables"]}}</p>
          <p v-if="inProps('new')">{{text["For new construction"]}}</p>
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
  line-height: 0.7em;
}
.close-button {
  align-self: flex-end;
  background-color: white;
  border: 2px solid rgb(224, 224, 222);
  border-radius: 5px;
  color: rgb(60, 36, 2);
  font-weight: 600;
  transition: all linear 200ms;
  outline: none;
  cursor: pointer;
}
.close-button:hover {
  border: #888 2px solid;
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
