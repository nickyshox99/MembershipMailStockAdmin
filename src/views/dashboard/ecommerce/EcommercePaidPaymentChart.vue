<template>
  <b-card
    v-if="data"
    class="card-tiny-line-stats"
    body-class="pb-50"
  >
    <h6>{{t('Payment')}}</h6>
    <h2 class="font-weight-bolder mb-1">
      {{(sumPaidAmount).toFixed(2)}}
    </h2>
    <!-- chart -->
    <vue-apex-charts
      height="70"
      :options="statisticsProfit.chartOptions"
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

const $trackBgColor = '#EBEBEB'

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
    sumPaidAmount: {
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
      statisticsProfit: {
        chartOptions: {
          chart: {

            type: 'line',
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
          },
          grid: {
            borderColor: $trackBgColor,
            strokeDashArray: 5,
            xaxis: {
              lines: {
                show: true,
              },
            },
            yaxis: {
              lines: {
                show: false,
              },
            },
            padding: {
              top: -30,
              bottom: -10,
            },
          },
          stroke: {
            width: 3,
          },
          colors: [$themeColors.warning,$themeColors.danger,$themeColors.success,],
          markers: {
            size: 0,
            colors: $themeColors.info,
            strokeColors: $themeColors.info,
            strokeWidth: 1,
            strokeOpacity: 1,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [
              {
                seriesIndex: 0,
                dataPointIndex: 5,
                fillColor: '#ffffff',
                strokeColor: $themeColors.info,
                size: 5,
              },
            ],
            shape: 'circle',
            radius: 2,
            hover: {
              size: 3,
            },
          },
          xaxis: {
            labels: {
              show: true,
              style: {
                fontSize: '0px',
              },
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
