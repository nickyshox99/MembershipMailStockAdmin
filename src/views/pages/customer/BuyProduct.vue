<template>
  <div class="buy-product-container">
    <div class="buy-product-background">
      <div class="background-overlay"></div>
    </div>

    <div class="auth-wrapper auth-v1 px-2">
      <div class="auth-inner py-2">
        <b-card class="buy-product-card mb-0">
          <div class="logo-section">
            <vuexy-logo />
            <h2 class="brand-text">
              BigaByte Membership
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

            <div class="divider"></div>

            <!-- <div class="email-section">
              <h4 class="email-title">
                <feather-icon icon="MailIcon" class="title-icon" />
                Email ที่ใช้ในการสมัคร
              </h4>
              <div class="email-display">
                <span class="email-text">{{ selectedSubScribeEmail }}</span>
              </div>
            </div> -->

            <div class="divider"></div>

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
    const params = new URLSearchParams(window.location.search);
    this.sourceUserId = params.get('sourceUserId') || '';
    this.email = params.get('email') || '';
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
        this.productList = response.data.data;
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

      const formData = new FormData();
      formData.append("user_id", this.userid);
      formData.append("token", "-");
      formData.append("line_id", this.sourceUserId);
      formData.append("email", this.selectedSubScribeEmail);
      formData.append("product_id", this.product.id);
      formData.append("note", "");
      formData.append("page_name", this.$route.name);


      formData.append("admin_id", "System") // controller รองรับค่าว่างจะ default เป็น "System"
      response = await this.CreateAndApproveSubScribeOrder(formData)
     
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
@import '@core/scss/vue/pages/page-auth.scss';

// Modern Buy Product Styling - White, Black, Red Theme (Same as RegisterEmail)
.buy-product-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  font-family: 'MiSansMU', sans-serif;
}

.buy-product-background {
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

.content-section {
  .product-section {
    margin-bottom: 2rem;

    .section-title {
      color: #000000;
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
      background: linear-gradient(135deg, rgba(220, 53, 69, 0.08) 0%, rgba(220, 53, 69, 0.02) 100%);
      border: 2px solid rgba(220, 53, 69, 0.1);
      border-radius: 20px;
      padding: 2rem;
      margin-bottom: 1.5rem;
      width: 100%;
      box-shadow: 0 8px 25px rgba(220, 53, 69, 0.1);
      transition: all 0.3s ease;
      white-space: nowrap;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 35px rgba(220, 53, 69, 0.15);
        border-color: rgba(220, 53, 69, 0.2);
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
            color: #2c3e50;
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
            color: #6c757d;
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
        background: linear-gradient(135deg, #dc3545 0%, #c82333 100%) !important;
        border: none !important;
        border-radius: 12px !important;
        padding: 0.75rem 1.5rem !important;
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
          box-shadow: 0 6px 20px rgba(220, 53, 69, 0.4) !important;
          background: linear-gradient(135deg, #c82333 0%, #bd2130 100%) !important;
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
          color: #dc3545;
          margin-bottom: 1rem;
        }

        .no-product-text {
          color: #666666;
          font-family: 'MiSansMU', sans-serif;
          font-weight: 400;
          margin-bottom: 1.5rem;
        }

        .select-product-btn {
          background: linear-gradient(135deg, #dc3545 0%, #a71e2a 100%) !important;
          border: none !important;
          border-radius: 12px !important;
          padding: 0.875rem 1.5rem !important;
          font-family: 'MiSansMU', sans-serif;
          font-weight: 500;
          color: #ffffff !important;
          box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
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
            box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4) !important;
          }
        }
      }
    }
  }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, #e9ecef 50%, transparent 100%);
    margin: 1.5rem 0;
  }

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
      background: linear-gradient(135deg, #28c76f 0%, #20a55a 100%) !important;
      border: none !important;
      border-radius: 12px !important;
      padding: 0.875rem 2rem !important;
      font-family: 'MiSansMU', sans-serif;
      font-weight: 600;
      font-size: 1rem;
      color: #ffffff !important;
      box-shadow: 0 4px 15px rgba(40, 199, 111, 0.3);
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
        box-shadow: 0 8px 25px rgba(40, 199, 111, 0.4) !important;
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
      color: #28c76f;
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
      color: #666666;
      font-family: 'MiSansMU', sans-serif;
      font-weight: 400;
      font-size: 1rem;
      line-height: 1.5;
      margin-bottom: 0;
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .buy-product-card {
    margin: 1rem;
    padding: 2rem;
    border-radius: 20px !important;
  }

  .logo-section .brand-text {
    font-size: 1.5rem;
  }

  .content-section .product-section .product-display {
    padding: 1rem;

    .product-info {
      margin-bottom: 1rem;

      .product-image {
        width: 60px;
        height: 60px;
        margin-bottom: 0.8rem;
      }

      .product-details {
        .product-name {
          font-size: 1.1rem;
          margin-bottom: 0.3rem;
          line-height: 1.2;
        }

        .product-desc {
          font-size: 0.85rem;
          max-width: 220px;
          line-height: 1.3;
        }
      }
    }

    .select-product-btn {
      max-width: 180px;
      padding: 0.5rem 1rem !important;
      font-size: 0.85rem;
    }
  }
}

@media (max-width: 480px) {
  .buy-product-card {
    margin: 0.5rem;
    padding: 1rem;
    border-radius: 16px !important;
  }

  .logo-section .brand-text {
    font-size: 1.2rem;
  }

  .content-section .product-section .product-display {
    padding: 0.8rem;

    .product-info {
      margin-bottom: 0.8rem;

      .product-image {
        width: 50px;
        height: 50px;
        margin-bottom: 0.6rem;
      }

      .product-details {
        .product-name {
          font-size: 1rem;
          margin-bottom: 0.2rem;
          line-height: 1.1;
        }

        .product-desc {
          font-size: 0.8rem;
          max-width: 200px;
          line-height: 1.2;
        }
      }
    }

    .select-product-btn {
      max-width: 160px;
      padding: 0.4rem 0.8rem !important;
      font-size: 0.8rem;
    }
  }

  .content-section .product-section .section-title {
    font-size: 1.1rem;
  }
}

// Modal Styling
.product-modal {
  .modal-dialog {
    margin: 1rem auto;
    max-width: 500px;
  }

  .modal-content {
    border-radius: 12px;
    border: none;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .modal-header {
    border-bottom: 1px solid #e9ecef;
    padding: 1rem 1.5rem;
    color: white;
    border-radius: 12px 12px 0 0;

    .modal-title {
      font-weight: 600;
      font-size: 1.1rem;
    }

    .close {
      color: white;
      opacity: 0.8;
      font-size: 1.5rem;
      font-weight: 300;
      padding: 0;
      margin: 0;
      line-height: 1;
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);

      &:hover {
        opacity: 1;
        color: white;
      }

      &:focus {
        outline: none;
        box-shadow: none;
      }
    }
  }

  .modal-body {
    padding: 1.5rem;
    background: #f8f9fa;
  }

  .modal-footer {
    border-top: 1px solid #e9ecef;
    padding: 1rem 1.5rem;
    background: white;
    border-radius: 0 0 12px 12px;

    .btn {
      border-radius: 8px;
      font-weight: 500;
      padding: 0.5rem 1.5rem;
    }
  }
}

// Confirm Modal Styling
.modal-content {
  border-radius: 12px;
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-header {
  border-bottom: 1px solid #e9ecef;
  padding: 1rem 1.5rem;
  border-radius: 12px 12px 0 0;

  &.bg-success {
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%) !important;
    color: white !important;

    .modal-title {
      font-weight: 600;
      font-size: 1.1rem;
    }

    .close {
      color: white;
      opacity: 0.8;
      font-size: 1.5rem;
      font-weight: 300;

      &:hover {
        opacity: 1;
        color: white;
      }
    }
  }
}

.modal-body {
  padding: 1.5rem;
  text-align: center;
  font-size: 1rem;
  line-height: 1.5;
}

.modal-footer {
  border-top: 1px solid #e9ecef;
  padding: 1rem 1.5rem;
  background: white;
  border-radius: 0 0 12px 12px;
  justify-content: center;

  .btn {
    border-radius: 8px;
    font-weight: 500;
    padding: 0.5rem 1.5rem;
    margin: 0 0.25rem;
    min-width: 80px;

    &.btn-success {
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      border: none;
      box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
      }
    }

    &.btn-secondary {
      background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
      border: none;
      box-shadow: 0 2px 8px rgba(108, 117, 125, 0.3);

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(108, 117, 125, 0.4);
      }
    }
  }
}

// Modal Grid Styling
.content-container {
  max-height: 300px;
  overflow-y: auto;
  width: 100%;
}

.grid-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 0;

}

.grid-item {
  width: 100%;
  color: grey;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-top: 10px;

  &:hover {
    border-color: #dc3545;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(220, 53, 69, 0.15);
  }

  &.selected {
    background-color: antiquewhite;
    border-color: #dc3545;
    color: black;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    flex-shrink: 0;
  }

  .product-info {
    flex: 1;
    text-align: left;

    span {
      display: block;
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 2px;
      word-wrap: break-word;

      &:last-child {
        font-size: 10px;
        font-weight: 400;
      }
    }
  }
}
</style>
