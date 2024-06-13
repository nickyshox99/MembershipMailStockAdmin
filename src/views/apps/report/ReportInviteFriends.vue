<template>  
  
  <div>

    <report-invite-friends-view
      :is-report-invite-friends-view-active.sync="isAddNewUserSidebarActive" 
      :isAddNewUserSidebarActive="isAddNewUserSidebarActive" 
      :pRowData="selectedDataRow"
      @refetch-data="search"
    />

    <b-card no-body >

        <div class="m-2">

        <!-- Table Top -->
        <b-row>
          <b-col
            cols="12"
            md="3"
            class="d-flex align-items-center justify-content-start mb-1"
          > 
            <b-form-datepicker id="fromDate" v-model="fromDate" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="th"></b-form-datepicker>          
          </b-col>
      
          <b-col
            cols="12"
            md="3"
            class="d-flex align-items-center justify-content-start mb-1"
          > 
            <b-form-datepicker id="toDate" v-model="toDate" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="th" ></b-form-datepicker>          
          </b-col>

          <!-- <b-col
            cols="2"
            md="2"
            class="d-flex align-items-center justify-content-start"
          >
            <b-form-select v-model="AgentSelected" :options="AgentOptions"></b-form-select>
          </b-col> -->
          
          <b-col
            cols="3"
            md="4"
            class="d-flex align-items-center justify-content-start mb-1"
          > 
            <b-button variant="primary" @click="search">
            <feather-icon
              icon="SearchIcon"              
            />            
            </b-button>
          </b-col>

           <!-- Search -->
           <b-col
            cols="9"
            md="2"
            class="d-flex align-items-center justify-content-start mb-1"
          >       
            <b-input-group class="input-group-merge">
              <b-input-group-prepend is-text>
                <feather-icon icon="SearchIcon" />
              </b-input-group-prepend>
              <b-form-input
                id="icons-search"
                v-model="searchTerm"
                :placeholder="t('Search')"
              />
            </b-input-group>                               
              &nbsp;          
          </b-col>

        </b-row>

      </div>
    </b-card>

    <b-card :title="t('Invite Friend Report')">
      <!-- table -->
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :rtl="direction"
        :line-numbers="true"
        :search-options="{
          enabled: false,
          externalQuery: searchTerm }"
        :select-options="{
          enabled: true,
          selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
          selectionInfoClass: 'custom-class',
          selectionText: 'rows selected',
          clearSelectionText: 'clear',
          disableSelectInfo: true, // disable the select info panel on top
          selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
        }"
        :pagination-options="{
          enabled: true,
          perPage:pageLength
        }"         
        theme="polar-bear"
      >
        <template
          slot="table-row"
          slot-scope="props"
        >

          <!-- Column: Name -->
          <!-- <span
            v-if="props.column.field === 'fullName'"
            class="text-nowrap"
          >
            <b-avatar
              :src="props.row.avatar"
              class="mx-1"
            />
            <span class="text-nowrap">{{ props.row.fullName }}</span>
          </span> -->

          <!-- Column: Status -->
          <!-- <span v-else-if="props.column.field === 'status'">
            <b-badge :variant="statusVariant(props.row.status)">
              {{ props.row.status }}
            </b-badge>
          </span> -->

          <!-- Column: Action -->
          <!-- <span v-if="props.column.field === 'action'" >
            <span>
              <b-dropdown
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template v-slot:button-content>
                  <feather-icon
                    icon="MoreVerticalIcon"
                    size="16"
                    class="text-body align-middle mr-25"
                  />
                </template>
                <b-dropdown-item
                  @click="viewitem(props.row)"
                >
                  <feather-icon
                    icon="Link2Icon"
                    class="mr-50"
                  />
                  <span >View</span>
                </b-dropdown-item>

                <b-dropdown-item>
                  <feather-icon
                    icon="Edit2Icon"
                    class="mr-50"
                  />
                  <span>Edit</span>
                </b-dropdown-item>
                <b-dropdown-item>
                  <feather-icon
                    icon="TrashIcon"
                    class="mr-50"
                  />
                  <span>Delete</span>
                </b-dropdown-item>
              </b-dropdown>
            </span>
          </span> -->

          <!-- Column: Common -->
          <span>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>

        <!-- pagination -->
        <template
          slot="pagination-bottom"
          slot-scope="props"
        >
          <div class="d-flex justify-content-between flex-wrap">
            <div class="d-flex align-items-center mb-0 mt-1">
              <span class="text-nowrap ">
                {{t("Showing") +" 1 " + t("to") }}
              </span>
              <b-form-select
                v-model="pageLength"
                :options="['3','5','10']"
                class="mx-1"
                @input="(value)=>props.perPageChanged({currentPerPage:value})"
              />
              <span class="text-nowrap"> {{t('of')}} {{ props.total }} {{t('entries')}} </span>
            </div>
            <div>
              <b-pagination
                :value="1"
                :total-rows="props.total"
                :per-page="pageLength"
                first-number
                last-number
                align="right"
                prev-class="prev-item"
                next-class="next-item"
                class="mt-1 mb-0"
                @input="(value)=>props.pageChanged({currentPage:value})"
              >
                <template #prev-text>
                  <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                  />
                </template>
                <template #next-text>
                  <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                  />
                </template>
              </b-pagination>
            </div>
          </div>
        </template>
      </vue-good-table>

    </b-card>
  </div>
  
</template>

<script>

import BCardCode from '@core/components/b-card-code/BCardCode.vue';
import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,BRow, BCol,BButton,BFormDatepicker,BCard,BInputGroup, BInputGroupPrepend
} from 'bootstrap-vue';
import { VueGoodTable } from 'vue-good-table';
import { codeBasic } from './code';
import store from '@/store/index';
import { mapActions } from "vuex";

import { ref, onUnmounted } from '@vue/composition-api'

import ReportInviteFriendsView from './ReportInviteFriendsView.vue';

import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    // 'report-invite-friends-view':ReportInviteFriendsView,
    ReportInviteFriendsView,
    BRow,
    BCol,    
    VueGoodTable,
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BButton, 
    BFormDatepicker,   
    BCard,
    BInputGroup,    
    BInputGroupPrepend,
    BCardCode,
    
  },  
  // setup()
  // {
    
  //   const isAddNewUserSidebarActive = ref(false);
    
  //   return {
  //     // Sidebar
  //     isAddNewUserSidebarActive,
  //   }
  // }
  // ,
  setup() {
    const { t } = useI18nUtils();

    function formatDateAssigned(value) {
      let formattedDate = new Date(value);
      formattedDate = new Date(formattedDate.getTime() - 25200000); // 60 * 60 * 1000 * 8
      // const formattedDate = new Date().fromISO(value).toLocaleString(DateTime.DATETIME_SHORT);
      return formattedDate.getFullYear()+'-'+ ('0' + (formattedDate.getMonth()+1)).slice(-2) +'-'+ ('0' + (formattedDate.getDate())).slice(-2) +' '+formattedDate.toLocaleTimeString('th-TH', {hour12: false});
    };

    let columns =  [        
        {
          label: t('Username'),
          field: 'id',
        },       
        {
          label: t('Affiliate'),
          field: 'aff',
        },        
        // {
        //   label: t('Action'),
        //   field: 'action',
        //   width: '5%',
        // },      
      ];    

    return {
      t,
      columns,      
    }
  },
  data() {
    const now = new Date();    
    const fDate =now.getFullYear()+'-'+ ('0' + (now.getMonth()+1)).slice(-2) +'-'+ ('0' + (now.getDate())).slice(-2);
    const tDate =now.getFullYear()+'-'+ ('0' + (now.getMonth()+1)).slice(-2) +'-'+ ('0' + (now.getDate())).slice(-2);
    
    const blankData = {
        credit: 0.00,
        credit_bonus: 0.00,
        date: null,
        username: '',        
      };

    return {
      fromDate: fDate,
      toDate: tDate,
      pageLength: 10,
      dir: false,   
      codeBasic,   
      
      rows: [],
      searchTerm: '',
      AgentSelected: '',
      AgentOptions: [
        { value: null, text: 'Agent' },
        // { value: 'ufgkxc11', text: 'ufgkxc11' },
      ],
      isAddNewUserSidebarActive : false,
      selectedDataRow : blankData,
    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Current      : 'light-primary',
        Professional : 'light-success',
        Rejected     : 'light-danger',
        Resigned     : 'light-warning',
        Applied      : 'light-info',
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
  async created() {    
    this.$http.get('/good-table/basic').then(res => { this.rows = res.data });  
    await this.getAgent();
    await this.search();  
  },
  methods: {
   ...mapActions(["GetAgent"]),
   ...mapActions(["GetReportAff"]),
   async search(){
      console.log('search');

      // console.log(this.fromDate);
      // console.log(this.toDate);
      // console.log(this.AgentSelected);       
      // console.log(this.searchTerm);
      // console.log(this.pageLength);
      
      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();
    
      formData.append("userid", userData.username);
      formData.append("token", userData.token);

      formData.append("dateFrom", this.fromDate);
      formData.append("dateTo", this.toDate);
      formData.append("agent", this.AgentSelected);
      formData.append("searchWord", "");
      formData.append("pageLength", this.pageLength);

      const response = await this.GetReportAff(formData);
      if (response.data.status=='success') 
      {
          // let tmpData = response.data.data;
          // for (let index = 0; index < tmpData.length; index++) {
          //   const element = await this.formatDateAssigned(tmpData[index]['date']);
          //   // const element = new Date(tmpData[index]['date']);
          //   tmpData[index]['date'] = element;            
          // }

          // this.rows = tmpData;

          this.rows = response.data.data;
      }
      else
      {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: response.data.message,
                icon: 'EditIcon',
                variant: 'error',
              },
            });
      }

   },
   async getAgent()
   {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const User = new FormData();
    
      User.append("userid", userData.username);
      User.append("token", userData.token);

      const response = await this.GetAgent(User);
      if (response.data.status=='success') {
        const agent = response.data.data;
        let tmpArray = [];        
        agent.forEach(element => {
          tmpArray.push({value : element.agent ,text: element.agent});
        });
        this.AgentOptions = tmpArray;
        this.AgentSelected = tmpArray[0].text;
      }else{

      }
   },
   formatDateAssigned(value) {
      let formattedDate = new Date(value);
      formattedDate = new Date(formattedDate.getTime() - 25200000); // 60 * 60 * 1000 * 8
      // const formattedDate = new Date().fromISO(value).toLocaleString(DateTime.DATETIME_SHORT);
      return formattedDate.getFullYear()+'-'+ ('0' + (formattedDate.getMonth()+1)).slice(-2) +'-'+ ('0' + (formattedDate.getDate())).slice(-2) +' '+formattedDate.toLocaleTimeString('th-TH', {hour12: false});
      
   },
   viewitem(row)
   {
    // console.log(row);
    this.isAddNewUserSidebarActive = true;
    const tmpData = {
      credit : row['credit'],
      credit_bonus : row['credit_bonus'],
      date : row['date'],
      username : row['username'],
    };
    this.selectedDataRow = tmpData;
    // console.log(this.selectedDataRow);
   },
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
