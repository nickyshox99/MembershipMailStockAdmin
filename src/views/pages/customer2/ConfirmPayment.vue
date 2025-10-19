<template>
  <div class="confirm-payment-container">
    <div class="confirm-payment-background">
      <div class="background-overlay"></div>
    </div>

    <div class="auth-wrapper auth-v1">
      <div class="auth-inner">
        <b-card class="confirm-payment-card mb-0">
          <div class="logo-section">
            <img src="@/assets/images/logo/image.png" alt="All Premium" class="logo-image">
            <h2 class="brand-text">
              All Premium
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


              <!-- LINE Profile Info -->
              <div class="userid-section">
                <h4 class="userid-title">
                  <feather-icon icon="UserIcon" class="title-icon" />
                  ข้อมูลผู้ใช้ LINE
                </h4>
                <div class="userid-display">
                  <div class="line-profile">
                    <img v-if="lineProfile.picture_url" :src="lineProfile.picture_url" class="line-avatar"
                      alt="LINE Avatar" />
                    <div v-else class="line-avatar-placeholder">
                      <feather-icon icon="UserIcon" class="placeholder-icon" />
                    </div>
                    <div class="line-info">
                      <span class="line-name">{{ lineProfile.display_name || 'ไม่ระบุชื่อ' }}</span>
                      <span class="line-id">{{ orderData.user_id }}</span>
                    </div>
                  </div>

                </div>
              </div>

              <!-- <div class="divider"></div> -->

              <!-- Payment Info -->
              <div v-if="!showCompleteDialog && !showSlipCorrect && paymentType !== 'stripe'" class="payment-section">
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

              <!-- QR Code Section -->
              <div v-if="!showCompleteDialog && !showSlipCorrect && paymentType !== 'stripe'" class="qr-section">
                <!-- Auto Generated QR Code (PromptPay) -->
                <template v-if="enableAutoGenerateQR && generatedQRCode">
                  <h4 class="qr-title">
                    <feather-icon icon="QrCodeIcon" class="title-icon" />
                    QR Code สำหรับโอนเงิน (PromptPay)
                  </h4>

                  <div class="qr-display">
                    <div class="qr-container" @click="openQRModal">
                      <img :src="generatedQRCode" alt="PromptPay QR Code" class="qr-image" />
                      <div class="qr-overlay">
                        <feather-icon icon="MaximizeIcon" class="qr-icon" />
                        <span class="qr-text">คลิกเพื่อดูขนาดใหญ่</span>
                      </div>
                    </div>
                    <div class="qr-info">
                      <p class="qr-amount">ยอดชำระ: ฿{{ productPrice.toLocaleString('th-TH', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }) }}</p>
                    </div>
                  </div>
                </template>

                <!-- Uploaded QR Code (เดิม) -->
                <template v-else-if="bankData.qr">
                  <h4 class="qr-title">
                    <feather-icon icon="QrCodeIcon" class="title-icon" />
                    QR Code สำหรับโอนเงิน
                  </h4>

                  <div class="qr-display">
                    <div class="qr-container" @click="openQRModal">
                      <img :src="getQRImageUrl(bankData.qr)" alt="QR Code" class="qr-image" />
                      <div class="qr-overlay">
                        <feather-icon icon="MaximizeIcon" class="qr-icon" />
                        <span class="qr-text">คลิกเพื่อดูขนาดใหญ่</span>
                      </div>
                    </div>
                  </div>
                </template>
              </div>

              <!-- <div class="divider"></div> -->

              <!-- Slip Upload -->
              <div v-if="!showCompleteDialog && !showSlipCorrect && paymentType !== 'stripe'" class="slip-section">
                <h4 class="slip-title">
                  <feather-icon icon="UploadIcon" class="title-icon" />
                  อัปโหลดสลิปการโอนเงิน
                </h4>

                <div v-if="slip_file_url != ''" class="slip-display">
                  <img :src="getSlipImageUrl(slip_file_url)" class="slip-image" alt="Slip Image" />
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
                <b-button 
                  variant="success" 
                  class="confirm-btn" 
                  @click="confirmPayment()"
                  :disabled="isProcessingPayment"
                >
                  <b-spinner v-if="isProcessingPayment" small class="button-spinner" />
                  <feather-icon v-else icon="CheckIcon" class="button-icon" />
                  {{ isProcessingPayment ? 'กำลังตรวจสอบการชำระเงิน...' : 'ยืนยันการชำระเงิน' }}
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

    <!-- QR Code Modal -->
    <b-modal :visible="showQRModal"
      :title="enableAutoGenerateQR && generatedQRCode ? 'QR Code สำหรับโอนเงิน (PromptPay)' : 'QR Code สำหรับโอนเงิน'"
      hide-footer @hidden="closeQRModal" size="sm" centered>
      <div class="qr-modal-content">
        <img :src="enableAutoGenerateQR && generatedQRCode ? generatedQRCode : getQRImageUrl(bankData.qr)" alt="QR Code"
          class="qr-modal-image" />
        <p class="qr-modal-text">สแกน QR Code เพื่อโอนเงิน</p>
        <p v-if="enableAutoGenerateQR && generatedQRCode" class="qr-modal-amount">
          ยอดชำระ: ฿{{ productPrice.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
        </p>
      </div>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable global-require */

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton, BCard, BAvatar, BSpinner
} from 'bootstrap-vue'

import { required, user_id } from '@validations'

import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { mapActions, mapGetters } from "vuex";

import useJwt from '@/auth/jwt/useJwt'

import { AbilityBuilder } from '@casl/ability';
import { useUtils as useI18nUtils } from '@core/libs/i18n'

import generatePayload from 'promptpay-qr'
import QRCode from 'qrcode'
import axios from 'axios'
import { integer } from '@/@core/utils/validations/validations'

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
    BSpinner,
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
      user_id: '',
      lineId: '',
      avatarImgUrl: require('@/assets/images/avatars/4.png'),
      displayName: '',
      errorMessage: '',
      showErrorParam: false,
      showCompleteDialog: false,
      showSlipCorrect: false,
      orderData: { id: 0, product_name: '', user_id: '', subscription_img: '' },
      bankData: { bank_name: '', bank_acc_number: '', bank_acc_name: '', bank_ico: '', qr: '' },
      slip_file_url: '',
      lineProfile: { display_name: '', picture_url: '' },
      showQRModal: false,
      enableAutoGenerateQR: false,
      generatedQRCode: '',
      productPrice: 0,
      purchaseType: '',
      email: '',
      paymentType: '',
      isProcessingPayment: false,
      paymentPollingInterval: null,
      paymentPollingTimeout: null,
      pollingStartTime: null,
    }
  },
  computed: {
    ...mapGetters('userRegistration', ['getEmail', 'getPassword', 'hasRegistrationData']),

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
    const { id, user_id, purchase_type, email } = this.$route.query || {};
    if (!id || !user_id) { this.showErrorParam = true; return; }

    // เก็บ purchase_type และ email ไว้ใช้
    this.purchaseType = purchase_type || '';
    this.email = email || '';
    console.log('ConfirmPayment - purchase_type:', this.purchaseType);
    console.log('ConfirmPayment - email:', this.email);

    await this.loadSetting();
    await this.loadPaymentType();
    await this.getOrderData();
  },
  methods: {
    ...mapActions(["GetOrderData"]),
    ...mapActions(["PaymentOrderWithSlip"]),
    ...mapActions(["CheckOutStripe"]),
    ...mapActions(["UploadFileAndDeleteOldFile"]),
    ...mapActions(["CustomerDeleteOldFile"]),
    ...mapActions(["GetActiveProductSetting"]),
    ...mapActions(["GetBankInfo"]),
    ...mapActions(["InsertUserEmail"]),
    ...mapActions(["InsertPersonalEmail"]),
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

          // ถ้าเปิดใช้ Auto Generate QR ให้ดึงธนาคาร status=1 อันแรก
          // ถ้าไม่เปิดใช้ ให้ใช้ bank_data ที่ API ส่งมา (สำหรับ QR ที่ upload)
          if (this.enableAutoGenerateQR) {
            console.log('Using active bank (status=1) for Auto Generate QR');
            const activeBank = await this.getActiveBankAccount();
            this.bankData = activeBank || response.data.bank_data || {};
          } else {
            console.log('Using bank_data from API (for uploaded QR)');
            this.bankData = response.data.bank_data || {};
          }

          this.slip_file_url = response.data.slip_file_url || '';

          console.log('=== Slip File URL from API ===');
          console.log('slip_file_url:', this.slip_file_url);

          // Log ข้อมูลทั้งหมดเพื่อ debug
          console.log('=== FULL ORDER DATA ===');
          console.log('Order Data (all fields):', JSON.stringify(this.orderData, null, 2));
          console.log('Order Data Keys:', Object.keys(this.orderData));

          // ตรวจสอบ field ราคาแต่ละตัว
          console.log('Price field checks:');
          console.log('  - product_price:', this.orderData.product_price);
          console.log('  - price:', this.orderData.price);
          console.log('  - use_credit:', this.orderData.use_credit);
          console.log('  - amount:', this.orderData.amount);
          console.log('  - total_price:', this.orderData.total_price);

          // Try multiple fields for price
          let priceValue = this.orderData.product_price ||
            this.orderData.price ||
            this.orderData.use_credit ||
            this.orderData.amount ||
            this.orderData.total_price ||
            0;

          // ถ้าไม่มีราคาใน orderData ให้ดึงจาก product_id
          if (!priceValue && this.orderData.product_id) {
            console.log('No price in orderData, fetching from product...');
            priceValue = await this.getProductPrice(this.orderData.product_id);
          }

          this.productPrice = parseFloat(priceValue) || 0;

          // Extract LINE profile data from order data
          this.lineProfile = {
            display_name: this.orderData.line_display_name || '',
            picture_url: this.orderData.line_profile_url || ''
          };

          console.log('Order Data:', this.orderData);
          console.log('Bank Data:', this.bankData);
          console.log('LINE Profile:', this.lineProfile);
          console.log('LINE Display Name:', this.orderData.line_display_name);
          console.log('LINE Picture URL:', this.orderData.line_profile_url);
          console.log('Product Price (from use_credit/price/etc):', this.productPrice);
          console.log('Enable Auto Generate QR:', this.enableAutoGenerateQR);

          // เช็คว่าชำระเงินสำเร็จแล้วหรือยัง
          if (this.orderData.payment_status === 'success') {
            console.log('Payment already completed on page load');
            this.showSlipCorrect = true;
          }

          // Generate PromptPay QR if enabled
          if (this.enableAutoGenerateQR && this.productPrice > 0) {
            console.log('Generating PromptPay QR with price:', this.productPrice);
            await this.generatePromptPayQR();
          } else {
            console.log('QR generation skipped - enableAutoGenerateQR:', this.enableAutoGenerateQR, 'productPrice:', this.productPrice);
          }
        } else {
          this.showErrorParam = true;
        }
      }
      else {
        this.showErrorParam = true;
        const errorMessage = (response && response.data && response.data.message) ||
          (response && response.message) ||
          'ไม่พบข้อมูลคำสั่งซื้อ';

        this.$toast(
          {
            component: ToastificationContent,
            props: {
              title: errorMessage,
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


        // Check if file exists and is valid
        if (!file || !file.name) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'ไฟล์ไม่ถูกต้อง กรุณาเลือกไฟล์ใหม่',
              icon: 'AlertCircleIcon',
              variant: 'error',
            },
          });
          return;
        }


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

      // Validate file before processing
      if (!file || !file.name || !file.size) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'ไฟล์ไม่ถูกต้อง กรุณาเลือกไฟล์ใหม่',
            icon: 'AlertCircleIcon',
            variant: 'error',
          },
        });
        return;
      }


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

        console.log('Upload response:', response);


        if (response && response.data && response.data.status === 'success') {
          this.slip_file_url = response.data.url;

          console.log('=== Upload Success ===');
          console.log('slip_file_url set to:', this.slip_file_url);
          console.log('response.data:', response.data);

          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'อัปโหลดสลิปสำเร็จ',
              icon: 'CheckIcon',
              variant: 'success',
            },
          });
        } else {
          console.error('Upload failed:', response);
          const errorMessage = (response && response.data && response.data.message) ||
            (response && response.message) ||
            'อัปโหลดสลิปล้มเหลว';

          this.$toast({
            component: ToastificationContent,
            props: {
              title: errorMessage,
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
      console.log('paymentType:', this.paymentType);


      if (this.paymentType === 'stripe') {
        // เริ่ม loading
        this.isProcessingPayment = true;

        const formData = new FormData();
        formData.append("userid", "-");
        formData.append("token", "-");
        formData.append("order_id", this.orderData.id);
        formData.append("user_id", this.orderData.user_id);
        formData.append("slip_file_url", this.slip_file_url);
        formData.append("amount", (parseInt(this.productPrice) * 100));
        formData.append("currency", "thb");
        formData.append("username", this.orderData.user_id);
        formData.append("user_id", this.orderData.user_id);
        formData.append("server_id", this.orderData.id);
        formData.append("order_id", this.orderData.id);
        formData.append("description", this.orderData.product_name);
        formData.append("imageurl", "http://localhost:9900/img/image.10008f5a.png");
        formData.append("email", this.email);
        formData.append("purchase_type", this.purchaseType);


        const response = await this.CheckOutStripe(formData);
        console.log('CheckOutStripe response:', response);
        
        // เช็คว่าชำระเงินไปแล้วหรือยัง
        if (response && response.data && response.data.status === 'already_paid') {
          this.isProcessingPayment = false;
          this.showSlipCorrect = true;
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'ท่านได้ชำระเงินไปแล้ว',
              icon: 'CheckCircleIcon',
              variant: 'success',
            },
          });
          return;
        }
        
        //เอา URL จาก response.data.data.url มาแล้ว redirect ไปหน้าใหม่ จาก URL ที่ส่งมา
        const stripeUrl = response.data.data.url;
        if (response && response.data && response.data.status == 'success') {
          window.open(stripeUrl, '_blank');
          
          // เริ่ม polling เช็ค payment status
          this.startPaymentPolling();
          
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'กรุณาทำการชำระเงินในหน้าต่างใหม่ ระบบกำลังตรวจสอบการชำระเงิน...',
              icon: 'InfoIcon',
              variant: 'info',
            },
          });
        }
        else {
          this.isProcessingPayment = false;
          const errorMessage = (response && response.data && response.data.message) ||
            (response && response.message) ||
            'ยืนยันการชำระเงินล้มเหลว';
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: errorMessage,
                icon: 'AlertCircleIcon',
                variant: 'error',
              },
            });
        }
      }
      else {
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

        // เช็คว่าชำระเงินไปแล้วหรือยัง
        if (response && response.data && response.data.status === 'already_paid') {
          this.showSlipCorrect = true;
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'ท่านได้ชำระเงินไปแล้ว',
              icon: 'CheckCircleIcon',
              variant: 'success',
            },
          });
          return;
        }

        if (response && response.data && response.data.status == 'success') {
          // Insert user email data after payment confirmation success
          await this.insertUserEmailData();
          // await this.insertPersonalEmailData();
          // if (this.purchaseType === 'personal') {
          //   await this.InsertPersonalEmail(data);
          // } else if (this.purchaseType === 'email') {
          //   await this.InsertPersonalEmail(data);
          // }

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
          const errorMessage = (response && response.data && response.data.message) ||
            (response && response.message) ||
            'ยืนยันการชำระเงินล้มเหลว';

          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: errorMessage,
                icon: 'AlertCircleIcon',
                variant: 'error',
              },
            });
        }
      }


    },
    async deleteSlip() {
      console.log('deleteSlip');
      console.log('Current slip_file_url:', this.slip_file_url);


      // Check if there's a file to delete
      if (!this.slip_file_url || this.slip_file_url === '') {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'ไม่มีไฟล์ให้ลบ',
            icon: 'AlertCircleIcon',
            variant: 'warning',
          },
        });
        return;
      }


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
          console.error('Delete failed:', response);
          // Restore the URL if delete failed
          this.slip_file_url = currentSlipUrl;


          const errorMessage = (response && response.data && response.data.message) ||
            (response && response.message) ||
            'ลบสลิปล้มเหลว';


          this.$toast({
            component: ToastificationContent,
            props: {
              title: errorMessage,
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
    },
    openQRModal() {
      this.showQRModal = true;
    },
    closeQRModal() {
      this.showQRModal = false;
    },
    getQRImageUrl(qrPath) {
      if (!qrPath) return '';
      // If it's already a full URL, return as is
      if (qrPath.startsWith('http')) return qrPath;
      // Get API URL from vue config
      const vueconfig = require('../../../../config/vue.config');
      const apiUrl = vueconfig.BASE_API_URL;
      return `${apiUrl}getfile/${qrPath}`;
    },
    getSlipImageUrl(slipPath) {
      console.log('=== getSlipImageUrl ===');
      console.log('Input slipPath:', slipPath);

      if (!slipPath) return '';

      // If it's already a full URL, return as is
      if (slipPath.startsWith('http')) {
        console.log('Already full URL:', slipPath);
        return slipPath;
      }

      // Get API URL from vue config
      const vueconfig = require('../../../../config/vue.config');
      const apiUrl = vueconfig.BASE_API_URL;
      const fullUrl = `${apiUrl}getfile/${slipPath}`;

      console.log('BASE_API_URL:', apiUrl);
      console.log('Full URL:', fullUrl);

      return fullUrl;
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
          this.enableAutoGenerateQR = !!val.enableAutoGenerateQR

        }
      } catch (e) {
        console.error('Error loading setting:', e)
        this.enableAutoGenerateQR = false
      }
    },

    async loadPaymentType() {
      try {
        console.log('=== LOADING PAYMENT TYPE ===');
        
        // ลองดึงจาก localStorage ก่อน
        const localPaymentType = localStorage.getItem('selectedPaymentType');
        console.log('Payment type from localStorage:', localPaymentType);
        
        if (localPaymentType) {
          this.paymentType = localPaymentType;
          console.log('Using payment type from localStorage:', this.paymentType);
          return;
        }

        // ถ้าไม่มีใน localStorage ให้ดึงจาก API
        const userData = JSON.parse(localStorage.getItem('userData')) || {}
        const response = await axios.get('/api/paymenttype', {
          headers: {
            'Content-Type': 'application/json',
            'userid': userData.username || '-',
            'token': userData.token || '-',
          }
        });

        console.log('Payment type API response:', response.data);

        if (response.data.status === 'success' && response.data.data && response.data.data.length > 0) {
          // หา payment type ที่มี ID = 1 (ตามที่เราตั้งค่าไว้)
          const activePaymentType = response.data.data.find(pt => pt.id === 1);
          
          if (activePaymentType) {
            this.paymentType = activePaymentType.type_code;
            console.log('Using payment type from API:', this.paymentType);
            
            // บันทึกลง localStorage เพื่อใช้ครั้งต่อไป
            localStorage.setItem('selectedPaymentType', this.paymentType);
          } else {
            console.log('No active payment type found, defaulting to qr');
            this.paymentType = 'qr';
          }
        } else {
          console.log('API response failed, defaulting to qr');
          this.paymentType = 'qr';
        }
      } catch (error) {
        console.error('Error loading payment type:', error);
        console.log('Error occurred, defaulting to qr');
        this.paymentType = 'qr';
      }
    },
    async getProductPrice(productId) {
      try {
        console.log('getProductPrice for product_id:', productId);

        const formData = new FormData();
        formData.append("userid", "");
        formData.append("token", "");
        formData.append("page_name", "");

        const response = await this.GetActiveProductSetting(formData);

        if (response && response.data && response.data.status === 'success') {
          const productList = response.data.data || [];
          console.log('Product list:', productList);

          const product = productList.find(p => p.id === productId);

          if (product) {
            const price = parseFloat(product.use_credit || product.price || 0);
            console.log('Found product price:', price, 'from product:', product);
            return price;
          } else {
            console.warn('Product not found with id:', productId);
            return 0;
          }
        } else {
          console.error('Failed to get product list:', response);
          return 0;
        }
      } catch (error) {
        console.error('Error getting product price:', error);
        return 0;
      }
    },
    async getActiveBankAccount() {
      try {
        console.log('getActiveBankAccount - fetching bank with status = 1');

        const formData = new FormData();
        formData.append("userid", "-");
        formData.append("token", "-");
        formData.append("searchWord", "");

        const response = await this.GetBankInfo(formData);

        if (response && response.data && response.data.status === 'success') {
          const bankList = response.data.data || [];
          console.log('Bank list:', bankList);

          // หาธนาคารที่ status = 1 อันแรก
          const activeBank = bankList.find(bank => bank.status === 1 || bank.status === '1');

          if (activeBank) {
            console.log('Found active bank:', activeBank);
            console.log('PromptPay Number:', activeBank.promptpay_number);
            return {
              bank_name: activeBank.bank_name,
              bank_acc_number: activeBank.bank_acc_number,
              bank_acc_name: activeBank.bank_acc_name,
              bank_ico: activeBank.bank_ico,
              qr: activeBank.qr || '',
              promptpay_number: activeBank.promptpay_number || ''
            };
          } else {
            console.warn('No active bank found (status = 1)');
            return null;
          }
        } else {
          console.error('Failed to get bank list:', response);
          return null;
        }
      } catch (error) {
        console.error('Error getting active bank:', error);
        return null;
      }
    },
    async generatePromptPayQR() {
      try {
        console.log('=== Starting generatePromptPayQR ===');
        console.log('bankData:', this.bankData);
        console.log('productPrice:', this.productPrice);

        // ใช้เบอร์โทรพร้อมเพย์แทนเลขบัญชี
        let promptpayNumber = this.bankData.promptpay_number || ''
        console.log('PromptPay Number from bankData:', promptpayNumber);

        // ถ้าไม่มี PromptPay Number ให้แจ้งเตือน
        if (!promptpayNumber || !this.productPrice) {
          console.error('Missing PromptPay number or price:', {
            promptpayNumber,
            productPrice: this.productPrice
          });

          this.$toast({
            component: ToastificationContent,
            props: {
              title: `ไม่สามารถสร้าง QR Code ได้: ${!promptpayNumber ? 'กรุณาตั้งค่าเบอร์พร้อมเพย์ในหน้า Bank Admin' : 'ไม่มีราคา'}`,
              icon: 'AlertCircleIcon',
              variant: 'warning',
            },
          })
          return
        }

        // ตรวจสอบว่าเป็นเบอร์โทรศัพท์ 10 หลัก
        if (!/^0\d{9}$/.test(promptpayNumber)) {
          console.error('Invalid PromptPay number format:', promptpayNumber);
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'เบอร์พร้อมเพย์ไม่ถูกต้อง ต้องเป็น 10 หลัก เช่น 0812345678',
              icon: 'AlertCircleIcon',
              variant: 'error',
            },
          })
          return
        }

        console.log('Generating PromptPay QR with:', {
          promptpayNumber,
          amount: this.productPrice
        });

        // Generate PromptPay payload
        const payload = generatePayload(promptpayNumber, { amount: this.productPrice })
        console.log('PromptPay payload generated:', payload);

        // Generate QR code as data URL
        this.generatedQRCode = await QRCode.toDataURL(payload)
        console.log('QR Code data URL generated, length:', this.generatedQRCode.length);

        console.log('Generated PromptPay QR Code successfully');
      } catch (error) {
        console.error(' Error generating PromptPay QR:', error)
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'ไม่สามารถสร้าง QR Code ได้: ' + error.message,
            icon: 'AlertCircleIcon',
            variant: 'error',
          },
        })
      }
    },
    async insertUserEmailData() {
      try {

        // เช็คว่ามี email หรือไม่
        if (!this.email) {
          console.log('No email provided, skipping insert');
          return;
        }

        const { id, user_id } = this.$route.query || {};

        console.log('Registration data:', { email: this.email, user_id, order_id: id, purchase_type: this.purchaseType });

        // Validate data
        if (!user_id || !id || !this.email) {
          console.log('Missing required data for insert:', { user_id, order_id: id, email: !!this.email });
          return;
        }

        // เช็ค purchase_type และเลือก API ที่เหมาะสม
        if (this.purchaseType === 'personal') {
          // สำหรับ personal: insert ลง users_email (ใช้ password จาก store)
          console.log('Inserting to users_email table (personal)');

          // ดึง password จาก store
          const password = this.getPassword;

          if (!password) {
            console.error('Password not found in store');
            return;
          }

          const data = {
            user_id: user_id,
            order_id: parseInt(id),
            email: this.email,
            password: password,
            status_regis: 0,
          };

          console.log('Calling API with data:', { ...data, password: '***' }); // ซ่อน password ใน log

          const response = await this.InsertUserEmail(data);

          console.log('Insert response:', response);

          if (response && response.data && response.data.status === 'success') {
            console.log(' Users email (personal) inserted successfully');
            // ไม่แสดง toast เพราะจะซ้ำกับ toast ของการยืนยันชำระเงิน
          } else {
            const errorMessage = (response && response.data && response.data.message) || 'เกิดข้อผิดพลาด';
            console.error('Insert users email failed:', errorMessage);
            // Silent error - ไม่แสดง error toast เพราะไม่ต้องการให้รบกวน flow หลัก
          }

        } else if (this.purchaseType === 'email') {
          // สำหรับ email: insert ลง personal_email (ไม่ใช้ password)
          console.log('Inserting to personal_email table');

          const data = {
            user_id: user_id,
            order_id: parseInt(id),
            email: this.email,
            status_regis: 0,
          };

          console.log('Calling API with data:', data);

          const response = await this.InsertPersonalEmail(data);

          // const response = await axios.post("api/personalemail/createPersonalEmail", data, {
          //   headers: {
          //     'Content-Type': 'application/json'
          //   }
          // }).catch(error => {
          //   console.error('API Error:', error);
          //   console.error('Error response:', error.response);
          //   throw error;
          // });

          console.log('Insert response:', response);

          if (response && response.data && response.data.status === 'success') {
            console.log(' Personal email inserted successfully');
            // ไม่แสดง toast เพราะจะซ้ำกับ toast ของการยืนยันชำระเงิน
          } else {
            const errorMessage = (response && response.data && response.data.message) || 'เกิดข้อผิดพลาด';
            console.error('Insert personal email failed:', errorMessage);
            // Silent error - ไม่แสดง error toast เพราะไม่ต้องการให้รบกวน flow หลัก
          }

        } else {
          console.log('Unknown purchase_type, skipping insert:', this.purchaseType);
        }

      } catch (error) {
        console.error('Error in insertUserEmailData:', error);
        // Silent error - ไม่แสดง error toast เพื่อไม่ให้รบกวน flow การชำระเงิน
      }
    },
    startPaymentPolling() {
      console.log('Starting payment polling...');
      
      // Clear existing interval if any
      if (this.paymentPollingInterval) {
        clearInterval(this.paymentPollingInterval);
      }
      
      if (this.paymentPollingTimeout) {
        clearTimeout(this.paymentPollingTimeout);
      }
      
      // บันทึกเวลาเริ่มต้น
      this.pollingStartTime = Date.now();
      
      // Poll every 3 seconds
      this.paymentPollingInterval = setInterval(async () => {
        await this.checkPaymentStatus();
      }, 3000);
      
      // ตั้ง timeout 10 นาที (600,000 ms)
      this.paymentPollingTimeout = setTimeout(() => {
        console.log('Payment polling timeout after 10 minutes');
        this.stopPaymentPolling();
        this.isProcessingPayment = false;
        
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'หมดเวลาตรวจสอบการชำระเงิน กรุณารีเฟรชหน้าเพื่อดูสถานะล่าสุด',
            icon: 'ClockIcon',
            variant: 'warning',
          },
        });
      }, 600000); // 10 minutes
    },
    async checkPaymentStatus() {
      try {
        console.log('Checking payment status...');
        
        const formData = new FormData();
        formData.append("userid", "-");
        formData.append("token", "-");
        formData.append("page_name", this.$route.name);
        formData.append("id", this.$route.query.id || "");
        formData.append("user_id", this.$route.query.user_id || "");

        const response = await this.GetOrderData(formData);
        
        if (response && response.data && response.data.status === 'success' && response.data.data && response.data.data.length > 0) {
          const orderData = response.data.data[0];
          
          console.log('Payment status check:', {
            slip_correct: orderData.slip_correct,
            wait_check_payment: orderData.wait_check_payment
          });
          
          // เช็คว่าชำระเงินสำเร็จหรือยัง
          if (orderData.payment_status === 'success') {
            console.log('Payment successful!');
            
            // หยุด polling
            this.stopPaymentPolling();
            
            // อัพเดท order data
            this.orderData = orderData;
            this.showSlipCorrect = true;
            this.isProcessingPayment = false;
            
            // Insert email data
            await this.insertUserEmailData();
            
            // แสดง success message
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'ชำระเงินสำเร็จ! กรุณารอการดำเนินการจากทีมงาน',
                icon: 'CheckCircleIcon',
                variant: 'success',
              },
            });
          }
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    },
    stopPaymentPolling() {
      console.log('Stopping payment polling...');
      if (this.paymentPollingInterval) {
        clearInterval(this.paymentPollingInterval);
        this.paymentPollingInterval = null;
      }
      if (this.paymentPollingTimeout) {
        clearTimeout(this.paymentPollingTimeout);
        this.paymentPollingTimeout = null;
      }
    }
  },
  beforeDestroy() {
    // Cleanup polling when component is destroyed
    this.stopPaymentPolling();
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';

// Modern Confirm Payment Styling - YouTube Theme
.confirm-payment-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #ffffff;
  font-family: 'MiSansMU', sans-serif;
}

.confirm-payment-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  opacity: 0.05;
  z-index: 1;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: radial-gradient(circle at 30% 20%, rgba(255, 0, 0, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(0, 0, 0, 0.05) 0%, transparent 50%);

  z-index: 2;
}

.auth-wrapper {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 600px;
}

.confirm-payment-card {
  background: #ffffff !important;
  border: 2px solid #ff0000 !important;
  border-radius: 24px !important;
  box-shadow: 0 20px 40px rgba(255, 0, 0, 0.15) !important;
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
    width: 160px;
    height: 160px;
    border-radius: 50%;
    box-shadow: 0 8px 25px rgba(255, 0, 0, 0.3);
    border: 3px solid #ff0000;
    transition: all 0.3s ease;
    object-fit: cover;
    background: #ffffff;
    padding: 8px;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 12px 35px rgba(255, 0, 0, 0.4);
      border-color: #cc0000;
    }
  }


  .brand-text {
    color: #ff0000 !important;
    font-family: 'MiSansMU', sans-serif;
    font-weight: 700;
    font-size: 1.8rem;
    margin-top: 1rem;
    margin-bottom: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
        color: #ff0000;
        margin-bottom: 1.5rem;
      }

      .error-title {
        color: #ff0000;
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
        background: linear-gradient(135deg, rgba(255, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%);
        border: 2px solid rgba(255, 0, 0, 0.2);
        border-radius: 20px;
        padding: 1.5rem;

        box-shadow: 0 8px 25px rgba(255, 0, 0, 0.15);
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(255, 0, 0, 0.25);
          border-color: rgba(255, 0, 0, 0.3);
        }


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
      background: linear-gradient(90deg, transparent 0%, rgba(255, 0, 0, 0.3) 50%, transparent 100%);
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
          color: #ff0000;
        }
      }


      .userid-display {
        background: linear-gradient(135deg, rgba(255, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%);
        border: 2px solid rgba(255, 0, 0, 0.2);
        border-radius: 16px;
        padding: 1rem;
        box-shadow: 0 4px 15px rgba(255, 0, 0, 0.1);
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(255, 0, 0, 0.15);
          border-color: rgba(255, 0, 0, 0.3);
        }

        .line-profile {
          display: flex;
          align-items: center;
          gap: 1rem;

          .line-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: transform 0.3s ease;

            &:hover {
              transform: scale(1.05);
            }
          }

          .line-avatar-placeholder {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(255, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;

            .placeholder-icon {
              width: 24px;
              height: 24px;
              color: #ff0000;
            }

            &:hover {
              transform: scale(1.05);
            }
          }

          .line-info {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;

            .line-name {
              color: #000000;
              font-family: 'MiSansMU', sans-serif;
              font-weight: 600;
              font-size: 1.1rem;
              line-height: 1.3;
            }

            .line-id {
              color: #666666;
              font-family: 'MiSansMU', sans-serif;
              font-weight: 400;
              font-size: 0.9rem;
              line-height: 1.2;
              word-break: break-all;
              word-wrap: break-word;
              max-width: 200px;
            }
          }

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
          color: #ff0000;
        }
      }

      .bank-info {
        display: flex;
        align-items: center;
        background: linear-gradient(135deg, rgba(255, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%);
        border: 2px solid rgba(255, 0, 0, 0.2);
        border-radius: 20px;
        padding: 1.5rem;

        box-shadow: 0 8px 25px rgba(255, 0, 0, 0.15);
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(255, 0, 0, 0.25);
          border-color: rgba(255, 0, 0, 0.3);
        }


        .bank-logo {
          margin-right: 1.5rem;

          .bank-icon {
            width: 80px;
            height: 80px;
            border-radius: 16px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
            transition: transform 0.3s ease;

            &:hover {
              transform: scale(1.05);
            }
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
            color: #ff0000;
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

    .qr-section {
      margin-bottom: 2rem;

      .qr-title {
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
          color: #ff0000;
        }
      }

      .qr-display {
        text-align: center;

        .qr-container {
          display: inline-block;
          position: relative;
          cursor: pointer;
          transition: transform 0.3s ease;

          &:hover {
            transform: scale(1.05);
          }

          .qr-image {
            width: 150px;
            height: 150px;
            border-radius: 16px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            border: 3px solid rgba(255, 0, 0, 0.2);
            transition: all 0.3s ease;

            &:hover {
              box-shadow: 0 12px 35px rgba(255, 0, 0, 0.3);
              border-color: rgba(255, 0, 0, 0.4);
            }
          }

          .qr-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 0, 0, 0.8);
            border-radius: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;

            .qr-icon {
              width: 24px;
              height: 24px;
              color: #ffffff;
              margin-bottom: 0.5rem;
            }

            .qr-text {
              color: #ffffff;
              font-family: 'MiSansMU', sans-serif;
              font-weight: 500;
              font-size: 0.9rem;
              text-align: center;
            }

            &:hover {
              opacity: 1;
            }
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
          color: #ff0000;
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
            background: #ff0000 !important;
            border: none !important;
            border-radius: 12px !important;
            padding: 0.5rem 1rem !important;
            font-family: 'MiSansMU', sans-serif;
            font-weight: 500;
            font-size: 0.9rem;
            color: #ffffff !important;
            box-shadow: 0 4px 15px rgba(255, 0, 0, 0.4);
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;

            .button-icon {
              width: 14px;
              height: 14px;
              margin-right: 0.5rem;
            }

            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(255, 0, 0, 0.5) !important;
              background: #cc0000 !important;
            }
          }
        }
      }

      .slip-upload {
        text-align: center;

        .file-input {
          margin-bottom: 1rem;
          padding: 0.5rem;
          border: 2px dashed #ff0000;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(255, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%);
          transition: all 0.3s ease;

          &:hover {
            border-color: #cc0000;
            background: linear-gradient(135deg, rgba(255, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.1) 100%);
          }
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
        background: #ff0000 !important;
        border: none !important;
        border-radius: 12px !important;
        padding: 0.875rem 2rem !important;
        font-family: 'MiSansMU', sans-serif;
        font-weight: 600;
        font-size: 1rem;
        color: #ffffff !important;
        box-shadow: 0 4px 15px rgba(255, 0, 0, 0.4);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        margin: 0 auto;
        justify-content: center;

        .button-icon, .button-spinner {
          width: 18px;
          height: 18px;
          margin-right: 0.5rem;
        }

        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 0, 0, 0.5) !important;
          background: #cc0000 !important;
        }

        &:disabled {
          opacity: 0.7;
          cursor: not-allowed;
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
          color: #ff0000;
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

// QR Modal Styling
.qr-modal-content {
  text-align: center;
  padding: 1.5rem;

  .qr-modal-image {
    width: 280px;
    height: 280px;
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
    border: 3px solid rgba(255, 0, 0, 0.25);
    margin-bottom: 1.2rem;
    background: #ffffff;
    padding: 12px;
  }

  .qr-modal-text {
    color: #ff0000;
    font-family: 'MiSansMU', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .qr-modal-amount {
    color: #000000;
    font-family: 'MiSansMU', sans-serif;
    font-weight: 600;
    font-size: 1.2rem;
    margin-top: 0.5rem;
    margin-bottom: 0;
  }
}

// QR Info Styling
.qr-info {
  text-align: center;
  margin-top: 1rem;

  .qr-amount {
    color: #000000;
    font-family: 'MiSansMU', sans-serif;
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0;
    padding: 0.75rem;
    background: linear-gradient(135deg, rgba(255, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.1) 100%);
    border-radius: 12px;
    border: 2px solid rgba(255, 0, 0, 0.2);
  }
}

// Responsive Design
@media (max-width: 768px) {
  .auth-wrapper {
    max-width: 100%;
    padding: 0 1rem;
  }

  .confirm-payment-card {
    padding: 2rem 1.5rem;
    border-radius: 20px !important;
  }

  .logo-section {
    margin-bottom: 1.5rem;

    .logo-image {
      width: 140px;
      height: 140px;
    }

    .brand-text {
      font-size: 1.5rem;
      margin-top: 0.75rem;
    }
  }

  .content-section {
    .error-section {
      padding: 1.5rem 0;

      .error-content {
        .error-icon {
          width: 56px;
          height: 56px;
        }

        .error-title {
          font-size: 1.3rem;
        }

        .error-message {
          font-size: 0.95rem;
        }
      }
    }

    .main-content {
      .product-info-section {
        margin-bottom: 1.5rem;

        .section-title {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }

        .product-display {
          padding: 1.25rem;

          .product-image {
            width: 70px;
            height: 70px;
          }

          .product-name {
            font-size: 1rem;
          }
        }
      }

      .divider {
        margin: 1.25rem 0;
      }

      .userid-section,
      .payment-section,
      .qr-section,
      .slip-section {
        margin-bottom: 1.5rem;

        .userid-title,
        .payment-title,
        .qr-title,
        .slip-title {
          font-size: 1rem;
          margin-bottom: 1rem;
        }
      }

      .userid-section .userid-display {
        padding: 0.875rem;

        .line-profile {
          gap: 0.75rem;

          .line-avatar,
          .line-avatar-placeholder {
            width: 45px;
            height: 45px;

            .placeholder-icon {
              width: 22px;
              height: 22px;
            }
          }

          .line-info {
            .line-name {
              font-size: 1rem;
            }

            .line-id {
              font-size: 0.85rem;
              max-width: 180px;
            }
          }
        }
      }

      .payment-section .bank-info {
        flex-direction: column;
        text-align: center;
        padding: 1.25rem;

        .bank-logo {
          margin-right: 0;
          margin-bottom: 1rem;

          .bank-icon {
            width: 70px;
            height: 70px;
          }
        }

        .bank-details {
          .bank-name {
            font-size: 1.1rem;
          }

          .bank-account {
            font-size: 1rem;
          }

          .bank-holder {
            font-size: 0.9rem;
          }
        }
      }

      .qr-section .qr-display {
        .qr-container .qr-image {
          width: 130px;
          height: 130px;
        }

        .qr-info .qr-amount {
          font-size: 1rem;
          padding: 0.625rem;
        }
      }

      .slip-section {
        .slip-display {
          .slip-image {
            max-height: 350px;
          }

          .slip-actions .delete-btn {
            padding: 0.375rem 0.875rem !important;
            font-size: 0.85rem;

            .button-icon {
              width: 12px;
              height: 12px;
            }
          }
        }

        .slip-upload {
          .upload-hint {
            font-size: 0.85rem;
          }
        }
      }

      .action-section .confirm-btn {
        padding: 0.75rem 1.75rem !important;
        font-size: 0.95rem;
      }

      .complete-section,
      .slip-correct-section {
        padding: 1.5rem 0;

        .complete-content,
        .slip-correct-content {

          .complete-icon,
          .correct-icon {
            width: 56px;
            height: 56px;
          }

          .complete-title,
          .correct-title {
            font-size: 1.3rem;
          }

          .complete-message,
          .correct-message {
            font-size: 0.95rem;
          }
        }
      }
    }
  }

  .qr-modal-content {
    padding: 1.25rem;

    .qr-modal-image {
      width: 240px;
      height: 240px;
    }

    .qr-modal-text {
      font-size: 0.95rem;
    }

    .qr-modal-amount {
      font-size: 1.1rem;
    }
  }
}

@media (max-width: 576px) {
  .auth-wrapper {
    padding: 0 0.5rem;
  }

  .confirm-payment-card {
    padding: 1.5rem 1rem;
    border-radius: 16px !important;
  }

  .logo-section {
    margin-bottom: 1.25rem;

    .logo-image {
      width: 120px;
      height: 120px;
    }

    .brand-text {
      font-size: 1.3rem;
      margin-top: 0.5rem;
    }
  }

  .content-section {
    .error-section {
      padding: 1.25rem 0;

      .error-content {
        .error-icon {
          width: 48px;
          height: 48px;
        }

        .error-title {
          font-size: 1.2rem;
        }

        .error-message {
          font-size: 0.9rem;
        }
      }
    }

    .main-content {
      .product-info-section {
        margin-bottom: 1.25rem;

        .section-title {
          font-size: 1.1rem;
          margin-bottom: 0.875rem;
        }

        .product-display {
          padding: 1rem;

          .product-image {
            width: 60px;
            height: 60px;
            margin-bottom: 0.75rem;
          }

          .product-name {
            font-size: 0.95rem;
          }
        }
      }

      .divider {
        margin: 1rem 0;
      }

      .userid-section,
      .payment-section,
      .qr-section,
      .slip-section {
        margin-bottom: 1.25rem;

        .userid-title,
        .payment-title,
        .qr-title,
        .slip-title {
          font-size: 0.95rem;
          margin-bottom: 0.875rem;

          .title-icon {
            width: 16px;
            height: 16px;
          }
        }
      }

      .userid-section .userid-display {
        padding: 0.75rem;

        .line-profile {
          gap: 0.625rem;

          .line-avatar,
          .line-avatar-placeholder {
            width: 40px;
            height: 40px;

            .placeholder-icon {
              width: 20px;
              height: 20px;
            }
          }

          .line-info {
            .line-name {
              font-size: 0.95rem;
            }

            .line-id {
              font-size: 0.8rem;
              max-width: 150px;
            }
          }
        }
      }

      .payment-section .bank-info {
        padding: 1rem;

        .bank-logo {
          margin-bottom: 0.875rem;

          .bank-icon {
            width: 60px;
            height: 60px;
          }
        }

        .bank-details {
          .bank-name {
            font-size: 1rem;
            margin-bottom: 0.375rem;
          }

          .bank-account {
            font-size: 0.95rem;
            margin-bottom: 0.25rem;
          }

          .bank-holder {
            font-size: 0.85rem;
          }
        }
      }

      .qr-section .qr-display {
        .qr-container {
          .qr-image {
            width: 110px;
            height: 110px;
          }

          .qr-overlay {
            .qr-icon {
              width: 20px;
              height: 20px;
            }

            .qr-text {
              font-size: 0.8rem;
            }
          }
        }

        .qr-info .qr-amount {
          font-size: 0.95rem;
          padding: 0.5rem;
        }
      }

      .slip-section {
        .slip-display {
          .slip-image {
            max-height: 300px;
            border-radius: 10px;
          }

          .slip-actions .delete-btn {
            padding: 0.375rem 0.75rem !important;
            font-size: 0.8rem;
            border-radius: 10px !important;

            .button-icon {
              width: 12px;
              height: 12px;
            }
          }
        }

        .slip-upload {
          .file-input {
            padding: 0.375rem;
            border-radius: 10px;
          }

          .upload-hint {
            font-size: 0.8rem;
          }
        }
      }

      .action-section .confirm-btn {
        padding: 0.625rem 1.5rem !important;
        font-size: 0.9rem;
        border-radius: 10px !important;

        .button-icon {
          width: 16px;
          height: 16px;
        }
      }

      .complete-section,
      .slip-correct-section {
        padding: 1.25rem 0;

        .complete-content,
        .slip-correct-content {

          .complete-icon,
          .correct-icon {
            width: 48px;
            height: 48px;
            margin-bottom: 1rem;
          }

          .complete-title,
          .correct-title {
            font-size: 1.2rem;
            margin-bottom: 0.75rem;
          }

          .complete-message,
          .correct-message {
            font-size: 0.9rem;
          }
        }
      }
    }
  }

  .qr-modal-content {
    padding: 1rem;

    .qr-modal-image {
      width: 200px;
      height: 200px;
      border-radius: 14px;
      padding: 10px;
    }

    .qr-modal-text {
      font-size: 0.9rem;
    }

    .qr-modal-amount {
      font-size: 1rem;
    }
  }
}

@media (max-width: 375px) {
  .confirm-payment-card {
    padding: 1.25rem 0.875rem;
  }

  .logo-section {
    .logo-image {
      width: 100px;
      height: 100px;
    }

    .brand-text {
      font-size: 1.2rem;
    }
  }

  .content-section .main-content {
    .qr-section .qr-display .qr-container .qr-image {
      width: 100px;
      height: 100px;
    }

    .action-section .confirm-btn {
      padding: 0.5rem 1.25rem !important;
      font-size: 0.85rem;
    }
  }

  .qr-modal-content .qr-modal-image {
    width: 180px;
    height: 180px;
  }
}
</style>
