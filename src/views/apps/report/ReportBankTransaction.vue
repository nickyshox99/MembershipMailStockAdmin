<template>  
  
  <div>

    <report-bank-transaction-view
      :is-report-bank-transaction-view-active.sync="isAddNewUserSidebarActive" 
      :isAddNewUserSidebarActive="isAddNewUserSidebarActive" 
      :pRowData="selectedDataRow"
      @refetch-data="search"
    />

    <b-card no-body >

        <div class="m-2">

        <!-- Table Top -->
        <b-row>
          <b-col
            cols="12"
            md="2"
            class="d-flex align-items-center justify-content-start mb-1"
          > 
            <b-form-datepicker id="fromDate" v-model="fromDate" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="th"></b-form-datepicker>          
          </b-col>
      
          <b-col
            cols="12"
            md="2"
            class="d-flex align-items-center justify-content-start mb-1"
          > 
            <b-form-datepicker id="toDate" v-model="toDate" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="th" ></b-form-datepicker>          
          </b-col>

          <b-col
            cols="2"
            md="2"
            class="d-flex align-items-center justify-content-start mb-1"
          >
            <b-form-select v-model="BankSelected" :options="BankOptions"></b-form-select>
          </b-col>

          <b-col
            cols="1"
            md="1"
            class="d-flex align-items-center justify-content-start mb-1"
          >
            <b-form-select v-model="PageSelected" :options="PageOptions"></b-form-select>
          </b-col>
          
          <b-col
            cols="3"
            md="4"
            class="d-flex align-items-center justify-content-start mb-1"
          > 
            <b-button variant="primary" @click="search">
            <feather-icon
              icon="SearchIcon"              
            />            
            </b-button>
          </b-col>

           <!-- Search -->
           <b-col
            cols="9"
            md="2"
            class="d-flex align-items-center justify-content-start mb-1"
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

        </b-row>

      </div>
    </b-card>

    <b-card title="ยอดเดินบัญชีธนาคาร">
      <!-- table -->
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :rtl="direction"
        :line-numbers="true"
        :search-options="{
          enabled: false,
          externalQuery: searchTerm }"
        :select-options="{
          enabled: true,
          selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
          selectionInfoClass: 'custom-class',
          selectionText: 'rows selected',
          clearSelectionText: 'clear',
          disableSelectInfo: true, // disable the select info panel on top
          selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
        }"
        :pagination-options="{
          enabled: true,
          perPage:pageLength
        }"         
        theme="polar-bear"
      >
        <template
          slot="table-row"
          slot-scope="props"
        >
        
<!-- 
          <span v-if="props.column.field === 'action'" >
            <span>
              <b-dropdown
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template v-slot:button-content>
                  <feather-icon
                    icon="MoreVerticalIcon"
                    size="16"
                    class="text-body align-middle mr-25"
                  />
                </template>
                <b-dropdown-item
                  @click="viewitem(props.row)"
                >
                  <feather-icon
                    icon="Link2Icon"
                    class="mr-50"
                  />
                  <span >View</span>
                </b-dropdown-item>

                <b-dropdown-item>
                  <feather-icon
                    icon="Edit2Icon"
                    class="mr-50"
                  />
                  <span>Edit</span>
                </b-dropdown-item>
                <b-dropdown-item>
                  <feather-icon
                    icon="TrashIcon"
                    class="mr-50"
                  />
                  <span>Delete</span>
                </b-dropdown-item>
              </b-dropdown>
            </span>
          </span> -->

          <div v-if="props.column.field === 'deposit2'">              
                <b-badge
                    pill
                    :variant="resolveStatusVariant(1)"
                    class="text-capitalize"
                    v-if="props.row.deposit>0"
                >
                    {{props.row.deposit}}
                </b-badge>
          </div>

          <div v-if="props.column.field === 'withdraw2'">              
                <b-badge
                    pill
                    :variant="resolveStatusVariant(0)"
                    class="text-capitalize"
                    v-if="props.row.withdraw>0"
                >
                    {{props.row.withdraw}}
                </b-badge>
          </div>
       
          <span>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>

        
        <template
          slot="pagination-bottom"
          slot-scope="props"
        >
          <div class="d-flex justify-content-between flex-wrap">
            <div class="d-flex align-items-center mb-0 mt-1">
              <span class="text-nowrap ">
                {{t("Showing") +" 1 " + t("to") }}
              </span>
              <b-form-select
                v-model="pageLength"
                :options="['3','5','10']"
                class="mx-1"
                @input="(value)=>props.perPageChanged({currentPerPage:value})"
              />
              <span class="text-nowrap"> {{t('of')}} {{ props.total }} {{t('entries')}} </span>
            </div>
            <div>
              <b-pagination
                :value="1"
                :total-rows="props.total"
                :per-page="pageLength"
                first-number
                last-number
                align="right"
                prev-class="prev-item"
                next-class="next-item"
                class="mt-1 mb-0"
                @input="(value)=>props.pageChanged({currentPage:value})"
              >
                <template #prev-text>
                  <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                  />
                </template>
                <template #next-text>
                  <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                  />
                </template>
              </b-pagination>
            </div>
          </div>
        </template>
      </vue-good-table>

    </b-card>
  </div>
  
</template>

<script>

import BCardCode from '@core/components/b-card-code/BCardCode.vue';
import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,BRow, BCol,BButton,BFormDatepicker,BCard,BInputGroup, BInputGroupPrepend
} from 'bootstrap-vue';
import { VueGoodTable } from 'vue-good-table';
import { codeBasic } from './code';
import store from '@/store/index';
import { mapActions } from "vuex";

import { ref, onUnmounted } from '@vue/composition-api'

import ReportBankTransactionView from './ReportBankTransactionView.vue';

import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    // 'report-bank-transaction-view':ReportDepositView,
    ReportBankTransactionView,
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
    
  },  
  setup() {
    const { t } = useI18nUtils();

    function formatDateAssigned(value) {
      let formattedDate = new Date(value);
      // const formattedDate = new Date().fromISO(value).toLocaleString(DateTime.DATETIME_SHORT);
      return formattedDate.getFullYear()+'-'+ ('0' + (formattedDate.getMonth()+1)).slice(-2) +'-'+ ('0' + (formattedDate.getDate())).slice(-2) +' '+formattedDate.toLocaleTimeString('th-TH', {hour12: false});
    };

    let columns =  [
         {
          label: t('Date'),
          field: 'txnDateTime',          
          formatFn: formatDateAssigned,
        },
        {
          label: t('Detail'),
          field: 'txnRemark',
        },
        {
          label: t('Deposit'),
          field: 'deposit2',
          type: 'decimal',
        },            
        {
          label: t('Withdraw'),
          field: 'withdraw2',
          type: 'decimal',
        },            
        {
          label: t('Action'),
          field: 'action',
          width: '5%',
        },
      ];
    

    return {
      t,
      columns,      
    }
  },
  data() {
    const now = new Date();    
    const fDate =now.getFullYear()+'-'+ ('0' + (now.getMonth()+1)).slice(-2) +'-'+ ('0' + (now.getDate())).slice(-2);
    let curDate = new Date();
    curDate.setDate(curDate.getDate() + 1);
    const tDate =curDate.getFullYear()+'-'+ ('0' + (curDate.getMonth()+1)).slice(-2) +'-'+ ('0' + (curDate.getDate())).slice(-2);    
        
    const blankData = {
        credit: 0.00,
        credit_bonus: 0.00,
        date: null,
        username: '',        
      };

    return {
      fromDate: fDate,
      toDate: tDate,
      pageLength: 10,
      dir: false,   
      codeBasic,   
      
      rows: [],
      searchTerm: '',
      AgentSelected: '',
      AgentOptions: [
        { value: null, text: 'Agent' },
        // { value: 'ufgkxc11', text: 'ufgkxc11' },
      ],
      isAddNewUserSidebarActive : false,
      selectedDataRow : blankData,
      BankOptions:[],
      BankSelected:[],
      BankInfo:[],
      PageOptions:[],
      PageSelected: 1,
      nextPageId:'',
    }
  },
  computed: {
    resolveStatusVariant() {      
        const statusColor = {                    
          1: 'light-success',
          0: 'light-danger',          
        }
        return data => statusColor[data]
    },
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

    let tmpPage = [];
    for (let index = 1; index < 100; index++) {
      tmpPage.push(index);      
    }
    this.PageOptions = tmpPage;

    this.$http.get('/good-table/basic').then(res => { this.rows = res.data });      
    this.getAdminBank();
    this.PageSelected =1;
    
  },
  methods: {
   
   ...mapActions(["GetReportBankTransaction"]),
   ...mapActions(["GetAdminBank"]),
   async search(){
      console.log('search');

      // console.log(this.fromDate);
      // console.log(this.toDate);
      // console.log(this.AgentSelected);       
      // console.log(this.searchTerm);
      // console.log(this.pageLength);
      
      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();
    
      formData.append("userid", userData.username);
      formData.append("token", userData.token);

      const tmpBankSelected = this.BankInfo.filter(x => x.id == this.BankSelected);

      

      formData.append("bank_acc_no", tmpBankSelected[0].bank_acc_number?tmpBankSelected[0].bank_acc_number:'' );
      formData.append("bank_id", tmpBankSelected[0].bank_id?tmpBankSelected[0].bank_id:'');

      formData.append("startDate", this.fromDate);
      formData.append("endDate", this.toDate);    
      
      if (this.PageSelected>1 && this.nextPageId=='' && tmpBankSelected[0].bank_id==1) 
      {
        this.PageSelected=1;
      }

      formData.append("pageSelected", this.PageSelected);
      formData.append("nextPageId", this.nextPageId);
      
      const response = await this.GetReportBankTransaction(formData);
      if (response.data.status=='success') 
      {
          // console.log(response.data);
          let tmpData = response.data.data;
          this.nextPageId = response.data.nextPageId?response.data.nextPageId:'';
          for (let index = 0; index < tmpData.length; index++) {
              const element = tmpData[index];          

              if (tmpBankSelected[0].bank_id==5) 
              {
                // tmpData[index]['descriptionType'] = tmpData[index]['txnCode']['description'];
                if (tmpData[index]['txnCode']['description']=="ฝากเงิน"||tmpData[index]['txnCode']['description']=="withdraw") 
                {
                  
                  tmpData[index]['deposit'] = tmpData[index]['txnAmount'];
                  tmpData[index]['withdraw'] = "";
                }
                else 
                {                  
                  tmpData[index]['deposit'] = "";
                  tmpData[index]['withdraw'] = tmpData[index]['txnAmount'];
                }
              }
              else if (tmpBankSelected[0].bank_id==1)
              {                
                tmpData[index]['txnDateTime'] = tmpData[index]['datetime'];
                tmpData[index]['txnRemark'] = tmpData[index]['bankdesc'];
                if (tmpData[index]['type']=="CR") 
                {                  
                  tmpData[index]['deposit'] = tmpData[index]['credit'];
                  tmpData[index]['withdraw'] = "";
                }
                else
                {
                  tmpData[index]['deposit'] = "";
                  tmpData[index]['withdraw'] = tmpData[index]['credit'];
                }
              }
          }

          // console.log(tmpData);
          // console.log(this.nextPageId);

          this.rows = tmpData;
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
   async getAdminBank()
   {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      formData.append("userid", userData.username);
      formData.append("token", userData.token);

      formData.append("searchWord", this.searchTerm);

      const response = await this.GetAdminBank(formData);
      if (response.data.status == 'success') {
        const bankData = response.data.data;
        
        let tmpArray = [];        
        let tmpInfo = [];       
        await bankData.forEach(element => {
          if (element.work_type=='NODE'||element.work_type=='IBK' && (element.bank_id==5 || element.bank_id==1)) {
            tmpArray.push({value : element.id ,text: element.bank_name+' '+element.bank_acc_number});  
            tmpInfo.push(element);
          }
          
        });
        
        this.BankInfo = tmpInfo;      
        this.BankOptions = tmpArray;        
        this.BankSelected = tmpArray[0].value;
      }
      else
      {
        this.BankOptions =  [];
      }

   },  
   formatDateAssigned(value) {
      let formattedDate = new Date(value);
      // const formattedDate = new Date().fromISO(value).toLocaleString(DateTime.DATETIME_SHORT);
      return formattedDate.getFullYear()+'-'+ ('0' + (formattedDate.getMonth()+1)).slice(-2) +'-'+ ('0' + (formattedDate.getDate())).slice(-2) +' '+formattedDate.toLocaleTimeString('th-TH', {hour12: false});
      
   },
   viewitem(row)
   {
    // console.log(row);
    this.isAddNewUserSidebarActive = true;
    const tmpData = {
      credit : row['credit'],
      credit_bonus : row['credit_bonus'],
      date : row['date'],
      username : row['username'],
    };
    this.selectedDataRow = tmpData;
    // console.log(this.selectedDataRow);
   },
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
