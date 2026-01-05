<template>
  <div class="select-customer-email-container">
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
            <h3 class="welcome-title">เลือกวิธีการซื้อ</h3>
            <p class="welcome-subtitle">กรุณาเลือกวิธีการที่คุณต้องการ</p>
          </div>

          <div class="options-section" v-if="!isLoading">
            <b-row class="option-row">
              <b-col v-if="showUserCode" cols="12" :md="getColumnSize" class="option-col">
                <div class="option-card" :class="{ 'selected': selectedType === 'personal' }"
                  @click="selectType('personal')">
                  <div class="option-icon">
                    <feather-icon icon="UserIcon" size="48" />
                  </div>
                  <h4 class="option-title">Personal</h4>
                  <p class="option-description">
                    แพ็กเก็จสำหรับใช้งานส่วนบุคคล
                  </p>
                  <p class="option-description" v-if="!useOldUserIdInviteStockFamily">                    
                    (มีสินค้าเหลืออีก {{ remainInviteStockFamily }} รายการ)
                  </p>
                  <p class="option-description" v-if="useOldUserIdInviteStockFamily">                    
                    (ต่ออายุใช้ User เดิม)
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
                  <h4 class="option-title">Family</h4>
                  <p class="option-description">
                    แพ็กเก็จสำหรับใช้งานแบบครอบครัว
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
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BButton,
  BSpinner,
} from 'bootstrap-vue'
import axios from 'axios'
import { mapActions } from "vuex";

export default {
  name: 'SelectCustomerEmail',
  components: {
    BCard,
    BRow,
    BCol,
    BButton,
    BSpinner,
  },
  data() {
    return {
      selectedType: null, // 'personal' หรือ 'email'
      sourceUserId: null, // รับมาจาก LINE
      showUserCode: true, // แสดงปุ่มรหัสตัวเอง
      showUserEmail: true, // แสดงปุ่มเมลตัวเอง
      isLoading: true, // สถานะการโหลดข้อมูล
      useOldUserIdInviteStockFamily: false,
      remainInviteStockFamily: 0,
    }
  },
  computed: {
    getColumnSize() {
      // คำนวณขนาดคอลัมน์ตามจำนวนปุ่มที่แสดง
      const visibleButtons = [this.showUserCode, this.showUserEmail].filter(Boolean).length
      if (visibleButtons === 1) return 12
      return 6 // 2 ปุ่ม
    },
  },
  async mounted() {
    // รับ sourceUserId จาก query parameters
    if (this.$route.query.sourceUserId) {
      this.sourceUserId = this.$route.query.sourceUserId
      console.log('SelectCustomerEmail - sourceUserId received:', this.sourceUserId)
    } else {
      console.log('SelectCustomerEmail - No sourceUserId in query parameters')
    }

    await this.checkRemainInviteStockFamily();
    // โหลดสถานะการแสดงปุ่ม
    this.fetchButtonStatus()
  },
  methods: {
    ...mapActions(["CheckRemainInviteStockFamily"]),
    async checkRemainInviteStockFamily() {
      const formData = new FormData();
      formData.append("userid", this.sourceUserId);
      const response = await this.CheckRemainInviteStockFamily(formData);
      if (response.data.status == 'success') {
        if (response.data.data.use_old_id == 1) {
          this.useOldUserIdInviteStockFamily = true;
          this.remainInviteStockFamily = response.data.data.remain;
        }
        else {
          this.useOldUserIdInviteStockFamily = false;
          this.remainInviteStockFamily = response.data.data.remain;
        }
      }
    },
    async fetchButtonStatus() {
      try {
        const response = await axios.get('/api/btnStatus/GetBtnStatus')
        if (response.data.status === 'success' && response.data.data.length > 0) {
          const btnStatus = response.data.data[0]
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
      
      if (!this.useOldUserIdInviteStockFamily && this.remainInviteStockFamily == 0) {
        //show toast message
        this.$toast.error('สินค้าหมด กรุณาติดต่อเจ้าหน้าที่');
        return;
      }
      
      // นำทางตาม type ที่เลือก
      this.navigateToNextPage()
    },
    navigateToNextPage() {
      if (this.selectedType === 'personal') {
        // นำไปหน้าลงทะเบียนด้วยรหัสตัวเอง พร้อมส่ง sourceUserId
        const query = { type: 'personal' }
        if (this.sourceUserId) {
          query.sourceUserId = this.sourceUserId
        }
        console.log('SelectCustomerEmail - Navigating to user-regis with query:', query)
        this.$router.push({ name: 'user-regis', query })
      } else if (this.selectedType === 'email') {
        // นำไปหน้ากรอกเมลตัวเอง พร้อมส่ง sourceUserId
        const query = { type: 'email' }
        if (this.sourceUserId) {
          query.sourceUserId = this.sourceUserId
        }
        console.log('SelectCustomerEmail - Navigating to registeremail with query:', query)
        this.$router.push({ name: 'registeremail', query })
      }
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
.select-customer-email-container {
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
  max-width: 900px;
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
    color: #333333;
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
</style>

