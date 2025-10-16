<template>
  <div>
    <individual-email-edit 
      :isEmailFormActive="isEmailFormActive" 
      :pRowData="selectedDataRow" 
      :isModeEmailEdit="isModeEmailEdit"
      @refetch-data="search" 
      @close-edit-form="closeEditForm" 
    />
<!-- 
    <Transition name="fade" mode="out-in">
      <b-card v-if="!isEmailFormActive">
        <div class="m-2">
          <b-row>
            <b-col cols="10" md="10" class="d-flex align-items-center justify-content-start">
              <b-button variant="primary" @click="search">
                <feather-icon icon="SearchIcon" />            
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
    </Transition> -->

    <!-- <Transition name="fade" mode="out-in">
      <b-card :title="individualEmailStockTitle" v-if="!isEmailFormActive">
        <vue-good-table 
          ref="my-table" 
          :columns="columns" 
          :rows="sortedRows" 
          :rtl="direction" 
          :line-numbers="true"
          :sort-options="{ enabled: true }"
          @on-sort-change="handleSortChange"
          :search-options="{
            enabled: false,
            externalQuery: searchTerm
          }" 
          :select-options="{
            enabled: true,
            selectOnCheckboxOnly: true,
            selectionInfoClass: 'custom-class',
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
            disableSelectInfo: true,
            selectAllByGroup: true,
          }" 
          :pagination-options="{
            enabled: true,
            perPage: pageLength
          }" 
          theme="polar-bear"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field === 'status2'">              
              <b-badge
                pill
                :variant="resolveStatusVariant(props.row.status)"
                class="text-capitalize"
              >
                {{ t(resolveStatusText(props.row.status)) }}
              </b-badge>
            </span>

            <span v-if="props.column.field === 'product_img2'">                              
              <b-img :src="props.row.subscription_img" fluid thumbnail style="height: 50px;"></b-img>     
              <span>
                {{ props.row.subscription_name }}
              </span>           
            </span>

            <span v-if="props.column.field === 'user_id2'"> 
              <div v-if="props.row.user_id != null && props.row.user_id != ''" class="d-flex align-items-center">
                <b-img 
                  v-if="props.row.line_profile_url"
                  :src="props.row.line_profile_url" 
                  rounded="circle" 
                  width="32" 
                  height="32"
                  class="mr-50"
                  alt="Line Profile"
                />
                <feather-icon 
                  v-else
                  icon="UserIcon" 
                  size="32" 
                  class="mr-50 text-secondary"
                />
                <span class="font-weight-bold">
                  {{ props.row.line_display_name || props.row.user_id }}
                </span>
              </div>
              <b-badge v-if="props.row.user_id == null || props.row.user_id == ''"
                pill
                :variant="resolveStatusVariant(1)"
                class="text-capitalize"
              >
                ว่าง
              </b-badge>                    
            </span>

            <span v-if="props.column.field === 'update_at2'">                                              
              <span>
                {{ formatDateAssigned(props.row.update_at) }}
              </span>           
            </span>

            <span v-if="props.column.field === 'action'">
              <span>
                <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
                  <template v-slot:button-content>
                    <feather-icon icon="MoreVerticalIcon" size="16" class="text-body align-middle mr-25" />
                  </template>
                  <b-dropdown-item @click="editItem(props.row)">
                    <feather-icon icon="Edit2Icon" class="mr-50" />
                    <span>{{ t('Edit Information') }}</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="memberEditItem(props.row)">
                    <feather-icon icon="Edit2Icon" class="mr-50" />
                    <span>{{ t('Member Edit') }}</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="deleteitem(props.row)">
                    <feather-icon icon="TrashIcon" class="mr-50" />
                    <span>{{ t('Delete') }}</span>
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
                  {{ t("Showing") + " 1 " + t("to") }}
                </span>
                <b-form-select v-model="pageLength" :options="['3', '5', '10', '20', '50', '100']" class="mx-1"
                  @input="(value) => props.perPageChanged({ currentPerPage: value })" />
                <span class="text-nowrap"> {{ t('of') }} {{ props.total }} {{ t('entries') }} </span>
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
    </Transition> -->
  </div>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue';
import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, 
  BRow, BCol, BButton, BFormDatepicker, BCard, BInputGroup, BInputGroupPrepend, BImg
} from 'bootstrap-vue';
import { VueGoodTable } from 'vue-good-table';

import store from '@/store/index';
import { mapActions } from "vuex";
import axios from "axios";

import { ref, onUnmounted } from '@vue/composition-api'

import IndividualEmailEdit from './IndividualEmailEdit.vue';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    IndividualEmailEdit,
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

    let columns = [
      {
        label: t('Subscription Type'),
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
    const blankData = {
      email: '',
      password: '',
      user_id: '',
      status: 1,
      update_by: '',
      update_at: null,
    };

    return {
      pageLength: 10,
      dir: false,      
      rows: [],
      searchTerm: '',            
      isEmailFormActive: false,
      selectedDataRow: blankData,
      isModeEmailEdit: false,
      pagePermission: {
        can_view: true,
        can_add: false,
        can_edit: false,
        can_delete: false,
        can_approve: false,
        can_viewall: false,
      },
      sortedRows: [],
      currentSort: { field: '', type: '' }
    }
  },
  computed: {
    individualEmailStockTitle() {
      const totalUsedMembers = this.rows.reduce((sum, row) => sum + (row.CountUsedMember || 0), 0);
      const totalMembers = this.rows.reduce((sum, row) => sum + (row.CountMember || 0), 0);
      return `Individual Email Stock (${totalUsedMembers}/${totalMembers}) Email stock`;
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
    direction() {
      if (store.state.appConfig.isRTL) {
        this.dir = true
        return this.dir
      }
      this.dir = false
      return this.dir
    },
  },
  async created() {
    await this.getPagePermission();
    await this.search();
    this.sortedRows = this.rows;
    this.isModeEmailEdit = true;
  },
  methods: {
    ...mapActions(["GetPagePermission"]),    
    ...mapActions(["GetSubscriptionGroup"]),
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
        this.pagePermission = response.data.data;
      }
      else {
        this.$toast({
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

      // Mock data with id 0
      const mockData = {
        "status": "success",
        "message": "",
        "auth": true,
        "data": [
          {
            "id": 0,
            "group_name": "Individual Email Stock",
            "update_by": "admin",
            "update_at": "2025-10-04T12:53:55.000Z",
            "subscription_type_id": 1,
            "head_email": "individual@stock.com",
            "password": "123456",
            "status": 1,
            "subscription_name": "Individual Email Stock",
            "subscription_img": "/images/YoutubePremium.png",
            "end_at": null,
            "CountMember": 0,
            "CountUsedMember": 0
          }
        ]
      };
      
      if (mockData.status == 'success') {  
        this.rows = mockData.data;
        for (let index = 0; index < this.rows.length; index++) {
          const element = this.rows[index];
          if (element.end_at != null) {
            let diffDay = new Date(element.end_at).getTime() - new Date().getTime();
            diffDay = Math.ceil(diffDay / (1000 * 3600 * 24)); // days
            this.rows[index]['diffDay'] = diffDay;
          }
          else {
            this.rows[index]['diffDay'] = null;
          }
        }
        this.sortedRows = this.sortRows(this.rows, this.currentSort);
      }
      else {
        this.$toast({
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
              this.deleteEmails(selectID);
            }
          })
          .catch(err => {
            // Handle error
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
            this.deleteEmails(selectID);
          }
        })
        .catch(err => {
          // Handle error
        })
    },
    addnew() {
      const userData = JSON.parse(localStorage.getItem('userData'));

      this.isEmailFormActive = true;
      this.isModeEmailEdit = false;

      let EmptyRow = {
        group_name: '',         
        subscription_type_id: 1,
        head_email: '',
        password: '',
        status: 1,
        update_by: userData.username,
        update_at: new Date(),
      };
      
      this.selectedDataRow = EmptyRow;
    },
    editItem(row) {
      this.isEmailFormActive = true;
      this.isModeEmailEdit = true;
      this.selectedDataRow = row;
    },
    memberEditItem(row) {
      this.isEmailFormActive = true;
      this.isModeEmailEdit = true;
      this.selectedDataRow = row;
    },
    closeEditForm() {
      this.isEmailFormActive = false;
    },
    async deleteEmails(listId) {
      console.log("deleteEmails");

      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
        userid: userData.username,
        token: userData.token,
      }

      var body = {
        userid: userData.username,
        token: userData.token,
        page_name: this.$route.name,
        listId: listId,
      }

      let response;
      await axios.post("api/subscriptiongroup/deleteById/", body,
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

      if (response.data.status == "success") {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: `Delete`,
            icon: 'TrashIcon',
            variant: 'warning',
            text: `Delete Successful.`,
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
            text: `Delete Unsuccessful ${response.data.message}`,
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
      return [...rows].sort((a, b) => {
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
