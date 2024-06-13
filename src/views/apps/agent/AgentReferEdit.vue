<template>
  <Transition name="bounce">
    <b-card-code
        v-if="isEditFormActive"
      id="refer-edit"
      :title="titleCard"
      @hidden="resetForm"
      @change="(val) => $emit('update:is-refer-edit-active', val)"
    >
    <div>
        
      <b-form @submit.prevent >        
        <b-row style="justify-content: space-between!important;">
        
          <b-col md="12">
            <b-form-group
              :label="t('Refer')"
              label-for="refer"
            >
              <b-form-input
                id="refer"
                placeholder="facebook"
                v-model="pRowData.refer"
              />
            </b-form-group>
          </b-col>
         
          <b-col md="1">
            <b-form-group              
              :label="t('Status')"
              label-for="agent-status"
            >
            <b-form-checkbox
                id="agent-status"
                name="agent-status"                
                v-model="pRowData.status"
                value="1"
                unchecked-value="0"
              >
                {{t('On')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>

         
          <!-- submit and reset -->
          <b-col>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
              @click="insertRefer"
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
              @click="updateRefer"
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
  
      <!-- <template #code>
        {{ codeMultipleColumn }}
      </template> -->
    </div>
    </b-card-code>
  </Transition>
</template>
  
  <script>
  import BCardCode from '@core/components/b-card-code'
  import {
    BRow, BCol, BFormGroup, BFormInput, BFormCheckbox, BForm, BButton,BFormSelect
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
    },
    directives: {
      Ripple,
    },
    setup(props, { emit })
    {

      const { t } = useI18nUtils();
        const blankData = {        
          refer: '',      
          referstatus: 1,
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
          t,
        }
    },
    data() {
      return {
        // codeMultipleColumn,
      }
    }, 
    model: {      
      event: 'update:is-refer-edit-active', 
      titleCard:'',
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

        },
        isModeEdit: function(newVal, oldVal)
        {
            if (newVal==true) 
            {
              this.titleCard = "Refer Data (Edit)";
            }
            else
            {
              this.titleCard = "Refer Data (Add)";
            }
        }
    },
    async created() {
        this.titleCard = "";
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
        async updateRefer() {        
          //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

          console.log("updateRefer");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();
          
          var headers = {
              userid: userData.username,
              token: userData.token,
          }

          var body = this.pRowData;
      
          // console.log(body);
      
          let response;
          await axios.post("api/refer/updateReferbyid",body,
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
        async insertRefer() {        
          //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

          console.log("insertRefer");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();

          var headers = {
              userid: userData.username,
              token: userData.token,
          }
          
          var body = this.pRowData;
      
      
          let response;
          await axios.post("api/refer/create",body,
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