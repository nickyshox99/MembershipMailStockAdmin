<template>
<b-tabs vertical content-class="col-12 col-md-9 mt-1 mt-md-0" pills nav-wrapper-class="col-md-3 col-12" nav-class="nav-left">

    
   
    
    <b-tab active>
        <template #title>
            <feather-icon icon="SettingsIcon" size="18" class="mr-50" />
            <span class="font-weight-bold">Recommend Friend Deposit Setting</span>
        </template>

        <affilate-setting v-if="settingdata.affiliate" :setting-data="settingdata.affiliate" />
    </b-tab>

    <b-tab>
        <template #title>
            <feather-icon icon="SettingsIcon" size="18" class="mr-50" />
            <span class="font-weight-bold">Recommend Friend Bet Setting</span>
        </template>
        <affilate-bet-setting v-if="settingdata.affiliate_bet" :setting-data="settingdata.affiliate_bet" />
    </b-tab>

   

</b-tabs>
</template>

<script>
import {
    BTabs,
    BTab
} from 'bootstrap-vue'

import AffilateSetting from './AffilateSetting.vue'
import AffilateBetSetting from './AffilateBetSetting.vue'




import axios from "axios";

export default {
    components: {
        BTabs,
        BTab,
        AffilateSetting,
        AffilateBetSetting,      
    },
    data() {
        return {
            options: {},
            settingdata: {},
        }
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
                else if(key.includes("OnlyFirstDep")) {
                    meta_data[key] = value == 1 ? true : false;
                }
                
            }
            tmpSettingData[meta_name] = meta_data;
        }
        
        this.settingdata = tmpSettingData;

    },
    methods: {

    },
}
</script>
