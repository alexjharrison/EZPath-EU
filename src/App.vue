<template>
  <div id="app">
    <div class="header">
      <div class="header-text">
        <img class="logo" src="./assets/ezPathLogoOrange.png" alt="logo">
        <h1>{{" "}}{{ translations[language].title }}</h1>
      </div>
      <div class="lang-col">
        <p>{{ translations[language].language }}</p>
        <div class="language-select">
          <img
            v-for="languageDisplayed in languagesDisplayed"
            :key="languageDisplayed"
            :src="`/img/`+languageDisplayed+`_flag.png`"
            :alt="languageDisplayed"
            @click="selectLanguage"
          >
        </div>
      </div>
    </div>
    <MainContent :text="translations[language]"/>
  </div>
</template>

<script>
import MainContent from "./components/MainContent";
import Translations from "./translations";

export default {
  name: "app",
  components: {
    MainContent
  },
  data() {
    return {
      language: localStorage.getItem("ezpath-language"),
      languagesDisplayed: ["english", "french", "german", "italian", "dutch"],
      translations: Translations
    };
  },
  methods: {
    selectLanguage(e) {
      this.language = e.target.alt;
      localStorage.setItem("ezpath-language", e.target.alt);
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
.header h1 {
  display: inline;
  font-weight: 200;
  font-size: 44px;
}
.logo {
  width: 237px;
  height: 41px;
}
.drop-downs {
  font-size: 14px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1322px;
  margin: 0 auto;
  border-bottom: 2px rgb(224, 224, 222) solid;
  padding: 27px;
}

.lang-col {
  display: inline;
  text-align: center;
}

.lang-col p {
  margin: 0;
}
.language-select img {
  width: 55px;
  height: 35px;
  margin: 3px;
  border: 1px rgb(224, 224, 222) solid;
}

.language-select img:hover {
  opacity: 0.8;
  cursor: pointer;
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

@media only screen and (max-width: 1050px) {
  .header-text {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .header h1 {
    display: block;
    margin: 0;
    font-size: 34px;
  }
}
@media only screen and (max-width: 800px) {
  .header {
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    padding-bottom: 0;
  }
  .lang-col {
    border-top: 2px rgb(224, 224, 222) solid;
    padding: 8px;
  }
  .language-select img {
    width: 45px;
    height: 28px;
    margin: 2px;
  }
  .vue-treeselect__menu {
    line-height: 250%;
  }
}
@media only screen and (max-width: 500px) {
  .header {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
