<template>
  <Transition name="bounce">
    <b-card-code
        v-if="isEditFormActive"
      id="agent-edit"
      :title="titleCard"
      @hidden="resetForm"
      @change="(val) => $emit('update:is-agent-edit-active', val)"
    >
    <div>
        
      <b-form @submit.prevent >        
        <b-row style="justify-content: space-between!important;">
        
          <b-col md="6">
            <b-form-group              
              :label="t('Agent')"
              label-for="agent"
            >
              <b-form-input
                id="agent"
                placeholder="Agent001"
                v-model="agent"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group              
              :label="t('Username')"
              label-for="agent-username"
            >
              <b-form-input
                id="agent-username"
                placeholder="username001"
                v-model="agentUsername"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group              
              :label="t('Password')"
              label-for="agent-password"
            >
              <b-form-input
                id="agent-password"
                placeholder="password"
                v-model="agentPassword"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group              
              :label="t('Prefix')"
              label-for="agent-prefix"
            >
              <b-form-input
                id="agent-prefix"
                placeholder="prefix"
                v-model="agentPrefix"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              label="End Point API"
              label-for="end-point-api"
            >
              <b-form-input
                id="end-point-api"
                placeholder="https://test.ambsuperapi.com/"
                v-model="endPointAPI"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              label="End Point Game"
              label-for="end-point-game"
            >
              <b-form-input
                id="end-point-game"
                placeholder="https://www.777beer.com/"
                v-model="endPointGame"
              />
            </b-form-group>
          </b-col>

          

          <b-col md="6">
            <b-form-group              
              :label="t('Digit Random')"
              label-for="id-random"
            >
              <b-form-input
                id="id-random"
                placeholder="5"
                v-model="idRandom"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group              
              :label="t('Setting Register')"
              label-for="setting-register"
            >
              <b-form-input
                id="setting-register"
                placeholder="{}"
                v-model="settingRegister"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group              
              :label="t('Parent')"
              label-for="parent"
            >
              <b-form-input
                id="parent"
                placeholder="81dc9bdb52d04dc20036dbd8313ed055"
                v-model="parent"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group              
              :label="t('Meta Data')"
              label-for="meta-data"
            >
              <b-form-input
                id="meta-data"
                placeholder="{}"
                v-model="metaData"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group              
              :label="t('Line Token')"
              label-for="line-token"
            >
              <b-form-input
                id="line-token"
                placeholder="{}"
                v-model="lineToken"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group              
              :label="t('Agent Brand')"
              label-for="agent-brand"
            >
              <b-form-select v-model="agentBrandSelected" :options="agentBrandOptions"></b-form-select>
            </b-form-group>
          </b-col>
          
          

          <b-col md="1">
            <b-form-group
              :label="t('Status')"
              label-for="agent-status"
            >
            <b-form-checkbox
                id="agent-status"
                name="agent-status"                
                v-model="agentStatus"
                value="1"
                unchecked-value="0"
              >
                {{t('On')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>

          <b-col cols="1">

          </b-col>
          <b-col cols="1">

          </b-col>
        
          
          <b-col cols="1">

          </b-col>

          <b-col cols="1">

          </b-col>

          <b-col cols="1">

          </b-col>
  
          <!-- submit and reset -->
          <b-col>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
              @click="insertAgent"
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
              @click="updateAgent"
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
  
      <!-- <template #code>
        {{ codeMultipleColumn }}
      </template> -->
    </div>
    </b-card-code>
  </Transition>
</template>
  
  <script>
  import BCardCode from '@core/components/b-card-code'
  import {
    BRow, BCol, BFormGroup, BFormInput, BFormCheckbox, BForm, BButton,BFormSelect
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
    },
    directives: {
      Ripple,
    },
    setup(props, { emit })
    {
        const { t } = useI18nUtils();
        const blankData = {        
          agent: '',        
          username: '',        
          password: '',        
          prefix: '',        
          end_point_api: '',        
          end_point_game: '',        
          setting_register: '',        
          id_random: 5,        
          status: 1,
          meta_data: '',
          line_token: '',        
        };

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
      event: 'update:is-agent-edit-active',     
      agent:'',
      agentPrefix:'',
      agentUsername:'',
      agentPassword:'',
      endPointAPI:'',
      endPointGame:'',
      settingRegister:'',
      metaData:'',
      lineToken:'',      
      parent:'',      
      agentStatus :0,
      idRandom:5,
      titleCard : "",
      agentBrandOptions:[],
      agentBrandSelected:"",
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

            
            this.agent = newVal.agent?newVal.agent:"";
            this.agentPrefix = newVal.prefix?newVal.prefix:"";            
            this.agentUsername = newVal.username?newVal.username:"";
            this.agentPassword = newVal.password?newVal.password:"";
            this.endPointAPI = newVal.end_point_api?newVal.end_point_api:"";
            this.endPointGame = newVal.end_point_game?newVal.end_point_game:"";
            this.settingRegister = newVal.setting_register?newVal.setting_register:"";
            this.metaData = newVal.meta_data?newVal.meta_data:"";
            this.lineToken = newVal.line_token?newVal.line_token:"";
            this.parent = newVal.parent?newVal.parent:"";
            this.idRandom = newVal.id_random?newVal.id_random:"";
            
            this.agentStatus = newVal.status?newVal.status:0;
            this.agentBrandSelected = newVal.agent_brand?newVal.agent_brand:"SUPERAPISEAMLESS";

        },
        isModeEdit: function(newVal, oldVal)
        {
            if (newVal==true) 
            {
              this.titleCard = "Agent Data (Edit)";
            }
            else
            {
              this.titleCard = "Agent Data (Add)";
            }
        }
    },
    async created() {
        this.titleCard = "";

        this.agentBrandOptions = [
            { value: 'SUPERAPISEAMLESS', text: 'SUPERAPISEAMLESS' },        
            { value: 'SUPERAPISEAMLESSTF', text: 'SUPERAPISEAMLESSTF' },      
            { value: 'BETFLIX', text: 'BETFLIX' },        
            { value: 'UFA' , text: 'UFA' },        
            { value: 'SUPERAPITRANSFER' , text: 'SUPERAPITRANSFER' },        
            { value: 'PGSOFTLOCKTRANSFER' , text: 'PGSOFTLOCKTRANSFER' },        
            
        ];

    },    
    methods :{        
        close()
        {               
            this.$emit('close-edit-form');
        },
        clearForm()
        {
            console.log("Clear Form");
        },
        async updateAgent() {        
          //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

          console.log("updateAgent");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();
          
          var headers = {
              userid: userData.username,
              token: userData.token,
          }

          var body = {              
              
              id : this.pRowData.id,
              agent : this.agent?this.agent:'-',
              prefix : this.agentPrefix?this.agentPrefix:'-',
              username : this.agentUsername?this.agentUsername:'-',
              password : this.agentPassword?this.agentPassword:'-',
              end_point_api : this.endPointAPI?this.endPointAPI:'-',
              end_point_game : this.endPointGame?this.endPointGame:'-',
              setting_register : this.settingRegister?this.settingRegister:'-',
              meta_data : this.metaData?this.metaData:'-',
              line_token : this.lineToken?this.lineToken:'-',
              parent : this.parent?this.parent:'-',
              id_random : this.idRandom?this.idRandom:'-',
              status : this.agentStatus?this.agentStatus:0,
              agent_brand : this.agentBrandSelected?this.agentBrandSelected:'SUPERAPISEAMLESS',
          }
      
          // console.log(body);
      
          let response;
          await axios.post("api/agent/updateagentbyid",body,
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
        async insertAgent() {        
          //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

          console.log("insertAgent");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const formData = new FormData();

          var headers = {
              userid: userData.username,
              token: userData.token,
          }
          
          var body = {
              id : this.pRowData.id,
              agent : this.agent?this.agent:'-',
              prefix : this.agentPrefix?this.agentPrefix:'-',
              username : this.agentUsername?this.agentUsername:'-',
              password : this.agentPassword?this.agentPassword:'-',
              end_point_api : this.endPointAPI?this.endPointAPI:'-',
              end_point_game : this.endPointGame?this.endPointGame:'-',
              setting_register : this.settingRegister?this.settingRegister:'-',
              meta_data : this.metaData?this.metaData:'-',
              line_token : this.lineToken?this.lineToken:'-',
              parent : this.parent?this.parent:'-',
              id_random : this.idRandom?this.idRandom:'-',
              status : this.agentStatus?this.agentStatus:0,
              agent_brand : this.agentBrandSelected?this.agentBrandSelected:'SUPERAPISEAMLESS',
          }
      
          // console.log(body);
      
          let response;
          await axios.post("api/agent/create",body,
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