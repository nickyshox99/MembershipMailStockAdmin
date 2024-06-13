<template>  
  
  <div>

    <b-card no-body v-if="!showInspectApprove" >
        <div class="m-2">

        <!-- Table Top -->
        <b-row>
          <b-col
            cols="12"
            md="3"
            class="d-flex align-items-center justify-content-start mb-1"
          > 
            <b-form-datepicker id="fromDate" v-model="fromDate" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="th"></b-form-datepicker>          
          </b-col>
      
          <b-col
            cols="12"
            md="3"
            class="d-flex align-items-center justify-content-start mb-1"
          > 
            <b-form-datepicker id="toDate" v-model="toDate" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="th" ></b-form-datepicker>          
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


    <b-card :title="t('Old Report Summary')" v-if="!showInspectApprove">
      <!-- table -->
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :rtl="direction"
        :line-numbers="false"
        :search-options="{
          enabled: false,
          externalQuery: searchTerm }"
        :select-options="{
          enabled: false,
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
           
            <span v-if="props.column.field === 'interest2'"> 
                  <b-badge
                    pill
                    variant="info"
                >
                    {{(parseFloat(props.row.interest)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}} %
                </b-badge>
            </span>
            

            <span v-if="props.column.field === 'sumLoanAmount2'"> 
                  <b-badge
                    pill
                    variant="warning"
                >
                    {{(parseFloat(props.row.sumLoanAmount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                </b-badge>
            </span>

            <span v-if="props.column.field === 'sumInterestAmount2'"> 
                  <b-badge
                    pill
                    variant="success"
                >
                    {{(parseFloat(props.row.sumInterestAmount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                </b-badge>
            </span>

            <span v-if="props.column.field === 'keepAll1_2'"> 
                  <b-badge
                    pill
                    variant="secondary"
                >
                    {{(parseFloat(props.row.keepAll1)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                </b-badge>
            </span>

            <span v-if="props.column.field === 'shareAll1_2'"> 
                  <b-badge
                    pill
                    variant="secondary"
                >
                    {{(parseFloat(props.row.shareAll1)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                </b-badge>
            </span>

            <span v-if="props.column.field === 'shareAll2_2'"> 
                  <b-badge
                    pill
                    variant="secondary"
                >
                    {{(parseFloat(props.row.shareAll2)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                </b-badge>
            </span>

            <span v-if="props.column.field === 'sumPaidPrinciple2'"> 
                  <b-badge
                    pill
                    variant="success"
                >
                    {{(parseFloat(props.row.sumPaidPrinciple)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                </b-badge>
            </span>

            <span v-if="props.column.field === 'sumPaidInterest2'"> 
                  <b-badge
                    pill
                    variant="success"
                >
                    {{(parseFloat(props.row.sumPaidInterest)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                </b-badge>
            </span>

            
     
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
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,BRow, BCol,BButton,BFormDatepicker,BCard,BInputGroup, BInputGroupPrepend,BMedia,BLink,BFormCheckbox,BTabs,
    BTab,BFormTextarea,BImg
} from 'bootstrap-vue';
import { VueGoodTable } from 'vue-good-table';

import store from '@/store/index';
import { mapActions } from "vuex";

import { ref, onUnmounted } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'


import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { useUtils as useI18nUtils } from '@core/libs/i18n'


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
    BMedia,
    BLink,
    BFormCheckbox,
    BTabs,
    BTab,
    BFormTextarea,
    BImg,
    ToastificationContent,  
    

  },  
  directives: {
        Ripple,
    },
  // setup()
  // {
    
  //   const isAddNewUserSidebarActive = ref(false);
    
  //   return {
  //     // Sidebar
  //     isAddNewUserSidebarActive,
  //   }
  // }
  // ,
  setup() {
    const { t } = useI18nUtils();

    function formatDateAssigned(value) {
      let formattedDate = new Date(value);
      formattedDate = new Date(formattedDate.getTime() - 25200000); // 60 * 60 * 1000 * 8
      // const formattedDate = new Date().fromISO(value).toLocaleString(DateTime.DATETIME_SHORT);
      return formattedDate.getFullYear()+'-'+ ('0' + (formattedDate.getMonth()+1)).slice(-2) +'-'+ ('0' + (formattedDate.getDate())).slice(-2) +' '+formattedDate.toLocaleTimeString('th-TH', {hour12: false});
    };

    function formatDateAssigned2(value) {
            let formattedDate = new Date(value);
            formattedDate = new Date(formattedDate.getTime() - 3600000); // 60 * 60 * 1000 * 1
            return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2);
    };

      return {
      t,  
    
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

    let columns =  [        
          {
            label: this.$t('Type'),
            field: 'typeName',            
          },    
          {
            label: this.$t('Loan Amount'),
            field: 'sumLoanAmount2',            
          },
          {
            label: this.$t('Interest'),
            field: 'interest2',            
          },         
          {
            label: this.$t('Interest Amount'),
            field: 'sumInterestAmount2',            
          },
          {
            label: this.$t('Keep'),
            field: 'keepAll1_2',            
          },
          {
            label: this.$t('Share'),
            field: 'keepAll1_2',            
          },
          {
            label: this.$t('Share'),
            field: 'shareAll2_2',            
          },
          {
            label: this.$t('Principle Paid'),
            field: 'sumPaidPrinciple2',            
          },
          {
            label: this.$t('Interest Paid'),
            field: 'sumPaidInterest2',            
          }          
        ]; 

    return {
      tabIndex : 0,

      fromDate: fDate,
      toDate: tDate,
      pageLength: 10,
      pageLength3: 10,

      dir: false,   
      
      columns:columns,
      rows: [],
      searchTerm: '',
      showInspectApprove : false,

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
    this.$http.get('/good-table/basic').then(res => { this.rows = res.data });  
    
    await this.search();  
  },
  methods: {   
   ...mapActions(["GetOldSummaryReport"]),
   ...mapActions(["GetPagePermission"]),
   async search(){
      console.log('search');
      
      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();
    
      formData.append("userid", userData.username);
      formData.append("token", userData.token);

      formData.append("page_name", this.$route.name);
      formData.append("dateFrom", this.fromDate);
      formData.append("dateTo", this.toDate);
      

      const response = await this.GetOldSummaryReport(formData);
      if (response.data.status=='success') 
      {
                     
          this.rows = response.data.data;
        
          this.columns = [        
          {
            label: this.$t('Type'),
            field: 'typeName',            
          },    
          {
            label: this.$t('Loan Amount'),
            field: 'sumLoanAmount2',            
          },
          {
            label: this.$t('Interest'),
            field: 'interest2',            
          },         
          {
            label: this.$t('Interest Amount'),
            field: 'sumInterestAmount2',            
          },
          {
            label: this.$t('Keep')+" "+ this.rows[0].percent_all_0+" %",
            field: 'keepAll1_2',            
          },
          {
            label: this.$t('Share')+" "+ this.rows[0].percent_all_1+" %",
            field: 'shareAll1_2',            
          },
          {
            label: this.$t('Share')+" "+ this.rows[0].percent_all_2+" %",
            field: 'shareAll2_2',            
          },
          {
            label: this.$t('Principle Paid'),
            field: 'sumPaidPrinciple2',            
          },
          {
            label: this.$t('Interest Paid'),
            field: 'sumPaidInterest2',            
          }          
        ]; 
          
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

   formatDateAssigned(value) {
      let formattedDate = new Date(value);
      formattedDate = new Date(formattedDate.getTime() - 25200000); // 60 * 60 * 1000 * 8
      // const formattedDate = new Date().fromISO(value).toLocaleString(DateTime.DATETIME_SHORT);
      return formattedDate.getFullYear()+'-'+ ('0' + (formattedDate.getMonth()+1)).slice(-2) +'-'+ ('0' + (formattedDate.getDate())).slice(-2) +' '+formattedDate.toLocaleTimeString('th-TH', {hour12: false});
      
   },
   formatDateAssigned2(value) {
            let formattedDate = new Date(value);
            formattedDate = new Date(formattedDate.getTime() - 3600000); // 60 * 60 * 1000 * 1
            return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2);
    },
   
    
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>

<style>
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


</style>