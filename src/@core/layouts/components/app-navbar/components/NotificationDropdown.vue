<template>
  <b-nav-item-dropdown v-if="renderComponent" 
    class="dropdown-notification mr-25"
    menu-class="dropdown-menu-media"
    right
  >
    <template #button-content>
      <feather-icon
        :badge="badgeCount"
        badge-classes="bg-danger"
        class="text-body"
        icon="BellIcon"
        size="21"
      />
    </template>

    <!-- Header -->
    <li class="dropdown-menu-header">
      <div class="dropdown-header d-flex">
        <h4 class="notification-title mb-0 mr-auto">
          Notifications
        </h4>
        <b-badge
          pill
          variant="light-primary"
        >
          {{ badgeCount }}
        </b-badge>
      </div>
    </li>


    <!-- Notifications -->
    <vue-perfect-scrollbar
      v-once
      :settings="perfectScrollbarSettings"
      class="scrollable-container media-list scroll-area"
      tagname="li"
    >
    <div class="media d-flex align-items-center">
        <h6 class="font-weight-bolder mr-auto mb-0">
          Deposit / ฝากผิดพลาด
        </h6>      
      </div>

      <!-- Account Notification -->
      <b-link
        v-for="notification in approveDepNotifications"
        :key="notification.id"
        @click="goto('/apps/members/depdrawerror')" 
      >
        <b-media>
          <template #aside>
            <b-avatar
              size="32"
              :src="notification.avatar"
              :text="notification.avatar"
              :variant="notification.type"
            />            
          </template>
          <p class="media-heading">
            <span class="font-weight-bolder">
              {{ notification.title }}
            </span>
          </p>
          <small class="notification-text">{{ notification.subtitle }}</small>
          <feather-icon :icon="notification.icon" />
        </b-media>
      </b-link>

      <!-- System Notification Toggler -->
      <div class="media d-flex align-items-center">
        <h6 class="font-weight-bolder mr-auto mb-0">
          Withdraw / ถอน
        </h6>      
      </div>

      <!-- System Notifications -->
      <b-link
        v-for="notification in approveWitNotifications"
        :key="notification.id"
        @click="goto('/apps/members/withdrawapprove')"
      >
        <b-media>
          <template #aside>
            <b-avatar
              size="32"
              :variant="notification.type"
            >
              <feather-icon :icon="notification.icon" />
            </b-avatar>
          </template>
          <p class="media-heading">
            <span class="font-weight-bolder">
              {{ notification.title }}
            </span>
          </p>
          <small class="notification-text">{{ notification.subtitle }}</small>
          <feather-icon :icon="notification.icon" />
        </b-media>
      </b-link>
    </vue-perfect-scrollbar>

    <!-- Cart Footer -->
    <!-- <li class="dropdown-menu-footer"><b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      block
    >Read all notifications</b-button>
    </li> -->
  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BBadge, BMedia, BLink, BAvatar, BButton, BFormCheckbox,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'

import axios from 'axios'

export default {
  components: {
    BNavItemDropdown,
    BBadge,
    BMedia,
    BLink,
    BAvatar,
    VuePerfectScrollbar,
    BButton,
    BFormCheckbox,
  },
  directives: {
    Ripple,
  },
  setup() {
   
    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    }

    return {      
      perfectScrollbarSettings,
    }
  },
  data() 
  {
    return {
      renderComponent: true,
      intervalId : null,      
      intervalId2 : null,
      approveWitNotifications:null,
      approveDepNotifications:null,
      badgeCount : 0,
    }
  },  
  async created()
  {    
    // this.systemNotifications = [
    //   {
    //     title: 'Server down',
    //     subtitle: 'USA Server is down due to hight CPU usage',
    //     type: 'light-danger',
    //     icon: 'XIcon',
    //   },
    //   {
    //     title: 'Sales report generated',
    //     subtitle: 'Last month sales report generated',
    //     type: 'light-success',
    //     icon: 'CheckIcon',
    //   },
    //   {
    //     title: 'High memory usage',
    //     subtitle: 'BLR Server using high memory',
    //     type: 'light-warning',
    //     icon: 'AlertTriangleIcon',
    //   },
    // ];

    // this.approveNotifications = [
    //   {
    //     title: 'Congratulation Sam 🎉',
    //     avatar: require('@/assets/images/avatars/6-small.png'),
    //     subtitle: 'Won the monthly best seller badge',
    //     type: 'light-success',
    //   },
    //   {
    //     title: 'New message received',
    //     avatar: require('@/assets/images/avatars/9-small.png'),
    //     subtitle: 'You have 10 unread messages',
    //     type: 'light-info',
    //   },
    //   {
    //     title: 'Revised Order 👋',
    //     avatar: 'MD',
    //     subtitle: 'MD Inc. order updated',
    //     type: 'light-danger',
    //   },
    // ];

    // this.approveDepNotifications = [
    //   {
    //     id:1,
    //     title: 'Congratulation Sam 🎉',
    //     avatar: require('@/assets/images/avatars/6-small.png'),
    //     subtitle: 'Won the monthly best seller badge',
    //     type: 'light-success',
    //     icon: 'AlertTriangleIcon',
    //   },
    //   {
    //     id:2,
    //     title: 'New message received',
    //     avatar: require('@/assets/images/avatars/9-small.png'),
    //     subtitle: 'You have 10 unread messages',
    //     type: 'light-info',
    //     icon: 'AlertTriangleIcon',
    //   },
    //   {
    //     id:3,
    //     title: 'Revised Order 👋',
    //     avatar: 'MD',
    //     subtitle: 'MD Inc. order updated',
    //     type: 'light-danger',
    //     icon: 'AlertTriangleIcon',
    //   },
    // ];

    // this.approveWitNotifications = [
    //   {
    //     id:6,
    //     title: 'Congratulation Sam 🎉',
    //     avatar: require('@/assets/images/avatars/6-small.png'),
    //     subtitle: 'Won the monthly best seller badge',
    //     type: 'light-success',
    //     icon: 'AlertTriangleIcon',
    //   },
    //   {
    //     id:4,
    //     title: 'New message received',
    //     avatar: require('@/assets/images/avatars/9-small.png'),
    //     subtitle: 'You have 10 unread messages',
    //     type: 'light-info',
    //     icon: 'AlertTriangleIcon',
    //   },
    //   {
    //     id:5,
    //     title: 'Revised Order 👋',
    //     avatar: 'MD',
    //     subtitle: 'MD Inc. order updated',
    //     type: 'light-danger',
    //     icon: 'AlertTriangleIcon',
    //   },
    // ];

    this.badgeCount=0;
    this.approveDepNotifications = [];
    this.approveWitNotifications = [];    
    await this.getBoth();
    // console.log(this.approveDepNotifications);
    this.intervalId = setInterval(this.getBoth, 10000);
    
  },
  async mounted()
  {    
    // this.badgeCount=0;
    // this.approveDepNotifications = [];
    // this.approveWitNotifications = [];
    // this.renderComponent = false;
    // await this.getBoth();
    // this.intervalId = setInterval(this.getBoth, 10000);
    // this.intervalId2 = setInterval(this.getWaitWithdrawApprove, 10000);
  },  
  beforeDestroy () {
    clearInterval(this.intervalId);
    // clearInterval(this.intervalId2);
  },
  methods:
  {  
    formatDateAssigned(value) {
      let formattedDate = new Date(value);      
      return formattedDate.getFullYear()+'-'+ ('0' + (formattedDate.getMonth()+1)).slice(-2) +'-'+ ('0' + (formattedDate.getDate())).slice(-2) +' '+formattedDate.toLocaleTimeString('th-TH', {hour12: false});      
   },
    async getBoth(){

      this.renderComponent = false;
      // console.log('getBoth');
      await this.getWaitDepositApprove();
      await this.getWaitWithdrawApprove();

      // const promises = [
      //   this.getWaitDepositApprove(),
      //   this.getWaitWithdrawApprove(),          
      //   ];
    
      // const [waitDepositApprove,waitWithdrawApprove] = await Promise.all(promises);

      // let tmpWaitDepApproveList = [];
      // for (let index = 0; index < waitDepositApprove.length; index++) {
      //   const element = waitDepositApprove[index];  
      //   const item = {
      //       id : element.id,
      //       title: 'ฝากเงินรออนุมัติจากเลขบัญชี ' + element.bank_acc_no,
      //       avatar: 'AP',
      //       subtitle: element.bank_name+' '+element.bank_acc_no+' '+' จำนวน '+ element.credit+' ' + element.note + ' ' ,
      //       type: 'light-success',
      //     }              
      //   tmpWaitDepApproveList.push(item);          
      // }            
      // this.approveDepNotifications = tmpWaitDepApproveList;

      // let tmpWaitWitApproveList = [];
      // for (let index = 0; index < waitWithdrawApprove.length; index++) {
      //   const element = waitWithdrawApprove[index];        
      //   const item = {
      //       id : element.id,
      //       title: 'ถอนเงินรออนุมัติจากเลขบัญชี ' + element.bank_acc_no  ,
      //       avatar: 'AP',
      //       subtitle: element.bank_name+' '+element.bank_acc_no+' '+' จำนวน '+ element.credit+' ' + element.note + ' ' ,
      //       type: 'light-warning',
      //     };        
      //   tmpWaitWitApproveList.push(item);                
      // }            
      // this.approveWitNotifications = tmpWaitWitApproveList;

      this.badgeCount = this.approveDepNotifications.length + this.approveWitNotifications.length;      
      this.forceRerender();
      
    },
    async getWaitDepositApprove()
    {
      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
        userid: userData.username,
        token: userData.token,
      }

      var body = {        
          searchWord: '',
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
          let tmpWaitDepApproveList = [];
          for (let index = 0; index < tmpData.length; index++) {
            const element = tmpData[index];  
            const item = {
                id : index +1000,
                title: 'ฝากเงินรออนุมัติ จากเลขบัญชี ' + element.bank_acc_no,
                avatar: 'DEP',
                subtitle: element.bank_name+' '+element.bank_acc_no+' '+' จำนวน '+ element.credit+' ' + element.note + ' ' ,
                type: 'light-success',
                icon : 'AlertTriangleIcon',
              }              
            tmpWaitDepApproveList.push(item);          
          }            
          this.approveDepNotifications = tmpWaitDepApproveList;
      }
      else
      {
        this.approveDepNotifications = [];
      }
    },
    async getWaitWithdrawApprove()
    {
      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
        userid: userData.username,
        token: userData.token,
      }

      var body = {        
        searchWord: '',
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
          let tmpWaitWitApproveList = [];
          for (let index = 0; index < tmpData.length; index++) {
            const element = tmpData[index];        
            const item = {
                id : index +2000,
                title: 'ถอนเงินรออนุมัติจากเลขบัญชี ' + element.bank_acc_no  ,
                avatar: 'WIT',
                subtitle: element.bank_name+' '+element.bank_acc_no+' '+' จำนวน '+ element.credit+' ' + element.note + ' ' ,
                type: 'light-warning',
                icon : 'ClockIcon',
              };        
            tmpWaitWitApproveList.push(item);                
          }            
          this.approveWitNotifications = tmpWaitWitApproveList;
      }
      else
      {
        this.approveWitNotifications = [];
      }
    },    
    forceRerender() {      
        // Removing my-component from the DOM
        // console.log("forceRerender "+this.items2[6].tag);
        // console.log("forceRerender");
        this.renderComponent = false;        
        this.$nextTick(() => {
          // Adding the component back in
          this.renderComponent = true;
        });
    },
    goto(pageName)
    {
      this.$router.push(pageName);
    }
  }
}
</script>

<style>

</style>
