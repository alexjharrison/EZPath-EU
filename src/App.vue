<template>
  <div id="app">
    <HeaderBar @newLang="selectLanguage" :language="language" :translations="translations"/>
    <div v-if="loading"></div>
    <MainContent v-else :text="translations[language]" :allText="translations"/>
  </div>
</template>

<script>
import MainContent from "./components/MainContent";
import HeaderBar from "./components/Header";
import Axios from "axios";

export default {
  name: "app",
  components: {
    MainContent,
    HeaderBar
  },
  data() {
    return {
      translations: null,
      language: localStorage.getItem("ezpath-language") || "english",
      loading: true
    };
  },

  mounted() {
    Axios.get(process.env.VUE_APP_API + "translations")
      .then(({ data }) => {
        this.translations = data;
        this.loading = false;
      })
      .catch(e => {
        throw new Error(e);
      });
  },
  methods: {
    selectLanguage(newLang) {
      this.language = newLang;
      localStorage.setItem("ezpath-language", newLang);
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,700");
body {
  background-color: #fff;
}
#app {
  font-family: "Roboto", sans-serif;
  letter-spacing: -0.1px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
h1 {
  text-align: center;
}
.drop-downs {
  font-size: 14px;
  z-index: 0;
}

.vue-treeselect__menu-container {
  position: relative;
}
.vue-treeselect__menu {
  position: relative;
  border: none;
}
.vue-treeselect__control {
  display: none;
}
.vue-treeselect__label-container {
  border-bottom: 1px solid rgb(224, 224, 222);
}
.vue-treeselect__option {
  background-color: #fff;
}
.vue-treeselect--open-below .vue-treeselect__menu {
  box-shadow: none;
}
@media only screen and (max-width: 800px) {
  .vue-treeselect__menu {
    line-height: 250%;
  }
}

/* spinner css */
.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: #f47836;
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
