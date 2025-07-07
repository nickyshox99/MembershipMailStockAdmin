<template>
  <div style="background-image: url('bg.png');background-repeat: repeat;background-size: 1714px 1142px;">
    <div class="auth-wrapper auth-v1 px-2">
      <div class="auth-inner py-2" >

        
        <b-card class="mb-0" style="background-color: rgb(255, 255, 242);">
          <b-link class="brand-logo">
            <vuexy-logo />

            <h2 class="brand-text text-primary ml-1">
              BigaByte Membership
            </h2>
          </b-link>

          <b-card-title class="mb-1 " v-if="!showCompleteDialog">       
            <b-row>
              <b-col cols="6" class="text-center">
                <div v-if="product.id!=0"  > 
                    <img :src="product.product_img" height="50px" width="50px" /> <br/>
                    <span style="color:grey;font-size: 12px;font-weight: 500;" > {{product.product_name}}</span><br/>
                    <span style="color:grey;font-size: 10px;" > {{product.product_desc}}</span>
                </div>

              </b-col> 
              <b-col cols="6" class="text-center">
                 <b-button                
                  class="btn btn-primary float-right"
                  @click="tabShowProduct()"
                >
                  
                  {{t('Select Product')}}
                </b-button>
              </b-col> 
               
             
            </b-row>  
            <b-row>
              <b-col cols="12" class="text-center">
                <hr/>
              </b-col>
            </b-row>  
            <b-row>
              <b-col cols="12" >
                Email ที่ใช้ในการสมัคร 
              </b-col> 
            </b-row>  
            <b-row>
              <b-col cols="12" >
                {{selectedSubScribeEmail}}
              </b-col> 
            </b-row>  
            <b-row>
              <b-col cols="12" class="text-center">
                <hr/>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" >
                <b-button              
                  v-if="product.id!=0"  
                  class="btn btn-success float-right"
                  @click="confirmProduct()"
                >
                  
                  {{t('Confirm')}}
                </b-button>
              </b-col>
            </b-row>  
            
          </b-card-title>

          <b-card-title class="mb-1 " v-if="showCompleteDialog">       
            <b-row>
              <b-col cols="12" >
                การสั่งซื้อสินค้าเสร็จสิ้นแล้ว ถ้าเป็นสมาชิกใหม่กรุณารออีเมลล์เชิญเข้ากลุ่ม
              </b-col> 
            </b-row>  
          </b-card-title>
    
          
        </b-card>
        
      </div>
    </div>

    <b-modal
            id="modal-product"
            ref="modalProduct"            
            v-model="showModalProduct"
            :title="t('Product')"
            @show="resetModalProduct"        
            @hidden="resetModalProduct"
            @ok="handleOkProductOk"
            size="sm"  
            :hideHeaderClose="false"            
            ok-variant="success"
            :okTitle="t('YES')"
            buttonSize="sm"
            :cancelTitle="t('NO')"
            footerClass="p-2"
        >   
            <b-row>
                <b-col md="12">
                    <b-form-group :label="t('Select Email')" label-for="email-selected">
                        <b-input-group class="input-group-merge">
                            <b-input-group-prepend is-text>
                                <feather-icon icon="MailIcon" />
                            </b-input-group-prepend>
                            <b-form-select v-model="selectedSubScribeEmail" :options="optionSubScribeEmail"></b-form-select>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
    
            <b-row>                
                <div class="dialog-content2" style="padding-left: 20px;">
                    <h4>{{t('Select Product')}}</h4>
                    <div class="content-container">     
                        <div class="grid-container">
                            <div class="grid-item" style="padding-top: 10px;padding-bottom: 10px; padding-left: 10px; padding-right: 10px;  cursor: pointer;" 
                                v-for="(product) in productList" :key="product.id" >
                                
                                <div v-if="product.id==selectedProductId" @click="changeSelectedProduct(product.id)" style="color:black;background-color: antiquewhite;" > 
                                    <img :src="product.product_img" height="50px" width="50px" /> <br/>
                                    <span style="color:grey;font-size: 12px; font-weight: 500;" > {{product.product_name}}</span><br/>
                                    <span style="color:grey;font-size: 10px;" > {{product.product_desc}}</span>
                                </div>
                                
                                <div v-if="product.id!=selectedProductId" @click="changeSelectedProduct(product.id)" > 
                                    <img :src="product.product_img" height="50px" width="50px" /> <br/>
                                    <span style="color:grey;font-size: 12px;font-weight: 500;" > {{product.product_name}}</span><br/>
                                    <span style="color:grey;font-size: 10px;" > {{product.product_desc}}</span>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
            </b-row>
             
        </b-modal>
  </div>
</template>

<script>
/* eslint-disable global-require */

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend,BInputGroupPrepend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton,BCard,BFormSelect,BIconTrash
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
      lineId: '',
      avatarImgUrl: require('@/assets/images/avatars/4.png'),
      showProduct:true,
      productList:[],

      selectedSubScribeEmail :"",
      optionSubScribeEmail : [{
          value: "",
          text: 'Select Email'
      },],
      selectedProductId: 0,
      showModalProduct: false,
      emailList:[],
      product : {
        id: 0,
        product_name: '',
        product_desc: '',
        product_img: ''
      },
      showCompleteDialog: false,
      userid:'',
      email:'',
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
    this.sourceUserId = params.get('sourceUserId') || '';
    this.email = params.get('email') || '';
    await this.getSourceProfile();

    if (this.lineId == '') 
    {
        this.showProduct = false;
    }
    else
    {
        await Promise.all([                   
            this.getProductList(),      
            this.getEmailByLineSourceId(),                  
        ]); 
    }

            
    
    
  },
  methods: {    
    ...mapActions(["GetLineProfileByLineSourceId"]),
    ...mapActions(["GetActiveProductSetting"]), 
    ...mapActions(["GetMemberEmail"]), 
    ...mapActions(["CreateSubScribeOrder"]), 
    ...mapActions(["GetEmailByLineSourceId"]), 
    async validationForm() {

    },
    async getSourceProfile(){
      console.log('getSourceProfile');

      //const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();      
    
      formData.append("userid", "-");
      formData.append("token", "-");

      formData.append("line_source_id", this.sourceUserId);
      formData.append("page_name", this.$route.name);
      
      const response = await this.GetLineProfileByLineSourceId(formData);
      if (response.data.status=='success') 
      {   
          if (response.data.data.length > 0) {
            //console.log(response.data.data[0]);
            this.userid = response.data.data[0].userid;
            this.lineId = response.data.data[0].lineid;
            
            
          } else {
            this.lineId = '';
            
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
    async getEmailByLineSourceId(){
      console.log('getEmailByLineSourceId');

      //const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();      
    
      formData.append("userid", "-");
      formData.append("token", "-");

      formData.append("line_source_id", this.sourceUserId);
      formData.append("page_name", this.$route.name);
      
      const response = await this.GetEmailByLineSourceId(formData);
      if (response.data.status=='success') 
      {                  
          this.emailList = response.data.data; 
          let tmpArray = [];                
          this.emailList.forEach(element => {
                  tmpArray.push({
                      value: element.email,
                      text: element.email
                  });
              });             
          this.optionSubScribeEmail = tmpArray;
          if (this.email!='') {
            this.selectedSubScribeEmail = tmpArray.find(x=> x.value==this.email).value;  
          }
          else
          {
            this.selectedSubScribeEmail = tmpArray[0].value;
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
    async getProductList() {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const User = new FormData();

            User.append("userid", "");
            User.append("token", "");
            User.append("page_name", "");

            const response = await this.GetActiveProductSetting(User);
            if (response.data.status == 'success') {                
                this.productList = response.data.data; 
            } else {

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
    async handleOkProductOk() {
      // console.log('Selected Email:', this.selectedSubScribeEmail);
      // console.log('Selected Product ID:', this.selectedProductId);
      let tmpProduct = this.productList.find(product => product.id === this.selectedProductId);
      this.product.id = this.selectedProductId;
      this.product.product_name = tmpProduct.product_name;
      this.product.product_desc = tmpProduct.product_desc;
      this.product.product_img = tmpProduct.product_img;

      this.showModalProduct = false;
    },
    async confirmProduct()
    {
        await this.$bvModal.msgBoxConfirm(this.$t('กรุณายืนยันการสั่งซื้อสินค้า'), {
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
                      this.createSubScribeOrder();
                    }
                })
                .catch(err => {

                })
    },
    async createSubScribeOrder() {
      console.log('createSubScribeOrder');

      const formData = new FormData();
      formData.append("user_id", this.userid);
      formData.append("token", "-");
      formData.append("line_id", this.lineId);
      formData.append("email", this.selectedSubScribeEmail);
      formData.append("product_id", this.product.id);
      formData.append("note", "");
      formData.append("page_name", this.$route.name);
      

      const response = await this.CreateSubScribeOrder(formData);
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
