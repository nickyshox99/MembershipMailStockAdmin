<template>
  <b-card
    v-if="data"
    class="earnings-card"
  >
    <b-row>
      <b-col cols="4">
        <b-card-title class="mb-1">
          {{ t('Member Know Us') }}
        </b-card-title>
        <div class="font-small-2">
          
        </div>
        <h5 class="mb-1">
          {{ t('Register') }} {{ data.sum?data.sum.toLocaleString():0 }} {{ t('Account') }}
        </h5>
        <b-card-text class="text-muted font-small-2">
          <span class="font-weight-bolder"></span><span> </span>
        </b-card-text>
      </b-col>
      <b-col cols="8">        
        <vue-apex-charts 
          height="180"
          :options="knowusChart.chartOptions"
          :series="data.series"
        />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BRow, BCol, BCardTitle, BCardText,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'

import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BCardTitle,
    BCardText,
    VueApexCharts,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    title:{
      type: String,
      default: () => "",
    },   
  },
  setup(props, { emit }){     
    const { t } = useI18nUtils();
   
      return {
        t,     
      }
    },
  data() {
    return {
      knowusChart: {
        chartOptions: {
          chart: {
            type: 'donut',
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false,            
          },
          legend: { show: true },          
          labels: this.data.label,
          stroke: { width: 0 },
          colors: this.data.colors,
          grid: {
            padding: {
              right: -20,
              bottom: -8,
              left: -20,
            },
          },
          plotOptions: {
            pie: {
              startAngle: 0,
              donut: {
                labels: {
                  show: true,
                  name: {
                    offsetY: 15,
                  },
                  value: {
                    offsetY: -15,
                    formatter(val) {
                      // eslint-disable-next-line radix
                      return `${parseInt(val)} %`
                    },
                  },
                  total: {
                    show: true,
                    offsetY: 15,
                    label: '',
                    formatter() {
                      return "แหล่งที่มา"
                    },
                  },
                },
              },
            },
          },
          responsive: [
            {
              breakpoint: 1325,
              options: {
                chart: {
                  height: 100,
                },
              },
            },
            {
              breakpoint: 1200,
              options: {
                chart: {
                  height: 120,
                },
              },
            },
            {
              breakpoint: 1045,
              options: {
                chart: {
                  height: 100,
                },
              },
            },
            {
              breakpoint: 992,
              options: {
                chart: {
                  height: 120,
                },
              },
            },
          ],
        },
      },
    }
  },
}
</script>
