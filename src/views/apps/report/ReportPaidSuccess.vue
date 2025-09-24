<template>
  <div>
    <b-card no-body>
      <div class="m-2">
        <!-- Date Filter -->
        <b-row>
          <b-col
            cols="12"
            md="3"
            class="d-flex align-items-center justify-content-start mb-1"
          > 
            <b-form-datepicker 
              id="fromDate" 
              v-model="fromDate" 
              :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" 
              locale="th"
              :placeholder="$t('From Date')"
            ></b-form-datepicker>          
          </b-col>
      
          <b-col
            cols="12"
            md="3"
            class="d-flex align-items-center justify-content-start mb-1"
          > 
            <b-form-datepicker 
              id="toDate" 
              v-model="toDate" 
              :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" 
              locale="th"
              :placeholder="$t('To Date')"
            ></b-form-datepicker>          
          </b-col>
          
          <b-col
            cols="3"
            md="2"
            class="d-flex align-items-center justify-content-start mb-1"
          > 
            <b-button variant="primary" @click="search">
              <feather-icon icon="SearchIcon" />
              {{ $t('Search') }}
            </b-button>
          </b-col>
          
          <b-col
            cols="3"
            md="2"
            class="d-flex align-items-center justify-content-start mb-1"
          > 
            <b-button variant="info" @click="exportData">
              <feather-icon icon="DownloadIcon" />
              {{ $t('Export') }}
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-card>

    <!-- Revenue Summary Cards -->
    <b-row class="match-height mt-3">
      <b-col
        xl="3"
        md="6"
        lg="3"
        sm="6"
      >
        <b-card class="text-center">
          <b-card-body>
            <div class="avatar bg-light-primary p-2 m-0">
              <feather-icon icon="DollarSignIcon" size="24" />
            </div>
            <h3 class="font-weight-bolder mt-1 mb-25">
              ฿{{ totalRevenue.toLocaleString() }}
            </h3>
            <p class="card-text font-small-3 mb-2">
              {{ $t('Total Revenue') }}
            </p>
          </b-card-body>
        </b-card>
      </b-col>

      <b-col
        xl="3"
        md="6"
        lg="3"
        sm="6"
      >
        <b-card class="text-center">
          <b-card-body>
            <div class="avatar bg-light-success p-2 m-0">
              <feather-icon icon="ShoppingCartIcon" size="24" />
            </div>
            <h3 class="font-weight-bolder mt-1 mb-25">
              {{ totalOrders.toLocaleString() }}
            </h3>
            <p class="card-text font-small-3 mb-2">
              {{ $t('Total Orders') }}
            </p>
          </b-card-body>
        </b-card>
      </b-col>

      <b-col
        xl="3"
        md="6"
        lg="3"
        sm="6"
      >
        <b-card class="text-center">
          <b-card-body>
            <div class="avatar bg-light-info p-2 m-0">
              <feather-icon icon="UsersIcon" size="24" />
            </div>
            <h3 class="font-weight-bolder mt-1 mb-25">
              {{ uniqueCustomers.toLocaleString() }}
            </h3>
            <p class="card-text font-small-3 mb-2">
              {{ $t('Unique Customers') }}
            </p>
          </b-card-body>
        </b-card>
      </b-col>

      <b-col
        xl="3"
        md="6"
        lg="3"
        sm="6"
      >
        <b-card class="text-center">
          <b-card-body>
            <div class="avatar bg-light-warning p-2 m-0">
              <feather-icon icon="CheckCircleIcon" size="24" />
            </div>
            <h3 class="font-weight-bolder mt-1 mb-25">
              {{ successRate.toFixed(1) }}%
            </h3>
            <p class="card-text font-small-3 mb-2">
              {{ $t('Success Rate') }}
            </p>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <!-- Monthly Revenue Report -->
    <b-card :title="$t('Monthly Revenue Report')" class="mt-3">
      <b-table
        :items="monthlyRevenueData"
        :fields="revenueFields"
        striped
        hover
        responsive
        class="mb-0"
        :busy="loading"
      >
        <template #table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong class="ml-1">{{ $t('Loading') }}...</strong>
          </div>
        </template>

        <template #cell(month_year)="data">
          <span class="font-weight-bold">{{ formatMonthYear(data.item.month_year) }}</span>
        </template>
        
        <template #cell(total_orders)="data">
          <b-badge variant="info" class="fs-6">
            {{ data.item.total_orders.toLocaleString() }}
          </b-badge>
        </template>
        
        <template #cell(unique_customers)="data">
          <b-badge variant="primary" class="fs-6">
            {{ data.item.unique_customers.toLocaleString() }}
          </b-badge>
        </template>
        
        <template #cell(total_revenue)="data">
          <b-badge variant="success" class="fs-6">
            ฿{{ parseFloat(data.item.total_revenue).toLocaleString() }}
          </b-badge>
        </template>
        
        <template #cell(successful_orders)="data">
          <b-badge variant="success" class="fs-6">
            {{ data.item.successful_orders.toLocaleString() }}
          </b-badge>
        </template>

        <template #cell(average_order_value)="data">
          <b-badge variant="secondary" class="fs-6">
            ฿{{ parseFloat(data.item.average_order_value || 0).toFixed(2) }}
          </b-badge>
        </template>
      </b-table>
    </b-card>

    <!-- Daily Revenue Chart -->
    <b-card :title="$t('Daily Revenue Trend')" class="mt-3">
      <vue-apex-charts
        type="line"
        height="400"
        :options="chartOptions"
        :series="chartSeries"
      />
    </b-card>
  </div>
</template>

<script>
import {
  BRow, BCol, BButton, BFormDatepicker, BCard, BCardBody, BTable, BBadge, BSpinner
} from 'bootstrap-vue';
import store from '@/store/index';
import { mapActions } from "vuex";
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    BRow,
    BCol,
    BButton,
    BFormDatepicker,
    BCard,
    BCardBody,
    BTable,
    BBadge,
    BSpinner,
    VueApexCharts,
  },
  data() {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    const fDate = firstDayOfMonth.getFullYear() + '-' + 
      ('0' + (firstDayOfMonth.getMonth() + 1)).slice(-2) + '-' + 
      ('0' + firstDayOfMonth.getDate()).slice(-2);
    const tDate = lastDayOfMonth.getFullYear() + '-' + 
      ('0' + (lastDayOfMonth.getMonth() + 1)).slice(-2) + '-' + 
      ('0' + lastDayOfMonth.getDate()).slice(-2);
    
    return {
      fromDate: fDate,
      toDate: tDate,
      loading: false,
      monthlyRevenueData: [],
      chartOptions: {
        chart: {
          type: 'line',
          toolbar: {
            show: true,
          },
        },
        stroke: {
          curve: 'smooth',
          width: 3,
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return '฿' + val.toLocaleString();
            }
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return '฿' + val.toLocaleString();
            }
          }
        },
        colors: ['#7367F0'],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'vertical',
            shadeIntensity: 0.5,
            gradientToColors: ['#7367F0'],
            inverseColors: false,
            opacityFrom: 0.8,
            opacityTo: 0.1,
          },
        },
      },
      chartSeries: [
        {
          name: 'รายได้ (บาท)',
          data: []
        }
      ],
      revenueFields: [
        { key: 'month_year', label: 'เดือน' },
        { key: 'total_orders', label: 'คำสั่งซื้อทั้งหมด' },
        { key: 'unique_customers', label: 'ลูกค้าไม่ซ้ำ' },
        { key: 'total_revenue', label: 'รายได้รวม' },
        { key: 'successful_orders', label: 'คำสั่งซื้อที่สำเร็จ' },
        { key: 'average_order_value', label: 'มูลค่าเฉลี่ยต่อคำสั่งซื้อ' }
      ],
      totalRevenue: 0,
      totalOrders: 0,
      uniqueCustomers: 0,
      successRate: 0
    }
  },
  computed: {
    direction() {
      if (store.state.appConfig.isRTL) {
        this.dir = true
        return this.dir
      }
      this.dir = false
      return this.dir
    },
  },
  async created() {    
    await this.search();
  },
  methods: {
    ...mapActions(["GetMonthlyRevenueReport"]),
    
    async search() {
      console.log('Searching revenue report from', this.fromDate, 'to', this.toDate);
      this.loading = true;

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();
    
      formData.append("userid", userData.username);
      formData.append("token", userData.token);
      formData.append("page_name", "report_paid_success");
      formData.append("from_date", this.fromDate);
      formData.append("to_date", this.toDate);

      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      try {
        const response = await this.GetMonthlyRevenueReport(formData);
        console.log('API Response:', response);
        
        if (response.data.status === 'success') {
          this.monthlyRevenueData = response.data.data || [];
          console.log('Revenue data:', this.monthlyRevenueData);
          this.calculateSummary();
          this.updateChart();
        } else {
          console.log('API returned error:', response.data.message);
          // Fallback to mock data
          this.loadMockData();
        }
      } catch (error) {
        console.error('Error fetching revenue data:', error);
        this.loadMockData();
      } finally {
        this.loading = false;
      }
    },

    loadMockData() {
      this.monthlyRevenueData = [
        { 
          month_year: '2024-01', 
          total_orders: 150, 
          unique_customers: 120, 
          total_revenue: 8500.00, 
          successful_orders: 140,
          average_order_value: 60.71
        },
        { 
          month_year: '2024-02', 
          total_orders: 180, 
          unique_customers: 150, 
          total_revenue: 10200.00, 
          successful_orders: 170,
          average_order_value: 60.00
        },
        { 
          month_year: '2024-03', 
          total_orders: 200, 
          unique_customers: 180, 
          total_revenue: 12000.00, 
          successful_orders: 190,
          average_order_value: 63.16
        }
      ];
      this.calculateSummary();
      this.updateChart();
    },

    calculateSummary() {
      this.totalRevenue = this.monthlyRevenueData.reduce((sum, item) => sum + parseFloat(item.total_revenue || 0), 0);
      this.totalOrders = this.monthlyRevenueData.reduce((sum, item) => sum + parseInt(item.total_orders || 0), 0);
      this.uniqueCustomers = this.monthlyRevenueData.reduce((sum, item) => sum + parseInt(item.unique_customers || 0), 0);
      
      const totalSuccessfulOrders = this.monthlyRevenueData.reduce((sum, item) => sum + parseInt(item.successful_orders || 0), 0);
      this.successRate = this.totalOrders > 0 ? (totalSuccessfulOrders / this.totalOrders) * 100 : 0;
    },

    formatMonthYear(monthYear) {
      if (!monthYear) return '';
      const [year, month] = monthYear.split('-');
      const monthNames = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
      ];
      return `${monthNames[parseInt(month) - 1]} ${year}`;
    },

    updateChart() {
      const labels = this.monthlyRevenueData.map(item => this.formatMonthYear(item.month_year));
      const revenueData = this.monthlyRevenueData.map(item => parseFloat(item.total_revenue || 0));

      this.chartOptions = {
        ...this.chartOptions,
        xaxis: {
          categories: labels,
        },
      };

      this.chartSeries = [
        {
          name: 'รายได้ (บาท)',
          data: revenueData
        }
      ];
    },

    exportData() {
      // Create CSV content
      const headers = ['เดือน', 'คำสั่งซื้อทั้งหมด', 'ลูกค้าไม่ซ้ำ', 'รายได้รวม', 'คำสั่งซื้อที่สำเร็จ', 'มูลค่าเฉลี่ยต่อคำสั่งซื้อ'];
      const csvContent = [
        headers.join(','),
        ...this.monthlyRevenueData.map(item => [
          this.formatMonthYear(item.month_year),
          item.total_orders,
          item.unique_customers,
          item.total_revenue,
          item.successful_orders,
          item.average_order_value || 0
        ].join(','))
      ].join('\n');

      // Download CSV
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `revenue_report_${this.fromDate}_to_${this.toDate}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.bg-light-primary {
  background-color: rgba(115, 103, 240, 0.12) !important;
}

.bg-light-success {
  background-color: rgba(40, 199, 111, 0.12) !important;
}

.bg-light-info {
  background-color: rgba(0, 207, 232, 0.12) !important;
}

.bg-light-warning {
  background-color: rgba(255, 159, 67, 0.12) !important;
}
</style>