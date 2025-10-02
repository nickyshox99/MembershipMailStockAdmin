<template>
    <b-card>

        <b-form>
            <b-row>


                <!-- <b-col md="6">
          <b-form-group label-for="register" label="Register Token">
            <b-form-input id="register" v-model="localOptions.Register" placeholder="" readonly/>
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label-for="deposit" label="Deposit Token">
            <b-form-input id="deposit" v-model="localOptions.Deposit" placeholder="" readonly/>
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label-for="withdraw" label="Withdraw" readonly>
            <b-form-input id="withdraw" v-model="localOptions.Withdraw" placeholder="" readonly/>
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label-for="login" label="Login">
            <b-form-input id="login" v-model="localOptions.Login" placeholder="" readonly/>
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label-for="cronday" label="Cron Daily">
            <b-form-input id="cronday" v-model="localOptions.Cron_day" placeholder="" readonly/>
          </b-form-group>
        </b-col> -->

                <b-col md="6">
                    <b-form-group label-for="setneardate" label="Near Expire Days">
                        <b-form-input id="setneardate" v-model="localOptions.SetNearDate" type="number"
                            placeholder="3" />
                    </b-form-group>
                </b-col>

                <b-col md="6">
                    <b-form-group label="Approval Step">
                        <b-form-checkbox v-model="localOptions.enableSkipApproval">
                            Skip approval step
                        </b-form-checkbox>
                    </b-form-group>
                </b-col>

                <b-col md="6">
                    <b-form-group label="Auto message on expired">
                        <b-form-checkbox v-model="localOptions.enableAutoExpireMessage">
                            Send auto message
                        </b-form-checkbox>

                        <b-form-input v-if="localOptions.enableAutoExpireMessage"
                            v-model="localOptions.expireMessageRepeat" type="number"
                            placeholder="จำนวนครั้งที่จะส่ง เช่น 3" class="mt-1" />
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
    // data() {
    //     return {
    //         // localOptions: JSON.parse(JSON.stringify(this.settingData)),
    //         localOptions:{
    //             ...JSON.parse(JSON.stringify(this.settingData)),
    //             enableSkipApproval: this.settingData.enableSkipApproval ?? false,
    //         }
    //     }
    // },
    data() {
        const base = JSON.parse(JSON.stringify(this.settingData || {}))
        return {
            localOptions: {
                ...base,
                SetNearDate: Number.isFinite(+base.SetNearDate) ? +base.SetNearDate : 3,
                enableSkipApproval: !!base.enableSkipApproval,
                enableAutoExpireMessage: !!base.enableAutoExpireMessage,
                expireMessageRepeat: Number.isFinite(+base.expireMessageRepeat) ? +base.expireMessageRepeat : 1,
                // ถ้ามี field อื่น ๆ ใน setting ก็ spread มาด้วย
            },
        }
    },
    watch: {
        // ถ้า parent อัปเดต settingData ให้ child sync ตาม
        settingData: {
            immediate: false,
            deep: true,
            handler(val) {
                const v = val || {}
                this.localOptions = {
                    ...this.localOptions,     // คงค่าเดิมถ้าไม่มีใน prop
                    ...JSON.parse(JSON.stringify(v)),
                    SetNearDate: Number.isFinite(+v.SetNearDate) ? +v.SetNearDate : (this.localOptions.SetNearDate ?? 3),
                    enableSkipApproval: !!v.enableSkipApproval,
                    enableAutoExpireMessage: !!v.enableAutoExpireMessage,
                    expireMessageRepeat: Number.isFinite(+v.expireMessageRepeat) ? +v.expireMessageRepeat : (this.localOptions.expireMessageRepeat ?? 1),
                }
            }
        }
    },
    created() {
    },
    methods: {
        resetForm() {
            const v = JSON.parse(JSON.stringify(this.settingData || {}))
            this.localOptions = {
                ...v,
                SetNearDate: Number.isFinite(+v.SetNearDate) ? +v.SetNearDate : 3,
                enableSkipApproval: !!v.enableSkipApproval,
                enableAutoExpireMessage: !!v.enableAutoExpireMessage,
                expireMessageRepeat: Number.isFinite(+v.expireMessageRepeat) ? +v.expireMessageRepeat : 1,
            }
        },
        // async updateSetting() {
        //     //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

        //     console.log("updateSetting");

        //     const userData = JSON.parse(localStorage.getItem('userData'));
        //     const formData = new FormData();

        //     var headers = {
        //         userid: userData.username,
        //         token: userData.token,
        //     }

        //     let tmp_localOptions = JSON.parse(JSON.stringify(this.localOptions));
        //     for (const [key, value] of Object.entries(tmp_localOptions)) {
        //         if (key.includes("enable")) {
        //             tmp_localOptions[key] = value == true ? 1 : 0;
        //         }
        //     }


        //     var body = {

        //         id: 'line_token',
        //         value: tmp_localOptions,
        //     }


        //     let response;
        //     await axios.post("api/adminsetting/updateadminsettingbyid", body,
        //         {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'userid': headers.userid,
        //                 'token': headers.token,

        //             }
        //         }).then(
        //             resp => {
        //                 response = resp;
        //             }
        //         );

        //     // console.log(response);
        //     if (response.data.status == "success") {
        //         //

        //         this.$toast({
        //             component: ToastificationContent,
        //             position: 'top-right',
        //             props: {
        //                 title: `Update`,
        //                 icon: 'EditIcon',
        //                 variant: 'success',
        //                 text: `Update Succesful.`,
        //             },
        //             autoHideDelay: 3000,
        //         });



        //     }
        //     else {
        //         this.$toast({
        //             component: ToastificationContent,
        //             position: 'top-right',
        //             props: {
        //                 title: `Update`,
        //                 icon: 'TrashIcon',
        //                 variant: 'danger',
        //                 text: `Update UnSuccesful ${response.data.message}`,
        //             },
        //             autoHideDelay: 3000,
        //         });

        //     }

        // },
        async updateSetting() {
            // ✅ validate ก่อน
            const errs = []
            if (!Number.isFinite(+this.localOptions.SetNearDate) || +this.localOptions.SetNearDate < 0) {
                errs.push('Near Expire Days ต้องเป็นตัวเลข ≥ 0')
            }
            if (this.localOptions.enableAutoExpireMessage) {
                if (!Number.isInteger(+this.localOptions.expireMessageRepeat) || +this.localOptions.expireMessageRepeat < 1) {
                    errs.push('จำนวนครั้งข้อความอัตโนมัติ ต้องเป็นจำนวนเต็ม ≥ 1')
                }
            }
            if (errs.length) {
                this.$toast({
                    component: ToastificationContent,
                    props: { title: 'Validation', icon: 'AlertTriangleIcon', variant: 'warning', text: errs.join('\n') },
                })
                return
            }

            // ✅ normalize ค่าที่จะส่งขึ้น backend
            const tmp = JSON.parse(JSON.stringify(this.localOptions))
            tmp.SetNearDate = +tmp.SetNearDate
            if (tmp.enableAutoExpireMessage) tmp.expireMessageRepeat = +tmp.expireMessageRepeat

            for (const [k, v] of Object.entries(tmp)) {
                if (k.toLowerCase().includes('enable')) tmp[k] = v === true ? 1 : 0
            }

            const userData = JSON.parse(localStorage.getItem('userData')) || {}
            const headers = { userid: userData.username, token: userData.token }

            const body = {
                id: 'line_token',      // ✔ ต้องตรงกับ meta ที่ฝั่งโหลด
                value: tmp,
            }

            let response
            await axios.post('api/adminsetting/updateadminsettingbyid', body, {
                headers: { 'Content-Type': 'application/json', userid: headers.userid, token: headers.token }
            }).then(r => (response = r))

            if (response?.data?.status === 'success') {
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: { title: 'Update', icon: 'CheckIcon', variant: 'success', text: 'Update Successful.' },
                    autoHideDelay: 3000,
                })
            } else {
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: { title: 'Update', icon: 'TrashIcon', variant: 'danger', text: `Update Unsuccessful ${response?.data?.message || ''}` },
                    autoHideDelay: 3000,
                })
            }
        },
    },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
