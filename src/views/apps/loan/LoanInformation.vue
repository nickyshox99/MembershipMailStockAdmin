<template>  
    
    <b-modal
            id="modal-payment-note"
            ref="modalPaymentNote"
            v-model="showModalPrivate"
            :title="t('Deptor Info')"
            
            @hidden="resetModal"
            @ok="handleOk"      
            size="lg"  
            :hideHeaderClose="false"            
            ok-variant="info"
            :okTitle="t('Close')"
            buttonSize="lg"            
            footerClass="p-2"
            ok-only
        >
            <form ref="form" @submit.stop.prevent="handleOk">
                <b-row>
                      <b-col md="12">
                          <b-media class="mb-2">
                                <template #aside>
                                    <b-avatar ref="previewEl" :src="deptorInfo.img_url" :text="deptorInfo.fullname" size="90px" rounded />
                                </template>
                                <h4 class="mb-1">
                                    {{ deptorInfo.fullname }}
                                </h4>
                                <h4 class="mb-1">
                                    {{ deptorInfo.id }}
                                </h4>
                                <b-badge
                                    pill
                                    :variant="`light-${this.resolveStatusVariant(deptorInfo.status)}`"
                                    class="text-capitalize"
                                >
                                    {{t(this.resolveStatusText(deptorInfo.status))}}
                                </b-badge>
                                <div class="d-flex flex-wrap">

                                </div>
                            </b-media>
                      </b-col>
                </b-row>

                <b-row>                               
                  <b-col md="6">                                
                      <b-form-group :label="t('Fullname')" label-for="fullname">
                          <b-input-group class="input-group-merge">
                              <b-input-group-prepend is-text>
                                  <feather-icon icon="UserIcon" />
                              </b-input-group-prepend>
                              <b-form-input
                                  id="fullname" v-model="deptorInfo.fullname" readonly
                              />
                          </b-input-group>
                      </b-form-group>
                  </b-col>

                  <b-col md="6">                                
                      <b-form-group :label="t('Mobile No')"  label-for="mobile_no">
                          <b-input-group class="input-group-merge">
                              <b-input-group-prepend is-text>
                                  <feather-icon icon="SmartphoneIcon" />
                              </b-input-group-prepend>
                              <b-form-input id="mobile_no" v-model="deptorInfo.mobile_no"  readonly/>
                          </b-input-group>
                      </b-form-group>
                  </b-col>

                </b-row>

                <b-row>
                    <b-col md="6">                                
                        <b-form-group :label="t('Register Date')" label-for="register_date">
                            <b-input-group class="input-group-merge">
                                <b-input-group-prepend is-text >
                                    <feather-icon icon="CalendarIcon" />
                                </b-input-group-prepend>
                                <b-form-input id="register_date" :value="formatDateAssigned(deptorInfo.create_at)" readonly />
                            </b-input-group>
                        </b-form-group>
                    </b-col>

                    <b-col md="6">                                
                        <b-form-group :label="t('Created By')" label-for="createdBy">
                            <b-input-group class="input-group-merge">
                                <b-input-group-prepend is-text >
                                    <feather-icon icon="TvIcon" />
                                </b-input-group-prepend>
                                <b-form-input id="createdBy" v-model="deptorInfo.createdBy" readonly />
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                    
                </b-row>

                <b-row>
                      <b-col md="6">
                          <b-form-group :label="t('Address')" label-for="address">
                              <b-form-input id="address" v-model="deptorInfo.address" readonly />
                          </b-form-group>
                      </b-col>
                      <b-col md="6">
                          <b-form-group :label="t('Line id')" label-for="lineid">
                              <b-form-input id="lineid" v-model="deptorInfo.lineid" readonly />
                          </b-form-group>
                      </b-col>
                  </b-row>  
              
                  <b-row>
                      <b-col md="6">
                          <b-form-group :label="t('Province')" label-for="province">
                            <b-form-input id="province" v-model="deptorInfo.province_name_th" readonly  />
                          </b-form-group>
                      </b-col>
                      <b-col md="6">
                          <b-form-group :label="t('District')" label-for="district">
                            <b-form-input id="district" v-model="deptorInfo.district_name_th" readonly  />
                          </b-form-group>
                      </b-col>
                  </b-row>  

                  <b-row>
                      <b-col md="6">
                          <b-form-group :label="t('Sub District')" label-for="subdistrict">
                            <b-form-input id="subdistrict" v-model="deptorInfo.subdistrict_name_th" readonly  />
                          </b-form-group>
                      </b-col>
                      <b-col md="6">
                          <b-form-group :label="t('Zipcode')" label-for="zipcode">
                              <b-form-input id="zipcode" v-model="deptorInfo.zipcode" maxlength="5" readonly  />
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
        deptorId: {
            type: String,
            required: false,
        },
    },
  data() {
    
    return {
      deptorInfo: [],
      showModalPrivate:false,
    }

  },
  async created() {    
    
    
  },
  watch: {
        deptorId: async function (newVal, oldVal) {
            if (newVal!='') 
            {
                this.getDeptorInfo();
            }
        },
        showModal: async function (newVal, oldVal) {
            this.showModalPrivate = this.showModal;
        },
    },
  methods: {        
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
        this.$emit('close-deptor-info');
    },
    async handleOk()
    {
        this.$emit('close-deptor-info');
    },
    async getDeptorInfo() {
      console.log('getDeptorInfo');    
      
      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
          userid: userData.username,
          token: userData.token,
      }

      var body = {
          username: this.deptorId,
          avatar : '-',
      }

      let response;
      await axios.post("api/member/getmemberbyid/", body,
      {
      headers: {
          'Content-Type': 'application/json',
          'userid': headers.userid,
          'token': headers.token,
      }
      }).then(
      resp => {
          response = resp;
          
      }
      );
      //console.log(response);            

      if (response.data.status == "success")             
      {
          this.deptorInfo  = response.data.data;                                          
      }

    },
  },
}

</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>