<template>
  <b-card
    v-if="data"
    body-class="pb-50"
  >
    <h6>{{t('New Member Last 7 days')}}</h6>
    <h2 class="font-weight-bolder mb-1">
      {{(sumMember).toFixed(0)}}
    </h2>
    <!-- chart -->
    <vue-apex-charts
      height="70"
      :options="statisticsOrder.chartOptions"
      :series="data.series"
    />
  </b-card>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
import { kFormatter } from '@core/utils/filter'

import { useUtils as useI18nUtils } from '@core/libs/i18n'

const $barColor = '#f3f3f3'

export default {
  components: {
    BCard,
    VueApexCharts,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    sumMember: {
      type: Number,
      default:0,
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
      statisticsOrder: {
        chartOptions: {
          chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
              show: false,
            },
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
              top: -15,
              bottom: -15,
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '20%',
              startingShape: 'rounded',
              colors: {
                backgroundBarColors: [$barColor, $barColor, $barColor, $barColor, $barColor,$barColor, $barColor],
                backgroundBarRadius: 5,
              },
            },
          },
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: true,
            formatter(val) {
                      // eslint-disable-next-line radix
                      return `${kFormatter(val)}`
                    },                 
          },
          colors: [$themeColors.warning],         
          xaxis: {
            labels: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          tooltip: {
            x: {
              show: false,
            },
          },
        },
      },
    }
  },
  methods: {
    kFormatter,
  },
}
</script>
