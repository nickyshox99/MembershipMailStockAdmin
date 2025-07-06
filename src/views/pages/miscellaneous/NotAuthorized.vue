<template>
  <div class="misc-wrapper">
    <b-link class="brand-logo">
      
      <h2 class="brand-text text-primary ml-1">
        System
      </h2>
    </b-link>

    <div class="misc-inner p-2 p-sm-3">
      <div class="w-100 text-center">
        <h2 class="mb-1">
          You are not authorized! 🔐
        </h2>
        <p class="mb-2">
          You don’t have permission to access this page.
        </p>
        <!-- <b-button
          variant="primary"
          class="mb-1 btn-sm-block"
          @click="gotoDefault()"
        >Go to Home</b-button> -->
        &nbsp;
        <!-- <b-button
          variant="primary"
          class="mb-1 btn-sm-block"
          @click="loginRoute()"
        >Go to Login</b-button>
        <b-img
          fluid
          :src="imgUrl"
          alt="Home"
        /> -->

        
       
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { BLink, BImg, BButton } from 'bootstrap-vue';
import VuexyLogo from '@core/layouts/components/Logo.vue';
import store from '@/store/index';
import { getHomeRouteForLoggedInUser } from '@/auth/utils';
import { initialAbility } from '@/libs/acl/config';

import { mapActions } from "vuex";

export default {
  components: {
    BLink, BImg, BButton, VuexyLogo,
  },
  data() {
    return {
      downImg: require('@/assets/images/pages/not-authorized.svg'),
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require('@/assets/images/pages/not-authorized-dark.svg')
        return this.downImg
      }
      return this.downImg
    },
  },
  methods: {
    ...mapActions(["LogOut"]),
    async loginRoute() {
      console.log("loginRoute"); 
      // const user = JSON.parse(localStorage.getItem('userData'))
      // getHomeRouteForLoggedInUser(user ? user.role : null);

      // window.localStorage.clear();

      // return {name:'auth-login'};

      this.$ability.update(initialAbility)
      let response = await this.LogOut();
      // Redirect to login page
      this.$router.push({ name: 'auth-login' })
    },
    gotoDefault()
    {
      const userData = JSON.parse(localStorage.getItem('userData'));
      console.log(userData.defaultPage);
      if (userData.defaultPage &&userData.defaultPage!='') 
      {
        this.$router.push({ name: userData.defaultPage });
      }
      else
      {
        this.$router.push({ name: 'auth-login' });
      }
      
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>
