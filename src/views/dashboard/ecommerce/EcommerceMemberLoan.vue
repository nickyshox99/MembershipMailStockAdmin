<template>
  <b-card    
    class="card-congratulation-medal"
  >
    <b-card-text class="font-small-3">
      ลูกค้าทั้งหมด
    </b-card-text>

    <h3 class="mb-75 mt-2 pt-50" >
      <b-link> {{ dataMember.countMember.toLocaleString() }} คน</b-link>
    </h3>

    <b-card-text class="font-small-3">
      <h6> ลูกค้าใหม่ {{ dataMember.countNewMember.toLocaleString() }} คน  </h6>
    </b-card-text>

    <b-img
      :src="require('@/assets/images/illustration/badge.svg')"
      class="congratulation-medal"
      alt="Medal Pic"
    />


  </b-card>
</template>

<script>
import {
  BCard, BCardText, BLink, BButton, BImg,BFormSelect
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { kFormatter } from '@core/utils/filter'

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
      return {
      
      }
    },
  props: {
    
    dataMember:{
      type: Object,
      default: () => {},
    },       
  },
  data() {
    return {

    }
  },
  watch: {
   
  },  
  methods: {
    kFormatter,   
  }, 
  created() 
  {   
   
  }
}
</script>
