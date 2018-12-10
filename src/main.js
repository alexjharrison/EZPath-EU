import Vue from "vue";
import App from "./App";
import VueMq from "vue-mq";

Vue.use(VueMq, {
  breakpoints: {
    mobile: 800,
    desktop: Infinity
  }
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
