<template>
  <b-card
    v-if="data"
    class="card-congratulation-medal"
  >
    <h5>{{ t('Welcome') }}  🎉 {{ data.name }}!</h5>
    <b-card-text class="font-small-3">
      {{ t('New Member') }} / {{ t('All Member') }}
    </b-card-text>

    <h3 class="mb-75 mt-2 pt-50" v-if="(reportSelectedIn==2)">
      <b-link>{{ dataMember.countNewMember.toLocaleString() }} {{ t('Account') }} / {{ dataMember.countMember.toLocaleString() }} {{ t('Account') }}</b-link>
    </h3>

    <h3 class="mb-75 mt-2 pt-50" v-if="(reportSelectedIn==1)">
      <b-link>{{ dataMember.countNewMemberWeek.toLocaleString() }} {{ t('Account') }} / {{ dataMember.countMember.toLocaleString() }} {{ t('Account') }}</b-link>
    </h3>

    <h3 class="mb-75 mt-2 pt-50" v-if="(reportSelectedIn==0)">
      <b-link>{{ dataMember.countNewMemberDay.toLocaleString() }} {{ t('Account') }} / {{ dataMember.countMember.toLocaleString() }} {{ t('Account') }}</b-link>
    </h3>

    <b-card-text class="font-small-3">
      <h6> {{ t('Online') }} {{ userOnline.toLocaleString() }} {{ t('Account') }}  </h6>
    </b-card-text>

    <!-- <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
    >
      View Sales
    </b-button> -->
    <b-img
      :src="require('@/assets/images/illustration/badge.svg')"
      class="congratulation-medal"
      alt="Medal Pic"
    />

    <b-form-select v-model="reportSelectedIn" :options="reportOptions" @change="updateReportSelect" ></b-form-select>    

  </b-card>
</template>

<script>
import {
  BCard, BCardText, BLink, BButton, BImg,BFormSelect
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { kFormatter } from '@core/utils/filter'

import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    BCard,
    BCardText,
    BLink,
    BImg,
    BButton,
    BFormSelect,
  },
  directives: {
    Ripple,
  },
  setup(props, { emit }){     
    const { t } = useI18nUtils();
    let reportOptions = [
        {
            value: 0,
            text: t('Daily')
        },
        {
            value: 1,
            text: t('Weekly')
        },   
        {
            value: 2,
            text: t('Monthly')
        },     
    ];
      return {
        t,
        reportOptions,
      }
    },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    dataMember:{
      type: Object,
      default: () => {},
    },
    userOnline:{
      type: Number,
      default:0
    },
    reportSelected:{
      type: Number,
      default:0
    },    
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
  methods: {
    kFormatter,
    updateReportSelect(){        
        this.$emit('update-report-select',this.reportSelectedIn);
    },
  }, 
  created() 
  {   
    
  }
}
</script>
