<template>
  <Transition name="bounce">
    <b-card-code
        v-if="isEditFormActive"
      id="admin-bank-edit"
      :title="t(titleCard)"
      @hidden="resetForm"
      @change="(val) => $emit('update:is-admin-bank-edit-active', val)"
    >
    <div>
        
      <b-form @submit.prevent >        
        <b-row>
          <b-col md="6">
            <b-form-group              
              :label="t('Bank')"
              label-for="bank-selected"
            >
              <b-form-select v-model="bankSelected" :options="bankOptions"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="6" v-if="false">
            <b-form-group              
              :label="t('Deposit/Withdraw')"
              label-for="deposit-withdraw"
            >
              <b-form-select v-model="depWitSelected" :options="depWitOptions"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group              
              :label="t('Bank Account Name')"
              label-for="bank-account-name"
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
              :label="t('Bank Account Number')"
              label-for="bank-account-number"
            >
              <b-form-input
                id="bank-account-number"
                placeholder="4361144216"
                v-model="bankAccountNumber"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group              
              :label="t('PromptPay Number (Phone)')"
              label-for="promptpay-number"
            >
              <b-form-input
                id="promptpay-number"
                placeholder="0812345678"
                v-model="promptpayNumber"
                maxlength="10"
              />
              <small class="text-muted">เบอร์โทร 10 หลัก สำหรับ Auto Generate QR</small>
            </b-form-group>
          </b-col>

          <b-col md="6" v-if="false">
            <b-form-group              
              :label="t('Work Type')"
              label-for="work-type"
            >
              <b-form-select v-model="workTypeSelected" :options="workTypeOptions"></b-form-select>
            </b-form-group>
          </b-col>

          <b-col md="6" v-if="false">
            <b-form-group              
              :label="t('Show Type')"
              label-for="show-only-bank"
            >
              <b-form-select v-model="showTypeSelected" :options="showTypeOptions"></b-form-select>
            </b-form-group>
          </b-col>

         

          <b-col md="6" v-if="false">
            <b-form-group
              label="Device ID"
              label-for="device-id"
            >
              <b-form-input
                id="device-id"
                placeholder=""
                v-model="deviceid"
              />
            </b-form-group>
          </b-col>

          <b-col md="6" v-if="false">
            <b-form-group              
              :label="t('PIN')"
              label-for="pin"
            >
              <b-form-input
                id="pin"
                placeholder="223344"
                v-model="pin"
              />
            </b-form-group>
          </b-col>

          <b-col md="12" v-if="false">
            <b-form-group
              label="Node URL"
              label-for="node-url"
            >
              <b-form-input
                id="node-url"
                placeholder="http://103.124.0.1:3000"
                v-model="nodeurl"
              />
            </b-form-group>
          </b-col>


          <b-col md="1" v-if="false">
            <b-form-group              
              :label="t('Break Cash')"
              label-for="break-cash-enable"
            >
            <b-form-checkbox
                id="break-cash-enable"
                name="break-cash-enable"                
                v-model="bankBreakSelected"
                @change="breakChange"
                value="1"
                unchecked-value="0"
              >
                {{t('On')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>

          <b-col md="1" v-if="false">
            <b-form-group              
              :label="t('Deposit Decimal')"
              label-for="deposit-decimal"
            >
            <b-form-checkbox
                id="deposit-decimal"
                name="deposit-decimal"                
                v-model="bankDecimalSelected"
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

          <b-col md="6">
            <b-form-group
              :label="t('QR Code')"
              label-for="qr-display"
            >
              <div v-if="currentQRPath">
                <img 
                  :src="getQRImageUrl(currentQRPath)" 
                  alt="Current QR Code" 
                  style="max-width: 200px; max-height: 200px; border: 1px solid #ddd; padding: 10px;"
                />
                <br>
                <small class="text-muted">{{ t('Current QR Code') }}</small>
              </div>
              <div v-else class="text-muted">
                {{ t('No QR Code uploaded') }}
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="1">

        </b-col>

        <b-col cols="1">

        </b-col>

        <b-col cols="1">

        </b-col>
  
        <b-col cols="6">

        </b-col>
         

        <b-col md="6" v-if="showBreakBank"  >
            <b-form-group              
              :label="t('Account For Break')"
              label-for="bank-selected3"
            >
              <b-form-select v-model="bankSelected3" :options="bankOptions3"></b-form-select>
            </b-form-group>
          </b-col>

          <b-col md="6" v-if="showBreakBank">
            <b-form-group
              :label="t('Amount Cash Break')"
              label-for="amount-break-credit"
            >
              <b-form-input
                id="amount-break-credit"
                placeholder="10000"
                v-model="bank_break_credit_check"
              />
            </b-form-group>
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
              {{t('Add')}}
            </b-button>

            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
              @click="updateAdminBank"
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

      <b-form @submit.prevent v-if="false">
        <b-row>
          <b-col md="12">
            &nbsp;
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6">
            <b-form-group
            :label="t('Transfer')" 
              label-for="bank-selected2"
            >
              <b-form-select v-model="bankSelected2" :options="bankOptions2"></b-form-select>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
            :label="t('Bank Account Number')"              
              label-for="bank-account-number"
            >
              <b-form-input
                id="bank-account-number"
                placeholder="5431119430"
                v-model="bankTransferAccountNumber"
              />
            </b-form-group>
          </b-col>

        </b-row>
        <b-row >
          
          <b-col md="6">
            <b-form-group
              :label="t('Amount')"
              label-for="bank-transfer-amount"
            >
              <b-form-input
                id="bank-transfer-amount"
                placeholder="3000"
                v-model="bankTransferAmount"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              :label="t('Transfer PIN')"              
              label-for="bank-transfer-pin"
            >
              <b-form-input
                id="bank-transfer-pin"
                placeholder="123456"
                v-model="bankTransferPIN"
              />
            </b-form-group>
          </b-col>
          
        </b-row>

        <b-row >
          <b-col>
           
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="info"
              class="mr-1"
              @click="transferMoney"
              v-if="isModeEdit"
            >
            <feather-icon
                icon="EditIcon"              
                />
              {{t('Transfer')}}
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
    name: 'AdminBankEdit',
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
        showBreakBank:false,
        currentQRPath: ''
      }
    }, 
    model: {      
      event: 'update:is-admin-bank-edit-active',
      bankSelected : "1",
      bankSelected2 : "1",
      bankTransferAccountNumber:"",
      bankTransferAmount:"100",
      bankTransferPIN:"",
      bankOptions: [
        { value: null, text: 'Select Bank' },        
      ],
      bankOptions2: [
        { value: null, text: 'Select Bank' },        
      ],
      bankOptions3: [
        { value: 0, text: 'Select Bank' },        
      ],
      depWitSelected : "DEP",
      depWitOptions: [
      ],
      bankAccountName:"",
      bankAccountNumber:"",
      promptpayNumber:"",
      workTypeSelected: "IBK",
      workTypeOptions:[
      ],
      deviceid:"",
      pin:"",
      nodeurl:"",
      showTypeSelected:"ALL",
      showTypeOptions:[
      ],
      bankBreakSelected:false,      
      bankDecimalSelected:false,
      statusActive :0,
      titleCard : "",
      bank_break_credit_check:"",
      bank_break_id:0,
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
            this.bankSelected = newVal.bank_id;
            this.depWitSelected = newVal.bank_type;
            this.bankAccountName = newVal.bank_acc_name;
            this.bankAccountNumber = newVal.bank_acc_number;
            this.promptpayNumber = newVal.promptpay_number || "";
            this.workTypeSelected = newVal.work_type;
            this.showTypeSelected = newVal.show_type;
            this.statusActive = newVal.status;

            let metadata = JSON.parse(newVal.meta_data);            

            this.deviceid = metadata.deviceid?metadata.deviceid:"";
            this.bankSelected3 = metadata.bank_break_id?metadata.bank_break_id:0;
            this.bank_break_credit_check = metadata.bank_break_credit_check?metadata.bank_break_credit_check:0.00;
            this.pin = metadata.password?metadata.password:"";
            this.nodeurl = metadata.url?metadata.url:"";

            this.bankBreakSelected = metadata.bank_break_enable?metadata.bank_break_enable:0;
            this.bankDecimalSelected = metadata.deposit_decimal?metadata.deposit_decimal:0;  

            if (this.bankBreakSelected==1) 
            {
              this.showBreakBank=true;
            }
            else
            {
              this.showBreakBank=false;
            }

            // Set QR code path
            this.currentQRPath = newVal.qr || '';

        },
        isModeEdit: function(newVal, oldVal)
        {
            if (newVal==true) 
            {
              this.titleCard = "Bank Admin Data (Edit)";
            }
            else
            {
              this.titleCard = "Bank Admin Data (Add)";
            }
        }
    },
    async created() {        
        await this.getBankInfo();
        
        this.depWitOptions = [
            { value: 'DEPOSIT', text: 'DEPOSIT' },        
            { value: 'WITHDRAW', text: 'WITHDRAW' },        
            { value: 'BOTH' , text: 'BOTH' },        
            { value: 'BREAK' , text: 'BREAK' },
        ];
        this.workTypeOptions = [
            { value: 'IBK', text: 'IBK' },        
            { value: 'NODE', text: 'NODE' },        
            { value: 'SMS' , text: 'SMS' },        
        ];
        this.showTypeOptions = [
            { value: 'ALL', text: 'ALL' },        
            { value: 'ONLY_SCB', text: 'ONLY SCB' },        
            { value: 'ONLY_KBANK' , text: 'ONLY KBANK' },        
        ];
        
        this.bankBreakOptions = false;
        this.bankDecimalSelected = false;
        this.titleCard = "";

        this.bankTransferAccountNumber="";
        this.bankTransferAmount="100";
        this.bankTransferPIN="";

        
    
    },    
    methods :{
        ...mapActions(["GetBankInfo"]),
        ...mapActions(["GetBankBreakInfo"]),        
        close()
        {               
            this.$emit('close-edit-form');
        },
        clearForm()
        {
            console.log("Clear Form");
        },        
        breakChange()
        {
          if (this.bankBreakSelected==1) 
          {
            this.showBreakBank=true;  
          }
          else
          {
            this.showBreakBank=false;  
          }
        },
        async getBankInfo()
        {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const User = new FormData();
            
            User.append("userid", userData.username);
            User.append("token", userData.token);

            const response = await this.GetBankInfo(User);
            if (response.data.status=='success') {
                const bankinfo = response.data.data;
                let tmpArray = [];        
                bankinfo.forEach(element => {
                    tmpArray.push({value : element.bank_id ,text: element.bank_name});
                });
                this.bankOptions = tmpArray;
                this.bankSelected = 1;

                this.bankOptions2 = tmpArray;
                this.bankSelected2 = 1;

            }else{

            }
        },
        async getBankBreakInfo()
        {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const User = new FormData();
            
            User.append("userid", userData.username);
            User.append("token", userData.token);

            const response = await this.GetBankBreakInfo(User);
            if (response.data.status=='success') {
                const bankinfo = response.data.data;
                
                let tmpArray = [];        
                bankinfo.forEach(element => {
                    tmpArray.push({value : element.id ,text: element.bank_name + " " +element.bank_acc_number });
                });                

                this.bankOptions3 = tmpArray;
                this.bankSelected3 = 0;

            }else{

            }
        },
        async updateAdminBank() {        
          //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

          console.log("updateAdminBank");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();
          
          var headers = {
              userid: userData.username,
              token: userData.token,
          }

          var body = {              
              
              id : this.pRowData.id,
              bank_id : this.bankSelected,
              bank_name: this.bankOptions.find(element => element.value == this.bankSelected).text,
              bank_type : this.depWitSelected,
              bank_acc_name : this.bankAccountName,
              bank_acc_number : this.bankAccountNumber,
              promptpay_number : this.promptpayNumber || "",
              work_type : this.workTypeSelected,
              show_type : this.showTypeSelected,

              deviceid : this.deviceid,
              bank_break_id : this.bankSelected3?this.bankSelected3:0,
              bank_break_credit_check : (this.bank_break_credit_check?parseFloat(this.bank_break_credit_check):0.00),
              pin : this.pin,
              url : this.nodeurl,
              bank_break_enable : this.bankBreakSelected,
              deposit_decimal : this.bankDecimalSelected,
              statusActive : this.statusActive,
          }
      
          // console.log(body);
      
          let response;
          await axios.post("api/adminbank/updateadminbankbyid",body,
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
                this.$emit('refetch-data');
          }
        
        },
        async insertAdminBank() {        
          //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

          console.log("insertAdminBank");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();

          var headers = {
              userid: userData.username,
              token: userData.token,
          }
          
          var body = {

              id : this.pRowData.id,
              bank_id : this.bankSelected?this.bankSelected:1,
              bank_name: this.bankOptions.find(element => element.value == this.bankSelected).text,
              bank_type : this.depWitSelected?this.depWitSelected:'BOTH',
              bank_acc_name : this.bankAccountName?this.bankAccountName:' ',
              bank_acc_number : this.bankAccountNumber?this.bankAccountNumber:' ',
              promptpay_number : this.promptpayNumber || "",
              work_type : this.workTypeSelected?this.workTypeSelected:'IBK',
              show_type : this.showTypeSelected?this.showTypeSelected:'ALL',

              deviceid : this.deviceid,
              bank_break_id : this.bankSelected3?this.bankSelected3:0,
              bank_break_credit_check : (this.bank_break_credit_check?parseFloat(this.bank_break_credit_check):0.00),
              pin : this.pin,
              url : this.nodeurl,
              bank_break_enable : this.bankBreakSelected,
              deposit_decimal : this.bankDecimalSelected,
              statusActive : this.statusActive,
              parent: 0
          }
      
          // console.log(body);
      
          let response;
          await axios.post("api/adminbank/create",body,
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
        async transferMoney() {        
          //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

          console.log("transferMoney");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();
          
          var headers = {
              userid: userData.username,
              token: userData.token,
          }

          var body = {              
              
              id : this.pRowData.id,
              bank_id : this.bankSelected2,              
              bank_acc_no : this.bankTransferAccountNumber,
              amount : this.bankTransferAmount,
              pin : this.bankTransferPIN,              
          }
      
          // console.log(body);
      
          let response;
          await axios.post("api/adminbank/transferbankbyid",body,
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

              this.bankTransferAccountNumber = "";
              this.bankTransferAmount=0;
              this.bankTransferPIN="";

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
        getQRImageUrl(qrPath) {
          if (!qrPath) return '';
          // If it's already a full URL, return as is
          if (qrPath.startsWith('http')) return qrPath;
          // Get API URL from vue config
          const vueconfig = require('../../../../config/vue.config');
          const apiUrl = vueconfig.BASE_API_URL;
          return `${apiUrl}getfile/${qrPath}`;
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