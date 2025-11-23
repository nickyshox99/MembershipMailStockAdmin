<template>
    <b-tabs vertical content-class="col-12 col-md-9 mt-1 mt-md-0" pills nav-wrapper-class="col-md-3 col-12"
        nav-class="nav-left">


        <b-tab>
            <template #title>
                <feather-icon icon="SettingsIcon" size="18" class="mr-50" />
                <span class="font-weight-bold">ตั้งค่าร้าน</span>
            </template>

            <line-setting-expire v-if="settingdata.line_token" :setting-data="settingdata.line_token"
                :readOnlyControl="settingTokenReadonly" />
        </b-tab>

        <b-tab>
            <template #title>
                <feather-icon icon="CreditCardIcon" size="18" class="mr-50" />
                <span class="font-weight-bold">ประเภทการชำระเงิน</span>
            </template>

            <payment-type-setting :readOnlyControl="settingTokenReadonly" />
        </b-tab>

        <b-tab>
            <template #title>
                <feather-icon icon="CreditCardIcon" size="18" class="mr-50" />
                <span class="font-weight-bold">ข้อความตอบกลับในระบบ</span>
            </template>

            <line-setting-message v-if="settingdata.line_message" :setting-data="settingdata.line_message"
                :readOnlyControl="settingTokenReadonly" />
        </b-tab>
        

        <!-- <b-tab>
        <template #title>
            <feather-icon icon="SettingsIcon" size="18" class="mr-50" />
            <span class="font-weight-bold">Deposit Line Message</span>
        </template>
        <line-setting-deposit-format v-if="settingdata.depositmessage" :setting-data="settingdata.depositmessage" />
    </b-tab>

    <b-tab>
        <template #title>
            <feather-icon icon="SettingsIcon" size="18" class="mr-50" />
            <span class="font-weight-bold">Withdraw Line Message</span>
        </template>
        <line-setting-withdraw-format v-if="settingdata.withdrawmessage" :setting-data="settingdata.withdrawmessage" />
    </b-tab> -->



    </b-tabs>
</template>

<script>
import {
    BTabs,
    BTab
} from 'bootstrap-vue'

import LineSettingToken from './LineSettingToken.vue'
import LineSettingDepositFormat from './LineSettingDepositFormat.vue'
import LineSettingWithdrawFormat from './LineSettingWithdrawFormat.vue'
import LineSettingExpire from './LineSettingExpire.vue'
import PaymentTypeSetting from './PaymentTypeSetting.vue'
import LineSettingMessage from './LineSettingMessage.vue'

import axios from "axios";
import { mapActions } from "vuex";

export default {
    components: {
        BTabs,
        BTab,
        LineSettingToken,
        LineSettingDepositFormat,
        LineSettingWithdrawFormat,
        LineSettingExpire,
        PaymentTypeSetting,
        LineSettingMessage
    },
    data() {
        return {
            options: {},
            settingdata: {},
            pagePermission: [],
            settingTokenReadonly: false,
            
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
                else {
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
