<template>
  <b-card    
    class="card-company-table"
  >  
  
    <b-table
      :items="dataTable"
      responsive            
      :fields="fields"
      class="mb-0"      
    >
      
      <template #cell(username)="data">
        <div class="d-flex align-items-center">        
          <div>
            <div class="font-weight-bolder">
              <feather-icon icon="CreditCardIcon" size="20" class="align-middle mr-25" />
              {{ data.item.username }}
            </div>
            
          </div>
        </div>
      </template>

      <template #cell(bankdesc)="data">
        <div class="d-flex align-items-center">        
          <div>
            <div class="font-weight-bolder">
              <feather-icon icon="UserIcon" size="12" class="align-middle mr-25" />
              {{ data.item.bank_acc_name }}
            </div>            
            <div class="font-small-2 ">
              <feather-icon icon="SmartphoneIcon" size="12" class="align-middle mr-25" />
              {{ data.item.mobile_no }}
            </div>
          </div>
        </div>
      </template>

      <template #cell(credit_bonus)="data">
        <div class="d-flex align-items-right text-info">                  
            <div class="font-weight-bolder">
              {{ (data.item.credit_bonus).toFixed(2) }} ฿
            </div>            
        </div>
      </template>

      <template #cell(promotion)="data">
        <div class="d-flex align-items-center">                  
            <div class="">              
              <feather-icon icon="GiftIcon" size="12" class="align-middle mr-25" />
              {{ data.item.promotion }}
            </div>            
        </div>
      </template>
      

      <template #cell(date2)="data">
        <div class="d-flex align-items-center">        
          <div>
            <div class="font-weight-bolder">
              <feather-icon icon="CalendarIcon" size="12" class="align-middle mr-25" />{{ formatDateAssigned2(data.item.date) }}
            </div>
            <div class="font-small-2 text-muted">
              <feather-icon icon="ClockIcon" size="12" class="align-middle mr-25" /> {{ formatTimeAssigned(data.item.date) }}
            </div>
          </div>
        </div>
      </template>
    

    </b-table>

    
      <!-- <vue-good-table ref="my-table" :columns="columns" :rows="dataTable" :rtl="direction" :line-numbers="false"
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
            enabled: false,
            perPage: pageLength
          }" theme="polar-bear">
          <template slot="table-row" slot-scope="props">

            <div v-if="props.column.field === 'date2'">               
              <b-media vertical-align="center">            
                <feather-icon icon="ClockIcon" size="16" class="align-middle mr-25" /> {{ formatDateAssigned(props.row.date) }}
              </b-media>    
            </div>

            <b-media vertical-align="left">
              {{ props.formattedRow[props.column.field] }}
            </b-media> 
          </template>

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
      </vue-good-table> -->
    
  </b-card>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue';
import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BRow, BCol, BButton, BFormDatepicker, BCard, BInputGroup, BInputGroupPrepend,BMedia,BLink,BFormCheckbox,BTable
} from 'bootstrap-vue'

import { VueGoodTable } from 'vue-good-table';
import store from '@/store/index';
import { mapActions } from "vuex";

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
    BMedia,
    BLink,
    BFormCheckbox,
    BCardCode,
    BTable,
  },
  // props: {
  //   tableData: {
  //     type: Array,
  //     default: () => [],
  //   },
  // },
  setup() {
    const { t } = useI18nUtils();

    function formatDateAssigned4(value) {
      let formattedDate = new Date(value);
      formattedDate = new Date(formattedDate.getTime() - 3600000); // 60 * 60 * 1000 * 1
      return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });
    };

    let columns =  [
      {
          label: t('Date'),
          field: 'date2',
          width: '20%', 
        },
        {
          label: t('Username'),
          field: 'username',
          width: '15%', 
        },        
        {
          label: t('Credit'),
          field: 'credit_bonus',
          type : 'decimal',
          width: '10%', 
        },   
        {
          label: t('Promotion'),
          field: 'promotion',          
          width: '30%', 
        },
        {
          label: t('Note'),
          field: 'note',          
          width: '30%', 
        },
        
      ];

    let fields =   [        
        { key: 'username', label: t('Username') },
        { key: 'bankdesc', label: t('Information') },
        { key: 'credit_bonus', label: t('Credit') },
        { key: 'date2', label: t('Date') },
        { key: 'promotion', label: t('Promotion') },        
      ];
    
    return {
      t,
      columns,
      fields,
    }
  },
  props: {
    dataTable: {
      type: Array,
      default: () => [],
    },
    title:{
      type:String,
      default: () => '',
    }
  },
  computed: {
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
  data() {
    // return {
    //   fields: [
    //     { key: 'bank_name', label: 'Bank Name' },
    //     { key: 'bank_acc_number', label: 'Bank Account' },        
    //     { key: 'bank_type', label: 'Bank Type' },
    //     { key: 'balance', label: 'Balance' },        
    //   ],
    // }
    return {
      
      pageLength: 10,
      dir: false,            
      rows: [],
      searchTerm: '',         
    }
  },
  async created() {        
    
  },
  methods: {    
    formatDateAssigned(value) {      
      let formattedDate = new Date(value);   
      formattedDate = new Date(formattedDate.getTime() - 25200000); // 60 * 60 * 1000 * 8

      // const formattedDate = new Date().fromISO(value).toLocaleString(DateTime.DATETIME_SHORT);
      const returnformattedDate  = formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });      
      return returnformattedDate;

    },    
    formatDateAssigned2(value) {      
      let formattedDate = new Date(value);   
      formattedDate = new Date(formattedDate.getTime() - 25200000); // 60 * 60 * 1000 * 8

      // const formattedDate = new Date().fromISO(value).toLocaleString(DateTime.DATETIME_SHORT);
      const returnformattedDate  = formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2);  
      return returnformattedDate;

    },  
    formatTimeAssigned(value) {      
      let formattedDate = new Date(value);   
      formattedDate = new Date(formattedDate.getTime() - 25200000); // 60 * 60 * 1000 * 8

      // const formattedDate = new Date().fromISO(value).toLocaleString(DateTime.DATETIME_SHORT);
      const returnformattedDate  = formattedDate.toLocaleTimeString('th-TH', { hour12: false });      
      return returnformattedDate;

    },  
  },
  
}
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';
@import '@core/scss/vue/libs/vue-good-table.scss';

.card-company-table ::v-deep td .b-avatar.badge-light-company {
  .dark-layout & {
    background: $theme-dark-body-bg !important;
  }
}

.myavatar {
  display: flex;
  align-items: center;
}

.myavatar img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

</style>
