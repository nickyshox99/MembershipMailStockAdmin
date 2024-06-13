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
      
      <template #cell(tw_mobile2)="data">
        <div class="d-flex align-items-center">        
          <div class="myavatar" >
              <img v-bind:src="data.item.bank_ico" alt="avatar" style="margin-right:10px;" />
              {{ data.item.tw_mobile }}
            </div>
        </div>
      </template>

      <template #cell(tw_name)="data">
        <div class="d-flex align-items-center">        
          <div>              
            <feather-icon icon="UserIcon" size="20" class="align-middle mr-25" />
              {{ data.item.tw_name }}
          </div>
        </div>
      </template>

      <template #cell(tw_type)="data">
        <div class="d-flex align-items-center">        
          <div>              
            
              {{ data.item.tw_type }}
          </div>
        </div>
      </template>

      <template #cell(tw_type_wallet2)="data">
        <div class="d-flex align-items-center">        
          <div>              
            
              {{ data.item.tw_type_wallet2 }}
          </div>
        </div>
      </template>


  </b-table>

    <!-- <vue-good-table ref="my-table" :columns="columns" :rows="rows" :rtl="direction" :line-numbers="false"
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


            <div class="myavatar" v-if="props.column.field === 'tw_mobile2'">
              <img v-bind:src="props.row.bank_ico" alt="avatar" style="margin-right:10px;" />
              {{ props.row.tw_mobile }}
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
          label: 'Number',
          field: 'tw_mobile2',  
          width: '20%',         
        },
        {
          label: 'Name',
          field: 'tw_name',
          width: '20%', 
        },        
        {
          label: 'Property',
          field: 'tw_type',
          width: '10%', 
        },
        {
          label: 'Type',
          field: 'tw_type_wallet2',
          width: '10%', 
        },
        {
          label: 'Balance',
          field: 'balance',
          type: 'decimal',   
          width: '10%',        
        },       
    ];

    let fields =   [        
        { key: 'tw_mobile2', label: t('Account Number') },
        { key: 'tw_name', label: t('Name') },
        { key: 'tw_type', label: t('Property') },
        { key: 'tw_type_wallet2', label: t('Type') },
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
    await this.getAdminTrueWallet();    
  },

  methods: {
    ...mapActions(["GetAdminTrueWallet"]),
    async getAdminTrueWallet() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const User = new FormData();

        User.append("userid", userData.username);
        User.append("token", userData.token);

        const response = await this.GetAdminTrueWallet(User);        
        if (response.data.status == 'success') {
          
          let tmpData = response.data.data;
          let listData = [];   
          for (let index = 0; index < tmpData.length; index++) {
            let rowData = tmpData[index];
            let jsonObj = JSON.parse(tmpData[index].meta_data);
            rowData.bank_ico = require('@/assets/images/bank_bg/tw.png');
            rowData.tw_type = jsonObj.tw_type?jsonObj.tw_type:'DEPOSIT';
            rowData.tw_type_wallet = jsonObj.tw_type_wallet?jsonObj.tw_type_wallet:'DEPOSIT';
            rowData.tw_mobile = jsonObj.tw_mobile?jsonObj.tw_mobile:'';
            rowData.tw_name = jsonObj.tw_name?jsonObj.tw_name:'';
            rowData.tw_username = jsonObj.tw_username?jsonObj.tw_username:'';
            rowData.tw_password = jsonObj.tw_password?jsonObj.tw_password:'';
            rowData.tw_pin = jsonObj.tw_pin?jsonObj.tw_pin:'';
            rowData.tw_key = jsonObj.tw_key?jsonObj.tw_key:'';
            rowData.login_token = jsonObj.login_token?jsonObj.login_token:'';
            rowData.tmn_id = jsonObj.tmn_id?jsonObj.tmn_id:'';
            rowData.balance = jsonObj.balance?jsonObj.balance:0.00;
            
            if(rowData.tw_type_wallet=="DEPOSIT_GIFT")
            {
              rowData.tw_type_wallet2 = "True AungPao";
            }
            else if(rowData.tw_type_wallet=="DEPOSIT")
            {
              rowData.tw_type_wallet2 = "True Wallet";
            }
            else if(rowData.tw_type_wallet=="DEPOSIT_SMS")
            {
              rowData.tw_type_wallet2 = "True SMS";
            }
            else
            {            
              rowData.tw_type_wallet2 = "-";
            }

            if(rowData['tw_type']=='BOTH')
              {
                rowData['tw_type']='ฝาก/ถอน';
              }
            else if(rowData['tw_type']=='DEPOSIT')
            {
              rowData['tw_type']='ฝาก';
            }
            else if(rowData['tw_type']=='WITHDRAW')
            {
              rowData['tw_type']='ถอน';
            }
            else 
            {
              rowData['tw_type']='พักเงิน';
            }

            listData.push(rowData);
          }

          // this.rows = tmpData;
          // console.log(response.data.data);
          // console.log(listData);
          this.rows = listData;
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
