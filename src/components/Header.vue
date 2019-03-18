<template>
  <div class="header">
    <div class="header-text">
      <img class="logo" src="../assets/ezPathLogoOrange.png" alt="logo">
      <h1>{{ " " }}{{ sysSelectorText }}</h1>
    </div>
    <div class="lang-col">
      <p>{{ chooseLangText }}</p>
      <div class="language-select">
        <img
          v-for="languageDisplayed in languagesDisplayed"
          :key="languageDisplayed"
          :src="`/img/`+languageDisplayed+`_flag.png`"
          :alt="languageDisplayed"
          @click="$emit('newLang',languageDisplayed)"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderBar",
  props: ["translations", "language"],
  data() {
    return {
      languagesDisplayed: ["english", "french", "german", "italian", "dutch"],
      sysSelector: {
        english: "System Selector",
        french: "Sélecteur de Systèmes",
        german: "Systemauswahl",
        italian: "Selettore di Sistema",
        dutch: "Systeemkiezer"
      },
      chooseLang: {
        english: "Select Language",
        french: "Choisir la Langue",
        german: "Sprache Auswählen",
        italian: "Seleziona la Lingua",
        dutch: "Selecteer Taal"
      }
    };
  },
  computed: {
    sysSelectorText() {
      return this.translations
        ? this.translations[this.language]["System Selector"]
        : this.sysSelector[this.language];
    },
    chooseLangText() {
      return this.translations
        ? this.translations[this.language]["Select Language"]
        : this.chooseLang[this.language];
    }
  }
};
</script>

<style scoped>
.header h1 {
  display: inline;
  font-weight: 200;
  font-size: 44px;
}
.logo {
  width: 237px;
  height: 41px;
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
@media only screen and (max-width: 1090px) {
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
}
@media only screen and (max-width: 500px) {
  .header {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
