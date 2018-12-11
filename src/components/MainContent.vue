<template>
  <div class="main-content">
    <i @click="toggleSidebar" class="fa fa-filter filter-button floating" aria-hidden="true"/>
    <simplebar class="simple-tree sb-closed" data-simplebar-auto-hide="true">
      <TreeObjects :allText="allText" class="tree-objects" @checked="filterList" :text="text"/>
      <div class="close-sb" @click="toggleSidebar">{{ text["Search Items"] }}</div>
    </simplebar>
    <div class="welcome-mobile" v-if="!sidebarOpen && !filteredProdList[0]">
      <h2>{{ text["Press the filter icon to start your search"] }}</h2>
      <i @click="toggleSidebar" class="fa fa-filter filter-button start-filter" aria-hidden="true"/>
    </div>
    <div @click="toggleSidebar" v-if="$mq==='mobile'" class="slider-mask"/>
    <simplebar v-if="$mq==='desktop'" class="simple-prod" data-simplebar-auto-hide="true">
      <div class="product-list">
        <h2 v-if="filteredProdList[0]">{{filteredProdList.length}} {{ text["Items Available"] }}</h2>
        <h2 v-else>
          <br>
          {{ text["Choose filter options from the choices to the left"] }}
        </h2>
        <transition-group name="products">
          <ProductBox
            v-for="(prod,index) in filteredProdList"
            :prod="prod"
            :index="index"
            :key="index"
            @prodModalTrigger="prodModalTrigger"
            @openVidModal="vidModalTrigger"
            :text="text"
          />
        </transition-group>
      </div>
    </simplebar>
    <div v-if="$mq==='mobile'" class="simple-prod-mobile">
      <transition-group name="products">
        <ProductBox
          v-for="(prod,index) in filteredProdList"
          :prod="prod"
          :index="index"
          :key="index"
          @prodModalTrigger="prodModalTrigger"
          @openVidModal="vidModalTrigger"
          :text="text"
        />
      </transition-group>
    </div>
    <ProductModal
      class="modal"
      @closeModal="closeModal"
      :prod="selectedProd"
      v-if="prodModalOpen"
      :text="text"
    />
    <VideoModal
      class="modal"
      @closeModal="closeModal"
      :video="selectedVideo"
      v-if="vidModalOpen"
      :text="text"
    />
  </div>
</template>

<script>
import TreeObjects from "./TreeObjects";
import ProductBox from "./ProductBox";
import { ProductModal, VideoModal } from "./Modals";
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

export default {
  components: {
    TreeObjects,
    ProductBox,
    ProductModal,
    VideoModal,
    simplebar
  },
  props: ["text", "allText"],
  data() {
    return {
      selectedProd: {},
      prodModalOpen: false,
      vidModalOpen: false,
      selectedVideo: "",
      filteredProdList: [],
      sidebarOpen: false
    };
  },
  methods: {
    filterList({ filteredProdList, noneChecked }) {
      if (noneChecked) this.filteredProdList = [];
      else this.filteredProdList = filteredProdList;
    },
    prodModalTrigger(prod) {
      this.selectedProd = prod;
      this.prodModalOpen = true;
      return prod;
    },
    vidModalTrigger(vidLink) {
      this.selectedVideo = vidLink;
      this.vidModalOpen = true;
    },
    closeModal() {
      this.prodModalOpen = false;
      this.vidModalOpen = false;
    },
    toggleSidebar() {
      window.scrollTo(0, 0);
      const body = document.getElementsByTagName("BODY")[0];
      const sidebar = document.getElementsByClassName("simple-tree")[0];
      const mask = document.getElementsByClassName("slider-mask")[0];
      if (this.sidebarOpen) {
        sidebar.classList.remove("sb-open");
        sidebar.classList.add("sb-closed");
        body.setAttribute("style", "overflow:visible;");
        mask.setAttribute("style", "display:none;");
      } else {
        sidebar.classList.remove("sb-closed");
        sidebar.classList.add("sb-open");
        body.setAttribute("style", "overflow:hidden;");
        mask.setAttribute("style", "display:block;");
      }
      this.sidebarOpen = !this.sidebarOpen;
    }
  }
};
</script>

<style>
.main-content {
  max-width: 1332px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 161px);
}
.simple-tree {
  height: calc(100vh - 153px);
  transition: all 0.5s ease-in-out;
}
.tree-objects {
  width: 300px;
  flex-shrink: 0;
}
.product-list {
  text-align: center;
  height: 100%;
}

.product-list h2 {
  margin-bottom: 5px;
}
.product-list h3 {
  margin: 0;
  padding-bottom: 10px;
}

.filter-button {
  display: none;
}

.simple-prod {
  flex-grow: 1;
  /* overflow-y: hidden; */
  height: calc(100vh - 153px);
}

.simple-prod-mobile {
  display: none;
  transition: all 0.5s ease-in-out;
}

/* moving */
.products-move {
  transition: all 1000ms ease-in-out 400ms;
}

/* appearing */
.products-enter-active {
  transition: all 500ms ease-in;
}

/* disappearing */
.products-leave-active {
  transition: all 1000ms ease-in-out;
  z-index: 0;
}

/* appear at / disappear to */
.products-enter,
.products-leave-to {
  opacity: 0;
}

.product-enter-to {
  opacity: 1;
}

.close-sb {
  display: none;
}
.welcome-mobile {
  display: none;
}

.slider-mask {
  width: 100vw;
  height: 100vh;
  z-index: 1;
  display: none;
  position: fixed;
}

@media only screen and (max-width: 800px) {
  .main-content {
    height: 0;
  }
  .sb-open {
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 2;
    height: 100vh;
    padding: 5px;
    width: 304px;
  }
  .sb-closed {
    transform: translateX(-400px);
    width: 0;
  }
  .simple-prod {
    display: none;
  }
  .simple-prod-mobile {
    display: block;
    width: 100%;
  }
  .filter-button {
    display: block;
    cursor: pointer;
    font-size: 30px;
    color: rgb(244, 120, 54);
    border: rgb(244, 120, 54) 2px solid;
    border-radius: 30%;
    padding: 5px;
  }
  .floating {
    position: fixed;
    top: 30px;
    left: 10px;
    z-index: 1;
  }
  .start-filter {
    width: 40px;
    font-size: 46px;
    margin: 0 auto;
  }
  .close-sb {
    display: inline-block;
    border: rgb(3, 155, 229) 3px solid;
    font-size: 22px;
    font-weight: 600;
    padding: 5px;
    border-radius: 5px;
    color: #111;
    margin: 25px 0 70px 20px;
    cursor: pointer;
  }
  .welcome-mobile {
    display: block;
    position: fixed;
    text-align: center;
    /* margin: 40px auto; */
    padding: 40px;
    width: 75vw;
  }
}
</style>
