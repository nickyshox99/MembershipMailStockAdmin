<template>
<uxui-setting-brand v-if="settingdata.brand_setting" :setting-data="settingdata.brand_setting" />
</template>

<script>
import {
    BTabs,
    BTab
} from 'bootstrap-vue'

import UxuiSettingBrand from './UxuiSettingBrand.vue'


import axios from "axios";

export default {
    components: {
        BTabs,
        BTab,        
        UxuiSettingBrand,    
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
            }
            tmpSettingData[meta_name] = meta_data;
        }
        
        this.settingdata = tmpSettingData;

    },
    methods: {

    },
}
</script>
