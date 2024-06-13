<template>
  <b-card
    v-if="data"
    no-body
    class="card-statistics"
  >
    <b-card-header>
      <b-card-title>{{t('Agent Remain Credit')}} : {{ remainCredit }} </b-card-title>
      <b-card-text class="font-small-2 mr-25 mb-0">
        {{t('Updated at')}} .. {{ data.latestUpdate  }}
      </b-card-text>      
    </b-card-header>
    <b-card-body class="statistics-body">
      <b-row style="justify-content: space-between;">
        <!--b-col
          key="GiftIcon2"
          xl="2"
          sm="6"
          class="mb-2 mb-xl-0"
        >
          <b-media no-body>
            <b-media-aside

              class="mr-2"
            >
              <b-avatar
                size="48"
                variant="light-primary"
              >
                <feather-icon
                  size="24"
                  icon="GiftIcon"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{kFormatter(data.sumRefund)}}/{{ data.countRefund }}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                คืนยอดเสีย
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col--->

        <b-col
          key="TrendingUpIcon"
          xl="3"
          sm="6"
          class="mb-4 mb-xl-0"
        >
          <b-media no-body>
            <b-media-aside

              class="mr-2"
            >
              <b-avatar
                size="48"
                variant="light-success"
              >
                <feather-icon
                  size="24"
                  icon="TrendingUpIcon"
                />
              </b-avatar>
            </b-media-aside>

            <b-media-body class="my-auto" v-if="(reportSelectedIn==2)">
              <h4 class="font-weight-bolder mb-0" >
                ${{data.sumDeposit}} 
              </h4>              
              <b-card-text class="font-small-3 mb-0">
                {{t('Deposit')}} {{ data.countDeposit }} {{t('Transaction')}}
              </b-card-text>
            </b-media-body>

            <b-media-body class="my-auto" v-if="(reportSelectedIn==1)">
              <h4 class="font-weight-bolder mb-0" >
                ${{data.sumDepositWeek}} 
              </h4>              
              <b-card-text class="font-small-3 mb-0">
                {{t('Deposit')}} {{ data.countDepositWeek }} {{t('Transaction')}}
              </b-card-text>
            </b-media-body>

            <b-media-body class="my-auto" v-if="(reportSelectedIn==0)">
              <h4 class="font-weight-bolder mb-0" >
                ${{data.sumDepositDay}} 
              </h4>
              <b-card-text class="font-small-3 mb-0">
                {{t('Deposit')}} {{ data.countDepositDay }} {{t('Transaction')}}
              </b-card-text>
            </b-media-body>

           
          </b-media>
        </b-col>

        <b-col
          key="BoxIcon"
          xl="3"
          sm="6"
          class="mb-4 mb-xl-0"
        >
          <b-media no-body>
            <b-media-aside

              class="mr-2"
            >
              <b-avatar
                size="48"
                variant="light-danger"
              >
                <feather-icon
                  size="24"
                  icon="TrendingDownIcon"
                />
              </b-avatar>
            </b-media-aside>

            <b-media-body class="my-auto"  v-if="(reportSelectedIn==2)">
              <h4 class="font-weight-bolder mb-0">
                ${{data.sumWithdraw}}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                {{t('Withdraw')}} {{ data.countWithdraw }} {{t('Transaction')}}
              </b-card-text>
            </b-media-body>

            <b-media-body class="my-auto"  v-if="(reportSelectedIn==1)">
              <h4 class="font-weight-bolder mb-0">
                ${{data.sumWithdrawWeek}}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                {{t('Withdraw')}} {{ data.countWithdrawWeek }} {{t('Transaction')}}
              </b-card-text>
            </b-media-body>

            <b-media-body class="my-auto" v-if="(reportSelectedIn==0)">
              <h4 class="font-weight-bolder mb-0">
                ${{data.sumWithdrawDay}}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                {{t('Withdraw')}} {{ data.countWithdrawDay }} {{t('Transaction')}}
              </b-card-text>
            </b-media-body>

          </b-media>
        </b-col>

        <b-col
          key="GiftIcon"
          xl="3"
          sm="6"
          class="mb-4 mb-xl-0"
        >
          <b-media no-body>
            <b-media-aside

              class="mr-2"
            >
              <b-avatar
                size="48"
                variant="light-warning"
              >
                <feather-icon
                  size="24"
                  icon="GiftIcon"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto" v-if="(reportSelectedIn==2)">
              <h4 class="font-weight-bolder mb-0">
                ${{data.sumBonus}}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                {{t('Bonus')}} {{ data.countBonus }} {{t('Transaction')}}
              </b-card-text>
            </b-media-body>
            <b-media-body class="my-auto" v-if="(reportSelectedIn==1)">
              <h4 class="font-weight-bolder mb-0">
                ${{data.sumBonusWeek}}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                {{t('Bonus')}} {{ data.countBonusWeek }} {{t('Transaction')}}
              </b-card-text>
            </b-media-body>
            <b-media-body class="my-auto" v-if="(reportSelectedIn==0)">
              <h4 class="font-weight-bolder mb-0">
                ${{data.sumBonusDay}}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                {{t('Bonus')}} {{ data.countBonusDay }} {{t('Transaction')}}
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>

        <b-col
          key="DollarSignIcon"
          xl="2"
          sm="6"
          class="mb-4 mb-xl-0"
        >
          <b-media no-body>
            <b-media-aside

              class="mr-2"
            >
              <b-avatar
                size="48"
                variant="light-primary"
              >
                <feather-icon
                  size="24"
                  icon="DollarSignIcon"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto" v-if="(reportSelectedIn==2)">
              <h4 class="font-weight-bolder mb-0">
                ${{data.sumProfit}}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                {{t('Profit')}}
              </b-card-text>
            </b-media-body>
            <b-media-body class="my-auto" v-if="(reportSelectedIn==1)">
              <h4 class="font-weight-bolder mb-0">
                ${{data.sumProfitWeek}}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                {{t('Profit')}}
              </b-card-text>
            </b-media-body>
            <b-media-body class="my-auto" v-if="(reportSelectedIn==0)">
              <h4 class="font-weight-bolder mb-0">
                ${{data.sumProfitDay}}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                {{t('Profit')}}
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>

      </b-row>
    </b-card-body>
  </b-card>
</template>

<!-- statisticsItems: [
    {
      icon: 'TrendingUpIcon',
      color: 'light-primary',
      title: '230k',
      subtitle: 'Sales',
      customClass: 'mb-2 mb-xl-0',
    },
    {
      icon: 'UserIcon',
      color: 'light-info',
      title: '8.549k',
      subtitle: 'Customers',
      customClass: 'mb-2 mb-xl-0',
    },
    {
      icon: 'BoxIcon',
      color: 'light-danger',
      title: '1.423k',
      subtitle: 'Products',
      customClass: 'mb-2 mb-sm-0',
    },
    {
      icon: 'DollarSignIcon',
      color: 'light-success',
      title: '$9745',
      subtitle: 'Revenue',
      customClass: '',
    },
  ], -->

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardText, BCardBody, BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody,BFormSelect,
} from 'bootstrap-vue'

import { kFormatter } from '@core/utils/filter'

import { useUtils as useI18nUtils } from '@core/libs/i18n'


export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
    BFormSelect,
  },
  props: {
    data: {
      type: Object,
      default: {},
    },
    remainCredit:{
      type: String,
      default:''
    },
    reportSelected:{
      type: Number,
      default:0
    },  
  },
  setup() {
    const { t } = useI18nUtils();
    
    return {
      t,      
    }
  },
  data() {
    return {
      reportSelectedIn :0,      
    }
  },  
  watch: {
      reportSelected: async function (newVal, oldVal) {           
          this.reportSelectedIn = newVal;
      },        
  },
  model: {
        event: 'update:is-member-manage-edit-active',
    },
  methods: {
    kFormatter,
    formatDateAssigned(value) {      
      let formattedDate = new Date(value);   
      formattedDate = new Date(formattedDate.getTime() + 25200000); // 60 * 60 * 1000 * 8

      // const formattedDate = new Date().fromISO(value).toLocaleString(DateTime.DATETIME_SHORT);
      const returnformattedDate  = formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });      
      return returnformattedDate;

    },   
  },
  created()
  {
    
  },
}
</script>
