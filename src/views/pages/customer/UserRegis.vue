<template>
  <div class="user-regis-container">
    <div class="user-regis-background">
      <div class="background-overlay"></div>
    </div>
    
    <div class="auth-wrapper auth-v1 px-2">
      <div class="auth-inner py-2">
        <b-card class="user-regis-card mb-0">
          <div class="logo-section">
            <img src="/logo_lb2.png" alt="littlebeem" class="logo-image">
            <h2 class="brand-text">
              littlebeem
            </h2>
          </div>

          <div class="welcome-section">
            <h3 class="welcome-title">ลงทะเบียนด้วยรหัสตัวเอง</h3>
            <p class="welcome-subtitle">กรุณากรอกข้อมูลของคุณเพื่อเริ่มต้นใช้งาน</p>
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

              <!-- Password Input -->
              <b-form-group label-for="password" class="form-group-modern">
                <label for="password" class="form-label">
                  <feather-icon icon="LockIcon" class="label-icon" />
                  Password
                </label>
                <b-input-group class="input-group-merge">
                  <b-form-input
                    id="password"
                    v-model="password"
                    :type="passwordFieldType"
                    placeholder="กรุณากรอกรหัสผ่าน"
                    class="form-input-modern"
                    :state="passwordState"
                    required
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      :icon="passwordToggleIcon"
                      class="cursor-pointer"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <b-form-invalid-feedback :state="passwordState">
                  รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร
                </b-form-invalid-feedback>
              </b-form-group>

              <!-- Confirm Password Input -->
              <b-form-group label-for="confirm-password" class="form-group-modern">
                <label for="confirm-password" class="form-label">
                  <feather-icon icon="LockIcon" class="label-icon" />
                  Confirm Password
                </label>
                <b-input-group class="input-group-merge">
                  <b-form-input
                    id="confirm-password"
                    v-model="confirmPassword"
                    :type="confirmPasswordFieldType"
                    placeholder="ยืนยันรหัสผ่านอีกครั้ง"
                    class="form-input-modern"
                    :state="confirmPasswordState"
                    required
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      :icon="confirmPasswordToggleIcon"
                      class="cursor-pointer"
                      @click="toggleConfirmPasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <b-form-invalid-feedback :state="confirmPasswordState">
                  รหัสผ่านไม่ตรงกัน
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
                  ลงทะเบียน
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
  BInputGroup,
  BInputGroupAppend,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  name: 'UserRegis',
  components: {
    BCard,
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BInputGroup,
    BInputGroupAppend,
  },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      passwordFieldType: 'password',
      confirmPasswordFieldType: 'password',
      errorMessage: '',
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    confirmPasswordToggleIcon() {
      return this.confirmPasswordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    emailState() {
      if (this.email === '') return null
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(this.email)
    },
    passwordState() {
      if (this.password === '') return null
      return this.password.length >= 6
    },
    confirmPasswordState() {
      if (this.confirmPassword === '') return null
      return this.password === this.confirmPassword
    },
    isFormValid() {
      return (
        this.emailState === true &&
        this.passwordState === true &&
        this.confirmPasswordState === true
      )
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    toggleConfirmPasswordVisibility() {
      this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password'
    },
    handleSubmit() {
      if (!this.isFormValid) {
        this.errorMessage = 'กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง'
        return
      }

      this.errorMessage = ''

      // TODO: เรียก API สำหรับลงทะเบียน
      console.log('Register with:', {
        email: this.email,
        password: this.password,
      })

      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'ลงทะเบียนสำเร็จ',
          icon: 'CheckIcon',
          variant: 'success',
        },
      })

      // นำไปหน้าซื้อสินค้าพร้อมข้อมูล email
      this.$router.push({
        name: 'buy-product',
        query: { 
          type: 'personal',
          email: this.email 
        }
      })
    },
    goBack() {
      this.$router.push({ name: 'select-topic' })
    },
  },
}
</script>

<style lang="scss">
// Pastel Theme - Matching SelectTopic.vue
.user-regis-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #F8BBD9 0%, #FDD5B4 25%, #FFF2CC 50%, #E1F5FE 75%, #BBDEFB 100%);
  font-family: 'MiSansMU', sans-serif;
}

.user-regis-background {
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
  margin: 0 auto;
}

.user-regis-card {
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
        color: #ff69b4;
      }
    }

    .form-input-modern {
      border: 2px solid rgba(255, 182, 193, 0.3);
      border-radius: 12px;
      padding: 0.75rem 1rem;
      font-family: 'MiSansMU', sans-serif;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.9);

      &:focus {
        border-color: #ff69b4;
        box-shadow: 0 0 0 0.2rem rgba(255, 105, 180, 0.25);
        background: white;
      }

      &::placeholder {
        color: #999;
      }
    }

    .input-group-merge {
      .form-input-modern {
        border-right: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      .input-group-append {
        border: 2px solid rgba(255, 182, 193, 0.3);
        border-left: none;
        border-radius: 0 12px 12px 0;
        background: rgba(255, 255, 255, 0.9);
        padding: 0 1rem;
        display: flex;
        align-items: center;
        transition: all 0.3s ease;

        .feather-icon {
          color: #ff69b4;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            color: #ff1493;
            transform: scale(1.1);
          }
        }
      }

      &:focus-within {
        .input-group-append {
          border-color: #ff69b4;
        }
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
}

.back-section {
  .back-button {
    padding: 0.75rem 1.5rem !important;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 12px !important;
    background: transparent !important;
    border: 2px solid rgba(255, 182, 193, 0.5) !important;
    color: #ff69b4 !important;
    transition: all 0.3s ease;
    font-family: 'MiSansMU', sans-serif;

    &:hover {
      background: rgba(255, 182, 193, 0.1) !important;
      border-color: #ff69b4 !important;
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
  .user-regis-card {
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
  .user-regis-card {
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
</style>
