<template>
    <b-modal
      :visible="isActive"
      title="Upload QR Code"
      hide-footer
      @hidden="closeModal"
    >
      <b-form @submit.prevent="uploadQR">
        <b-row>
          <b-col md="12">
            <b-form-group label="Bank Account">
              <b-form-input
                :value="bankAccountNumber"
                disabled
              />
            </b-form-group>
          </b-col>
  
          <b-col md="12">
            <b-form-group label="QR Code Image">
              <b-form-file
                v-model="qrFile"
                accept="image/png, image/jpg, image/jpeg"
                placeholder="Choose QR image..."
                @change="onFileChange"
              />
            </b-form-group>
          </b-col>
  
          <b-col md="12" v-if="qrPreview">
            <b-form-group label="Preview">
              <img 
                :src="qrPreview" 
                style="max-width: 100%; max-height: 300px; border: 1px solid #ddd; padding: 10px;"
                alt="QR Preview"
              />
            </b-form-group>
          </b-col>
  
          <b-col md="12">
            <b-button
              variant="primary"
              type="submit"
              :disabled="!qrFile"
            >
              <feather-icon icon="UploadIcon" />
              Upload
            </b-button>
            
            <b-button
              variant="outline-secondary"
              class="ml-1"
              @click="closeModal"
            >
              <feather-icon icon="XIcon" />
              Cancel
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
  </template>
  
  <script>
  import {
    BModal, BForm, BRow, BCol, BFormGroup, BFormInput, BFormFile, BButton
  } from 'bootstrap-vue'
  import axios from 'axios'
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
  import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
  
  export default {
    name: 'AdminBankQRUpload',
    components: {
      BModal,
      BForm,
      BRow,
      BCol,
      BFormGroup,
      BFormInput,
      BFormFile,
      BButton,
      FeatherIcon,
    },
    props: {
      isActive: {
        type: Boolean,
        required: true,
      },
      rowData: {
        type: Object,
        required: false,
      },
    },
    data() {
      return {
        qrFile: null,
        qrPreview: null,
      }
    },
    computed: {
      bankAccountNumber() {
        return this.rowData?.bank_acc_number || '';
      },
    },
    methods: {
      onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          // Validate file type
          const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
          if (!validTypes.includes(file.type)) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Invalid File Type',
                icon: 'AlertTriangleIcon',
                variant: 'danger',
                text: 'Please upload PNG or JPG image only.',
              },
            });
            return;
          }
  
          // Create preview
          const reader = new FileReader();
          reader.onload = (e) => {
            this.qrPreview = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
  
      async uploadQR() {
        if (!this.qrFile || !this.rowData) return;
  
        const userData = JSON.parse(localStorage.getItem('userData'));
        const formData = new FormData();
  
        formData.append('userid', userData.username);
        formData.append('token', userData.token);
        formData.append('id', this.rowData.id);
        formData.append('bank_acc_number', this.rowData.bank_acc_number);
        formData.append('qr_image', this.qrFile);
  
        try {
          const response = await axios.post('api/adminbank/uploadqr', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'userid': userData.username,
              'token': userData.token,
            },
          });
  
          if (response.data.status === 'success') {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                variant: 'success',
                text: 'QR Code uploaded successfully.',
              },
            });
            
            this.$emit('refetch-data');
            this.closeModal();
          } else {
            throw new Error(response.data.message);
          }
        } catch (error) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Upload Failed',
              icon: 'XIcon',
              variant: 'danger',
              text: error.message || 'Failed to upload QR code.',
            },
          });
        }
      },
  
      closeModal() {
        this.qrFile = null;
        this.qrPreview = null;
        this.$emit('close');
      },
    },
  }
  </script>