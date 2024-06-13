<template>

  <div>
    <deposit-manage-form :isDepositFormActive="isDepositFormActive" :pRowData="selectedDataRow" 
      @refetch-data="search" @close-edit-form="closeEditForm" />

    <withdraw-manage-form :isWithdrawFormActive="isWithdrawFormActive" :pRowData="selectedDataRow"
      @refetch-data="search" @close-edit-form="closeEditForm" />


    <Transition name="fade" mode="out-in">
      <b-card v-if="!(isDepositFormActive)&&!(isWithdrawFormActive)">
        <div class="m-2">

          <!-- Table Top -->
          <b-row style="justify-content: space-between!important;">
            <b-col cols="12" md="3" class="d-flex align-items-center justify-content-start">
              
            </b-col>

            <b-col cols="12" md="3" class="d-flex align-items-center justify-content-start" ทะ>
              <b-button variant="primary" @click="search" class="mr-1">
                <feather-icon icon="SearchIcon" />
                </b-button>
              <b-input-group class="input-group-merge">
                <b-input-group-prepend is-text>
                  <feather-icon icon="SearchIcon" />
                </b-input-group-prepend>
                <b-form-input id="icons-search" v-model="searchTerm" :placeholder="t('Search')" />
              </b-input-group>
            </b-col>

          </b-row>

        </div>
      </b-card>
    </Transition>
    <Transition name="fade" mode="out-in">
      <b-card title="แจ้งถอน (อนุมัติ)" v-if="!(isDepositFormActive)&&!(isWithdrawFormActive)"  >        
        <vue-good-table ref="mytable" :columns="columns" :rows="rows" :rtl="direction" :line-numbers="true" 
          :search-options="{
            enabled: false,
            externalQuery: searchTerm
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
            perPage: pageLength
          }" theme="polar-bear">
          <template slot="table-row" slot-scope="props" >

            <div v-if="props.column.field === 'id2'">
              <b-media vertical-align="center">            
                <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" /> {{ props.row.id }}</h6>
              </b-media>
            </div>

            <div v-if="props.column.field === 'memberinfo2'">
              <b-media vertical-align="center">            
                <h6 ><feather-icon icon="UserIcon" size="16" class="align-middle mr-25" /> {{ props.row.username }}</h6>
                <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" />{{ props.row.bank_acc_name }}</h6>
                <h6 ><feather-icon icon="SmartphoneIcon" size="16" class="align-middle mr-25" />{{ props.row.mobile_no }}</h6>
              </b-media>
            </div>

            <div v-if="props.column.field === 'bankinfo2'">
              <b-media vertical-align="center">            
                <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" /> {{ props.row.bank_name }}</h6>
                <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" />{{ props.row.bank_acc_no }}</h6>                
              </b-media>
            </div>

            <div v-if="props.column.field === 'calculate'">
              <b-media vertical-align="center">
                
                  <b-row>
                    <b-col md="6"> <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" />{{t('Before')}}</h6></b-col>
                    <b-col md="6"><h6 class="text-success">{{parseFloat(props.row.credit_before).toFixed(2) }}</h6></b-col>
                  </b-row>
                  <b-row>
                    <b-col md="6"> <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" />{{t('Withdraw')}}</h6></b-col>
                    <b-col md="6" ><h6 class="text-danger" >{{ parseFloat(props.row.credit).toFixed(2) }}</h6></b-col>
                  </b-row>
                  <b-row>
                    <b-col md="6"> <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" />{{t('After')}}</h6></b-col>
                    <b-col md="6"><h6 class="text-info">{{ parseFloat(props.row.credit_after).toFixed(2)  }}</h6></b-col>
                  </b-row>
                  <b-row v-if="props.row.promotion!=null">
                    <b-col md="6"> <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" />{{t('Promotion')}}</h6></b-col>
                    <b-col md="6"><h6 class="text-warning">{{ props.row.promotion  }}</h6></b-col>
                  </b-row>
                
              </b-media>
            </div>

            <div v-if="props.column.field === 'time2'">
              <b-media vertical-align="center">            
                <h6 ><feather-icon icon="ClockIcon" size="16" class="align-middle mr-25" /> {{ formatDateAssigned(props.row.date) }}</h6>                
              </b-media>
            </div>

            <div v-if="props.column.field === 'status2'">              
                <b-badge
                    pill
                    :variant="resolveStatusVariant(0)"
                    class="text-capitalize"
                >
                    {{t('Waiting')}}
                </b-badge>
            </div>
            
            <div v-if="props.column.field === 'action'" >
                <b-dropdown variant="outline-success" toggle-class="text-decoration-none" no-caret size="sm" class="lang-dropdown" >
                  <template v-slot:button-content >
                    <feather-icon icon="CheckSquareIcon" size="16" class="align-middle mr-25"  />
                  </template>
                  <b-dropdown-item @click="approveAutoModal(props.row)"  >
                      <feather-icon icon="CheckSquareIcon" class="mr-50" />
                      <span>{{t('Approve (Auto)')}}</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="approveManualConfirm(props.row)">
                    <feather-icon icon="CheckSquareIcon" class="mr-50" />
                    <span>{{t('Approve (Manaul)')}}</span>
                  </b-dropdown-item>
                </b-dropdown>
                &nbsp;
                <b-dropdown variant="outline-danger" toggle-class="text-decoration-none" no-caret size="sm" class="lang-dropdown" >
                  <template v-slot:button-content>
                    <feather-icon icon="XSquareIcon" size="16" class="align-middle mr-25"  />
                  </template>
                  <b-dropdown-item @click="rejectRefund(props.row)">
                    <feather-icon icon="XSquareIcon" class="mr-50" />
                    <span>{{t('Reject (Refund)')}}</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="rejectNoRefund(props.row)">
                    <feather-icon icon="XSquareIcon" class="mr-50" />
                    <span>{{t('Reject (Not Refund)')}}</span>
                  </b-dropdown-item>
                </b-dropdown>
                &nbsp;
                <b-dropdown variant="outline-info" toggle-class="text-decoration-none" no-caret size="sm" class="lang-dropdown" >
                  <template v-slot:button-content>
                    <feather-icon icon="InfoIcon" size="16" class="align-middle mr-25" />
                  </template>
                  <b-dropdown-item @click="infoModal(props.row)">
                    <feather-icon icon="InfoIcon" class="mr-50" />
                    <span>{{t('Information')}}</span>
                  </b-dropdown-item>  
                </b-dropdown>
            </div>
            
            <span>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>

          <!-- pagination -->
          <template slot="pagination-bottom" slot-scope="props">
            <div class="d-flex justify-content-between flex-wrap">
              <div class="d-flex align-items-center mb-0 mt-1">
                <span class="text-nowrap ">
                  {{t("Showing") +" 1 " + t("to") }}
                </span>
                <b-form-select v-model="pageLength" :options="['3', '5', '10', '20', '50', '100']" class="mx-1"
                  @input="(value) => props.perPageChanged({ currentPerPage: value })" />
                <span class="text-nowrap"> {{t('of')}} {{ props.total }} {{t('entries')}} </span>
              </div>
              <div>
                <b-pagination :value="1" :total-rows="props.total" :per-page="pageLength" first-number last-number
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
    </Transition>

    <Transition name="fade" mode="out-in">
      <b-modal ref="bv-modal-approve-auto" hide-footer>
        <template #modal-title>
          Approve Auto
        </template>
        <div class="d-block text-center">
          <div class="text-left">
            <b-row>
              <b-col md="6">
                <h6>Transaction No : </h6>
              </b-col>  
              <b-col md="6">
                <h6>{{approveRow.id}}</h6>
              </b-col>  
            </b-row>

            <b-row>
              <b-col md="6">
                <h6>Withdraw Amount : </h6>
              </b-col>  
              <b-col md="6">
                <h6>{{approveRow.credit}}</h6>
              </b-col>  
            </b-row>

            <b-row>
              <b-col md="6">
                <h6>Time : </h6>
              </b-col>  
              <b-col md="6">
                <h6>{{formatDateAssigned(approveRow.date)}}</h6>
              </b-col>  
            </b-row>
            
          </div>
          <hr/>
          <h5>Please Enter Withdraw PIN</h5>
          <b-form-group label-for="withdrawpin">
              <b-input-group class="input-group-merge">
                  <b-input-group-prepend is-text>
                      <feather-icon icon="SmartphoneIcon" />
                  </b-input-group-prepend>
                  <b-form-input id="withdrawpin" v-model="withdrawpin" placeholder="123456" :maxlength="6" />
              </b-input-group>
          </b-form-group>
          <hr/>
          <h6 class="text-danger" > {{ withdrawerror }}</h6>
          <b-button type="submit" variant="primary" class="mr-1" @click="approveAutoConfirm()"  >
            <feather-icon icon="EditIcon" />
                  Confirm
          </b-button>

          <b-button variant="danger" class="mr-1" @click="modalclose()"  >
            <feather-icon icon="DeleteIcon" />
                  Cancel
          </b-button>

        </div>
      </b-modal>
    </Transition>

    <Transition name="fade" mode="out-in">
      <b-modal ref="bv-modal-info" hide-footer size="xl" >
        <template #modal-title>
          {{t('Deposit-Withdraw Information')}}
        </template>
        <h6>{{ infoRow.username }}</h6>
        <h6>{{ infoRow.bank_acc_name }}</h6>
        <hr/>
        <vue-good-table ref="mytable2" :columns="columns2" :rows="rows2" :rtl="direction" :line-numbers="true" 
          :search-options="{
            enabled: false,
            externalQuery: searchTerm2
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
            perPage: pageLength2
          }" theme="polar-bear">
          <template slot="table-row" slot-scope="props" >

            
            <div v-if="props.column.field === 'bankinfo2'">
              <b-media vertical-align="center">            
                <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" /> {{ props.row.bank_name }}</h6>
                <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" />{{ props.row.bank_acc_no }}</h6>                
              </b-media>
            </div>

            <div v-if="props.column.field === 'transaction_type2'">              
                <b-badge
                    pill
                    :variant="resolveStatusVariantDepWit(props.row.transaction_type)"
                    class="text-capitalize"                    
                >   
                {{t(resolveStatusTextDepWit(props.row.transaction_type))}}
                </b-badge>
            </div>

            <div v-if="props.column.field === 'calculate'">
              <b-media vertical-align="center" v-if="(props.row.transaction_type=='BONUS')" >
                  <b-row>
                    <b-col md="6"> <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" />{{t('Bonus')}}</h6></b-col>
                    <b-col md="6" ><h6 class="text-danger" >{{ parseFloat(props.row.credit_bonus).toFixed(2) }}</h6></b-col>
                  </b-row>     
                  <b-row>
                    <b-col md="6"> <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" />{{t('Promotion')}}</h6></b-col>
                    <b-col md="6" ><h6 class="text-danger" >{{ props.row.promotion }}</h6></b-col>
                  </b-row>     
              </b-media>

              <b-media vertical-align="center" v-if="(props.row.transaction_type!='BONUS')">
                  <b-row>
                    <b-col md="6"> <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" />{{t('Before')}}</h6></b-col>
                    <b-col md="6"><h6 class="text-success">{{parseFloat(props.row.credit_before).toFixed(2) }}</h6></b-col>
                  </b-row>
                  <b-row>
                    <b-col md="6"> <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" />{{t('Credit')}}</h6></b-col>
                    <b-col md="6" ><h6 class="text-danger" >{{ parseFloat(props.row.credit).toFixed(2) }}</h6></b-col>
                  </b-row>
                  <b-row>
                    <b-col md="6"> <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" />{{t('After')}}</h6></b-col>
                    <b-col md="6"><h6 class="text-info">{{ parseFloat(props.row.credit_after).toFixed(2)  }}</h6></b-col>
                  </b-row>                
              </b-media>

            </div>

            <div v-if="props.column.field === 'time2'">
              <b-media vertical-align="center">            
                <h6 ><feather-icon icon="ClockIcon" size="16" class="align-middle mr-25" /> {{ formatDateAssigned(props.row.date) }}</h6>                
              </b-media>
            </div>

            <div v-if="props.column.field === 'approve_status2'">              
                <b-badge
                    pill
                    :variant="resolveStatusVariant(props.row.approve_status)"
                    class="text-capitalize"                    
                >   
                {{t(resolveStatusText2(props.row.approve_status))}}
                
                </b-badge>
            </div>
     
            <div>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>

          <!-- pagination -->
          <template slot="pagination-bottom" slot-scope="props">
            <div class="d-flex justify-content-between flex-wrap">
              <div class="d-flex align-items-center mb-0 mt-1">
                <span class="text-nowrap ">
                  {{t("Showing") +" 1 " + t("to") }}
                </span>
                <b-form-select v-model="pageLength2" :options="['3', '5']" class="mx-1"
                  @input="(value) => props.perPageChanged({ currentPerPage: value })" />
                <span class="text-nowrap"> {{t('of')}} {{ props.total }} {{t('entries')}} </span>
              </div>
              <div>
                <b-pagination :value="1" :total-rows="props.total" :per-page="pageLength2" first-number last-number
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

      </b-modal>
    </Transition>
  </div>

</template>

<script>

import BCardCode from '@core/components/b-card-code/BCardCode.vue';
import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BRow, BCol, BButton, BFormDatepicker, BCard, BInputGroup, BInputGroupPrepend,BMedia,BLink
  ,BModal
} from 'bootstrap-vue';
import { VueGoodTable } from 'vue-good-table';

import store from '@/store/index';
import { mapActions } from "vuex";
import axios from "axios";
import { ref, onUnmounted } from '@vue/composition-api'

import DepositManageForm from './DepositManageForm.vue';
import WithdrawManageForm from './WithdrawManageForm.vue';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    WithdrawManageForm,
    DepositManageForm,
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
    BMedia,
    BLink,
    BModal,
  },
  setup() {
    const { t } = useI18nUtils();

    function formatDateAssigned4(value) {
      let formattedDate = new Date(value);
      formattedDate = new Date(formattedDate.getTime() - 3600000); // 60 * 60 * 1000 * 1
      return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });
    };

    let columns = [
         {
          label: t('Transaction No'),
          field: 'id2',
        },
        {
          label: t('Member Info'),
          field: 'memberinfo2',
        },
        {
          label: t('Bank Info'),
          field: 'bankinfo2',
        },

        {
          label: t('Amount'),
          field: 'calculate',
          width: '30%',
        },

        {
          label: t('Time'),
          field: 'time2',
        },
  
        {
          label: t('Status'),
          field: 'status2',          
        },       
        {
          label: t('Action'),
          field: 'action',
          width: '15%',
        },
        {
          label : t('Credit'),
          field : 'credit',
          hidden: true,
        },
        {
          label : t('Bank Account Number'),
          field : 'bank_acc_no',
          hidden: true,
        },
        {
          label : t('Bank Account Name'),
          field : 'bank_acc_name',
          hidden: true,
        },
        {
          label : t('Bank Name'),
          field : 'bank_name',
          hidden: true,
        },
        {
          label : t('Mobile No'),
          field : 'mobile_no',
          hidden: true,
        },
        {
          label : t('Username'),
          field : 'username',
          hidden: true,
        },
        {
          label : t('Date'),
          field : 'date',
          hidden: true,
        },
        {
          label : t('Id'),
          field : 'id',
          hidden: true,
        },
      ];

    let columns2= [ 
        {
          label: t('Bank Info'),
          field: 'bankinfo2',
        },
        {
          label: t('Type'),
          field: 'transaction_type2',
        },
        {
          label: t('Amount'),
          field: 'calculate',
          width: '30%',
        },
        {
          label: t('Time'),
          field: 'time2',
        },

        {
          label: t('Approve Status'),
          field: 'approve_status2',          
        },
  
      ];

    return {
      t,
      columns,
      columns2,
    }
  },
  data() {
    

    return {
      // fromDate: fDate,
      // toDate: tDate,
      pageLength: 10,
      pageLength2:3,
      dir: false,
      
      
      rows: [],

      rows2: [],

      searchTerm: '',
      searchTerm2: '',
      AgentSelected: '',
      AgentOptions: [
        { value: null, text: 'Agent' },
        // { value: 'ufgkxc11', text: 'ufgkxc11' },
      ],
      isWithdrawFormActive: false,
      isDepositFormActive: false,
      selectedDataRow: [],
      isModeDeposit: false,
      withdrawpin:"",
      withdrawerror:"",
      approveRow : [],
      acting : false,
      intervalId : null,
      infoRow : [],
    }
  },
  computed: {
    resolveStatusVariant() {      
        const statusColor = {                    
          1: 'light-success',
          0: 'light-warning',          
        }
        return data => statusColor[data]
    },
    resolveStatusText() {            
      const statusActive = {                    
          1: 'Active',
          0: 'InActive',          
        }
        return data => statusActive[data]
    },    
    resolveStatusText2() {            
      const statusActive = {                    
          1: 'Approved',
          0: 'Rejected',          
        }
        return data => statusActive[data]
    }, 
    resolveStatusTextDepWit() {    
      return data => {
        if (data.indexOf("DEP")>-1) 
        {
          return "DEPOSIT";
        }
        else if(data.indexOf("BONUS")>-1) 
        {
          return "BONUS";
        }
        else
        {
          return "WITHDRAW";
        }
      }
    }, 
    resolveStatusVariantDepWit() {     
      return data => {       
        if (data.indexOf("DEP")>-1) 
        {
          return "light-success";
        }
        else if(data.indexOf("BONUS")>-1) 
        {
          return "light-info";
        }
        else
        {
          return "light-warning";
        }
      }
    }, 
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Current: 'light-primary',
        Professional: 'light-success',
        Rejected: 'light-danger',
        Resigned: 'light-warning',
        Applied: 'light-info',
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
    
    await this.search();
    this.isModeDeposit = true;
    this.acting = false;    

  }, 
  mounted()
  {
    this.intervalId = setInterval(this.search, 10000)
  },  
  beforeDestroy () {
    clearInterval(this.intervalId)
  },
  methods: {        
    async search() {
      console.log('search');

      // console.log(this.fromDate);
      // console.log(this.toDate);
      // console.log(this.AgentSelected);       
      // console.log(this.searchTerm);
      // console.log(this.pageLength);

      const userData = JSON.parse(localStorage.getItem('userData'));

      // console.log(userData);

      var headers = {
        userid: userData.username,
        token: userData.token,
      }

      var body = {        
          searchWord: this.searchTerm,
      }

      let response;
      await axios.post("api/transaction/getwaitwithdrawtransaction",body,
      {
          headers: {            
          'Content-Type': 'application/json',
          'userid': headers.userid,
          'token': headers.token,
          }
      }).then(
          resp => 
          {
              response = resp;
          }
      );

      // console.log(response.data.status);
      // console.log(response.data.data);

      if (response.data.status == 'success') {
        
        let tmpData = response.data.data;
        // let listData = [];   
        // for (let index = 0; index < tmpData.length; index++) {
        //   let rowData = tmpData[index];          
        //   rowData.bank_ico = require('@/assets/images/bank_bg/' + tmpData[index]['bank_ico']);
        //   rowData.bank_name2 = '';
        //   listData.push(rowData);
        // }

        // this.rows = tmpData;
        // console.log(response.data.data);
        // console.log(listData);
        this.rows = tmpData;
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
    formatDateAssigned(value) {
      let formattedDate = new Date(value);
      formattedDate = new Date(formattedDate.getTime() - 25200000); // 60 * 60 * 1000 * 8
      // const formattedDate = new Date().fromISO(value).toLocaleString(DateTime.DATETIME_SHORT);
      return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });

    },
    async confirmDelete() {
      const selectedRow = this.$refs['mytable'].selectedRows;

      if (selectedRow.length > 0) {
        this.boxTwo = '';
        await this.$bvModal.msgBoxConfirm(this.$t('Please confirm that you want to delete'), {
          title: this.$t('Please Confirm'),
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {

            if (value) {
              const selectID = selectedRow.map(obj => obj.id);
              // console.log(selectID);
              this.inactiveMember(selectID);

            }

          })
          .catch(err => {

          })
      }


    },
    async deleteitem(row) {

      this.boxTwo = '';
      await this.$bvModal.msgBoxConfirm('Please confirm that you want to Active/InActive.', {
        title: this.$t('Please Confirm'),
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {

          if (value) {
            let selectID = [];
            selectID.push(row.id);
            // console.log(selectID);
            this.inactiveMember(selectID);

          }

        })
        .catch(err => {

        })


    },
    addnew() {
      this.isWithdrawFormActive = true;
      this.isSearchFormActive = false;
      this.isModeDeposit = false;
 
      const EmptyRow =
      {
        id: "",
        fullname: '',                        
        mobile_no: "",
        bank_id : 1,
        bank_account_no: "",
        //create_at: new Date().toLocaleString('en-US',{timeZone: "asia/bangkok"}),
        create_at: new Date().toISOString('en-US',{timeZone: "asia/bangkok"}),
        knowus: "",
        status: 0,        
      };

      this.selectedDataRow = EmptyRow;
    },
    async edititem(row) {
      // console.log(row);
      this.isDepositFormActive = true;
      this.isSearchFormActive = false;
      this.isModeDeposit = true;
      
      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
          userid: userData.username,
          token: userData.token,
      }

      var body = {
          username: row.id,
      }

      // console.log(body);

      let response;
      await axios.post("api/member/getmemberdepwitbyid/", body,
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
      // console.log(response);            
      if (response.data.status == "success")             
      {
          let tmpData  = response.data.data;                                
          row.sumdeposit = tmpData.SumAD?tmpData.SumAD:0.00;
          row.sumwithdraw = tmpData.SumAW?tmpData.SumAW:0.00;
          row.sumprofit = tmpData.Profit?tmpData.Profit:0.00;
      }

      this.selectedDataRow = row;
      
    },
    closeEditForm() {
      this.isWithdrawFormActive = false;
      this.isDepositFormActive = false;
    },
    async inactiveMember(listId) {
      //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

      console.log("inactiveMember");

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      var headers = {
        userid: userData.username,
        token: userData.token,
      }

      var body = {
        listId: listId
      }

      // console.log(body);

      let response;
      await axios.post("api/member/inactivememberbyid/", body,
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

      // console.log(response);
      if (response.data.status == "success") {
        //
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: `Active/Inactive`,
            icon: 'PowerIcon',
            variant: 'warning',
            text: `Active/Inactive Succesful.`,
          },
          autoHideDelay: 3000,
        });
        this.search();

      }
      else {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: `Active/Inactive`,
            icon: 'PowerIcon',
            variant: 'danger',
            text: `Active/Inactive UnSuccesful ${response.data.message}`,
          },
          autoHideDelay: 3000,
        });
        this.search();
      }

    },    
    avatarText(fullname)
    {      
      if (!fullname) return ''
      const nameArray = fullname.split(' ')
      return nameArray.map(word => word.charAt(0).toUpperCase()).join('')              
    },
    modalclose()
    {
      this.$refs['bv-modal-approve-auto'].hide();
      this.$refs['bv-modal-info'].hide();
      this.acting=false;
    },
    async approveAutoModal(row)
    {
      this.acting=true;
      this.approveRow=row;
      this.withdrawpin ="";        
      this.$refs['bv-modal-approve-auto'].show();
    },
    async approveAutoConfirm()
    {
      console.log("approveAutoConfirm");

      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
          userid: userData.username,
          token: userData.token,
      }

      var body = this.approveRow;
      body.approve_status = 1;
      body.approve = userData.username;
      body.note = "อนุมัติ ถอนเงิน โดย " +userData.username;
      body.withdrawPIN = this.withdrawpin;
      

      // console.log(body);

      let response;
      await axios.post("api/transaction/approveAutoWaitWithdrawTransactionById", body, {
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

      // console.log(response);
      if (response.data.status == "success") {
          //

          this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                  title: `Update`,
                  icon: 'EditIcon',
                  variant: 'success',
                  text: `Update Succesful.`,
              },
              autoHideDelay: 3000,
          });

          this.search();
          
      } else {
          this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                  title: `Update`,
                  icon: 'TrashIcon',
                  variant: 'danger',
                  text: `Update UnSuccesful ${response.data.message}`,
              },
              autoHideDelay: 3000,
          });
          this.search();
      }

      this.modalclose();
    },    
    async approveManualConfirm(row)
    {
      console.log("approveManualConfirm");

      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
          userid: userData.username,
          token: userData.token,
      }

      var body = row;
      body.mode = "manualconfirm";
      body.approve_status = 1;
      body.approve = userData.username;      
      body.note = "อนุมัติถอน (Manual) โดย " +userData.username + " จำนวน "+ body.credit;

      // console.log(body);

      let response;
      await axios.post("api/transaction/approveManaulWaitWithdrawTransactionById", body, {
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

      // console.log(response);
      if (response.data.status == "success") {
          //

          this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                  title: `Update`,
                  icon: 'EditIcon',
                  variant: 'success',
                  text: `Update Succesful.`,
              },
              autoHideDelay: 3000,
          });

          this.search();
          this.close();

      } else {
          this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                  title: `Update`,
                  icon: 'TrashIcon',
                  variant: 'danger',
                  text: `Update UnSuccesful ${response.data.message}`,
              },
              autoHideDelay: 3000,
          });
          this.search();
      }
    },
    async rejectRefund(row)
    {
      console.log("rejectRefund");

      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
          userid: userData.username,
          token: userData.token,
      }

      var body = row;
      body.mode = "refund";
      body.approve_status = 0;
      body.approve = userData.username;      
      body.note = "ปฏิเสธ การถอนและคืนเงิน โดย " +userData.username + " จำนวน "+ body.credit;

      // console.log(body);

      let response;
      await axios.post("api/transaction/approveManaulWaitWithdrawTransactionById", body, {
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

      // console.log(response);
      if (response.data.status == "success") {
          //

          this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                  title: `Update`,
                  icon: 'EditIcon',
                  variant: 'success',
                  text: `Update Succesful.`,
              },
              autoHideDelay: 3000,
          });

          this.search();


      } else {
          this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                  title: `Update`,
                  icon: 'TrashIcon',
                  variant: 'danger',
                  text: `Update UnSuccesful ${response.data.message}`,
              },
              autoHideDelay: 3000,
          });
          this.search();
      }
    },
    async rejectNoRefund(row)
    {
      console.log("rejectNoRefund");

      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
          userid: userData.username,
          token: userData.token,
      }

      var body = row;
      body.mode = "cancel";
      body.approve_status = 0;
      body.approve = userData.username;      
      body.note = "ไม่อนุมัติ (ไม่คืนเงิน) โดย " +userData.username + " จำนวน "+ body.credit;

      // console.log(body);

      let response;
      await axios.post("api/transaction/approveManaulWaitWithdrawTransactionById", body, {
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

      // console.log(response);
      if (response.data.status == "success") {
          //

          this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                  title: `Update`,
                  icon: 'EditIcon',
                  variant: 'success',
                  text: `Update Succesful.`,
              },
              autoHideDelay: 3000,
          });
          
          this.search();
          

      } else {
          this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                  title: `Update`,
                  icon: 'TrashIcon',
                  variant: 'danger',
                  text: `Update UnSuccesful ${response.data.message}`,
              },
              autoHideDelay: 3000,
          });
          this.search();
      }
    },
    async infoModal(row)
    {
      this.acting=true;
      this.infoRow = row;
      this.$refs['bv-modal-info'].show();
      this.rows2 = [];
      this.searchInfo();
      
    },
    async infoShow()
    {

    },    
    async searchInfo()
    {
      console.log('searchInfo');

      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
        userid: userData.username,
        token: userData.token,
      }

      var body = {        
          searchWord: this.searchTerm,
          username : this.infoRow.username,
      }

      let response;
      await axios.post("api/transaction/gettransactionbyusername",body,
      {
          headers: {            
          'Content-Type': 'application/json',
          'userid': headers.userid,
          'token': headers.token,
          }
      }).then(
          resp => 
          {
              response = resp;
          }
      );

      if (response.data.status == 'success') {
        
        let tmpData = response.data.data;
        this.rows2 = tmpData;
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
    }
    
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';

.myavatar {
  display: flex;
  align-items: center;
}

.myavatar img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
