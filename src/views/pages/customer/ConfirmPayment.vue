<template>
  <div style="background-image: url('bg.png');background-repeat: repeat;background-size: 1714px 1142px;">
    <div class="auth-wrapper auth-v1" >
      <div class="auth-inner" >
        <b-card class="mb-0" style="background-color: rgb(255, 255, 242);">
          <b-link class="brand-logo">
            <vuexy-logo />

            <h2 class="brand-text text-primary ml-1">
              BigaByte Membership
            </h2>
          </b-link>

          <b-card-title class="mb-1 " v-if="showErrorParam">
            <b-row>
              <b-col cols="12" style="color:red;" >
                ไม่มีรายการให้ทำการยืนยันการซื้อ
              </b-col> 
            </b-row> 
          </b-card-title>  

          <b-card-title class="mb-1" v-if=" !showErrorParam">       
            <b-row>
              <b-col cols="12" class="text-center" style="justify-content: center;">
                <div v-if="orderData.id!=0"  > 
                    <span style="color:grey;font-size: 14px;font-weight: 500;" > สินค้าที่ซื้อ </span><br/>
                    <img :src="orderData.subscription_img" height="50px" width="50px" /> <br/>
                    <span style="color:grey;font-size: 14px;font-weight: 500;" > {{orderData.product_name}}</span><br/>                    
                </div>
              </b-col> 
            </b-row>  
            <b-row>
              <b-col cols="12" class="text-center">
                <hr/>
              </b-col>
            </b-row>  
            <b-row>
              <b-col cols="12" class="text-center" style="justify-content: center;">
                Email ที่ใช้ในการสมัคร :
              </b-col> 
            </b-row>  
            <b-row>
              <b-col cols="12" class="text-center" style="justify-content: center;">
                <span style="color:grey;font-size: 14px;font-weight: 500;" >
                  {{orderData.email}}
                </span>
              </b-col> 
            </b-row>
            <b-row>
              <b-col cols="12" class="text-center">
                <hr/>
              </b-col>
            </b-row>
            <b-row v-if="!showCompleteDialog && !showSlipCorrect">
              <b-col cols="12" class="text-center" style="justify-content: center;" >
                ชำระเงินโดยโอนเข้าบัญชี
              </b-col> 
            </b-row>
            <b-row v-if="!showCompleteDialog && !showSlipCorrect">
              <b-col cols="12" class="text-center" style="justify-content: center;color:grey;font-size: 18px;" >
                <br/>
                ธนาคาร {{ bankData.bank_name }}
              </b-col> 
            </b-row>
            <b-row v-if="!showCompleteDialog && !showSlipCorrect">
              <b-col cols="12" class="text-center" style="justify-content: center;color:grey;font-size: 18px;" >
                <img :src="'/images/bank_bg/'+bankData.bank_ico" height="100px" width="100px" /> <br/>
              </b-col> 
            </b-row>
            <b-row v-if="!showCompleteDialog && !showSlipCorrect">
              <b-col cols="12" class="text-center" style="justify-content: center;color:grey;font-size: 18px;" >                
                เลขบัญชี {{ bankData.bank_acc_number }}
              </b-col> 
            </b-row>
            <b-row v-if="!showCompleteDialog && !showSlipCorrect">
              <b-col cols="12" class="text-center" style="justify-content: center;color:grey;font-size: 18px;" >
                {{ bankData.bank_acc_name }}
              </b-col> 
            </b-row>
            <b-row v-if="!showCompleteDialog && !showSlipCorrect">
              <b-col cols="12" class="text-center">
                <hr/>
              </b-col>
            </b-row>
            <b-row v-if="!showCompleteDialog && !showSlipCorrect">
              <b-col md="12" v-if="slip_file_url != ''" cols="12" class="text-center">
                <b-img
                  :src="slip_file_url"
                  class="img-fluid"
                  alt="Slip Image"
                  style="max-width: 350px;"
                />
              </b-col>
              
              <b-col md="12" v-if="slip_file_url==''">                                
                  <input type="file" @change="uploadFile('slip')" ref="slip">
                  <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('slip')" >
                      Upload
                  </b-button>
              </b-col>    
            </b-row>
            <b-row v-if="!showCompleteDialog && !showSlipCorrect">
              <b-col md="12" v-if="slip_file_url != ''" cols="12" class="text-center">
                 <div>
                  <b-badge
                    v-if="slip_file_url != ''"
                    pill
                    :variant="`light-danger`"
                    class="text-capitalize"
                    @click="deleteFile('slip')"
                    style="cursor: pointer;"
                  >
                    {{ t('Delete') }}
                  </b-badge>
                 </div>
              </b-col>
            </b-row>
            <b-row v-if="!showCompleteDialog && !showSlipCorrect">
              <b-col cols="12" class="text-center">
                <hr/>
              </b-col>
            </b-row>
            <b-row v-if="!showCompleteDialog && !showSlipCorrect">
              <b-col cols="12" style="justify-content: center;" class="text-center">
                <b-button              
                  v-if="orderData.id!=0"  
                  class="btn btn-success"
                  @click="confirmPayment()"
                >
                  
                  {{t('Confirm')}}
                </b-button>
              </b-col>
            </b-row>  

            
            <b-row v-if="showSlipCorrect">
              <b-col md="12" v-if="orderData.slip_correct == 1" cols="12" class="text-center" >
                  <b-badge
                    pill
                    :variant="`light-success`"
                    class="text-capitalize"
                  >
                    <div style="font-size: 20px;">{{ t('Verified') }}</div>
                  </b-badge>
                  <br/>
                  <br/>
              </b-col>

              <b-col md="12" v-if="orderData.slip_correct == 0" cols="12" class="text-center" >
                  <b-badge
                    pill
                    :variant="`light-danger`"
                    class="text-capitalize"
                  >
                    <div style="font-size: 20px;">{{ t('Incorrect Slip') }}</div>
                  </b-badge>
              </b-col>

              <b-col md="12" v-if="orderData.slip_correct == 0" class="text-center" style="justify-content: center;">                                
                  <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="editData()" >
                      {{ t('Edit') }}
                  </b-button>     
                  <br/>
                  <br/>             
              </b-col>    
              
              <b-col md="12" v-if="orderData.slip_file_url != ''" cols="12" class="text-center">
                <b-img
                  :src="orderData.slip_file_url"
                  class="img-fluid"
                  alt="Slip Image"
                  style="max-width: 350px;"
                />
              </b-col>
              
              
            
            </b-row>

            <b-row v-if="showCompleteDialog">
              <b-col md="12" v-if="orderData.wait_check_payment == 1" cols="12" class="text-center" >
                  <b-badge
                    pill
                    :variant="`light-warning`"
                    class="text-capitalize"
                  >
                    <div style="font-size: 20px;">{{ t('Wait Admin Verify') }}</div>
                  </b-badge>
                  <br/>
                  <br/>
              </b-col>
              <b-col md="12" v-if="orderData.slip_file_url != ''" cols="12" class="text-center">
                <b-img
                  :src="orderData.slip_file_url"
                  class="img-fluid"
                  alt="Slip Image"
                  style="max-width: 350px;"
                />
              </b-col>
            </b-row>

            
          </b-card-title>

        
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
  BBadge ,BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend,BInputGroupPrepend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton,BCard,BFormSelect,BIconTrash
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { mapActions } from "vuex";

import useJwt from '@/auth/jwt/useJwt'

import { AbilityBuilder } from '@casl/ability';
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import { select } from 'neo-async'
import Ripple from "vue-ripple-directive";

export default {
  components: {
    BBadge,
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
    BFormSelect,
    BIconTrash,    
    BInputGroupPrepend,
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
  directives: {
    Ripple,
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
      id:0,
      email,
      lineId: '',
      avatarImgUrl: require('@/assets/images/avatars/4.png'),
      showProduct:true,
      showModalProduct: false,      
      product : {
        id: 0,
        product_name: '',
        product_desc: '',
        product_img: ''
      },
      orderData:[],
      showCompleteDialog: false,
      showSlipCorrect :false,
      userid:'',
      showErrorParam:false,
      bankData:[],
      slip_file_url:'',
      tmpFileUpload:[],
      hashFileName:'',
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
    const params = new URLSearchParams(window.location.search);
    this.email = params.get('email') || '';
    this.id = params.get('id') || 0;
    
    if (this.email == ''||this.id==0) 
    {
        this.showProduct = false;
        this.showErrorParam = true;
    }
    else
    {
        await Promise.all([          
            this.getSubScribeOrderById(),
        ]); 
        
    }

            
    
    
  },
  methods: {    
    ...mapActions(["GetLineProfileByLineSourceId"]),
    ...mapActions(["GetActiveProductSetting"]),     
    ...mapActions(["PaymentOrderWithSlip"]), 
    ...mapActions(["GetSubScribeOrderById"]),     
    ...mapActions(["GetActiveAdminBank"]),     
    ...mapActions(["CustomerUploadFileAndDeleteOldFile"]),  
    ...mapActions(["CustomerDeleteOldFile"]), 
    
    async validationForm() {

    },
    async hashEmailAndId(email, id) {
      const data = new TextEncoder().encode(email + id);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
      return hashHex;
    },
    async getActiveAdminBank(){
      console.log('getActiveAdminBank');

      //const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();      
    
      formData.append("userid", "-");
      formData.append("token", "-");

      const response = await this.GetActiveAdminBank(formData);
      if (response.data.status=='success') 
      {                  
          this.bankData = response.data.data[0];
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
    },
    async getSubScribeOrderById(){
      console.log('getSubScribeOrderById');

      //const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();      
    
      formData.append("userid", "-");
      formData.append("token", "-");

      formData.append("email", this.email);
      formData.append("id", this.id);
      formData.append("page_name", this.$route.name);
      
      const response = await this.GetSubScribeOrderById(formData);
      if (response.data.status=='success') 
      {                  
          if (response.data.data.length==0) {
            this.showErrorParam = true;            
          }        
          else
          {
            this.orderData = response.data.data[0];
            this.hashFileName = await this.hashEmailAndId(this.orderData.email,this.orderData.id);
            this.getActiveAdminBank();

            
            if (this.orderData.slip_correct!=null)  {
                
                this.showSlipCorrect =true;
                this.showCompleteDialog =false;
            }
            else if (this.orderData.wait_check_payment==1)
            { 
                this.showSlipCorrect =false;
                this.showCompleteDialog =true;
            }
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
    },
    changeSelectedProduct(id)
    {
        this.selectedProductId= id;
    },
    tabShowProduct() {
      this.$bvModal.show('modal-product');
    },
    resetModalProduct() {      
      this.showModalProduct = false;
    },
    async confirmPayment()
    {
        if (this.slip_file_url=="") {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: "กรุณาอัพโหลดสลิปก่อน",
                icon: 'EditIcon',
                variant: 'error',
              },
            });
          return;
        }

        await this.$bvModal.msgBoxConfirm(this.$t('Please Confirm'), {
                title: this.$t('Please Confirm'),
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'YES',
                cancelTitle: 'NO',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            })
                .then(value => {                    
                    if (value) {
                      this.paymentOrderWithSlip();
                    }
                })
                .catch(err => {

                })
    },
    async paymentOrderWithSlip() {
      console.log('paymentOrderWithSlip');

      const formData = new FormData();
      formData.append("token", "-");      
      formData.append("order_id", this.orderData.id);
      formData.append("email", this.orderData.email);
      formData.append("slip_file_url", this.slip_file_url);      
      
      formData.append("page_name", this.$route.name);
      
      const response = await this.PaymentOrderWithSlip(formData);
      if (response.data.status=='success') 
      {         
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: response.data.message,
                icon: 'CheckIcon',
                variant: 'success',
              },
            });

          this.showCompleteDialog = true;
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
    },
    uploadFile(tmpName) {                                    
            this.tmpFileUpload[tmpName] = this.$refs[tmpName].files[0];            
            //console.log(this.tmpFileUpload[tmpName]); 
    },
    async submitFile(tmpName) {                       
        console.log('submitFile');

        if (this.tmpFileUpload[tmpName]==null) 
        {
            this.$toast(
            {
                component: ToastificationContent,
                props: {
                title: 'No file for upload.',
                icon: 'EditIcon',
                variant: 'error',
                },
            });
            return;    
        }
        
        //const userData = JSON.parse(localStorage.getItem('userData'));
        const formData = new FormData();

        formData.append("userid", "-");
        formData.append("token", "-");

        formData.append("file", this.tmpFileUpload[tmpName]);
        formData.append("tofilename", this.hashFileName);
        formData.append("oldFilePath", "");
        formData.append("order_id", this.orderData.id);
        formData.append("email", this.orderData.email);
        
        const response = await this.CustomerUploadFileAndDeleteOldFile(formData);
        if (response.data.status == 'success') 
        {                 
            this.slip_file_url = response.data.url;
            this.tmpFileUpload[tmpName] = null;
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
    async deleteFile(tmpName)
    {
        console.log('deleteFile');
        
        //const userData = JSON.parse(localStorage.getItem('userData'));
        const formData = new FormData();

        formData.append("userid", "-");
        formData.append("token", "-");

        formData.append("oldFilePath", this.slip_file_url);  
        formData.append("order_id", this.orderData.id);
        formData.append("email", this.orderData.email);          
        
        const response = await this.CustomerDeleteOldFile(formData);
        if (response.data.status == 'success') 
        {                 
            this[tmpName] = "";
            this.slip_file_url="";
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
    editData()
    {
        this.showCompleteDialog=false;
        this.showSlipCorrect=false;
    }
  },
  
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
.bounce-enter-active {
    animation: bounce-in 0.5s;
}

.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  z-index: 9999; /* Adjust z-index to bring it front of other elements */
}

.dialog-content {
  /* Add your styles for dialog content */
  min-width: 400px;
  min-height: 600px;
}

.dialog2 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  z-index: 9999; /* Adjust z-index to bring it front of other elements */
}

.dialog-content2 {
  /* Add your styles for dialog content */
  min-width: 380px;
  min-height: 300px;
}

.dialog3 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  z-index: 9999; /* Adjust z-index to bring it front of other elements */
}

.dialog-content3 {
  /* Add your styles for dialog content */
  min-width: 400px;
  min-height: 500px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.content-container {
  max-height: 300px; /* Set your desired max height */
  overflow-y: auto; /* Add vertical scrollbar */
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); /* Adjust as needed */
  gap: 10px; /* Adjust gap between grid items */
}

.grid-item {
  /* Add any additional styling for grid items */
  color:grey;
}
</style>
