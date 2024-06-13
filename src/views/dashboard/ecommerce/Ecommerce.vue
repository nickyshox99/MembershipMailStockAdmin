<template>  
    <section id="dashboard">    
      <b-row class="match-height">
        <b-col
          xl="3"        
          md="3"
          lg="3"
          sm="12"
        >
          <ecommerce-medal :data="data.congratulations" :dataMember="dataMember" :userOnline="userOnline" :reportSelected="reportSelected" @update-report-select="updateReportSelect"  />
        </b-col>
        <b-col
          xl="9"
          md="9"
          lg="9"
          sm="12"
        >
          <ecommerce-statistics :data="dataReport" :remainCredit="remainCredit" :reportSelected="reportSelected"   />
        </b-col>
      </b-row>

      <b-row class="match-height">   
        <b-col
          xl="12"
          md="12"
          lg="12"
          sm="6"
        >
            <b-row class="match-height">
                <b-col    
                    xl="2"  
                    lg="2"
                    md="2"                  
                  >
                  <ecommerce-profit-chart :data="statisticsProfit" :sumProfit="sum7DayProfit" />
                </b-col>
                  
                <b-col
                    xl="2"  
                    lg="2"
                    md="2"                              
                  >
                  <ecommerce-new-member-chart :data="statisticsNewMember" :sumMember="sum7DayNewMember" />
                </b-col>
                  
                <b-col
                    xl="8"  
                    lg="8"
                    md="8"                        
                  >
                  <ecommerce-company-table  />
                </b-col>
            </b-row>  

            <b-row class="match-height">
              <b-col
                  xl="4"  
                  lg="4"
                  md="4"                
                >
                <ecommerce-earnings-chart :data="earningsChartData" :monthProfit="dataReport.sumProfit" />
              </b-col>
                            
              <b-col
                    xl="8"  
                    lg="8"
                    md="8"
                >
                <ecommerce-truewallet-table/>
              </b-col>
            </b-row>        
        </b-col>
      </b-row>

      <b-row class="match-height">
        <b-col
          xl="4"
          lg="4"
          md="6"
        >
          <ecommerce-transactions :data="dataDepTransaction" :title="tilteDep" /> 
        </b-col> 

        <b-col
          xl="4"
          lg="4"
          md="6"
        >
          <ecommerce-transactions :data="dataWitTransaction" :title="tilteWit" /> 
        </b-col> 

        <b-col
          xl="4"
          lg="4"
          md="6"
        >
          <ecommerce-transactions-reg :data="dataRegTransaction" :title="tilteReg" /> 
        </b-col> 
      </b-row>

      <b-row>      
        <b-col 
          xl="12"
          lg="12"
          md="12"
          >
          <ecommerce-bonus-table :dataTable="dataBonusTransaction" title="รับโปรโมชั่น" />
        </b-col>
      </b-row>
    </section>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

import { getUserData } from '@/auth/utils'
import EcommerceMedal from './EcommerceMedal.vue'
import EcommerceStatistics from './EcommerceStatistics.vue'
import EcommerceRevenueReport from './EcommerceRevenueReport.vue'
import EcommerceNewMemberChart from './EcommerceNewMemberChart.vue'
import EcommerceProfitChart from './EcommerceProfitChart.vue'
import EcommerceEarningsChart from './EcommerceEarningsChart.vue'
import EcommerceCompanyTable from './EcommerceCompanyTable.vue'
import EcommerceBonusTable from './EcommerceBonusTable.vue'
import EcommerceTruewalletTable from './EcommerceTruewalletTable.vue'
// import EcommerceMeetup from './EcommerceMeetup.vue'
// import EcommerceBrowserStates from './EcommerceBrowserStates.vue'
// import EcommerceGoalOverview from './EcommerceGoalOverview.vue'
import EcommerceTransactions from './EcommerceTransactions.vue'
import EcommerceTransactionsReg from './EcommerceTransactionsReg.vue'

import { useUtils as useI18nUtils } from '@core/libs/i18n'

import { mapActions } from "vuex";

export default {
  components: {
    BRow,
    BCol,
    EcommerceMedal,
    EcommerceStatistics,
    EcommerceRevenueReport,
    EcommerceNewMemberChart,
    EcommerceProfitChart,
    EcommerceEarningsChart,
    EcommerceCompanyTable,
    EcommerceBonusTable,
    EcommerceTruewalletTable,
    // EcommerceMeetup,
    // EcommerceBrowserStates,
    // EcommerceGoalOverview,
    EcommerceTransactions,
    EcommerceTransactionsReg,
  },
  setup() {
    const { t } = useI18nUtils();
    
    let tilteDep = t("Last Deposit Transaction");
    let tilteWit = t("Last Withdraw Transaction");
    let tilteReg = t("Last Register");

    return {
      t,     
      tilteDep, 
      tilteWit,
      tilteReg,
    }
  },
  data() {
    return {
      data: {},
      intervalId : null,
      intervalId2 : null,
      intervalId3 : null,
      intervalId4 : null,
      intervalId5 : null,
      intervalId6 : null,
      intervalId7 : null,
      intervalId8 : null,
      dataReport : {},
      dataMember:{},
      adminBank:[],
      dataTransaction:[],
      dataDepTransaction:[],
      dataWitTransaction:[],
      dataRegTransaction:[],
      dataBonusTransaction:[],
      userOnline : 0,
      remainCredit:'',   
      reportSelected: 0,      
      earningsChartData: {},  
      statisticsNewMember:{},
      statisticsProfit:{},
      sum7DayProfit : 0,
      sum7DayNewMember :0,
    }
  },  
  mounted()
  {
    // this.getLastTransaction();
    this.getLastDepTransaction();
    this.getLastWitTransaction();
    this.getLastRegTransaction();
    this.getLastBonusTransaction();
    this.getDashboardData();    
    this.getOnlineUser();
    this.getAgentBalance();

    // this.intervalId = setInterval(this.getSumMemberData, 10000)
    // this.intervalId = setInterval(this.getLastTransaction, 10000)
    this.intervalId2 = setInterval(this.getDashboardData, 60000);
    this.intervalId3 = setInterval(this.getOnlineUser, 60000);
    this.intervalId4 = setInterval(this.getAgentBalance, 60000);

    this.intervalId5 = setInterval(this.getLastDepTransaction, 10000);
    this.intervalId6 = setInterval(this.getLastWitTransaction, 10000);
    this.intervalId7 = setInterval(this.getLastRegTransaction, 10000);
    this.intervalId8 = setInterval(this.getLastBonusTransaction, 10000);

    this.reportSelected=0;
    

  },
  beforeDestroy () {
    // clearInterval(this.intervalId);
    clearInterval(this.intervalId2);
    clearInterval(this.intervalId3);
    clearInterval(this.intervalId4);

    clearInterval(this.intervalId5);
    clearInterval(this.intervalId6);
    clearInterval(this.intervalId7);
    clearInterval(this.intervalId8);
  },
  created() {
    // data
    this.$http.get('/ecommerce/data')
      .then(response => {
        this.data = response.data
        // ? Your API will return name of logged in user or you might just directly get name of logged in user
        // ? This is just for demo purpose  
        const userData = getUserData();
        this.data.congratulations.name = userData.fullName.split(' ')[0] || userData.username;    
      });

     this.dataReport = {
        countMember:0,
        countNewMember:0,
        countDeposit:0,
        sumDeposit:0.00,
        countWithdraw:0,
        sumWithdraw:0.00,        
        sumProfit:"0.00",
        countBonus:0,
        sumBonus:0.00,
        sumRefund:0.00,
        countRefund:0.00,
        latestUpdate : this.formatDateAssigned(new Date()),
      };

      this.dataMember ={
        countMember :0,
        countNewMember :0,
      }

      this.earningsChartData = {
        series: [0, 0],
      }

      this.statisticsNewMember = {
        series: [
          {
            name: 'New Member',
            data: [0, 0, 0, 0, 0, 0, 0],
          },
        ],
      }

      this.statisticsProfit = {
        series: [
          {
            name: 'Profit',
            data: [0, 0, 0, 0, 0, 0, 0],
          },
        ],
      }

      this.sum7DayProfit  = 0;
      this.sum7DayNewMember  = 0;
     
  },
  methods: {
    ...mapActions(["GetDashboardData"]),
    ...mapActions(["GetLastTransaction"]),
    ...mapActions(["GetLastDepTransaction"]),
    ...mapActions(["GetLastWitTransaction"]),    
    ...mapActions(["GetLastRegTransaction"]),    
    ...mapActions(["GetOnlineUser"]),
    ...mapActions(["GetAgentBalance"]),    
    ...mapActions(["GetLastBonusTransaction"]),
    formatDateAssigned(value) {      
      let formattedDate = new Date(value);   
      //formattedDate = new Date(formattedDate.getTime() - 25200000); // 60 * 60 * 1000 * 8

      // const formattedDate = new Date().fromISO(value).toLocaleString(DateTime.DATETIME_SHORT);
      const returnformattedDate  = formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });      
      return returnformattedDate;

    },
    updateReportSelect(newVal)
    {
        this.reportSelected = newVal;
    },
    async getDashboardData() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const User = new FormData();

      User.append("userid", userData.username);
      User.append("token", userData.token);

      const response = await this.GetDashboardData(User);
      if (response.data.status == 'success') {
          const dashboardInfo = response.data.data;
          this.dataReport = {
            countMember:dashboardInfo.countMember,
            countNewMember:dashboardInfo.countNewMember,
            countNewMemberWeek:dashboardInfo.countNewMemberWeek,
            countNewMemberDay:dashboardInfo.countNewMemberDay,            
            
            countDeposit:dashboardInfo.countDeposit,
            sumDeposit:dashboardInfo.sumDeposit,
            countWithdraw:dashboardInfo.countWithdraw,
            sumWithdraw:dashboardInfo.sumWithdraw,                          
            countBonus:dashboardInfo.countBonus,
            sumBonus:dashboardInfo.sumBonus,
            countRefund:dashboardInfo.countRefund,
            sumRefund:dashboardInfo.sumRefund,                  
            sumProfit: (parseFloat(dashboardInfo.sumDeposit) - parseFloat(dashboardInfo.sumWithdraw)).toFixed(2),

            countDepositDay:dashboardInfo.countDepositDay,
            sumDepositDay:dashboardInfo.sumDepositDay,
            countWithdrawDay:dashboardInfo.countWithdrawDay,
            sumWithdrawDay:dashboardInfo.sumWithdrawDay,                          
            countBonusDay:dashboardInfo.countBonusDay,
            sumBonusDay:dashboardInfo.sumBonusDay,
            countRefundDay:dashboardInfo.countRefundDay,
            sumRefundDay:dashboardInfo.sumRefundDay,                  
            sumProfitDay: (parseFloat(dashboardInfo.sumDepositDay) - parseFloat(dashboardInfo.sumWithdrawDay)).toFixed(2),

            countDepositWeek:dashboardInfo.countDepositWeek,
            sumDepositWeek:dashboardInfo.sumDepositWeek,
            countWithdrawWeek:dashboardInfo.countWithdrawWeek,
            sumWithdrawWeek:dashboardInfo.sumWithdrawWeek,                          
            countBonusWeek:dashboardInfo.countBonusWeek,
            sumBonusWeek:dashboardInfo.sumBonusWeek,
            countRefundWeek:dashboardInfo.countRefundWeek,
            sumRefundWeek:dashboardInfo.sumRefundWeek,                  
            sumProfitWeek: (parseFloat(dashboardInfo.sumDepositWeek) - parseFloat(dashboardInfo.sumWithdrawWeek)).toFixed(2),

            latestUpdate : this.formatDateAssigned(new Date()),

          };

          this.statisticsNewMember = {
            series: [
              {
                name: 'New Member',
                data: dashboardInfo.seriesCountNewMember,
              },
            ],
          };    

          let ListProfitByDay = [];
          let sumProfit = 0;
          let sumNewMember = 0;
          for (let index = 0; index < dashboardInfo.seriesDeposit.length; index++) {
            const elementDep = dashboardInfo.seriesDeposit[index]?dashboardInfo.seriesDeposit[index]:0;
            const elementWit = dashboardInfo.seriesWithdraw[index]?dashboardInfo.seriesWithdraw[index]:0;            
            const profit = elementDep-elementWit;
            ListProfitByDay.push(parseFloat((profit).toFixed(2)));
            sumProfit+=profit;

            const elementNewMember = dashboardInfo.seriesCountNewMember[index]?dashboardInfo.seriesCountNewMember[index]:0;            
            sumNewMember+=elementNewMember;
          }
          
          this.sum7DayProfit = sumProfit;
          this.sum7DayNewMember = sumNewMember;

          
          
          this.statisticsProfit = {
            series: [
              {
                name: 'Profit',
                data: ListProfitByDay,
              },
            ],
          }

          let sumMonthDepositWithdraw = (dashboardInfo.sumDeposit+dashboardInfo.sumWithdraw);
          let percentDeposit = 50;
          let percentWirhdraw = 50;          
          if (sumMonthDepositWithdraw>0) {
            percentDeposit = parseFloat((dashboardInfo.sumDeposit / sumMonthDepositWithdraw * 100).toFixed(2));
            percentWirhdraw = parseFloat((dashboardInfo.sumWithdraw / sumMonthDepositWithdraw * 100).toFixed(2));  
          }
          this.earningsChartData = {
              series: [percentDeposit, percentWirhdraw],
            };

          this.dataMember = {
            countMember:dashboardInfo.countMember,
            countNewMember:dashboardInfo.countNewMember,        
            countNewMemberWeek:dashboardInfo.countNewMemberWeek,
            countNewMemberDay:dashboardInfo.countNewMemberDay,                     
          };


      } else {

      }
    }, 
    async getLastTransaction() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const User = new FormData();

      User.append("userid", userData.username);
      User.append("token", userData.token);

      const response = await this.GetLastTransaction(User);
      // console.log(response);
      if (response.data.status == 'success') {
          const transactionInfo = response.data.data;
          let tmpList = [];

          for (let index = 0; index < transactionInfo.length; index++) {
            const element = transactionInfo[index];

            let ico;
            try
            {
              ico = require('@/assets/images/bank_bg/' + element['bank_ico']);
            }
            catch
            {
              ico = require('@/assets/images/bank_bg/noimage.jpg');
            }

            let tmpData =  {
              mode: element['bank_name'],
              types: element['bank_acc_no']+' '+element['bank_acc_name'],
              avatar: element['transaction_type'].indexOf('DEP')!=-1?'CheckIcon':'TrendingUpIcon',
              avatarVariant: element['transaction_type'].indexOf('DEP')!=-1?'light-success':'light-danger',
              payment: element['credit']?element['credit']:0.00,
              deduction: element['transaction_type'].indexOf('DEP')!=-1?false:true,
              bank_ico : ico,
              index : index,
            }
            tmpList.push(tmpData);
          }
          
          this.dataTransaction = tmpList;


      } else {
        this.dataTransaction = [];
      }
    },
    async getLastDepTransaction() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const User = new FormData();

      User.append("userid", userData.username);
      User.append("token", userData.token);

      const response = await this.GetLastDepTransaction(User);
      // console.log(response);
      if (response.data.status == 'success') {
          const transactionDepInfo = response.data.data;
          let tmpList = [];

          for (let index = 0; index < transactionDepInfo.length; index++) {
            const element = transactionDepInfo[index];

            let ico;
            try
            {
              ico = require('@/assets/images/bank_bg/' + element['bank_ico']);
            }
            catch
            {
              ico = require('@/assets/images/bank_bg/noimage.jpg');
            }

            let tmpData =  {
              mode: element['bank_name'],
              types: element['bank_acc_no']+' '+element['bank_acc_name'],
              avatar: element['transaction_type'].indexOf('DEP')!=-1?'CheckIcon':'TrendingUpIcon',
              avatarVariant: element['transaction_type'].indexOf('DEP')!=-1?'light-success':'light-danger',
              payment: element['credit']?element['credit']:0.00,
              deduction: element['transaction_type'].indexOf('DEP')!=-1?false:true,
              bank_ico : ico,
              index : index,
              date: element['date'],
            }
            tmpList.push(tmpData);
          }
          
          this.dataDepTransaction = tmpList;


      } else {
        this.dataDepTransaction = [];
      }
    },
    async getLastWitTransaction() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const User = new FormData();

      User.append("userid", userData.username);
      User.append("token", userData.token);

      const response = await this.GetLastWitTransaction(User);
      // console.log(response);
      if (response.data.status == 'success') {
          const transactionWitInfo = response.data.data;
          let tmpList = [];

          for (let index = 0; index < transactionWitInfo.length; index++) {
            const element = transactionWitInfo[index];

            let ico;
            try
            {
              ico = require('@/assets/images/bank_bg/' + element['bank_ico']);
            }
            catch
            {
              ico = require('@/assets/images/bank_bg/noimage.jpg');
            }


            let tmpData =  {
              mode: element['bank_name'],
              types: element['bank_acc_no']+' '+element['bank_acc_name'],
              avatar: element['transaction_type'].indexOf('DEP')!=-1?'CheckIcon':'TrendingUpIcon',
              avatarVariant: element['transaction_type'].indexOf('DEP')!=-1?'light-success':'light-danger',
              payment: element['credit']?element['credit']:0.00,
              deduction: element['transaction_type'].indexOf('DEP')!=-1?false:true,
              bank_ico : ico,
              index : index,
              date: element['date'],
            }
            tmpList.push(tmpData);
          }
          
          this.dataWitTransaction = tmpList;


      } else {
        this.dataWitTransaction = [];
      }
    },
    async getLastRegTransaction() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const User = new FormData();
      

      User.append("userid", userData.username);
      User.append("token", userData.token);

      const response = await this.GetLastRegTransaction(User);
      // console.log(response);
      if (response.data.status == 'success') {
          const transactionWitInfo = response.data.data;
          // console.log(response.data.data);
          let tmpList = [];

          for (let index = 0; index < transactionWitInfo.length; index++) {
            const element = transactionWitInfo[index];

            let ico;
            try
            {
              ico = require('@/assets/images/bank_bg/' + element['bank_ico']);
            }
            catch
            {
              ico = require('@/assets/images/bank_bg/noimage.jpg');
            }
            
            let tmpData =  {
              mode: element['id'],
              types: element['fullname'],
              avatar: 'CheckIcon',
              avatarVariant: 'light-success',
              payment: '',
              deduction: false,
              bank_ico : ico,
              index : index,
              create_at: element['create_at'],
            }
            tmpList.push(tmpData);
          }
                    
          this.dataRegTransaction = tmpList;


      } else {
        this.dataRegTransaction = [];
      }
    },
    async getOnlineUser() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const User = new FormData();

      User.append("userid", userData.username);
      User.append("token", userData.token);

      const response = await this.GetOnlineUser(User);
      // console.log(response);
      if (response.data.status == 'success') {
          const tmpUserOnline = response.data.data;          
          this.userOnline = tmpUserOnline[0]['counts'];
          
      } else {
        this.userOnline =0;
      }
    },
    async getAgentBalance() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const User = new FormData();

      User.append("userid", userData.username);
      User.append("token", userData.token);

      const response = await this.GetAgentBalance(User);
      // console.log(response);
      if (response.data.status == 'success') {
          const tmpData = response.data.data;    
          // console.log(response.data.data);
          if (response.data.data.msgerror) 
          {
            this.remainCredit = response.data.data.msgerror;
          }    
          else
          {
            this.remainCredit = tmpData.toString();
          }
          
          
      } else {
        this.remainCredit=0;
      }
    },
    async getLastBonusTransaction() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const User = new FormData();

        User.append("userid", userData.username);
        User.append("token", userData.token);

        const response = await this.GetLastBonusTransaction(User);
        if (response.data.status == 'success') {         
            let tmpData = response.data.data;
            this.dataBonusTransaction = tmpData;         
            
        } else {

        }
      }, 
    
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';

</style>
