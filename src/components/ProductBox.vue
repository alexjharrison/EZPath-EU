<template>
  <div @click="prodModalTrigger" class="product-item">
    <div class="prod-details">
      <h3 id="prod-title">{{prod.system_shown}}</h3>
      <ProductDetails class="prod-details-list" :prod="this.prod" :text="this.text"/>
    </div>
    <div class="prod-thumb">
      <h3 class="prod-thumb-title">{{prod.system_shown}}</h3>
      <img :src="`${assets}${prod.image_location}.png`" alt="image-preview">
      <div class="more-info">{{ text["More Info"] }}</div>
    </div>
    <ul class="dl-list">
      <a :href="prod.tech_data_sheet">
        <li @click.stop>
          <img src="../assets/pdf.png" alt="pdf-icon">
          {{ text["Technical Data Sheet"] }}
        </li>
      </a>
      <a :href="prod.application_sheet">
        <li @click.stop>
          <img src="../assets/pdf.png" alt="pdf-icon">
          {{ text["Application Sheet"] }}
        </li>
      </a>
      <a :href="prod.installation_sheet">
        <li @click.stop>
          <img src="../assets/pdf.png" alt="pdf-icon">
          {{ text["Installation Sheet"] }}
        </li>
      </a>
      <a @click.stop.prevent>
        <li @click="$emit('openVidModal',prod.installation_video)">
          <img src="../assets/play.png" alt="pdf-icon">
          {{ text["Installation Video"] }}
        </li>
      </a>
    </ul>
  </div>
</template>

<script>
import ProductDetails from "./ProductDetails";

export default {
  components: {
    ProductDetails
  },
  props: ["prod", "index", "text"],
  data() {
    return {
      assets: "https://assets.stifirestop.com/images/ezpath-eu/"
    };
  },
  methods: {
    prodModalTrigger() {
      if (window.innerWidth < 980) {
        this.$emit("prodModalTrigger", this.prod);
      }
    }
  },
  computed: {
    fullname() {
      let deviceName = this.prod.device_name;
      let plateKit = this.prod.plate_kit ? " + " + this.prod.plate_kit : "";
      return deviceName + plateKit;
    }
  }
};
</script>

<style>
.product-item {
  height: 218px;
  padding: 10px 0;
  text-align: left;
  display: flex;
  justify-content: space-around;
  justify-content: space-evenly;
  align-items: center;
  font-size: 14px;
  border-bottom: 2px solid rgb(224, 224, 222);
}
/* Because edge can't do justify-content:space-evenly */
@supports (-ms-ime-align: auto) {
  .product-item {
    justify-content: space-around;
  }
}
.prod-details {
  text-align: right;
}
.product-item > * {
  width: 32%;
}
.prod-thumb {
  text-align: center;
}
.prod-thumb img {
  max-width: 200px;
  position: relative;
  /* right: 15px;/ */
}
.prod-thumb-title {
  display: none;
  text-align: center;
}
.product-item:hover {
  background-color: rgb(255, 250, 245);
}
.more-info {
  display: none;
}
.dl-list {
  padding: 0;
  line-height: 44px;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  min-width: 180px;
}
.dl-list img {
  height: 30px;
  vertical-align: middle;
  margin-right: 5px;
}

.dl-list a {
  text-decoration: none;
  color: black;
}
.dl-list a:hover {
  cursor: pointer;
}
.dl-list a:active {
  color: black;
}
#prod-title {
  padding: 0;
  line-height: 28px;
  font-size: 18px;
}

@media only screen and (max-width: 980px) {
  .more-info {
    display: block;
    padding: 2px;
    border-radius: 5px;
    margin-top: 10px;
    font-weight: 600;
    border: 2px solid rgb(224, 224, 222);
    transition: all linear 200ms;
    background-color: rgb(250, 250, 250);
    text-align: center;
  }
  .more-info:hover {
    border: #888 2px solid;
  }
  .product-item {
    cursor: pointer;
  }
  .prod-thumb img {
    height: 90px;
    flex: 0 1 auto;
  }
  .prod-thumb {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .prod-thumb-title {
    display: block;
    margin-top: 0;
  }
  .prod-details {
    display: none;
  }
}

@media only screen and (max-width: 637px) {
  .prod-thumb {
    width: 130px;
    height: auto;
    padding: 20px 20px 10px 0;
  }
  .prod-thumb-title {
    text-align: center;
  }
  .product-item {
    flex-wrap: wrap;
    height: auto;
    padding: 0 10px;
  }
  .prod-details-list {
    display: none;
  }
  .product-item:active {
    box-shadow: none;
    transform: translateX(2px) translateY(2px);
  }
}
</style>
