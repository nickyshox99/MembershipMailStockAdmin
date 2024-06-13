<template>  
    
    <b-modal
            id="modal-key-payment"
            ref="modalKeyPayment"
            v-model="showModalPrivate"
            :title="t('Key Paid Information')"            
            @hidden="resetModal"
            @ok="handleOk"      
            size="lg"  
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
                    <b-col md="12">
                        <b-form-checkbox
                            id="chkPaid"
                            :checked="paid"
                            v-model="paid"
                            name="check-button-checkpaid"
                            switch
                            inline
                            :disabled="readOnlyControl"
                        >
                            <span>{{t('Paid')}}</span>
                        </b-form-checkbox>
                    </b-col> 
                </b-row>
                <b-row>
                    <b-col md="12">
                        <hr/>
                    </b-col>
                </b-row>
                <b-row>           
                    <b-col md="6">                                
                        <b-form-group :label="t('Paid Date')" label-for="paidDate">
                            <b-form-datepicker id="paidDate" :readonly="readOnlyControl" v-model="paidDate" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="th"></b-form-datepicker>
                        </b-form-group>
                    </b-col>
                    <b-col md="6">                                
                        <b-form-group :label="t('Receive Amount')" label-for="receiveAmount">
                            <b-input-group class="input-group-merge">
                                <b-input-group-prepend is-text >
                                    <feather-icon icon="CreditCardIcon" />
                                </b-input-group-prepend>
                                <b-form-input id="receiveAmount" v-model="total_received_amount" type="number"
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
                                v-model="paymentRefNote"                
                                rows="3"
                                max-rows="6"
                                @input="noteChange"
                                :readonly="readOnlyControl"
                            ></b-form-textarea>
                        </b-form-group>
                    </b-col>
                </b-row>

                
                <b-row>
                    <b-col md="12">
                        <b-form-group 
                            :label="t('Attach File')"
                            label-for="payment-note-img1"                    
                        >   
                            <b-img src="/images/noimage.jpg" fluid thumbnail style="height: 200px;" v-if="paymentRefImg.length<=0" />
                            <a target="_blank" :href="paymentRefImg" v-if="paymentRefImg.length>0">
                                <b-img :src="paymentRefImg" fluid thumbnail style="height: 200px;" /><br/>
                            </a>
                            <br/>
                            <input type="file" @change="uploadFile2('paymentRefImg')" ref="paymentRefImg" v-if="paymentRefImg.length<=0 && !readOnlyControl">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile2('paymentRefImg')" v-if="paymentRefImg.length<=0 && !readOnlyControl">
                                Upload
                            </b-button>
                            <b-badge style="cursor: pointer; margin-right:2px" variant="warning" v-if="paymentRefImg.length>0 && !readOnlyControl" @click="deleteFile('paymentRefImg')" >
                                    <feather-icon icon="XSquareIcon" size="16" class="mr-0 mr-sm-50" />                                                    
                            </b-badge>
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
                                        <span class="d-none d-sm-inline">{{ paymentNoteAt }}</span>
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
                                        <span class="d-none d-sm-inline">{{ paymentNoteBy }}</span>
                            </b-badge>
                            
                        </b-form-group> 
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="12">
                        <hr/>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="12">
                        <b-pagination :value="paymentNotePage" :total-rows="4" :per-page="1" first-number last-number
                                align="right" prev-class="prev-item" next-class="next-item" class="mt-1 mb-0"
                                @input="(value) => paymentNoteChange(value)"
                        >
                                <template #prev-text>
                                    <feather-icon icon="ChevronLeftIcon" size="18" />
                                </template>
                                <template #next-text>
                                    <feather-icon icon="ChevronRightIcon" size="18" />
                                </template>
                        </b-pagination>
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

        paymentRefImg:'',
        paymentRefNote:'',
        paymentNoteAt:'',
        paymentNoteBy:'',

        paymentNotePage:1,

        tmpFileUpload2:[],
    }

  },
  async created() {    
    
  },
  watch: {
        paymentId: async function (newVal, oldVal) {
            if (newVal!='') 
            {
                await this.getLoanPaymentByPaymentId();
                this.paymentNotePage=1;
                this.paymentNoteChange(1);
            }
        },
        showModal: async function (newVal, oldVal) {
            this.showModalPrivate = this.showModal;
        },
        paymentInfo: async function (newVal, oldVal) {
            if(newVal.paid_at!=null)
            {
                this.paidDate = this.formatDateAssigned2(newVal.paid_at);
            }
            this.paid = newVal.paid;
            this.total_received_amount = newVal.total_received_amount;

        },
        
    },
  methods: {        
    ...mapActions(["GetLoanPaymentByPaymentId"]),
    ...mapActions(["UpdateLoanPaymentByPaymentId"]),
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
        this.$emit('close-keypayment-info');
    },
    async handleOk()
    {
        console.log('UpdateLoanPaymentByPaymentId');    
        
        const userData = JSON.parse(localStorage.getItem('userData'));

        const formData = new FormData();
        
        formData.append("userid", userData.username);
        formData.append("token", userData.token);
        formData.append("paymentId", this.paymentId);
        formData.append("page_name", this.page_name);

        formData.append("total_received_amount", this.total_received_amount);
        formData.append("paid", this.paid);
        formData.append("paid_at", this.paidDate);

        const tmpPaymentNoteData = this.paymentNoteData;

        formData.append("ref_img1", tmpPaymentNoteData['ref_img1']);
        formData.append("note1", tmpPaymentNoteData['note1']);
        formData.append("note1_at", tmpPaymentNoteData['note1_at']);
        formData.append("note1_by", tmpPaymentNoteData['note1_by']);

        formData.append("ref_img2", tmpPaymentNoteData['ref_img2']);
        formData.append("note2", tmpPaymentNoteData['note2']);
        formData.append("note2_at", tmpPaymentNoteData['note2_at']);
        formData.append("note2_by", tmpPaymentNoteData['note2_by']);

        formData.append("ref_img3", tmpPaymentNoteData['ref_img3']);
        formData.append("note3", tmpPaymentNoteData['note3']);
        formData.append("note3_at", tmpPaymentNoteData['note3_at']);
        formData.append("note3_by", tmpPaymentNoteData['note3_by']);

        formData.append("ref_img4", tmpPaymentNoteData['ref_img4']);
        formData.append("note4", tmpPaymentNoteData['note4']);
        formData.append("note4_at", tmpPaymentNoteData['note4_at']);
        formData.append("note4_by", tmpPaymentNoteData['note4_by']);
        
        const response = await this.UpdateLoanPaymentByPaymentId(formData);
        if (response.data.status=='success') 
        {         
            this.$toast(
                {
                component: ToastificationContent,
                props: {
                    title: 'Key Paid Information',
                    text: 'Update Information is success',
                    icon: 'EditIcon',
                    variant: 'success',
                },
            });
            this.$emit('close-keypayment-info');
        }
        else
        {
            this.$toast(
                {
                component: ToastificationContent,
                props: {
                    title: 'Key Paid Information',
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
    paymentNoteChange(pageValue)
    {
        this.paymentNotePage = pageValue;
        const tmpPaymentNoteData = this.paymentNoteData;
                
        this.paymentRefImg = tmpPaymentNoteData['ref_img'+pageValue]!=''?tmpPaymentNoteData['ref_img'+pageValue]:'';
        this.paymentRefNote = tmpPaymentNoteData['note'+pageValue]!=''?tmpPaymentNoteData['note'+pageValue]:'';
        this.paymentNoteAt = tmpPaymentNoteData['note'+pageValue+'_at']!=null?this.formatDateAssigned(tmpPaymentNoteData['note'+pageValue+'_at']):'';
        this.paymentNoteBy = tmpPaymentNoteData['note'+pageValue+'_by']!=''?tmpPaymentNoteData['note'+pageValue+'_by']:'';

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
    noteChange()
    {
        const pageValue =this.paymentNotePage;
        this.paymentNoteData['note'+pageValue]= this.paymentRefNote;
    },
  },
}

</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>