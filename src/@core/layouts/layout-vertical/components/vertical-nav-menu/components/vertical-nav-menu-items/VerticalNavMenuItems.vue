<template>
  
    <ul v-if="renderComponent">
      <component 
        :is="resolveNavItemComponent(item)"
        v-for="item in items"
        :key="item.header || item.title"
        :item="item"        
      />
    </ul>
  
</template>

<script>
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '@core/layouts/utils'
import { provide, ref } from '@vue/composition-api'
import VerticalNavMenuHeader from '../vertical-nav-menu-header'
import VerticalNavMenuLink from '../vertical-nav-menu-link/VerticalNavMenuLink.vue'
import VerticalNavMenuGroup from '../vertical-nav-menu-group/VerticalNavMenuGroup.vue'

import axios from "axios";

export default {
  components: {
    VerticalNavMenuHeader,
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
  },        
  data() 
  {
    return {
      renderComponent: true,
      intervalId : null,      
      intervalId2 : null,
    };
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    
  },
  setup(props) {       
    // console.log(props.items[5]);
    // console.log(props.items[6]);    
    provide('openGroups', ref([]))    
    return {
      resolveNavItemComponent,
    }
  },   
  created()
  {    
    // this.transactionTimer();
    this.items2 = this.items;
  },
  mounted()
  {
       
    // this.intervalId = setInterval(this.getBoth, 10000);
    // this.intervalId2 = setInterval(this.getWaitWithdrawApprove, 10000);
  },  
  beforeDestroy () {
    clearInterval(this.intervalId);
    // clearInterval(this.intervalId2);
  },

  methods:
  {
    // transactionTimer () 
    // {       
    //   this.items[5].tag = this.items[5].tag+1;
    //   this.items[6].tag = this.items[6].tag+1;
    //   this.forceRerender();
    //   setTimeout(() => {          
    //       this.transactionTimer()
    //   }, 10000)
    // },
    async getBoth(){
      this.getWaitDepositApprove();
      this.getWaitWithdrawApprove(); 
    },
    async getWaitWithdrawApprove()
    {
      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
        userid: userData.username,
        token: userData.token,
      }

      var body = {        
          searchWord: this.searchTerm,
      }

      let response;
      await axios.post("api/transaction/getwaitwithdrawtransaction",body,
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

      if (response.data.status == 'success') 
      {   
          let tmpData = response.data.data;
          this.items[6].tag = tmpData.length;                          
          this.forceRerender();
      }
    },
    async getWaitDepositApprove()
    {
      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
        userid: userData.username,
        token: userData.token,
      }

      var body = {        
          searchWord: this.searchTerm,
      }

      let response;
      await axios.post("api/transaction/getwaitdeposittransaction",body,
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

      if (response.data.status == 'success') 
      {   
          let tmpData = response.data.data;
          this.items[5].tag = tmpData.length;                          
          this.forceRerender();
      }
    },
    forceRerender() {
        // Removing my-component from the DOM
        // console.log("forceRerender "+this.items2[6].tag);
        this.renderComponent = false;

        this.$nextTick(() => {
          // Adding the component back in
          this.renderComponent = true;
        });
    }
  }
}
</script>
