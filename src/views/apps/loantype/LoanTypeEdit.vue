    <template>
    <Transition name="bounce">
        <b-row>
            <b-col md="6">
                <b-card-code v-if="isEditFormActive" id="admin-edit" :title="titleCard" @change="(val) => $emit('update:is-admin-edit-active', val)">
                    
                            <b-form @submit.prevent>
                                <b-row>
                                    
                                    <b-col md="12">
                                        <b-form-group :label="t('Loan Name')" label-for="loanname">
                                            <b-form-input id="loanname" placeholder="" v-model="pRowData.interest_name" />
                                        </b-form-group>
                                    </b-col>

                                    <b-col md="12">
                                        <b-form-group :label="t('Period Type')" label-for="period_name">
                                            <b-form-select v-model="periodTypeSelected" @change="changePeriod" 
                                                :options="periodTypeOptions">
                                            </b-form-select>
                                                
                                        </b-form-group>
                                    </b-col>

                                    <b-col md="12">
                                        <b-form-group :label="t('Calculate Interest Every')+' ('+t(pRowData.period_unit)+')'" label-for="period_number" v-if="renderComponent">
                                            <b-form-input id="period_number" placeholder="" v-model="pRowData.period_number" />
                                        </b-form-group>
                                    </b-col>

                                    <b-col md="12">
                                        <b-form-group :label="t('Collateral')" label-for="collateral_name">
                                            <b-form-select v-model="collateralSelected"  
                                                :options="collateralOptions">
                                            </b-form-select>
                                        </b-form-group>
                                    </b-col>

                                    <b-col>
                                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary" class="mr-1" @click="insertLoanType" v-if="!isModeEdit">
                                            <feather-icon icon="EditIcon" />
                                            {{t('Add')}}
                                        </b-button>
                                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary" class="mr-1" @click="updateLoanType" v-if="isModeEdit">
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
            periodTypeSelected: 0,
            periodTypeOptions: [{
                value: 0,
                text: 'Select Period Type'
            }, ],
            periodTypeOptions2:[],      
            periodTypeOptions3:[],      
            collateralSelected: 0,
            collateralOptions: [{
                value: 0,
                text: 'Select Collateral'
            }, ],
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
                this.periodTypeSelected = newVal.period_id;
                this.collateralSelected = newVal.collateral_type_id;
                this.period_number = newVal.period_number;
                
                
                
            },
            isModeEdit: function (newVal, oldVal) {
                if (newVal == true) {                    
                    //ข้อมูลประเภทการกู้ (แก้ไข)
                    //ข้อมูลประเภทการกู้ (เพิ่ม)
                    this.titleCard = this.$t('Loan Type (Edit)');
                } else {
                    this.titleCard = this.$t('Loan Type (Add)');
                }
            }
        },
        async created() {
            //ข้อมูลประเภทการกู้
            this.titleCard = this.$t('Loan Type');
            
            await Promise.all([
                this.getInterestPeriod(),
                this.getCollateralType(),
            ]);

        },
        methods: {
            ...mapActions(["GetInterestPeriod"]),
            ...mapActions(["GetCollateralType"]),              
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
            async getInterestPeriod()
            {
                console.log('getInterestPeriod');

                const userData = JSON.parse(localStorage.getItem('userData'));
                const formData = new FormData();

                formData.append("userid", userData.username);
                formData.append("token", userData.token);

                formData.append("searchWord", this.searchTerm);      

                const response = await this.GetInterestPeriod(formData);
                if (response.data.status == 'success') {  
                    
                    const interestPeriod = response.data.data;
                    let tmpArray = [];
                    let tmpArray2 = [];
                    let tmpArray3 = [];
                    interestPeriod.forEach(element => {
                        tmpArray.push({
                            value: element.id,
                            text: this.$t(element.period_name)
                        });

                        tmpArray2.push({
                            id: element.id,
                            period_name: this.$t(element.period_name),
                            period_unit: element.period_unit,
                        });

                        tmpArray3.push({
                            value: element.id,
                            text: element.period_name
                        });
                    });
                    this.periodTypeOptions = tmpArray;
                    this.periodTypeOptions2 = tmpArray2;                    
                    this.periodTypeOptions3 = tmpArray3;
                    
                    
                }
                else {
                    
                }
            },
            async getCollateralType()
            {
                console.log('getCollateralType');
            
                const userData = JSON.parse(localStorage.getItem('userData'));
                const formData = new FormData();

                formData.append("userid", userData.username);
                formData.append("token", userData.token);

                formData.append("searchWord", this.searchTerm);      

                const response = await this.GetCollateralType(formData);
                if (response.data.status == 'success') {  
                    
                    const collateralType = response.data.data;
                    let tmpArray = [];
                    
                    collateralType.forEach(element => {
                        tmpArray.push({
                            value: element.id,
                            text: this.$t(element.collateral_name)
                        });

                    });
                    this.collateralOptions = tmpArray;

                    
                }
                else {
                    
                }
            },
            async updateLoanType() {
                //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

                console.log("updateLoanType");

                const userData = JSON.parse(localStorage.getItem('userData'));
                const formData = new FormData();

                var headers = {
                    userid: userData.username,
                    token: userData.token,
                }

                var body = this.pRowData;

                body.status = this.statusActive ? this.statusActive : 1;
                body.Type = this.promotionTypeSelected ? this.promotionTypeSelected : "Normal";
                body.DepositType = this.depositTypeSelected ? this.depositTypeSelected : "Equal";
                body.Rec_type = this.bonusTypeSelected ? this.bonusTypeSelected : "unit";
                body.LimitType = this.maximumBonusTypeSelected ? this.maximumBonusTypeSelected : "DepositWithBonus";
                body.TurnType = this.turnTypeSelected ? this.turnTypeSelected : "unit";
                body.TurnCal = this.turnCalTypeSelected ? this.turnCalTypeSelected : "credit";
                body.TurnOver = this.pRowData.TurnOver ? this.pRowData.TurnOver : 0;
                body.TurnTypeWithdraw = this.turnTypeWithdrawSelected ? this.turnTypeWithdrawSelected : "turnover";
                body.TypeTakeTurn = this.typeTakeTurnSelected ? this.typeTakeTurnSelected : "ALL";

                body.period_id = this.periodTypeSelected ? this.periodTypeSelected : 1;
                body.collateral_type_id = this.collateralSelected ? this.collateralSelected : 1;
                
                body.page_name = this.$route.name;

                // console.log(body);

                let response;
                await axios.post("api/interesttype/updatebyid", body, {
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
            async insertLoanType() {
                //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

                console.log("insertLoanType");

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
                await axios.post("api/interesttype/create", body, {
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
