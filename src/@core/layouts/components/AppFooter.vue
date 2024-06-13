<template>
  <p class="clearfix mb-0">
      
      
    <span class="float-md-left d-none d-md-block" style="display: none!important;">รักนะทุกคน จุ๊บๆ
      <feather-icon
        icon="HeartIcon"
        size="21"
        class="text-danger stroke-current"
      />
    </span>
      
      
    <span class="float-md-right d-block d-md-inline-block mt-15">
      COPYRIGHT  © {{ new Date().getFullYear() }}
      <b-link
        class="ml-25"
        href="#"
        target="_blank"
      >Super M</b-link>
      <span class="d-none d-sm-inline-block">, All rights Reserved</span>
    </span>

  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
