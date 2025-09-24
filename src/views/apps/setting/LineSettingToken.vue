<template>
  <b-card>

    <b-form>
      <b-row>


        <b-col md="6">
          <b-form-group label-for="register" label="Register Token">
            <b-form-input id="register" v-model="localOptions.Register" placeholder="" />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label-for="deposit" label="Deposit Token">
            <b-form-input id="deposit" v-model="localOptions.Deposit" placeholder="" />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label-for="withdraw" label="Withdraw">
            <b-form-input id="withdraw" v-model="localOptions.Withdraw" placeholder="" />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label-for="login" label="Login">
            <b-form-input id="login" v-model="localOptions.Login" placeholder="" />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label-for="cronday" label="Cron Daily">
            <b-form-input id="cronday" v-model="localOptions.Cron_day" placeholder="" />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label-for="setneardate" label="Near Expire 1 - 7 (days) ">
            <b-form-input id="setneardate" v-model="localOptions.SetNearDate" type="number" min="1" max="7"
              placeholder="3" />
          </b-form-group>
        </b-col>



        <b-col cols="12">
          <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mt-1 mr-1"
            @click="updateSetting" :disabled="readOnlyControl">
            Save changes
          </b-button>

        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard, BFormTextarea, BFormCheckbox, BFormSelect
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
      default: () => { },
    },
    readOnlyControl: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      localOptions: JSON.parse(JSON.stringify(this.settingData)),
    }
  },
  created() {
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
      for (const [key, value] of Object.entries(tmp_localOptions)) {
        if (key.includes("enable")) {
          tmp_localOptions[key] = value == true ? 1 : 0;
        }
      }


      var body = {

        id: 'line_token',
        value: tmp_localOptions,
      }


      let response;
      await axios.post("api/adminsetting/updateadminsettingbyid", body,
        {
          headers: {
            'Content-Type': 'application/json',
            'userid': headers.userid,
            'token': headers.token,

          }
        }).then(
          resp => {
            response = resp;
          }
        );

      // console.log(response);
      if (response.data.status == "success") {
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
      else {
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
