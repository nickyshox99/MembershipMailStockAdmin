<template>

  <div>

    <agent-refer-edit :isEditFormActive="isEditFormActive" :pRowData="selectedDataRow" :isModeEdit="isModeEdit"
      @refetch-data="search" @close-edit-form="closeEditForm" />

    <Transition name="fade" mode="out-in">
      <b-card v-if="!(isEditFormActive)">
        <div class="m-2">
          
          <b-row style="justify-content: space-between!important;">

            <b-col cols="4" md="3" class="d-flex align-items-center justify-content-start">
              <b-button variant="primary" @click="search">
                <feather-icon icon="SearchIcon" />
              </b-button>

              &nbsp;
              <b-button variant="success" @click="addnew">
                <feather-icon icon="PlusCircleIcon" />
              </b-button>

              &nbsp;
              <b-button variant="danger" @click="confirmDelete">
                <feather-icon icon="TrashIcon" />
              </b-button>

            </b-col>


            <!-- Search -->
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
      <b-card title="จัดการแหล่งที่มา" v-if="!(isEditFormActive)">
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


            <div v-if="props.column.field === 'status2'">              
                <b-badge
                    pill
                    :variant="resolveStatusVariant(props.row.status)"
                    class="text-capitalize"
                >
                    {{t(resolveStatusText(props.row.status))}}
                </b-badge>
            </div>

            <!-- Column: Action -->
            <span v-if="props.column.field === 'action'">
              <span>
                <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
                  <template v-slot:button-content>
                    <feather-icon icon="MoreVerticalIcon" size="16" class="text-body align-middle mr-25" />
                  </template>
         
                  <b-dropdown-item @click="edititem(props.row)">
                    <feather-icon icon="Edit2Icon" class="mr-50" />
                    <span>{{t('Edit')}}</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="deleteitem(props.row)">
                    <feather-icon icon="TrashIcon" class="mr-50" />
                    <span>{{t('Delete')}}</span>
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
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BRow, BCol, BButton, BFormDatepicker, BCard, BInputGroup, BInputGroupPrepend
} from 'bootstrap-vue';
import { VueGoodTable } from 'vue-good-table';
import { codeBasic } from './code';
import store from '@/store/index';
import { mapActions } from "vuex";
import axios from "axios";

import { ref, onUnmounted } from '@vue/composition-api'

import AgentReferEdit from './AgentReferEdit.vue';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    AgentReferEdit,
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

    let columns =  [        
        {
          label: t('Reference Name'),
          field: 'refer',
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
      agent: '',
      username: '',
      password: '',
      prefix: '',
      end_point_api: '',
      end_point_game: '',
      setting_register: '',
      id_random: 5,
      status: 1,
      meta_data: '',
      line_token: '',
    };

    return {
      // fromDate: fDate,
      // toDate: tDate,
      pageLength: 10,
      dir: false,
      codeBasic,
      
      rows: [],
      searchTerm: '',

      isEditFormActive: false,
      selectedDataRow: blankData,
      isModeEdit: false,
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
    this.$http.get('/good-table/basic').then(res => { this.rows = res.data });

    await this.search();
    this.isModeEdit = true;
  },
  methods: {
    ...mapActions(["GetAgent"]),
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
      }

      let response;
      await axios.post("api/refer/getrefer",body,
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
        this.rows = tmpData;
        // console.log(this.rows);
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
              this.deleteRefer(selectID);

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
            this.deleteRefer(selectID);

          }

        })
        .catch(err => {

        })


    },
    addnew() {
      this.isEditFormActive = true;
      this.isSearchFormActive = false;
      this.isModeEdit = false;


      const EmptyRow =
      {
        id: 0,
        refer: '',        
        status: 1,
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
    async deleteRefer(listId) {
      //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

      console.log("deleteRefer");

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      var headers = {
        userid: userData.username,
        token: userData.token,
      }

      var body = {        
        listId: listId,
      }

      // console.log(body);

      let response;
      await axios.post("api/refer/deletereferbyid/", body,
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
