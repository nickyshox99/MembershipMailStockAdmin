<template>
  <div class="registeremail-container">
    <div class="registeremail-background">
      <div class="background-overlay"></div>
    </div>

    <div class="auth-wrapper auth-v1 px-2">
      <div class="auth-inner py-2">
        <b-card class="registeremail-card mb-0">
          <div class="logo-section">
            <img src="@/assets/images/logo/image.png" alt="allpremium" class="logo-image">
            <h2 class="brand-text">
              All Premium
            </h2>
          </div>

          <div class="welcome-section">
            <h3 class="welcome-title">ลงทะเบียนด้วยเมลตัวเอง</h3>
            <p class="welcome-subtitle">กรุณากรอกอีเมลของคุณเพื่อเริ่มต้นใช้งาน</p>
          </div>

          <div class="form-section">
            <b-form @submit.prevent="handleSubmit">
              <!-- Email Input -->
              <b-form-group label-for="email" class="form-group-modern">
                <label for="email" class="form-label">
                  <feather-icon icon="MailIcon" class="label-icon" />
                  Email Address
                </label>
                <b-form-input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="example@email.com"
                  class="form-input-modern"
                  :state="emailState"
                  required
                />
                <b-form-invalid-feedback :state="emailState">
                  กรุณากรอกอีเมลให้ถูกต้อง
                </b-form-invalid-feedback>
              </b-form-group>

              <!-- Error Message -->
              <b-form-group v-if="errorMessage" class="error-section">
                <div class="error-message">
                  <feather-icon icon="AlertCircleIcon" class="error-icon" />
                  {{ errorMessage }}
                </div>
              </b-form-group>

              <!-- Submit Button -->
              <div class="submit-section mt-3">
                <b-button
                  type="submit"
                  variant="primary"
                  block
                  class="submit-button"
                  :disabled="!isFormValid"
                >
                  <feather-icon icon="CheckIcon" class="button-icon" />
                  ดำเนินการต่อ
                </b-button>
              </div>

              <!-- Back Button -->
              <div class="back-section mt-2">
                <b-button
                  variant="outline-secondary"
                  block
                  class="back-button"
                  @click="goBack"
                >
                  <feather-icon icon="ArrowLeftIcon" class="button-icon" />
                  กลับ
                </b-button>
              </div>
            </b-form>
          </div>
        </b-card>
      </div>
    </div>

    <!-- Email Info Modal -->
    <b-modal
      id="modal-email-info"
      ref="modalEmailInfo"
      v-model="showEmailInfoModal"
      title="ข้อมูลสำคัญเกี่ยวกับการใช้งาน"
      size="lg"
      :hideHeaderClose="true"
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      @hidden="resetEmailInfoModal"
    >
      <div class="email-info-content">
        <!-- image section -->
        <div
          v-if="settingdata['line_token'] && settingdata['line_token']['recommendImage5'] && settingdata['line_token']['recommendImage5'].length > 0">
          <div style="display: block;">
            <img :src="settingdata['line_token']['recommendImage5']" width="100%" />
          </div>
          <div class="divider"></div>
        </div>

        <!-- benefits section -->
        <div
          v-if="!settingdata['line_token'] || !settingdata['line_token']['recommendImage5'] || settingdata['line_token']['recommendImage5'].length === 0">
          <div class="benefits-card">
            <div class="benefits-header">
              <feather-icon icon="AwardIcon" class="header-icon" />
              <h6 class="benefits-title">สิทธิประโยชน์ที่คุณจะได้รับ</h6>
            </div>
            <div class="benefits-grid">
              <div class="benefit-item">
                <feather-icon icon="VideoIcon" class="benefit-icon" />
                <span>รับชมแบบไม่มีโฆษณา</span>
              </div>
              <div class="benefit-item">
                <feather-icon icon="SmartphoneIcon" class="benefit-icon" />
                <span>ใช้ขณะเปิดแอพอื่น/ปิดหน้าจอ</span>
              </div>
              <div class="benefit-item">
                <feather-icon icon="DownloadIcon" class="benefit-icon" />
                <span>ดาวโหลดวีดีโอออฟไลน์</span>
              </div>
              <div class="benefit-item">
                <feather-icon icon="MusicIcon" class="benefit-icon" />
                <span>สามารถใช้งาน youtube music</span>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="notices-card">
            <div class="notice-item success">
              <feather-icon icon="CheckCircleIcon" class="notice-icon" />
              <span>มีแจ้งต่ออายุก่อนหมด</span>
            </div>
            <!-- <div class="notice-item danger">
              <feather-icon icon="AlertTriangleIcon" class="notice-icon" />
              <span>ห้ามนำเมลสำคัญในการใช้งาน หากนำมาใช้ร้านไม่สามารถรับผิดชอบได้ทุกกรณี</span>
            </div> -->
          </div>
        </div>

        <div class="agreement-section">
          <b-form-checkbox v-model="agreedToEmailTerms" class="custom-checkbox">
            <span class="checkbox-label">ฉันได้อ่านและเข้าใจข้อมูลข้างต้นแล้ว</span>
          </b-form-checkbox>
        </div>

        <div class="action-section">
          <b-button
            variant="primary"
            block
            class="confirm-button"
            :disabled="!agreedToEmailTerms"
            @click="handleEmailInfoConfirm"
          >
            <feather-icon icon="CheckIcon" class="button-icon" />
            รับทราบและดำเนินการต่อ
          </b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {
  BCard,
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BModal,
  BFormCheckbox,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import axios from 'axios'

export default {
  name: 'RegisterEmail',
  components: {
    BCard,
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BModal,
    BFormCheckbox,
  },
  data() {
    return {
      email: '',
      errorMessage: '',
      sourceUserId: null, // รับมาจาก LINE
      showEmailInfoModal: true, // แสดง modal ข้อมูลทันทีที่เข้าหน้า
      agreedToEmailTerms: false, // สถานะการยินยอมอ่านข้อมูล
      settingdata: {},
    }
  },
  async mounted() {
    // รับ sourceUserId จาก query parameters
    if (this.$route.query.sourceUserId) {
      this.sourceUserId = this.$route.query.sourceUserId
      console.log('RegisterEmail - sourceUserId received:', this.sourceUserId)
    } else {
      console.log('RegisterEmail - No sourceUserId in query parameters')
    }

    const userData = JSON.parse(localStorage.getItem('userData'));
    const formData = new FormData();

    var headers = {
        userid: 'big',
        token: 'big',
    }

    var body = {
        userid: 'big',
        token: 'big',
    }

    let response;
    await axios.get("api/adminsetting/getadminsetting", {
        headers: {
            'Content-Type': 'application/json',
            'userid': headers.userid,
            'token': headers.token,
        }
    }).then(
        resp => {
            response = resp.data.data;
        }
    );

    //console.log(response);

    let tmpSettingData = {};

    for (let index = 0; index < response.length; index++) {
        const element = response[index];
        let meta_name = element.meta;
        let meta_data = JSON.parse(element.value);
        for (const [key, value] of Object.entries(meta_data)) {
            if (key.includes("enable")) {
                meta_data[key] = value == 1 ? true : false;
            }              
            
        }
        tmpSettingData[meta_name] = meta_data;        
    }

    this.settingdata = tmpSettingData;
  },
  computed: {
    emailState() {
      if (this.email === '') return null
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(this.email)
    },
    isFormValid() {
      return this.emailState === true
    },
  },
  methods: {
    async handleSubmit() {
      if (!this.isFormValid) {
        this.errorMessage = 'กรุณากรอกอีเมลให้ถูกต้อง'
        return
      }

      this.errorMessage = ''

      console.log('Register with email:', this.email)

      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'บันทึกอีเมลสำเร็จ',
          icon: 'CheckIcon',
          variant: 'success',
        },
      })

      // นำไปหน้าซื้อสินค้าพร้อมข้อมูล email, sourceUserId, shop_type และ purchaseType
      const query = {
        emailx: this.email,
        shop_type: 3,
        purchase_type: 'email'
      }
      if (this.sourceUserId) {
        query.sourceUserId = this.sourceUserId
      }
      this.$router.push({
        name: 'buy-product',
        query
      })
    },
    goBack() {
      // กลับไปหน้า SelectTopic พร้อมส่ง sourceUserId
      const query = {}
      if (this.sourceUserId) {
        query.sourceUserId = this.sourceUserId
      }
      this.$router.push({ name: 'select-topic', query })
    },
    resetEmailInfoModal() {
      // ไม่ reset agreedToEmailTerms เพื่อเก็บสถานะไว้
    },
    handleEmailInfoConfirm() {
      if (!this.agreedToEmailTerms) return
      
      // ปิด modal
      this.showEmailInfoModal = false
    },
  },
}
</script>

<style lang="scss">
// YouTube Theme - White Background with Red/Black Accents
.registeremail-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #ffffff;
  font-family: 'MiSansMU', sans-serif;
}

.registeremail-background {
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
  max-width: 500px;
  margin: 0 auto;
}

.registeremail-card {
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

.welcome-section {
  text-align: center;
  margin-bottom: 2rem;

  .welcome-title {
    color: #000000;
    font-family: 'MiSansMU', sans-serif;
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .welcome-subtitle {
    color: #666666;
    font-family: 'MiSansMU', sans-serif;
    font-size: 1rem;
    margin: 0;
  }
}

.form-section {
  margin-top: 2rem;

  .form-group-modern {
    margin-bottom: 1.5rem;

    .form-label {
      display: flex;
      align-items: center;
      color: #000000;
      font-family: 'MiSansMU', sans-serif;
      font-weight: 600;
      font-size: 1rem;
      margin-bottom: 0.5rem;

      .label-icon {
        width: 18px;
        height: 18px;
        margin-right: 0.5rem;
        color: #ff0000;
      }
    }

    .form-input-modern {
      border: 2px solid rgba(0, 0, 0, 0.2);
      border-radius: 12px;
      padding: 0.75rem 1rem;
      font-family: 'MiSansMU', sans-serif;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #ffffff;

      &:focus {
        border-color: #ff0000;
        box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.25);
        background: white;
      }

      &::placeholder {
        color: #999;
      }
    }

    .invalid-feedback {
      font-family: 'MiSansMU', sans-serif;
      font-size: 0.85rem;
      color: #dc3545;
      margin-top: 0.25rem;
    }
  }

  .error-section {
    .error-message {
      display: flex;
      align-items: center;
      background: rgba(220, 53, 69, 0.1);
      border: 2px solid rgba(220, 53, 69, 0.3);
      border-radius: 12px;
      padding: 0.75rem 1rem;
      color: #dc3545;
      font-family: 'MiSansMU', sans-serif;
      font-size: 0.95rem;

      .error-icon {
        width: 20px;
        height: 20px;
        margin-right: 0.5rem;
      }
    }
  }
}

.submit-section {
  margin-top: 2rem;

  .submit-button {
    padding: 0.875rem 2rem !important;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 12px !important;
    background: #ff0000 !important;
    border: none !important;
    color: #ffffff !important;
    box-shadow: 0 4px 15px rgba(255, 0, 0, 0.4);
    transition: all 0.3s ease;
    font-family: 'MiSansMU', sans-serif;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 0, 0, 0.5) !important;
      background: #cc0000 !important;
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background: #ff6666 !important;
    }

    .button-icon {
      width: 18px;
      height: 18px;
      margin-right: 0.5rem;
    }
  }
}

.back-section {
  .back-button {
    padding: 0.75rem 1.5rem !important;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 12px !important;
    background: transparent !important;
    border: 2px solid rgba(0, 0, 0, 0.3) !important;
    color: #000000 !important;
    transition: all 0.3s ease;
    font-family: 'MiSansMU', sans-serif;

    &:hover {
      background: rgba(0, 0, 0, 0.1) !important;
      border-color: #000000 !important;
      transform: translateY(-1px);
    }

    .button-icon {
      width: 18px;
      height: 18px;
      margin-right: 0.5rem;
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .registeremail-card {
    padding: 2rem;
  }

  .logo-section {
    .logo-image {
      width: 100px;
      height: 100px;
    }

    .brand-text {
      font-size: 1.5rem;
    }
  }

  .welcome-section {
    .welcome-title {
      font-size: 1.3rem;
    }
  }

  .form-section {
    .form-group-modern {
      margin-bottom: 1.25rem;

      .form-label {
        font-size: 0.95rem;
      }

      .form-input-modern {
        padding: 0.65rem 0.9rem;
        font-size: 0.95rem;
      }
    }
  }

  .submit-section {
    .submit-button {
      font-size: 1rem;
      padding: 0.75rem 1.5rem !important;
    }
  }
}

@media (max-width: 480px) {
  .registeremail-card {
    padding: 1.5rem;
  }

  .logo-section {
    .logo-image {
      width: 80px;
      height: 80px;
    }

    .brand-text {
      font-size: 1.2rem;
    }
  }

  .welcome-section {
    .welcome-title {
      font-size: 1.1rem;
    }

    .welcome-subtitle {
      font-size: 0.9rem;
    }
  }

  .form-section {
    .form-group-modern {
      margin-bottom: 1rem;

      .form-label {
        font-size: 0.9rem;
      }

      .form-input-modern {
        padding: 0.6rem 0.8rem;
        font-size: 0.9rem;
      }
    }
  }

  .submit-section {
    .submit-button {
      font-size: 0.95rem;
      padding: 0.7rem 1.25rem !important;
    }
  }

  .back-section {
    .back-button {
      font-size: 0.9rem;
      padding: 0.65rem 1.25rem !important;
    }
  }
}

// Email Info Modal Styles - Modern Design
.email-info-content {
  font-family: 'MiSansMU', sans-serif;
  padding: 0.5rem 0;

  .benefits-card {
    background: linear-gradient(135deg, rgba(255, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.08) 100%);
    border-radius: 12px;
    padding: 1.25rem;
    border: 1px solid rgba(255, 0, 0, 0.15);

    .benefits-header {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      .header-icon {
        width: 24px;
        height: 24px;
        color: #ff0000;
        margin-right: 0.5rem;
      }

      .benefits-title {
        margin: 0;
        font-weight: 600;
        font-size: 1.1rem;
        color: #333333;
      }
    }

    .benefits-grid {
      display: grid;
      gap: 0.75rem;

      .benefit-item {
        display: flex;
        align-items: flex-start;
        padding: 0.75rem;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 8px;
        transition: all 0.2s ease;

        .benefit-icon {
          width: 20px;
          height: 20px;
          color: #ff0000;
          margin-right: 0.75rem;
          margin-top: 2px;
          flex-shrink: 0;
        }

        span {
          flex: 1;
          color: #333333;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        &:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateX(4px);
        }
      }
    }
  }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%);
    margin: 1.5rem 0;
  }

  .notices-card {
    display: grid;
    gap: 0.65rem;

    .notice-item {
      display: flex;
      align-items: flex-start;
      padding: 0.85rem 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
      line-height: 1.5;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;

      .notice-icon {
        width: 20px;
        height: 20px;
        margin-right: 0.75rem;
        margin-top: 1px;
        flex-shrink: 0;
      }

      span {
        flex: 1;
      }

      &.success {
        background: rgba(40, 167, 69, 0.08);
        border-left-color: #28a745;
        
        .notice-icon {
          color: #28a745;
        }
        
        span {
          color: #155724;
        }

        &:hover {
          background: rgba(40, 167, 69, 0.12);
        }
      }

      &.info {
        background: rgba(23, 162, 184, 0.08);
        border-left-color: #17a2b8;
        
        .notice-icon {
          color: #17a2b8;
        }
        
        span {
          color: #0c5460;
        }

        &:hover {
          background: rgba(23, 162, 184, 0.12);
        }
      }
      &.danger {
        background: rgba(220, 53, 69, 0.12);
        border-left-color: #dc3545;
        
        .notice-icon {
          color: #dc3545;
        }
        
        span {
          color: #721c24;
          font-weight: 600;
        }

        &:hover {
          background: rgba(220, 53, 69, 0.18);
        }
      }
    }
  }

  .agreement-section {
    margin-top: 1.5rem;
    padding: 1rem;
    background: rgba(255, 0, 0, 0.08);
    border-radius: 10px;
    border: 2px dashed rgba(255, 0, 0, 0.2);

    .custom-checkbox {
      ::v-deep .custom-control-label {
        font-family: 'MiSansMU', sans-serif;
        font-size: 1rem;
        color: #333333;
        cursor: pointer;
        padding-left: 0.5rem;
      }

      ::v-deep .custom-control-input:checked ~ .custom-control-label::before {
        background-color: #ff0000;
        border-color: #ff0000;
        box-shadow: 0 2px 8px rgba(255, 0, 0, 0.3);
      }

      ::v-deep .custom-control-label::before {
        border-width: 2px;
        border-radius: 4px;
      }
    }

    .checkbox-label {
      font-weight: 600;
      color: #000000;
    }
  }

  .action-section {
    margin-top: 1.25rem;

    .confirm-button {
      padding: 0.875rem 2rem !important;
      font-size: 1.05rem;
      font-weight: 600;
      border-radius: 10px !important;
      background: #ff0000 !important;
      border: none !important;
      color: #ffffff !important;
      box-shadow: 0 4px 12px rgba(255, 0, 0, 0.3);
      transition: all 0.3s ease;
      font-family: 'MiSansMU', sans-serif;

      .button-icon {
        width: 20px;
        height: 20px;
        margin-right: 0.5rem;
      }

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 18px rgba(255, 0, 0, 0.4) !important;
        background: #cc0000 !important;
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background: #ff6666 !important;
        box-shadow: none;
      }
    }
  }
}

// Modal Header Customization - Modern
::v-deep #modal-email-info {
  .modal-content {
    border: none;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  }

  .modal-header {
    background: linear-gradient(135deg, rgba(255, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.1) 100%);
    border-bottom: 2px solid rgba(255, 0, 0, 0.15);
    padding: 1.25rem 1.5rem;

    .modal-title {
      color: #ff0000;
      font-family: 'MiSansMU', sans-serif;
      font-weight: 700;
      font-size: 1.35rem;
    }
  }

  .modal-body {
    padding: 1.5rem;
    background: #fefefe;
  }
}
</style>
