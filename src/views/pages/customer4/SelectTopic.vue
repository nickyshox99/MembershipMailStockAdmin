<template>
  <div class="select-topic-container">
    <div class="select-background">
      <div class="background-overlay"></div>
    </div>

    <div class="auth-wrapper auth-v1 px-2">
      <div class="auth-inner py-2">
        <b-card class="select-card mb-0">
          <div class="logo-section">
            <img src="/logo_lb2.png" alt="sunsetclub" class="logo-image">
            <h2 class="brand-text">
              Sunset Club
            </h2>
          </div>

          <div class="welcome-section">
            <h3 class="welcome-title">เลือกประเภทการซื้อสินค้า</h3>
            <p class="welcome-subtitle">กรุณาเลือกประเภทที่คุณต้องการ</p>
          </div>

          <div class="options-section" v-if="!isLoading">
            <b-row class="option-row">
              <b-col v-if="showShopCode" cols="12" :md="getColumnSize" class="option-col">
                <div class="option-card" :class="{ 'selected': selectedType === 'shop' }" @click="selectType('shop')">
                  <div class="option-icon">
                    <feather-icon icon="ShoppingBagIcon" size="48" />
                  </div>
                  <h4 class="option-title">ซื้อแบบรหัสร้าน</h4>
                  <p class="option-description">
                    เหมาะสำหรับลูกค้าที่มีรหัสร้านจากทางเรา
                  </p>
                  <div class="check-icon" v-if="selectedType === 'shop'">
                    <feather-icon icon="CheckCircleIcon" size="24" />
                  </div>
                </div>
              </b-col>

              <b-col v-if="showUserCode" cols="12" :md="getColumnSize" class="option-col">
                <div class="option-card" :class="{ 'selected': selectedType === 'personal' }"
                  @click="selectType('personal')">
                  <div class="option-icon">
                    <feather-icon icon="UserIcon" size="48" />
                  </div>
                  <h4 class="option-title">รหัสตัวเอง</h4>
                  <p class="option-description">
                    ใช้รหัสส่วนตัวของคุณเองในการซื้อ
                  </p>
                  <div class="check-icon" v-if="selectedType === 'personal'">
                    <feather-icon icon="CheckCircleIcon" size="24" />
                  </div>
                </div>
              </b-col>

              <b-col v-if="showUserEmail" cols="12" :md="getColumnSize" class="option-col">
                <div class="option-card" :class="{ 'selected': selectedType === 'email' }"
                  @click="selectType('email')">
                  <div class="option-icon">
                    <feather-icon icon="MailIcon" size="48" />
                  </div>
                  <h4 class="option-title">เมลตัวเอง</h4>
                  <p class="option-description">
                    ใช้อีเมลส่วนตัวของคุณในการซื้อ
                  </p>
                  <div class="check-icon" v-if="selectedType === 'email'">
                    <feather-icon icon="CheckCircleIcon" size="24" />
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>

          <div v-if="isLoading" class="loading-section text-center">
            <b-spinner variant="primary" label="Loading..."></b-spinner>
            <p class="mt-2">กำลังโหลด...</p>
          </div>

          <div class="submit-section mt-3">
            <b-button variant="primary" block class="submit-button" :disabled="!selectedType" @click="handleConfirm">
              <feather-icon icon="ArrowRightIcon" class="button-icon" />
              ดำเนินการต่อ
            </b-button>
          </div>
        </b-card>
      </div>
    </div>

    <!-- Terms and Conditions Modal -->
    <b-modal
      id="modal-terms"
      ref="modalTerms"
      v-model="showTermsModal"
      :title="t('ข้อกำหนดและเงื่อนไข')"
      size="lg"
      :hideHeaderClose="true"
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      @hidden="resetTermsModal"
    >
      <div class="terms-content">
        <div class="terms-card">
          <div class="terms-item important">
            <feather-icon icon="AlertCircleIcon" class="terms-icon" />
            <div class="terms-text">
              <p class="terms-title">Youtube official มีข้อกำหนด และ official อาจมีการปรับเปลี่ยนกฎ</p>
              <p class="terms-desc">ทางร้านต้องยึดตามข้อกำหนดของ official</p>
            </div>
          </div>

          <div class="terms-item support">
            <feather-icon icon="ShieldIcon" class="terms-icon" />
            <div class="terms-text">
              <p class="terms-title">หากเกิดปัญหา ทางร้านดูแลให้ลูกค้าตลอดการใช้งาน</p>
            </div>
          </div>

          <div class="terms-item contact">
            <feather-icon icon="MessageCircleIcon" class="terms-icon" />
            <div class="terms-text">
              <p class="terms-desc">ต้องการสอบถามเพิ่มเติมทักไลน์</p>
            </div>
          </div>
        </div>

        <div class="agreement-section">
          <b-form-checkbox
            v-model="agreedToTerms"
            class="custom-checkbox"
          >
            <span class="checkbox-label">ฉันได้อ่านและยินยอมตามข้อกำหนดและเงื่อนไขแล้ว</span>
          </b-form-checkbox>
        </div>

        <div class="action-section">
          <b-button
            variant="primary"
            block
            class="confirm-button"
            :disabled="!agreedToTerms"
            @click="handleTermsConfirm"
          >
            <feather-icon icon="CheckIcon" class="button-icon" />
            เลือกซื้อสินค้า
          </b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BButton,
  BSpinner,
  BModal,
  BFormCheckbox,
} from 'bootstrap-vue'
import axios from 'axios'
import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  name: 'SelectTopic',
  components: {
    BCard,
    BRow,
    BCol,
    BButton,
    BSpinner,
    BModal,
    BFormCheckbox,
  },
  setup() {
    const { t } = useI18nUtils()
    return { t }
  },
  data() {
    return {
      selectedType: null, // 'shop', 'personal' หรือ 'email'
      sourceUserId: null, // รับมาจาก LINE
      showShopCode: true, // แสดงปุ่มซื้อแบบรหัสร้าน
      showUserCode: true, // แสดงปุ่มรหัสตัวเอง
      showUserEmail: true, // แสดงปุ่มเมลตัวเอง
      isLoading: true, // สถานะการโหลดข้อมูล
      showTermsModal: true, // แสดง modal ข้อกำหนดทันทีที่เข้าหน้า
      agreedToTerms: false, // สถานะการยินยอมข้อกำหนด
    }
  },
  computed: {
    getColumnSize() {
      // คำนวณขนาดคอลัมน์ตามจำนวนปุ่มที่แสดง
      const visibleButtons = [this.showShopCode, this.showUserCode, this.showUserEmail].filter(Boolean).length
      if (visibleButtons === 1) return 12
      if (visibleButtons === 2) return 6
      return 4 // 3 ปุ่ม
    },
  },
  mounted() {
    // รับ sourceUserId จาก query parameters
    if (this.$route.query.sourceUserId) {
      this.sourceUserId = this.$route.query.sourceUserId
      console.log('SelectTopic - sourceUserId received:', this.sourceUserId)
    } else {
      console.log('SelectTopic - No sourceUserId in query parameters')
    }
    // โหลดสถานะการแสดงปุ่ม
    this.fetchButtonStatus()
  },
  methods: {
    async fetchButtonStatus() {
      try {
        const response = await axios.get('/api/btnStatus/GetBtnStatus')
        if (response.data.status === 'success' && response.data.data.length > 0) {
          const btnStatus = response.data.data[0]
          this.showShopCode = btnStatus.show_shop_code === 1
          this.showUserCode = btnStatus.show_user_code === 1
          this.showUserEmail = btnStatus.show_user_email === 1
        }
      } catch (error) {
        console.error('Error fetching button status:', error)
        // ถ้า error ให้แสดงปุ่มทั้งหมดตาม default
      } finally {
        this.isLoading = false
      }
    },
    selectType(type) {
      this.selectedType = type
    },
    handleConfirm() {
      if (!this.selectedType) return
      
      // นำทางตาม type ที่เลือก
      this.navigateToNextPage()
    },
    resetTermsModal() {
      // ไม่ reset agreedToTerms เพื่อเก็บสถานะไว้
    },
    handleTermsConfirm() {
      if (!this.agreedToTerms) return
      
      // ปิด modal
      this.showTermsModal = false
    },
    navigateToNextPage() {
      if (this.selectedType === 'shop') {
        // นำไปหน้าเลือกแพ็กเกจ (Personal/Family) พร้อมส่ง sourceUserId
        const query = {}
        if (this.sourceUserId) {
          query.sourceUserId = this.sourceUserId
        }
        console.log('SelectTopic - Navigating to select-plan-type with query:', query)
        this.$router.push({ name: 'select-plan-type', query })
      } else if (this.selectedType === 'personal') {
        // นำไปหน้าลงทะเบียนด้วยรหัสตัวเอง พร้อมส่ง sourceUserId
        const query = { type: 'personal' }
        if (this.sourceUserId) {
          query.sourceUserId = this.sourceUserId
        }
        console.log('SelectTopic - Navigating to user-regis with query:', query)
        this.$router.push({ name: 'user-regis', query })
      } else if (this.selectedType === 'email') {
        // นำไปหน้ากรอกเมลตัวเอง พร้อมส่ง sourceUserId
        const query = { type: 'email' }
        if (this.sourceUserId) {
          query.sourceUserId = this.sourceUserId
        }
        console.log('SelectTopic - Navigating to registeremail with query:', query)
        this.$router.push({ name: 'registeremail', query })
      }
    },
  },
}
</script>

<style lang="scss">
// Sunset Theme - Warm Orange and Purple Colors
.select-topic-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #FFE4E1 0%, #FFD6BA 25%, #FFDAB9 50%, #FFB6C1 75%, #DDA0DD 100%);
  font-family: 'MiSansMU', sans-serif;
}

.select-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #FFE4E1 0%, #FFD6BA 25%, #FFDAB9 50%, #FFB6C1 75%, #DDA0DD 100%);
  opacity: 0.05;
  z-index: 1;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(255, 107, 107, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(255, 142, 83, 0.05) 0%, transparent 50%);
  z-index: 2;
}

.auth-wrapper {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.select-card {
  background: #ffffff !important;
  border: none !important;
  border-radius: 24px !important;
  box-shadow: 0 20px 40px rgba(255, 107, 107, 0.15) !important;
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
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
    border: 3px solid #FF6B6B;
    transition: all 0.3s ease;
    object-fit: cover;
    background: linear-gradient(135deg, #FFE4E1 0%, #FFD6BA 25%, #FFDAB9 50%, #FFB6C1 75%, #DDA0DD 100%);
    padding: 8px;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 12px 35px rgba(255, 107, 107, 0.4);
      border-color: #FF8E53;
    }
  }

  .brand-text {
    background: linear-gradient(135deg, #FF6B6B 0%, #AB47BC 100%);
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
  margin-bottom: 2rem;

  .welcome-title {
    color: #5d4037;
    font-family: 'MiSansMU', sans-serif;
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .welcome-subtitle {
    color: #8d6e63;
    font-family: 'MiSansMU', sans-serif;
    font-size: 1rem;
    margin: 0;
  }
}

.options-section {
  margin: 2rem 0;

  .option-row {
    margin-left: -0.5rem;
    margin-right: -0.5rem;
  }

  .option-col {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.loading-section {
  margin: 2rem 0;
  padding: 3rem 0;

  p {
    color: #6d4c41;
    font-family: 'MiSansMU', sans-serif;
    font-size: 1rem;
  }
}

.option-card {
  position: relative;
  padding: 2rem 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(135deg, #FFE4E1 0%, #FFD6BA 25%, #FFDAB9 50%, #FFB6C1 75%, #DDA0DD 100%);
  backdrop-filter: blur(15px);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 107, 107, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%);
    border-radius: 20px;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  &:hover {
    border-color: #FF6B6B;
    transform: translateY(-5px) scale(1.02);
    box-shadow:
      0 15px 35px rgba(255, 107, 107, 0.2),
      0 5px 15px rgba(255, 107, 107, 0.1);
    background: linear-gradient(135deg, #FFE4E1 0%, #FFD6BA 25%, #FFDAB9 50%, #FFB6C1 75%, #DDA0DD 100%);

    &::before {
      background: linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(255, 142, 83, 0.05) 100%);
    }
  }

  &.selected {
    background: linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(255, 142, 83, 0.05) 100%);
    border-color: #FF6B6B;
    box-shadow:
      0 10px 30px rgba(255, 107, 107, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);

    &::before {
      background: linear-gradient(135deg, rgba(255, 107, 107, 0.15) 0%, rgba(255, 107, 107, 0.08) 100%);
    }
  }
}

.option-icon {
  margin-bottom: 1rem;
  color: #FF6B6B;
  position: relative;
  z-index: 1;

  .selected & {
    color: #FF6B6B;
  }
}

.option-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #5d4037;
  font-family: 'MiSansMU', sans-serif;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
}

.option-description {
  color: #6d4c41;
  font-family: 'MiSansMU', sans-serif;
  font-size: 0.95rem;
  margin: 0;
  position: relative;
  z-index: 1;
}

.check-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #FF6B6B;
  animation: scaleIn 0.3s ease;
  z-index: 2;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
}

.submit-section {
  margin-top: 2rem;
}

.submit-button {
  padding: 0.875rem 2rem !important;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px !important;
  background: #FF6B6B !important;
  border: none !important;
  color: #ffffff !important;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
  transition: all 0.3s ease;
  font-family: 'MiSansMU', sans-serif;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.5) !important;
    background: #FF8E53 !important;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #FFA07A !important;
  }

  .button-icon {
    width: 18px;
    height: 18px;
    margin-right: 0.5rem;
  }
}

// Responsive Design
@media (max-width: 992px) {
  .auth-wrapper {
    max-width: 700px;
  }

  .option-card {
    min-height: 200px;
  }
}

@media (max-width: 768px) {
  .auth-wrapper {
    max-width: 100%;
  }

  .select-card {
    padding: 2rem 1.5rem;
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

  .welcome-section {
    margin-bottom: 1.5rem;

    .welcome-title {
      font-size: 1.3rem;
    }

    .welcome-subtitle {
      font-size: 0.95rem;
    }
  }

  .options-section {
    margin: 1.5rem 0;
  }

  .option-card {
    padding: 1.5rem 1rem;
    min-height: 180px;
    margin-bottom: 1rem;

    .option-icon {
      margin-bottom: 0.75rem;

      svg {
        width: 40px;
        height: 40px;
      }
    }
  }

  .option-title {
    font-size: 1.15rem;
  }

  .option-description {
    font-size: 0.9rem;
  }

  .submit-section {
    margin-top: 1.5rem;
  }
}

@media (max-width: 576px) {
  .select-card {
    padding: 1.5rem 1rem;
    border-radius: 20px !important;
  }

  .logo-section {
    margin-bottom: 1.25rem;

    .logo-image {
      width: 120px;
      height: 120px;
    }

    .brand-text {
      font-size: 1.3rem;
    }
  }

  .welcome-section {
    margin-bottom: 1.25rem;

    .welcome-title {
      font-size: 1.15rem;
    }

    .welcome-subtitle {
      font-size: 0.9rem;
    }
  }

  .options-section {
    margin: 1rem 0;
  }

  .option-card {
    padding: 1.25rem 1rem;
    min-height: 160px;

    .option-icon {
      margin-bottom: 0.6rem;

      svg {
        width: 36px;
        height: 36px;
      }
    }
  }

  .option-title {
    font-size: 1.05rem;
  }

  .option-description {
    font-size: 0.85rem;
  }

  .submit-button {
    font-size: 1rem;
    padding: 0.75rem 1.5rem !important;
  }

  .check-icon {
    svg {
      width: 20px;
      height: 20px;
    }
  }
}

// Terms Modal Styles - Modern Design
.terms-content {
  font-family: 'MiSansMU', sans-serif;
  padding: 0.5rem 0;

  .terms-card {
    display: grid;
    gap: 1rem;

    .terms-item {
      display: flex;
      align-items: flex-start;
      padding: 1.25rem;
      border-radius: 10px;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;

      .terms-icon {
        width: 24px;
        height: 24px;
        margin-right: 1rem;
        margin-top: 2px;
        flex-shrink: 0;
      }

      .terms-text {
        flex: 1;

        p {
          margin: 0;
          line-height: 1.6;
        }

        .terms-title {
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .terms-desc {
          font-size: 0.9rem;
          opacity: 0.9;
        }
      }

      &.important {
        background: rgba(255, 107, 107, 0.12);
        border-left-color: #FF6B6B;

        .terms-icon {
          color: #FF6B6B;
        }

        .terms-text {
          color: #6d4c41;

          .terms-title {
            color: #FF8E53;
          }
        }

        &:hover {
          background: rgba(255, 107, 107, 0.18);
          transform: translateX(4px);
        }
      }

      &.support {
        background: rgba(152, 251, 152, 0.12);
        border-left-color: #28a745;

        .terms-icon {
          color: #28a745;
        }

        .terms-text {
          color: #155724;

          .terms-title {
            color: #0d4d1e;
          }
        }

        &:hover {
          background: rgba(152, 251, 152, 0.18);
          transform: translateX(4px);
        }
      }

      &.contact {
        background: rgba(135, 206, 235, 0.12);
        border-left-color: #17a2b8;

        .terms-icon {
          color: #17a2b8;
        }

        .terms-text {
          color: #0c5460;
        }

        &:hover {
          background: rgba(135, 206, 235, 0.18);
          transform: translateX(4px);
        }
      }
    }
  }

  .agreement-section {
    margin-top: 1.5rem;
    padding: 1rem;
    background: rgba(255, 107, 107, 0.08);
    border-radius: 10px;
    border: 2px dashed rgba(255, 107, 107, 0.2);

    .custom-checkbox {
      ::v-deep .custom-control-label {
        font-family: 'MiSansMU', sans-serif;
        font-size: 1rem;
        color: #6d4c41;
        cursor: pointer;
        padding-left: 0.5rem;
      }

      ::v-deep .custom-control-input:checked ~ .custom-control-label::before {
        background-color: #FF6B6B;
        border-color: #FF6B6B;
        box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
      }

      ::v-deep .custom-control-label::before {
        border-width: 2px;
        border-radius: 4px;
      }
    }

    .checkbox-label {
      font-weight: 600;
      color: #5d4037;
    }
  }

  .action-section {
    margin-top: 1.25rem;

    .confirm-button {
      padding: 0.875rem 2rem !important;
      font-size: 1.05rem;
      font-weight: 600;
      border-radius: 10px !important;
      background: #FF6B6B !important;
      border: none !important;
      color: #ffffff !important;
      box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
      transition: all 0.3s ease;
      font-family: 'MiSansMU', sans-serif;

      .button-icon {
        width: 20px;
        height: 20px;
        margin-right: 0.5rem;
      }

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 18px rgba(255, 107, 107, 0.4) !important;
        background: #FF8E53 !important;
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background: #FFA07A !important;
        box-shadow: none;
      }
    }
  }
}

// Modal Header Customization - Modern
::v-deep #modal-terms {
  .modal-content {
    border: none;
    box-shadow: 0 10px 40px rgba(255, 107, 107, 0.15);
  }

  .modal-header {
    background: linear-gradient(135deg, rgba(255, 107, 107, 0.15) 0%, rgba(221, 160, 221, 0.1) 100%);
    border-bottom: 2px solid rgba(255, 107, 107, 0.15);
    padding: 1.25rem 1.5rem;

    .modal-title {
      color: #FF6B6B;
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

