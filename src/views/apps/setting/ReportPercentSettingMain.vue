<template>
<b-tabs vertical content-class="col-12 col-md-9 mt-1 mt-md-0" pills nav-wrapper-class="col-md-3 col-12" nav-class="nav-left">

    <b-tab active>
        <template #title>
            <feather-icon icon="SettingsIcon" size="18" class="mr-50" />
            <span class="font-weight-bold">{{ t('Setting % Report') }}</span>
        </template>

        <report-percent-setting v-if="settingdata.report_percent_setting" :setting-data="settingdata.report_percent_setting" 
        :readOnlyControl="settingTokenReadonly" />
    </b-tab>

    

</b-tabs>
</template>

<script>
import {
    BTabs,
    BTab
} from 'bootstrap-vue'

import ReportPercentSetting from './ReportPercentSetting.vue'

import axios from "axios";
import { mapActions } from "vuex";

import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
    components: {
        BTabs,
        BTab,        
        ReportPercentSetting,    
    },
    setup() {
        const { t } = useI18nUtils();

        return {
        t,
        }
    },
    data() {
        return {
            options: {},
            settingdata: {},
            pagePermission:[],
            settingTokenReadonly:false,
        }
    },
    async created() {                
        await this.getPagePermission();
    },
    async beforeCreate() {
        

        const userData = JSON.parse(localStorage.getItem('userData'));
        const formData = new FormData();

        var headers = {
            userid: userData.username,
            token: userData.token,
        }

        var body = {
            userid: userData.username,
            token: userData.token,
        }

        let response;
        await axios.get("api/adminsetting/getadminsetting", {
            headers: {
                'Content-Type': 'application/json',
                'userid': headers.userid,
                'token': headers.token,
            }
        }).then(
            resp => {
                response = resp.data.data;
            }
        );

        let tmpSettingData = {};

        for (let index = 0; index < response.length; index++) {
            const element = response[index];
            let meta_name = element.meta;
            let meta_data = JSON.parse(element.value);
            for (const [key, value] of Object.entries(meta_data)) {
                if (key.includes("enable")) {
                    meta_data[key] = value == 1 ? true : false;
                }
            }
            tmpSettingData[meta_name] = meta_data;
        }
        
        this.settingdata = tmpSettingData;

    },
    methods: {
        ...mapActions(["GetPagePermission"]),
        async getPagePermission() {
      console.log('getPagePermission');

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      formData.append("userid", userData.username);
      formData.append("token", userData.token);
      
      formData.append("admin_id", userData.username);
      const currentRouteName = this.$route.name;
      formData.append("page_name", currentRouteName);      

      const response = await this.GetPagePermission(formData);
      if (response.data.status == 'success') {  
        // console.log(response.data.data);
        this.pagePermission = response.data.data;
        if (this.pagePermission.canEdit) {
            this.settingTokenReadonly = false;
        }
        else
        {
            this.settingTokenReadonly = true;
        }
      }
      else {
        this.$toast(
          {
            component: ToastificationContent,
            props: {
              title: response.data.message,
              icon: 'EditIcon',
              variant: 'error',
            },
          });
      }

    },
    },
}
</script>
