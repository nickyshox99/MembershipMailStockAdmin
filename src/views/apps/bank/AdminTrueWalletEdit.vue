<template>
  <Transition name="bounce">
    <b-card-code
        v-if="isEditFormActive"
      id="admin-true-wallet-edit"
      :title="titleCard"
      @hidden="resetForm"
      @change="(val) => $emit('update:is-admin-true-wallet-edit-active', val)"
    >
    <div>
        
      <b-form @submit.prevent >        
        <b-row>
          <b-col md="6">
            <b-form-group
              :label="t('Category')"
              label-for="bank-selected"
            >
              <b-form-select v-model="walletTypeSelected" :options="walletTypeOptions"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group              
              :label="t('Type')"       
              label-for="deposit-withdraw"
            >
              <b-form-select v-model="depWitSelected" :options="depWitOptions"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group              
              :label="t('Account Name')"
              label-for="truewallet-account-name"
            >
              <b-form-input
                id="bank-account-name"
                placeholder="Mr.John Sonic"
                v-model="bankAccountName"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group              
              :label="t('Account Number')"
              label-for="truewallet-account-number"
            >
              <b-form-input
                id="bank-account-number"
                placeholder="4361144216"
                v-model="bankAccountNumber"
              />
            </b-form-group>
          </b-col>


          <b-col md="4">
            <b-form-group
              label="True Key"
              label-for="true-key"
            >
              <b-form-input
                id="true-key"
                placeholder=""
                v-model="truekey"
              />
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group
              label="True token"
              label-for="true-token"
            >
              <b-form-input
                id="true-token"
                placeholder=""
                v-model="truetoken"
              />
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group
              label="Api id"
              label-for="api-id"
            >
              <b-form-input
                id="api-id"
                placeholder=""
                v-model="apiid"
              />
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
                {{ t('On') }} 
              </b-form-checkbox>
            </b-form-group>
          </b-col>

          <b-col cols="1">

        </b-col>

        <b-col cols="1">

        </b-col>

        <b-col cols="1">

        </b-col>
  
          <!-- submit and reset -->
          <b-col>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
              @click="insertAdminBank"
              v-if="!isModeEdit"
            >
            <feather-icon
                icon="EditIcon"              
                />
              {{ t('Add') }} 
            </b-button>

            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
              @click="updateAdminTrueWallet"
              v-if="isModeEdit"
            >
            <feather-icon
                icon="EditIcon"              
                />
              {{ t('Save') }} 
            </b-button>
            <b-button @click="close" 
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="reset"
              variant="outline-secondary"
            >
                <feather-icon
                icon="DeleteIcon"              
                /> 
             {{ t('Close') }} 
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
    setup(props, { emit }){

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
      event: 'update:is-admin-true-wallet-edit-active',
      walletTypeSelected : "DEPOSIT",
      walletTypeOptions: [
        { value: null, text: 'True Wallet' },        
      ],
      depWitSelected : "DEPOSIT",
      depWitOptions: [
      ],
      bankAccountName:"",
      bankAccountNumber:"",      
      truekey:"",
      truetoken:"",
      apiid:"",
      
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
            console.log(newVal);

            this.walletTypeSelected = newVal.tw_type_wallet;
            this.depWitSelected = newVal.tw_type;
            this.bankAccountName = newVal.tw_name;
            this.bankAccountNumber = newVal.tw_mobile;            

            this.truekey = newVal.tw_key;
            this.truetoken = newVal.login_token;
            this.apiid = newVal.tmn_id;

            this.statusActive = newVal.status;
            
        },
        isModeEdit: function(newVal, oldVal)
        {
            if (newVal==true) 
            {
              this.titleCard = "TrueWallet Admin Data (Edit)";
            }
            else
            {
              this.titleCard = "TrueWallet Admin Data (Add)";
            }
        }
    },
    async created() {        
        
        this.walletTypeOptions = [
          { value: 'DEPOSIT', text: 'True Wallet' },
          { value: 'DEPOSIT_GIFT', text: 'True AungPao' },
          { value: 'DEPOSIT_SMS', text: 'True SMS' },
        ];

        this.depWitOptions = [
            { value: 'DEPOSIT', text: 'DEPOSIT' },        
            { value: 'WITHDRAW', text: 'WITHDRAW' },        
            { value: 'BOTH' , text: 'BOTH' },        
        ];
        
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
       
        async updateAdminTrueWallet() {        
          //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

          console.log("updateAdminTrueWallet");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();
          
          var headers = {
              userid: userData.username,
              token: userData.token,
          }

          var body = {              
           
              id : this.pRowData.id,
              tw_type_wallet : this.walletTypeSelected,

              tw_type : this.depWitSelected,
              tw_name : this.bankAccountName,
              tw_mobile : this.bankAccountNumber,
              
              tw_key : this.truekey,
              login_token : this.truetoken,
              tmn_id : this.apiid,
              
              statusActive : this.statusActive,
          }
      
          console.log(body);
      
          let response;
          await axios.post("api/admintruewallet/updateadmintruewalletbyid",body,
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
        async insertAdminBank() {        
          //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

          console.log("insertAdminTrueWallet");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();

          var headers = {
              userid: userData.username,
              token: userData.token,
          }
          
          var body = {         
              id : this.pRowData.id,
              tw_type_wallet : this.walletTypeSelected,              
              tw_type : this.depWitSelected,
              tw_name : this.bankAccountName,
              tw_mobile : this.bankAccountNumber,
              
              tw_key : this.truekey?this.truekey:' ',
              login_token : this.truetoken?this.truetoken:' ',
              tmn_id : this.apiid?this.apiid:' ',
              
              statusActive : this.statusActive,
           }
      
          // console.log(body);
      
          let response;
          await axios.post("api/admintruewallet/create",body,
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