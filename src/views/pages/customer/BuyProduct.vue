<template>
  <div class="buy-product-container">
    <div class="buy-product-background">
      <div class="background-overlay"></div>
    </div>

    <div class="auth-wrapper auth-v1 px-2">
      <div class="auth-inner py-2">
        <b-card class="buy-product-card mb-0">
          <div class="logo-section">
           <img src="/logo_lb2.png" alt="BigaByte Membership" class="logo-image">
            <h2 class="brand-text">
              littlebeem
            </h2>
          </div>

          <div class="content-section" v-if="!showCompleteDialog">
            <div class="product-section">
              <h3 class="section-title">เลือกแพ็กเกจสมาชิก</h3>

              <div class="product-display" v-if="product.id != 0">
                <div class="product-info">
                  <img :src="product.product_img" class="product-image" />
                  <div class="product-details">
                    <h4 class="product-name">{{ product.product_name }}</h4>
                    <p class="product-desc">{{ product.product_desc }}</p>
                  </div>
                </div>

                <b-button variant="primary" class="select-product-btn" @click="tabShowProduct()">
                  <feather-icon icon="ShoppingCartIcon" class="button-icon" />
                  {{ t('Select Product') }}
                </b-button>
              </div>

              <div class="no-product" v-else>
                <div class="no-product-content">
                  <feather-icon icon="PackageIcon" class="no-product-icon" />
                  <p class="no-product-text">ยังไม่ได้เลือกแพ็กเกจ</p>
                  <b-button variant="primary" class="select-product-btn" @click="tabShowProduct()">
                    <feather-icon icon="ShoppingCartIcon" class="button-icon" />
                    {{ t('Select Product') }}
                  </b-button>
                </div>
              </div>
            </div>

            <!-- <div class="divider"></div> -->

            <!-- <div class="email-section">
              <h4 class="email-title">
                <feather-icon icon="MailIcon" class="title-icon" />
                Email ที่ใช้ในการสมัคร
              </h4>
              <div class="email-display">
                <span class="email-text">{{ selectedSubScribeEmail }}</span>
              </div>
            </div> -->

            <!-- <div class="divider"></div> -->

            <div class="action-section">
              <b-button v-if="product.id != 0" variant="success" class="confirm-btn" @click="confirmProduct()">
                <feather-icon icon="CheckIcon" class="button-icon" />
                {{ t('Confirm') }}
              </b-button>
            </div>
          </div>

          <div class="complete-section" v-if="showCompleteDialog">
            <div class="complete-content">
              <feather-icon icon="CheckCircleIcon" class="complete-icon" />
              <h3 class="complete-title">การสั่งซื้อเสร็จสิ้น</h3>
              <p class="complete-message">
                การสั่งซื้อสินค้าเสร็จสิ้นแล้ว ถ้าเป็นสมาชิกใหม่กรุณารออีเมลล์เชิญเข้ากลุ่ม
              </p>
            </div>
          </div>
        </b-card>
      </div>
    </div>

    <b-modal id="modal-product" ref="modalProduct" v-model="showModalProduct" :title="t('Product')"
      @show="resetModalProduct" @hidden="resetModalProduct" @ok="handleOkProductOk" size="sm" :hideHeaderClose="false"
      ok-variant="success" :okTitle="t('YES')" buttonSize="sm" :cancelTitle="t('NO')" footerClass="p-2"
      modal-class="product-modal">
      <!-- <b-row>
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
      </b-row> -->

      <b-row>
        <div class="dialog-content2" style="padding-left: 20px; width: 100%; margin-right: 15px;">
          <h4>{{ t('Select Product') }}</h4>
          <div class="content-container ">
            <div class="grid-container">
              <div class="grid-item" v-for="(product) in productList" :key="product.id"
                @click="changeSelectedProduct(product.id)" :class="{ 'selected': product.id == selectedProductId }">
                <img :src="product.product_img" />
                <div class="product-info">
                  <span>{{ product.product_name }}</span>
                  <span>{{ product.product_desc }}</span>
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
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroupPrepend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton, BCard, BFormSelect, BIconTrash
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { mapActions } from "vuex";
import axios from "axios"
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
      showProduct: true,
      productList: [],

      selectedSubScribeEmail: "",
      optionSubScribeEmail: [{
        value: "",
        text: 'Select Email'
      },],
      selectedProductId: 0,
      showModalProduct: false,
      emailList: [],
      product: {
        id: 0,
        product_name: '',
        product_desc: '',
        product_img: ''
      },
      showCompleteDialog: false,
      userid: '',
      email: '',
      enableSkipApproval: false,
      sourceUserId: '',
      purchaseType: '',
      shopType: '' // shop_type ที่รับมาจาก query
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
  // async created() {
  //   const params = new URLSearchParams(window.location.search);
  //   this.sourceUserId = params.get('sourceUserId') || '';
  //   this.email = params.get('email') || '';
  //   await this.getSourceProfile();

  //   if (this.lineId == '') 
  //   {
  //       this.showProduct = false;
  //   }
  //   else
  //   {
  //       await Promise.all([                   
  //           this.getProductList(),      
  //           this.getEmailByLineSourceId(),                  
  //       ]); 
  //   }




  // },
  async created() {
    await this.loadSetting()        // <— โหลดค่าก่อน
    
    // รับค่าจาก Vue Router Query
    this.sourceUserId = this.$route.query.sourceUserId;
    this.email = this.$route.query.email;
    this.purchaseType = this.$route.query.purchase_type || this.$route.query.purchaseType || this.$route.query.type;
    this.shopType = this.$route.query.shop_type;
    
    console.log('BuyProduct - sourceUserId:', this.sourceUserId);
    console.log('BuyProduct - email:', this.email);
    console.log('BuyProduct - purchaseType:', this.purchaseType);
    console.log('BuyProduct - shopType:', this.shopType);
    
    await this.getSourceProfile();

    if (this.lineId == '') {
      this.showProduct = false;
    } else {
      await Promise.all([
        this.getProductList(),
        // this.getEmailByLineSourceId(),
      ]);
    }
  },
  methods: {
    ...mapActions(["GetLineProfileByLineSourceId"]),
    ...mapActions(["GetActiveProductSetting"]),
    ...mapActions(["GetMemberEmail"]),
    ...mapActions(["CreateSubScribeOrder"]),
    ...mapActions(["GetEmailByLineSourceId"]),
    ...mapActions(["CreateAndApproveSubScribeOrder"]),
    async validationForm() {

    },
    async getSourceProfile() {
      console.log('getSourceProfile');

      //const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      formData.append("userid", "-");
      formData.append("token", "-");

      formData.append("line_source_id", this.sourceUserId);
      formData.append("page_name", this.$route.name);

      const response = await this.GetLineProfileByLineSourceId(formData);
      if (response.data.status == 'success') {
        if (response.data.data.length > 0) {
          //console.log(response.data.data[0]);
          this.userid = response.data.data[0].userid;
          this.lineId = response.data.data[0].lineid;


        } else {
          this.lineId = '';

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
    async getEmailByLineSourceId() {
      console.log('getEmailByLineSourceId');

      //const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      formData.append("userid", "-");
      formData.append("token", "-");

      formData.append("line_source_id", this.sourceUserId);
      formData.append("page_name", this.$route.name);

      const response = await this.GetEmailByLineSourceId(formData);
      if (response.data.status == 'success') {
        this.emailList = response.data.data;
        let tmpArray = [];
        this.emailList.forEach(element => {
          tmpArray.push({
            value: element.email,
            text: element.email
          });
        });
        this.optionSubScribeEmail = tmpArray;
        if (this.email != '') {
          this.selectedSubScribeEmail = tmpArray.find(x => x.value == this.email).value;
        }
        else {
          this.selectedSubScribeEmail = tmpArray[0].value;
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
    async getProductList() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const User = new FormData();

      User.append("userid", "");
      User.append("token", "");
      User.append("page_name", "");

      const response = await this.GetActiveProductSetting(User);
      if (response.data.status == 'success') {
        // Filter ข้อมูลตาม shopType
        let allProducts = response.data.data;
        
        if (this.shopType) {
          // แสดงเฉพาะ shop_type ที่ระบุ
          this.productList = allProducts.filter(product => product.shop_type == this.shopType);
        }
        
        // console.log('Filtered products for shop_type:', this.shopType, this.productList);
      } else {

      }
    },
    changeSelectedProduct(id) {
      this.selectedProductId = id;
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
    async confirmProduct() {
      await this.$bvModal.msgBoxConfirm(this.$t('กรุณายืนยันการสั่งซื้อสินค้า'), {
        title: this.$t('Please Confirm'),
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'success',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: true,
        centered: true,
        headerBgVariant: 'success',
        headerTextVariant: 'white'
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
      console.log('purchase_type before send:', this.purchaseType);

      const formData = new FormData();
      formData.append("user_id", this.userid);
      console.log(this.userid);
      formData.append("token", "-");
      formData.append("line_id", this.sourceUserId);
      console.log(this.sourceUserId);
      formData.append("email", this.selectedSubScribeEmail);
      formData.append("product_id", this.product.id);
      formData.append("note", "");
      formData.append("page_name", this.$route.name);
      formData.append("purchase_type", this.purchaseType); // เพิ่ม purchase_type


      formData.append("admin_id", "System") // controller รองรับค่าว่างจะ default เป็น "System"
      const response = await this.CreateAndApproveSubScribeOrder(formData)

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


        // const orderId = response.data.orderId || response.data.data?.id || '';
        const orderId = response.data.order_id;
        console.log('orderId:', orderId);
        if (orderId) {
          this.$router.replace(
            {
              name: 'confirm-payment',
              query: { 
                user_id: String(this.sourceUserId), 
                id: String(orderId),
                purchase_type: this.purchaseType,
                email: this.email
              }
            })
        }




        this.showCompleteDialog = true;

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

    async loadSetting() {
      try {
        const userData = JSON.parse(localStorage.getItem('userData')) || {}
        const res = await axios.get("api/adminsetting/getadminsetting", {
          headers: {
            'Content-Type': 'application/json',
            'userid': userData.username || '-',
            'token': userData.token || '-',
          }
        })
        const list = res?.data?.data || []
        const lineToken = list.find(x => x.meta === 'line_token')
        if (lineToken?.value) {
          const val = JSON.parse(lineToken.value)
          // แปลง enable เป็น boolean
          Object.keys(val).forEach(k => {
            if (k.toLowerCase().includes('enable')) val[k] = val[k] === 1 || val[k] === true
          })
          this.enableSkipApproval = !!val.enableSkipApproval
        }
      } catch (e) {
        // เงียบไว้/หรือ toast ตามสะดวก
        this.enableSkipApproval = false
      }
    },
  },

}
</script>

<style lang="scss">
// @import '@core/scss/vue/pages/page-auth.scss';

// Modern Buy Product Styling - Pastel Theme
.buy-product-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #F8BBD9 0%, #FDD5B4 25%, #FFF2CC 50%, #E1F5FE 75%, #BBDEFB 100%);
  font-family: 'MiSansMU', sans-serif;
}

.buy-product-background {
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
  background: radial-gradient(circle at 30% 20%, rgba(255, 182, 193, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(135, 206, 235, 0.15) 0%, transparent 50%);
  z-index: 2;
}

.auth-wrapper {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 500px;
}

.buy-product-card {
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

  .logo-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    box-shadow: 0 8px 25px rgba(255, 182, 193, 0.3);
    border: 3px solid rgba(255, 182, 193, 0.2);
    transition: all 0.3s ease;
    object-fit: cover;
    background: linear-gradient(135deg, rgba(255, 240, 245, 0.9) 0%, rgba(240, 248, 255, 0.9) 100%);
    padding: 8px;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 12px 35px rgba(255, 182, 193, 0.4);
      border-color: rgba(255, 182, 193, 0.3);
    }
  }

  .brand-text {
    color: #ff69b4 !important;
    font-family: 'MiSansMU', sans-serif;
    font-weight: 700;
    font-size: 1.8rem;
    margin-top: 1rem;
    margin-bottom: 0;
    text-shadow: 0 2px 4px rgba(255, 182, 193, 0.3);
  }
}

.content-section {
  .product-section {
    margin-bottom: 2rem;

    .section-title {
      color: #87ceeb;
      font-family: 'MiSansMU', sans-serif;
      font-weight: 600;
      font-size: 1.3rem;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .product-display {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(135deg, rgba(255, 182, 193, 0.1) 0%, rgba(135, 206, 235, 0.05) 100%);
      border: 2px solid rgba(255, 182, 193, 0.2);
      border-radius: 20px;
      padding: 2rem;
      margin-bottom: 1.5rem;
      width: 100%;
      box-shadow: 0 8px 25px rgba(255, 182, 193, 0.15);
      transition: all 0.3s ease;
      white-space: nowrap;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 35px rgba(255, 182, 193, 0.25);
        border-color: rgba(255, 182, 193, 0.3);
      }

      .product-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-bottom: 1.5rem;

        .product-image {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          margin-bottom: 1rem;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease;

          &:hover {
            transform: scale(1.05);
          }
        }

        .product-details {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;

          .product-name {
            color: #000000;
            font-family: 'MiSansMU', sans-serif;
            font-weight: 600;
            font-size: 1.4rem;
            margin-bottom: 0.5rem;
            line-height: 1.3;
            text-align: center;
            word-wrap: break-word;
            hyphens: auto;
          }

          .product-desc {
            color: #333333;
            font-size: 1rem;
            margin: 0;
            line-height: 1.4;
            max-width: 280px;
            text-align: center;
            word-wrap: break-word;
            hyphens: auto;
          }
        }
      }

      .select-product-btn {
        width: 100%;
        max-width: 250px;
        background: linear-gradient(135deg, #ff69b4 0%, #ff1493 100%) !important;
        border: none !important;
        border-radius: 12px !important;
        padding: 0.75rem 1.5rem !important;
        font-family: 'MiSansMU', sans-serif;
        font-weight: 600;
        font-size: 1rem;
        color: #ffffff !important;
        box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4);
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
          box-shadow: 0 6px 20px rgba(255, 105, 180, 0.5) !important;
          background: linear-gradient(135deg, #ff1493 0%, #dc143c 100%) !important;
        }

        &:active {
          transform: translateY(0);
        }
      }
    }

    .no-product {
      text-align: center;
      padding: 2rem;

      .no-product-content {
        .no-product-icon {
          width: 48px;
          height: 48px;
          color: #ff69b4;
          margin-bottom: 1rem;
        }

        .no-product-text {
          color: #333333;
          font-family: 'MiSansMU', sans-serif;
          font-weight: 400;
          margin-bottom: 1.5rem;
        }

        .select-product-btn {
          background: linear-gradient(135deg, #ff69b4 0%, #ff1493 100%) !important;
          border: none !important;
          border-radius: 12px !important;
          padding: 0.875rem 1.5rem !important;
          font-family: 'MiSansMU', sans-serif;
          font-weight: 500;
          color: #ffffff !important;
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4);
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
            box-shadow: 0 8px 25px rgba(255, 105, 180, 0.5) !important;
          }
        }
      }
    }
  }

  // .divider {
  //   height: 1px;
  //   background: linear-gradient(90deg, transparent 0%, rgba(255, 182, 193, 0.3) 50%, transparent 100%);
  //   margin: 1.5rem 0;
  // }

  .email-section {
    margin-bottom: 2rem;

    .email-title {
      color: #000000;
      font-family: 'MiSansMU', sans-serif;
      font-weight: 600;
      font-size: 1.1rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;

      .title-icon {
        width: 18px;
        height: 18px;
        margin-right: 0.5rem;
        color: #dc3545;
      }
    }

    .email-display {
      background: rgba(220, 53, 69, 0.05);
      border-radius: 12px;
      padding: 1rem;

      .email-text {
        color: #000000;
        font-family: 'MiSansMU', sans-serif;
        font-weight: 500;
        font-size: 1rem;
      }
    }
  }

  .action-section {
    text-align: center;

    .confirm-btn {
      background: linear-gradient(135deg, #028902 0%, #028902 100%) !important;
      border: none !important;
      border-radius: 12px !important;
      padding: 0.875rem 2rem !important;
      font-family: 'MiSansMU', sans-serif;
      font-weight: 600;
      font-size: 1rem;
      color: #ffffff !important;
      box-shadow: 0 4px 15px rgba(152, 251, 152, 0.4);
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
        box-shadow: 0 8px 25px rgba(152, 251, 152, 0.5) !important;
      }
    }
  }
}

.complete-section {
  text-align: center;
  padding: 2rem 0;

  .complete-content {
    .complete-icon {
      width: 64px;
      height: 64px;
      color: #98fb98;
      margin-bottom: 1.5rem;
    }

    .complete-title {
      color: #000000;
      font-family: 'MiSansMU', sans-serif;
      font-weight: 600;
      font-size: 1.4rem;
      margin-bottom: 1rem;
    }

    .complete-message {
      color: #333333;
      font-family: 'MiSansMU', sans-serif;
      font-weight: 400;
      font-size: 1rem;
      line-height: 1.5;
      margin-bottom: 0;
    }
  }
}

// Responsive Design
// @media (max-width: 768px) {
//   .buy-product-card {
//     margin: 1rem;
//     padding: 2rem;
//     border-radius: 20px !important;
//   }

//   .logo-section {
//     .logo-image {
//       width: 100px;
//       height: 100px;
//       border-radius: 50%;
//     }

//     .brand-text {
//       font-size: 1.5rem;
//     }
//   }

//   .content-section .product-section .product-display {
//     padding: 1rem;

//     .product-info {
//       margin-bottom: 1rem;

//       .product-image {
//         width: 60px;
//         height: 60px;
//         margin-bottom: 0.8rem;
//       }

//       .product-details {
//         .product-name {
//           font-size: 1.1rem;
//           margin-bottom: 0.3rem;
//           line-height: 1.2;
//         }

//         .product-desc {
//           font-size: 0.85rem;
//           max-width: 220px;
//           line-height: 1.3;
//         }
//       }
//     }

//     .select-product-btn {
//       max-width: 180px;
//       padding: 0.5rem 1rem !important;
//       font-size: 0.85rem;
//     }
//   }
// }

// @media (max-width: 480px) {
//   .buy-product-card {
//     margin: 0.5rem;
//     padding: 1rem;
//     border-radius: 16px !important;
//   }

//   .logo-section {
//     .logo-image {
//       width: 80px;
//       height: 80px;
//       border-radius: 50%;
//     }

//     .brand-text {
//       font-size: 1.2rem;
//     }
//   }

//   .content-section .product-section .product-display {
//     padding: 0.8rem;

//     .product-info {
//       margin-bottom: 0.8rem;

//       .product-image {
//         width: 50px;
//         height: 50px;
//         margin-bottom: 0.6rem;
//       }

//       .product-details {
//         .product-name {
//           font-size: 1rem;
//           margin-bottom: 0.2rem;
//           line-height: 1.1;
//         }

//         .product-desc {
//           font-size: 0.8rem;
//           max-width: 200px;
//           line-height: 1.2;
//         }
//       }
//     }

//     .select-product-btn {
//       max-width: 160px;
//       padding: 0.4rem 0.8rem !important;
//       font-size: 0.8rem;
//     }
//   }

//   .content-section .product-section .section-title {
//     font-size: 1.1rem;
//   }
// }

// Modal Styling - Modern Design
.product-modal {
  .modal-dialog {
    margin: 2rem auto;
    max-width: 600px;
  }

  .modal-content {
    border-radius: 24px;
    border: none;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    overflow: hidden;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 182, 193, 0.1) 0%, rgba(135, 206, 235, 0.05) 100%);
      border-radius: 24px;
      pointer-events: none;
    }
  }

  .modal-header {
    border-bottom: 1px solid rgba(255, 182, 193, 0.2);
    padding: 2rem 2rem 1.5rem;
    background: linear-gradient(135deg, rgba(255, 182, 193, 0.1) 0%, rgba(135, 206, 235, 0.1) 100%);
    border-radius: 24px 24px 0 0;
    position: relative;
    z-index: 1;

    .modal-title {
      font-weight: 700;
      font-size: 1.4rem;
      color: #000000;
      font-family: 'MiSansMU', sans-serif;
      text-align: center;
      margin: 0;
    }

    .close {
      color: #ff69b4;
      opacity: 0.8;
      font-size: 1.8rem;
      font-weight: 300;
      padding: 0;
      margin: 0;
      line-height: 1;
      position: absolute;
      right: 2rem;
      top: 50%;
      transform: translateY(-50%);
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        opacity: 1;
        color: #ff1493;
        transform: translateY(-50%) scale(1.1);
        background: rgba(255, 255, 255, 1);
      }

      &:focus {
        outline: none;
        box-shadow: none;
      }
    }
  }

  .modal-body {
    padding: 2rem;
    background: transparent;
    position: relative;
    z-index: 1;
    
    .dialog-title {
      color: #000000;
      font-family: 'MiSansMU', sans-serif;
      font-weight: 600;
      font-size: 1.3rem;
      margin-bottom: 1.5rem;
      text-align: center;
    }
  }

  .modal-footer {
    border-top: 1px solid rgba(255, 182, 193, 0.2);
    padding: 1.5rem 2rem 2rem;
    background: linear-gradient(135deg, rgba(255, 182, 193, 0.05) 0%, rgba(135, 206, 235, 0.05) 100%);
    border-radius: 0 0 24px 24px;
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    gap: 1rem;

    .btn {
      border-radius: 16px;
      font-weight: 600;
      padding: 0.875rem 2rem;
      font-family: 'MiSansMU', sans-serif;
      font-size: 1rem;
      transition: all 0.3s ease;
      min-width: 120px;
      
      &.btn-success {
        background: linear-gradient(135deg, #98fb98 0%, #90ee90 100%);
        border: none;
        color: white;
        box-shadow: 0 6px 20px rgba(152, 251, 152, 0.3);
        
        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(152, 251, 152, 0.4);
        }
      }
      
      &.btn-secondary {
        background: linear-gradient(135deg, #ffb6c1 0%, #ffa0b4 100%);
        border: none;
        color: white;
        box-shadow: 0 6px 20px rgba(255, 182, 193, 0.3);
        
        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(255, 182, 193, 0.4);
        }
      }
    }
  }
}

// Confirm Modal Styling - Pastel Theme
.modal-content {
  border-radius: 24px;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 182, 193, 0.1) 0%, rgba(135, 206, 235, 0.05) 100%);
    border-radius: 24px;
    pointer-events: none;
  }
}

.modal-header {
  border-bottom: 1px solid rgba(255, 182, 193, 0.2);
  padding: 2rem 2rem 1.5rem;
  background: linear-gradient(135deg, rgba(255, 182, 193, 0.1) 0%, rgba(135, 206, 235, 0.1) 100%);
  border-radius: 24px 24px 0 0;
  position: relative;
  z-index: 1;

  &.bg-success {
    background: linear-gradient(135deg, rgba(152, 251, 152, 0.2) 0%, rgba(144, 238, 144, 0.2) 100%) !important;
    color: #000000 !important;

    .modal-title {
      font-weight: 700;
      font-size: 1.4rem;
      color: #000000;
      font-family: 'MiSansMU', sans-serif;
    }

    .close {
      color: #ff69b4;
      opacity: 0.8;
      font-size: 1.8rem;
      font-weight: 300;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      &:hover {
        opacity: 1;
        color: #ff1493;
        transform: scale(1.1);
        background: rgba(255, 255, 255, 1);
      }
    }
  }
}

.modal-body {
  padding: 2rem;
  text-align: center;
  font-size: 1rem;
  line-height: 1.5;
  color: #333333;
  font-family: 'MiSansMU', sans-serif;
  position: relative;
  z-index: 1;
}

.modal-footer {
  border-top: 1px solid rgba(255, 182, 193, 0.2);
  padding: 1.5rem 2rem 2rem;
  background: linear-gradient(135deg, rgba(255, 182, 193, 0.05) 0%, rgba(135, 206, 235, 0.05) 100%);
  border-radius: 0 0 24px 24px;
  justify-content: center;
  position: relative;
  z-index: 1;
  display: flex;
  gap: 1rem;

  .btn {
    border-radius: 16px;
    font-weight: 600;
    padding: 0.875rem 2rem;
    margin: 0 0.25rem;
    min-width: 120px;
    font-family: 'MiSansMU', sans-serif;
    font-size: 1rem;
    transition: all 0.3s ease;

    &.btn-success {
      background: linear-gradient(135deg, #98fb98 0%, #90ee90 100%);
      border: none;
      color: white;
      box-shadow: 0 6px 20px rgba(152, 251, 152, 0.3);

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(152, 251, 152, 0.4);
      }
    }

    &.btn-secondary {
      background: linear-gradient(135deg, #ffb6c1 0%, #ffa0b4 100%);
      border: none;
      color: white;
      box-shadow: 0 6px 20px rgba(255, 182, 193, 0.3);

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(255, 182, 193, 0.4);
      }
    }
  }
}

// Modal Grid Styling - Modern Cards
.content-container {
  max-height: 400px;
  overflow-y: auto;
  width: 100%;
  padding: 1rem;
  
  // Custom scrollbar
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 182, 193, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 105, 180, 0.3);
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 105, 180, 0.5);
    }
  }
}

.grid-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 0;
}

.grid-item {
  width: 100%;
  color: #000000;
  border: 2px solid rgba(255, 182, 193, 0.3);
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 182, 193, 0.1) 0%, rgba(135, 206, 235, 0.05) 100%);
    border-radius: 20px;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  &:hover {
    border-color: #ff69b4;
    transform: translateY(-5px) scale(1.02);
    box-shadow: 
      0 15px 35px rgba(255, 105, 180, 0.2),
      0 5px 15px rgba(255, 105, 180, 0.1);
    background: rgba(255, 255, 255, 0.95);
    
    &::before {
      background: linear-gradient(135deg, rgba(255, 182, 193, 0.2) 0%, rgba(135, 206, 235, 0.1) 100%);
    }
  }

  &.selected {
    background: linear-gradient(135deg, rgba(255, 182, 193, 0.25) 0%, rgba(135, 206, 235, 0.15) 100%);
    border-color: #ff69b4;
    color: #000000;
    box-shadow: 
      0 10px 30px rgba(255, 105, 180, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    
    &::before {
      background: linear-gradient(135deg, rgba(255, 182, 193, 0.3) 0%, rgba(135, 206, 235, 0.2) 100%);
    }
  }

  img {
    width: 70px;
    height: 70px;
    border-radius: 16px;
    flex-shrink: 0;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    object-fit: cover;
  }

  &:hover img {
    transform: scale(1.1) rotate(2deg);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  }

  .product-info {
    flex: 1;
    text-align: left;
    position: relative;
    z-index: 1;

    span {
      display: block;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 6px;
      word-wrap: break-word;
      color: #000000;
      font-family: 'MiSansMU', sans-serif;
      line-height: 1.3;

      &:last-child {
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        line-height: 1.4;
      }
    }
  }
}
</style>