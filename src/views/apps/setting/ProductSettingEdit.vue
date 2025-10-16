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
              <b-col md="12" v-if="pRowData.product_img != ''">
                <b-img
                  :src="pRowData.product_img"
                  class="img-fluid"
                  alt="Product Image"
                  style="max-width: 200px; max-height: 200px"
                />
              </b-col>
              
              <b-col md="12">                                
                  <input type="file" @change="uploadFile('product_img')" ref="product_img">
                  <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('product_img')" :disabled="!pagePermission.canEdit">
                      Upload
                  </b-button>
              </b-col>          

              

              <b-col md="12">
                <b-form-group
                  :label="t('Product Image')"
                  label-for="product_img"
                >
                  <b-form-input
                    id="product_img"
                    placeholder=""
                    v-model="pRowData.product_img"
                  />
                </b-form-group>
              </b-col>

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
                  :label="t('Product Name')"
                  label-for="product_name"
                >
                  <b-form-input
                    id="product_name"
                    placeholder=""
                    v-model="pRowData.product_name"
                  />
                </b-form-group>
              </b-col>

              <b-col md="12">
                <b-form-group
                  :label="t('Product Description')"
                  label-for="product_desc"
                >
                  <b-form-input
                    id="product_desc"
                    placeholder=""
                    v-model="pRowData.product_desc"
                  />
                </b-form-group>
              </b-col>

              <b-col md="12">
                <b-form-group
                  :label="t('Price')"
                  label-for="price"
                >
                  <b-form-input
                    id="price"
                    placeholder=""
                    v-model="pRowData.use_credit"
                  />
                </b-form-group>
              </b-col>

              <b-col md="12">
                <b-form-group
                  :label="t('Subscription Day')"
                  label-for="subscription_day"
                >
                  <b-form-input
                    id="subscription_day"
                    placeholder=""
                    v-model="pRowData.subscription_day"
                  />
                </b-form-group>
              </b-col>

              <b-col md="12">
                <b-form-group
                  :label="t('Subscription Times')"
                  label-for="subscription_times"
                >
                  <b-form-input
                    id="subscription_times"
                    placeholder=""
                    v-model="pRowData.subscription_times"
                  />
                </b-form-group>
              </b-col>

              <b-col md="12">
                <b-form-group :label="t('Shop Type')" label-for="shop-type">
                  <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                      <feather-icon icon="PackageIcon" />
                    </b-input-group-prepend>
                    <b-form-select v-model="shopTypeSelected" :options="shopTypeOptions"></b-form-select>
                  </b-input-group>
                </b-form-group>
              </b-col>

              <b-col cols="1" md="12">
                <b-form-group :label="t('Active')" label-for="status-active">
                  <b-form-checkbox
                    id="checkbox-10"
                    name="checkbox-10"
                    v-model="statusActive"
                    value="1"
                    unchecked-value="0"
                  >
                    {{ t("On") }}
                  </b-form-checkbox>
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
                  @click="updateProduct"
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

const vueconfig = require('../../../../config/vue.config');

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
      shopTypeSelected: 0,
      shopTypeOptions: [
        { value: 0, text: 'Personal' },
        { value: 1, text: 'Family' },
        { value: 2, text: 'รหัสตัวเอง' },
        { value: 3, text: 'เมลตัวเอง' }
      ],
      baseApiUrl: vueconfig.BASE_API_URL,
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
      this.shopTypeSelected = newVal.shop_type || 0;
    },
    isModeEdit: function (newVal, oldVal) {
      if (newVal == true) {
        this.titleCard = this.$t("Product (Edit)");
      } else {
        this.titleCard = this.$t("Product (Add)");
      }
    },
  },
  async created() {
    
    this.titleCard = this.$t("Product");

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
    async updateProduct() {
      //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

      console.log("updateProduct");

      const userData = JSON.parse(localStorage.getItem("userData"));
      const formData = new FormData();

      var headers = {
        userid: userData.username,
        token: userData.token,
      };

      var body = this.pRowData;
      body.page_name = this.$route.name;
      body.status = this.statusActive ? this.statusActive : 1;
      body.subscription_type_id = this.subscribeTypeSelected?this.subscribeTypeSelected:0;
      body.shop_type = this.shopTypeSelected || 0;
      
      //console.log(body);

      let response;
      await axios
        .post("api/product/updatebyid", body, {
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
      body.shop_type = this.shopTypeSelected || 0;
      

      let response;
      await axios
        .post("api/product/add", body, {
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
        
        // เพิ่ม extension จาก file ที่ upload
        const fileExtension = this.tmpFileUpload[tmpName].name.split('.').pop();
        formData.append("tofilename", tmpName + '.' + fileExtension);
        formData.append("oldFilePath", this.pRowData[tmpName]);
        
        const response = await this.UploadFileAndDeleteOldFile(formData);
        if (response.data.status == 'success') 
        {                 
            // API ส่ง filename กลับมา ต้องเอา path มาต่อ
            this.pRowData[tmpName] = this.baseApiUrl + 'getfile/' + response.data.url;
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
