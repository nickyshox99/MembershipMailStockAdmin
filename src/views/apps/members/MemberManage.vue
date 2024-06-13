<template>

  <div>
    
    <member-manage-add :isAddFormActive="isAddFormActive" :pRowData="selectedDataRow"
      @refetch-data="search" @close-edit-form="closeEditForm" />

    <member-manage-edit :isEditFormActive="isEditFormActive" :pRowData="selectedDataRow" :isModeEdit="isModeEdit"
      @refetch-data="search" @close-edit-form="closeEditForm" />


    <Transition name="fade" mode="out-in">
      <b-card v-if="!(isEditFormActive)&&!(isAddFormActive)">
        <div class="m-2">

          <!-- Table Top -->
          <b-row style="justify-content: space-between!important;">
            <!-- <b-col
              cols="2"
              md="2"
              class="d-flex align-items-center justify-content-start"
            > 
              <b-form-datepicker id="fromDate" v-model="fromDate" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="th"></b-form-datepicker>          
            </b-col>
        
            <b-col
              cols="2"
              md="2"
              class="d-flex align-items-center justify-content-start"
            > 
              <b-form-datepicker id="toDate" v-model="toDate" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="th" ></b-form-datepicker>          
            </b-col> -->

            <!-- Search -->
            

            <!--b-col cols="2" md="2" class="d-flex align-items-center justify-content-start">
              <b-form-select v-model="AgentSelected" :options="AgentOptions"></b-form-select>
            </b-col-->

            <b-col cols="4" md="3" class="d-flex align-items-center justify-content-start">
              <b-button variant="primary" @click="search">
                <feather-icon icon="SearchIcon" />
                {{t('Load')}}
                </b-button>

              &nbsp;
              <b-button variant="success" @click="addnew" :disabled="!pagePermission.canAdd">
                <feather-icon icon="PlusCircleIcon" />
                {{t('Add')}}
              </b-button>

              <!-- &nbsp;
              <b-button variant="danger" @click="confirmDelete">
                <feather-icon icon="TrashIcon" />
                Delete </b-button> -->

            </b-col>

            <b-col cols="2" md="2" class="d-flex align-items-center justify-content-start">
              <b-input-group class="input-group-merge">
                <b-input-group-prepend is-text>
                  <feather-icon icon="SearchIcon" />
                </b-input-group-prepend>
                <b-form-input id="icons-search" v-model="searchTerm" :placeholder="t('Search')" />
              </b-input-group>
              &nbsp;
            </b-col>

          </b-row>

        </div>
      </b-card>
    </Transition>
    <Transition name="fade" mode="out-in">
      <b-card :title="t('Manage Deptor')" v-if="!(isEditFormActive)&&!(isAddFormActive)">
        <!-- table -->
        <vue-good-table ref="my-table" :columns="columns" :rows="rows" :rtl="direction" :line-numbers="true"
          :search-options="{
            enabled: true,
            externalQuery: searchTerm,
          }" :select-options="{
            enabled: false,
            selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
            selectionInfoClass: 'custom-class',
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
            disableSelectInfo: true, // disable the select info panel on top
            selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
          }" :pagination-options="{
            enabled: true,
            perPage: pageLength
          }" theme="polar-bear">
          <template slot="table-row" slot-scope="props">

            <!-- Column: Name -->
            <!-- <span v-if="props.column.field === 'bank_name'
              
              class="text-nowrap"
            > -->
          
            <div v-if="props.column.field === 'id2'">
              <b-media vertical-align="center" @click="edititem(props.row)" style="cursor: pointer;">
              <template #aside>
                <!--b-avatar
                  size="40"
                  :text="avatarText(props.row.fullname)"
                  :variant="resolveStatusVariant(props.row.status)"
                /-->
              </template>
              <b-link                
                class="font-weight-bold d-block text-nowrap"
              >
                {{ props.row.id }}
              </b-link>
              <h6 class="text-muted">@{{ props.row.fullname }}</h6>
              </b-media>
            </div>

            <div v-if="props.column.field === 'create_at2'">      
                    {{formatDateAssigned(props.row.create_at)}}
            </div>

            <!-- <div v-if="props.column.field === 'bank_name2'">
              <div  class="myavatar">
                <img v-bind:src="props.row.bank_ico" alt="avatar" style="margin-right:10px;" />
                <span class="text-muted">{{ props.row.bank_name }}</span>
              </div>    
              <div class="font-weight-bold d-block text-nowrap">
                  {{ props.row.bank_acc_no }}
                </div>              
            </div> -->

         

            <div v-if="props.column.field === 'status2'">              
                <b-badge
                    pill
                    :variant="resolveStatusVariant(props.row.status)"
                    class="text-capitalize"
                >
                    {{t(resolveStatusText(props.row.status))}}
                </b-badge>
            </div>

            <!-- </span> -->

            <!-- Column: Status -->
            <!-- <span v-else-if="props.column.field === 'status'">
              <b-badge :variant="statusVariant(props.row.status)">
                {{ props.row.status }}
              </b-badge>
            </span> -->

            <!-- Column: Action -->
            <span v-if="props.column.field === 'action'">
              <span>
                <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
                  <template v-slot:button-content>
                    <feather-icon icon="MoreVerticalIcon" size="16" class="text-body align-middle mr-25" />
                  </template>
                
                  <b-dropdown-item @click="edititem(props.row)">
                    <feather-icon icon="Edit2Icon" class="mr-50" />
                    <span>{{t('Inspect')}}</span>
                  </b-dropdown-item>

                  <!-- <b-dropdown-item @click="deleteitem(props.row)">
                    <feather-icon icon="PowerIcon" class="mr-50" />
                    <span>{{t('Active/Inactive')}}</span>
                  </b-dropdown-item> -->
                </b-dropdown>
              </span>
            </span>

            <!-- Column: Common -->
            <span>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>

          <!-- pagination -->
          <template slot="pagination-bottom" slot-scope="props">
            <div class="d-flex justify-content-between flex-wrap">
              <div class="d-flex align-items-center mb-0 mt-1">
                <span class="text-nowrap ">
                  {{t("Showing") +" 1 " + t("to") }}
                </span>
                <b-form-select v-model="pageLength" :options="['3', '5', '10', '20', '50', '100']" class="mx-1"
                  @input="(value) => props.perPageChanged({ currentPerPage: value })" />
                <span class="text-nowrap"> {{t('of')}} {{ props.total }} {{t('entries')}} </span>
              </div>
              <div>
                <b-pagination :value="1" :total-rows="props.total" :per-page="pageLength" first-number last-number
                  align="right" prev-class="prev-item" next-class="next-item" class="mt-1 mb-0"
                  @input="(value) => props.pageChanged({ currentPage: value })">
                  <template #prev-text>
                    <feather-icon icon="ChevronLeftIcon" size="18" />
                  </template>
                  <template #next-text>
                    <feather-icon icon="ChevronRightIcon" size="18" />
                  </template>
                </b-pagination>
              </div>
            </div>
          </template>
        </vue-good-table>
      </b-card>
    </Transition>
  </div>

</template>

<script>

import BCardCode from '@core/components/b-card-code/BCardCode.vue';
import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BRow, BCol, BButton, BFormDatepicker, BCard, BInputGroup, BInputGroupPrepend,BMedia,BLink
} from 'bootstrap-vue';
import { VueGoodTable } from 'vue-good-table';

import store from '@/store/index';
import { mapActions } from "vuex";
import axios from "axios";
import { ref, onUnmounted } from '@vue/composition-api'

import MemberManageEdit from './MemberManageEdit.vue';
import MemberManageAdd from './MemberManageAdd.vue';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    MemberManageAdd,
    MemberManageEdit,
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
    BMedia,
    BLink,
  },
  setup() {
    const { t } = useI18nUtils();

    function formatDateAssigned4(value) {
      let formattedDate = new Date(value);
      formattedDate = new Date(formattedDate.getTime() - 3600000); // 60 * 60 * 1000 * 1
      return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });
    };

    let columns =  [
        {
          label: t('Username/Fullname'),
          field: 'id2',
        },
        {
          label: t('Tel No.'),
          field: 'mobile_no',
        },        
        // {
        //   label: t('Account number'),
        //   field: 'bank_name2',
        // },
        {
          label: t('Create Date'),
          field: 'create_at2',          
        },
        // {
        //   label: t('Credit'),
        //   field: 'credit',
        //   type: 'decimal',          
        // },   
        {
          label: t('Create By'),
          field: 'createdBy',          
        },    
        {
          label: t('Status'),
          field: 'status2',          
        },       
        {
          label: t('Action'),
          field: 'action',
          width: '5%',
        },
      ];
    

    return {
      t,
      columns,
      
    }
  },
  data() {
    // const now = new Date();    
    // const fDate =now.getFullYear()+'-'+ ('0' + (now.getMonth()+1)).slice(-2) +'-'+ ('0' + (now.getDate())).slice(-2);
    // const tDate =now.getFullYear()+'-'+ ('0' + (now.getMonth()+1)).slice(-2) +'-'+ ('0' + (now.getDate())).slice(-2);

    const blankData = {
      credit: 0.00,
      credit_bonus: 0.00,
      date: null,
      username: '',
    };

    return {
      // fromDate: fDate,
      // toDate: tDate,
      pageLength: 10,
      dir: false,
      // codeBasic,      
      rows: [],
      searchTerm: '',
      AgentSelected: '',
      AgentOptions: [
        { value: null, text: 'Agent' },
        // { value: 'ufgkxc11', text: 'ufgkxc11' },
      ],
      isAddFormActive: false,
      isEditFormActive: false,
      selectedDataRow: blankData,
      isModeEdit: false,
      boxTwo:"",
      pagePermission:[],
    }
  },
  computed: {
    resolveStatusVariant() {      
        const statusColor = {                    
          1: 'light-success',
          0: 'light-danger',          
        }
        return data => statusColor[data]
    },
    resolveStatusText() {            
      const statusActive = {                    
          1: 'Active',
          0: 'InActive',          
        }
        return data => statusActive[data]
    },    
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
  async created() {

    await this.getPagePermission();

    this.$http.get('/good-table/basic').then(res => { this.rows = res.data });
    // await this.getAgent();
    await this.search();
    this.isModeEdit = true;
  },
  methods: {
    ...mapActions(["GetAgent"]),   
    ...mapActions(["GetPagePermission"]),  
    async search() {
      console.log('search');

      // console.log(this.fromDate);
      // console.log(this.toDate);
      // console.log(this.AgentSelected);       
      // console.log(this.searchTerm);
      // console.log(this.pageLength);

      const userData = JSON.parse(localStorage.getItem('userData'));

      // console.log(userData);

      var headers = {
        userid: userData.username,
        token: userData.token,
      }

      var body = {        
          searchWord: this.searchTerm,
          page_name : this.$route.name,
      }

      let response;
      await axios.post("api/member/getmember",body,
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

      // console.log(response.data.status);
      // console.log(response.data.data);

      if (response.data.status == 'success') {
        
        let tmpData = response.data.data;
        let listData = [];   
        for (let index = 0; index < tmpData.length; index++) {
          let rowData = tmpData[index];          
          rowData.bank_ico = require('@/assets/images/bank_bg/' + tmpData[index]['bank_ico']);
          rowData.bank_name2 = '';
          listData.push(rowData);
        }

        // this.rows = tmpData;
        // console.log(response.data.data);
        // console.log(listData);
        this.rows = listData;
      }
      else {
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
    async getPagePermission(){
      console.log('getPagePermission');

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();
    
      formData.append("userid", userData.username);
      formData.append("token", userData.token);

      formData.append("admin_id", userData.username);
      formData.append("page_name", this.$route.name);
      
      const response = await this.GetPagePermission(formData);
      if (response.data.status=='success') 
      {         
          this.pagePermission = response.data.data;
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
    async getAgent() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const User = new FormData();

      User.append("userid", userData.username);
      User.append("token", userData.token);

      const response = await this.GetAgent(User);
      if (response.data.status == 'success') {
        const agent = response.data.data;
        let tmpArray = [];
        agent.forEach(element => {
          tmpArray.push({ value: element.agent, text: element.agent });
        });
        this.AgentOptions = tmpArray;
        this.AgentSelected = tmpArray[0].text;
      } else {

      }

    },
    formatDateAssigned(value) {
      let formattedDate = new Date(value);
      formattedDate = new Date(formattedDate.getTime() - 25200000); // 60 * 60 * 1000 * 8
      // const formattedDate = new Date().fromISO(value).toLocaleString(DateTime.DATETIME_SHORT);
      return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });

    },
    async confirmDelete() {
      const selectedRow = this.$refs['my-table'].selectedRows;

      if (selectedRow.length > 0) {
        this.boxTwo = '';
        await this.$bvModal.msgBoxConfirm(this.$t('Please confirm that you want to delete'), {
          title: this.$t('Please Confirm'),
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {

            if (value) {
              const selectID = selectedRow.map(obj => obj.id);
              // console.log(selectID);
              this.inactiveMember(selectID);

            }

          })
          .catch(err => {

          })
      }


    },
    async deleteitem(row) {

      this.boxTwo = '';
      await this.$bvModal.msgBoxConfirm('Please confirm that you want to Active/InActive.', {
        title: this.$t('Please Confirm'),
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {

          if (value) {
            let selectID = [];
            selectID.push(row.id);
            // console.log(selectID);
            this.inactiveMember(selectID);

          }

        })
        .catch(err => {

        })


    },
    addnew() {
      this.isAddFormActive = true;
      this.isEditFormActive = false;
      this.isSearchFormActive = false;
      this.isModeEdit = false;
      
      const EmptyRow =
      {
        id: "",
        fullname: '',                        
        mobile_no: "",
        bank_id : 1,
        bank_account_no: "",
        //create_at: new Date().toLocaleString('en-US',{timeZone: "asia/bangkok"}),
        create_at: new Date().toISOString('en-US',{timeZone: "asia/bangkok"}),
        knowus: "",
        status: 0,        
      };

      this.selectedDataRow = EmptyRow;
    },
    async edititem(row) {
      // console.log(row);
      this.isAddFormActive = false;
      this.isEditFormActive = true;
      this.isSearchFormActive = false;
      this.isModeEdit = true;
      
      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
          userid: userData.username,
          token: userData.token,
      }

      var body = {
          username: row.id,
      }

      // console.log(body);

      let response;
      await axios.post("api/member/getMemberDepWitByID/", body,
      {
      headers: {
          'Content-Type': 'application/json',
          'userid': headers.userid,
          'token': headers.token,
      }
      }).then(
      resp => {
          response = resp;
          
      }
      );
      //console.log(response);            

      if (response.data.status == "success")             
      {
          let tmpData  = response.data.data;                                
          row.sumdeposit = tmpData.SumAD?tmpData.SumAD:0.00;
          row.sumwithdraw = tmpData.SumAW?tmpData.SumAW:0.00;
          row.sumprofit = tmpData.Profit?tmpData.Profit:0.00;
      }

      this.selectedDataRow = row;
      
    },
    closeEditForm() {
      this.isAddFormActive = false;
      this.isEditFormActive = false;
    },
    async inactiveMember(listId) {
      //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

      console.log("inactiveMember");

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      var headers = {
        userid: userData.username,
        token: userData.token,
      }

      var body = {
        listId: listId
      }

      // console.log(body);

      let response;
      await axios.post("api/member/inactivememberbyid/", body,
        {
          headers: {
            'Content-Type': 'application/json',
            'userid': headers.userid,
            'token': headers.token,
          }
        }).then(
          resp => {
            response = resp;
          }
        );

      // console.log(response);
      if (response.data.status == "success") {
        //
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: `Active/Inactive`,
            icon: 'PowerIcon',
            variant: 'warning',
            text: `Active/Inactive Succesful.`,
          },
          autoHideDelay: 3000,
        });
        this.search();

      }
      else {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: `Active/Inactive`,
            icon: 'PowerIcon',
            variant: 'danger',
            text: `Active/Inactive UnSuccesful ${response.data.message}`,
          },
          autoHideDelay: 3000,
        });
        this.search();
      }

    },    
    avatarText(fullname)
    {      
      if (!fullname) return ''
      const nameArray = fullname.split(' ')
      return nameArray.map(word => word.charAt(0).toUpperCase()).join('')              
    },
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';

.myavatar {
  display: flex;
  align-items: center;
}

.myavatar img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
