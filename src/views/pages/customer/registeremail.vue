<template>
  <div style="background-image: url('bg.png');background-repeat: repeat;background-size: 1714px 1142px;">
    <div class="auth-wrapper auth-v1 px-2">
      <div class="auth-inner py-2">

        <!-- Login v1 -->
        <b-card class="mb-0" style="background-color: rgb(255, 255, 242);">
          <b-link class="brand-logo">
            <vuexy-logo />

            <h2 class="brand-text text-primary ml-1">
              BigaByte Membership
            </h2>
          </b-link>

          <b-card-title class="mb-1 ">
            ใส่ Email ที่ใช้ในการสมัคร
          </b-card-title>
          <b-form class="auth-login-form mt-2 " @submit.prevent>
            <b-form-group class="text-center">
              <b-avatar :src="avatarImgUrl" size="6rem" variant="primary" class="mb-2"></b-avatar>
            </b-form-group>
            <!-- 
              <b-form-group                  
                label="Line Id"
                label-for="lineid"
                style="color: white;"
              >
                
                  <b-form-input
                    id="lineid"
                    v-model="lineId"                      
                    name="lineid"
                    readonly
                  />
                  
              </b-form-group> -->

            <b-form-group label="Email" label-for="email" style="color: white;">

              <b-form-input id="email" v-model="email" name="email" placeholder="Enter Email" />

            </b-form-group>

            <b-form-group>
              <span style="color:red;"> {{ errorMessage }} </span>
            </b-form-group>

            <b-button type="submit" variant="primary" block @click="registerEmail()">
              ยืนยัน
            </b-button>
          </b-form>

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
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton, BCard, BAvatar
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { mapActions } from "vuex";

import useJwt from '@/auth/jwt/useJwt'

import { AbilityBuilder } from '@casl/ability';
import { useUtils as useI18nUtils } from '@core/libs/i18n'

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
    BAvatar,
  },
  mixins: [togglePasswordVisibility],
  setup(props, {
    emit
  }) {

    const { t } = useI18nUtils();

    return {
      t,
    }
  },
  data() {
    return {
      status: '',
      password: '',
      username: '',
      otp: '',
      sideImg: require('@/assets/images/pages/login-v3.png'),
      // validation rulesimport store from '@/store/index'
      required,
      email: '',
      lineId: '',
      avatarImgUrl: require('@/assets/images/avatars/4.png'),
      displayName: '',
      errorMessage: '',
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
  async created() {
    //const params = new URLSearchParams(window.location.search)
    //this.lineId = params.get('lineid') || ''
    this.getSourceProfile();
  },
  methods: {
    ...mapActions(["GetLineProfileByLineSourceId"]),
    ...mapActions(["RegisterMemberWithEmail"]),
    async validationForm() {

    },
    async getSourceProfile() {
      console.log('getSourceProfile');

      //const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      //get query string
      const params = new URLSearchParams(window.location.search);
      const sourceUserId = params.get('sourceUserId') || '';

      formData.append("userid", "-");
      formData.append("token", "-");

      formData.append("line_source_id", sourceUserId);
      formData.append("page_name", this.$route.name);

      const response = await this.GetLineProfileByLineSourceId(formData);
      if (response.data.status == 'success') {
        if (response.data.data.length > 0) {
          this.lineId = response.data.data[0].lineid;
          this.email = response.data.data[0].email;
          // if (this.avatarImgUrl = response.data.data[0].picture_url != "") {
          //   this.avatarImgUrl = response.data.data[0].picture_url;
          // }
          if (response.data.data[0].picture_url !== "" && response.data.data[0].picture_url != null) {
            this.avatarImgUrl = response.data.data[0].picture_url;
          }
          
          this.displayName = response.data.data[0].display_name || "";
        } else {
          this.lineId = '';
          this.email = '';
        }
      }
      else {
        this.$toast(
          {
            component: ToastificationContent,
            props: {
              title: response.data.message,
              icon: 'EditIcon',
              variant: 'error',
            },
          });
      }
    },
    async registerEmail() {
      console.log('registerEmail');

      this.errorMessage = "";

      //const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      //get query string
      const params = new URLSearchParams(window.location.search);
      const sourceUserId = params.get('sourceUserId') || '';

      formData.append("userid", "-");
      formData.append("token", "-");

      formData.append("line_id", sourceUserId);
      formData.append("email", this.email);
      formData.append("display_name", this.displayName);
      formData.append("page_name", this.$route.name);
      // formData.append("line_displayurl", this.avatarImgUrl);
      formData.append("line_displayurl", typeof this.avatarImgUrl === 'string' ? this.avatarImgUrl : '');



      const response = await this.RegisterMemberWithEmail(formData);
      if (response.data.status == 'success') {
        this.$toast(
          {
            component: ToastificationContent,
            props: {
              title: response.data.message,
              icon: 'CheckIcon',
              variant: 'success',
            },
          });

        this.$router.push({ name: 'buy-product', query: { sourceUserId: sourceUserId, email: this.email } });
      }
      else {
        this.$toast(
          {
            component: ToastificationContent,
            props: {
              title: response.data.message,
              icon: 'EditIcon',
              variant: 'error',
            },
          });

        this.errorMessage = response.data.message;
      }
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
