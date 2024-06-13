<template>
  <b-card>
    
    <b-form>
      <b-row>
        <b-col md="12">
          <b-form-group
            label-for="reviewDepositMessage"
            label="Review Deposit Message"
          >          
            <b-form-textarea
              id="textarea"
              v-model="reviewDepositMessage"
              placeholder=""
              rows="10"
              max-rows="15"      
              readonly
            ></b-form-textarea>
          </b-form-group>
        </b-col>

        
      </b-row>

      <b-row>
        <b-col md="12">
          <b-form-group
            label-for="deptextsimulate"
            label="Format Text"
          >            
            <b-form-textarea
              id="deptextsimulate"
              v-model="localOptions.dep_textsimulate"
              placeholder=""
              rows="10"
              max-rows="15"
              v-on:input="updateReviewMessage" 
            ></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
      
      <b-row>
        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="outline-info"
            class="mt-1 mr-1"
            size="sm"
            @click="insertTag('<@userid>')"
          >
            User สมาชิก
          </b-button>

          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="outline-info"
            class="mt-1 mr-1"
            size="sm"
            @click="insertTag('<@fullname>')"
          >
          ชื่อ-สกุล
          </b-button>

          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="outline-info"
            class="mt-1 mr-1"
            size="sm"
            @click="insertTag('<@telno>')"
          >
          เบอร์
          </b-button>

          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="outline-info"
            class="mt-1 mr-1"
            size="sm"
            @click="insertTag('<@bankaccno>')"
          >
          เลขบัญชี
          </b-button>

          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="outline-info"
            class="mt-1 mr-1"
            size="sm"
            @click="insertTag('<@bankname>')"
          >
          ธนาคาร
          </b-button>

          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="outline-info"
            class="mt-1 mr-1"
            size="sm"
            @click="insertTag('<@amount>')"
          >
          ยอดเงิน
          </b-button>

          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="outline-info"
            class="mt-1 mr-1"
            size="sm"
            @click="insertTag('<@date>')"
          >
          วันที่เวลา
          </b-button>

          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="outline-info"
            class="mt-1 mr-1"
            size="sm"
            @click="insertTag('<@approveby>')"
          >
          ผู้ทำรายการ
          </b-button>


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
      reviewDepositMessage : '',    
    }
  },  
  created(){
    this.reviewDepositMessage = "";
    this.updateReviewMessage();
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
              
              id : 'depositmessage',
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
    async updateReviewMessage()
    {
      let tmpMsgReplace = {
        "<@fullname>" : "Panya Chokdee",
        "<@userid>" : "user00001",
        "<@bankname>" : "ไทยพาณิชย์",
        "<@bankaccno>" : "1242019999",
        "<@amount>" : "1000.00",
        "<@date>" : "2022-08-05 16:36",
        "<@approveby>" : "SuperStaff",
        "<@telno>" : "0988881234",
      }

      let tmpMsg = this.localOptions['dep_textsimulate'];
      for (const [key, value] of Object.entries(tmpMsgReplace)) 
      {
        tmpMsg = tmpMsg.replaceAll(key,value);
      }
      this.reviewDepositMessage = tmpMsg;

    }    ,
    insertTag(tagname)
    {
      this.localOptions['dep_textsimulate'] += tagname;
      this.updateReviewMessage();
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
