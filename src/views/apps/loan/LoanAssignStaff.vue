<template>  
    
    <b-modal
            id="modal-assign-staff"
            ref="modalAssignStaff"
            v-model="showModalPrivate"
            :title="t('Assign Staff')"
            
            @hidden="resetModal"
            @ok="handleOk"      
            size="sm"  
            :hideHeaderClose="false"            
            ok-variant="info"
            :okTitle="t('Save')"
            :cancelTitle="t('Cancel')"
            buttonSize="lg"            
            footerClass="p-2"            
        >
            <form ref="form" @submit.stop.prevent="handleOk">                
                <b-row>                               
                  <b-col md="12">                                
                      <b-form-group :label="t('Assign To')" label-for="assignto">
                          <b-input-group class="input-group-merge">
                              <b-input-group-prepend is-text>
                                  <feather-icon icon="UserIcon" />
                              </b-input-group-prepend>
                              <b-form-select id="assignto-selected" v-model="adminSelected" :options="adminOptions" ></b-form-select>
                          </b-input-group>
                      </b-form-group>
                  </b-col>
                </b-row>
            </form>
    </b-modal>

  </template>

<script>

import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,BRow, BCol,BButton,BFormDatepicker,BCard,BInputGroup, BInputGroupPrepend,BModal,BImg,BFormTextarea ,BMedia
} from 'bootstrap-vue';
import { VueGoodTable } from 'vue-good-table';
import store from '@/store/index';
import { mapActions } from "vuex";

import axios from "axios";

import { useUtils as useI18nUtils } from '@core/libs/i18n'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { ref, onUnmounted } from '@vue/composition-api'

export default {
  components: {
    BRow,
    BCol,    
    VueGoodTable,
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BButton, 
    BFormDatepicker,   
    BCard,
    BInputGroup,    
    BInputGroupPrepend,
    
    BModal,
    BImg,        
    BFormTextarea,
    BMedia,
    ToastificationContent,
  },   
  setup() {
    const { t } = useI18nUtils();

    return {
      t,      
    }
  },
  props: {
        showModal: {
            type: Boolean,
            required: true,
        },        
        paymentId: {
            type: Number,
            required: false,
        },
        page_name:{
            type: String,
            required: false,
        },
        oldstaft_id:{
            type: String,
            required: false,
        }
    },
  data() {
    
    return {
      deptorInfo: [],
      showModalPrivate:false,      
      adminData:[],
      adminSelected:"",      
      adminOptions: [{
                value: "",
                text: 'Select Staff'
            }, ],
    }

  },
  async created() {    
    
    await this.getAllAdminActive();
  },
  watch: {
        paymentId: async function (newVal, oldVal) {
            if (newVal!='') 
            {
                
            }
        },
        showModal: async function (newVal, oldVal) {
            this.showModalPrivate = this.showModal;
        },
        oldstaft_id: async function (newVal, oldVal) {
            if (newVal!='') 
            {
                this.adminSelected = newVal;
            }
        },
    },
  methods: {        
    ...mapActions(["GetAllAdminActive"]),
    ...mapActions(["AssignPaymentById"]),    
    formatDateAssigned(value) {
            let formattedDate = new Date(value);
            formattedDate = new Date(formattedDate.getTime() - 3600000); // 60 * 60 * 1000 * 1
            return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });
        },
    formatDateAssigned2(value) {
            let formattedDate = new Date(value);
            formattedDate = new Date(formattedDate.getTime() - 3600000); // 60 * 60 * 1000 * 1
            return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2);
    },    
    resolveStatusVariant(inStatus) {            
            if (inStatus === 1) return 'success'
            if (inStatus === 0) return 'warning'
            return ''
        },
    resolveStatusText(inStatus) {            
        if (inStatus === 1) return 'Active'
        if (inStatus === 0) return 'InActive'
        return ''
    },
    resetModal()
    {
        this.showModalPrivate = false;
        this.$emit('close-assign-info');
    },
    async handleOk()
    {
        console.log('AssignPaymentById');    
        
        const userData = JSON.parse(localStorage.getItem('userData'));

        const formData = new FormData();
        
        formData.append("userid", userData.username);
        formData.append("token", userData.token);
        formData.append("paymentId", this.paymentId);
        formData.append("page_name", this.page_name);
        formData.append("assign_to", this.adminSelected);
        
        
        const response = await this.AssignPaymentById(formData);
        if (response.data.status=='success') 
        {         
            this.$toast(
                {
                component: ToastificationContent,
                props: {
                    title: 'Assign To',
                    text: 'Assign to '+this.adminSelected + ' is success',
                    icon: 'EditIcon',
                    variant: 'success',
                },
            });
            this.$emit('close-assign-info');
        }
        else
        {
            this.$toast(
                {
                component: ToastificationContent,
                props: {
                    title: 'Assign To',
                    icon: 'EditIcon',
                    variant: 'error',
                    text: response.data.message,
                },
            });
        }

        
    },
    async getAllAdminActive() {
        console.log('getAllAdminActive');    
        
        const userData = JSON.parse(localStorage.getItem('userData'));

        const formData = new FormData();
        
        formData.append("userid", userData.username);
        formData.append("token", userData.token);
        
        const response = await this.GetAllAdminActive(formData);
        if (response.data.status=='success') 
        {         
            const tmpAdminData =response.data.data;
            let tmpArray = [];
            tmpAdminData.forEach(element => {
                tmpArray.push({
                    value: element.adminName,
                    text: element.fullName
                });
            });

            this.adminData = tmpAdminData;
            this.adminOptions = tmpArray;
            this.adminSelected = tmpArray[0].value;
            
        }
        else
        {
            this.$toast(
                {
                component: ToastificationContent,
                props: {
                    title: response.data.message,
                    icon: 'EditIcon',
                    variant: 'error',
                },
            });
        }

    },
  },
}

</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>