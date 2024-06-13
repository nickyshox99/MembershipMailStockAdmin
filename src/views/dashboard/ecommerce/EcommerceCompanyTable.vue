<template>
  <b-card        
    class="card-company-table"
  >  
      
  
  <b-table
      :items="rows"
      responsive            
      :fields="fields"
      class="mb-0"      
    >
      
      <template #cell(bankname)="data">
        <div class="d-flex align-items-center">        
          <div class="myavatar" >
              <img v-bind:src="data.item.bank_ico" alt="avatar" style="margin-right:10px;" />
              {{ data.item.bank_name }}
            </div>
        </div>
      </template>

      <template #cell(bank_acc_name)="data">
        <div class="d-flex align-items-center">        
          <div>              
            <feather-icon icon="UserIcon" size="20" class="align-middle mr-25" />
              {{ data.item.bank_acc_name }}
          </div>
        </div>
      </template>

      <template #cell(bank_acc_number)="data">
        <div class="d-flex align-items-center">        
          <div>              
            <feather-icon icon="CreditCardIcon" size="20" class="align-middle mr-25" />
              {{ data.item.bank_acc_number }}
          </div>
        </div>
      </template>

      <template #cell(balance)="data">
        <div class="d-flex align-items-right text-success" >               
              {{ (data.item.balance).toFixed(2) }} ฿          
        </div>
      </template>

  </b-table>

<!-- 
    <vue-good-table ref="my-table" :columns="columns" :rows="rows" :rtl="direction" :line-numbers="false"
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

            <div class="myavatar" v-if="props.column.field === 'bank_name2'">
              <img v-bind:src="props.row.bank_ico" alt="avatar" style="margin-right:10px;" />
              {{ props.row.bank_name }}
            </div>

          
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
import {
  BCard, BTable, BAvatar, BImg,
} from 'bootstrap-vue'

import { VueGoodTable } from 'vue-good-table';
import store from '@/store/index';
import { mapActions } from "vuex";

import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    BCard,
    BTable,
    BAvatar,
    BImg,
    VueGoodTable,
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
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
  setup() {
    const { t } = useI18nUtils();

    function formatDateAssigned4(value) {
      let formattedDate = new Date(value);
      formattedDate = new Date(formattedDate.getTime() - 3600000); // 60 * 60 * 1000 * 1
      return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });
    };

    let columns =  [
        {
          label: t('Bank'),
          field: 'bank_name2',
          width: '25%',          
        },
        {
          label: t('Name'),
          field: 'bank_acc_name',
          width: '30%', 
        },
        {
          label: t('Number'),
          field: 'bank_acc_number',
          width: '30%', 
        },  
        {
          label: t('Type'),
          field: 'bank_type',
          width: '25%', 
        },   
        {
          label: t('Balance'),
          field: 'balance',
          type : 'decimal',
          width: '20%', 
        },
        
      ];

    let fields =   [        
        { key: 'bankname', label: t('Bank') },
        { key: 'bank_acc_name', label: t('Name') },
        { key: 'bank_acc_number', label: t('Bank Account Number') },
        { key: 'bank_type', label: t('Type') },
        { key: 'balance', label: t('Balance') },        
      ];
    
    return {
      t,
      columns,
      fields,
    }
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
    await this.getAdminBank();    
  },

  methods: {
    ...mapActions(["GetAdminBank"]),  
    async getAdminBank() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const User = new FormData();

        User.append("userid", userData.username);
        User.append("token", userData.token);

        const response = await this.GetAdminBank(User);
        if (response.data.status == 'success') {         
            let tmpData = response.data.data;
            for (let index = 0; index < tmpData.length; index++) {
              tmpData[index]['bank_ico'] = require('@/assets/images/bank_bg/' + tmpData[index]['bank_ico']);
              //tmpData[index]['bank_ico'] = '/images/bank_bg/' + tmpData[index]['bank_ico'];
              if(tmpData[index]['bank_type']=='BOTH')
              {
                tmpData[index]['bank_type']='ฝาก/ถอน';
              }
              else if(tmpData[index]['bank_type']=='DEPOSIT')
              {
                tmpData[index]['bank_type']='ฝาก';
              }
              else if(tmpData[index]['bank_type']=='WITHDRAW')
              {
                tmpData[index]['bank_type']='ถอน';
              }
              else 
              {
                tmpData[index]['bank_type']='พักเงิน';
              }
            }          
            this.rows = tmpData;          
            // console.log(this.adminBank);
        } else {

        }
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
