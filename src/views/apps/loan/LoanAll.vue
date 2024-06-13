<template>  
  
  <div>
    <b-card no-body >

        <div class="m-2">
        <b-row>
          
          <b-col
            cols="3"
            md="3"
            class="d-flex align-items-center justify-content-start mb-1"
          > 
            <b-form-datepicker id="fromDate" v-model="fromDate" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="th"></b-form-datepicker>          
          </b-col>
      
          <b-col
            cols="3"
            md="3"
            class="d-flex align-items-center justify-content-start mb-1"
          > 
            <b-form-datepicker id="toDate" v-model="toDate" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="th" ></b-form-datepicker>          
          </b-col>

          <b-col
            cols="2"
            
            class="d-flex align-items-center justify-content-start mb-1"
          > 
            <b-button variant="primary" @click="search">
            <feather-icon
              icon="SearchIcon"              
            />            
            {{ t('Load') }}
            </b-button>
          </b-col>


          <b-col
            cols="4"
            md="3"
            class="d-flex align-items-left justify-content-start mb-1"
          >      
            <b-input-group class="input-group-merge">
              <b-input-group-prepend is-text>
                <feather-icon icon="SearchIcon" />
              </b-input-group-prepend>
              <b-form-input
                id="icons-search"
                v-model="searchTerm"
                :placeholder="t('Search')"
              />
            </b-input-group>                               
              &nbsp;          
          </b-col>

          <b-col
            cols="6"
            md="3"
            class="d-flex align-items-left justify-content-start mb-1"
          > 
          </b-col>
        </b-row>

      </div>
    </b-card>

    <b-card :title="t('Payment All')">
      
        <vue-good-table ref="my-table-payment" :columns="columnsPayment" :rows="rowsPayment" :rtl="direction" :line-numbers="true"
          :search-options="{
              enabled: true,
              externalQuery: searchTerm,
              searchFn: searchOnTable,
          }" :select-options="{
              enabled: false,
              selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
              selectionInfoClass: 'custom-class',
              selectionText: 'rows selected',
              clearSelectionText: 'clear',
              disableSelectInfo: true, // disable the select info panel on top
              selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
          }" :pagination-options="{
              enabled: true,
              perPage: pageLength3
          }" theme="polar-bear">                                        
              <template slot="table-row" slot-scope="props">

                <div v-if="props.column.field === 'id2'">
                  <b-media vertical-align="center">
                    <template #aside>                
                    </template>
                    <b-link                
                      class="font-weight-bold d-block text-nowrap"
                    >
                      {{ props.row.sl_users_id }}
                      <b-badge style="cursor: pointer; margin-right:2px" variant="info" @click="showDeptorInfo(props.row)">
                          <feather-icon icon="SearchIcon" size="16" class="mr-0 mr-sm-50" />                          
                      </b-badge>
                    </b-link>

                    <h6 class="text-muted">@{{ props.row.fullname }}</h6>
                    
                  </b-media>
                </div>

                  <span v-if="props.column.field === 'due_date2'">              
                      {{formatDateAssigned2(props.row.due_date)}}
                  </span>
                  
                  <span v-if="props.column.field === 'principle_amount2'">       
                      
                          {{(props.row.principle_amount).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                      
                  </span>
                  
                  <span v-if="props.column.field === 'interest_amount2'">              
                      
                      
                          {{(props.row.interest_amount).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                      
                  </span>

                  <span v-if="props.column.field === 'fine_amount2'">     
                          {{(props.row.fine_amount).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}                      
                  </span>

                  <span v-if="props.column.field === 'total_amount2'">    
                      <b-badge
                          pill
                          variant="success"
                      >
                      {{(props.row.total_amount).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                      </b-badge>        
                      
                      <b-badge style="cursor: pointer; margin-right:2px;margin-left: 2px;" variant="info" @click="showTotalPaymentInfo(props.row)">
                          <feather-icon icon="SearchIcon" size="16" class="mr-0 mr-sm-50" />                          
                      </b-badge>                                        
                  </span>

                  <span v-if="props.column.field === 'payment_status2'">
                      <b-badge
                          pill
                          :variant="`light-success`"
                          class="text-capitalize"
                          v-if="props.row.paid==1"
                      >
                          {{ t('Paid') }}
                      </b-badge>
                      <br v-if="props.row.paid==1" />
                      <b-badge
                          pill
                          :variant="`light-success`"
                          class="text-capitalize"
                          v-if="props.row.paid==1"
                      >
                          {{  formatDateAssigned2(props.row.paid_at) }}
                      </b-badge>    
                      <br v-if="props.row.paid==1" />
                      <b-badge
                          pill
                          :variant="`light-success`"
                          class="text-capitalize"
                          v-if="props.row.paid==1"
                      >
                          {{t('Receive Amount')}} :
                          {{  (props.row.total_received_amount)?(props.row.total_received_amount).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }):'0.00' }}
                      </b-badge>  

                      <b-badge
                          pill
                          :variant="`light-warning`"
                          class="text-capitalize"
                          v-if="props.row.closed==1"
                      >
                          {{t('Forward To Next Due')}} :                           
                      </b-badge>
                      
                      <b-badge
                          pill
                          :variant="`light-danger`"
                          class="text-capitalize"
                          v-if="props.row.paid==0 && props.row.closed==0 && props.row.overdue==1"
                      >
                          {{ t('Not Paid')}}
                      </b-badge>

                      <b-badge
                          pill
                          :variant="`light-secondary`"
                          class="text-capitalize"
                          v-if="props.row.paid==0 && props.row.closed==0 && props.row.overdue==0"
                      >
                          {{ t('Not Paid')}}
                      </b-badge>

                  </span>

                  <span v-if="props.column.field === 'action'">   
                    
                    <b-badge style="cursor: pointer; margin-right:2px; width: 160px; text-align: left;" variant="info" @click="showAssignInfo(props.row)"
                      v-if="pagePermission.canApprove && props.row.paid!=1 && props.row.closed!=1 && props.row.rejected!=1"
                    >
                      <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
                      <span class="d-none d-sm-inline">{{t('Assign Staff')}}</span>
                    </b-badge>

                    <!-- <b-badge style="cursor: pointer; margin-right:2px" variant="warning" @click="showPaymentNote(props.row)">
                        <feather-icon icon="SearchIcon" size="16" class="mr-0 mr-sm-50" />
                        <span class="d-none d-sm-inline">{{t('Evidence')}}</span>
                    </b-badge> -->

                    <b-badge style="cursor: pointer; margin-right:2px; width: 160px; text-align: left;" variant="warning" @click="showKeyFineInfo(props.row)"                      
                      v-if="pagePermission.canApprove "
                    >
                        <feather-icon icon="SearchIcon" size="16" class="mr-0 mr-sm-50" />
                        <span class="d-none d-sm-inline">{{t('Key Fine Information')}}</span>
                    </b-badge>

                    <b-badge style="cursor: pointer; margin-right:2px; width: 160px; text-align: left;" variant="success" @click="showKeyPamentInfo(props.row)"
                      v-if="pagePermission.canEdit "
                    >
                        <feather-icon icon="EditIcon" size="16" class="mr-0 mr-sm-50" />
                        <span class="d-none d-sm-inline">{{t('Key Paid Information')}}</span>
                    </b-badge>

                    <b-badge style="cursor: pointer; margin-right:2px; width: 160px; text-align: left;" variant="danger" @click="showForwardPaymentInfo(props.row)"
                      v-if="pagePermission.canApprove && props.row.paid!=1 && props.row.closed!=1 && props.row.rejected!=1 "
                    >
                        <feather-icon icon="ArrowRightIcon" size="16" class="mr-0 mr-sm-50" />
                        <span class="d-none d-sm-inline">{{t('Forward To Next Due')}}</span>
                    </b-badge>

                    
                </span>


                  <span>
                  {{ props.formattedRow[props.column.field] }}
                  </span>

                </template>
              
              <template slot="pagination-bottom" slot-scope="props">
                  <div class="d-flex justify-content-between flex-wrap">
                  <div class="d-flex align-items-center mb-0 mt-1">
                      <span class="text-nowrap ">
                      {{t("Showing") +" 1 " + t("to") }}
                      </span>
                      <b-form-select v-model="pageLength3" :options="['3', '5', '10', '20', '50', '100']" class="mx-1"
                      @input="(value) => props.perPageChanged({ currentPerPage: value })" />
                      <span class="text-nowrap"> {{t('of')}} {{ props.total }} {{t('entries')}} </span>
                  </div>
                  <div>
                      <b-pagination :value="1" :total-rows="props.total" :per-page="pageLength3" first-number last-number
                          align="right" prev-class="prev-item" next-class="next-item" class="mt-1 mb-0"
                          @input="(value) => props.pageChanged({ currentPage: value })">
                          <template #prev-text>
                              <feather-icon icon="ChevronLeftIcon" size="18" />
                          </template>
                          <template #next-text>
                              <feather-icon icon="ChevronRightIcon" size="18" />
                          </template>
                      </b-pagination>
                  </div>
                  </div>
              </template>
        </vue-good-table>

    </b-card>
    
    <b-modal
            id="modal-payment-note"
            ref="modalPaymentNote"
            v-model="showModalPaymentNote"
            :title="t('Note')"
            @show="resetModalPaymentNote"
            @hidden="resetModalPaymentNote"
            @ok="handleOkPaymentNote"      
            size="sm"  
            :hideHeaderClose="false"            
            ok-variant="info"
            :okTitle="t('Close')"
            buttonSize="lg"            
            footerClass="p-2"
            ok-only
            
        >
            <form ref="form" @submit.stop.prevent="handleOkPaymentNote">
                <b-row>
                    <b-col md="12">
                        <b-form-group 
                        :label="t('Attach File')"
                        label-for="payment-note-img1"                    
                        >
                            <a target="_blank" :href="paymentRefImg">
                                <b-img :src="paymentRefImg" fluid thumbnail style="height: 200px;" /><br/>
                            </a>
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
                                readonly
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

    <loan-information
      :showModal="showModalDeptorInfo"
      :deptorId="deptorId"
      @close-deptor-info="closeModalDeptorInfo"
    />

    <loan-assign-staff
      :showModal="showModalAssignInfo"
      :paymentId="paymentId"
      :page_name="page_name"
      :oldstaft_id="oldstaft_id"
      @close-assign-info="closeModalAssignInfo"
    />

    <loan-key-payment
      :showModal="showModalKeyPaymentInfo"
      :paymentId="paymentId"
      :page_name="page_name"
      @close-keypayment-info="closeModalKeyPaymentInfo"
      :readOnlyControl="keyPaymentReadonly"
    />

    <loan-key-fine
      :showModal="showModalKeyFineInfo"
      :paymentId="paymentId"
      :page_name="page_name"
      @close-keyfine-info="closeModalKeyFineInfo"
      :readOnlyControl="keyFineReadonly"
    />

    <loan-forward-payment
      :showModal="showModalForwardInfo"
      :paymentId="paymentId"
      :page_name="page_name"
      @close-forward-info="closeModalForwardInfo"
      :readOnlyControl="keyForwardReadonly"
    />

    <loan-total-payment
      :showModal="showModalTotalPaymentInfo"
      :paymentId="paymentId"
      :page_name="page_name"
      @close-totalpayment-info="closeModalTotalPaymentInfo"
      :readOnlyControl="true"
    />

  </div>
  
</template>

<script>

import BCardCode from '@core/components/b-card-code/BCardCode.vue';
import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,BRow, BCol,BButton,BFormDatepicker,BCard,BInputGroup, BInputGroupPrepend,BModal,BImg,BFormTextarea,BMedia,BLink
} from 'bootstrap-vue';
import { VueGoodTable } from 'vue-good-table';
import store from '@/store/index';
import { mapActions } from "vuex";

import { useUtils as useI18nUtils } from '@core/libs/i18n'

import { ref, onUnmounted } from '@vue/composition-api'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import LoanInformation from './LoanInformation.vue'
import LoanAssignStaff from './LoanAssignStaff.vue'
import LoanKeyPayment from './LoanKeyPayment.vue'
import LoanKeyFine from './LoanKeyFine.vue'
import LoanForwardPayment from './LoanForwardPayment.vue'
import LoanTotalPayment from './LoanTotalPayment.vue'

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
    BCardCode,
    BModal,
    BImg,        
    BFormTextarea,
    LoanInformation,
    BMedia,
    BLink,    
    LoanAssignStaff,
    LoanKeyPayment,
    LoanKeyFine,
    LoanForwardPayment,
    LoanTotalPayment,
  },     
  setup() {
    const { t } = useI18nUtils();

    const columnsPayment =  [
            {
              label: t('Username/Fullname'),
              field: 'id2',
            },
            {
                label: t('Due Date'),
                field: 'due_date2',
            },
            {
                label: t('Principle Amount'),
                field: 'principle_amount2',  
                
            },
            {
                label: t('Interest Amount'),
                field: 'interest_amount2',
                
            },       
            // {
            //     label: t('Fine Amount'),
            //     field: 'fine_amount2',                
            // },
            {
                label: t('Total Payment'),
                field: 'total_amount2',                
            },
            {
                label: t('Payment Status'),
                field: 'payment_status2',                
            },  
            {
                label: t('Assign To'),
                field: 'staff_id',                
            },  
            {
                label: t('Action'),
                field: 'action',   
                width: '10%',             
            },                 
        ];
    return {
      t,
      columnsPayment,
      
    }
  },
  data() {
    let now = new Date();    
    let now2 = new Date();
    now.setDate(now2.getDate()+1);
    now2.setDate(now2.getDate()-30);
    const fDate =now2.getFullYear()+'-'+ ('0' + (now2.getMonth()+1)).slice(-2) +'-'+ ('0' + (now2.getDate())).slice(-2);
    const tDate =now.getFullYear()+'-'+ ('0' + (now.getMonth()+1)).slice(-2) +'-'+ ('0' + (now.getDate())).slice(-2);
    
    const blankData = {
        credit: 0.00,
        credit_bonus: 0.00,
        date: null,
        username: '',        
      };

      return {
      fromDate: fDate,
      toDate: tDate,
      pageLength3: 10,
      dir: false,                
      rowsPayment: [],
      searchTerm: '',      
      isAddNewUserSidebarActive : false,
      selectedDataRow : blankData,
      paymentNoteData :[],
      showModalPaymentNote:false,
      paymentNotePage:1,
      paymentRefImg:'',
      paymentRefNote:'',
      paymentNoteAt:'',
      paymentNoteBy:'',
      pagePermission:[],
      showModalDeptorInfo:false,
      showModalAssignInfo:false,      
      showModalKeyPaymentInfo:false,
      showModalKeyFineInfo:false,
      showModalForwardInfo:false,
      showModalTotalPaymentInfo:false,
      deptorId:'',
      paymentId:0,
      page_name:'',
      oldstaft_id:'',
      keyPaymentReadonly:false,
      keyFineReadonly:false,
      keyForwardReadonly:false,
    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Current      : 'light-primary',
        Professional : 'light-success',
        Rejected     : 'light-danger',
        Resigned     : 'light-warning',
        Applied      : 'light-info',
        /* eslint-enable key-spacing */
      }

      return status => statusColor[status]
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  async created() {    
    
    await this.getPagePermission();
    await this.search();  
    this.page_name = this.$route.name;

    console.log(this.page_name);
  },
  methods: {    
    ...mapActions(["GetLoanAll"]),   
    ...mapActions(["GetPagePermission"]),   
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
    async search(){
      console.log('search');

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();
    
      formData.append("userid", userData.username);
      formData.append("token", userData.token);

      formData.append("startDate", this.fromDate);
      formData.append("endDate", this.toDate);
      
      formData.append("admin_id", userData.username);
      formData.append("page_name", this.$route.name);
      
      const response = await this.GetLoanAll(formData);
      if (response.data.status=='success') 
      {         
          this.rowsPayment = response.data.data;
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
    async getPagePermission(){
      console.log('getPagePermission');

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();
    
      formData.append("userid", userData.username);
      formData.append("token", userData.token);

      formData.append("admin_id", userData.username);
      formData.append("page_name", this.$route.name);
      
      const response = await this.GetPagePermission(formData);
      if (response.data.status=='success') 
      {         
          this.pagePermission = response.data.data;
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
    async showPaymentNote(paymentData)
    {

        this.paymentNoteData = paymentData;
        this.showModalPaymentNote = true;
        this.paymentNotePage = 1;
        this.paymentNoteChange(1);
        
    },
    paymentNoteChange(pageValue)
    {
        const tmpPaymentNoteData = this.paymentNoteData;
        
        this.paymentRefImg = tmpPaymentNoteData['ref_img'+pageValue]!=''?tmpPaymentNoteData['ref_img'+pageValue]:'/images/noimage.jpg';
        this.paymentRefNote = tmpPaymentNoteData['note'+pageValue]!=''?tmpPaymentNoteData['note'+pageValue]:'';
        this.paymentNoteAt = tmpPaymentNoteData['note'+pageValue+'_at']!=null?this.formatDateAssigned(tmpPaymentNoteData['note'+pageValue+'_at']):'';
        this.paymentNoteBy = tmpPaymentNoteData['note'+pageValue+'_by']!=''?tmpPaymentNoteData['note'+pageValue+'_by']:'';
    },
    resetModalPaymentNote()
    {
        
    },
    async handleOkPaymentNote()
    {
        this.showModalPaymentNote = false;
    },
    showDeptorInfo(deptorInfo)
    {
      this.showModalDeptorInfo = true;
      this.deptorId = deptorInfo.sl_users_id;
    },    
    showAssignInfo(deptorInfo)
    {
      this.showModalAssignInfo = true;
      this.paymentId = deptorInfo.loan_payment_id;
      this.oldstaft_id = deptorInfo.staff_id;
    },
    showKeyPamentInfo(deptorInfo)
    {
      this.showModalKeyPaymentInfo = true;
      this.paymentId = deptorInfo.loan_payment_id;    
      
      if (deptorInfo.paid==1 || deptorInfo.closed==1|| deptorInfo.rejected==1) {
          this.keyPaymentReadonly = true;
        }
        else
        {
          this.keyPaymentReadonly = false;
        }

    },
    showKeyFineInfo(deptorInfo)
    {
      this.showModalKeyFineInfo = true;
      this.paymentId = deptorInfo.loan_payment_id;   
      if (deptorInfo.paid==1 || deptorInfo.closed==1|| deptorInfo.rejected==1) {
          this.keyFineReadonly = true;
        }
        else
        {
          this.keyFineReadonly = false;
        }   
    },
    showForwardPaymentInfo(deptorInfo)
    {
      this.showModalForwardInfo = true;
      this.paymentId = deptorInfo.loan_payment_id;  
      if (deptorInfo.paid==1 || deptorInfo.closed==1|| deptorInfo.rejected==1) {
          this.keyForwardReadonly = true;
        }
        else
        {
          this.keyForwardReadonly = false;
        }     
    },   
    showTotalPaymentInfo(deptorInfo)
    {
      this.showModalTotalPaymentInfo = true;
      this.paymentId = deptorInfo.loan_payment_id;      
    },  
    closeModalDeptorInfo()
    {
      this.showModalDeptorInfo = false;
    },
    closeModalAssignInfo()
    {
      this.showModalAssignInfo = false;
      this.search();
    },
    closeModalKeyPaymentInfo()
    {
      this.showModalKeyPaymentInfo = false;
      this.search();
    },
    closeModalKeyFineInfo()
    {
      this.showModalKeyFineInfo = false;
      this.search();
    },
    closeModalForwardInfo()
    {
      this.showModalForwardInfo = false;
      this.search();
    },
    closeModalTotalPaymentInfo()
    {
      this.showModalTotalPaymentInfo = false;
      this.search();
    },
    searchOnTable(row, col, cellValue, searchTerm)
    {
      
      if (searchTerm.length <3) {
        return true;
      }

      let found = false;

      Object.keys(row).forEach(key => {
          if (row[key]) {            
            if(row[key].toString().indexOf(searchTerm)>-1)
            {         
              found = true;     
              return true;
            }
          }
      });
      
      return found;
    },
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
