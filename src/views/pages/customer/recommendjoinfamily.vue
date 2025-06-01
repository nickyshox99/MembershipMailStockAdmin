<template>
  <div style="background-image: url('bg.png');background-repeat: repeat;background-size: 1714px 1142px;">
    <div class="auth-wrapper auth-v1 px-2">
      <div class="auth-inner py-2" >

        <!-- Login v1 -->
        <b-card class="mb-0" style="background-color: rgb(255, 255, 242);">
          <b-link class="brand-logo">
            <vuexy-logo />

            <h2 class="brand-text text-primary ml-1">
              BigaByte Membership
            </h2>
          </b-link>

          <b-card-title class="mb-1 ">            
            ขั้นตอนที่ 1            
          </b-card-title>
          <b-card-text class="mb-2 ">
            ทำการใส่ G-mail ที่ใช้ในการสมัคร 
          </b-card-text>

          <b-card-title class="mb-1 ">            
            ขั้นตอนที่ 2
          </b-card-title>
          <b-card-text class="mb-2 ">
            ทำการเลือก Package ที่ต้องการใช้งาน
          </b-card-text>

          <b-card-title class="mb-1 ">            
            ขั้นตอนที่ 3
          </b-card-title>
          <b-card-text class="mb-2 ">
            กดยืนยันอีเมลล์และ Package ที่ต้องการใช้งาน
          </b-card-text>

          <b-card-title class="mb-1 ">            
            ขั้นตอนที่ 4
          </b-card-title>
          <b-card-text class="mb-2 ">
            รอรับ Invite Email เพื่อเข้ากลุ่ม 
          </b-card-text>

          <b-card-title class="mb-1 ">            
            ขั้นตอนที่ 5
          </b-card-title>
          <b-card-text class="mb-2 ">
            ทำการเข้ากลุ่มครอบครัว
          </b-card-text>
    
          <b-card-title class="mb-1 ">            
            ขั้นตอนที่ 6
          </b-card-title>
          <b-card-text class="mb-2 ">
            ชำระเงินพร้อมส่งสลิปยืนยันการชำระเงินทางไลน์
          </b-card-text>
          
        </b-card>
        
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton,BCard
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { mapActions } from "vuex";

import useJwt from '@/auth/jwt/useJwt'

import { AbilityBuilder } from '@casl/ability';

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
    BCard,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      password: '',
      username: '',
      otp: '',
      sideImg: require('@/assets/images/pages/login-v3.png'),
      // validation rulesimport store from '@/store/index'
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  async created(){

  },
  methods: {    
    async validationForm() {

    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
