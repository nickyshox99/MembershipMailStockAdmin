<template>

  <div>

    <staff-group-setting-edit :isEditFormActive="isEditFormActive" :pRowData="selectedDataRow" 
    :isModeEdit="isModeEdit"
      @refetch-data="search" @close-edit-form="closeEditForm"       
      />

    <Transition name="slide-fade">
      <b-card-code
          v-if="isEditFormActive3"
        id="admin-edit-permission"      
        :title="titleCard2"
        
      >
      <div>
          
        <b-form @submit.prevent  >        
          <b-row>  
            <b-col md="12">
              <h2>{{ t('Group') }} : {{ groupName }} </h2>
            </b-col>
          </b-row>

          <b-row v-if="!isModeEdit3">  
            <b-col md="12">
              <b-form-group                
                :label="t('Page Name')"
                label-for="pagename">
                <b-form-select id="page-permission-selected" v-model="pagePermissionSelected" :options="pagePermissionOption" ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row v-if="isModeEdit3">  
            <b-col md="12">
              <span>{{ t('Page Name') }} : {{ pageNamePermissionSelected }} </span>
            </b-col>
          </b-row>
          
          <b-row>
            <b-col md="12">
              <hr/>
            </b-col>
          </b-row>
         
          <b-row>            

            <b-col md="2">
              <b-form-checkbox
                  id="checkbox-view"
                  name="checkbox-view"
                  v-model="selectedPagePermissionDataRow.can_view1"
                  value="1"
                  unchecked-value="0"
                >
                  {{t('View')}}                
                </b-form-checkbox> 
            </b-col>

            <b-col md="2">
              <b-form-checkbox
                  id="checkbox-add"
                  name="checkbox-add"
                  v-model="selectedPagePermissionDataRow.can_add1"
                  value="1"
                  unchecked-value="0"
                >
                  {{t('Add')}}                
                </b-form-checkbox> 
            </b-col>

            <b-col md="2">
              <b-form-checkbox
                  id="checkbox-edit"
                  name="checkbox-edit"
                  v-model="selectedPagePermissionDataRow.can_edit1"
                  value="1"
                  unchecked-value="0"
                >
                  {{t('Edit')}}                
                </b-form-checkbox>  
            </b-col>

            <b-col md="2">
              <b-form-checkbox
                  id="checkbox-delete"
                  name="checkbox-delete"
                  v-model="selectedPagePermissionDataRow.can_delete1"
                  value="1"
                  unchecked-value="0"
                >
                  {{t('Delete')}}                
                </b-form-checkbox>  
            </b-col>

            <b-col md="2">
              <b-form-checkbox
                  id="checkbox-approve"
                  name="checkbox-approve"
                  v-model="selectedPagePermissionDataRow.can_approve1"
                  value="1"
                  unchecked-value="0"
                >
                  {{t('Approve')}}                
                </b-form-checkbox>  
            </b-col>

            <b-col md="2">
              <b-form-checkbox
                  id="checkbox-viewall1"
                  name="checkbox-viewall1"
                  v-model="selectedPagePermissionDataRow.can_viewall1"
                  value="1"
                  unchecked-value="0"
                >
                  {{t('View All')}}                
                </b-form-checkbox>  
            </b-col>

          </b-row> 

          <b-row>
            <b-col md="12">
              <hr/>
            </b-col>
          </b-row>

          <b-row>  
            <b-col>
              <b-button                
                type="submit"
                variant="primary"
                class="mr-1"
                @click="insertPagePermission"
                v-if="!isModeEdit3"
              >
              <feather-icon
                  icon="EditIcon"              
                  />
                {{t('Add')}}
              </b-button>
              <b-button                
                type="submit"
                variant="primary"
                class="mr-1"
                @click="updatePagePermission"
                v-if="isModeEdit3"
              >
              <feather-icon
                  icon="EditIcon"              
                  />
                {{t('Save')}}
              </b-button>
              <b-button @click="closeEditForm3"                 
                type="reset"
                variant="outline-secondary"
              >
                  <feather-icon
                  icon="DeleteIcon"              
                  /> 
                
                {{t('Close')}}
              </b-button>
            </b-col> 

            
          </b-row>
        </b-form>
    
        
      </div>
      </b-card-code>
    </Transition>

    <Transition name="slide-fade">      
      <b-card title="จัดการสิทธิ์ในแต่ละหน้า" v-if="isEditFormActive2">
        <h2>{{ t('Group') }} : {{ groupName }} </h2>
        <br/>        
        
        <b-button variant="success" @click="additempermission">
              <feather-icon icon="PlusCircleIcon" />
              {{ t('Add Customer Page Permission') }}
        </b-button>
        &nbsp; 
        <b-button @click="closeEditForm"               
              type="reset"
              variant="outline-secondary"
            >
                <feather-icon
                icon="DeleteIcon"              
                /> 
              {{t('Close')}}
          </b-button>
        <br/>
        <br/>
        
        <vue-good-table ref="my-table" :columns="columns2" :rows="rows2" :rtl="direction" :line-numbers="true"
          :search-options="{
          enabled: false,
          externalQuery: searchTerm2
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
          perPage: pageLength2
        }" theme="polar-bear">
          <template slot="table-row" slot-scope="props">
            <!-- Column: Action -->
            <span v-if="props.column.field === 'action'">
              <span>
                <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
                  <template v-slot:button-content>
                    <feather-icon icon="MoreVerticalIcon" size="16" class="text-body align-middle mr-25" />
                  </template>
                  
                  <b-dropdown-item @click="edititempermission(props.row)">
                    <feather-icon icon="Edit2Icon" class="mr-50" />
                    <span>{{t('Edit')}}</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="deleteitempermission(props.row)">
                    <feather-icon icon="TrashIcon" class="mr-50" />
                    <span>{{t('Delete')}}</span>
                  </b-dropdown-item>
                </b-dropdown>
              </span>
            </span>

            <div v-if="props.column.field === 'can_add2'">              
                <b-badge
                    pill
                    :variant="resolveStatusVariant(props.row.can_add1)"
                    class="text-capitalize"
                >
                    {{t(resolveStatusText2(props.row.can_add1))}}
                </b-badge>
            </div>

            <div v-if="props.column.field === 'can_view2'">              
                <b-badge
                    pill
                    :variant="resolveStatusVariant(props.row.can_view1)"
                    class="text-capitalize"
                >
                    {{t(resolveStatusText2(props.row.can_view1))}}
                </b-badge>
            </div>

            <div v-if="props.column.field === 'can_edit2'">              
                <b-badge
                    pill
                    :variant="resolveStatusVariant(props.row.can_edit1)"
                    class="text-capitalize"
                >
                    {{t(resolveStatusText2(props.row.can_edit1))}}
                </b-badge>
            </div>

            <div v-if="props.column.field === 'can_delete2'">              
                <b-badge
                    pill
                    :variant="resolveStatusVariant(props.row.can_delete1)"
                    class="text-capitalize"
                >
                    {{t(resolveStatusText2(props.row.can_delete1))}}
                </b-badge>
            </div>

            <div v-if="props.column.field === 'can_approve2'">              
                <b-badge
                    pill
                    :variant="resolveStatusVariant(props.row.can_approve1)"
                    class="text-capitalize"
                >
                    {{t(resolveStatusText2(props.row.can_approve1))}}
                </b-badge>
            </div>

            <div v-if="props.column.field === 'can_viewall2'">              
                <b-badge
                    pill
                    :variant="resolveStatusVariant(props.row.can_viewall1)"
                    class="text-capitalize"
                >
                    {{t(resolveStatusText2(props.row.can_viewall1))}}
                </b-badge>
            </div>

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
                <b-form-select v-model="pageLength2" :options="['3', '5', '10', '20', '50', '100']" class="mx-1"
                  @input="(value) => props.perPageChanged({ currentPerPage: value })" />
                <span class="text-nowrap"> {{t('of')}} {{ props.total }} {{t('entries')}} </span>
              </div>
              <div>
                <b-pagination :value="1" :total-rows="props.total" :per-page="pageLength2" first-number last-number
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

    <Transition name="slide-fade">
      <b-card v-if="isSearchFormActive">
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

    <Transition name="slide-fade">
      <b-card :title="t('Staff Manage')" v-if="isSearchFormActive">
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

            <span v-if="props.column.field === 'status2'">              
                <b-badge
                    pill
                    :variant="resolveStatusVariant(props.row.status)"
                    class="text-capitalize"
                >
                    {{t(resolveStatusText(props.row.status))}}
                </b-badge>
            </span>

            <!-- Column: Action -->
            <span v-if="props.column.field === 'action'">
              <span>
                <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
                  <template v-slot:button-content>
                    <feather-icon icon="MoreVerticalIcon" size="16" class="text-body align-middle mr-25" />
                  </template>
                  <!-- <b-dropdown-item
                    @click="viewitem(props.row)"
                  >
                    <feather-icon
                      icon="Link2Icon"
                      class="mr-50"
                    />
                    <span >View</span>
                  </b-dropdown-item> -->

                  <b-dropdown-item @click="edititem(props.row)">
                    <feather-icon icon="Edit2Icon" class="mr-50" />
                    <span>{{t('Edit')}}</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="edititem2(props.row)">
                    <feather-icon icon="Edit2Icon" class="mr-50" />
                    <span>{{t('Edit Permission In Page')}}</span>
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
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BRow, BCol, BButton, BFormDatepicker, BCard, BInputGroup, BInputGroupPrepend,BForm,BFormCheckbox
} from 'bootstrap-vue';
import { VueGoodTable } from 'vue-good-table';

import store from '@/store/index';
import { mapActions } from "vuex";
import axios from "axios";

import { ref, onUnmounted } from '@vue/composition-api'

import StaffGroupSettingEdit from './StaffGroupSettingEdit.vue';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    StaffGroupSettingEdit,
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
    BForm,
    BFormCheckbox,
  },
  setup(props, { emit })
  {
    const { t } = useI18nUtils();

    let columns = [
        {
          label: t('Group Name'),
          field: 'name',
        },        
        {
          label: t('Default Page'),
          field: 'default_page_th',
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

    let columns2 = [
      {
        label: t('Page Name'),
        field: 'page_name_th',
      },        
      {
        label: t('View'),
        field: 'can_view2',
      },    
      {
        label: t('Add'),
        field: 'can_add2',
      },  
      {
        label: t('Edit'),
        field: 'can_edit2',
      },
      {
        label: t('Delete'),
        field: 'can_delete2',
      },
      {
        label: t('Approve'),
        field: 'can_approve2',
      },   
      {
        label: t('View All'),
        field: 'can_viewall2',
      },   
      {
        label: t('Action'),
        field: 'action',
        width: '5%',
      },
    ];

    const titleCard2 = t('Custom Page Permission');
    
    return {                      
      t,
      columns,
      columns2,
      titleCard2,
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

    const blankData2 = {
      id: 0,
      am_group_id : 0,
      page_admin_id : 0,
      can_view1 : 0,
      can_edit1 : 0,
      can_delete1 : 0,
      can_add1 : 0,
      can_approve1 : 0,
      can_viewall1 : 0,
      group_name : '',
      page_name : '',
      page_name_th : '',
    };

    

    return {
      // fromDate: fDate,
      // toDate: tDate,
      pageLength: 10,
      pageLength2: 10,
      dir: false,      
      rows: [],      
      rows2: [],
      searchTerm: '',
      searchTerm2: '',
      AgentSelected: '',
      AgentOptions: [
        { value: null, text: 'Agent' },
        // { value: 'ufgkxc11', text: 'ufgkxc11' },
      ],
      isEditFormActive: false,
      isEditFormActive2: false,
      isEditFormActive3: false,
      selectedDataRow: blankData,
      isSearchFormActive : true,
      isModeEdit: false,
      isModeEdit3: false,
      isAddNewPagePermission : false,
      isEditPagePermission : false,
      selectedPagePermissionDataRow: blankData2,
      groupName:'',
      groupId : 0,       
      pagePermissionSelected:"",
      pagePermissionOption: [
        { value: 0, text: 'Select Page' },        
      ],
      pageNamePermissionSelected:"",
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
    resolveStatusText2() {            
      const statusActive = {                    
          1: 'Yes',
          0: 'No',          
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

    await Promise.all(
      [
        this.getStaffPage(),
        this.searchPagePermission(),
        this.search(),
      ]
    )

    this.isModeEdit = true;
  },
  methods: {
    ...mapActions(["GetStaffGroup"]),  
    ...mapActions(["GetStaffPage"]),
    async getStaffPage() {
      console.log('getStaffPage');
      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      formData.append("userid", userData.username);
      formData.append("token", userData.token);
      
      formData.append("pageLength", this.pageLength);

      const response = await this.GetStaffPage(formData);
      if (response.data.status == 'success') 
      {          
        let staffPages = response.data.data;
        
        let tmpArray = [];        
        let tmpArray2 = [];        
        let tmpArray3 = [];        
        staffPages.forEach(element => {
              tmpArray.push({value : element.id ,text: element.page_name_th});
              tmpArray2.push({value : element.id ,text: element.page_name_th});
              tmpArray3.push({value : element.id ,text: element.page_name});
          });
                
        this.pagePermissionOption = tmpArray2;        
        this.pagePermissionOptionEng = tmpArray3;
        // console.log(this.pageOptions);
      }
      else {
        
      }
    },  
    async search() {
      console.log('search');

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      formData.append("userid", userData.username);
      formData.append("token", userData.token);

      formData.append("searchWord", this.searchTerm);
      formData.append("pageLength", this.pageLength);

      formData.append("page_name", this.$route.name);

      
      const response = await this.GetStaffGroup(formData);
      if (response.data.status == 'success') {  
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
    async searchPagePermission() {
      console.log('page permission by id');

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      var headers = {
        userid: userData.username,
        token: userData.token,
      }

      var body = {
        userid: userData.username,
        token: userData.token,
        am_group_id : this.groupId,
      }

      let response;
      await axios.post("api/staffgroup/getPagePermissionByAmGroupId/", body,
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
        this.rows2 = response.data.data;        
      }
      else {
                
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
              // console.log(selectID);
              this.deleteStaffGroup(selectID);

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
            this.deleteStaffGroup(selectID);

          }

        })
        .catch(err => {

        })


    },
    addnew() {
      this.isEditFormActive = true;
      this.isEditFormActive2 = false;
      this.isEditFormActive3 = false;
      this.isSearchFormActive = false;
      this.isModeEdit = false;

      let EmptyRow = {
        name : '-',        
        status : 1,        
    };


      this.selectedDataRow = EmptyRow;
    },
    edititem(row) {
      // console.log(row);
      this.isEditFormActive = true;
      this.isEditFormActive2 = false;
      this.isEditFormActive3 = false;
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
    edititem2(row) {
      // console.log(row);
      this.isEditFormActive = false;
      this.isEditFormActive2 = true;
      this.isEditFormActive3 = false;
      this.isSearchFormActive = false;
      this.isModeEdit = false;
      // const tmpData = {
      //   credit : row['credit'],
      //   credit_bonus : row['credit_bonus'],
      //   date : row['date'],
      //   username : row['username'],
      // };
      this.selectedDataRow2 = row;
      this.groupName = row['name'];
      this.groupId = row['id'];

      this.searchPagePermission();
      // console.log(this.selectedDataRow);
    },
    additempermission() {
      // console.log(row);
      this.isEditFormActive = false;
      this.isEditFormActive2 = false;
      this.isEditFormActive3 = true;
      this.isSearchFormActive = false;
      this.isModeEdit = false;
      this.isModeEdit3 = false;
      
      const blankData2 = {
        id: 0,
        am_group_id : 0,
        page_admin_id : 0,
        can_view1 : 0,
        can_edit1 : 0,
        can_delete1 : 0,
        can_add1 : 0,
        can_approve1 : 0,
        can_viewall1 : 0,
        group_name : '',
        page_name : '',
        page_name_th : '',
      };

      this.selectedPagePermissionDataRow = blankData2;
      this.pagePermissionSelected = this.selectedPagePermissionDataRow.page_admin_id;
      this.pageNamePermissionSelected = this.selectedPagePermissionDataRow.page_name_th;
      
      // console.log(this.selectedDataRow);
    },
    edititempermission(row) {
      // console.log(row);
      this.isEditFormActive = false;
      this.isEditFormActive2 = false;
      this.isEditFormActive3 = true;
      this.isSearchFormActive = false;
      this.isModeEdit = false;
      this.isModeEdit3 = true;
      // const tmpData = {
      //   credit : row['credit'],
      //   credit_bonus : row['credit_bonus'],
      //   date : row['date'],
      //   username : row['username'],
      // };
      
      this.selectedPagePermissionDataRow = row;      
      this.pagePermissionSelected = this.selectedPagePermissionDataRow.page_admin_id;
      this.pageNamePermissionSelected = this.selectedPagePermissionDataRow.page_name_th;
      
      // console.log(this.selectedDataRow);
    },
    async deleteitempermission(row) {     
      

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

              let selectID = [row['id']];              
              this.deletePagePermission(selectID);

              // const selectID = selectedRow.map(obj => obj.id);
              // // console.log(selectID);
              // this.deleteStaff(selectID);
            }
          })
          .catch(err => {

          }
          )
      
    },    
    closeEditForm() {
      this.isEditFormActive = false;
      this.isEditFormActive2 = false;
      this.isEditFormActive3 = false;
      this.isSearchFormActive = true;
    },
    closeEditForm3() {
      this.isEditFormActive = false;
      this.isEditFormActive2 = true;
      this.isEditFormActive3 = false;
      this.isSearchFormActive = false;
      this.isModeEdit = false;
    },
    async deleteStaffGroup(listId) {
      //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

      console.log("deleteStaffGroup");

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
      await axios.post("api/staffgroup/deletestaffgroupbyid/", body,
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
    async insertPagePermission()
    {
      console.log("insertPagePermission");

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      let headers = {
          userid: userData.username,
          token: userData.token,
      }

      let body={
        am_group_id : this.groupId,
        page_admin_id : this.pagePermissionSelected,
        can_add1 : this.selectedPagePermissionDataRow.can_add1,
        can_view1 : this.selectedPagePermissionDataRow.can_view1,
        can_edit1 : this.selectedPagePermissionDataRow.can_edit1,
        can_delete1 : this.selectedPagePermissionDataRow.can_delete1,
        can_approve1 : this.selectedPagePermissionDataRow.can_approve1,
        can_viewall1 : this.selectedPagePermissionDataRow.can_viewall1,
        page_name : this.$route.name,
      }

      let response;
      await axios.post("api/staffgroup/insertPagePermission",body,
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

      // console.log(response);
      if (response.data.status=="success") 
      {
          this.searchPagePermission();
          this.closeEditForm3();
      }
      else
      {
        this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: `Insert Page Permission`,
                icon: 'TrashIcon',
                variant: 'danger',
                text: `Insert Page Permission ${response.data.message}`,
                },
                autoHideDelay: 3000,
            });                
      }
    },
    async updatePagePermission()
    {
      console.log("updatePagePermission");

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      let headers = {
          userid: userData.username,
          token: userData.token,
      }

      let body={
        am_group_id : this.groupId,
        page_admin_id : this.pagePermissionSelected,
        can_add1 : this.selectedPagePermissionDataRow.can_add1,
        can_view1 : this.selectedPagePermissionDataRow.can_view1,
        can_edit1 : this.selectedPagePermissionDataRow.can_edit1,
        can_delete1 : this.selectedPagePermissionDataRow.can_delete1,
        can_approve1 : this.selectedPagePermissionDataRow.can_approve1,
        can_viewall1 : this.selectedPagePermissionDataRow.can_viewall1,
        page_name : this.$route.name,
      }

      let response;
      await axios.post("api/staffgroup/updatePagePermission",body,
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

      // console.log(response);
      if (response.data.status=="success") 
      {
          this.searchPagePermission();
          this.closeEditForm3();
      }
      else
      {
        this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: `Insert Page Permission`,
                icon: 'TrashIcon',
                variant: 'danger',
                text: `Insert Page Permission ${response.data.message}`,
                },
                autoHideDelay: 3000,
            });                
      }
    },
    async deletePagePermission(lstId)
    {
      console.log("deletePagePermission");

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      let headers = {
          userid: userData.username,
          token: userData.token,
      }

      let body={
        listId : lstId ,
        page_name : this.$route.name,
      }


      let response;
      await axios.post("api/staffgroup/deletePagePermission",body,
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

      // console.log(response);
      if (response.data.status=="success") 
      {
          this.searchPagePermission();
          this.closeEditForm3();
      }
      else
      {
        this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: `Delete Page Permission`,
                icon: 'TrashIcon',
                variant: 'danger',
                text: `Delete Page Permission ${response.data.message}`,
                },
                autoHideDelay: 3000,
            });                
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
