<template>
<Transition name="bounce">
    <b-card-code v-if="isAddFormActive" id="alliance-manage-add" title="Add Alliance" @hidden="resetForm" @change="(val) => $emit('update:is-alliance-manage-add-active', val)">

        <b-tabs pills>

            <!-- Tab: Account -->
            <b-tab active>
                <template #title>
                    <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
                    <span class="d-none d-sm-inline">Account</span>
                </template>
                <div>
                    <b-media class="mb-2">
                        <template #aside>
                            <b-avatar ref="previewEl" :src="require('@/assets/images/avatars/10.png')" :text="pRowData.fullname" size="90px" rounded />
                        </template>
                        <h4 class="mb-1">
                            {{ pRowData.fullname }}
                        </h4>
                        <h6 class="mb-1 text-muted" >
                            {{t('Register New Alliance')}}
                        </h6>
                      
                        <div class="d-flex flex-wrap">

                        </div>
                    </b-media>

                    <b-form>
                        <b-row>

                            <!-- Field: Full Name -->
                            <b-col md="6">
                                
                                <b-form-group :label="t('Fullname')" label-for="fullname">
                                    <b-input-group class="input-group-merge">
                                        <b-input-group-prepend is-text>
                                            <feather-icon icon="UserIcon" />
                                        </b-input-group-prepend>
                                        <b-form-input
                                            id="fullname" v-model="pRowData.fullname"/>                                       
                                    </b-input-group>
                                </b-form-group>

                            </b-col>

                            <!-- Field: Email -->
                            <b-col md="6">                                
                                <b-form-group :label="t('Mobile No')"  label-for="mobile_no">
                                    <b-input-group class="input-group-merge">
                                        <b-input-group-prepend is-text>
                                            <feather-icon icon="SmartphoneIcon" />
                                        </b-input-group-prepend>
                                        <b-form-input id="mobile_no" v-model="pRowData.mobile_no" />
                                    </b-input-group>
                                </b-form-group>
                            </b-col>

                        </b-row>
                        <b-row>
                            <!-- Field: Email -->
                            <b-col md="6">                                
                                <b-form-group :label="t('Bank')"   label-for="bank-selected">
                                    <b-input-group class="input-group-merge">
                                        <b-input-group-prepend is-text>
                                            <feather-icon icon="CreditCardIcon" />
                                        </b-input-group-prepend>
                                        <b-form-select v-model="bankSelected" :options="bankOptions"></b-form-select>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>

                            <b-col md="6">                                
                                <b-form-group :label="t('Bank Account Number')"  label-for="bank_account_no">
                                    <b-input-group class="input-group-merge">
                                        <b-input-group-prepend is-text>
                                            <feather-icon icon="CreditCardIcon" />
                                        </b-input-group-prepend>
                                        <b-form-input id="bank_account_no" v-model="pRowData.bank_acc_no" />
                                        <b-input-group-append is-text>                                                                                        
                                                <feather-icon icon="SearchIcon" /> &nbsp;<small> {{t('Get Fullname')}}</small>                                            
                                        </b-input-group-append>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>

                           
                        </b-row>

                        <b-row>
                            <!-- Field: Full Name -->
                            <b-col md="6">
                                
                                <b-form-group label="Line ID" label-for="line_userid">
                                    <b-input-group class="input-group-merge">
                                        <b-input-group-prepend is-text>
                                            <feather-icon icon="UserIcon" />
                                        </b-input-group-prepend>
                                        <b-form-input
                                            id="line_userid" v-model="pRowData.line_userid"/>                                       
                                    </b-input-group>
                                </b-form-group>

                            </b-col>

                            <!-- Field: Email -->
                            <b-col md="6">                                
                                <b-form-group label="True Wallet ID" label-for="truewalletid">
                                    <b-input-group class="input-group-merge">
                                        <b-input-group-prepend is-text>
                                            <feather-icon icon="CreditCardIcon" />
                                        </b-input-group-prepend>
                                        <b-form-input id="truewalletid" v-model="pRowData.truewalletid" />
                                    </b-input-group>
                                </b-form-group>
                            </b-col>

                        </b-row>

                        <b-row>

                            <b-col md="6">
                                <b-form-group :label="t('Password')" label-for="password">
                                    <b-input-group class="input-group-merge">
                                        <b-input-group-prepend is-text>
                                            <feather-icon icon="CreditCardIcon" />
                                        </b-input-group-prepend>
                                        <b-form-input type="password"
                                            id="password" v-model="pRowData.password"/>                                       
                                    </b-input-group>
                                </b-form-group>
                            </b-col>

                            <b-col md="6">                                
                                <b-form-group :label="t('Register Date')"  label-for="register_date">
                                    <b-input-group class="input-group-merge">
                                        <b-input-group-prepend is-text >
                                            <feather-icon icon="CalendarIcon" />
                                        </b-input-group-prepend>
                                        <b-form-input id="register_date" v-model="pRowData.create_at" readonly />
                                    </b-input-group>
                                </b-form-group>
                            </b-col>

                           
                        </b-row>

                        <b-row>
                            <b-col md="12">
                                <b-form-group :label="t('Group')"  label-for="bank-selected">
                                    <b-input-group class="input-group-merge">
                                        <b-input-group-prepend is-text>
                                            <feather-icon icon="CreditCardIcon" />
                                        </b-input-group-prepend>
                                        <b-form-select v-model="knowUsSelected" :options="knowUsOptions"></b-form-select>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                        </b-row>

                    </b-form>

                    

                    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary" class="mr-1" @click="registerAlliance">
                        <feather-icon icon="EditIcon" />
                        {{t('Save')}}
                    </b-button>

                    <b-button @click="close" v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="outline-secondary">
                        <feather-icon icon="DeleteIcon" />
                        {{t('Close')}}
                    </b-button>

                </div>
            </b-tab>

          
        </b-tabs>
    </b-card-code>
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
    BTabs,
    BTab,
    BMedia,
    BAvatar,    
    BInputGroup, 
    BInputGroupPrepend,
    BInputGroupAppend,
    BBadge,
} from 'bootstrap-vue'
import {
    ref
} from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import formValidation from '@core/comp-functions/forms/form-validation'
import {
    mapActions
} from "vuex";
import axios from "axios";

import { useUtils as useI18nUtils } from '@core/libs/i18n'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
    components: {
        BCardCode,   
        BBadge,     
        BAvatar,
        BTabs,
        BTab,
        BMedia,
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
        BFormCheckbox,
        BForm,
        BButton,
        BFormSelect,
        BInputGroup, 
        BInputGroupPrepend,
        BInputGroupAppend,
    },
    directives: {
        Ripple,
    },
    setup(props, {
        emit
    }) {

        const { t } = useI18nUtils();
        const blankData = {
            commision: 0.00,            
            date: null,
            username: '',
        }

        let tmpData = JSON.parse(JSON.stringify(blankData));
        const resetuserData = () => {
            tmpData = JSON.parse(JSON.stringify(blankData));
        }

        const {
            resetForm,
        } = formValidation(resetuserData)

        return {
            resetForm,
            t,
        }
    },
    data() {
        return {
            // codeMultipleColumn,
        }
    },
    model: {
        event: 'update:is-alliance-manage-add-active',
        bankSelected: "1",
        bankOptions: [{
            value: null,
            text: 'Select Bank'
        }, ],
        titleCard: "",
        sumdeposit:0,
        sumwithdraw:0,
        sumprofit:0,
        knowUsInfo:[],
        knowUsSelected:'',
        knowUsOptions: [{
            value: null,
            text: 'Select Bank'
        }, ],
    },
    props: {
        isAddFormActive: {
            type: Boolean,
            required: true,
        },
        
        pRowData: {
            required: false,
        },
    },
    watch: {
        pRowData: async function (newVal, oldVal) {
            // console.log(newVal);

            // this.fullname = newVal.fullname;
            this.bankSelected = newVal.bank_id;
            // this.depWitSelected = newVal.tw_type;
            // this.bankAccountName = newVal.tw_name;
            // this.bankAccountNumber = newVal.tw_mobile;            

            // this.truekey = newVal.tw_key;
            // this.truetoken = newVal.login_token;
            // this.apiid = newVal.tmn_id;

            // this.statusActive = newVal.status;
           

        },
        
    },
    async created() {
        await this.getBankInfo();
        await this.getKnowUs();
        this.titleCard = "";
        this.sumdeposit=10.00;
        this.sumwithdraw=10.00;
        this.sumprofit=10.00;
    },
    methods: {
        ...mapActions(["GetBankInfo"]),
        close() {
            this.$emit('close-edit-form');
        },
        clearForm() {
            console.log("Clear Form");
        },
        async getKnowUs() {
            console.log('getKnowUs');

            // console.log(this.fromDate);
            // console.log(this.toDate);
            // console.log(this.AgentSelected);       
            // console.log(this.searchTerm);
            // console.log(this.pageLength);

            const userData = JSON.parse(localStorage.getItem('userData'));

            // console.log(userData);

            var headers = {
                userid: userData.username,
                token: userData.token,
            }

            var body = {        
                searchWord: this.searchTerm,
            }

            let response;
            await axios.post("api/refer/getrefer",body,
            {
                headers: {            
                'Content-Type': 'application/json',
                'userid': headers.userid,
                'token': headers.token,
                }
            }).then(
                resp => 
                {
                    response = resp;
                }
            );

            // console.log(response.data.status);
            // console.log(response.data.data);

            if (response.data.status == 'success') {        
                let tmpData = response.data.data;        

                let tmpArray = [];        
                let tmpInfo = [];       
                await tmpData.forEach(element => {                
                    tmpArray.push({value : element.refer ,text: element.refer});  
                    tmpInfo.push(element);                
                });

                this.knowUsOptions = tmpArray;
                this.knowUsInfo = tmpInfo;
                this.knowUsSelected = tmpArray[0].value;
                // console.log(this.rows);
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
        async getBankInfo() {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const User = new FormData();

            User.append("userid", userData.username);
            User.append("token", userData.token);

            const response = await this.GetBankInfo(User);
            if (response.data.status == 'success') {
                const bankinfo = response.data.data;
                let tmpArray = [];
                bankinfo.forEach(element => {
                    tmpArray.push({
                        value: element.bank_id,
                        text: element.bank_name
                    });
                });
                this.bankOptions = tmpArray;
                this.bankSelected = 1;
            } else {

            }
        },        
        async registerAlliance() {
            
            console.log("registerAlliance");

            const userData = JSON.parse(localStorage.getItem('userData'));

            var headers = {
                userid: userData.username,
                token: userData.token,
            }

            var body = this.pRowData;
            body.bank_id = this.bankSelected?this.bankSelected:1;            
            body.mobile_no = this.pRowData.mobile_no?this.pRowData.mobile_no:'0123456789';
            body.bank_acc_no = this.pRowData.bank_acc_no?this.pRowData.bank_acc_no:'123456789';            
            body.password = this.pRowData.password?this.pRowData.password:'0123456789';            
            body.fullname = this.pRowData.fullname?this.pRowData.fullname:'HumYai';
            body.knowus = this.knowUsSelected?this.knowUsSelected:'';

            // console.log(body);

            let response;
            await axios.post("api/alliance/create", body, {
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

            console.log(response);

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
        resolveStatusVariant(inStatus) {            
            if (inStatus === 1) return 'success'
            if (inStatus === 0) return 'warning'
            return ''
        },
        resolveStatusText(inStatus) {            
            if (inStatus === 1) return 'Active'
            if (inStatus === 0) return 'InActive'
            return ''
        }

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
