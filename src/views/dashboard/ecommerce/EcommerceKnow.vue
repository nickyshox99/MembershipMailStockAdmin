<template>
  <b-card        
    class="card-company-table"
  >  
      
  <b-table 
      :items="tableData"
      responsive            
      :fields="fields"
      class="mb-0"      
    >
      
      <template #cell(knowus)="data">
        <div class="d-flex align-items-center">        
            <div :style="data.item.color" >        
              <feather-icon icon="CreditCardIcon" size="12" class="align-middle mr-25" />
              {{ data.item.knowus }}
            </div>
        </div>
      </template>

      <template #cell(counts)="data">
        <div class="d-flex align-items-center">        
          <div>              
            <feather-icon icon="UserIcon" size="12" class="align-middle mr-25" />
              {{ data.item.counts.toLocaleString() }} คน
          </div>
        </div>
      </template>


  </b-table>

  </b-card>
</template>

<script>
import {
  BCard, BTable, BAvatar, BImg,
} from 'bootstrap-vue'

import { VueGoodTable } from 'vue-good-table';
import store from '@/store/index';
import { mapActions } from "vuex";

import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    BCard,
    BTable,
    BAvatar,
    BImg,
    VueGoodTable,
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Current: 'light-primary',
        Professional: 'light-success',
        Rejected: 'light-danger',
        Resigned: 'light-warning',
        Applied: 'light-info',
        /* eslint-enable key-spacing */
      }

      return status => statusColor[status]
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  setup() {
    const { t } = useI18nUtils();

    function formatDateAssigned4(value) {
      let formattedDate = new Date(value);
      formattedDate = new Date(formattedDate.getTime() - 3600000); // 60 * 60 * 1000 * 1
      return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });
    };

    let fields =   [        
        { key: 'knowus', label: t('Know Us') },
        { key: 'counts', label: t('Register Member') },
      ];
    
    return {
      t,      
      fields,
    }
  },
  data() {
    
    return {
      pageLength: 10,
      dir: false,     
      

      rows: [],
      searchTerm: '',         
    }
  },
  async created() {        
    
  },

  methods: {
    ...mapActions(["GetAdminBank"]),  
    
  },
  
}
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';
@import '@core/scss/vue/libs/vue-good-table.scss';
.card-company-table ::v-deep td .b-avatar.badge-light-company {
  .dark-layout & {
    background: $theme-dark-body-bg !important;
  }
}

.myavatar {
  display: flex;
  align-items: center;
}

.myavatar img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
