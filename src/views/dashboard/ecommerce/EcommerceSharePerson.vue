<template>
  <b-card        
    class="card-company-table"
  >  
      
  <b-table 
      :items="tableData"
      :fields="fields"
    >
      
      <template #cell(_id)="data"  >
        <div >  
              {{ data.item._id }}
        </div>
      </template>

      <template #cell(fullName)="data"  >
        <div >        
            <feather-icon icon="UserIcon" size="12" class="align-middle mr-25" />
              {{ data.item.fullName }}
        </div>
      </template>

      <template #cell(totalReceiveAmount)="data" >
        <div class="text-top" > 
            <b-row >
              <b-col cols="12" md="12">
                <feather-icon icon="CreditCardIcon" size="12" class="align-middle mr-25" />
                  {{t('Total Receive')}} 
                  <b-badge
                          pill
                          variant="info"
                      >
                    {{ data.item.totalReceiveAmount.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) }}
                  </b-badge>
              </b-col>
            </b-row>  

            <b-row >
              <b-col cols="12" md="12">
                <hr/>
              </b-col>
            </b-row>  

            <b-row v-for="item in data.item.receiveAmountByType"
                        :key="item.interestName" >
              <b-col cols="4" md="4">
                  {{ item.interestName  }}
              </b-col>
              <b-col cols="2" md="2">
                
                  {{ t('Receive Amount')  }}
                
              </b-col>
              <b-col cols="2" md="2" class="text-right">
                  <b-badge
                          pill
                          variant="success"
                      >
                  {{ item.receiveAmount.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })  }}
                  </b-badge>
              </b-col>
              <b-col cols="2" md="2">
                  {{ t('Principle Amount')  }}
              </b-col>
              <b-col cols="2" md="2" class="text-right"   >
                  <b-badge
                          pill
                          variant="warning"
                      >
                    {{ item.principleAmount.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })  }}
                  </b-badge>
              </b-col>
            </b-row>           
        </div>
      </template>


  </b-table>

  </b-card>
</template>

<script>
import {
  BCard, BTable, BAvatar, BImg, BCol,BRow,BBadge
} from 'bootstrap-vue'

import { VueGoodTable } from 'vue-good-table';
import store from '@/store/index';
import { mapActions } from "vuex";

import { useUtils as useI18nUtils } from '@core/libs/i18n'
import BCardCode from '@/@core/components/b-card-code/index';

export default {
  components: {
    BCard,
    BTable,
    BAvatar,
    BImg,
    BCol,BRow,
    VueGoodTable,
    BCardCode,
    BBadge
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
        { key: '_id', label: t('Id') ,tdClass: 'align-top' },
        { key: 'fullName', label: t('Fullname') ,tdClass: 'align-top' },
        { key: 'totalReceiveAmount', label: t('Total Received') ,width:"40%" ,tdClass: 'align-top'},        
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
