<template>
  <b-card>
    <!-- form -->
    <b-form>
      <b-row>
        
        <b-col md="12">
            <b-form-group
              label="Promotion"
              label-for="promotion-selected"
            >
              <b-form-select v-model="promotionSelected" :options="promotionOptions"></b-form-select>
            </b-form-group>
        </b-col>

        <b-col md="12">
          <b-form-checkbox
            id="accountSwitchCodeFreeEnable"
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
import { mapActions } from "vuex";

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
      promotionOptions:[],
      promotionSelected:0,
    }
  },  
  async created()
  {
     await this.getPromotion();
     this.promotionSelected = this.settingData.promotion_id;
  },
  methods: {
    ...mapActions(["GetPromotion"]),
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

          tmp_localOptions['promotion_id'] = this.promotionSelected;
          
          var body = {
              id : 'code_free',
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
    async getPromotion()
    {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      formData.append("userid", userData.username);
      formData.append("token", userData.token);

      formData.append("searchWord", "");
      formData.append("pageLength", 1);

      const response = await this.GetPromotion(formData);
      if (response.data.status == 'success') 
      {         
        const promotionRows = response.data.data;
        let tmpArray = [];        
        promotionRows.forEach(element => {
                    tmpArray.push({value : element.id ,text: element.Title+' : '+element.promotion_type+' '+element.note_pro });
                });
        this.promotionOptions = tmpArray;
        this.promotionSelected = promotionRows[0].id?promotionRows[0].id:1;
      }
      else
      {

      }
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
