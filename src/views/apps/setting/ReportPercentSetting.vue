<template>
  <b-card>
    
    <b-form>
      <b-row>
        
        <b-col md="4">
          <b-form-group
            label-for="percent_all_0"
            :label="t('% Keep From All Loan')"
          >
            <b-form-input
              id="percent_all_0"
              v-model="localOptions.percent_all_0"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="4">
          <b-form-group
            label-for="percent_all_1"
            :label="t('% Share1 From All Loan')"
          >
            <b-form-input
              id="deposit"
              v-model="localOptions.percent_all_1"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="4">
          <b-form-group
            label-for="percent_all_2"
            :label="t('% Share2 From All Loan')"
          >
            <b-form-input
              id="percent_all_2"
              v-model="localOptions.percent_all_2"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="12">
          <hr/>
        </b-col>

        <b-col md="4">
          <b-form-group
            label-for="percent_paid_1"
            :label="t('% Keep From Paid')"
          >
            <b-form-input
              id="percent_paid_1"
              v-model="localOptions.percent_paid_1"
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
            :disabled="readOnlyControl"
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

import { useUtils as useI18nUtils } from '@core/libs/i18n'

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
    readOnlyControl:{
        type: Boolean,
        required: true,
    }
  },
  setup() {
        const { t } = useI18nUtils();

        return {
        t,
        }
    },
  data() {
    return {            
      localOptions: JSON.parse(JSON.stringify(this.settingData)),           
    }
  },
  created(){
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
              
              id : 'report_percent_setting',
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
