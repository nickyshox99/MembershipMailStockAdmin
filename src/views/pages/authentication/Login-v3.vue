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
            <!-- Welcome to Loan System! 👋 -->
            ยินดีต้อนรับเข้าสู่ระบบจัดการสมาชิก! 👋
          </b-card-title>
          <b-card-text class="mb-2 ">
            <!-- Please sign-in to your account and start the adventure -->
            กรุณาเข้าระบบด้วยแอคเคาท์ของคุณ
          </b-card-text>

            <!-- form -->
            <validation-observer ref="loginValidation">
              <b-form
                class="auth-login-form mt-2 "
                @submit.prevent
              >
                <!-- email -->
                <b-form-group                  
                  label="ผู้ใช้งาน"
                  label-for="username"
                  style="color: white;"
                >
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
                      placeholder="Enter UserId"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <!-- forgot password -->
                <b-form-group>
                  <div class="d-flex justify-content-between">
                    <label for="password">รหัสผ่าน</label>
                    <!-- <b-link :to="{name:'auth-forgot-password-v3'}">
                      <small>Forgot Password?</small>
                    </b-link> -->
                  </div>
                  <validation-provider
                    #default="{ errors }"
                    name="password"
                    rules="required"
                  >
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid':null"
                    >
                      <b-form-input
                        id="password"
                        v-model="password"
                        :state="errors.length > 0 ? false:null"
                        class="form-control-merge"
                        :type="passwordFieldType"
                        name="password"
                        placeholder="ใส่รหัสผ่าน"
                      />
                      <b-input-group-append is-text>
                        <feather-icon
                          class="cursor-pointer"
                          :icon="passwordToggleIcon"
                          @click="togglePasswordVisibility"
                        />
                      </b-input-group-append>
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <!-- forgot password -->
                <b-form-group>
                  <div class="d-flex justify-content-between">
                    <label for="google-auth">รหัสกูเกิ้ล</label>
                    <!-- <b-link :to="{name:'auth-forgot-password-v3'}">
                      <small>Forgot Password?</small>
                    </b-link> -->
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
                </b-form-group>

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

                <!-- submit buttons -->
                <b-button
                  type="submit"
                  variant="primary"
                  block
                  @click="validationForm"
                >
                  เข้าสู่ระบบ
                </b-button>
              </b-form>
            </validation-observer>

          <!-- social button -->
        </b-card>
        <!-- /Login v1 -->
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
</style>
