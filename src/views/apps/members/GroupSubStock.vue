<template>
  <div>
    <group-create-edit-stock :isEditFormActive="isEditFormActive" :pRowData="selectedDataRow" 
    :isModeEdit="isModeEdit"
      @refetch-data="search" @close-edit-form="closeEditForm" />

    <group-sub-note-stock :isNoteFormActive="isNoteFormActive" :pRowData="selectedDataRow" 
    :isModeNote="isModeNote"
      @refetch-data="search" @close-edit-form="closeEditForm" />

    <group-member-edit-stock :isMemberFormActive="isMemberFormActive" :pRowData="selectedDataRow" 
    :isModeMemberEdit="isModeMemberEdit"
      @refetch-data="search" @close-edit-form="closeEditForm" />

    <Transition name="fade" mode="out-in">
      <b-card v-if="!(isEditFormActive)&&!(isNoteFormActive)&&!(isMemberFormActive)">
        <div class="m-2">
          <b-row>
            <b-col cols="10" md="10" class="d-flex align-items-center justify-content-start">
              <b-button variant="primary" @click="search">
              <feather-icon
                icon="SearchIcon"              
              />            
              {{ t('Load') }}
              </b-button>

              &nbsp;
              <b-button variant="success" @click="addnew">
                <feather-icon icon="PlusCircleIcon" />
                {{ t('Add') }}
              </b-button>

              &nbsp;
              <b-button variant="danger" @click="confirmDelete">
                <feather-icon icon="TrashIcon" />
                {{ t('Delete') }}
              </b-button>

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
      <b-card :title="groupSubscriptionTitle" v-if="!(isEditFormActive)&&!(isNoteFormActive)&&!(isMemberFormActive)">
        <vue-good-table ref="my-table" :columns="columns" :rows="sortedRows" :rtl="direction" :line-numbers="true"
          :sort-options="{ enabled: true }"
          @on-sort-change="handleSortChange"
          :search-options="{
          enabled: false,
          externalQuery: searchTerm
        }" :select-options="{
          enabled: true,
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

            <span v-if="props.column.field === 'status2'">              
                <b-badge
                    pill
                    :variant="resolveStatusVariant(props.row.status)"
                    class="text-capitalize"
                >
                    {{t(resolveStatusText(props.row.status))}}
                </b-badge>
            </span>

            <span v-if="props.column.field === 'product_img2'">                              
                <b-img :src="props.row.subscription_img" fluid thumbnail style="height: 50px;"></b-img>     
                <span>
                  {{ props.row.subscription_name }}
                </span>           
            </span>

            <span v-if="props.column.field === 'update_at2'">                                              
                <span>
                  {{ formatDateAssigned(props.row.update_at)}}
                </span>           
            </span>
         
            <span v-if="props.column.field === 'expire_date2'">        
                  <b-badge
                      v-if="props.row.diffDay==null"
                      pill
                      :variant="`light-warning`"
                      class="text-capitalize"
                  >                                                                 
                      {{ t('Not Subscribe') }}
                  </b-badge>      
                  <b-badge
                      v-if="props.row.diffDay!=null && props.row.diffDay<=0"
                      pill
                      :variant="`light-danger`"
                      class="text-capitalize"
                  >                                                                 
                      {{ t('Expired') }}
                  </b-badge> 
                  <b-badge
                      v-if="props.row.diffDay!=null && props.row.diffDay>0"
                      pill
                      :variant="`light-success`"
                      class="text-capitalize"
                  >                                                                 
                      {{ t('Remaining') }} {{props.row.diffDay}} {{t('Day')}}
                  </b-badge> 
            </span>

            <span v-if="props.column.field === 'memberCountDisplay'">
                <div class="member-count-display" style="text-align: center;">
                    {{ (props.row.CountUsedMember || 0) }}/{{ (props.row.CountMember || 0) }}
                </div>
                <b-badge                  
                      v-if="props.row.CountExpiredUsedMember>0"
                      pill
                      :variant="`light-danger`"
                      class="text-capitalize"
                  >                                                                 
                  Expired:{{ (props.row.CountExpiredUsedMember || 0) }}
                </b-badge> 
            </span>

            <span v-if="props.column.field === 'status2'">
              <b-badge
                :variant="props.row.status == 1 ? 'light-success' : 'light-danger'"
                pill
                class="text-capitalize"
              >
                
              </b-badge>
            </span>

            <span v-if="props.column.field === 'action'">
              <span>
                <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
                  <template v-slot:button-content>
                    <feather-icon icon="MoreVerticalIcon" size="16" class="text-body align-middle mr-25" />
                  </template>
                  <b-dropdown-item @click="editItem(props.row)">
                    <feather-icon icon="Edit2Icon" class="mr-50" />
                    <span>{{t('Edit Information')}}</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="memberEditItem(props.row)">
                    <feather-icon icon="Edit2Icon" class="mr-50" />
                    <span>{{t('Member Edit')}}</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="subscribeEditItem(props.row)">
                    <feather-icon icon="Edit2Icon" class="mr-50" />
                    <span>{{t('Subscribe Note')}}</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="deleteitem(props.row)">
                    <feather-icon icon="TrashIcon" class="mr-50" />
                    <span>{{t('Delete')}}</span>
                  </b-dropdown-item>
                </b-dropdown>
              </span>
            </span>

            <span>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>

          
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
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BRow, BCol, BButton, BFormDatepicker, BCard, BInputGroup, BInputGroupPrepend ,BImg
} from 'bootstrap-vue';
import { VueGoodTable } from 'vue-good-table';

import store from '@/store/index';
import { mapActions } from "vuex";
import axios from "axios";

import { ref, onUnmounted } from '@vue/composition-api'

import GroupCreateEditStock from './GroupCreateEditStock.vue';
import GroupSubNoteStock from './GroupSubNoteStock.vue';
import GroupMemberEditStock from './GroupMemberEditStock.vue';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    GroupCreateEditStock,
    GroupSubNoteStock,
    GroupMemberEditStock,
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
    BImg,
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
          label: t('Subscription Type',),
          field: 'product_img2',
        },
        {
          label: t('Group Name'),
          field: 'group_name',
        },
        {
          label: t('Latest Update'),
          field: 'update_at2',
        },
        {
          label: t('Update By'),
          field: 'update_by',
        },
        {
          label: t('Expired'),
          field: 'expire_date2',          
        },
        {
          label: t('Status'),
          field: 'status2',          
        },
        {
          label: t('Member Count'),
          field: 'memberCountDisplay',
          sortable: true,
          sortFn: (a, b, order) => {
          const valA = a.CountUsedMember || 0;
          const valB = b.CountUsedMember || 0;
          return order === 'asc' ? valA - valB : valB - valA;
          }
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
      rows: [],
      searchTerm: '',            
      isEditFormActive: false,
      isNoteFormActive: false,
      isMemberFormActive: false,
      selectedDataRow: blankData,
      isModeEdit: false,
      isModeNote: false,
      isModeMemberEdit: false,
      pagePermission : {
                    can_view : true,
                    can_add: false,
                    can_edit : false,
                    can_delete : false,
                    can_approve : false,
                    can_viewall : false,
      },
      sortedRows: [],
      currentSort: { field: '', type: '' }
    }
  },
  computed: {
    groupSubscriptionTitle() {
      const totalUsedMembers = this.rows.reduce((sum, row) => sum + (row.CountUsedMember || 0), 0);
      const totalMembers = this.rows.reduce((sum, row) => sum + (row.CountMember || 0), 0);
      return `Stock คำเชิญ (${totalUsedMembers}/${totalMembers}) `;
    },
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
    this.$http.get('/good-table/basic').then(res => { this.rows = res.data });
    
    await this.getPagePermission();

    await this.search();
    this.sortedRows = this.rows;
    this.isModeEdit = true;


  },
  methods: {
    ...mapActions(["GetPagePermission"]),    
    ...mapActions(["GetSubscriptionGroupStock"]),
    async getPagePermission() {
      console.log('getPagePermission');

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      formData.append("userid", userData.username);
      formData.append("token", userData.token);

      
      formData.append("admin_id", userData.username);
      const currentRouteName = this.$route.name;
      formData.append("page_name", currentRouteName);      

      const response = await this.GetPagePermission(formData);
      if (response.data.status == 'success') {  
        // console.log(response.data.data);
        this.pagePermission = response.data.data;
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
    async search() {
      console.log('search');

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      formData.append("userid", userData.username);
      formData.append("token", userData.token);

      formData.append("searchWord", this.searchTerm);      
      formData.append("page_name", this.$route.name);

      const response = await this.GetSubscriptionGroupStock(formData);
      if (response.data.status == 'success') {  
        //console.log(response.data.data);
        this.rows = response.data.data;
        
        // Filter out group with id 0 (Individual Email Stock)
        this.rows = this.rows.filter(row => row.id !== 0);
        
        for (let index = 0; index < this.rows.length; index++) {
            const element = this.rows[index];
            if (element.end_at!=null) {
                let diffDay = new Date(element.end_at).getTime() - new Date().getTime();
                diffDay = Math.ceil(diffDay / (1000 * 3600 * 24)); // days
                this.rows[index]['diffDay'] = diffDay;
            }
            else
            {
                this.rows[index]['diffDay'] = null;
            }
        }

        
        this.sortedRows = this.sortRows(this.rows, this.currentSort);
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
   
    formatDateAssigned(value) {
      let formattedDate = new Date(value);
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
              console.log(selectID);
              this.deleteGroup(selectID);

            }

          })
          .catch(err => {

          })
      }


    },
    async deleteitem(row) {


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
            let selectID = [];
            selectID.push(row.id);
            console.log(selectID);
            this.deleteGroup(selectID);

          }

        })
        .catch(err => {

        })


    },
    addnew() {
      const userData = JSON.parse(localStorage.getItem('userData'));

      this.isEditFormActive = true;
      this.isSearchFormActive = false;
      this.isModeEdit = false;

      let EmptyRow = {
        group_name : '',         
        subscription_type_id : 1, // เริ่มต้นด้วย subscription type แรกแทนที่จะเป็น 0
        head_email: '',
        password: '',
        status: 1,
        update_by : userData.username,
        update_at : new Date(),
      };
      
      this.selectedDataRow = EmptyRow;
    },
    editItem(row) {
      // console.log(row);
      this.isEditFormActive = true;
      this.isSearchFormActive = false;
      this.isModeEdit = true;
      // const tmpData = {
      //   credit : row['credit'],
      //   credit_bonus : row['credit_bonus'],
      //   date : row['date'],
      //   username : row['username'],
      // };
      this.selectedDataRow = row;
      // console.log(this.selectedDataRow);
    },
    subscribeEditItem(row)
    {
        this.isNoteFormActive = true;
        this.isSearchFormActive = false;
        this.isNodeEdit = true;
        this.selectedDataRow = row;
    },
    memberEditItem(row)
    {
        this.isMemberFormActive = true;
        this.isSearchFormActive = false;
        this.isModeMemberEdit = true;
        this.selectedDataRow = row;
    },
    closeEditForm() {
      this.isEditFormActive = false;
      this.isNoteFormActive = false;
      this.isMemberFormActive = false;
    },
    async deleteGroup(listId) {
      //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

      console.log("deleteGroup");

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      var headers = {
        userid: userData.username,
        token: userData.token,
      }


      var body = {
        userid: userData.username,
        token: userData.token,
        page_name : this.$route.name,
        listId: listId,
      }


      // console.log(body);
      let response;
      await axios.post("api/subscriptiongroup/deleteStockById/", body,
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
            title: `Delete`,
            icon: 'TrashIcon',
            variant: 'warning',
            text: `Delete Succesful.`,
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
            title: `Delete`,
            icon: 'TrashIcon',
            variant: 'danger',
            text: `Delete UnSuccesful ${response.data.message}`,
          },
          autoHideDelay: 3000,
        });
        this.search();
      }

    },
    handleSortChange(params) {      
      this.currentSort = params; 
      this.sortedRows = this.sortRows(this.rows, params);
    },
    sortRows(rows, {field, type}) {
      // เขียน logic sort เอง เช่นเดียวกับ sortFn
      return [...rows].sort((a, b) => {
        // custom sort logic ตาม field และ type
        if(field === 'expire_date2') {
          // ตัวอย่างใช้ diffDay + expire_date
          const getGroupPriority = (diffDay, reverse = false) => {
            if(diffDay == null) return reverse ? 1 : 3;
            if(diffDay <= 0) return reverse ? 3 : 1;
            return 2;
          };
          const reverse = type === 'desc';
          const priorityA = getGroupPriority(a.diffDay, reverse);
          const priorityB = getGroupPriority(b.diffDay, reverse);
          if(priorityA !== priorityB) return priorityA - priorityB;
          const dateA = a.expire_date ? new Date(a.expire_date).getTime() : 0;
          const dateB = b.expire_date ? new Date(b.expire_date).getTime() : 0;
          return type === 'asc' ? dateA - dateB : dateB - dateA;
        }
        // sort field อื่น ๆ ตามปกติ
        if(typeof a[field] === 'string') {
          return type === 'asc'
            ? a[field].localeCompare(b[field])
            : b[field].localeCompare(a[field]);
        }
        return type === 'asc' ? a[field] - b[field] : b[field] - a[field];
      });
    }
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

.member-count-display {
  font-weight: 600;
  color: #2c3e50;
  background-color: #f8f9fa;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
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
