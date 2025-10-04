<template>
  <div class="login-container">
    <!-- Background with overlay -->
    <div class="login-background">
      <div class="background-overlay"></div>
    </div>
    
    <div class="auth-wrapper auth-v1 px-2">
      <div class="auth-inner py-2">
        <!-- Login Card -->
        <b-card class="login-card mb-0">
          <!-- Logo Section -->
          <div class="logo-section">
            
              <!-- <vuexy-logo /> -->
              <h2 class="brand-text text-primary ml-1">
                BigaByte Membership
              </h2>
            
          </div>

          <!-- Welcome Section -->
          <div class="welcome-section">
            <b-card-title class="welcome-title mb-1">
              ยินดีต้อนรับเข้าสู่ระบบจัดการสมาชิก! 
            </b-card-title>
            <b-card-text class="welcome-subtitle mb-2">
              กรุณาเข้าระบบด้วยแอคเคาท์ของคุณ
            </b-card-text>
          </div>

          <!-- Form Section -->
          <div class="form-section">
            <validation-observer ref="loginValidation">
              <b-form
                class="auth-login-form"
                @submit.prevent
              >
                <!-- Username Field -->
                <b-form-group class="form-group-custom">
                  <label for="username" class="form-label">
                    <i class="fas fa-user form-icon"></i>
                    ผู้ใช้งาน
                  </label>
                  <validation-provider
                    #default="{ errors }"
                    name="username"
                    rules="required"
                  >
                    <b-form-input
                      id="username"
                      v-model="username"
                      :state="errors.length > 0 ? false:null"
                      name="username"
                      placeholder="กรุณาใส่ชื่อผู้ใช้งาน"
                      class="form-input-custom"
                    />
                    <small class="text-danger error-message">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <!-- Password Field -->
                <b-form-group class="form-group-custom">
                  <label for="password" class="form-label">
                    <i class="fas fa-lock form-icon"></i>
                    รหัสผ่าน
                  </label>
                  <validation-provider
                    #default="{ errors }"
                    name="password"
                    rules="required"
                  >
                    <b-input-group class="input-group-custom">
                      <b-form-input
                        id="password"
                        v-model="password"
                        :state="errors.length > 0 ? false:null"
                        :type="passwordFieldType"
                        name="password"
                        placeholder="กรุณาใส่รหัสผ่าน"
                        class="form-input-custom"
                      />
                      <b-input-group-append is-text class="">
                        <feather-icon
                          class="cursor-pointer toggle-icon"
                          :icon="passwordToggleIcon"
                          @click="togglePasswordVisibility"
                        />
                      </b-input-group-append>
                    </b-input-group>
                    <small class="text-danger error-message">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                
                <!-- <b-form-group>
                  <div class="d-flex justify-content-between">
                    <label for="google-auth">รหัสกูเกิ้ล</label>
                     <b-link :to="{name:'auth-forgot-password-v3'}">
                      <small>Forgot Password?</small>
                    </b-link>
                  </div>
                  <validation-provider
                    #default="{ errors }"
                    name="google-auth"
                    rules="required"
                  >
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid':null"
                    >
                      <b-form-input
                        id="google-auth"
                        v-model="otp"
                        :state="errors.length > 0 ? false:null"
                        class="form-control-merge"
                        :type="passwordFieldType"
                        name="google-auth"
                        placeholder="ใส่รหัสลับ 6 หลักจากกูเกิ้ล"
                      />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group> -->

                <!-- checkbox -->
                <!-- <b-form-group style="margin-bottom: 3rem;">
                  <b-form-checkbox
                    id="remember-me"
                    v-model="status"
                    name="checkbox-1"
                  >
                    Remember Me
                  </b-form-checkbox>
                </b-form-group> -->

                <!-- Submit Button -->
                <div class="submit-section">
                  <b-button
                    type="submit"
                    variant="primary"
                    block
                    class="login-button"
                    @click="validationForm"
                  >
                    <i class="fas fa-sign-in-alt button-icon"></i>
                    เข้าสู่ระบบ
                  </b-button>
                </div>
              </b-form>
            </validation-observer>

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

    // const User = new FormData();
    // let response = await this.GetTime(User);
    // console.log(response.data);

    // const time = Math.floor(Date.now() / 1000 / 30);    
    

    
    
  },
  methods: {
    ...mapActions(["LogIn"]),
    ...mapActions(["CheckGoogleAuthen"]),
    ...mapActions(["GetTime"]),    
    ...mapActions(["GetGoogleAuthen"]),   
    
    async validationForm() {
      let successValidate = false;
      await this.$refs.loginValidation.validate().then(
      success => 
      {
        if (success) 
        {
          successValidate = true;          
        }
      });


      if (successValidate) 
      {        
        const User = new FormData();
        User.append("userid", this.username);
        User.append("password", this.password);        
        User.append("otp", this.otp);

        try 
        {
          // const time = Math.floor(Date.now() / 1000 / 30);
          // console.log(time);
          // let response3 = await this.GetGoogleAuthen(User);
          // console.log(response3.data);
          // return;

          let response2 = await this.CheckGoogleAuthen(User);
          if (response2.data.status=='success') 
          {
            let response = await this.LogIn(User);
            // console.log(response);          
            
            if (response.data.status=='success') 
            {
              
              const { can, rules } = new AbilityBuilder();
              can('manage', 'all');
                          
              this.$ability.update(rules);

              const userData = {
                id : response.data.id,
                email : this.username,
                username : this.username,
                fullName : response.data.fullName,
                token : response.data.token,
                creatAt : response.data.createAt,
                expireAt : response.data.expireAt,              
                am_rank : response.data.am_rank,
                am_group : response.data.am_group,              
                role: response.data.am_group_name,
                ability : rules,
                avatar: "/img/13-small.d796bffd.png",
                extras : {
                  eCommerceCartItemsCount : 0
                },
                defaultPage:response.data.defaultPage??''
              };
              
              localStorage.setItem('userData', JSON.stringify(userData));     
              localStorage.setItem(useJwt.jwtConfig.storageTokenKeyName,JSON.stringify({token:response.data.token}));
              localStorage.setItem(useJwt.jwtConfig.storageRefreshTokenKeyName,JSON.stringify({token:response.data.token}));

              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: `Welcome ${userData.fullName || userData.username}`,
                  icon: 'CoffeeIcon',
                  variant: 'success',
                  text: `You have successfully logged in as ${userData.role}. Now you can start to explore!`,
                },
                autoHideDelay: 3000,
              })

                            
              if (response.data.defaultPage!='') {
                await this.$router.push({name:response.data.defaultPage});
              }
              else
              {
                await this.$router.push({name:'apps-members-manage'});
              }
              
            }
            else
            {
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
          }
          else
          {
            this.$toast(
              {
                component: ToastificationContent,
                props: {
                  title: 'Google Auth is incorrect.',
                  icon: 'EditIcon',
                  variant: 'error',
                },
              });
          }

          // if (response.data.status=='success') 
          //   {
              
          //     const { can, rules } = new AbilityBuilder();
          //     can('manage', 'all');
                          
          //     this.$ability.update(rules);

          //     const userData = {
          //       id : response.data.id,
          //       email : this.username,
          //       username : this.username,
          //       fullName : response.data.fullName,
          //       token : response.data.token,
          //       creatAt : response.data.createAt,
          //       expireAt : response.data.expireAt,              
          //       am_rank : response.data.am_rank,
          //       am_group : response.data.am_group,              
          //       role: 'admin',
          //       ability : rules,
          //       avatar: "/img/13-small.d796bffd.png",
          //       extras : {
          //         eCommerceCartItemsCount : 0
          //       }
          //     };
              
          //     localStorage.setItem('userData', JSON.stringify(userData));     
          //     localStorage.setItem(useJwt.jwtConfig.storageTokenKeyName,JSON.stringify({token:response.data.token}));
          //     localStorage.setItem(useJwt.jwtConfig.storageRefreshTokenKeyName,JSON.stringify({token:response.data.token}));

          //     this.$toast({
          //       component: ToastificationContent,
          //       position: 'top-right',
          //       props: {
          //         title: `Welcome ${userData.fullName || userData.username}`,
          //         icon: 'CoffeeIcon',
          //         variant: 'success',
          //         text: `You have successfully logged in as ${userData.role}. Now you can start to explore!`,
          //       },
          //       autoHideDelay: 3000,
          //     })

          //     await this.$router.push({name:'apps-members-depwit'});
          //   }
          //   else
          //   {
          //     this.$toast(
          //     {
          //       component: ToastificationContent,
          //       props: {
          //         title: response.data.message,
          //         icon: 'EditIcon',
          //         variant: 'error',
          //       },
          //     });
          //   }

          
        } 
        catch (error) 
        {
          this.$toast(
          {
            component: ToastificationContent,
            props: {
              title: error.message,
              icon: 'EditIcon',
              variant: 'error',
            },
          });
        }

      }
      
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';

// Custom Login Page Styling
.login-container {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #000000 0%, #333333 50%, #000000 100%);
  background-image: url('/bg.png');
  background-repeat: repeat;
  background-size: 1714px 1142px;
  z-index: 1;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
}

.auth-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
}

.login-card {
  background: rgba(255, 255, 255, 0.98) !important;
  backdrop-filter: blur(20px);
  border: 2px solid #000000;
  border-radius: 20px !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
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

// Logo Section
.logo-section {
  text-align: center;
  margin-bottom: 2rem;
  
  .brand-logo {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    .brand-text {
      font-family: 'MiSansMU', sans-serif;
      font-weight: 600;
      font-size: 1.8rem;
      margin-top: 0.5rem;
      color: #dc3545;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }
  }
}

// Welcome Section
.welcome-section {
  text-align: center;
  margin-bottom: 2rem;
  
  .welcome-title {
    font-family: 'MiSansMU', sans-serif;
    font-weight: 500;
    font-size: 1.5rem;
    color: #000000;
    margin-bottom: 0.5rem;
  }
  
  .welcome-subtitle {
    font-family: 'MiSansMU', sans-serif;
    font-weight: 400;
    color: #666666;
    font-size: 1rem;
  }
}

// Form Section
.form-section {
  .auth-login-form {
    .form-group-custom {
      margin-bottom: 1.5rem;
      
      .form-label {
        font-family: 'MiSansMU', sans-serif;
        font-weight: 500;
        color: #000000;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        font-size: 0.9rem;
        
        .form-icon {
          margin-right: 0.5rem;
          color: #dc3545;
          width: 16px;
        }
      }
      
      .form-input-custom {
        border: 2px solid #000000;
        border-radius: 12px;
        padding: 0.75rem 1rem;
        font-family: 'MiSansMU', sans-serif;
        font-size: 1rem;
        transition: all 0.3s ease;
        background: #ffffff;
        color: #000000;
        
        &:focus {
          border-color: #dc3545;
          box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
          background: white;
        }
        
        &::placeholder {
          color: #666666;
          font-family: 'MiSansMU', sans-serif;
        }
      }
      
      .input-group-custom {
        .password-toggle {
          background: transparent;
          border: 2px solid #000000;
          border-left: none;
          border-radius: 0 12px 12px 0;
          padding: 0.75rem;
          
          .toggle-icon {
            color: #dc3545;
            transition: color 0.3s ease;
            
            &:hover {
              color: #a71e2a;
            }
          }
        }
      }
      
      .error-message {
        font-family: 'MiSansMU', sans-serif;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        display: block;
      }
    }
  }
}

// Submit Section
.submit-section {
  margin-top: 2rem;
  
  .login-button {
    background: linear-gradient(135deg, #dc3545 0%, #a71e2a 100%);
    border: 2px solid #000000;
    border-radius: 12px;
    padding: 0.875rem 1.5rem;
    font-family: 'MiSansMU', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    text-transform: none;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
    color: #ffffff;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);
      background: linear-gradient(135deg, #a71e2a 0%, #dc3545 100%);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    .button-icon {
      margin-right: 0.5rem;
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .login-card {
    margin: 1rem;
    padding: 2rem;
    border-radius: 15px !important;
  }
  
  .logo-section .brand-logo .brand-text {
    font-size: 1.5rem;
  }
  
  .welcome-section .welcome-title {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .login-card {
    margin: 0.5rem;
    padding: 1.5rem;
  }
  
  .form-section .auth-login-form .form-group-custom {
    margin-bottom: 1.25rem;
  }
}

// Loading Animation
.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  
  &::after {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s ease-in-out infinite;
    margin-left: 0.5rem;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

// Floating Animation for Logo
.logo-section .brand-logo {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>

