<template>
  <div class="select-topic-container">
    <div class="select-background">
      <div class="background-overlay"></div>
    </div>
    
    <div class="auth-wrapper auth-v1 px-2">
      <div class="auth-inner py-2">
        <b-card class="select-card mb-0">
          <div class="logo-section">
            <img src="/logo_lb2.png" alt="littlebeem" class="logo-image">
            <h2 class="brand-text">
              littlebeem
            </h2>
          </div>

          <div class="welcome-section">
            <h3 class="welcome-title">เลือกประเภทการซื้อสินค้า</h3>
            <p class="welcome-subtitle">กรุณาเลือกประเภทที่คุณต้องการ</p>
          </div>

          <div class="options-section">
            <b-row>
              <b-col cols="12" md="6" class="mb-3 mb-md-0">
                <div 
                  class="option-card"
                  :class="{ 'selected': selectedType === 'shop' }"
                  @click="selectType('shop')"
                >
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

              <b-col cols="12" md="6">
                <div 
                  class="option-card"
                  :class="{ 'selected': selectedType === 'personal' }"
                  @click="selectType('personal')"
                >
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
            </b-row>
          </div>

          <div class="submit-section mt-3">
            <b-button
              variant="primary"
              block
              class="submit-button"
              :disabled="!selectedType"
              @click="handleConfirm"
            >
              <feather-icon icon="ArrowRightIcon" class="button-icon" />
              ดำเนินการต่อ
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
} from 'bootstrap-vue'

export default {
  name: 'SelectTopic',
  components: {
    BCard,
    BRow,
    BCol,
    BButton,
  },
  data() {
    return {
      selectedType: null, // 'shop' หรือ 'personal'
    }
  },
  methods: {
    selectType(type) {
      this.selectedType = type
    },
    handleConfirm() {
      if (this.selectedType === 'shop') {
        // นำไปหน้าซื้อแบบรหัสร้าน
        this.$router.push({ name: 'buy-product', query: { type: 'shop' } })
      } else if (this.selectedType === 'personal') {
        // นำไปหน้าลงทะเบียนด้วยรหัสตัวเอง
        this.$router.push({ name: 'user-regis' })
      }
    },
  },
}
</script>

<style lang="scss">
// Pastel Theme - Matching BuyProduct.vue
.select-topic-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #F8BBD9 0%, #FDD5B4 25%, #FFF2CC 50%, #E1F5FE 75%, #BBDEFB 100%);
  font-family: 'MiSansMU', sans-serif;
}

.select-background {
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
  max-width: 900px;
  margin: 0 auto;
}

.select-card {
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

.welcome-section {
  text-align: center;
  margin-bottom: 2rem;

  .welcome-title {
    color: #87ceeb;
    font-family: 'MiSansMU', sans-serif;
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .welcome-subtitle {
    color: #333333;
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
  border: 2px solid rgba(255, 182, 193, 0.3);
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(15px);
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
    box-shadow: 
      0 10px 30px rgba(255, 105, 180, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    
    &::before {
      background: linear-gradient(135deg, rgba(255, 182, 193, 0.3) 0%, rgba(135, 206, 235, 0.2) 100%);
    }
  }
}

.option-icon {
  margin-bottom: 1rem;
  color: #ff69b4;
  position: relative;
  z-index: 1;
  
  .selected & {
    color: #ff69b4;
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
  color: #98fb98;
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
  background: linear-gradient(135deg, #ff69b4 0%, #ff1493 100%) !important;
  border: none !important;
  color: #ffffff !important;
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4);
  transition: all 0.3s ease;
  font-family: 'MiSansMU', sans-serif;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 105, 180, 0.5) !important;
    background: linear-gradient(135deg, #ff1493 0%, #dc143c 100%) !important;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .button-icon {
    width: 18px;
    height: 18px;
    margin-right: 0.5rem;
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
}
</style>

