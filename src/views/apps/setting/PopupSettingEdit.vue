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
          <b-col md="12" style="padding:10px;">
            <b-img :src="pRowData.promotion_img" fluid thumbnail  />
          </b-col> 
          
          <b-col md="12">
            <b-form-group
              label="Popup Image URL"
              label-for="promotion_img"
            >
              <b-form-input
                id="promotion_img"
                placeholder=""
                v-model="pRowData.promotion_img"
              />
            </b-form-group>
          </b-col>
          
          <b-col md="12">
            <b-form-group
              label="Popup Text"
              label-for="promotion_text"
            >
              <b-form-input
                id="promotion_text"
                placeholder=""
                v-model="pRowData.promotion_text"
              />
            </b-form-group>
          </b-col>

          <b-col md="12" >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="pageSelected"
              :options="pageOptions"
              name="popuppage"                            
              inline
            ></b-form-checkbox-group>
          </b-col>
        
          <b-col cols="12">
            <b-form-group
              label="Active"
              label-for="status-active"
            >
              <b-form-checkbox
                id="checkbox-10"
                name="checkbox-10"
                v-model="statusActive"
                value="1"
                unchecked-value="0"
              >
                On
              </b-form-checkbox>
            </b-form-group>
          </b-col>

          <b-col>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
              @click="insertPopup"
              v-if="!isModeEdit"
            >
            <feather-icon
                icon="EditIcon"              
                />
              Add
            </b-button>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
              @click="updatePopup"
              v-if="isModeEdit"
            >
            <feather-icon
                icon="EditIcon"              
                />
              Save
            </b-button>
            <b-button @click="close" 
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="reset"
              variant="outline-secondary"
            >
                <feather-icon
                icon="DeleteIcon"              
                /> 
              Close
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
      }
    },
    data() {
      return {
        // codeMultipleColumn,
      }
    }, 
    model: {      
      event: 'update:is-admin-edit-active',       
      pageSelected:[],
      pageOptions:[],
      statusActive :0,
      titleCard : "",
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
          if (newVal.promotion_page) 
            {
              this.pageSelected = newVal.promotion_page.split(',');
            }
            else
            {
              this.pageSelected = [];
            }
            this.statusActive = newVal.status;
        },
        isModeEdit: function(newVal, oldVal)
        {              
            if (newVal==true)             
            {              
              this.titleCard = "Popup Data (Edit)";
            }
            else
            {
              this.titleCard = "Popup Data (Add)";
            }
        }
    },
    async created() 
    {        
        this.pageSelected = [''];
        this.pageOptions = [
            { value: 'login', text: 'login' },
            { value: 'dashboard', text: 'dashboard' },
            { value: 'withdraw', text: 'withdraw' },
            { value: 'deposit', text: 'deposit' },
            { value: 'game', text: 'game' },
        ];
        this.titleCard = "Popup Data";        
        
    },    
    methods :{        
        close()
        {               
            this.$emit('close-edit-form');
        },
        clearForm()
        {
            console.log("Clear Form");
        },
        async updatePopup() {        
          //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

          console.log("updatePopup");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();
          
          var headers = {
              userid: userData.username,
              token: userData.token,
          }

          var body = this.pRowData;
          body.status = this.statusActive?this.statusActive:1;
          body.promotion_page = this.pageSelected;
          
          // console.log(body);
      
          let response;
          await axios.post("api/popup/updatePopupbyid",body,
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
                this.search();
          }
        
        },
        async insertPopup() {        
          //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

          console.log("insertPopup");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();

          var headers = {
              userid: userData.username,
              token: userData.token,
          }
          
          var body = this.pRowData;

          body.status = this.statusActive?this.statusActive:1;
          body.promotion_page = this.pageSelected;
          
      
          // console.log(body);
      
          let response;
          await axios.post("api/popup/create",body,
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