<template>
  <b-card>
    
    <b-form>
      <b-row>
       
        
        <b-col md="6">
          <b-form-group
            label-for="getTicketEveryDeposit"
            label="Deposit Amount Per Ticket"
          >
            <b-form-input
              id="getTicketEveryDeposit"
              v-model="localOptions.credit_collect"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            label-for="max_collect"
            label="Max Ticket/All User/Day"
          >
            <b-form-input
              id="max_collect"
              v-model="localOptions.max_collect"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            label-for="max_user_collect"
            label="Max Ticket/User/Day"
          >
            <b-form-input
              id="max_user_collect"
              v-model="localOptions.max_user_collect"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            label-for="credit_use"
            label="Use Credit/Ticket"
          >
            <b-form-input
              id="credit_use"
              v-model="localOptions.credit_use"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            label-for="turn_name"
            label="Turn Name"
          >
            <b-form-input
              id="turn_name"
              v-model="localOptions.turn_name"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            label-for="turn"
            label="Turn (x credit) "
          >
            <b-form-input
              id="turn"
              v-model="localOptions.turn"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
            <b-form-group
              label="Turn Calculate Type"
              label-for="turn-cal-type"
            >
            <b-form-select v-model="turnTypeWithdrawSelected" 
              :options="turnTypeWithdrawOptions"></b-form-select>
            </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            label-for="winloss"
            label="Winloss for withdraw"
          >
            <b-form-input
              id="winloss"
              v-model="localOptions.winloss"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            label-for="note"
            label="Note"
          >
            <b-form-input
              id="note"
              v-model="localOptions.note"
              placeholder=""
            />
          </b-form-group>
        </b-col>
        
        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-1 mr-1"
            @click="updateSetting"
          >
            Save changes
          </b-button>
      
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard, BFormTextarea,BFormCheckbox,BFormSelect
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import Ripple from 'vue-ripple-directive'
import Cleave from 'vue-cleave-component'
import axios from "axios";

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.us'

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BFormTextarea,
    BFormCheckbox,
    vSelect,
    flatPickr,
    Cleave,
    BFormSelect,
  },
  directives: {
    Ripple,
  },
  props: {
    settingData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {            
      localOptions: JSON.parse(JSON.stringify(this.settingData)),        
      turnTypeWithdrawSelected:"",
      turnTypeWithdrawOptions : [
        { value: null, text: 'Select Turn Calculate Type' },
      ],       
    }
  },
  created(){    
    this.turnTypeWithdrawOptions = [
        { value: 'turnover', text: 'turnover' },        
        { value: 'credit', text: 'credit' },            
    ];
    this.turnTypeWithdrawSelected = this.localOptions.TurnTypeWithdraw;
  },
  methods: {
    resetForm() {
      this.localOptions = JSON.parse(JSON.stringify(this.settingData))      
    },
    async updateSetting() {        
          //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

          console.log("updateSetting");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();
          
          var headers = {
              userid: userData.username,
              token: userData.token,
          }
          
          let tmp_localOptions = JSON.parse(JSON.stringify(this.localOptions));
          for (const [key, value] of Object.entries(tmp_localOptions)) 
          {
            if (key.includes("enable")) 
            {              
              tmp_localOptions[key] = value==true?1:0;
            }
          }
          
          var body = {              
              id : 'wheel_setting',
              value : tmp_localOptions,
          }
                
      
          let response;
          await axios.post("api/adminsetting/updateadminsettingbyid",body,
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
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
