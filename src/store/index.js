import Vue from 'vue'
import Vuex from 'vuex'

// Modules

import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import systemdata from "./modules/systemdata";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    app,
    appConfig,
    verticalMenu,
    systemdata,    
  },  
  plugins: [createPersistedState()],
  strict: process.env.DEV,
})
