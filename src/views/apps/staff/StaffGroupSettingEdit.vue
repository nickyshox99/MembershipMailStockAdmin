<template>
  <Transition name="slide-fade">
    <b-card-code
        v-if="isEditFormActive"
      id="admin-edit"      
      :title="titleCard"
      @hidden="resetForm"
      @change="(val) => $emit('update:is-admin-edit-active', val)"
    >
    <div>
        
      <b-form @submit.prevent >        
        <b-row>  
          <b-col md="12">
            <b-form-group
              :label="t('Group Name')"
              label-for="name"
            >
              <b-form-input
                id="name"
                placeholder=""
                v-model="pRowData.name"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>  
          <b-col md="12">            
            <b-form-group              
              :label="t('Default Page')"
              label-for="default-page-selected"
            >
              <b-form-select id="default-page-selected" v-model="defaultPageSelected" :options="defaultPageOption"></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <hr/>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group
              :label="t('Access Page')"
              label-for="checkbox-group-1"
            >
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="pageSelected"
              :options="pageOptions"
              name="adminpage"              
              style="column-count: 2;"
              stacked 
            ></b-form-checkbox-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <hr/>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group              
              label="ใช้งาน"
              label-for="status-active"
            >
              <b-form-checkbox
                id="checkbox-10"
                name="checkbox-10"
                v-model="statusActive"
                value="1"
                unchecked-value="0"
              >
                {{t('On')}}                
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>  
          <b-col>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
              @click="insertStaffGroup"
              v-if="!isModeEdit"
            >
            <feather-icon
                icon="EditIcon"              
                />
              {{t('Add')}}
            </b-button>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
              @click="updateStaffGroup"
              v-if="isModeEdit"
            >
            <feather-icon
                icon="EditIcon"              
                />
              {{t('Save')}}
            </b-button>
            <b-button @click="close" 
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
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
</template>
  
  <script>
  import BCardCode from '@core/components/b-card-code'
  import {
    BRow, BCol, BFormGroup, BFormInput, BFormCheckbox, BForm, BButton,BFormSelect ,BImg,BFormCheckboxGroup
  } from 'bootstrap-vue'
  import { ref } from '@vue/composition-api'
  import Ripple from 'vue-ripple-directive'
  import formValidation from '@core/comp-functions/forms/form-validation'
  import { mapActions } from "vuex";
  import axios from "axios";

//   import { codeMultipleColumn } from './codemultiplecolumn'
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

  import { useUtils as useI18nUtils } from '@core/libs/i18n'
  
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
      BFormCheckboxGroup,
    },
    directives: {
      Ripple,
    },
    setup(props, { emit })
    {
      const { t } = useI18nUtils();
      const blankData = {
        credit: 0.00,
        credit_bonus: 0.00,
        date: null,
        username: '',        
      }

      let tmpData = JSON.parse(JSON.stringify(blankData));
      const resetuserData = () => {
        tmpData = JSON.parse(JSON.stringify(blankData));
      }

      const {        
        resetForm,
      } = formValidation(resetuserData)
  
      return {                
        resetForm,
        t,
      }
    },
    data() {
      return {
        // codeMultipleColumn,
      }
    }, 
    model: {      
      event: 'update:is-admin-edit-active',        
      statusActive :0,
      titleCard : "",            
      pageSelected:[],
      pageOptions:[],
      defaultPageSelected:"",
      defaultPageOption: [
        { value: 0, text: 'Select Page' },        
      ],
    },
    props: {
        isEditFormActive: {
            type: Boolean,
            required: true,
        },
        isModeEdit:{
          type: Boolean,
          required: true,
        },
        pRowData:{        
            required: false,
        },                
    },        
    watch: 
    {
        pRowData: function(newVal, oldVal) 
        {            
            this.name = newVal.name;
            this.statusActive = newVal.status;

            if (newVal.permission) 
            {
              this.pageSelected = newVal.permission.split(',');
              // console.log(this.pageSelected);
            }
            else
            {
              this.pageSelected = [];
            }
            
            if(newVal.default_page_id)
            {
              this.defaultPageSelected = newVal.default_page_id;
            }
            else
            {
              this.defaultPageSelected = 0;
            }
        },
        isModeEdit: function(newVal, oldVal)
        {              
            const { t } = useI18nUtils();
            if (newVal==true)             
            {              
              this.titleCard = "Staff Group Data (Edit)";
            }
            else
            {
              this.titleCard = "Staff Group Data (Add)";
            }
        },
    },
    async created() 
    {        
      const { t } = useI18nUtils();

      this.pageSelected = [];
      this.titleCard = "Staff Group Data";
      this.getStaffPage();        
    },        
    methods :{    
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
        
        this.pageOptions = tmpArray;
        this.defaultPageOption = tmpArray2;        
        this.defaultPageOptionEng = tmpArray3;
        // console.log(this.pageOptions);
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
          
        close()
        {               
            this.$emit('close-edit-form');
        },
        clearForm()
        {
            console.log("Clear Form");
        },
        async updateStaffGroup() {        
          //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

          console.log("updateStaffGroup");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();
          
          var headers = {
              userid: userData.username,
              token: userData.token,
          }

          var body = this.pRowData;

          body.status = this.statusActive?this.statusActive:1;
          const tmpPageSelected = this.pageSelected.join(',');
          body.permission = tmpPageSelected;

          body.default_page_id = this.defaultPageSelected;
          body.default_page = this.defaultPageOptionEng.find(element => element.value == this.defaultPageSelected).text;
          body.default_page_th = this.defaultPageOption.find(element => element.value == this.defaultPageSelected).text;
          
          body.page_name = this.$route.name;
          // console.log(body.permission);
      
          let response;
          await axios.post("api/staffgroup/updatestaffgroupbyid",body,
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
              //

              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: `Update`,
                  icon: 'EditIcon',
                  variant: 'success',
                  text: `Update Succesful.`,
                  },
                  autoHideDelay: 3000,
              });

              this.$emit('refetch-data');
              this.close();

              
          }
          else
          {
            this.$toast({
                  component: ToastificationContent,
                  position: 'top-right',
                  props: {
                    title: `Update`,
                    icon: 'TrashIcon',
                    variant: 'danger',
                    text: `Update UnSuccesful ${response.data.message}`,
                    },
                    autoHideDelay: 3000,
                });                
          }
        
        },
        async insertStaffGroup() {        
          
          // console.log(this.pageSelected.toString());

          console.log("insertStaffGroup");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();

          var headers = {
              userid: userData.username,
              token: userData.token,
          }
          
          var body = this.pRowData;
          
          body.status = this.statusActive?this.statusActive:1;
          const tmpPageSelected = this.pageSelected.join(',');
          body.permission = tmpPageSelected;

          body.default_page_id = this.defaultPageSelected;
          body.default_page = this.defaultPageOptionEng.find(element => element.value == this.defaultPageSelected).text;
          body.default_page_th = this.defaultPageOption.find(element => element.value == this.defaultPageSelected).text;
          
          // console.log(body);
          body.page_name = this.$route.name;
      
          let response;
          await axios.post("api/staffgroup/create",body,
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
              //
              this.$emit('refetch-data');
              this.close();
          }
          else
          {
            this.$toast({
                  component: ToastificationContent,
                  position: 'top-right',
                  props: {
                    title: `Create`,
                    icon: 'TrashIcon',
                    variant: 'danger',
                    text: `Create UnSuccesful ${response.data.message}`,
                    },
                    autoHideDelay: 3000,
                });                
          }
        
        },        
       
    },
  }
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