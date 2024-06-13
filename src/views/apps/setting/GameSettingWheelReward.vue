<template>
  <b-card>
    
    <b-form>

      <b-row>
        <b-col md="3">
          <b-form-group
            label-for="prizename1"
            label="Prize Name 1"
          >
            <b-form-input
              id="prizename1"
              v-model="localOptions.wheel_name_1"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_credit_1"
            label="Credit"
          >
            <b-form-input
              id="wheel_credit_1"
              v-model="localOptions.wheel_credit_1"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_percent_1"
            label="Percent"
          >
            <b-form-input
              id="wheel_percent_1"
              v-model="localOptions.wheel_percent_1"
              placeholder=""
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3">
          <b-form-group
            label-for="prizename2"
            label="Prize Name 2"
          >
            <b-form-input
              id="prizename2"
              v-model="localOptions.wheel_name_2"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_credit_2"
            label="Credit"
          >
            <b-form-input
              id="wheel_credit_2"
              v-model="localOptions.wheel_credit_2"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_percent_2"
            label="Percent"
          >
            <b-form-input
              id="wheel_percent_2"
              v-model="localOptions.wheel_percent_2"
              placeholder=""
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3">
          <b-form-group
            label-for="prizename3"
            label="Prize Name 3"
          >
            <b-form-input
              id="prizename3"
              v-model="localOptions.wheel_name_3"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_credit_3"
            label="Credit"
          >
            <b-form-input
              id="wheel_credit_3"
              v-model="localOptions.wheel_credit_3"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_percent_3"
            label="Percent"
          >
            <b-form-input
              id="wheel_percent_3"
              v-model="localOptions.wheel_percent_3"
              placeholder=""
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3">
          <b-form-group
            label-for="prizename4"
            label="Prize Name 4"
          >
            <b-form-input
              id="prizename4"
              v-model="localOptions.wheel_name_4"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_credit_4"
            label="Credit"
          >
            <b-form-input
              id="wheel_credit_4"
              v-model="localOptions.wheel_credit_4"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_percent_4"
            label="Percent"
          >
            <b-form-input
              id="wheel_percent_4"
              v-model="localOptions.wheel_percent_4"
              placeholder=""
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3">
          <b-form-group
            label-for="prizename5"
            label="Prize Name 5"
          >
            <b-form-input
              id="prizename5"
              v-model="localOptions.wheel_name_5"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_credit_5"
            label="Credit"
          >
            <b-form-input
              id="wheel_credit_5"
              v-model="localOptions.wheel_credit_5"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_percent_5"
            label="Percent"
          >
            <b-form-input
              id="wheel_percent_5"
              v-model="localOptions.wheel_percent_5"
              placeholder=""
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3">
          <b-form-group
            label-for="prizename6"
            label="Prize Name 6"
          >
            <b-form-input
              id="prizename6"
              v-model="localOptions.wheel_name_6"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_credit_6"
            label="Credit"
          >
            <b-form-input
              id="wheel_credit_6"
              v-model="localOptions.wheel_credit_6"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_percent_6"
            label="Percent"
          >
            <b-form-input
              id="wheel_percent_6"
              v-model="localOptions.wheel_percent_6"
              placeholder=""
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3">
          <b-form-group
            label-for="prizename7"
            label="Prize Name 7"
          >
            <b-form-input
              id="prizename7"
              v-model="localOptions.wheel_name_7"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_credit_7"
            label="Credit"
          >
            <b-form-input
              id="wheel_credit_7"
              v-model="localOptions.wheel_credit_7"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_percent_7"
            label="Percent"
          >
            <b-form-input
              id="wheel_percent_7"
              v-model="localOptions.wheel_percent_7"
              placeholder=""
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3">
          <b-form-group
            label-for="prizename8"
            label="Prize Name 8"
          >
            <b-form-input
              id="prizename8"
              v-model="localOptions.wheel_name_8"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_credit_8"
            label="Credit"
          >
            <b-form-input
              id="wheel_credit_8"
              v-model="localOptions.wheel_credit_8"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_percent_8"
            label="Percent"
          >
            <b-form-input
              id="wheel_percent_8"
              v-model="localOptions.wheel_percent_8"
              placeholder=""
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3">
          <b-form-group
            label-for="prizename9"
            label="Prize Name 9"
          >
            <b-form-input
              id="prizename9"
              v-model="localOptions.wheel_name_9"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_credit_9"
            label="Credit"
          >
            <b-form-input
              id="wheel_credit_9"
              v-model="localOptions.wheel_credit_9"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_percent_9"
            label="Percent"
          >
            <b-form-input
              id="wheel_percent_9"
              v-model="localOptions.wheel_percent_9"
              placeholder=""
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3">
          <b-form-group
            label-for="prizename10"
            label="Prize Name 10"
          >
            <b-form-input
              id="prizename10"
              v-model="localOptions.wheel_name_10"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_credit_10"
            label="Credit"
          >
            <b-form-input
              id="wheel_credit_10"
              v-model="localOptions.wheel_credit_10"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_percent_10"
            label="Percent"
          >
            <b-form-input
              id="wheel_percent_10"
              v-model="localOptions.wheel_percent_10"
              placeholder=""
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3">
          <b-form-group
            label-for="prizename11"
            label="Prize Name 11"
          >
            <b-form-input
              id="prizename11"
              v-model="localOptions.wheel_name_11"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_credit_11"
            label="Credit"
          >
            <b-form-input
              id="wheel_credit_11"
              v-model="localOptions.wheel_credit_11"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_percent_11"
            label="Percent"
          >
            <b-form-input
              id="wheel_percent_11"
              v-model="localOptions.wheel_percent_11"
              placeholder=""
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3">
          <b-form-group
            label-for="prizename12"
            label="Prize Name 12"
          >
            <b-form-input
              id="prizename12"
              v-model="localOptions.wheel_name_12"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_credit_12"
            label="Credit"
          >
            <b-form-input
              id="wheel_credit_12"
              v-model="localOptions.wheel_credit_12"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group
            label-for="wheel_percent_12"
            label="Percent"
          >
            <b-form-input
              id="wheel_percent_12"
              v-model="localOptions.wheel_percent_12"
              placeholder=""
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="4">
          <b-form-group
            label-for="multiple1"
            label="Multiple 1"
          >
            <b-form-input
              id="multiple1"
              v-model="localOptions.multiple_1"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="4">
          <b-form-group
            label-for="multiple_percent_1"
            label="Multiple Percent"
          >
            <b-form-input
              id="multiple_percent_1"
              v-model="localOptions.multiple_percent_1"
              placeholder=""
            />
          </b-form-group>
        </b-col>      
      </b-row>

      <b-row>
        <b-col md="4">
          <b-form-group
            label-for="multiple2"
            label="Multiple 2"
          >
            <b-form-input
              id="multiple2"
              v-model="localOptions.multiple_2"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="4">
          <b-form-group
            label-for="multiple_percent_2"
            label="Multiple Percent"
          >
            <b-form-input
              id="multiple_percent_2"
              v-model="localOptions.multiple_percent_2"
              placeholder=""
            />
          </b-form-group>
        </b-col>      
      </b-row>

      <b-row>
        <b-col md="4">
          <b-form-group
            label-for="multiple3"
            label="Multiple 3"
          >
            <b-form-input
              id="multiple3"
              v-model="localOptions.multiple_3"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="4">
          <b-form-group
            label-for="multiple_percent_3"
            label="Multiple Percent"
          >
            <b-form-input
              id="multiple_percent_3"
              v-model="localOptions.multiple_percent_3"
              placeholder=""
            />
          </b-form-group>
        </b-col>      
      </b-row>

      <b-row>
        <b-col md="4">
          <b-form-group
            label-for="multiple4"
            label="Multiple 4"
          >
            <b-form-input
              id="multiple4"
              v-model="localOptions.multiple_4"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <b-col md="4">
          <b-form-group
            label-for="multiple_percent_4"
            label="Multiple Percent"
          >
            <b-form-input
              id="multiple_percent_4"
              v-model="localOptions.multiple_percent_4"
              placeholder=""
            />
          </b-form-group>
        </b-col>      
      </b-row>

      <b-row>        
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
              
              id : 'wheel',
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
