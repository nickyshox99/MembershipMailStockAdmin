<template>
  <section id="dashboard">
      <b-card title="แดชบอร์ดสรุป">
          
              <b-row>
                  <b-col cols="12" md="3" class="d-flex align-items-center justify-content-start mb-1">
                      <b-form-datepicker id="fromDate" v-model="fromDate" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="th"></b-form-datepicker>
                  </b-col>

                  <b-col cols="12" md="3" class="d-flex align-items-center justify-content-start mb-1">
                      <b-form-datepicker id="toDate" v-model="toDate" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="th"></b-form-datepicker>
                  </b-col>

                  <b-col cols="3" md="4" class="d-flex align-items-center justify-content-start mb-1">
                      <b-button variant="primary" @click="getDashboardData">
                          <feather-icon icon="SearchIcon" />
                      </b-button>
                  </b-col>   
              </b-row>
          
      </b-card>

      <b-row class="match-height">
            <b-col xl="3" md="3" lg="3" sm="12">
            <ecommerce-member-loan :dataMember="dataMember" />
          </b-col>
          <b-col xl="5" md="5" lg="5" sm="12">
            <ecommerce-paid-payment-chart :data="statisticsPaid" :sumPaidAmount="sumPaidAmount" v-if="renderComponent" />
          </b-col>
          <b-col xl="4" md="4" lg="4" sm="12">
            <ecommerce-cost-chart :data="costChartData"  />
          </b-col>
      </b-row>

      <b-row class="match-height">
          
          <b-col xl="3" md="3" lg="3" sm="3">
            <ecommerce-sum-card :data="dataPaid" />
          </b-col>
          <b-col xl="3" md="3" lg="3" sm="3">
            <ecommerce-sum-card :data="dataNotPaid" />
          </b-col>
          <b-col xl="3" md="3" lg="3" sm="3">
            <ecommerce-sum-card :data="dataFine" />
          </b-col>
          <b-col xl="3" md="3" lg="3" sm="3">
            <ecommerce-sum-card :data="dataCost" />
          </b-col>
      </b-row>
      
      <b-row class="match-height">     
          <b-col xl="12" md="12" lg="12" sm="12">
            <ecommerce-share-person :tableData="sharePersonTable" v-if="renderComponent" />
          </b-col>
      </b-row>
   
  </section>
</template>

<script>

import {
    getUserData
} from '@/auth/utils'

import BCardCode from '@core/components/b-card-code/BCardCode.vue';
import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,BRow, BCol,BButton,BFormDatepicker,BCard,BInputGroup, BInputGroupPrepend
} from 'bootstrap-vue';

import {
    mapActions
} from "vuex";

import axios from "axios";

import EcommerceMemberLoan from './EcommerceMemberLoan.vue'
import EcommerceSumCard from './EcommerceSumCard.vue'
import EcommerceCountCard from './EcommerceCountCard.vue'

import EcommerceCostChart from './EcommerceCostChart.vue'

import EcommerceSharePerson from './EcommerceSharePerson.vue'
import EcommercePaidPaymentChart from './EcommercePaidPaymentChart.vue'


import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
    components: {
        BCardCode,
        BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,BRow, BCol,BButton,BFormDatepicker,BCard,BInputGroup, BInputGroupPrepend,
        BRow,
        BCol,
        EcommerceMemberLoan,
        EcommerceSumCard,
        EcommerceCountCard,
        
        EcommerceCostChart,  
        EcommerceSharePerson,  
        EcommercePaidPaymentChart,
    },
    setup() {
        const { t } = useI18nUtils();

        function formatDateAssigned4(value) {
        let formattedDate = new Date(value);
        formattedDate = new Date(formattedDate.getTime() - 3600000); // 60 * 60 * 1000 * 1
        return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });
        };


        return {
            t,
        }

    },
    data() {

        const now = new Date();    
        const now2 = new Date();    
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDayOfMonth = new Date(now2.getFullYear(), now2.getMonth() + 1, 0);

        const fDate =firstDayOfMonth.getFullYear()+'-'+ ('0' + (firstDayOfMonth.getMonth()+1)).slice(-2) +'-'+ ('0' + (firstDayOfMonth.getDate())).slice(-2);
        const tDate =lastDayOfMonth.getFullYear()+'-'+ ('0' + (lastDayOfMonth.getMonth()+1)).slice(-2) +'-'+ ('0' + (lastDayOfMonth.getDate())).slice(-2);

        return {            
            fromDate: fDate,
            toDate: tDate,            
            intervalId: null,          
            dataReport: {},
            dataMember:{},
            dataPaid:{},
            dataNotPaid:{},
            dataFine:{},
            dataCost:{},
            dataInviteFriend:{},
            dataInviteCredit:{},
            dataRefund:{},
            costChartData:{},
            remainCredit: '',
            knowUs:[],
            knowUsSeries:[],
            sharePersonTable:[],
            renderComponent: true,

            statisticsPaid:{},
            sumPaidAmount:0,
            
        }
    },
    mounted() {

        this.getDashboardData();

        // this.intervalId = setInterval(this.getDashboardData, 60000);

        this.reportSelected = 0;

    },
    beforeDestroy() {
        clearInterval(this.intervalId);

    },
    async created() {

        const { t } = useI18nUtils();
              
        this.dataReport = {
           
        };

        this.dataMember = {
            countMember: 0,
            countNewMember: 0,
            countNewMemberAndDep:0,
        }

        this.dataPaid = {
            sum: 0,
            count: 0,
            icon: 'TrendingUpIcon',
            variant: 'light-success',
            title : 'Paid',
            unit :'Transaction',
        }

        this.dataNotPaid = {
            sum: 0,
            count: 0,
            icon: 'TrendingDownIcon',
            variant: 'light-danger',
            title : 'Not Paid',
            unit :'Transaction',
        }

        this.dataFine = {
            sum: 0,
            count: 0,
            icon: 'DollarSignIcon',
            variant: 'light-primary',
            title : 'Fine',
            unit :'Transaction',
        }

        this.dataCost = {
            sum: 0,
            count: 0,
            icon: 'GiftIcon',
            variant: 'light-warning',
            title : 'Cost',
            unit :'Transaction',
        }

        this.dataInviteCredit = {
            sum: 0,
            count: 0,
            icon: 'TrendingDownIcon',
            variant: 'light-warning',
            title : 'Credit From Invite',
            unit :'Transaction',
        }

        this.dataInviteFriend = {
            sum: 0,
            count: 0,
            icon: 'UsersIcon',
            variant: 'light-success',
            title : 'Register From Invite',
            unit :'คน',
        }
       

        this.dataRefund = {
            sum: 0,
            count: 0,
            icon: 'TrendingDownIcon',
            variant: 'light-warning',
            title : 'Credit From Refund',
            unit :'Transaction',
        }

        let colorsList = ['#4FFF84FF','#FFB3CBFF','#FFEA05FF','#FF4D00FF','#00AAFFFF','#E44DFFFF','#8C00FFFF','#4FFF84FF','#FFB3CBFF','#FFEA05FF','#FF4D00FF','#00AAFFFF','#E44DFFFF','#8C00FFFF'];
                        
        this.costChartData = {
              series: [50,50],
              label: [this.$t('Total Cost'),this.$t("Total Receive")],              
              sum:100,
              colors: colorsList.slice(2, 4),
        };

        this.sharePersonTable = [
            {
                _id:"",
                fullName: "",
                totalReceiveAmount:0.00,
                color : "#4FFF84FF"
            }
        ];

        this.statisticsPaid = {
            series: [
                {
                    name: this.$t('Fine'),
                    data: [0, 0, 0, 0, 0, 0, 0],
                },
                {
                    name: this.$t('Not Paid'),
                    data: [0, 0, 0, 0, 0, 0, 0],
                },
                
                {
                    name: this.$t('Paid'),
                    data: [0, 0, 0, 0, 0, 0, 0],
                },
            ],
         }
        
    },
    methods: {
        ...mapActions(["GetDashboardDataByDate2"]),
        ...mapActions(["GetAgentBalance"]),        
        formatDateAssigned(value) {
            let formattedDate = new Date(value);
            //formattedDate = new Date(formattedDate.getTime() - 25200000); // 60 * 60 * 1000 * 8

            // const formattedDate = new Date().fromISO(value).toLocaleString(DateTime.DATETIME_SHORT);
            const returnformattedDate = formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', {
                hour12: false
            });
            return returnformattedDate;

        },
        async getKnowus()
        {
            const userData = JSON.parse(localStorage.getItem('userData'));

            var headers = {
                userid: userData.username,
                token: userData.token,
            }

            var body = {        
                searchWord: "",
            }

            let response;
            await axios.post("api/refer/getrefer",body,
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
                let tmpList = [];
                let tmpListValue = [];
                let tmpData = response.data.data;        
                for (let index = 0; index < tmpData.length; index++) {
                    const element = tmpData[index];
                    tmpList.push(element['refer']);
                    tmpListValue.push(0);
                }
                this.knowUs = tmpList;
                this.knowUsSeries = tmpListValue;
            }
        },
        updateReportSelect(newVal) {
            this.reportSelected = newVal;
        },
        async getDashboardData() {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const User = new FormData();

            User.append("userid", userData.username);
            User.append("token", userData.token);
            User.append("dateFrom", this.fromDate);
            User.append("dateTo", this.toDate);

            User.append("page_name", this.$route.name);

            const response = await this.GetDashboardDataByDate2(User);
            if (response.data.status == 'success') {
                const dashboardInfo = response.data.data;
                this.dataMember = {
                    countMember: dashboardInfo.countMember,
                    countNewMember: dashboardInfo.countNewMember,
                    countNewMemberAndDep:dashboardInfo.countNewMemAndDep,
                }

                this.dataPaid = {
                    sum: dashboardInfo.sumPaid,
                    count: dashboardInfo.countPaid,
                    icon: 'TrendingUpIcon',
                    variant: 'light-success',
                    title : 'Paid',
                    unit :'Transaction',
                }

                this.dataNotPaid = {
                    sum: dashboardInfo.sumNotPaid,
                    count: dashboardInfo.countNotPaid,
                    icon: 'TrendingDownIcon',
                    variant: 'light-danger',
                    title : 'Not Paid',
                    unit :'Transaction',
                }

                this.dataFine = {
                    sum: dashboardInfo.sumFine,
                    count: dashboardInfo.countFine,
                    icon: 'DollarSignIcon',
                    variant: 'light-primary',
                    title : 'Fine',
                    unit :'Transaction',
                }

                this.dataCost = {
                    sum: dashboardInfo.sumCost,
                    count: dashboardInfo.countCost,
                    icon: 'GiftIcon',
                    variant: 'light-warning',
                    title : 'Cost',
                    unit :'Transaction',
                }

                this.dataRefund = {
                    sum: dashboardInfo.sumRefund,
                    count: dashboardInfo.countRefund,
                    icon: 'TrendingDownIcon',
                    variant: 'light-warning',
                    title : 'รับเครดิตจากคืนยอด',
                    unit :'Transaction',
                }

                this.dataInviteCredit = {
                    sum: dashboardInfo.sumAffCredit,
                    count: dashboardInfo.countAffCredit,
                    icon: 'TrendingDownIcon',
                    variant: 'light-warning',
                    title : 'รับเครดิตจากการเชิญเพื่อน',
                    unit :'Transaction',
                }

                this.dataInviteFriend = {
                    sum: 0,
                    count: dashboardInfo.countNewMemFromInvite,
                    icon: 'UsersIcon',
                    variant: 'light-success',
                    title : 'สมัครจากการแนะนำเพื่อน',
                    unit :'คน',
                }

                this.statisticsPaid = {
                    series: [
                        {
                            name: this.$t('Fine'),
                            data: dashboardInfo.listFine,
                        },
                        {
                            name: this.$t('Not Paid'),
                            data: dashboardInfo.listUnPaid,
                        },
                        {
                            name: this.$t('Paid'),
                            data: dashboardInfo.listPaid,
                        },
                        
                        
                    ],
                }

                this.sumPaidAmount = dashboardInfo.totalPaid;

                let colorsList = ['#4FFF84FF','#FFB3CBFF','#FFEA05FF','#FF4D00FF','#00AAFFFF','#E44DFFFF','#8C00FFFF','#4FFF84FF','#FFB3CBFF','#FFEA05FF','#FF4D00FF','#00AAFFFF','#E44DFFFF','#8C00FFFF'];
                let tmpLabels = [];
                let tmpSeries = [];
                let sum = 0;
                // for (let index = 0; index < dashboardInfo.countMemberGroupByKnowUs.length; index++) {
                //     const element = dashboardInfo.countMemberGroupByKnowUs[index];  
                //     if (element["knowus"]=="") 
                //     {
                        
                //     }
                //     else
                //     {
                        
                //         sum += (element["counts"]?element["counts"]:0);
                //     }
                // }   

                // for (let index = 0; index < dashboardInfo.countMemberGroupByKnowUs.length; index++) {
                //     const element = dashboardInfo.countMemberGroupByKnowUs[index];  
                //     if (element["knowus"]=="") 
                //     {
                        
                //     }
                //     else
                //     {
                //         tmpLabels.push(element["knowus"]);
                //         tmpSeries.push(parseFloat((element["counts"]/sum*100).toFixed(2)));                        
                //     }

                //     dashboardInfo.countMemberGroupByKnowUs[index]['color'] = "color : "+ colorsList[index]+";";
                // }       
                
                const sumTotal = dashboardInfo.sumCostAmount+ dashboardInfo.summaryReceive;
                const percentCost = Math.round((dashboardInfo.sumCostAmount/sumTotal*100) * 100) / 100 ;
                const percentReceive = Math.round((dashboardInfo.summaryReceive/sumTotal*100) * 100) / 100 ;

                this.costChartData = {
                    series: [percentCost,percentReceive],
                    label: [this.$t('Total Cost'),this.$t("Total Receive")],
                    sum: (dashboardInfo.sumCostAmount+dashboardInfo.summaryReceive),
                    colors: colorsList.slice(2, 4),
                };

                this.sharePersonTable = dashboardInfo.sharePerson;
                this.forceRerender();

                // console.log({
                //     series: tmpSeries,
                //     label: tmpLabels,
                //     sum:sum,
                //     colors: colorsList.slice(0, tmpSeries.length),
                // });

              
            } else {

            }
        },
        forceRerender() {      
     
        this.renderComponent = false;        
        this.$nextTick(() => {          
          this.renderComponent = true;
        });
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
                if (response.data.data.msgerror) {
                    this.remainCredit = response.data.data.msgerror;
                } else {
                    this.remainCredit = tmpData.toString();
                }

            } else {
                this.remainCredit = 0;
            }
        },

    }
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';
</style>
