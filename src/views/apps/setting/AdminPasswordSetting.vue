<template>
<div>
    <b-row>
        <b-col md="4">
            <b-card :title='t("Change Password")'>
                <b-form>
                    <b-row>

                        <b-col md="12">
                            <b-form-group label-for="oldpassword" :label='t("Old Password")'>
                                <b-form-input id="oldpassword" v-model="OldPassword" placeholder="" type="password" maxlength="20" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="newpassword1" :label='t("New Password")'>
                                <b-form-input id="newpassword1" v-model="NewPassword1" placeholder="" type="password" maxlength="20" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="newpassword2" :label='t("Confirm New Password")' >
                                <b-form-input id="newpassword2" v-model="NewPassword2" placeholder="" type="password" maxlength="20" />
                            </b-form-group>
                        </b-col>
                     

                        <b-col cols="12">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mt-1 mr-1" @click="updateSetting">
                               {{ t('Save changes') }} 
                            </b-button>

                        </b-col>
                    </b-row>
                </b-form>
            </b-card>
        </b-col>

    </b-row>
   
</div>
</template>

<script>
import {
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
    BImg    
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import Ripple from 'vue-ripple-directive'
import Cleave from 'vue-cleave-component'
import axios from "axios";

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import VSwatches from 'vue-swatches'

import { mapActions } from "vuex";
import store from '@/store/index';

import { useUtils as useI18nUtils } from '@core/libs/i18n'

// Import the styles too, globally
import "vue-swatches/dist/vue-swatches.css"

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
        BImg,
        VSwatches,        
    },
    directives: {
        Ripple,
    },
    props: {
        
    },
    setup() {
     const { t } = useI18nUtils();

        function formatDateAssigned4(value) {
        let formattedDate = new Date(value);
        formattedDate = new Date(formattedDate.getTime() - 3600000); // 60 * 60 * 1000 * 1
        return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });
        };
        return {
        t,    
        
        }
    },
    data() {
        return {           
          
            OldPassword:"",
            NewPassword1:"",
            NewPassword2:"",

        }
    },
    created() {           
            
    },       
    methods: {        
        resetForm() {
            this.OldPassword = "";
            this.NewPassword1 = "";
            this.NewPassword2 = "";
        },  
        async updateSetting() {
            //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

            console.log("updateSetting");

            if (this.NewPassword1=='') 
            {
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Update`,
                        icon: 'TrashIcon',
                        variant: 'danger',
                        text: `Enter new password.`,
                    },
                    autoHideDelay: 3000,
                });
                return;
            }

            if (this.NewPassword2=='') 
            {
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Update`,
                        icon: 'TrashIcon',
                        variant: 'danger',
                        text: `Enter new password.`,
                    },
                    autoHideDelay: 3000,
                });
                return;
            }

            if (this.NewPassword1 != this.NewPassword2) 
            {
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Update`,
                        icon: 'TrashIcon',
                        variant: 'danger',
                        text: `Confirm password not match.`,
                    },
                    autoHideDelay: 3000,
                });
                return;
            }

            const userData = JSON.parse(localStorage.getItem('userData'));
            const formData = new FormData();

            var headers = {
                userid: userData.username,
                token: userData.token,
            }
            
            var body = {                
                userid: userData.username,
                oldPassword : this.OldPassword,
                newPassword1 : this.NewPassword1,
                newPassword2 : this.NewPassword2,
            }

            let response;
            await axios.post("api/admin/changepassword", body, {
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

                this.resetForm();

            } else {
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
