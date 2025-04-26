<template>
  <Transition name="bounce">
    <b-row>
      <b-col md="9">
        <b-card-code
          v-if="isEditFormActive"
          id="admin-edit"
          :title="titleCard"
          @change="(val) => $emit('update:is-admin-edit-active', val)"
        >
          <b-form @submit.prevent>
            <b-row>
              
              <b-col md="12">                                
                  <b-form-group :label="t('Subscription Type')" label-for="subscription-type">
                      <b-input-group class="input-group-merge">
                          <b-input-group-prepend is-text>
                              <feather-icon icon="CreditCardIcon" />
                          </b-input-group-prepend>
                          <b-form-select v-model="subscribeTypeSelected" :options="subscribeTypeOptions"></b-form-select>
                      </b-input-group>
                  </b-form-group>
              </b-col>

              <b-col md="12">
                <b-form-group
                  :label="t('Group Name')"
                  label-for="group_name"
                >
                  <b-form-input
                    id="group_name"
                    placeholder=""
                    v-model="pRowData.group_name"
                  />
                </b-form-group>
              </b-col>


              <b-col md="12">
                <b-form-group
                  :label="t('Latest Update')"
                  label-for="update_at"
                >
                  <b-form-input
                    id="update_at"
                    placeholder=""
                    :value="formatDateAssigned(pRowData.update_at)" 
                    readonly
                  />                  
                </b-form-group>
              </b-col>

              <b-col md="12">
                <b-form-group
                  :label="t('Update By')"
                  label-for="update_by"
                >
                  <b-form-input
                    id="update_by"
                    placeholder=""
                    :value="pRowData.update_by" 
                    readonly
                  />                  
                </b-form-group>
              </b-col>

              <b-col>
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  type="submit"
                  variant="primary"
                  class="mr-1"
                  @click="insertProduct"
                  v-if="!isModeEdit"
                >
                  <feather-icon icon="EditIcon" />
                  {{ t("Add") }}
                </b-button>
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  type="submit"
                  variant="primary"
                  class="mr-1"
                  @click="updateGroupSub"
                  v-if="isModeEdit"
                >
                  <feather-icon icon="EditIcon" />
                  {{ t("Save") }}
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
  BInputGroupPrepend
} from "bootstrap-vue";
import { ref } from "@vue/composition-api";

import Ripple from "vue-ripple-directive";

import { mapActions } from "vuex";
import axios from "axios";

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
  },
  directives: {
    Ripple,
  },
  setup(props, { emit }) {
    const { t } = useI18nUtils();

    return {
      t,
    };
  },
  data() {
    return {
      // codeMultipleColumn,
      renderComponent: true,
      showTimeInput: false,
      tmpFileUpload:[],
      pagePermission:[],
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
    isEditFormActive: {
      type: Boolean,
      required: true,
    },
    isModeEdit: {
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
    },
    isModeEdit: function (newVal, oldVal) {
      if (newVal == true) {
        this.titleCard = this.$t("Group Subscription (Edit)");
      } else {
        this.titleCard = this.$t("Group Subscription (Add)");
      }
    },
  },
  async created() {
    
    this.titleCard = this.$t("Group Subscription");

    await this.getPagePermission();
    await Promise.all([    
         this.getSubscriptionType(),
    ]);

    

  },
  methods: {
    ...mapActions(["GetPagePermission"]),
    ...mapActions(["GetSubscriptionType"]),
    ...mapActions(["UploadFileAndDeleteOldFile"]),  
    ...mapActions(["DeleteOldFile"]), 
    getCurrentTimeString(ctime) {
      return ctime;
      const ctime2 = new Date(ctime);
      const hours = String(ctime2.getHours()).padStart(2, "0");
      const minutes = String(ctime2.getMinutes()).padStart(2, "0");
      const seconds = String(ctime2.getSeconds()).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    },
    close() {
      this.$emit("close-edit-form");
    },
    clearForm() {
      console.log("Clear Form");
    },
    changePeriod() {
      console.log(this.periodTypeSelected);

      if (this.periodTypeOptions3.length > 0) {
        const getPeriod = this.periodTypeOptions3.find(
          (x) => x.value == this.periodTypeSelected
        );
        this.pRowData.period_unit = getPeriod.text;
        this.forceRerender();
      }
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
      return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });
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
    async updateGroupSub() {
      //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

      console.log("updateGroupSub");

      const userData = JSON.parse(localStorage.getItem("userData"));
      const formData = new FormData();

      var headers = {
        userid: userData.username,
        token: userData.token,
      };

      var body = this.pRowData;
      body.page_name = this.$route.name;
      //body.status = this.statusActive ? this.statusActive : 1;
      body.subscription_type_id = this.subscribeTypeSelected?this.subscribeTypeSelected:0;
      
      //console.log(body);

      let response;
      await axios
        .post("api/subscriptiongroup/updatebyid", body, {
          headers: {
            "Content-Type": "application/json",
            userid: headers.userid,
            token: headers.token,
          },
        })
        .then((resp) => {
          response = resp;
        });

      // console.log(response);
      if (response.data.status == "success") {
        //

        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: `Update`,
            icon: "EditIcon",
            variant: "success",
            text: `Update Succesful.`,
          },
          autoHideDelay: 3000,
        });

        this.$emit("refetch-data");
        this.close();
      } else {
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: `Update`,
            icon: "TrashIcon",
            variant: "danger",
            text: `Update UnSuccesful ${response.data.message}`,
          },
          autoHideDelay: 3000,
        });
        this.search();
      }
    },
    async insertProduct() {
      //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

      console.log("insertProduct");

      const userData = JSON.parse(localStorage.getItem("userData"));
      const formData = new FormData();

      var headers = {
        userid: userData.username,
        token: userData.token,
      };

      var body = this.pRowData;
      body.page_name = this.$route.name;
      body.subscription_type_id = this.subscribeTypeSelected?this.subscribeTypeSelected:0;
      

      let response;
      await axios
        .post("api/subscriptiongroup/create", body, {
          headers: {
            "Content-Type": "application/json",
            userid: headers.userid,
            token: headers.token,
          },
        })
        .then((resp) => {
          response = resp;
        });

      // console.log(response);
      if (response.data.status == "success") {
        //
        this.$emit("refetch-data");
        this.close();
      } else {
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: `Create`,
            icon: "TrashIcon",
            variant: "danger",
            text: `Create UnSuccesful ${response.data.message}`,
          },
          autoHideDelay: 3000,
        });
      }
    },
    async getSubscriptionType(){
      const userData = JSON.parse(localStorage.getItem("userData"));
      const formData = new FormData();

      formData.append("userid", userData.username);
      formData.append("token", userData.token);

      const response = await this.GetSubscriptionType(formData);
      if (response.data.status == 'success') {  
        // console.log(response.data.data);
        const subType = response.data.data;
        let tmpArray = [];
        tmpArray.push({
                value: 0,
                text: "-"
            });

        subType.forEach(element => {
            tmpArray.push({
                value: element.id,
                text: element.subscription_name
            });
        });
        this.subscribeTypeOptions = tmpArray;
        this.subscribeTypeSelected = 1;
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
