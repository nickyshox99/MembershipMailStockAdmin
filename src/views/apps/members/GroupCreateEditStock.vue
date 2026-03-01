<template>
  <Transition name="bounce">
    <div>
      <b-row>
        <b-col md="9">
          <b-card-code
            v-if="isEditFormActive"
            id="group-create-edit"
            :title="titleCard"
            @change="(val) => $emit('update:is-edit-form-active', val)"
          >
            <b-form @submit.prevent>
              <b-row>
                <b-col md="6">
                  <b-form-group
                    :label="t('Group Name')"
                    label-for="group_name"
                  >
                    <b-form-input
                      id="group_name"
                      placeholder="Enter group name"
                      v-model="pRowData.group_name"
                      required
                    />
                  </b-form-group>
                </b-col>

                <b-col md="6">
                  <b-form-group
                    :label="t('Subscription Type')"
                    label-for="subscription_type_id"
                  >
                    <b-form-select
                      id="subscription_type_id"
                      v-model="pRowData.subscription_type_id"
                      :options="subscriptionTypeOptions"
                      required
                    />
                  </b-form-group>
                </b-col>

                <b-col md="6">
                  <b-form-group
                    :label="t('Head Email')"
                    label-for="head_email"
                  >
                    <b-form-input
                      id="head_email"
                      placeholder="Enter head email"
                      v-model="pRowData.head_email"
                      type="email"
                      required
                    />
                  </b-form-group>
                </b-col>

                <!-- <b-col md="6">
                  <b-form-group
                    :label="t('Password')"
                    label-for="password"
                  >
                    <b-input-group>
                      <b-form-input
                        :type="showPassword ? 'text' : 'password'"
                        id="password"
                        placeholder="Enter password"
                        v-model="pRowData.password"
                        required
                      />
                      <b-input-group-append>
                        <b-button 
                          :variant="showPassword ? 'outline-info' : 'outline-secondary'"
                          @click="togglePasswordVisibility"
                          type="button"
                        >
                          <feather-icon :icon="showPassword ? 'EyeOffIcon' : 'EyeIcon'" />
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col> -->

                <b-col md="6">
                  <b-form-group
                    :label="t('Status')"
                    label-for="status"
                  >
                    <b-form-select
                      id="status"
                      v-model="pRowData.status"
                      :options="statusOptions"
                      required
                    />
                  </b-form-group>
                </b-col>

                <!-- <b-col md="6">
                  <b-form-group
                    label="link คำเชิญ"
                    label-for="inviteurl"
                  >
                    <b-form-input
                      id="inviteurl"
                      placeholder="Link คำเชิญ"
                      v-model="pRowData.invite_url"
                      type="text"
                      required
                    />
                  </b-form-group>
                </b-col> -->

                <b-col md="12">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="submit"
                    variant="primary"
                    class="mr-1"
                    @click="saveGroup"
                    :disabled="!isFormValid"
                  >
                    <feather-icon icon="SaveIcon" />
                    {{ t("Save") }}
                  </b-button>
                  
                  <b-button
                    @click="close"
                    v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                    type="reset"
                    variant="outline-secondary"
                  >
                    <feather-icon icon="XIcon" />
                    {{ t("Cancel") }}
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-card-code>
        </b-col>
      </b-row>
    </div>
  </Transition>
</template>

<script>
import BCardCode from "@core/components/b-card-code";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BButton,
  BFormSelect,
  BInputGroup,
  BInputGroupAppend,
} from "bootstrap-vue";
import { ref } from "@vue/composition-api";

import Ripple from "vue-ripple-directive";

import store from '@/store/index';
import { mapActions } from "vuex";
import axios from "axios";

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { useUtils as useI18nUtils } from "@core/libs/i18n";

export default {
  components: {
    BCardCode,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    BFormSelect,
    BInputGroup,
    BInputGroupAppend,
  },
  directives: {
    Ripple,
  },
  setup(props, { emit }) {
    const { t } = useI18nUtils();
    
    return {
      t,
    };
  },
  data() {
    return {
      showPassword: false,
      subscriptionTypeOptions: [
        { value: 1, text: 'Youtube Premium' },
        { value: 2, text: 'Netflix' },
        { value: 3, text: 'Viu' },
        { value: 4, text: 'WeTV' },
      ],
      statusOptions: [
        { value: 1, text: 'Active' },
        { value: 0, text: 'Inactive' },
      ],
    };
  },
  computed: {
    titleCard() {
      return this.isModeEdit ? this.$t("Edit Group") : this.$t("Create New Group");
    },
    isFormValid() {
      return this.pRowData.group_name && 
             this.pRowData.subscription_type_id && 
             this.pRowData.head_email 
    }
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
      default: () => ({})
    },
  },
  methods: {
    ...mapActions(["GetPagePermission"]),
    
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    
    close() {
      this.$emit("refetch-data");
      this.$emit("close-edit-form");
    },
    
    async saveGroup() {
      console.log('saveGroup');
      
      // Validate form
      if (!this.isFormValid) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Please fill in all required fields',
            icon: 'AlertTriangleIcon',
            variant: 'warning',
          },
        });
        return;
      }
      
      const userData = JSON.parse(localStorage.getItem('userData'));
      
      var headers = {
        userid: userData.username,
        token: userData.token,
      }

      var body = {
        group_name: this.pRowData.group_name,
        subscription_type_id: this.pRowData.subscription_type_id,
        head_email: this.pRowData.head_email,
        password: this.pRowData.password,
        status: this.pRowData.status,
        page_name: this.$route.name,
        invite_url: this.invite_url,
      }

      let response;
      try {
        if (this.isModeEdit) {
          // Update existing group
          body.id = this.pRowData.id;
          response = await axios.post("api/subscriptiongroup/updateStockById/", body, {
            headers: {            
              'Content-Type': 'application/json',
              'userid': headers.userid,
              'token': headers.token,
            }
          });
        } else {
          // Create new group
          response = await axios.post("api/subscriptiongroup/createstock/", body, {
            headers: {            
              'Content-Type': 'application/json',
              'userid': headers.userid,
              'token': headers.token,
            }
          });
        }
        
        if (response.data.status == 'success') {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success',
              icon: 'CheckIcon',
              variant: 'success',
              text: this.isModeEdit ? 'Group updated successfully' : 'Group created successfully',
            },
            autoHideDelay: 3000,
          });
          
          this.close();
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: response.data.message || 'Error',
              icon: 'AlertTriangleIcon',
              variant: 'error',
            },
          });
        }
      } catch (error) {
        console.error('Error saving group:', error);
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Error',
            icon: 'AlertTriangleIcon',
            variant: 'error',
            text: 'Failed to save group. Please try again.',
          },
        });
      }
    },
  },
};
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
