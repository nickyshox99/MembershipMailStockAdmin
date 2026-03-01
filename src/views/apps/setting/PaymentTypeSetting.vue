<template>
  <div class="payment-type-setting">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title" style="color: white;">
          <feather-icon icon="CreditCardIcon" class="mr-50" />
          ตั้งค่าประเภทการชำระเงิน
        </h4>
        <p class="card-text">เลือกประเภทการชำระเงินสำหรับระบบ</p>
      </div>
      
      <div class="card-body">
        <!-- Payment Type Selection -->
        <div class="payment-type-selection">
          <h5>เลือกประเภทการชำระเงิน</h5>
          <p class="text-muted mb-3">เลือกประเภทการชำระเงินที่ต้องการใช้ในระบบ</p>
          
          <b-form @submit.prevent="savePaymentType">
            <b-row>
              <b-col md="8">
                <b-form-group label="ประเภทการชำระเงิน" label-for="payment_type">
                  <b-form-select
                    id="payment_type"
                    v-model="selectedPaymentType"
                    :options="paymentTypeOptions"
                    :disabled="readOnlyControl"
                    required
                  />
                  <b-form-text>เลือกประเภทการชำระเงินที่ต้องการใช้</b-form-text>
                </b-form-group>
              </b-col>
              <b-col md="4" class="d-flex align-items-end">
                <b-button 
                  type="submit" 
                  variant="primary" 
                  :disabled="readOnlyControl || isSaving"
                  block
                >
                  <feather-icon icon="SaveIcon" class="mr-50" />
                  {{ isSaving ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง' }}
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </div>

        <!-- Current Status -->
        <div class="current-status mt-4">
          <h6>สถานะปัจจุบัน</h6>
          <div class="status-card">
            <div class="status-info">
              <feather-icon :icon="getStatusIcon()" :class="getStatusClass()" />
              <span class="status-text">
                ประเภทการชำระเงินปัจจุบัน: 
                <strong>{{ getCurrentPaymentTypeName() }}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
  BForm,
  BFormGroup,
  BFormSelect,
  BFormText,
  BButton,
  BRow,
  BCol
} from 'bootstrap-vue'

export default {
  name: 'PaymentTypeSetting',
  components: {
    BForm,
    BFormGroup,
    BFormSelect,
    BFormText,
    BButton,
    BRow,
    BCol
  },
  props: {
    readOnlyControl: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedPaymentType: 'qr',
      currentPaymentType: 'qr',
      isSaving: false,
      paymentTypeOptions: [
        { value: 'qr', text: 'QR Payment' },
        { value: 'stripe', text: 'Stripe Payment' }
      ]
    }
  },
  async created() {
    await this.loadCurrentPaymentType()
  },
  methods: {
    async loadCurrentPaymentType() {
      try {
        // ใช้ localStorage หรือ API เพื่อดึงค่าปัจจุบัน
        // ตอนนี้ใช้ค่าเริ่มต้นเป็น 'qr'
        this.currentPaymentType = localStorage.getItem('selectedPaymentType') || 'qr'
        this.selectedPaymentType = this.currentPaymentType
      } catch (error) {
        console.error('Error loading current payment type:', error)
        this.currentPaymentType = 'qr'
        this.selectedPaymentType = 'qr'
      }
    },

    async savePaymentType() {
      if (this.readOnlyControl) return

      console.log('=== SAVE PAYMENT TYPE DEBUG ===')
      console.log('Selected Payment Type:', this.selectedPaymentType)
      console.log('Current Payment Type:', this.currentPaymentType)

      this.isSaving = true
      try {
        // บันทึกลง localStorage
        localStorage.setItem('selectedPaymentType', this.selectedPaymentType)
        console.log('Saved to localStorage:', this.selectedPaymentType)
        
        // อัปเดตสถานะปัจจุบัน
        this.currentPaymentType = this.selectedPaymentType
        console.log('Updated currentPaymentType:', this.currentPaymentType)

        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'บันทึกการเปลี่ยนแปลงสำเร็จ',
            icon: 'CheckIcon',
            variant: 'success',
          },
        })

        // เรียก API เพื่ออัปเดตการตั้งค่าในระบบ (ถ้ามี)
        await this.updateSystemPaymentType()
        
      } catch (error) {
        console.error('Error saving payment type:', error)
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
            icon: 'AlertCircleIcon',
            variant: 'error',
          },
        })
      } finally {
        this.isSaving = false
      }
    },

    async updateSystemPaymentType() {
      try {
        console.log('=== UPDATE SYSTEM PAYMENT TYPE DEBUG ===')
        console.log('Selected Payment Type for API:', this.selectedPaymentType)
        
        const userData = JSON.parse(localStorage.getItem('userData'))
        const headers = {
          'Content-Type': 'application/json',
          'userid': userData.username,
          'token': userData.token,
        }

        // ใช้ ID 1 สำหรับทั้งคู่
        const paymentTypeId = 1
        console.log('Using Payment Type ID:', paymentTypeId)
        
        const updateData = {
          type_code: this.selectedPaymentType,
          type_name: this.getPaymentTypeName(this.selectedPaymentType)
        }
        console.log('Update Data:', updateData)
        
        // อัปเดต payment type โดยใช้ PUT /api/paymenttype/1
        const response = await axios.put(`/api/paymenttype/${paymentTypeId}`, updateData, { headers })
        console.log('API Response:', response.data)
        
        console.log(`✅ Updated payment type ${this.selectedPaymentType} with ID ${paymentTypeId}`)

      } catch (error) {
        console.error('❌ Error updating system payment type:', error)
        console.error('Error details:', error.response?.data)
        // ไม่แสดง error เพราะการบันทึกใน localStorage สำเร็จแล้ว
      }
    },

    async getPaymentTypeId(typeCode) {
      try {
        console.log('=== GET PAYMENT TYPE ID DEBUG ===')
        console.log('Looking for typeCode:', typeCode)
        
        const userData = JSON.parse(localStorage.getItem('userData'))
        const response = await axios.get('/api/paymenttype', {
          headers: {
            'Content-Type': 'application/json',
            'userid': userData.username,
            'token': userData.token,
          }
        })

        console.log('API Response:', response.data)

        if (response.data.status === 'success') {
          console.log('Payment Types from API:', response.data.data)
          const paymentType = response.data.data.find(pt => pt.type_code === typeCode)
          console.log('Found Payment Type:', paymentType)
          return paymentType ? paymentType.id : null
        }
        return null
      } catch (error) {
        console.error('Error getting payment type ID:', error)
        return null
      }
    },

    getPaymentTypeName(typeCode) {
      const option = this.paymentTypeOptions.find(opt => opt.value === typeCode)
      return option ? option.text : typeCode
    },

    getCurrentPaymentTypeName() {
      const option = this.paymentTypeOptions.find(opt => opt.value === this.currentPaymentType)
      return option ? option.text : 'ไม่ระบุ'
    },

    getStatusIcon() {
      return this.currentPaymentType === 'qr' ? 'QrCodeIcon' : 'CreditCardIcon'
    },

    getStatusClass() {
      return this.currentPaymentType === 'qr' ? 'text-success' : 'text-primary'
    }
  }
}
</script>

<style scoped>
.payment-type-setting {
  padding: 1rem;
}

.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.card-title {
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.card-text {
  margin-bottom: 0;
  opacity: 0.9;
}

.payment-type-selection {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-bottom: 1rem;
}

.current-status {
  background: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.status-card {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  border-left: 4px solid #28a745;
}

.status-info {
  display: flex;
  align-items: center;
}

.status-info .feather-icon {
  margin-right: 0.5rem;
  width: 20px;
  height: 20px;
}

.status-text {
  font-size: 0.95rem;
}

.form-group label {
  font-weight: 600;
  color: #495057;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  font-weight: 500;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  transform: none;
  box-shadow: none;
}

.text-success {
  color: #28a745 !important;
}

.text-primary {
  color: #007bff !important;
}
</style>
