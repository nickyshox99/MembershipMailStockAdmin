    <template>
    <Transition name="bounce">
        <b-row>
            <b-col md="6">
                <b-card-code v-if="isEditFormActive" id="admin-edit" :title="titleCard" @change="(val) => $emit('update:is-admin-edit-active', val)">
                    
                            <b-form @submit.prevent>
                                <b-row>
                                    
                                    <b-col md="12">
                                        <b-form-group :label="t('Subscription Name')" label-for="subscription_name">
                                            <b-form-input id="subscription_name" placeholder="" v-model="pRowData.subscription_name" />
                                        </b-form-group>
                                    </b-col>


                                    <b-col md="12">
                                        <b-form-group :label="t('Subscription Image')" label-for="subscription_img">
                                            <b-form-input id="subscription_img" placeholder="" v-model="pRowData.subscription_img" />
                                        </b-form-group>
                                    </b-col>

                                    <b-col cols="1">
                                        <b-form-group
                                        :label="t('Active')"              
                                        label-for="status-active"
                                        >
                                        <b-form-checkbox
                                            id="checkbox-10"
                                            name="checkbox-10"
                                            v-model="statusActive"
                                            value="1"
                                            unchecked-value="0"
                                        >
                                            {{ t('On') }} 
                                        </b-form-checkbox>
                                        </b-form-group>
                                    </b-col>

                                    <b-col>
                                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary" class="mr-1" @click="insertType" v-if="!isModeEdit">
                                            <feather-icon icon="EditIcon" />
                                            {{t('Add')}}
                                        </b-button>
                                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary" class="mr-1" @click="updateType" v-if="isModeEdit">
                                            <feather-icon icon="EditIcon" />
                                            {{t('Save')}}
                                        </b-button>
                                        <b-button @click="close" v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="outline-secondary">
                                            <feather-icon icon="DeleteIcon" />
                                            {{t('Close')}}
                                        </b-button>
                                    </b-col>
                                </b-row>
                            </b-form>                                
                </b-card-code>
            </b-col>
        </b-row>
    </Transition>
    </template>

        
<script>
import BCardCode from '@core/components/b-card-code'
import {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BFormSelect,
    BImg
} from 'bootstrap-vue'
import {
    ref
} from '@vue/composition-api'

import Ripple from 'vue-ripple-directive'

import {
    mapActions
} from "vuex";
import axios from "axios";

//   import { codeMultipleColumn } from './codemultiplecolumn'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
    useUtils as useI18nUtils    
} from '@core/libs/i18n'


export default {
        components: {
            BCardCode,
            BRow,
            BCol,
            BFormGroup,
            BFormInput,
            BFormCheckbox,
            BForm,
            BButton,
            BFormSelect,
            BImg,
        },
        directives: {
            Ripple,
        },
        setup(props, {
            emit
        }) {

            const {
                t
            } = useI18nUtils();
            
            return {
                t,
                
            };

        },
        data() {
            return {
                // codeMultipleColumn,
                renderComponent: true,
                showTimeInput: false,
                
            }
        },
        model: {
            event: 'update:is-admin-edit-active',
            // periodTypeSelected: 0,
            // periodTypeOptions: [{
            //     value: 0,
            //     text: 'Select Period Type'
            // }, ],
            // periodTypeOptions2:[],      
            // periodTypeOptions3:[],      
            // collateralSelected: 0,
            // collateralOptions: [{
            //     value: 0,
            //     text: 'Select Collateral'
            // }, ],
            statusActive: 0,
            titleCard: "",
            period_number:1,

        },        
        props: {
            isEditFormActive: {
                type: Boolean,
                required: true,
            },
            isModeEdit: {
                type: Boolean,
                required: true,
            },
            pRowData: {
                required: false,
            },
        },
        watch: {
            pRowData: function (newVal, oldVal) {
                this.statusActive = newVal.status;
            },
            isModeEdit: function (newVal, oldVal) {
                if (newVal == true) {                                        
                    this.titleCard = this.$t('Subscritpion Type (Edit)');
                } else {
                    this.titleCard = this.$t('Subscritpion Type (Add)');
                }
            }
        },
        async created() {
            //ข้อมูลประเภทการกู้
            this.titleCard = this.$t('Subscritpion Type');
            
            // await Promise.all([
            //     this.getInterestPeriod(),
            //     this.getCollateralType(),
            // ]);

        },
        methods: {                 
            getCurrentTimeString(ctime) {
                return ctime;
                const ctime2 = new Date(ctime);
                const hours = String(ctime2.getHours()).padStart(2, '0');
                const minutes = String(ctime2.getMinutes()).padStart(2, '0');
                const seconds = String(ctime2.getSeconds()).padStart(2, '0');
                return `${hours}:${minutes}:${seconds}`;
            },
            close() {
                this.$emit('close-edit-form');
            },
            clearForm() {
                console.log("Clear Form");
            },
            changePeriod()
            {
                console.log(this.periodTypeSelected);
                
                if (this.periodTypeOptions3.length>0) {
                    const getPeriod = this.periodTypeOptions3.find(x=>x.value==this.periodTypeSelected);   
                    this.pRowData.period_unit = getPeriod.text;    
                    this.forceRerender();                
                }
            },
            async updateType() {
                //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

                console.log("updateType");

                const userData = JSON.parse(localStorage.getItem('userData'));
                const formData = new FormData();

                var headers = {
                    userid: userData.username,
                    token: userData.token,
                }

                var body = this.pRowData;

                body.status = this.statusActive ? this.statusActive : 1;                
                body.page_name = this.$route.name;

                // console.log(body);

                let response;
                await axios.post("api/subscriptiontype/updatebyid", body, {
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

                    this.$emit('refetch-data');
                    this.close();

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
                    this.search();
                }

            },
            forceRerender() {
                // Removing my-component from the DOM
                // console.log("forceRerender "+this.items2[6].tag);
                // console.log("forceRerender");
                this.renderComponent = false;
                this.$nextTick(() => {
                    // Adding the component back in
                    this.renderComponent = true;
                });
            },          
            async insertType() {
                //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

                console.log("insertType");

                const userData = JSON.parse(localStorage.getItem('userData'));
                const formData = new FormData();

                var headers = {
                    userid: userData.username,
                    token: userData.token,
                }

                var body = this.pRowData;

                body.period_id = this.periodTypeSelected ? this.periodTypeSelected : 1;
                body.collateral_type_id = this.collateralSelected ? this.collateralSelected : 1;

                body.page_name = this.$route.name;

                let response;
                await axios.post("api/subscriptiontype/create", body, {
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
                    this.$emit('refetch-data');
                    this.close();
                } else {
                    this.$toast({
                        component: ToastificationContent,
                        position: 'top-right',
                        props: {
                            title: `Create`,
                            icon: 'TrashIcon',
                            variant: 'danger',
                            text: `Create UnSuccesful ${response.data.message}`,
                        },
                        autoHideDelay: 3000,
                    });
                }

            },
            

        },
    }
    </script>

    <style>
    .bounce-enter-active {
        animation: bounce-in 0.5s;
    }

    .bounce-leave-active {
        animation: bounce-in 0.5s reverse;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }

        50% {
            transform: scale(1.25);
        }

        100% {
            transform: scale(1);
        }
    }
</style>
