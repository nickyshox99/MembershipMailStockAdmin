<template>
  <Transition name="bounce">
    <b-card-code
        v-if="isEditFormActive"
      id="admin-edit"      
      :title="titleCard"
      @hidden="resetForm"
      @change="(val) => $emit('update:is-admin-edit-active', val)"
    >
    <div>
        
      <b-form @submit.prevent >        
        <b-row>
          <b-col md="12" style="padding:10px;">
            <b-img :src="pRowData.Banner" fluid thumbnail  />
          </b-col>          
          
          <b-col md="12">
            <b-form-group              
              :label="t('Banner')"
              label-for="banner"
            >
              <b-form-input
                id="banner"
                placeholder=""
                v-model="pRowData.Banner"
              />
            </b-form-group>
          </b-col>

          <b-col md="12">
            <b-form-group              
              :label="t('Title')"
              label-for="title"
            >
              <b-form-input
                id="title"
                placeholder=""
                v-model="pRowData.Title"
              />
            </b-form-group>
          </b-col>

          <b-col md="12">
            <b-form-group              
              :label="t('Detail')"
              label-for="detail"
            >
              <b-form-input
                id="detail"
                placeholder=""
                v-model="pRowData.note_pro"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group              
              :label="t('Promotion Type')"
              label-for="promotion-type"
            >              
              <b-form-select v-model="promotionTypeSelected" @change="changePromotionType" 
              :options="promotionTypeOptions"></b-form-select>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              :label="t('Limit Per Day')"              
              label-for="limit"
            >
              <b-form-input
                id="limit"
                placeholder=""
                v-model="pRowData.LimitPerDay"
              />
            </b-form-group>
          </b-col>

          <b-col md="6" v-if="showTimeInput" >
            <b-form-group              
              :label="t('Start Time')"
              label-for="starttime"
            >
              <b-form-input
               type="time"
                id="starttime"
                placeholder=""
                v-model="pRowData.From"
              />
            </b-form-group>
          </b-col>

          <b-col md="6" v-if="showTimeInput"  >
            <b-form-group
              :label="t('End Time')"              
              label-for="endtime"
            >
              <b-form-input
              type="time"
                id="endtime"
                placeholder=""
                v-model="pRowData.To"
              />
            </b-form-group>
          </b-col>

         

          <b-col md="6">
            <b-form-group              
              :label="t('Deposit')"
              label-for="deposit"
            >
              <b-form-input
                id="deposit"
                placeholder=""
                v-model="pRowData.Deposit"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              :label="t('Deposit Type')"
              label-for="deposit-type"
            >
              <b-form-select v-model="depositTypeSelected" 
              :options="depositTypeOptions"></b-form-select>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group              
              :label="t('Bonus')"
              label-for="credit-bonus"
            >
              <b-form-input
                id="credit-bonus"
                placeholder=""
                v-model="pRowData.Rec"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group              
              :label="t('Bonus Type')"
              label-for="bonus-type"
            >
              <b-form-select v-model="bonusTypeSelected" 
              :options="bonusTypeOptions"></b-form-select>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              :label="t('Maximum Bonus')"              
              label-for="maximum-bonus"
            >
              <b-form-input
                id="maximum-bonus"
                placeholder=""
                v-model="pRowData.Limit"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group              
              :label="t('Maximum Bonus Type')"
              label-for="maximum-bonus-type"
            >
            <b-form-select v-model="maximumBonusTypeSelected" 
              :options="maximumBonusTypeOptions"></b-form-select>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group              
              :label="t('Turn Type')"
              label-for="turn-type"
            >
            <b-form-select v-model="turnTypeSelected" 
              :options="turnTypeOptions"></b-form-select>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group              
              :label="t('Turn Calculate Type')"
              label-for="turn-cal-type"
            >
            <b-form-select v-model="turnCalTypeSelected" 
              :options="turnCalTypeOptions"></b-form-select>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group              
              :label="t('Turn Type Withdraw')"
              label-for="turn-type-withdraw"
            >
            <b-form-select v-model="turnTypeWithdrawSelected" 
              :options="turnTypeWithdrawOptions"></b-form-select>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              :label="t('Turn Over')"              
              label-for="turnover"
            >
              <b-form-input
                id="turnover"
                placeholder=""
                v-model="pRowData.TurnOver"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group              
              :label="t('Maximum Withdraw')"
              label-for="maximum-withdraw"
            >
              <b-form-input
                id="maximum-withdraw"
                placeholder=""
                v-model="pRowData.MaxWithdraw"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group              
              :label="t('Game For Take Turn')"
              label-for="game-take-turn"
            >
            <b-form-select v-model="typeTakeTurnSelected" 
              :options="typeTakeTurnOptions"></b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12">
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
                {{t('On')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>

          <b-col>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
              @click="insertPromotion"
              v-if="!isModeEdit"
            >
            <feather-icon
                icon="EditIcon"              
                />
              {{t('Add')}}
            </b-button>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
              @click="updatePromotion"
              v-if="isModeEdit"
            >
            <feather-icon
                icon="EditIcon"              
                />
              {{t('Save')}}
            </b-button>
            <b-button @click="close" 
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="reset"
              variant="outline-secondary"
            >
                <feather-icon
                icon="DeleteIcon"              
                /> 
              {{t('Close')}}
            </b-button>
          </b-col> 

          
        </b-row>
      </b-form>
  
      
    </div>
    </b-card-code>
  </Transition>
</template>
  
  <script>
  import BCardCode from '@core/components/b-card-code'
  import {
    BRow, BCol, BFormGroup, BFormInput, BFormCheckbox, BForm, BButton,BFormSelect ,BImg
  } from 'bootstrap-vue'
  import { ref } from '@vue/composition-api'
  import Ripple from 'vue-ripple-directive'
  import formValidation from '@core/comp-functions/forms/form-validation'
  import { mapActions } from "vuex";
  import axios from "axios";

//   import { codeMultipleColumn } from './codemultiplecolumn'
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
  import { useUtils as useI18nUtils } from '@core/libs/i18n'
  
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
    setup(props, { emit })
    {

      const { t } = useI18nUtils();
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
        t,
      }
    },
    data() {
      return {
        // codeMultipleColumn,
        renderComponent: true,
        showTimeInput : false,
      }
    }, 
    model: {      
      event: 'update:is-admin-edit-active',
      promotionTypeSelected : "",
      promotionTypeOptions : [
        { value: null, text: 'Select Promotion Type' },
      ],
      depositTypeSelected : "",
      depositTypeOptions : [
        { value: null, text: 'Select Deposit Type' },
      ],
      bonusTypeSelected : "",
      bonusTypeOptions : [
        { value: null, text: 'Select Bonus Type' },
      ],
      maximumBonusTypeSelected:"",
      maximumBonusTypeOptions : [
        { value: null, text: 'Select Maximum Bonus Type' },
      ],
      turnTypeSelected:"",
      turnTypeOptions : [
        { value: null, text: 'Select Turn Type' },
      ],     
      turnCalTypeSelected:"",
      turnCalTypeOptions : [
        { value: null, text: 'Select Turn Calculate Type' },
      ],     
      turnTypeWithdrawSelected:"",
      turnTypeWithdrawOptions: [
        { value: null, text: 'Select Turn Type Withdraw' },
      ],     
      typeTakeTurnSelected:"",
      typeTakeTurnOptions: [
        { value: null, text: 'Select Type for tak turn' },
      ],        
      statusActive :0,
      titleCard : "",
      
    },
    props: {
        isEditFormActive: {
            type: Boolean,
            required: true,
        },
        isModeEdit:{
          type: Boolean,
          required: true,
        },
        pRowData:{        
            required: false,
        },        
    },    
    watch: 
    {
        pRowData: function(newVal, oldVal) 
        {   
            this.promotionTypeSelected = newVal.Type;     
            this.depositTypeSelected = newVal.DepositType;
            this.bonusTypeSelected = newVal.Rec_type;            
            this.maximumBonusTypeSelected = newVal.LimitType;
            this.turnTypeSelected = newVal.TurnType;
            this.turnCalTypeSelected = newVal.TurnCal;
            this.turnTypeWithdrawSelected = newVal.TurnTypeWithdraw;
            this.statusActive = newVal.status;
            this.typeTakeTurnSelected = newVal.TypeTakeTurn;

            this.pRowData.From = newVal.From? newVal.From:"00:00:00";
            this.pRowData.To = newVal.To? newVal.To:"00:00:00";

            if (this.promotionTypeSelected=='HappyTime') {
              this.showTimeInput = true;
            }
            else
            {
              this.showTimeInput = false;              
            }
            
        },
        isModeEdit: function(newVal, oldVal)
        {              
            if (newVal==true)             
            {              
              this.titleCard = "Promotion Data (Edit)";
            }
            else
            {
              this.titleCard = "Promotion Data (Add)";
            }
        }
    },
    async created() 
    {        
        this.titleCard = "Promotion Data";
        this.promotionTypeOptions = [
            { value: 'NewMember', text: 'New Member' },        
            { value: 'NewDay', text: 'New Day' },        
            { value: 'HappyTime' , text: 'Happy Time' },
            { value: 'CodeFree' , text: 'Code Free' },
            { value: 'Normal' , text: 'Normal' },
        ];
        this.depositTypeOptions = [
            { value: 'Min', text: 'Min' },        
            { value: 'Equal', text: 'Equal' },        
            { value: 'Max' , text: 'Max' },
        ];
        this.bonusTypeOptions = [
            { value: 'unit', text: 'Unit' },        
            { value: 'percent', text: 'Percent' },                    
        ];
        this.maximumBonusTypeOptions = [
            { value: 'DepositWithBonus', text: 'Deposit With Bonus' },        
            { value: 'DepositSumBonus', text: 'Deposit Sum Bonus' },                    
        ];
        this.turnTypeOptions = [
            { value: 'percent', text: 'Percent' },        
            { value: 'unit', text: 'x credit' },
        ];
        this.turnCalTypeOptions = [
            { value: 'credit', text: 'credit' },        
            { value: 'bonus', text: 'bonus' },
            { value: 'credit_bonus', text: 'credit + bonus' },
        ];
        this.turnTypeWithdrawOptions = [
            { value: 'turnover', text: 'turnover' },        
            { value: 'credit', text: 'credit' },            
        ];        

        this.typeTakeTurnOptions = [
            { value: 'ALL', text: 'All' },        
            { value: 'SLOT', text: 'Slot' },            
            { value: 'CASINO', text: 'Casino' },        
            { value: 'SPORT', text: 'Sport' },        
        ];      
        
        
    },    
    methods :{     
        getCurrentTimeString(ctime) {       
          return ctime;
          const ctime2 = new Date(ctime);
          const hours = String(ctime2.getHours()).padStart(2, '0');
          const minutes = String(ctime2.getMinutes()).padStart(2, '0');
          const seconds = String(ctime2.getSeconds()).padStart(2, '0');
          return `${hours}:${minutes}:${seconds}`;
        },  
        close()
        {               
            this.$emit('close-edit-form');
        },
        clearForm()
        {
            console.log("Clear Form");
        },
        async updatePromotion() {        
          //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

          console.log("updatePromotion");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();
          
          var headers = {
              userid: userData.username,
              token: userData.token,
          }

          var body = this.pRowData;

          body.status = this.statusActive?this.statusActive:1;
          body.Type = this.promotionTypeSelected?this.promotionTypeSelected:"Normal";
          body.DepositType = this.depositTypeSelected?this.depositTypeSelected:"Equal";
          body.Rec_type = this.bonusTypeSelected?this.bonusTypeSelected:"unit";
          body.LimitType = this.maximumBonusTypeSelected?this.maximumBonusTypeSelected:"DepositWithBonus";
          body.TurnType = this.turnTypeSelected?this.turnTypeSelected:"unit";
          body.TurnCal = this.turnCalTypeSelected?this.turnCalTypeSelected:"credit";
          body.TurnOver = this.pRowData.TurnOver?this.pRowData.TurnOver:0;
          body.TurnTypeWithdraw = this.turnTypeWithdrawSelected?this.turnTypeWithdrawSelected:"turnover";
          body.TypeTakeTurn = this.typeTakeTurnSelected?this.typeTakeTurnSelected:"ALL";

          // console.log(body);
      
          let response;
          await axios.post("api/promotion/updatepromotionbyid",body,
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
      
          // console.log(response);
          if (response.data.status=="success") 
          {
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

              
          }
          else
          {
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
        changePromotionType()
        {          
          
          if (this.promotionTypeSelected=='HappyTime') {
              this.showTimeInput = true;              
          }
          else
          {
              this.showTimeInput = false;
          }
          
        },
        async insertPromotion() {        
          //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

          console.log("insertPromotion");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();

          var headers = {
              userid: userData.username,
              token: userData.token,
          }
          
          var body = this.pRowData;

          body.status = this.statusActive?this.statusActive:1;
          body.Type = this.promotionTypeSelected?this.promotionTypeSelected:"Normal";
          body.DepositType = this.depositTypeSelected?this.depositTypeSelected:"Equal";
          body.Rec_type = this.bonusTypeSelected?this.bonusTypeSelected:"unit";
          body.LimitType = this.maximumBonusTypeSelected?this.maximumBonusTypeSelected:"DepositWithBonus";
          body.TurnType = this.turnTypeSelected?this.turnTypeSelected:"unit";
          body.TurnCal = this.turnCalTypeSelected?this.turnCalTypeSelected:"credit";
          body.TurnTypeWithdraw = this.turnTypeWithdrawSelected?this.turnTypeWithdrawSelected:"turnover";
          body.TurnOver = this.pRowData.TurnOver?this.pRowData.TurnOver:0;
          body.TypeTakeTurn = this.typeTakeTurnSelected?this.typeTakeTurnSelected:"ALL";
      
          // console.log(body);
      
          let response;
          await axios.post("api/promotion/create",body,
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
      
          // console.log(response);
          if (response.data.status=="success") 
          {
              //
              this.$emit('refetch-data');
              this.close();
          }
          else
          {
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