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
          <b-col md="12">
            <b-form-group
              label="Topic"
              label-for="topic"
            >
              <b-form-input
                id="topic"
                placeholder=""
                v-model="pRowData.topic"
              />
            </b-form-group>
          </b-col>
          
          <b-col md="12">
            <b-form-group
              label="Announcement Date"
              label-for="announcement_date"
            >
              <b-form-datepicker
                id="announcement_date"                
                v-model="pRowData.date_announcement"                
                :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"                 
              />
            </b-form-group>
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
              @click="insertAnnouncement"
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
              @click="updateAnnouncement"
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
    BRow, BCol, BFormGroup, BFormInput, BFormCheckbox, BForm, BButton,BFormSelect ,BImg,BFormCheckboxGroup,BFormDatepicker
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
      BFormDatepicker,
    },
    directives: {
      Ripple,
    },
    setup(props, { emit })
    {
      const blankData = {
        topic: '',
        description: '',
        date_announcement: new Date(),
        update_date: new Date(),
        update_by: '',
        status :1,
      };

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
        
      }
    }, 
    model: {      
      event: 'update:is-admin-edit-active',             
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
            this.statusActive = newVal.status;
        },
        isModeEdit: function(newVal, oldVal)
        {              
            if (newVal==true)             
            {              
              this.titleCard = "Announcement Data (Edit)";
            }
            else
            {
              this.titleCard = "Announcement Data (Add)";
            }
        }
    },
    async created() 
    {        
        this.titleCard = "Announcement Data";       
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
        async updateAnnouncement() {        
          //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

          console.log("updateAnnouncement");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();
          
          var headers = {
              userid: userData.username,
              token: userData.token,
          }

          var body = this.pRowData;
          body.status = this.statusActive?this.statusActive:1;
          body.description = '-';
          body.update_by = userData.username;
          body.update_date = new Date();
          
          // console.log(body);
      
          let response;
          await axios.post("api/announcement/updateAnnouncementbyid",body,
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
        async insertAnnouncement() {        
          //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

          console.log("insertAnnouncement");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();

          var headers = {
              userid: userData.username,
              token: userData.token,
          }
          
          var body = this.pRowData;
          body.status = this.statusActive?this.statusActive:1;     
          body.description = '-';     
          body.update_by = userData.username;
          body.update_date = new Date();
      
          // console.log(body);
      
          let response;
          await axios.post("api/announcement/create",body,
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