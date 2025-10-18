<template>
  <div class="select-plan-container">
    <div class="select-background">
      <div class="background-overlay"></div>
    </div>

    <div class="auth-wrapper auth-v1 px-2">
      <div class="auth-inner py-2">
        <b-card class="select-card mb-0">
          <div class="logo-section">
            <img src="@/assets/images/logo/image.png" alt="allpremium" class="logo-image">
            <h2 class="brand-text">
              All Premium
            </h2>
          </div>

          <div class="welcome-section">
            <h3 class="welcome-title">เลือกประเภทแพ็กเกจ</h3>
            <p class="welcome-subtitle">กรุณาเลือกแพ็กเกจที่คุณต้องการ</p>
          </div>

          <div class="options-section">
            <b-row>
              <b-col cols="12" md="6" class="mb-3 mb-md-0">
                <div class="option-card" :class="{ 'selected': selectedPlan === 'personal' }" @click="selectPlan('personal')">
                  <div class="option-icon">
                    <feather-icon icon="UserIcon" size="48" />
                  </div>
                  <h4 class="option-title">Personal</h4>
                  <p class="option-description">
                    แพ็กเกจสำหรับใช้งานส่วนบุคคล
                  </p>
                  <div class="check-icon" v-if="selectedPlan === 'personal'">
                    <feather-icon icon="CheckCircleIcon" size="24" />
                  </div>
                </div>
              </b-col>

              <b-col cols="12" md="6">
                <div class="option-card" :class="{ 'selected': selectedPlan === 'family' }"
                  @click="selectPlan('family')">
                  <div class="option-icon">
                    <feather-icon icon="UsersIcon" size="48" />
                  </div>
                  <h4 class="option-title">Family</h4>
                  <p class="option-description">
                    แพ็กเกจสำหรับใช้งานแบบครอบครัว
                  </p>
                  <div class="check-icon" v-if="selectedPlan === 'family'">
                    <feather-icon icon="CheckCircleIcon" size="24" />
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>

          <div class="submit-section mt-3">
            <b-button variant="primary" block class="submit-button" :disabled="!selectedPlan" @click="handleConfirm">
              <feather-icon icon="ArrowRightIcon" class="button-icon" />
              ดำเนินการต่อ
            </b-button>
          </div>

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
        </b-card>
      </div>
    </div>

    <!-- Personal Plan Info Modal -->
    <b-modal
      id="modal-personal-info"
      ref="modalPersonalInfo"
      v-model="showPersonalInfoModal"
      title="ข้อมูลสำคัญเกี่ยวกับการใช้งาน - Personal"
      size="lg"
      :hideHeaderClose="false"
      hide-footer
      @hidden="resetPersonalInfoModal"
    >
      <div class="plan-info-content">
        <div class="plan-header">
          <feather-icon icon="UserIcon" class="plan-icon" />
          <h5 class="plan-name">เมลร้านแบบ Personal</h5>
        </div>

        <div class="benefits-card">
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
          <div class="notice-item info">
            <feather-icon icon="ClockIcon" class="notice-icon" />
            <span>เปลี่ยนรหัสเมล ควรรออย่างน้อย 7 วัน</span>
          </div>
        </div>

        <div class="agreement-section">
          <b-form-checkbox v-model="agreedToPersonalTerms" class="custom-checkbox">
            <span class="checkbox-label">ฉันได้อ่านและเข้าใจข้อมูลข้างต้นแล้ว</span>
          </b-form-checkbox>
        </div>

        <div class="action-section">
          <b-button
            variant="primary"
            block
            class="confirm-button"
            :disabled="!agreedToPersonalTerms"
            @click="handlePersonalInfoConfirm"
          >
            <feather-icon icon="CheckIcon" class="button-icon" />
            รับทราบและดำเนินการต่อ
          </b-button>
          <b-button
            variant="outline-secondary"
            block
            class="cancel-button mt-2"
            @click="handlePersonalInfoCancel"
          >
            <feather-icon icon="XIcon" class="button-icon" />
            ปิด
          </b-button>
        </div>
      </div>
    </b-modal>

    <!-- Family Plan Info Modal -->
    <b-modal
      id="modal-family-info"
      ref="modalFamilyInfo"
      v-model="showFamilyInfoModal"
      title="ข้อมูลสำคัญเกี่ยวกับการใช้งาน - Family"
      size="lg"
      :hideHeaderClose="false"
      hide-footer
      @hidden="resetFamilyInfoModal"
    >
      <div class="plan-info-content">
        <div class="plan-header">
          <feather-icon icon="UsersIcon" class="plan-icon" />
          <h5 class="plan-name">เมลร้านแบบครอบครัว</h5>
        </div>

        <div class="benefits-card">
          <div class="benefits-grid">
            <div class="benefit-item">
              <feather-icon icon="VideoIcon" class="benefit-icon" />
              <span>รับชมแบบไม่มีโฆษณา ดาวโหลดวีดีโอออฟไลน์</span>
            </div>
            <div class="benefit-item">
              <feather-icon icon="SmartphoneIcon" class="benefit-icon" />
              <span>ใช้ขณะเปิดแอพอื่น/ปิดหน้าจอ</span>
            </div>
            <div class="benefit-item">
              <feather-icon icon="MusicIcon" class="benefit-icon" />
              <span>สามารถใช้งาน youtube music</span>
            </div>
            <div class="benefit-item">
              <feather-icon icon="MonitorIcon" class="benefit-icon" />
              <span>ดูพร้อมกันได้ 4 เครื่อง(อิงตามข้อกำหนดแอพ)</span>
            </div>
          </div>
        </div>

        <div class="divider"></div>

        <div class="notices-card">
          <div class="notice-item success">
            <feather-icon icon="CheckCircleIcon" class="notice-icon" />
            <span>มีแจ้งต่ออายุก่อนหมด</span>
          </div>
          <div class="notice-item warning">
            <feather-icon icon="AlertCircleIcon" class="notice-icon" />
            <span>ร้านจะต้องเข้าเมลไปต่อ"ทุกเดือน"</span>
          </div>
          <div class="notice-item info">
            <feather-icon icon="ClockIcon" class="notice-icon" />
            <span>เปลี่ยนรหัสเมล ควรรออย่างน้อย 7 วัน</span>
          </div>
        </div>

        <div class="agreement-section">
          <b-form-checkbox v-model="agreedToFamilyTerms" class="custom-checkbox">
            <span class="checkbox-label">ฉันได้อ่านและเข้าใจข้อมูลข้างต้นแล้ว</span>
          </b-form-checkbox>
        </div>

        <div class="action-section">
          <b-button
            variant="primary"
            block
            class="confirm-button"
            :disabled="!agreedToFamilyTerms"
            @click="handleFamilyInfoConfirm"
          >
            <feather-icon icon="CheckIcon" class="button-icon" />
            รับทราบและดำเนินการต่อ
          </b-button>
          <b-button
            variant="outline-secondary"
            block
            class="cancel-button mt-2"
            @click="handleFamilyInfoCancel"
          >
            <feather-icon icon="XIcon" class="button-icon" />
            ปิด
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
  BModal,
  BFormCheckbox,
} from 'bootstrap-vue'

export default {
  name: 'SelectPlanType',
  components: {
    BCard,
    BRow,
    BCol,
    BButton,
    BModal,
    BFormCheckbox,
  },
  data() {
    return {
      selectedPlan: null, // 'personal' หรือ 'family'
      sourceUserId: null, // รับมาจาก LINE
      showPersonalInfoModal: false, // แสดง modal ข้อมูล Personal
      showFamilyInfoModal: false, // แสดง modal ข้อมูล Family
      agreedToPersonalTerms: false, // สถานะการยินยอม Personal
      agreedToFamilyTerms: false, // สถานะการยินยอม Family
    }
  },
  mounted() {
    // รับ sourceUserId จาก query parameters
    if (this.$route.query.sourceUserId) {
      this.sourceUserId = this.$route.query.sourceUserId
    }
  },
  methods: {
    selectPlan(plan) {
      this.selectedPlan = plan
    },
    handleConfirm() {
      if (!this.selectedPlan) return
      
      // แสดง modal ตาม plan ที่เลือก
      if (this.selectedPlan === 'personal') {
        this.showPersonalInfoModal = true
      } else if (this.selectedPlan === 'family') {
        this.showFamilyInfoModal = true
      }
    },
    resetPersonalInfoModal() {
      // Reset agreedToPersonalTerms เมื่อปิด modal
      this.agreedToPersonalTerms = false
    },
    handlePersonalInfoConfirm() {
      if (!this.agreedToPersonalTerms) return
      
      // ปิด modal
      this.showPersonalInfoModal = false
      
      // นำไปหน้าซื้อสินค้าพร้อมส่ง plan type และ sourceUserId
      const query = { 
        type: 'shop_personal',
        shop_type: 0,
      }
      if (this.sourceUserId) {
        query.sourceUserId = this.sourceUserId
      }
      this.$router.push({ name: 'buy-product', query })
    },
    handlePersonalInfoCancel() {
      // ปิด modal โดยไม่ทำอะไร
      this.showPersonalInfoModal = false
    },
    resetFamilyInfoModal() {
      // Reset agreedToFamilyTerms เมื่อปิด modal
      this.agreedToFamilyTerms = false
    },
    handleFamilyInfoConfirm() {
      if (!this.agreedToFamilyTerms) return
      
      // ปิด modal
      this.showFamilyInfoModal = false
      
      // นำไปหน้าซื้อสินค้าพร้อมส่ง plan type และ sourceUserId
      const query = { 
        type: 'shop_family',
        shop_type: 1,
      }
      if (this.sourceUserId) {
        query.sourceUserId = this.sourceUserId
      }
      this.$router.push({ name: 'buy-product', query })
    },
    handleFamilyInfoCancel() {
      // ปิด modal โดยไม่ทำอะไร
      this.showFamilyInfoModal = false
    },
    goBack() {
      // กลับไปหน้า SelectTopic พร้อมส่ง sourceUserId
      const query = {}
      if (this.sourceUserId) {
        query.sourceUserId = this.sourceUserId
      }
      this.$router.push({ name: 'select-topic', query })
    },
  },
}
</script>

<style lang="scss">
// YouTube Theme - White Background with Red/Black Accents
.select-plan-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #ffffff;
  font-family: 'MiSansMU', sans-serif;
}

.select-background {
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
  max-width: 800px;
  margin: 0 auto;
}

.select-card {
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

.options-section {
  margin: 2rem 0;
}

.option-card {
  position: relative;
  padding: 2rem 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  background: #ffffff;
  backdrop-filter: blur(15px);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%);
    border-radius: 20px;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  &:hover {
    border-color: #ff0000;
    transform: translateY(-5px) scale(1.02);
    box-shadow:
      0 15px 35px rgba(255, 0, 0, 0.2),
      0 5px 15px rgba(255, 0, 0, 0.1);
    background: #ffffff;

    &::before {
      background: linear-gradient(135deg, rgba(255, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%);
    }
  }

  &.selected {
    background: linear-gradient(135deg, rgba(255, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%);
    border-color: #ff0000;
    box-shadow:
      0 10px 30px rgba(255, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);

    &::before {
      background: linear-gradient(135deg, rgba(255, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.08) 100%);
    }
  }
}

.option-icon {
  margin-bottom: 1rem;
  color: #ff0000;
  position: relative;
  z-index: 1;

  .selected & {
    color: #ff0000;
  }
}

.option-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #000000;
  font-family: 'MiSansMU', sans-serif;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
}

.option-description {
  color: #333333;
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
  color: #ff0000;
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
  .select-card {
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

  .option-card {
    padding: 1.5rem 1rem;
  }

  .option-title {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .select-card {
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

  .option-card {
    padding: 1rem;
  }

  .option-title {
    font-size: 1rem;
  }

  .option-description {
    font-size: 0.85rem;
  }

  .submit-button {
    font-size: 1rem;
    padding: 0.75rem 1.5rem !important;
  }

  .back-button {
    font-size: 0.9rem;
    padding: 0.65rem 1.25rem !important;
  }
}

// Plan Info Modal Styles - Modern Design
.plan-info-content {
  font-family: 'MiSansMU', sans-serif;
  padding: 0.5rem 0;

  .plan-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: linear-gradient(135deg, rgba(255, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%);
    border-radius: 12px;
    margin-bottom: 1.25rem;

    .plan-icon {
      width: 32px;
      height: 32px;
      color: #ff0000;
      margin-right: 0.75rem;
    }

    .plan-name {
      margin: 0;
      font-weight: 700;
      font-size: 1.25rem;
      color: #cc0000;
    }
  }

  .benefits-card {
    background: linear-gradient(135deg, rgba(255, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.08) 100%);
    border-radius: 12px;
    padding: 1.25rem;
    border: 1px solid rgba(255, 0, 0, 0.15);

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

      &.warning {
        background: rgba(255, 193, 7, 0.12);
        border-left-color: #ffc107;
        
        .notice-icon {
          color: #f39c12;
        }
        
        span {
          color: #856404;
          font-weight: 500;
        }

        &:hover {
          background: rgba(255, 193, 7, 0.18);
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

    .cancel-button {
      padding: 0.75rem 1.5rem !important;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 10px !important;
      background: transparent !important;
      border: 2px solid rgba(108, 117, 125, 0.3) !important;
      color: #6c757d !important;
      transition: all 0.3s ease;
      font-family: 'MiSansMU', sans-serif;

      .button-icon {
        width: 18px;
        height: 18px;
        margin-right: 0.5rem;
      }

      &:hover {
        background: rgba(108, 117, 125, 0.1) !important;
        border-color: #6c757d !important;
        color: #495057 !important;
        transform: translateY(-1px);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
}

// Modal Header Customization - Modern
::v-deep #modal-personal-info,
::v-deep #modal-family-info {
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


