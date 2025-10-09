<template>
  <Transition name="bounce">
    <div>
      <b-row>
        <b-col md="9">
          <b-card-code
            v-if="isMemberFormActive"
            id="admin-edit"
            :title="titleCard"
            @change="(val) => $emit('update:is-admin-edit-active', val)"
          >
            <b-form @submit.prevent>
              <b-row>                
                <b-col md="12">
                  <b-form-group
                    :label="t('Email')"
                    label-for="email"
                  >
                    <b-form-input
                      id="email"
                      placeholder="Enter email address"
                      v-model="newMemberEmail"
                      type="email"
                    />
                  </b-form-group>
                </b-col>

                <b-col md="12">
                  <b-form-group
                    :label="t('Password')"
                    label-for="password"
                  >
                    <b-input-group>
                      <b-form-input
                        :type="showNewPassword ? 'text' : 'password'"
                        id="password"
                        placeholder="Enter password/code"
                        v-model="newMemberPassword"
                      />
                      <b-input-group-append>
                        <b-button 
                          :variant="showNewPassword ? 'outline-info' : 'outline-secondary'"
                          @click="toggleNewPasswordVisibility"
                          type="button"
                        >
                          <feather-icon :icon="showNewPassword ? 'EyeOffIcon' : 'EyeIcon'" />
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>


                <b-col>
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="submit"
                    variant="primary"
                    class="mr-1"
                    @click="addMemberEmail"
                    v-if="isModeMemberEdit"
                  >
                    <feather-icon icon="EditIcon" />
                    {{ t("Add Mail") }}
                  </b-button>
                  
                  <b-button
                    @click="close"
                    v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                    type="reset"
                    variant="outline-secondary"
                  >
                    <feather-icon icon="DeleteIcon" />
                    {{ t("Close") }}
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-card-code>
        </b-col>
      </b-row>
      <b-row v-if="isEditMode">
        <b-col md="9">
          <b-card-code
            id="edit-member"
            :title="t('Edit Member')"
          >
            <b-form @submit.prevent>
              <b-row>                
                <b-col md="6">
                  <b-form-group
                    :label="t('Email')"
                    label-for="edit-email"
                  >
                    <b-form-input
                      id="edit-email"
                      placeholder="edit email address"
                      v-model="editingEmail"
                      type="email"
                    />
                  </b-form-group>
                </b-col>

                <b-col md="6">
                  <b-form-group
                    :label="t('Password')"
                    label-for="edit-password"
                  >
                    <b-input-group>
                      <b-form-input
                        :type="showEditPassword ? 'text' : 'password'"
                        id="edit-password"
                        placeholder="Enter password/code"
                        v-model="editingPassword"
                      />
                      <b-input-group-append>
                        <b-button 
                          :variant="showEditPassword ? 'outline-info' : 'outline-secondary'"
                          @click="toggleEditPasswordVisibility"
                          type="button"
                        >
                          <feather-icon :icon="showEditPassword ? 'EyeOffIcon' : 'EyeIcon'" />
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>

                <b-col md="12">
                  <b-form-group
                    :label="t('Line User ID')"
                    label-for="edit-line-user-id"
                  >
                    <b-form-input
                      id="edit-line-user-id"
                      :placeholder="editingLineUserId ? 'Enter Line User ID' : 'Empty - No Line ID'"
                      v-model="editingLineUserId"
                      :class="editingLineUserId ? '' : 'text-muted'"
                    />
                    <small class="text-info" v-if="editingLineUserId">
                      Line ID: {{ editingLineUserId }}
                    </small>
                    <small class="text-muted" v-else>
                      No Line ID assigned
                    </small>
                  </b-form-group>
                </b-col>

                <b-col md="12">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="submit"
                    variant="success"
                    class="mr-1"
                    @click="saveMemberEdit"
                  >
                    <feather-icon icon="SaveIcon" />
                    {{ t("Save") }}
                  </b-button>
                  
                  <b-button
                    @click="cancelEdit"
                    v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                    type="reset"
                    variant="outline-secondary"
                  >
                    <feather-icon icon="XIcon" />
                    {{ t("Cancel") }}
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-card-code>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="9">
          <b-card-code
            v-if="isMemberFormActive"
            id="history-edit"
            :title="t('Member In Group')"
          >
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

                <span v-if="props.column.field === 'user_id2'"> 
                  <b-badge v-if="props.row.user_id!=null && props.row.user_id!=''"
                    pill
                    :variant="resolveStatusVariant(0)"
                    class="text-capitalize"
                  >
                    {{t(props.row.user_id)}}
                  </b-badge> 
                  <b-badge v-if="props.row.user_id==null || props.row.user_id==''"
                    pill
                    :variant="resolveStatusVariant(1)"
                    class="text-capitalize"
                  >
                    ว่าง
                  </b-badge>                    
                </span>

                <span v-if="props.column.field === 'action'">
                    <b-badge  style="cursor: pointer; margin-right:2px" variant="info" @click="editMemberData(props.row)">
                      <feather-icon icon="EditIcon" size="16" class="mr-0 mr-sm-50" />
                      <span class="d-none d-sm-inline">{{t('Edit')}}</span>
                    </b-badge>
                    <b-badge  style="cursor: pointer; margin-right:2px" variant="warning" @click="confirmDeleteMemberInGroup(props.row)">
                      <feather-icon icon="TrashIcon" size="16" class="mr-0 mr-sm-50" />
                      <span class="d-none d-sm-inline">{{t('Delete')}}</span>
                    </b-badge>
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
          </b-card-code>
        </b-col>
      </b-row>
    </div>
  </Transition>
</template>

<script>
import BCardCode from "@core/components/b-card-code";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BFormSelect,
  BImg,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
  BFormDatepicker,
  BPagination,
  BBadge,
} from "bootstrap-vue";
import { ref } from "@vue/composition-api";

import Ripple from "vue-ripple-directive";

import store from '@/store/index';
import { mapActions } from "vuex";
import axios from "axios";
import { VueGoodTable } from 'vue-good-table';

//   import { codeMultipleColumn } from './codemultiplecolumn'
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { useUtils as useI18nUtils } from "@core/libs/i18n";

export default {
  components: {
    BCardCode,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BFormSelect,
    BImg,
    BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    BFormDatepicker,
    VueGoodTable,
    BPagination,
    BBadge,
  },
  directives: {
    Ripple,
  },
  computed: {   
    resolveStatusVariant() {      
        const statusColor = {                    
          1: 'light-success',
          0: 'light-danger',          
        }
        return data => statusColor[data]
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
  setup(props, { emit }) {
    const { t } = useI18nUtils();
    
    function formatDateAssigned(value) {
      let formattedDate = new Date(value);
      formattedDate = new Date(formattedDate.getTime() - 3600000); // 60 * 60 * 1000 * 1
      return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });
      
    };

    let columns =  [
        {
          label: t('Email',),
          field: 'email',
        },
        {
          label: t('User ID',),
          field: 'user_id2',
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
    };
  },
  data() {
    let now = new Date();    
    let now2 = new Date();
    now.setDate(now2.getDate()+30);
    now2.setDate(now2.getDate()+1);
    const fDate =now2.getFullYear()+'-'+ ('0' + (now2.getMonth()+1)).slice(-2) +'-'+ ('0' + (now2.getDate())).slice(-2);
    const tDate =now.getFullYear()+'-'+ ('0' + (now.getMonth()+1)).slice(-2) +'-'+ ('0' + (now.getDate())).slice(-2);

    return {
      // codeMultipleColumn,
      renderComponent: true,
      showTimeInput: false,
      tmpFileUpload:[],
      pagePermission:[],
      
      pageLength: 10,
      dir: false,      
      
      rows: [],
      searchTerm: "",

      newMemberEmail: '',
      newMemberPassword: '',
      showNewPassword: false,
      isEditMode: false,
      editingMemberId: null,
      editingEmail: '',
      editingPassword: '',
      showEditPassword: false,
      editingLineUserId: '',
      
    };
  },
  model: {
    event: "update:is-admin-edit-active",
    subscribeTypeSelected: 0,
    subscribeTypeOptions: [{
        value: 0,
        text: '-'
    }, ],

    // periodTypeOptions2:[],
    // periodTypeOptions3:[],
    // collateralSelected: 0,
    // collateralOptions: [{
    //     value: 0,
    //     text: 'Select Collateral'
    // }, ],
    statusActive: 0,
    titleCard: "",
    period_number: 1,
    

  },
  props: {
    isMemberFormActive: {
      type: Boolean,
      required: true,
    },
    isModeMemberEdit: {
      type: Boolean,
      required: true,
    },
    pRowData: {
      required: false,
    },
  },
  watch: {
    pRowData: function (newVal, oldVal) {
      this.statusActive = newVal.status;
      this.subscribeTypeSelected = newVal.subscription_type_id; 
      this.getSubscribeMemberByGroupById();
    },
    isModeMemberEdit: function (newVal, oldVal) {
      if (newVal == true) {
        this.titleCard = this.$t("Add Mail To Stock");
      } else {
        this.titleCard = this.$t("Add Mail To Stock");
      }
    },
  },
  async created() {
    
    
    this.titleCard = this.$t("Add Mail To Stock");

    await this.getPagePermission();
    
  },
  methods: {
    ...mapActions(["GetPagePermission"]),    
    ...mapActions(["UploadFileAndDeleteOldFile"]),  
    ...mapActions(["DeleteOldFile"]),     
    ...mapActions(["GetSubscribeMemberByGroupById"]),
    getCurrentTimeString(ctime) {
      return ctime;
      // const ctime2 = new Date(ctime);
      // const hours = String(ctime2.getHours()).padStart(2, "0");
      // const minutes = String(ctime2.getMinutes()).padStart(2, "0");
      // const seconds = String(ctime2.getSeconds()).padStart(2, "0");
      // return `${hours}:${minutes}:${seconds}`;
    },
    close() {
      this.$emit("refetch-data");
      this.$emit("close-edit-form");
    },
    clearForm() {
      console.log("Clear Form");
    },
    forceRerender() {
      // Removing my-component from the DOM
      // console.log("forceRerender "+this.items2[6].tag);
      // console.log("forceRerender");
      this.renderComponent = false;
      this.$nextTick(() => {
        // Adding the component back in
        this.renderComponent = true;
      });
    },
    formatDateAssigned(value) {
      let formattedDate = new Date(value);
      // const formattedDate = new Date().fromISO(value).toLocaleString(DateTime.DATETIME_SHORT);
      //return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });
      return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2);
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
    async getSubscribeMemberByGroupById()
      {
          console.log("getSubscribeMemberByGroupById")
          const userData = JSON.parse(localStorage.getItem('userData'));
          const User = new FormData();

          User.append("userid", userData.username);
          User.append("token", userData.token);
          User.append("page_name", this.$route.name);
          User.append("id", this.pRowData.id);

          const response = await this.GetSubscribeMemberByGroupById(User);
          if (response.data.status == 'success') {                
              this.rows = response.data.data; 
              
          } else {

          }
      },
    uploadFile(tmpName) {                                    
            this.tmpFileUpload[tmpName] = this.$refs[tmpName].files[0];            
            //console.log(this.tmpFileUpload[tmpName]); 
    },
    async submitFile(tmpName) {                       
        console.log('submitFile');

        if (this.tmpFileUpload[tmpName]==null) 
        {
            this.$toast(
            {
                component: ToastificationContent,
                props: {
                title: 'No file for upload.',
                icon: 'EditIcon',
                variant: 'error',
                },
            });
            return;    
        }
        
        const userData = JSON.parse(localStorage.getItem('userData'));
        const formData = new FormData();

        formData.append("userid", userData.username);
        formData.append("token", userData.token);

        formData.append("file", this.tmpFileUpload[tmpName]);
        formData.append("tofilename", tmpName);
        formData.append("oldFilePath", this[tmpName]);
        
        const response = await this.UploadFileAndDeleteOldFile(formData);
        if (response.data.status == 'success') 
        {                 
            this.pRowData[tmpName] = response.data.url;
            this.tmpFileUpload[tmpName] = null;
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
    async deleteFile(tmpName)
    {
        console.log('deleteFile');
        
        const userData = JSON.parse(localStorage.getItem('userData'));
        const formData = new FormData();

        formData.append("userid", userData.username);
        formData.append("token", userData.token);

        formData.append("oldFilePath", this[tmpName]);            
        
        const response = await this.DeleteOldFile(formData);
        if (response.data.status == 'success') 
        {                 
            
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

        this[tmpName] = "";
        
    },
    async confirmDeleteMemberInGroup(rowData)
        {   
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
                    //const selectID = rowData.map(obj => obj.id);
                    // console.log(selectID);
                    this.deleteMemberFromGroup(rowData.id);

                    }
                })
                .catch(err => {

                })
    },
    async deleteMemberFromGroup(selectID)
    {
        const userData = JSON.parse(localStorage.getItem('userData'));
        
        var headers = {
            userid: userData.username,
            token: userData.token,
        }

        var body = {        
            listId: [selectID]
        }

        let response;
        await axios.post("api/subscriptiongroup/deleteMemberFromGroupByID",body,
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
    
        if (response.data.status == 'success') {
            this.getSubscribeMemberByGroupById();
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
    async addMemberEmail()
        {
            console.log('addMemberEmail');
            
            // Validate input
            if (!this.newMemberEmail || !this.newMemberPassword) {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: 'Please enter both email and password',
                        icon: 'AlertTriangleIcon',
                        variant: 'warning',
                    },
                });
                return;
            }
            
            const userData = JSON.parse(localStorage.getItem('userData'));
            
            var headers = {
                userid: userData.username,
                token: userData.token,
            }

            var body = {        
                email: this.newMemberEmail,
                password: this.newMemberPassword,
                user_id: '', // line_user_id ว่างตามที่ระบุ
                group_id: this.pRowData.id,
                page_name: this.$route.name,
            }

            let response;
            await axios.post("api/subscriptiongroup/addMemberToGroup",body,
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
        
            if (response.data.status == 'success') {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: 'Success',
                        icon: 'CheckIcon',
                        variant: 'success',
                        text: 'Mail added to stock successfully',
                    },
                    autoHideDelay: 3000,
                });
                
        // Clear form
        this.newMemberEmail = '';
        this.newMemberPassword = '';
        this.showNewPassword = false;
        
        this.getSubscribeMemberByGroupById();
        this.$emit("refetch-data");
      }
      else {
        this.$toast(
        {
            component: ToastificationContent,
            props: {
            title: response.data.message || 'Error',
            icon: 'EditIcon',
            variant: 'error',
            },
        });
      }
      
},
    editMemberData(memberRow) {
        console.log('editMemberData', memberRow);
        this.isEditMode = true;
        this.editingMemberId = memberRow.id;
        this.editingEmail = memberRow.email;
        this.editingPassword = memberRow.password || '';
        this.editingLineUserId = memberRow.line_user_id || '';
    },
    saveMemberEdit() {
        console.log('saveMemberEdit');
        
        // Validate input
        if (!this.editingEmail) {
            this.$toast({
                component: ToastificationContent,
                props: {
                    title: 'Please enter email',
                    icon: 'AlertTriangleIcon',
                    variant: 'warning',
                },
            });
            return;
        }
        
        // Call API to update member
        this.updateMemberData();
    },
    async updateMemberData() {
        console.log('updateMemberData');
        
        const userData = JSON.parse(localStorage.getItem('userData'));
        
        var headers = {
            userid: userData.username,
            token: userData.token,
        }

        var body = {        
            id: this.editingMemberId,
            email: this.editingEmail,
            password: this.editingPassword,
            line_user_id: this.editingLineUserId,
            page_name: this.$route.name,
        }

        let response;
        await axios.post("api/subscriptiongroup/updateMemberData",body,
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
    
        if (response.data.status == 'success') {
            this.$toast({
                component: ToastificationContent,
                props: {
                    title: 'Success',
                    icon: 'CheckIcon',
                    variant: 'success',
                    text: 'Member data updated successfully',
                },
                autoHideDelay: 3000,
            });
            
            // Clear edit form and refresh data
            this.isEditMode = false;
            this.editingMemberId = null;
            this.editingEmail = '';
            this.editingPassword = '';
            this.editingLineUserId = '';
            
            this.getSubscribeMemberByGroupById();
            this.$emit("refetch-data");
        }
        else {
            this.$toast(
            {
                component: ToastificationContent,
                props: {
                title: response.data.message || 'Error',
                icon: 'EditIcon',
                variant: 'error',
                },
            });
        }
    },
    cancelEdit() {
        this.isEditMode = false;
        this.editingMemberId = null;
        this.editingEmail = '';
        this.editingPassword = '';
        this.editingLineUserId = '';
        this.showEditPassword = false;
    },
    toggleEditPasswordVisibility() {
        this.showEditPassword = !this.showEditPassword;
    },
    toggleNewPasswordVisibility() {
        this.showNewPassword = !this.showNewPassword;
    },
  },
};
</script>

<style>
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
</style>
