<template>
<Transition name="bounce">
    <b-card-code v-if="isDepositFormActive" id="deposit-manage-form" :title="titleCard" @hidden="resetForm" @change="(val) => $emit('update:is-deposit-manage-form-active', val)">

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
                            <b-avatar ref="previewEl" :src="require('@/assets/images/avatars/4.png')" :text="pRowData.fullname" size="90px" rounded />
                        </template>
                        <h4 class="mb-1">
                            {{ pRowData.fullname }}
                        </h4>
                        <h4 class="mb-1">
                            {{ pRowData.id }}
                        </h4>
                        <b-badge
                            pill
                            :variant="`light-${this.resolveStatusVariant(pRowData.status)}`"
                            class="text-capitalize"
                        >
                            {{this.resolveStatusText(pRowData.status)}}
                        </b-badge>
                        <div class="d-flex flex-wrap">

                        </div>
                    </b-media>

                    <b-form>
                        <b-row>

                            <!-- Field: Full Name -->
                            <b-col md="6">
                                
                                <b-form-group label="Fullname" label-for="fullname">
                                    <b-input-group class="input-group-merge">
                                        <b-input-group-prepend is-text>
                                            <feather-icon icon="UserIcon" />
                                        </b-input-group-prepend>
                                        <b-form-input
                                            id="fullname" v-model="pRowData.fullname"
                                        />
                                    </b-input-group>
                                </b-form-group>

                            </b-col>

                            <!-- Field: Email -->
                            <b-col md="6">                                
                                <b-form-group label="Mobile No" label-for="mobile_no">
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
                                <b-form-group label="Bank" label-for="bank-selected">
                                    <b-input-group class="input-group-merge">
                                        <b-input-group-prepend is-text>
                                            <feather-icon icon="CreditCardIcon" />
                                        </b-input-group-prepend>
                                        <b-form-select v-model="bankSelected" :options="bankOptions"></b-form-select>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>

                            <b-col md="6">                                
                                <b-form-group label="Bank Account No" label-for="bank_account_no">
                                    <b-input-group class="input-group-merge">
                                        <b-input-group-prepend is-text>
                                            <feather-icon icon="CreditCardIcon" />
                                        </b-input-group-prepend>
                                        <b-form-input id="bank_account_no" v-model="pRowData.bank_acc_no" />
                                    </b-input-group>
                                </b-form-group>
                            </b-col>

                           
                        </b-row>
                        <b-row>
                            <!-- Field: Email -->
                            

                            <b-col md="6">                                
                                <b-form-group label="Register Date" label-for="register_date">
                                    <b-input-group class="input-group-merge">
                                        <b-input-group-prepend is-text >
                                            <feather-icon icon="CalendarIcon" />
                                        </b-input-group-prepend>
                                        <b-form-input id="register_date" v-model="pRowData.create_at" readonly />
                                    </b-input-group>
                                </b-form-group>
                            </b-col>


                            <b-col md="6">                                
                                <b-form-group label="See Us" label-for="see_us">
                                    <b-input-group class="input-group-merge">
                                        <b-input-group-prepend is-text >
                                            <feather-icon icon="TvIcon" />
                                        </b-input-group-prepend>
                                        <b-form-input id="see_us" v-model="pRowData.knowus" readonly />
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                            
                        </b-row>
                    </b-form>

                    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary" class="mr-1" @click="updateMember">
                        <feather-icon icon="EditIcon" />
                        Save
                    </b-button>

                    <b-button @click="close" v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="outline-secondary">
                        <feather-icon icon="DeleteIcon" />
                        Close
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

//   import { codeMultipleColumn } from './codemultiplecolumn'
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
    },
    directives: {
        Ripple,
    },
    setup(props, {
        emit
    }) {

        const blankData = {
            credit: 0.00,
            credit_bonus: 0.00,
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
        }
    },
    data() {
        return {
            // codeMultipleColumn,
        }
    },
    model: {
        event: 'update:is-deposit-manage-form-active',
        bankSelected: "1",
        bankOptions: [{
            value: null,
            text: 'Select Bank'
        }, ],
        titleCard: "Deposit Credit",
        sumdeposit:0,
        sumwithdraw:0,
        sumprofit:0,
    },
    props: {
        isDepositFormActive: {
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
        async updateMember() {
            //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

            console.log("updateMember");

            const userData = JSON.parse(localStorage.getItem('userData'));
            
            var headers = {
                userid: userData.username,
                token: userData.token,
            }

            var body = this.pRowData;
            body.bank_id = this.bankSelected?this.bankSelected:1;
            
            // console.log(body);

            let response;
            await axios.post("api/member/updatememberbyid", body, {
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
        async insertAdminBank() {
            //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

            console.log("insertAdminTrueWallet");

            const userData = JSON.parse(localStorage.getItem('userData'));
            const formData = new FormData();

            var headers = {
                userid: userData.username,
                token: userData.token,
            }

            var body = {
                id: this.pRowData.id,
                tw_type_wallet: this.walletTypeSelected,
                tw_type: this.depWitSelected,
                tw_name: this.bankAccountName,
                tw_mobile: this.bankAccountNumber,

                tw_key: this.truekey ? this.truekey : ' ',
                login_token: this.truetoken ? this.truetoken : ' ',
                tmn_id: this.apiid ? this.apiid : ' ',

                statusActive: this.statusActive,
            }

            // console.log(body);

            let response;
            await axios.post("api/admintruewallet/create", body, {
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
