<template>
    <b-card>

        <b-form>
            <b-row>
                <b-col md="12">
                        <b-form-group label="คำตอบไลน์เมื่อลูกค้าเข้ามาทัก">
                            <b-form-input id="greeting_msg" v-model="localOptions.greeting_msg" type="text"
                            placeholder="คำตอบไลน์เมื่อลูกค้าเข้ามาทัก" />      
                        </b-form-group>                                        
                </b-col>

                <b-col md="12">
                    <b-row>
                        <b-col md="6">
                            <img 
                                v-if="localOptions.greeting_banner_url && localOptions.greeting_banner_url.length > 0"                             
                                :src="localOptions.greeting_banner_url" 
                                style="max-width: 100%; max-height: 300px; border: 1px solid #ddd; padding: 10px;"
                                alt="Image Preview"
                            />                    
                        </b-col>
                    </b-row>
                </b-col>                

                <b-col md="12">
                    <b-row>
                        <b-col md="6">
                            <input type="file" @change="uploadFile('greeting_banner_url')" ref="greeting_banner_url" v-if="localOptions.greeting_banner_url.length == 0">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('greeting_banner_url')" v-if="localOptions.greeting_banner_url.length == 0">
                                Upload
                            </b-button>
                            
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="danger" class="mt-1 mr-1"  @click="deleteFile('greeting_banner_url')" v-if="localOptions.greeting_banner_url.length > 0">Delete
                            </b-button>
                        </b-col>
                      
                    </b-row>
                </b-col>
               
                <b-col md="12">
                    <hr/>
                </b-col>

                <b-col md="12">
                    <b-form-group label="ข้อความเมื่อสั่งซื้อสินค้า">
                        <b-form-input id="order_msg" v-model="localOptions.order_msg" type="text"
                            placeholder="เข้าลิงค์นี้เพื่อไปหน้าซื้อสินค้า" />                        
                    </b-form-group>
                </b-col>

                <b-col md="12">
                    <b-row>
                        <b-col md="6">
                            <img 
                                v-if="localOptions.order_msg_url && localOptions.order_msg_url.length > 0"                             
                                :src="localOptions.order_msg_url" 
                                style="max-width: 100%; max-height: 300px; border: 1px solid #ddd; padding: 10px;"
                                alt="Image Preview"
                            />                    
                        </b-col>
                    </b-row>
                </b-col>

                <b-col md="12">
                    <b-row>
                        <b-col md="6">
                            <input type="file" @change="uploadFile('order_msg_url')" ref="order_msg_url" v-if="localOptions.order_msg_url.length == 0">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('order_msg_url')" v-if="localOptions.order_msg_url.length == 0">
                                Upload
                            </b-button>
                            
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="danger" class="mt-1 mr-1"  @click="deleteFile('order_msg_url')" v-if="localOptions.order_msg_url.length > 0">Delete
                            </b-button>
                        </b-col>
                      
                    </b-row>
                </b-col>
               
                <b-col md="12">
                    <hr/>
                </b-col>

                <b-col md="12">
                    <b-form-group label="ข้อความต่ออายุ">
                        <b-form-input id="buy_more_msg" v-model="localOptions.buy_more_msg" type="text"
                            placeholder="เข้าลิงค์นี้เพื่อไปต่ออายุ" />                        
                    </b-form-group>
                </b-col>

                <b-col md="12">
                    <b-row>
                        <b-col md="6">
                            <img 
                                v-if="localOptions.buy_more_url && localOptions.buy_more_url.length > 0"                             
                                :src="localOptions.buy_more_url" 
                                style="max-width: 100%; max-height: 300px; border: 1px solid #ddd; padding: 10px;"
                                alt="Image Preview"
                            />                    
                        </b-col>
                    </b-row>
                </b-col>

                <b-col md="12">
                    <b-row>
                        <b-col md="6">
                            <input type="file" @change="uploadFile('buy_more_url')" ref="buy_more_url" v-if="localOptions.buy_more_url.length == 0">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('buy_more_url')" v-if="localOptions.buy_more_url.length == 0">
                                Upload
                            </b-button>
                            
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="danger" class="mt-1 mr-1"  @click="deleteFile('buy_more_url')" v-if="localOptions.buy_more_url.length > 0">Delete
                            </b-button>
                        </b-col>
                      
                    </b-row>
                </b-col>
               
                <b-col md="12">
                    <hr/>
                </b-col>

                <b-col md="12">
                    <b-form-group label="ข้อความเมื่อซื้อสินค้าเสร็จสิ้น">
                        <b-form-input id="thankyou_msg" v-model="localOptions.thankyou_msg" type="text"
                            placeholder="ขอขอบคุณลูกค้าที่อุดหนุนสินค้าของพวกเราค่ะ" />                        
                    </b-form-group>
                </b-col>

                <b-col md="12">
                    <b-row>
                        <b-col md="6">
                            <img 
                                v-if="localOptions.thankyou_banner_url && localOptions.thankyou_banner_url.length > 0"                             
                                :src="localOptions.thankyou_banner_url" 
                                style="max-width: 100%; max-height: 300px; border: 1px solid #ddd; padding: 10px;"
                                alt="Image Preview"
                            />                    
                        </b-col>
                    </b-row>
                </b-col>

                <b-col md="12">
                    <b-row>
                        <b-col md="6">
                            <input type="file" @change="uploadFile('thankyou_banner_url')" ref="thankyou_banner_url" v-if="localOptions.thankyou_banner_url.length == 0">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('thankyou_banner_url')" v-if="localOptions.thankyou_banner_url.length == 0">
                                Upload
                            </b-button>
                            
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="danger" class="mt-1 mr-1"  @click="deleteFile('thankyou_banner_url')" v-if="localOptions.thankyou_banner_url.length > 0">Delete
                            </b-button>
                        </b-col>
                      
                    </b-row>
                </b-col>
               
                <b-col md="12">
                    <hr/>
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
                    ...JSON.parse(JSON.stringify(v))                    
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
                
            }
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

                id: 'line_message',
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
