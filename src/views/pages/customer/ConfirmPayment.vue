<template>
  <div class="confirm-payment-container">
    <div class="confirm-payment-background">
      <div class="background-overlay"></div>
    </div>

    <div class="auth-wrapper auth-v1">
      <div class="auth-inner">
        <b-card class="confirm-payment-card mb-0">
          <div class="logo-section">
            <vuexy-logo />
            <h2 class="brand-text">
              BigaByte Membership
            </h2>
          </div>

          <div class="content-section">
            <!-- Error Message -->
            <div v-if="showErrorParam" class="error-section">
              <div class="error-content">
                <feather-icon icon="AlertCircleIcon" class="error-icon" />
                <h3 class="error-title">ไม่พบรายการสั่งซื้อ</h3>
                <p class="error-message">ไม่มีรายการให้ทำการยืนยันการซื้อ</p>
              </div>
            </div>

            <!-- Main Content -->
            <div v-if="!showErrorParam" class="main-content">
              <!-- Product Info -->
              <div v-if="orderData.id != 0" class="product-info-section">
                <h3 class="section-title">สินค้าที่ซื้อ</h3>
                <div class="product-display">
                  <img :src="orderData.subscription_img" class="product-image" />
                  <h4 class="product-name">{{ orderData.product_name }}</h4>
                </div>
              </div>

              <div class="divider"></div>

              <!-- User ID Info -->
              <div class="userid-section">
                <h4 class="userid-title">
                  <feather-icon icon="UserIcon" class="title-icon" />
                  User ID ที่ใช้ในการสมัคร
                </h4>
                <div class="userid-display">
                  <span class="userid-text">{{ orderData.user_id }}</span>
                </div>
              </div>

              <div class="divider"></div>

              <!-- Payment Info -->
              <div v-if="!showCompleteDialog && !showSlipCorrect" class="payment-section">
                <h4 class="payment-title">
                  <feather-icon icon="CreditCardIcon" class="title-icon" />
                  ชำระเงินโดยโอนเข้าบัญชี
                </h4>

                <div class="bank-info">
                  <div class="bank-logo">
                    <img :src="'/images/bank_bg/' + bankData.bank_ico" class="bank-icon" />
                  </div>
                  <div class="bank-details">
                    <h5 class="bank-name">{{ bankData.bank_name }}</h5>
                    <p class="bank-account">{{ bankData.bank_acc_number }}</p>
                    <p class="bank-holder">{{ bankData.bank_acc_name }}</p>
                  </div>
                </div>
              </div>

              <div class="divider"></div>

              <!-- Slip Upload -->
              <div v-if="!showCompleteDialog && !showSlipCorrect" class="slip-section">
                <h4 class="slip-title">
                  <feather-icon icon="UploadIcon" class="title-icon" />
                  อัปโหลดสลิปการโอนเงิน
                </h4>

                <div v-if="slip_file_url != ''" class="slip-display">
                  <img :src="slip_file_url" class="slip-image" alt="Slip Image" />
                  <div class="slip-actions">
                    <b-button variant="danger" size="sm" class="delete-btn" @click="deleteSlip()">
                      <feather-icon icon="TrashIcon" class="button-icon" />
                      ลบสลิป
                    </b-button>
                  </div>
                </div>

                <div v-if="slip_file_url == ''" class="slip-upload">
                  <input type="file" @change="uploadFile('slip')" ref="slip" class="file-input" accept="image/*" />
                  <p class="upload-hint">กรุณาเลือกไฟล์รูปภาพ (JPG, PNG) ขนาดไม่เกิน 5MB</p>
                </div>
              </div>

              <div class="divider"></div>

              <!-- Action Buttons -->
              <div v-if="!showCompleteDialog && !showSlipCorrect" class="action-section">
                <b-button variant="success" class="confirm-btn" @click="confirmPayment()">
                  <feather-icon icon="CheckIcon" class="button-icon" />
                  ยืนยันการชำระเงิน
                </b-button>
              </div>

              <!-- Complete Message -->
              <div v-if="showCompleteDialog" class="complete-section">
                <div class="complete-content">
                  <feather-icon icon="CheckCircleIcon" class="complete-icon" />
                  <h3 class="complete-title">การชำระเงินเสร็จสิ้น</h3>
                  <p class="complete-message">
                    การชำระเงินเสร็จสิ้นแล้ว กรุณารอการตรวจสอบจากทีมงาน
                  </p>
                </div>
              </div>

              <!-- Slip Correct Message -->
              <div v-if="showSlipCorrect" class="slip-correct-section">
                <div class="slip-correct-content">
                  <feather-icon icon="CheckCircleIcon" class="correct-icon" />
                  <h3 class="correct-title">สลิปถูกต้อง</h3>
                  <p class="correct-message">
                    สลิปการโอนเงินถูกต้องแล้ว กรุณารอการตรวจสอบจากทีมงาน
                  </p>
                </div>
              </div>
            </div>
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
import { required } from '@validations'
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
      // user_id: '',
      lineId: '',
      avatarImgUrl: require('@/assets/images/avatars/4.png'),
      displayName: '',
      errorMessage: '',
      showErrorParam: false,
      showCompleteDialog: false,
      showSlipCorrect: false,
      orderData: { id: 0, product_name: '', user_id: '', subscription_img: '' },
      bankData: { bank_name: '', bank_acc_number: '', bank_acc_name: '', bank_ico: '' },
      slip_file_url: '',
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
    // this.getOrderData();
    const { id, user_id } = this.$route.query || {};
    if (!id || !user_id) { this.showErrorParam = true; return; }
    await this.getOrderData();
  },
  methods: {
    ...mapActions(["GetOrderData"]),
    ...mapActions(["PaymentOrderWithSlip"]),
    ...mapActions(["UploadFileAndDeleteOldFile"]),
    ...mapActions(["CustomerDeleteOldFile"]),
    async validationForm() {

    },
    async getOrderData() {
      console.log('getOrderData');

      const formData = new FormData();
      formData.append("userid", "-");
      formData.append("token", "-");
      formData.append("page_name", this.$route.name);
      formData.append("id", this.$route.query.id || "");
      formData.append("user_id", this.$route.query.user_id || "");

      const response = await this.GetOrderData(formData);
      console.log('API Response:', response);
      if (response && response.data && response.data.status == 'success') {
        if (response.data.data && response.data.data.length > 0) {
          this.orderData = response.data.data[0];
          this.bankData = response.data.bank_data || {};
          this.slip_file_url = response.data.slip_file_url || '';
          console.log('Order Data:', this.orderData);
          console.log('Bank Data:', this.bankData);
        } else {
          this.showErrorParam = true;
        }
      }
      else {
        this.showErrorParam = true;
        this.$toast(
          {
            component: ToastificationContent,
            props: {
              title: (response && response.data && response.data.message) || 'ไม่พบข้อมูลคำสั่งซื้อ',
              icon: 'EditIcon',
              variant: 'error',
            },
          });
      }
    },
    async uploadFile(type) {
      console.log('uploadFile', type);

      const fileInput = this.$refs[type];
      if (fileInput && fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];

        // Validate file type (only images)
        if (!file.type.startsWith('image/')) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'กรุณาเลือกไฟล์รูปภาพเท่านั้น',
              icon: 'AlertCircleIcon',
              variant: 'error',
            },
          });
          return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'ขนาดไฟล์ต้องไม่เกิน 5MB',
              icon: 'AlertCircleIcon',
              variant: 'error',
            },
          });
          return;
        }

        await this.submitFile(type, file);
      }
    },
    async submitFile(type, file) {
      console.log('submitFile', type, file);

      try {
        // Generate safe filename
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const safeFilename = `slip_${this.orderData.id}_${Date.now()}.${fileExtension}`;

        const formData = new FormData();
        formData.append("userid", "-");
        formData.append("token", "-");
        formData.append("order_id", this.orderData.id);
        formData.append("user_id", this.orderData.user_id);
        formData.append("tofilename", safeFilename);
        formData.append("file", file);
        formData.append("oldFilePath", this.slip_file_url || "");

        console.log('Uploading file:', {
          originalName: file.name,
          safeFilename: safeFilename,
          fileSize: file.size,
          fileType: file.type
        });

        const response = await this.UploadFileAndDeleteOldFile(formData);

        if (response && response.data && response.data.status === 'success') {
          this.slip_file_url = response.data.url;

          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'อัปโหลดสลิปสำเร็จ',
              icon: 'CheckIcon',
              variant: 'success',
            },
          });
        } else {
          console.error('Upload failed:', response.data);
          this.$toast({
            component: ToastificationContent,
            props: {
              title: (response && response.data && response.data.message) || 'อัปโหลดสลิปล้มเหลว',
              icon: 'AlertCircleIcon',
              variant: 'error',
            },
          });
        }
      } catch (error) {
        console.error('Upload error:', error);
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'เกิดข้อผิดพลาดในการอัปโหลด: ' + (error.message || 'ไม่ทราบสาเหตุ'),
            icon: 'AlertCircleIcon',
            variant: 'error',
          },
        });
      }
    },
    async confirmPayment() {
      console.log('confirmPayment');

      // Check if slip is uploaded
      if (!this.slip_file_url || this.slip_file_url === '') {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'กรุณาอัปโหลดสลิปการโอนเงินก่อน',
            icon: 'AlertCircleIcon',
            variant: 'error',
          },
        });
        return;
      }

      const formData = new FormData();
      formData.append("userid", "-");
      formData.append("token", "-");
      formData.append("order_id", this.orderData.id);
      formData.append("user_id", this.orderData.user_id);
      formData.append("slip_file_url", this.slip_file_url);

      console.log('Sending payment confirmation with:', {
        order_id: this.orderData.id,
        user_id: this.orderData.user_id,
        slip_file_url: this.slip_file_url
      });

      const response = await this.PaymentOrderWithSlip(formData);
      console.log('Payment confirmation response:', response);
      if (response && response.data && response.data.status == 'success') {
        this.showCompleteDialog = true;
        this.$toast(
          {
            component: ToastificationContent,
            props: {
              title: 'ยืนยันการชำระเงินสำเร็จ',
              icon: 'CheckIcon',
              variant: 'success',
            },
          });
      }
      else {
        this.$toast(
          {
            component: ToastificationContent,
            props: {
              title: (response && response.data && response.data.message) || 'ยืนยันการชำระเงินล้มเหลว',
              icon: 'AlertCircleIcon',
              variant: 'error',
            },
          });
      }
    },
    async deleteSlip() {
      console.log('deleteSlip');
      console.log('Current slip_file_url:', this.slip_file_url);

      // Store the current URL for API call
      const currentSlipUrl = this.slip_file_url;

      // Clear the UI immediately for better UX
      this.slip_file_url = '';
      console.log('Slip file URL cleared immediately');

      try {
        const formData = new FormData();
        formData.append("userid", "-");
        formData.append("token", "-");
        formData.append("order_id", this.orderData.id);
        formData.append("user_id", this.orderData.user_id);
        formData.append("oldFilePath", currentSlipUrl);

        console.log('Sending delete request with:', {
          order_id: this.orderData.id,
          user_id: this.orderData.user_id,
          oldFilePath: currentSlipUrl
        });

        const response = await this.CustomerDeleteOldFile(formData);
        console.log('Delete response:', response);

        if (response && response.data && response.data.status === 'success') {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'ลบสลิปสำเร็จ',
              icon: 'CheckIcon',
              variant: 'success',
            },
          });
        } else {
          console.error('Delete failed:', response.data);
          // Restore the URL if delete failed
          this.slip_file_url = currentSlipUrl;

          this.$toast({
            component: ToastificationContent,
            props: {
              title: (response && response.data && response.data.message) || 'ลบสลิปล้มเหลว',
              icon: 'AlertCircleIcon',
              variant: 'error',
            },
          });
        }
      } catch (error) {
        console.error('Delete error:', error);
        // Restore the URL if delete failed
        this.slip_file_url = currentSlipUrl;

        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'เกิดข้อผิดพลาดในการลบสลิป: ' + (error.message || 'ไม่ทราบสาเหตุ'),
            icon: 'AlertCircleIcon',
            variant: 'error',
          },
        });
      }
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';

// Modern Confirm Payment Styling - White, Black, Red Theme
.confirm-payment-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  font-family: 'MiSansMU', sans-serif;
}

.confirm-payment-background {
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
  max-width: 600px;
}

.confirm-payment-card {
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
  .error-section {
    text-align: center;
    padding: 2rem 0;

    .error-content {
      .error-icon {
        width: 64px;
        height: 64px;
        color: #dc3545;
        margin-bottom: 1.5rem;
      }

      .error-title {
        color: #dc3545;
        font-family: 'MiSansMU', sans-serif;
        font-weight: 600;
        font-size: 1.4rem;
        margin-bottom: 1rem;
      }

      .error-message {
        color: #666666;
        font-family: 'MiSansMU', sans-serif;
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.5;
        margin-bottom: 0;
      }
    }
  }

  .main-content {
    .product-info-section {
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
        background: rgba(220, 53, 69, 0.05);
        border-radius: 16px;
        padding: 1.5rem;

        .product-image {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          margin-bottom: 1rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .product-name {
          color: #000000;
          font-family: 'MiSansMU', sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 0;
          text-align: center;
        }
      }
    }

    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, #e9ecef 50%, transparent 100%);
      margin: 1.5rem 0;
    }

    .userid-section {
      margin-bottom: 2rem;

      .userid-title {
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

      .userid-display {
        background: rgba(220, 53, 69, 0.05);
        border-radius: 12px;
        padding: 1rem;

        .userid-text {
          color: #000000;
          font-family: 'MiSansMU', sans-serif;
          font-weight: 500;
          font-size: 1rem;
        }
      }
    }

    .payment-section {
      margin-bottom: 2rem;

      .payment-title {
        color: #000000;
        font-family: 'MiSansMU', sans-serif;
        font-weight: 600;
        font-size: 1.1rem;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;

        .title-icon {
          width: 18px;
          height: 18px;
          margin-right: 0.5rem;
          color: #dc3545;
        }
      }

      .bank-info {
        display: flex;
        align-items: center;
        background: rgba(220, 53, 69, 0.05);
        border-radius: 16px;
        padding: 1.5rem;

        .bank-logo {
          margin-right: 1.5rem;

          .bank-icon {
            width: 80px;
            height: 80px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
        }

        .bank-details {
          flex: 1;

          .bank-name {
            color: #000000;
            font-family: 'MiSansMU', sans-serif;
            font-weight: 600;
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
          }

          .bank-account {
            color: #dc3545;
            font-family: 'MiSansMU', sans-serif;
            font-weight: 500;
            font-size: 1.1rem;
            margin-bottom: 0.25rem;
          }

          .bank-holder {
            color: #666666;
            font-family: 'MiSansMU', sans-serif;
            font-weight: 400;
            font-size: 0.95rem;
            margin-bottom: 0;
          }
        }
      }
    }

    .slip-section {
      margin-bottom: 2rem;

      .slip-title {
        color: #000000;
        font-family: 'MiSansMU', sans-serif;
        font-weight: 600;
        font-size: 1.1rem;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;

        .title-icon {
          width: 18px;
          height: 18px;
          margin-right: 0.5rem;
          color: #dc3545;
        }
      }

      .slip-display {
        text-align: center;

        .slip-image {
          max-width: 100%;
          max-height: 400px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          margin-bottom: 1rem;
        }

        .slip-actions {
          margin-top: 1rem;

          .delete-btn {
            background: linear-gradient(135deg, #dc3545 0%, #c82333 100%) !important;
            border: none !important;
            border-radius: 8px !important;
            padding: 0.5rem 1rem !important;
            font-family: 'MiSansMU', sans-serif;
            font-weight: 500;
            font-size: 0.9rem;
            color: #ffffff !important;
            box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;

            .button-icon {
              width: 14px;
              height: 14px;
              margin-right: 0.5rem;
            }

            &:hover {
              transform: translateY(-1px);
              box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4) !important;
            }
          }
        }
      }

      .slip-upload {
        text-align: center;

        .file-input {
          margin-bottom: 1rem;
          padding: 0.5rem;
          border: 2px dashed #dc3545;
          border-radius: 8px;
          background: rgba(220, 53, 69, 0.05);
        }

        .upload-hint {
          color: #666666;
          font-family: 'MiSansMU', sans-serif;
          font-weight: 400;
          font-size: 0.9rem;
          margin-top: 0.5rem;
          margin-bottom: 0;
          text-align: center;
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

    .complete-section,
    .slip-correct-section {
      text-align: center;
      padding: 2rem 0;

      .complete-content,
      .slip-correct-content {

        .complete-icon,
        .correct-icon {
          width: 64px;
          height: 64px;
          color: #28c76f;
          margin-bottom: 1.5rem;
        }

        .complete-title,
        .correct-title {
          color: #000000;
          font-family: 'MiSansMU', sans-serif;
          font-weight: 600;
          font-size: 1.4rem;
          margin-bottom: 1rem;
        }

        .complete-message,
        .correct-message {
          color: #666666;
          font-family: 'MiSansMU', sans-serif;
          font-weight: 400;
          font-size: 1rem;
          line-height: 1.5;
          margin-bottom: 0;
        }
      }
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .confirm-payment-card {
    margin: 1rem;
    padding: 2rem;
    border-radius: 20px !important;
  }

  .logo-section .brand-text {
    font-size: 1.5rem;
  }

  .content-section .main-content .payment-section .bank-info {
    flex-direction: column;
    text-align: center;

    .bank-logo {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
}

@media (max-width: 480px) {
  .confirm-payment-card {
    margin: 0.5rem;
    padding: 1.5rem;
    border-radius: 16px !important;
  }

  .logo-section .brand-text {
    font-size: 1.3rem;
  }

  .content-section .main-content .product-info-section .section-title {
    font-size: 1.1rem;
  }
}
</style>
