<template>  
    
    <b-modal
            id="modal-key-fine"
            ref="modalKeyFine"
            v-model="showModalPrivate"
            :title="t('Key Fine Information')"            
            @hidden="resetModal"
            @ok="handleOk"      
            size="sm"  
            :hideHeaderClose="false"            
            ok-variant="info"
            :okTitle="t('Save')"
            :cancelTitle="t('Cancel')"
            buttonSize="lg"            
            footerClass="p-2"    
            :hide-footer="readOnlyControl"
        >
            <form ref="form" @submit.stop.prevent="handleOk">
                
                <b-row>
                    <b-col md="6">                                
                        <b-form-group :label="t('Fine Amount')" label-for="fineAmount">
                            <b-input-group class="input-group-merge">
                                <b-input-group-prepend is-text >
                                    <feather-icon icon="CreditCardIcon" />
                                </b-input-group-prepend>
                                <b-form-input id="fineAmount" v-model="paymentInfo.fine_amount" type="number"
                                :readonly="readOnlyControl" />
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-row>         
                 
                <b-row>
                    <b-col md="12">
                        <b-form-group
                            :label="t('Note')"
                            label-for="payment-note-input"                    
                            >
                            <b-form-textarea
                                id="payment-note-input"
                                v-model="paymentInfo.notefine"                
                                rows="3"
                                max-rows="6"
                                
                                :readonly="readOnlyControl"
                            ></b-form-textarea>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="12">
                        <b-form-group
                        :label="t('Note Date')"
                        label-for="payment-note-input"                    
                        >
                            <b-badge style="cursor: pointer; margin-right:2px" variant="info" >                                        
                                        <span class="d-none d-sm-inline">{{  (paymentInfo.notefine_at!=null)?formatDateAssigned(paymentInfo.notefine_at):'-' }}</span>
                            </b-badge>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="12">
                        <b-form-group
                        :label="t('Note By')"
                        label-for="payment-note-input"                    
                        >
                            <b-badge style="cursor: pointer; margin-right:2px" variant="info" >                                        
                                        <span class="d-none d-sm-inline">{{ (paymentInfo.notefine_by!=null)?paymentInfo.notefine_by:'-' }}</span>
                            </b-badge>
                            
                        </b-form-group> 
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="12">
                        <hr/>
                    </b-col>
                </b-row>
                
            </form>
    </b-modal>

  </template>

<script>

import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,BRow, BCol,BButton,BFormDatepicker,BCard,BInputGroup, BInputGroupPrepend,BModal,BImg,BFormTextarea ,BMedia,BFormCheckbox
} from 'bootstrap-vue';
import { VueGoodTable } from 'vue-good-table';
import store from '@/store/index';
import { mapActions } from "vuex";
import Ripple from 'vue-ripple-directive'

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
    BFormCheckbox,
  },   
  directives: {
        Ripple,
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
        readOnlyControl:{
            type: Boolean,
            required: true,
        }
        
    },
  data() {
    const now = new Date();    
    const fDate =now.getFullYear()+'-'+ ('0' + (now.getMonth()+1)).slice(-2) +'-'+ ('0' + (now.getDate())).slice(-2);
    
    return {
        showModalPrivate:false,      
        paymentInfo:[],
        paidDate: fDate,
        total_received_amount:0.00,
        paid:0,

        paymentNoteData:[],
        oldfine_amount:0,
       
    }

  },
  async created() {    
    
  },
  watch: {
        paymentId: async function (newVal, oldVal) {
            if (newVal!='') 
            {
                await this.getLoanPaymentByPaymentId();
                
            }
        },
        showModal: async function (newVal, oldVal) {
            this.showModalPrivate = this.showModal;
        },
        paymentInfo: async function (newVal, oldVal) {
            
        },
        
    },
  methods: {        
    ...mapActions(["GetLoanPaymentByPaymentId"]),
    ...mapActions(["UpdateFinePaymentByPaymentId"]),
    ...mapActions(["UploadFileAndDeleteOldFile"]),  
    ...mapActions(["DeleteOldFile"]), 
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
        this.$emit('close-keyfine-info');
    },
    async handleOk()
    {
        console.log('UpdateFinePaymentByPaymentId');    
        
        const userData = JSON.parse(localStorage.getItem('userData'));

        const formData = new FormData();
        
        formData.append("userid", userData.username);
        formData.append("token", userData.token);
        formData.append("paymentId", this.paymentId);
        formData.append("page_name", this.page_name);

        formData.append("fine_amount", this.paymentInfo.fine_amount);        
        formData.append("notefine", this.paymentInfo.notefine);

        formData.append("total_amount", parseFloat(this.paymentInfo.total_amount) - parseFloat(this.oldfine_amount) + parseFloat(this.paymentInfo.fine_amount));
        
                        
        const response = await this.UpdateFinePaymentByPaymentId(formData);
        if (response.data.status=='success') 
        {         
            this.$toast(
                {
                component: ToastificationContent,
                props: {
                    title: 'Key Fine Information',
                    text: 'Update Information is success',
                    icon: 'EditIcon',
                    variant: 'success',
                },
            });
            this.$emit('close-keyfine-info');
        }
        else
        {
            this.$toast(
                {
                component: ToastificationContent,
                props: {
                    title: 'Key Fine Information',
                    icon: 'EditIcon',
                    variant: 'error',
                    text: response.data.message,
                },
            });
        }

        
    },
    async getLoanPaymentByPaymentId() {
        console.log('getLoanPaymentByPaymentId');    
        
        const userData = JSON.parse(localStorage.getItem('userData'));

        const formData = new FormData();
        
        formData.append("userid", userData.username);
        formData.append("token", userData.token);

        formData.append("paymentId", this.paymentId);
        
        const response = await this.GetLoanPaymentByPaymentId(formData);
        if (response.data.status=='success') 
        {         
            this.paymentInfo = response.data.data;

            this.paymentNoteData = response.data.data;
            this.oldfine_amount = response.data.data.fine_amount;
            
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
    uploadFile2(tmpName) {                                    
            this.tmpFileUpload2[tmpName] = this.$refs[tmpName].files[0];            
            //console.log(this.tmpFileUpload2[tmpName]); 
    },
    async submitFile2(tmpName) {                       
        console.log('submitFile2');

        if (this.tmpFileUpload2[tmpName]==null) 
        {
            this.$toast(
            {
                component: ToastificationContent,
                props: {
                title: 'No file for upload.',
                icon: 'EditIcon',
                variant: 'error',
                },
            });
            return;    
        }
        
        const userData = JSON.parse(localStorage.getItem('userData'));
        const formData = new FormData();

        formData.append("userid", userData.username);
        formData.append("token", userData.token);

        formData.append("file", this.tmpFileUpload2[tmpName]);
        formData.append("tofilename", tmpName);
        formData.append("oldFilePath", this[tmpName]);
        
        const response = await this.UploadFileAndDeleteOldFile(formData);
        if (response.data.status == 'success') 
        {                 
            this[tmpName] = response.data.url;
            this.tmpFileUpload2[tmpName] = null;

            const pageValue = this.paymentNotePage;

            console.log(this.paymentNotePage);

            this.paymentNoteData['ref_img'+pageValue] = response.data.url;
            this.paymentNoteData['note'+pageValue+'_at'] = new Date();
            this.paymentNoteData['note'+pageValue+'_by'] = userData.username;

            this.paymentRefImg = response.data.url;            
            this.paymentNoteAt = this.formatDateAssigned(new Date());
            this.paymentNoteBy = userData.username;
        }
        else {
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
    async deleteFile(tmpName)
    {
        console.log('deleteFile');
        
        const userData = JSON.parse(localStorage.getItem('userData'));
        const formData = new FormData();

        formData.append("userid", userData.username);
        formData.append("token", userData.token);

        formData.append("oldFilePath", this[tmpName]);            
        
        const response = await this.DeleteOldFile(formData);
        if (response.data.status == 'success') 
        {                 
            
        }
        else {
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

        this[tmpName] = "";
        
    },
    
  },
}

</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>