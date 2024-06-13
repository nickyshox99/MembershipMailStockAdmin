<template>
  <b-card>
    <!-- form -->
    <b-form>
      <b-row>
       
        <!-- website -->
        <b-col md="12">
          <b-form-group
            label-for="mindeposit"
            label="Min Deposit"
          >
            <b-form-input
              id="mindeposit"
              v-model="localOptions.MinDeposit"
              placeholder="100"
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            label-for="credit1"
            label="Credit For Friend Level 1"
          >
            <b-form-input
              id="credit1"
              v-model="localOptions.Credit1"
              placeholder="1"
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            label-for="credit2"
            label="Credit For Friend Level 2"
          >
            <b-form-input
              id="credit2"
              v-model="localOptions.Credit2"
              placeholder="1"
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
            <b-form-group
              label="Type Credit"
              label-for="typecredit-selected"
            >
              <b-form-select v-model="turnSelected" :options="turnOptions"></b-form-select>
            </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            label-for="maximuncredit"
            label="Maximum (Only Type %)"
          >
            <b-form-input
              id="maximuncredit"
              v-model="localOptions.MaxCredit"
              placeholder="1"
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            label-for="minwithdraw"
            label="Min Credit Withdraw"
          >
            <b-form-input
              id="minwithdraw"
              v-model="localOptions.MinTransfer"
              placeholder="1"
            />
          </b-form-group>
        </b-col>

         <!--/ website -->        
         <b-col md="6">
          <b-form-group
            label-for="minwithdraw"
            label="Only First Deposit Transaction"
          >
          <b-form-checkbox
            id="accountSwitchFirstDepEnable"
            :checked="localOptions.OnlyFirstDep"
            v-model="localOptions.OnlyFirstDep"
            name="check-button"
            switch
            inline
          >
            <span>Only First Deposit</span>
          </b-form-checkbox>
        </b-form-group>
        </b-col>

        <!--/ website -->        
        <b-col md="12">
          <b-form-checkbox
            id="accountSwitchAffilateEnable"
            :checked="localOptions.enable"
            v-model="localOptions.enable"
            name="check-button"
            switch
            inline
          >
            <span>On</span>
          </b-form-checkbox>
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
    BFormSelect,
    vSelect,
    flatPickr,
    Cleave,
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
      turnOptions:[],
      turnSelected:'unit',
    }
  },
  created(){
    this.turnOptions = [
            { value: 'unit', text: 'unit' },        
            { value: 'percent', text: 'percent' },                  
        ];
    this.turnSelected = this.settingData.TypeCredit;
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
            else if (key.includes("OnlyFirstDep")) 
            {              
              tmp_localOptions[key] = value==true?1:0;
            }
          }

          tmp_localOptions['TypeCredit'] = this.turnSelected;
          
          var body = {              
              
              id : 'affiliate',
              value : tmp_localOptions,
          }
      
          // console.log(this.localOptions);
          // console.log(tmp_localOptions);
          // console.log(body);
      
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
