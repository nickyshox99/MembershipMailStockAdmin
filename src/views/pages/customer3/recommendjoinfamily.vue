<template>
  <div class="recommend-container">
    <div class="recommend-background">
      <div class="background-overlay"></div>
    </div>
    
    <div class="auth-wrapper auth-v1 px-2">
      <div class="auth-inner py-2">
        <b-card class="recommend-card mb-0">
          <div class="logo-section">
            <img src="@/assets/images/logo/image.png" alt="All Premium" class="logo-image">
            <h2 class="brand-text">
              All Premium
            </h2>
          </div>

          <div class="welcome-section">
            <h3 class="welcome-title">ขั้นตอนการสมัครสมาชิก</h3>
            <p class="welcome-subtitle">ทำตามขั้นตอนเหล่านี้เพื่อเข้าร่วมครอบครัว All Premium</p>
          </div>

          <div class="steps-section">
            <div class="step-item">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4 class="step-title">ใส่ Email ที่ใช้ในการสมัคร</h4>
                <p class="step-description">ทำการใส่ G-mail ที่ใช้ในการสมัคร</p>
              </div>
            </div>

            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4 class="step-title">เลือกแพ็กเกจที่ต้องการ</h4>
                <p class="step-description">ทำการเลือก Package ที่ต้องการใช้งาน</p>
              </div>
            </div>

            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4 class="step-title">ยืนยันการเลือก</h4>
                <p class="step-description">กดยืนยันอีเมลล์และ Package ที่ต้องการใช้งาน</p>
              </div>
            </div>

            <div class="step-item">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4 class="step-title">รอรับ Invite Email</h4>
                <p class="step-description">รอรับ Invite Email เพื่อเข้ากลุ่ม</p>
              </div>
            </div>

            <div class="step-item">
              <div class="step-number">5</div>
              <div class="step-content">
                <h4 class="step-title">เข้ากลุ่มครอบครัว</h4>
                <p class="step-description">ทำการเข้ากลุ่มครอบครัว</p>
              </div>
            </div>

            <div class="step-item">
              <div class="step-number">6</div>
              <div class="step-content">
                <h4 class="step-title">ชำระเงินและส่งสลิป</h4>
                <p class="step-description">ชำระเงินพร้อมส่งสลิปยืนยันการชำระเงินทางไลน์</p>
              </div>
            </div>
          </div>

          <div class="action-section">
            <b-button variant="primary" class="start-btn" @click="startRegistration()">
              <feather-icon icon="PlayIcon" class="button-icon" />
              เริ่มต้นการสมัคร
            </b-button>
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
    startRegistration() {
      // Redirect to registration page
      this.$router.push({ name: 'registeremail' });
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';

// Modern Recommend Join Family Styling - YouTube Theme
.recommend-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #F8BBD9 0%, #FDD5B4 25%, #FFF2CC 50%, #E1F5FE 75%, #BBDEFB 100%);
  font-family: 'MiSansMU', sans-serif;
}

.recommend-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #F8BBD9 0%, #FDD5B4 25%, #FFF2CC 50%, #E1F5FE 75%, #BBDEFB 100%);
  opacity: 0.05;
  z-index: 1;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(248, 187, 217, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(248, 187, 217, 0.05) 0%, transparent 50%);
  z-index: 2;
}

.auth-wrapper {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 600px;
}

.recommend-card {
  background: #ffffff !important;
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
  
  .logo-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    box-shadow: 0 8px 25px rgba(248, 187, 217, 0.3);
    border: 3px solid #F8BBD9;
    transition: all 0.3s ease;
    object-fit: cover;
    background: linear-gradient(135deg, #F8BBD9 0%, #FDD5B4 25%, #FFF2CC 50%, #E1F5FE 75%, #BBDEFB 100%);
    padding: 8px;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 12px 35px rgba(248, 187, 217, 0.4);
      border-color: rgba(248, 187, 217, 0.4);
    }
  }

  .brand-text {
    background: linear-gradient(135deg, #F8BBD9 0%, #87CEEB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-family: 'MiSansMU', sans-serif;
    font-weight: 700;
    font-size: 1.8rem;
    margin-top: 1rem;
    margin-bottom: 0;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
}

.welcome-section {
  text-align: center;
  margin-bottom: 2.5rem;
  
  .welcome-title {
    color: #4a4a4a;
    font-family: 'MiSansMU', sans-serif;
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .welcome-subtitle {
    color: #757575;
    font-family: 'MiSansMU', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    margin-bottom: 0;
  }
}

.steps-section {
  margin-bottom: 2.5rem;
  
  .step-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: rgba(248, 187, 217, 0.05);
    border-radius: 16px;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(248, 187, 217, 0.1);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(248, 187, 217, 0.15);
    }
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .step-number {
      width: 40px;
      height: 40px;
      background: #F8BBD9;
      color: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'MiSansMU', sans-serif;
      font-weight: 600;
      font-size: 1.2rem;
      flex-shrink: 0;
      margin-right: 1rem;
      box-shadow: 0 4px 15px rgba(248, 187, 217, 0.3);
    }
    
    .step-content {
      flex: 1;
      
      .step-title {
        color: #4a4a4a;
        font-family: 'MiSansMU', sans-serif;
        font-weight: 600;
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
      }
      
      .step-description {
        color: #5a5a5a;
        font-family: 'MiSansMU', sans-serif;
        font-weight: 400;
        font-size: 0.95rem;
        line-height: 1.5;
        margin: 0;
      }
    }
  }
}

.action-section {
  text-align: center;
  
  .start-btn {
    background: linear-gradient(135deg, #F8BBD9 0%, #BBDEFB 100%) !important;
    border: none !important;
    border-radius: 12px !important;
    padding: 0.875rem 2rem !important;
    font-family: 'MiSansMU', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    color: #ffffff !important;
    box-shadow: 0 4px 15px rgba(248, 187, 217, 0.4);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    margin: 0 auto;
    
    .button-icon {
      width: 18px;
      height: 18px;
      margin-right: 0.5rem;
    }
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(248, 187, 217, 0.5) !important;
      background: #E8A5C9 !important;
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .recommend-card {
    margin: 1rem;
    padding: 2rem;
    border-radius: 20px !important;
  }
  
  .logo-section .brand-text {
    font-size: 1.5rem;
  }
  
  .welcome-section .welcome-title {
    font-size: 1.3rem;
  }
  
  .steps-section .step-item {
    flex-direction: column;
    text-align: center;
    
    .step-number {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
}

@media (max-width: 480px) {
  .recommend-card {
    margin: 0.5rem;
    padding: 1.5rem;
    border-radius: 16px !important;
  }
  
  .logo-section .brand-text {
    font-size: 1.3rem;
  }
  
  .welcome-section .welcome-title {
    font-size: 1.2rem;
  }
  
  .steps-section .step-item {
    padding: 1rem;
    
    .step-number {
      width: 35px;
      height: 35px;
      font-size: 1rem;
    }
    
    .step-content .step-title {
      font-size: 1rem;
    }
    
    .step-content .step-description {
      font-size: 0.9rem;
    }
  }
}
</style>
