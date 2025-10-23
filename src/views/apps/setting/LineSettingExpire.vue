<template>
    <b-card>

        <b-form>
            <b-row>


                <b-col md="6">
                    <b-form-group label-for="setneardate" label="จำนวนวันใกล้หมดอายุ">
                        <b-form-input id="setneardate" v-model="localOptions.SetNearDate" type="number"
                            placeholder="3" />
                        <small class="text-muted d-block mt-1">
                            ระบุจำนวนวันที่จะแจ้งเตือนก่อนหมดอายุ (เช่น 3 = แจ้งเตือนเมื่อเหลือ 3 วัน)
                        </small>
                    </b-form-group>
                </b-col>

                <b-col md="6">
                    <b-form-group label="การแจ้งเตือนใกล้หมดอายุ">
                        <b-form-checkbox v-model="localOptions.enableExpireOnlyOnce">
                            ส่งแจ้งเตือนครั้งเดียว
                        </b-form-checkbox>
                        <small class="text-muted d-block mt-1">
                            {{ localOptions.enableExpireOnlyOnce ? 
                                'ส่งแจ้งเตือนครั้งเดียวเมื่อถึงวันที่กำหนด' : 
                                'ส่งแจ้งเตือนทุกวันจนกว่าจะหมดอายุ' 
                            }}
                        </small>
                    </b-form-group>
                </b-col>

                <!-- <b-col md="6">
                    <b-form-group label="ขั้นตอนการอนุมัติ">
                        <b-form-checkbox v-model="localOptions.enableSkipApproval">
                            ข้ามขั้นตอนการอนุมัติ
                        </b-form-checkbox>
                        <small class="text-muted d-block mt-1">
                            {{ localOptions.enableSkipApproval ? 
                                'อนุมัติอัตโนมัติทันที' : 
                                'ต้องรอการอนุมัติจากแอดมิน' 
                            }}
                        </small>
                    </b-form-group>
                </b-col> -->

                <b-col md="6">
                    <b-form-group label="การแจ้งเตือนเมื่อหมดอายุ">
                        <b-form-checkbox v-model="localOptions.enableAutoExpireMessage">
                            ส่งข้อความอัตโนมัติเมื่อหมดอายุ
                        </b-form-checkbox>

                        <b-form-input v-if="localOptions.enableAutoExpireMessage"
                            v-model="localOptions.expireMessageRepeat" type="number"
                            placeholder="จำนวนครั้งที่จะส่ง เช่น 2" class="mt-1" />
                        <small v-if="localOptions.enableAutoExpireMessage" class="text-muted d-block mt-1">
                            จำนวนครั้งที่จะส่งข้อความหลังจากหมดอายุ (เช่น 2 = ส่งในวันหมดอายุ + วันถัดไป)
                        </small>
                    </b-form-group>
                </b-col>

                <b-col md="6">
                    <b-form-group label="ระบบ QR Code">
                        <b-form-checkbox v-model="localOptions.enableAutoGenerateQR">
                            ใช้ระบบสร้าง QR Code อัตโนมัติ
                        </b-form-checkbox>
                        <small class="text-muted d-block mt-1">
                            {{ localOptions.enableAutoGenerateQR ? 
                                'สร้าง QR Code จากหมายเลข PromptPay อัตโนมัติ' : 
                                'ใช้ QR Code ที่อัพโหลดไว้' 
                            }}
                        </small>
                    </b-form-group>
                </b-col>

                <b-col cols="12">
                    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mt-1 mr-1"
                        @click="updateSetting" :disabled="readOnlyControl">
                        Save changes
                    </b-button>
                </b-col>

                <b-col md="12">
                    <hr/>
                </b-col>

                <b-col md="12">
                    <b-row>
                        <b-col md="6">
                        <b-form-group label="ภาพคำแนะนำ">
                        </b-form-group>
                    </b-col>        
                    <b-col md="6">
                        <b-form-group label="ภาพคำแนะนำ 2">
                        </b-form-group>
                    </b-col>   
                    </b-row>
                </b-col>

                <b-col md="12">
                    <b-row>
                        <b-col md="6" >
                            <img 
                                v-if="localOptions.recommendImage.length > 0"
                                :src="localOptions.recommendImage" 
                                style="max-width: 100%; max-height: 300px; border: 1px solid #ddd; padding: 10px;"
                                alt="Image Preview"
                            />                    
                        </b-col>

                        <b-col md="6" >
                            <img 
                                v-if="localOptions.recommendImage2.length > 0"
                                :src="localOptions.recommendImage2" 
                                style="max-width: 100%; max-height: 300px; border: 1px solid #ddd; padding: 10px;"
                                alt="Image Preview"
                            />                    
                        </b-col>
                    </b-row>

                </b-col>
               

                <b-col md="12">
                    <b-row>
                        <b-col md="6">
                            <input type="file" @change="uploadFile('recommendImage')" ref="recommendImage" v-if="localOptions.recommendImage.length == 0">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('recommendImage')" v-if="localOptions.recommendImage.length == 0">
                                Upload
                            </b-button>
                            
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="danger" class="mt-1 mr-1"  @click="deleteFile('recommendImage')" v-if="localOptions.recommendImage.length > 0">Delete

                            </b-button>
                        </b-col>
                        <b-col md="6">
                            <input type="file" @change="uploadFile('recommendImage2')" ref="recommendImage2" v-if="localOptions.recommendImage2.length == 0">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('recommendImage2')" v-if="localOptions.recommendImage2.length == 0">
                                Upload
                            </b-button>
                            
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="danger" class="mt-1 mr-1"  @click="deleteFile('recommendImage2')" v-if="localOptions.recommendImage2.length > 0">Delete

                            </b-button>
                        </b-col>
                    </b-row>
                </b-col>
               
                <b-col md="12">
                    <hr/>
                </b-col>

                <b-col md="12">
                    <b-row>
                        <b-col md="6">
                        <b-form-group label="ภาพคำแนะนำ 3">
                        </b-form-group>
                    </b-col>        
                    <b-col md="6">
                        <b-form-group label="ภาพคำแนะนำ 4">
                        </b-form-group>
                    </b-col>   
                    </b-row>
                </b-col>

                <b-col md="12">
                    <b-row>
                        <b-col >
                            <img  
                                v-if="localOptions.recommendImage3.length > 0"
                                :src="localOptions.recommendImage3" 
                                style="max-width: 100%; max-height: 300px; border: 1px solid #ddd; padding: 10px;"
                                alt="Image Preview"
                            />                    
                        </b-col>

                        <b-col md="6" >
                            <img 
                                v-if="localOptions.recommendImage4.length > 0"
                                :src="localOptions.recommendImage4" 
                                style="max-width: 100%; max-height: 300px; border: 1px solid #ddd; padding: 10px;"
                                alt="Image Preview"
                            />                    
                        </b-col>
                    </b-row>

                </b-col>
               

                <b-col md="12">
                    <b-row>
                        <b-col md="6">
                            <input type="file" @change="uploadFile('recommendImage3')" ref="recommendImage3" v-if="localOptions.recommendImage3.length == 0">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('recommendImage3')" v-if="localOptions.recommendImage3.length == 0">
                                Upload
                            </b-button>
                            
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="danger" class="mt-1 mr-1"  @click="deleteFile('recommendImage3')" v-if="localOptions.recommendImage3.length > 0">Delete

                            </b-button>
                        </b-col>
                        <b-col md="6">
                            <input type="file" @change="uploadFile('recommendImage4')" ref="recommendImage4" v-if="localOptions.recommendImage4.length == 0">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('recommendImage4')" v-if="localOptions.recommendImage4.length == 0">
                                Upload
                            </b-button>
                            
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="danger" class="mt-1 mr-1"  @click="deleteFile('recommendImage4')" v-if="localOptions.recommendImage4.length > 0">Delete

                            </b-button>
                        </b-col>
                    </b-row>
                </b-col>
               
                <b-col md="12">
                    <hr/>
                </b-col>

                <b-col md="12">
                    <b-row>
                        <b-col md="6">
                        <b-form-group label="ภาพคำแนะนำ 5">
                        </b-form-group>
                    </b-col>        
              
                    </b-row>
                </b-col>

                <b-col md="12">
                    <b-row>
                        <b-col md="6">
                            <img 
                                v-if="localOptions.recommendImage5.length > 0"                             
                                :src="localOptions.recommendImage5" 
                                style="max-width: 100%; max-height: 300px; border: 1px solid #ddd; padding: 10px;"
                                alt="Image Preview"
                            />                    
                        </b-col>

                    </b-row>

                </b-col>

                <b-col md="12">
                    <b-row>
                        <b-col md="6">
                            <input type="file" @change="uploadFile('recommendImage5')" ref="recommendImage5" v-if="localOptions.recommendImage5.length == 0">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('recommendImage5')" v-if="localOptions.recommendImage5.length == 0">
                                Upload
                            </b-button>
                            
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="danger" class="mt-1 mr-1"  @click="deleteFile('recommendImage5')" v-if="localOptions.recommendImage5.length > 0">Delete

                            </b-button>
                        </b-col>
                      
                    </b-row>
                </b-col>
               
                <b-col md="12">
                    <hr/>
                </b-col>

              

            </b-row>
        </b-form>
    </b-card>
</template>

<script>
import {
    BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard, BFormTextarea, BFormCheckbox, BFormSelect,
    BFormFile,
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
        vSelect,
        flatPickr,
        Cleave,
        BFormSelect,
        BFormFile,
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
        const base = JSON.parse(JSON.stringify(this.settingData || {}))
        return {
            localOptions: {
                ...base,
                SetNearDate: Number.isFinite(+base.SetNearDate) ? +base.SetNearDate : 3,
                enableExpireOnlyOnce: !!base.enableExpireOnlyOnce, // เพิ่มใหม่
                enableSkipApproval: !!base.enableSkipApproval,
                enableAutoExpireMessage: !!base.enableAutoExpireMessage,
                expireMessageRepeat: Number.isFinite(+base.expireMessageRepeat) ? +base.expireMessageRepeat : 1,
                enableAutoGenerateQR: !!base.enableAutoGenerateQR, // เพิ่มใหม่สำหรับ QR Code System
                // ถ้ามี field อื่น ๆ ใน setting ก็ spread มาด้วย
            },
            tmpFileUpload:[],
            recommendImagePreview:false,
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
                    enableExpireOnlyOnce: !!v.enableExpireOnlyOnce, // เพิ่มใหม่
                    enableSkipApproval: !!v.enableSkipApproval,
                    enableAutoExpireMessage: !!v.enableAutoExpireMessage,
                    expireMessageRepeat: Number.isFinite(+v.expireMessageRepeat) ? +v.expireMessageRepeat : (this.localOptions.expireMessageRepeat ?? 1),
                    enableAutoGenerateQR: !!v.enableAutoGenerateQR, // เพิ่มใหม่สำหรับ QR Code System
                }
            }
        }
    },
    created() {
    },
    methods: {
        ...mapActions(["UploadFileAndDeleteOldFile"]),  
        ...mapActions(["DeleteOldFile"]),     
        resetForm() {
            const v = JSON.parse(JSON.stringify(this.settingData || {}))
            this.localOptions = {
                ...v,
                SetNearDate: Number.isFinite(+v.SetNearDate) ? +v.SetNearDate : 3,
                enableSkipApproval: !!v.enableSkipApproval,
                enableExpireOnlyOnce: !!v.enableExpireOnlyOnce,
                enableAutoExpireMessage: !!v.enableAutoExpireMessage,
                expireMessageRepeat: Number.isFinite(+v.expireMessageRepeat) ? +v.expireMessageRepeat : 1,
                enableAutoGenerateQR: !!v.enableAutoGenerateQR, // เพิ่มใหม่สำหรับ QR Code System
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
        uploadFile(tmpName) {                                    
            this.tmpFileUpload[tmpName] = this.$refs[tmpName].files[0];            
            //console.log(this.tmpFileUpload[tmpName]); 
        },
        async submitFile(tmpName) {                       
            console.log('submitFile');            
            if (this.tmpFileUpload[tmpName]==null) 
            {
                this.$toast(
                {
                    component: ToastificationContent,
                    props: {
                    title: 'No file for upload.',
                    icon: 'EditIcon',
                    variant: 'error',
                    },
                });
                return;    
            }
            
            const userData = JSON.parse(localStorage.getItem('userData'));
            const formData = new FormData();

            formData.append("userid", userData.username);
            formData.append("token", userData.token);

            formData.append("file", this.tmpFileUpload[tmpName]);            
            formData.append("tofilename", this.tmpFileUpload[tmpName].name);            
            formData.append("oldFilePath", null);
            
            const response = await this.UploadFileAndDeleteOldFile(formData);
            if (response.data.status == 'success') 
            {    
                
                this.localOptions[tmpName] = response.data.url;
                this.updateSetting();
                this.tmpFileUpload[tmpName] = null;
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
        async deleteFile(tmpName)
        {
            console.log('deleteFile');
            this.localOptions[tmpName] = "";
            this.updateSetting();

            this[tmpName] = "";
            
        },
    },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
