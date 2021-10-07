import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router';
import {routes} from "./routes";
import Keycloak from "keycloak-js";
import VueJwtDecode from "vue-jwt-decode";
import {store} from "./store/store";


const router = new VueRouter({
  routes: routes
})

Vue.config.productionTip = false
Vue.use(VueRouter)


//Keycloak Options
let initOptions = {
  url: 'http://127.0.0.1:8080/auth',
  realm: 'vue-keycloak',
  clientId: 'app-vue',
  onLoad: 'login-required'
}

let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    console.log("Authenticated");

    new Vue({
      vuetify, router, store,
      render: h => h(App, { props: { keycloak: keycloak } })
    }).$mount('#app')
  }

  console.log(keycloak.token);
  const decoded_token = VueJwtDecode.decode(keycloak.token);
  console.log(decoded_token);
  const roles = decoded_token.realm_access.roles;
  const firstname = decoded_token.given_name;
  const lastname = decoded_token.family_name;
  store.commit("store_firstname", firstname);
  store.commit("store_lastname", lastname);
  store.commit("store_roles", roles);
  console.log(roles);
  console.log(firstname);
  console.log(lastname);

//Token Refresh
  setInterval(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        console.log('Token refreshed' + refreshed);
      } else {
        console.warn('Token not refreshed, valid for '
            + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).catch(() => {
      console.error('Failed to refresh token');
    });
  }, 6000)

}).catch(() => {
  console.error("Authenticated Failed");
});