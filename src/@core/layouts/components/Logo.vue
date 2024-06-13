<template>
    <img v-bind:src="logoUrl" v-bind:height="logoHeight" />    
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({  
  props: {
    logoUrl: 
    {
      default: 'logo1.png',
      type: String
    },
    logoHeight : {
      default: '50px',
      type: String
    },
  },
  
})

</script>

