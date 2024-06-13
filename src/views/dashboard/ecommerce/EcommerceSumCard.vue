<template>
  <b-card    
    no-body
    
  >
    <b-card-header>
      <b-card-title> {{ t(data.title) }} </b-card-title>
      
    </b-card-header>
    <b-card-body class="statistics-body">
      <b-row style="justify-content: space-between;">      
        <b-col
        :key="data.title"
          xl="12"
          sm="12"
          class="mb-4 mb-xl-0"
        >
          <b-media no-body>
            <b-media-aside
              class="mr-2"
            >
              <b-avatar
                size="48"
                :variant="data.variant"
              >
                <feather-icon
                  size="24"
                  :icon="data.icon"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto" >
              <h4 class="font-weight-bolder mb-0" >
                ${{data.sum.toLocaleString()}} 
              </h4>
              <b-card-text class="font-small-3 mb-0" >
                {{t('Amount')}} {{ data.count.toLocaleString() }} {{ t(data.unit) }}
              </b-card-text>
            </b-media-body>

          </b-media>
        </b-col>

      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardText, BCardBody, BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody,BFormSelect,
} from 'bootstrap-vue'

import { kFormatter } from '@core/utils/filter'
import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
    BFormSelect,
  },
  props: {
    data: {
      type: Object,
      default: {},
    },      
    
  },
  setup(props, { emit }){     
    const { t } = useI18nUtils();
   
      return {
        t,     
      }
    },
  data() {
    return {
           
    }
  },   
  model: {
        event: 'update:is-member-manage-edit-active',
    },
  methods: {
    kFormatter,
    formatDateAssigned(value) {      
      let formattedDate = new Date(value);   
      formattedDate = new Date(formattedDate.getTime() + 25200000); // 60 * 60 * 1000 * 8

      // const formattedDate = new Date().fromISO(value).toLocaleString(DateTime.DATETIME_SHORT);
      const returnformattedDate  = formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });      
      return returnformattedDate;

    },   
  },
  created()
  {
    
  },
}
</script>
