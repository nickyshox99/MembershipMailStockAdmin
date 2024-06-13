<template>
  <ul
    id="main-menu-navigation"
    class="nav navbar-nav"
  >
    <component
      :is="resolveNavComponent(item)"
      v-for="item in items"
      :key="item.header || item.title"
      :item="item"
    />
  </ul>
</template>

<script>
import HorizontalNavMenuHeaderLink from '../horizontal-nav-menu-header-link/HorizontalNavMenuHeaderLink.vue'
import HorizontalNavMenuHeaderGroup from '../horizontal-nav-menu-header-group/HorizontalNavMenuHeaderGroup.vue'

export default {
  components: {
    HorizontalNavMenuHeaderLink,
    HorizontalNavMenuHeaderGroup,
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
  setup() {
    const resolveNavComponent = item => {
      if (item.children) return 'horizontal-nav-menu-header-group'
      return 'horizontal-nav-menu-header-link'
    }

    return {
      resolveNavComponent,
    }
  },
  created()
  {    
    // this.transactionTimer();
  },
  mounted()
  {
    this.getWaitDepositApprove();
    this.getWaitWithdrawApprove();
    this.intervalId = setInterval(this.getWaitDepositApprove, 10000);
    this.intervalId2 = setInterval(this.getWaitWithdrawApprove, 10000);
  },  
  beforeDestroy () {
    clearInterval(this.intervalId)
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

      if (response.data.status == 'success') {
          
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
        this.renderComponent = false;

        this.$nextTick(() => {
          // Adding the component back in
          this.renderComponent = true;
        });
    }
  }
}
</script>
