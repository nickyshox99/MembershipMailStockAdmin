<template>
  <Transition name="bounce">
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
          
          <b-col md="6">
            <b-form-group
              :label="t('Username')"
              label-for="name"
            >
              <b-form-input
                id="name"
                placeholder="User Name"
                v-model="pRowData.adminName"
                :readonly="isModeEdit"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group              
              :label="t('Fullname')"
              label-for="am_fullname"
            >
              <b-form-input
                id="am_fullname"
                placeholder="Full Name"
                v-model="pRowData.fullName"
              />
            </b-form-group>
          </b-col>

        </b-row>

        <b-row>
          <b-col md="6" >
            <b-form-group
              :label="t('Admin Group')"              
              label-for="admin-group"
            >
              <b-form-select v-model="adminGroupSelected" :options="adminGroupOptions"></b-form-select>
            </b-form-group>
          </b-col>

          <b-col md="1">
            <b-form-group
              :label="t('Can Use All Menu')"                
              label-for="can-use-all-menu"
            >
            <b-form-checkbox
                id="can-use-all-menu"
                name="can-use-all-menu"                
                v-model="canUseAllMenuSelected"
                value="1"
                unchecked-value="0"
              >
                {{t('On')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>

          <b-col cols="1">
            <b-form-group
              :label="t('Active')"               
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
              @click="insertStaff"
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
              @click="updateStaff"
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
      adminGroupSelected:[],      
      adminGroupOptions:[],
      oldPassword : "",
      canUseAllMenuSelected : 0,      
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
            this.statusActive = newVal.status?newVal.status:0;
            this.canUseAllMenuSelected = newVal.am_rank?newVal.am_rank:0;
            this.adminGroupSelected = newVal.am_group;
            this.oldPassword = newVal.hash;
            // console.log(newVal);
            if (newVal.am_rank==4) 
            {
              this.canUseAllMenuSelected = 1;
            }
            else
            {
              this.canUseAllMenuSelected = 0;  
            }
            
        },
        isModeEdit: function(newVal, oldVal)
        {              
            if (newVal==true)             
            {              
              this.titleCard = this.$t("Staff Data (Edit)");
            }
            else
            {
              this.titleCard = this.$t("Staff Data (Add)");
            }
        },
    },
    async created() 
    {        
        this.adminGroupSelected = [];
        this.titleCard = this.$t("Staff Data");        
        await this.getStaffGroup();           
    },        
    methods :{          
        ...mapActions(["GetStaffGroup"]),
        async getStaffGroup() 
        {
          console.log('getStaffGroup');

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();

          formData.append("userid", userData.username);
          formData.append("token", userData.token);
          
          formData.append("pageLength", this.pageLength);
          formData.append("page_name", this.$route.name);

          const response = await this.GetStaffGroup(formData);
          if (response.data.status == 'success') 
          {          
            let responseGroup = response.data.data;
            let tmpArray = [];        
            responseGroup.forEach(element => {
                tmpArray.push({value : element.id ,text: element.name});
            });
        
            this.adminGroupOptions = tmpArray;
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
        close()
        {               
            this.$emit('close-edit-form');
        },
        clearForm()
        {
            console.log("Clear Form");
        },
        async updateStaff() {        
          //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

          console.log("updateStaff");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();
          
          var headers = {
              userid: userData.username,
              token: userData.token,
          }

          var body = this.pRowData;

          body.status = this.statusActive?this.statusActive:1;
          body.oldPassword = this.oldPassword;

          if (this.canUseAllMenuSelected==1) 
          {
            body.am_rank = 4;
          }
          else
          {
            body.am_rank = 2;
          }

          body.am_group = this.adminGroupSelected;
          body.page_name = this.$route.name;
      
          let response;
          await axios.post("api/staff/updatestaffbyid",body,
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
        async insertStaff() {        
          
          // console.log(this.pageSelected.toString());

          console.log("insertStaff");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();

          var headers = {
              userid: userData.username,
              token: userData.token,
          }

          this.pRowData.adminName = this.pRowData.adminName.toLowerCase();
          
          var body = this.pRowData;
          

          body.is_parent = 0;          
          body.status = this.statusActive?this.statusActive:1;
          
          if (this.canUseAllMenuSelected==1) 
          {
            body.am_rank = 4;
          }
          else
          {
            body.am_rank = 2;
          }

          body.am_group = this.adminGroupSelected;
          body.page_name = this.$route.name;
          
          // console.log(body);
      
          let response;
          await axios.post("api/staff/create",body,
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