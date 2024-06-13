<template>
  <b-card
    v-if="data"
    class="card-transaction"
    no-body
  >
    <b-card-header>
      <b-card-title>{{ title }}</b-card-title>

     
    </b-card-header>
    
    <b-card-body>
      <div
        v-for="transaction in data"
        :key="transaction.index"
        class="transaction-item"
      >
        <b-media no-body>
          <!-- <b-media-aside>
            <b-avatar
              rounded
              size="42"
              :variant="transaction.avatarVariant"
            >
              <feather-icon
                size="18"
                :icon="transaction.avatar">
              </feather-icon>
            </b-avatar>
          </b-media-aside> -->
          <div class="myavatar">
                <img v-bind:src="transaction.bank_ico" alt="avatar" style="margin-right:10px;" />            
              </div>
          <b-media-body>
            <h6 class="transaction-title">
              {{ transaction.mode }} | {{ formatDateAssigned(transaction.date) }}
            </h6>
            <small>{{ transaction.types }}</small> 
            
          </b-media-body>
        </b-media>
        <div
          class="font-weight"
          :class="transaction.deduction ? 'text-danger':'text-success'" style="font-size: 20px; font-weight: 400 !important;"
        >
          {{ transaction.payment }} ฿
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardBody, BMediaBody, BMedia, BMediaAside, BAvatar, BDropdown, BDropdownItem,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BMediaBody,
    BMedia,
    BMediaAside,
    BAvatar,
    BDropdown,
    BDropdownItem,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    title:{
      type:String,
      default: () => '',
    }
  },
  methods:{
    formatDateAssigned(value) {      
      let formattedDate = new Date(value);   
      formattedDate = new Date(formattedDate.getTime() - 25200000); // 60 * 60 * 1000 * 8

      // const formattedDate = new Date().fromISO(value).toLocaleString(DateTime.DATETIME_SHORT);
      const returnformattedDate  = formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });      
      return returnformattedDate;

    },
  }
}
</script>

<style lang="scss" scoped>

.myavatar {
  display: flex;
  align-items: center;
}

.myavatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>