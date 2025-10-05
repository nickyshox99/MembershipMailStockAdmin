<template>

  <div>

    <AdminBankEdit :isEditFormActive="isEditFormActive" :pRowData="selectedDataRow" :isModeEdit="isModeEdit"
      @refetch-data="search" @close-edit-form="closeEditForm" />

    <AdminBankQRUpload :isActive="isQRModalActive" :rowData="selectedRowForQR" @refetch-data="search"
      @close="closeQRModal" />


    <Transition name="fade" mode="out-in">
      <b-card v-if="!(isEditFormActive)">
        <div class="m-2">

          <b-row>
            <b-col cols="4" md="3" class="d-flex align-items-center justify-content-start">
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
    </Transition>
    <Transition name="fade" mode="out-in">
      <b-card title="จัดการธนาคาร" v-if="!(isEditFormActive)">
        <!-- table -->
        <vue-good-table ref="my-table" :columns="columns" :rows="rows" :rtl="direction" :line-numbers="true"
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

            <!-- Column: Name -->
            <!-- <span v-if="props.column.field === 'bank_name'
              
              class="text-nowrap"
            > -->
            <div class="myavatar" v-if="props.column.field === 'bank_name2'">
              <img v-bind:src="props.row.bank_ico" alt="avatar" style="margin-right:10px;" />
              {{ props.row.bank_name }}
            </div>

            <!-- </span> -->

            <!-- Column: Status -->
            <span v-else-if="props.column.field === 'status2'">
              <b-badge :variant="statusVariant(props.row.status == 1 ? 'Success' : 'Warning')">
                {{ t(props.row.status == 1 ? 'On' : 'Off') }}
              </b-badge>
            </span>

            <!-- Column: Action -->
            <span v-if="props.column.field === 'action'">
              <span>
                <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
                  <template v-slot:button-content>
                    <feather-icon icon="MoreVerticalIcon" size="16" class="text-body align-middle mr-25" />
                  </template>

                  <b-dropdown-item @click="edititem(props.row)">
                    <feather-icon icon="Edit2Icon" class="mr-50" />
                    <span>{{ t('Edit') }}</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="addQR(props.row)">
                    <feather-icon icon="ImageIcon" class="mr-50" />
                    <span>{{ t('Add QR') }}</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="deleteitem(props.row)">
                    <feather-icon icon="TrashIcon" class="mr-50" />
                    <span>{{ t('Delete') }}</span>
                  </b-dropdown-item>
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
    </Transition>
  </div>

</template>

<script>

import BCardCode from '@core/components/b-card-code/BCardCode.vue';
import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BRow, BCol, BButton, BFormDatepicker, BCard, BInputGroup, BInputGroupPrepend
} from 'bootstrap-vue';
import { VueGoodTable } from 'vue-good-table';

import store from '@/store/index';
import { mapActions } from "vuex";
import axios from "axios";

import { ref, onUnmounted } from '@vue/composition-api'

import AdminBankEdit from './AdminBankEdit.vue';
import AdminBankQRUpload from './AdminBankQRUpload.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  name: 'AdminBank',
  components: {
    AdminBankEdit,
    AdminBankQRUpload,
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
  setup() {
    const { t } = useI18nUtils();

    function formatDateAssigned4(value) {
      let formattedDate = new Date(value);
      formattedDate = new Date(formattedDate.getTime() - 3600000); // 60 * 60 * 1000 * 1
      return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });
    };

    let columns = [
      {
        label: t('Bank Name'),
        field: 'bank_name2',
      },

      {
        label: t('Bank Account Name'),
        field: 'bank_acc_name',
      },
      {
        label: t('Bank Account Number'),
        field: 'bank_acc_number',
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
      rows: [],
      searchTerm: '',
      AgentSelected: '',
      AgentOptions: [
        { value: null, text: 'Agent' },
        // { value: 'ufgkxc11', text: 'ufgkxc11' },
      ],
      isEditFormActive: false,
      selectedDataRow: blankData,
      isModeEdit: false,
      // olm เพิ่มครับ
      isQRModalActive: false,
      selectedRowForQR: null,
    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        Success: 'light-success',
        Warning: 'light-warning',
        Info: 'light-info',
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
    await this.search();
    this.isModeEdit = true;
  },
  methods: {
    ...mapActions(["GetAdminBank"]),
    async search() {
      console.log('search');

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      formData.append("userid", userData.username);
      formData.append("token", userData.token);

      // User.append("dateFrom", this.fromDate);
      // User.append("dateTo", this.toDate);
      formData.append("agent", 0);
      formData.append("searchWord", this.searchTerm);
      formData.append("pageLength", this.pageLength);

      const response = await this.GetAdminBank(formData);
      if (response.data.status == 'success') {
        let tmpData = response.data.data;
        for (let index = 0; index < tmpData.length; index++) {
          tmpData[index]['bank_ico'] = require('@/assets/images/bank_bg/' + tmpData[index]['bank_ico']);
        }

        // console.log(tmpData);
        // this.rows = tmpData;
        // console.log(response.data.data);

        this.rows = response.data.data;
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
              this.deleteAdminBank(selectID);

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
            this.deleteAdminBank(selectID);

          }

        })
        .catch(err => {

        })


    },
    addnew() {
      this.isEditFormActive = true;
      this.isSearchFormActive = false;
      this.isModeEdit = false;

      const tmpMetaData =
      {
        deviceid: "",
        password: "",
        url: "",
        bank_break_enable: 0,
        deposit_decimal: 0,
      };

      const EmptyRow =
      {
        id: 0,
        bank_id: 1,
        bank_type: "BOTH",
        bank_acc_name: "",
        bank_acc_number: "",
        work_type: "IBK",
        show_type: "ALL",
        status: 1,
        meta_data: JSON.stringify(tmpMetaData),
      };

      this.selectedDataRow = EmptyRow;
    },
    edititem(row) {
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
    closeEditForm() {
      this.isEditFormActive = false;
    },
    async deleteAdminBank(listId) {
      //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

      console.log("deleteAdminBank");

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      var headers = {
        userid: userData.username,
        token: userData.token,
      }


      var body = {
        userid: userData.username,
        token: userData.token,

        listId: listId,
      }

      // console.log(body);

      let response;
      await axios.post("api/adminbank/deleteadminbankbyid/", body,
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
    //solm add
    addQR(row) {
      console.log('Add QR for account:', row.bank_acc_number);
      this.selectedRowForQR = row;
      this.isQRModalActive = true;
    },
    closeQRModal() {
      this.isQRModalActive = false;
      this.selectedRowForQR = null;
    },

  },
}
</script>

<style lang="scss">
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
