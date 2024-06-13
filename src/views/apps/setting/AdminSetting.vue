<template>
<b-tabs vertical content-class="col-12 col-md-9 mt-1 mt-md-0" pills nav-wrapper-class="col-md-3 col-12" nav-class="nav-left">

    
    
    
    <b-tab active>
        <template #title>
            <feather-icon icon="SettingsIcon" size="18" class="mr-50" />
            <span class="font-weight-bold">Close Web Site</span>
        </template>

        <admin-setting-website v-if="settingdata.website_online_setting" :setting-data="settingdata.website_online_setting" />
    </b-tab>

    <b-tab>
        <template #title>
            <feather-icon icon="InfoIcon" size="18" class="mr-50" />
            <span class="font-weight-bold">Notice Backend</span>
        </template>
        <admin-setting-noticebackend v-if="settingdata.notice_backend" :setting-data="settingdata.notice_backend" />
    </b-tab>

    <b-tab>
        <template #title>
            <feather-icon icon="PlayIcon" size="18" class="mr-50" />
            <span class="font-weight-bold">Game Playing</span>
        </template>
        <admin-setting-game-playing v-if="settingdata.game_setting" :setting-data="settingdata.game_setting" />
    </b-tab>

    <b-tab>
        <template #title>
            <feather-icon icon="PlayIcon" size="18" class="mr-50" />
            <span class="font-weight-bold">Deposit Before Play</span>
        </template>
        <admin-setting-deposit-in-game v-if="settingdata.deposit_ingame" :setting-data="settingdata.deposit_ingame" />
    </b-tab>

    <b-tab>

        <template #title>
            <feather-icon icon="CreditCardIcon" size="18" class="mr-50" />
            <span class="font-weight-bold">Withdraw</span>
        </template>

        <admin-setting-withdraw v-if="settingdata.withdraw_setting" :setting-data="settingdata.withdraw_setting" />
    </b-tab>

    <b-tab>

        <template #title>
            <feather-icon icon="CreditCardIcon" size="18" class="mr-50" />
            <span class="font-weight-bold">Deposit</span>
        </template>

        <admin-setting-deposit v-if="settingdata.deposit_setting" :setting-data="settingdata.deposit_setting" />
    </b-tab>

    <b-tab>
        <template #title>
            <feather-icon icon="CreditCardIcon" size="18" class="mr-50" />
            <span class="font-weight-bold">OTP Setting</span>
        </template>

        <admin-setting-otp-register v-if="settingdata.otp_register" :setting-data="settingdata.otp_register" />
    </b-tab>

    <b-tab>
        <template #title>
            <feather-icon icon="CreditCardIcon" size="18" class="mr-50" />
            <span class="font-weight-bold">Commision</span>
        </template>

        <admin-setting-commision v-if="settingdata.refund" :setting-data="settingdata.refund" />
    </b-tab>

    <b-tab>
        <template #title>
            <feather-icon icon="CreditCardIcon" size="18" class="mr-50" />
            <span class="font-weight-bold">Chat</span>
        </template>

        <admin-setting-chat v-if="settingdata.chat" :setting-data="settingdata.chat" />
    </b-tab>

    <b-tab>
        <template #title>
            <feather-icon icon="CreditCardIcon" size="18" class="mr-50" />
            <span class="font-weight-bold">Register</span>
        </template>

        <admin-setting-register v-if="settingdata.register" :setting-data="settingdata.register" />
    </b-tab>

    <b-tab>
        <template #title>
            <feather-icon icon="CreditCardIcon" size="18" class="mr-50" />
            <span class="font-weight-bold">Code Free</span>
        </template>

        <admin-setting-code-free v-if="settingdata.code_free" :setting-data="settingdata.code_free" />
    </b-tab>

    <b-tab>
        <template #title>
            <feather-icon icon="CreditCardIcon" size="18" class="mr-50" />
            <span class="font-weight-bold">Line Login</span>
        </template>

        <admin-setting-linelogin v-if="settingdata.line_login" :setting-data="settingdata.line_login" />
    </b-tab>

</b-tabs>
</template>

<script>
import {
    BTabs,
    BTab
} from 'bootstrap-vue'
// import AdminSettingGeneral from './AdminSettingGeneral.vue'
// import AdminSettingPassword from './AdminSettingPassword.vue'
// import AdminSettingInformation from './AdminSettingInformation.vue'
// import AdminSettingSocial from './AdminSettingSocial.vue'
// import AdminSettingNotification from './AdminSettingNotification.vue'

import AdminSettingWebsite from './AdminSettingWebsite.vue'
import AdminSettingNoticebackend from './AdminSettingNoticebackend.vue'
import AdminSettingGamePlaying from './AdminSettingGamePlaying.vue'
import AdminSettingDepositInGame from './AdminSettingDepositInGame.vue'
import AdminSettingWithdraw from './AdminSettingWithdraw.vue'
import AdminSettingDeposit from './AdminSettingDeposit.vue'
import AdminSettingOtpRegister from './AdminSettingOtpRegister.vue'
import AdminSettingCommision from './AdminSettingCommision.vue'
import AdminSettingChat from './AdminSettingChat.vue'
import AdminSettingRegister from './AdminSettingRegister.vue'
import AdminSettingCodeFree from './AdminSettingCodeFree.vue'
import AdminSettingLinelogin from './AdminSettingLinelogin.vue'



import axios from "axios";

export default {
    components: {
        BTabs,
        BTab,
        // AdminSettingGeneral,
        // AdminSettingPassword,
        // AdminSettingInformation,
        // AdminSettingSocial,
        // AdminSettingNotification,
        AdminSettingWebsite,
        AdminSettingNoticebackend,
        AdminSettingGamePlaying,
        AdminSettingDepositInGame,
        AdminSettingWithdraw,
        AdminSettingDeposit,
        AdminSettingOtpRegister,
        AdminSettingCommision,
        AdminSettingChat,
        AdminSettingRegister,
        AdminSettingCodeFree,
        AdminSettingLinelogin,
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
        
        console.log(tmpSettingData);
        this.settingdata = tmpSettingData;

    },
    methods: {

    },
}
</script>
