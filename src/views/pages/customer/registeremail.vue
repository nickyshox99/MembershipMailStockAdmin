<template>
  <div class="register-container">
    <div class="register-background">
      <div class="background-overlay"></div>
    </div>
    
    <div class="auth-wrapper auth-v1 px-2">
      <div class="auth-inner py-2">

        <b-card class="register-card mb-0">
          <div class="logo-section">

          
            <h2 class="brand-text">
              BigaByte Membership
            </h2>

          </div>

          <div class="welcome-section">
            <h3 class="welcome-title">ยินดีต้อนรับสู่ระบบสมาชิก</h3>
            <p class="welcome-subtitle">กรุณาใส่ Email ที่ใช้ในการสมัครสมาชิก</p>
          </div>

          <div class="form-section">
            <b-form class="auth-login-form" @submit.prevent>
              <b-form-group class="avatar-section text-center">
                <b-avatar
                  :src="avatarImgUrl"
                  size="6rem"
                  class="user-avatar mb-3"
                ></b-avatar>
                <h5 class="user-name">{{ displayName || 'ผู้ใช้ LINE' }}</h5>
              </b-form-group>

              <b-form-group class="form-group-modern">
                <label for="email" class="form-label">
                  <feather-icon icon="MailIcon" class="label-icon" />
                  Email Address
                </label>
                <b-form-input
                  id="email"
                  v-model="email"
                  name="email"
                  placeholder="กรุณาใส่ Email ของคุณ"
                  class="form-input-modern"
                />
              </b-form-group>

              <b-form-group v-if="errorMessage" class="error-section">
                <div class="error-message">
                  <feather-icon icon="AlertCircleIcon" class="error-icon" />
                  {{ errorMessage }}
                </div>
              </b-form-group>

              <div class="submit-section">
                <b-button
                  type="submit"
                  variant="primary"
                  block
                  class="submit-button"
                  @click="registerEmail()"
                >
                  <feather-icon icon="CheckIcon" class="button-icon" />
                  ยืนยันการสมัครสมาชิก
                </b-button>
              </div>
            </b-form>
          </div>
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

// Modern Register Email Styling - White, Black, Red Theme
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  font-family: 'MiSansMU', sans-serif;
}

.register-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #dc3545 0%, #a71e2a 50%, #000000 100%);
  opacity: 0.05;
  z-index: 1;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(220, 53, 69, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(0, 0, 0, 0.1) 0%, transparent 50%);
  z-index: 2;
}

.auth-wrapper {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 400px;
}

.register-card {
  background: rgba(255, 255, 255, 0.95) !important;
  border: none !important;
  border-radius: 24px !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  animation: slideInUp 0.8s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-section {
  text-align: center;
  margin-bottom: 2rem;
  
  .brand-text {
    color: #dc3545 !important;
    font-family: 'MiSansMU', sans-serif;
    font-weight: 700;
    font-size: 1.8rem;
    margin-top: 1rem;
    margin-bottom: 0;
    text-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);
  }
}

.welcome-section {
  text-align: center;
  margin-bottom: 2rem;
  
  .welcome-title {
    color: #000000;
    font-family: 'MiSansMU', sans-serif;
    font-weight: 600;
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }
  
  .welcome-subtitle {
    color: #666666;
    font-family: 'MiSansMU', sans-serif;
    font-weight: 400;
    font-size: 0.95rem;
    margin-bottom: 0;
  }
}

.form-section {
  .avatar-section {
    margin-bottom: 2rem;
    
    .user-avatar {
      border: 4px solid #dc3545;
      box-shadow: 0 8px 20px rgba(220, 53, 69, 0.3);
      transition: all 0.3s ease;
      
      &:hover {
        transform: scale(1.05);
        box-shadow: 0 12px 25px rgba(220, 53, 69, 0.4);
      }
    }
    
    .user-name {
      color: #000000;
      font-family: 'MiSansMU', sans-serif;
      font-weight: 500;
      margin-top: 0.5rem;
      margin-bottom: 0;
    }
  }
  
  .form-group-modern {
    margin-bottom: 1.5rem;
    
    .form-label {
      color: #000000;
      font-family: 'MiSansMU', sans-serif;
      font-weight: 500;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      
      .label-icon {
        width: 16px;
        height: 16px;
        margin-right: 0.5rem;
        color: #dc3545;
      }
    }
    
    .form-input-modern {
      border: 2px solid #e9ecef !important;
      border-radius: 12px !important;
      padding: 0.875rem 1rem !important;
      font-family: 'MiSansMU', sans-serif;
      font-size: 0.95rem;
      background: #ffffff !important;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      
      &:focus {
        border-color: #dc3545 !important;
        box-shadow: 0 4px 15px rgba(220, 53, 69, 0.15) !important;
        background: #ffffff !important;
      }
      
      &::placeholder {
        color: #adb5bd;
        font-family: 'MiSansMU', sans-serif;
      }
    }
  }
  
  .error-section {
    margin-bottom: 1rem;
    
    .error-message {
      display: flex;
      align-items: center;
      padding: 0.75rem 1rem;
      background: rgba(220, 53, 69, 0.1);
      border: 1px solid rgba(220, 53, 69, 0.2);
      border-radius: 8px;
      color: #dc3545;
      font-family: 'MiSansMU', sans-serif;
      font-weight: 500;
      font-size: 0.9rem;
      
      .error-icon {
        width: 16px;
        height: 16px;
        margin-right: 0.5rem;
      }
    }
  }
  
  .submit-section {
    margin-top: 2rem;
    
    .submit-button {
      background: linear-gradient(135deg, #dc3545 0%, #a71e2a 100%) !important;
      border: none !important;
      border-radius: 12px !important;
      padding: 0.875rem 1.5rem !important;
      font-family: 'MiSansMU', sans-serif;
      font-weight: 600;
      font-size: 1rem;
      color: #ffffff !important;
      box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .button-icon {
        width: 18px;
        height: 18px;
        margin-right: 0.5rem;
      }
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4) !important;
        background: linear-gradient(135deg, #a71e2a 0%, #8b1a24 100%) !important;
      }
      
      &:active {
        transform: translateY(0);
      }
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .register-card {
    margin: 1rem;
    padding: 2rem;
    border-radius: 20px !important;
  }
  
  .logo-section .brand-text {
    font-size: 1.5rem;
  }
  
  .welcome-section .welcome-title {
    font-size: 1.2rem;
  }
  
  .form-section .avatar-section .user-avatar {
    width: 4rem;
    height: 4rem;
  }
}

@media (max-width: 480px) {
  .register-card {
    margin: 0.5rem;
    padding: 1.5rem;
    border-radius: 16px !important;
  }
  
  .logo-section .brand-text {
    font-size: 1.3rem;
  }
  
  .welcome-section .welcome-title {
    font-size: 1.1rem;
  }
}

// Loading Animation
.register-card {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
