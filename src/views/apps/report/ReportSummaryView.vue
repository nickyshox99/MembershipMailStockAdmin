<template>

    <b-sidebar 
      id="report-summary-view" 
      :visible="isAddNewUserSidebarActive"
      bg-variant="white"
      sidebar-class="sidebar-lg"
      shadow
      backdrop
      no-header
      right
      @hidden="resetForm"
      @change="(val) => $emit('update:is-report-summary-view-active', val)"
    >
      <template #default="{ hide }">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
          <h5 class="mb-0">
            Add New User
          </h5>
  
          <feather-icon
            class="ml-1 cursor-pointer"
            icon="XIcon"
            size="16"
            @click="hide"
          />
  
        </div>
  
        <!-- BODY -->
        <validation-observer
          #default="{ handleSubmit }"
          ref="refFormObserver"
        >
          <!-- Form -->
          <b-form
            class="p-2"
            @submit.prevent="handleSubmit(onSubmit)"
            @reset.prevent="resetForm"
          >
  
            <!-- Date -->
            <validation-provider
              #default="validationContext"
              name="Date"
              rules="required"
            >
              <b-form-group
                label="Date"
                label-for="date"
              >
                <b-form-input
                  id="date"
                  v-model="pRowData.date"
                  autofocus
                  :state="getValidationState(validationContext)"
                  trim
                  placeholder="John Doe"
                />
  
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
  
            <!-- Username -->
            <validation-provider
              #default="validationContext"
              name="Username"
              rules="required|alpha-num"
            >
              <b-form-group
                label="Username"
                label-for="username"
              >
                <b-form-input
                  id="username"
                  v-model="pRowData.username"
                  :state="getValidationState(validationContext)"
                  trim
                />
  
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

             <!-- Username -->
             <validation-provider
              #default="validationContext"
              name="Username"
              rules="required|alpha-num"
            >
              <b-form-group
                label="Username"
                label-for="username"
              >
                <b-form-input
                  id="username"
                  v-model="pRowData.credit"
                  :state="getValidationState(validationContext)"
                  trim
                />
  
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- Username -->
            <validation-provider
              #default="validationContext"
              name="Username"
              rules="required|alpha-num"
            >
              <b-form-group
                label="Username"
                label-for="username"
              >
                <b-form-input
                  id="username"
                  v-model="pRowData.credit_bonus"
                  :state="getValidationState(validationContext)"
                  trim
                />
  
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
  
            <!-- Form Actions -->
            <div class="d-flex mt-2">
              <!-- <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mr-2"
                type="submit"
              >
                Add
              </b-button> -->
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="button"
                variant="outline-secondary"
                @click="hide"
              >
                Close
              </b-button>
            </div>
  
          </b-form>
        </validation-observer>
      </template>
    </b-sidebar>
  </template>
  
  <script>
  import {
    BSidebar, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
  } from 'bootstrap-vue'
  import { ValidationProvider, ValidationObserver } from 'vee-validate'
  import { ref } from '@vue/composition-api'
  import { required, alphaNum, email } from '@validations'
  import formValidation from '@core/comp-functions/forms/form-validation'
  import Ripple from 'vue-ripple-directive'
  import vSelect from 'vue-select'
  import countries from '@/@fake-db/data/other/countries'
  import store from '@/store'
  
  export default {
    components: {
      BSidebar,
      BForm,
      BFormGroup,
      BFormInput,
      BFormInvalidFeedback,
      BButton,
      vSelect,
  
      // Form Validation
      ValidationProvider,
      ValidationObserver,
    },
    directives: {
      Ripple,
    },
    model: {
      prop: 'isAddNewUserSidebarActive',
      event: 'update:is-report-summary-view-active',
    },    
    props: {
        isAddNewUserSidebarActive: {
        type: Boolean,
        required: true,
        },
        pRowData:{        
        required: false,
        },
    },
    data() {
      return {
        required,
        alphaNum,
        email,
        countries,        
      }
    },
    setup(props, { emit }) {
      const blankData = {
        credit: 0.00,
        credit_bonus: 0.00,
        date: null,
        username: '',        
      }

      let tmpData = ref(JSON.parse(JSON.stringify(blankData)))
      const resetuserData = () => {
        tmpData = JSON.parse(JSON.stringify(blankData))
      }
  
      const onSubmit = () => {
        store.dispatch('app-user/addUser', tmpData)
          .then(() => {
            emit('refetch-data')
            emit('update:is-report-summary-view-active', false)
          })
      }
  
      const {
        refFormObserver,
        getValidationState,
        resetForm,
      } = formValidation(resetuserData)
  
      return {
        tmpData,
        onSubmit,  
        refFormObserver,
        getValidationState,
        resetForm,
      }
    },
  }
  </script>
  
  <style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  
  #report-deposit-view {
    .vs__dropdown-menu {
      max-height: 200px !important;
    }
  }
  </style>
  