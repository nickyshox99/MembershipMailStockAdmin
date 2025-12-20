<template>
  <div>
    <b-card no-body>
      <div class="m-2">
        <b-row>
          <b-col cols="2" class="d-flex align-items-center justify-content-start mb-1">
            <b-button variant="primary" @click="loadPersonalEmails">
              <feather-icon icon="SearchIcon" />
              {{ t("Load") }}
            </b-button>
          </b-col>

          <b-col cols="3" md="3" class="d-flex align-items-left justify-content-start mb-1">
            <b-input-group class="input-group-merge">
              <b-input-group-prepend is-text>
                <feather-icon icon="SearchIcon" />
              </b-input-group-prepend>
              <b-form-input
                id="icons-search"
                v-model="searchTerm"
                :placeholder="t('Search')"
              />
            </b-input-group>
            &nbsp;
          </b-col>
        </b-row>
      </div>
    </b-card>

    <b-card :title="t('Personal Email Management')">
      <vue-good-table
        ref="my-table-personal-email"
        :columns="columnsPersonalEmail"
        :rows="rowsPersonalEmail"
        :rtl="direction"
        :line-numbers="true"
        :search-options="{
          enabled: true,
          externalQuery: searchTerm,
        }"
        :pagination-options="{
          enabled: true,
          perPage: pageLength,
        }"
        theme="polar-bear"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field === 'line_name'">
            <div style="font-size: 14px;">
              <b-img
                v-if="props.row.line_profile_url"
                :src="props.row.line_profile_url"
                fluid
                thumbnail
                style="height: 30px; width: 30px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"
              />
              <span style="vertical-align: middle;">{{ props.row.line_display_name || props.row.user_id || '-' }}</span>
            </div>
          </span>

          <span v-if="props.column.field === 'email2'">
            <div style="font-size: 14px;">
              <feather-icon icon="MailIcon" size="16" class="mr-1" />
              <span style="vertical-align: middle; font-weight: 600; color: #007bff;">{{ props.row.email }}</span>
            </div>
          </span>

          <span v-if="props.column.field === 'password2'">
            <div style="font-size: 14px; font-family: monospace; color: #dc3545;">
              {{ props.row.password }}
            </div>
          </span>

          <span v-if="props.column.field === 'status_regis2'">
            <b-badge
              :variant="props.row.status_regis == 1 ? 'light-success' : 'light-danger'"
              pill
              class="text-capitalize"
            >
              {{ props.row.status_regis == 1 ? t('Active') : t('Inactive') }}
            </b-badge>
          </span>

          <span v-if="props.column.field === 'updated_at2'">
            {{ props.row.updated_at ? formatDateAssigned(props.row.updated_at) : '-' }}
          </span>

          <span v-if="props.column.field === 'action'">
            <b-badge
              style="cursor: pointer; width: 100%;margin-right: 2px"
              variant="info"
              @click="viewPersonalEmailDetail(props.row)"
            >
              <feather-icon icon="EyeIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline">{{ t("View") }}</span>
            </b-badge>
            <b-badge
              style="cursor: pointer; width: 100%;margin-right: 2px"
              :variant="props.row.status_regis == 1 ? 'warning' : 'success'"
              @click="togglePersonalEmailStatus(props.row)"
            >
              <feather-icon icon="PowerIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline">{{ props.row.status_regis == 1 ? t('Deactivate') : t('Activate') }}</span>
            </b-badge>

            <b-badge              
              style="cursor: pointer; width: 100%; display: block; text-align: center"
              variant="danger"
              @click="deleteitem(props.row)"
            >
              <feather-icon icon="TrashIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline">{{ t("Delete")}}</span>
            </b-badge>

          </span>


          <span>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>

        <template slot="pagination-bottom" slot-scope="props">
          <div class="d-flex justify-content-between flex-wrap">
            <div class="d-flex align-items-center mb-0 mt-1">
              <span class="text-nowrap">
                {{ t('Showing') + ' 1 ' + t('to') }}
              </span>
              <b-form-select
                v-model="pageLength"
                :options="['10', '20', '50', '100']"
                class="mx-1"
                @input="(value) => props.perPageChanged({ currentPerPage: value })"
              />
              <span class="text-nowrap">
                {{ t('of') }} {{ props.total }} {{ t('entries') }}
              </span>
            </div>
            <div>
              <b-pagination
                :value="1"
                :total-rows="props.total"
                :per-page="pageLength"
                first-number
                last-number
                align="right"
                prev-class="prev-item"
                next-class="next-item"
                class="mt-1 mb-0"
                @input="(value) => props.pageChanged({ currentPage: value })"
              >
                <template #prev-text>
                  <feather-icon icon="ChevronLeftIcon" size="18" />
                </template>
                <template #next-text>
                  <feather-icon icon="ChevronRightIcon" size="18" />
                </template>
              </b-pagination>
            </div>
          </div>
        </template>
      </vue-good-table>
    </b-card>

    <!-- Personal Email Detail Modal -->
    <b-modal
      id="modal-personal-email-detail"
      ref="modalPersonalEmailDetail"
      v-model="showModalPersonalEmailDetail"
      :title="t('Personal Email Information')"
      @show="resetModalPersonalEmailDetail"
      @hidden="resetModalPersonalEmailDetail"
      size="lg"
      :hideHeaderClose="false"
      ok-variant="primary"
      :okTitle="t('Close')"
      buttonSize="sm"
      ok-only
    >
      <div v-if="selectedPersonalEmail" class="personal-email-card">
        <div class="text-center mb-4">
          <feather-icon icon="MailIcon" size="48" class="text-primary mb-2" />
          <h5 class="mb-1">{{ t("Personal Email Account") }}</h5>
          <p class="text-muted">{{ t("Order ID") }}: {{ selectedPersonalEmail.order_id }}</p>
        </div>

        <div class="email-info-container">
          <div class="info-item">
            <div class="info-label">
              <feather-icon icon="HashIcon" size="16" />
              {{ t("ID") }}
            </div>
            <div class="info-value">{{ selectedPersonalEmail.id }}</div>
          </div>

          <div class="info-item" v-if="selectedPersonalEmail.line_display_name || selectedPersonalEmail.line_profile_url">
            <div class="info-label">
              <feather-icon icon="MessageCircleIcon" size="16" />
              {{ t("LINE") }}
            </div>
            <div class="info-value">
              <b-img
                v-if="selectedPersonalEmail.line_profile_url"
                :src="selectedPersonalEmail.line_profile_url"
                fluid
                thumbnail
                style="height: 30px; width: 30px; border-radius: 50%; margin-right: 8px; vertical-align: middle; display: inline-block;"
              />
              <span style="vertical-align: middle;">{{ selectedPersonalEmail.line_display_name || '-' }}</span>
            </div>
          </div>

          <div class="info-item">
            <div class="info-label">
              <feather-icon icon="MailIcon" size="16" />
              {{ t("Email Address") }}
            </div>
            <div class="info-value email-value">{{ selectedPersonalEmail.email }}</div>
          </div>

          <div class="info-item">
            <div class="info-label">
              <feather-icon icon="LockIcon" size="16" />
              {{ t("Password") }}
            </div>
            <div class="info-value password-value">{{ selectedPersonalEmail.password }}</div>
          </div>

          <div class="info-item">
            <div class="info-label">
              <feather-icon icon="UserIcon" size="16" />
              {{ t("User ID") }}
            </div>
            <div class="info-value userid-value">{{ selectedPersonalEmail.user_id }}</div>
          </div>

          <div class="info-item">
            <div class="info-label">
              <feather-icon icon="ShoppingCartIcon" size="16" />
              {{ t("Order ID") }}
            </div>
            <div class="info-value">{{ selectedPersonalEmail.order_id }}</div>
          </div>

          <div class="info-item">
            <div class="info-label">
              <feather-icon icon="ActivityIcon" size="16" />
              {{ t("Status") }}
            </div>
            <div class="info-value">
              <b-badge
                :variant="selectedPersonalEmail.status_regis == 1 ? 'success' : 'danger'"
                pill
                class="status-badge"
              >
                {{ selectedPersonalEmail.status_regis == 1 ? t("Active") : t("Inactive") }}
              </b-badge>
            </div>
          </div>

          <div class="info-item">
            <div class="info-label">
              <feather-icon icon="CalendarIcon" size="16" />
              {{ t("Created At") }}
            </div>
            <div class="info-value">{{ selectedPersonalEmail.created_at ? formatDateAssigned(selectedPersonalEmail.created_at) : '-' }}</div>
          </div>

          <div class="info-item">
            <div class="info-label">
              <feather-icon icon="ClockIcon" size="16" />
              {{ t("Updated At") }}
            </div>
            <div class="info-value">{{ selectedPersonalEmail.updated_at ? formatDateAssigned(selectedPersonalEmail.updated_at) : '-' }}</div>
          </div>
        </div>

        <div class="text-center mt-4">
          <b-button
            variant="outline-primary"
            size="sm"
            @click="copyToClipboard(selectedPersonalEmail.email + '\n' + selectedPersonalEmail.password)"
          >
            <feather-icon icon="CopyIcon" size="14" />
            {{ t("Copy Credentials") }}
          </b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import BCardCode from "@core/components/b-card-code/BCardCode.vue";
import {
  BAvatar,
  BBadge,
  BPagination,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BRow,
  BCol,
  BButton,
  BCard,
  BInputGroup,
  BInputGroupPrepend,
  BModal,
  BCardText,
  BImg,
} from "bootstrap-vue";
import { VueGoodTable } from "vue-good-table";
import store from "@/store/index";
import { mapActions } from "vuex";

import { useUtils as useI18nUtils } from "@core/libs/i18n";

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import axios from 'axios'

export default {
  components: {
    BRow,
    BCol,
    VueGoodTable,
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BButton,
    BCard,
    BInputGroup,
    BInputGroupPrepend,
    BCardCode,
    BModal,
    BCardText,
    BImg,
  },
  setup() {
    const { t } = useI18nUtils();

    const columnsPersonalEmail = [
      {
        label: t('ID'),
        field: 'id',
        width: '5%',
      },
      {
        label: t('Order ID'),
        field: 'order_id',
        width: '8%',
      },
      {
        label: t('LINE'),
        field: 'line_name',
        width: '15%',
      },
      {
        label: t('Email'),
        field: 'email2',
        width: '18%',
      },
      {
        label: t('Password'),
        field: 'password2',
        width: '12%',
      },
      {
        label: t('User ID'),
        field: 'user_id',
        width: '12%',
      },
      {
        label: t('Status'),
        field: 'status_regis2',
        width: '8%',
      },
      {
        label: t('Updated At'),
        field: 'updated_at2',
        width: '12%',
      },
      {
        label: t('Action'),
        field: 'action',
        width: '10%',
      },
    ];

    return {
      t,
      columnsPersonalEmail,
    };
  },
  data() {
    return {
      rowsPersonalEmail: [],
      searchTerm: '',
      pageLength: 10,
      dir: false,
      showModalPersonalEmailDetail: false,
      selectedPersonalEmail: null,
      pagePermission: [],
    };
  },
  computed: {
    direction() {
      if (store.state.appConfig.isRTL) {
        this.dir = true;
        return this.dir;
      }
      this.dir = false;
      return this.dir;
    },
  },
  async created() {
    await this.getPagePermission();
    await this.loadPersonalEmails();
  },
  methods: {
    ...mapActions(["GetPagePermission"]),
    ...mapActions(["UpdatePersonalEmailStatus"]),
    ...mapActions(["GetAllPersonalEmail"]),
    ...mapActions(["GetPersonalEmailByOrderId"]),

    async getPagePermission() {
      console.log("getPagePermission");

      const userData = JSON.parse(localStorage.getItem("userData"));
      const formData = new FormData();

      formData.append("userid", userData.username);
      formData.append("token", userData.token);
      formData.append("admin_id", userData.username);
      formData.append("page_name", this.$route.name);

      const response = await this.GetPagePermission(formData);
      if (response.data.status == "success") {
        this.pagePermission = response.data.data;
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: response.data.message,
            icon: "EditIcon",
            variant: "error",
          },
        });
      }
    },

    async loadPersonalEmails() {
      try {
        console.log('Loading all personal emails');

        const userData = JSON.parse(localStorage.getItem('userData'));
        const form = new FormData();

        form.append("userid", userData.username);
        form.append("token", userData.token);

        const response = await this.GetAllPersonalEmail(form);

        if (response.data.status === 'success') {
          this.rowsPersonalEmail = response.data.data;
          console.log('Personal emails loaded:', this.rowsPersonalEmail.length);

          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Success',
              icon: 'CheckIcon',
              variant: 'success',
              text: `Loaded ${this.rowsPersonalEmail.length} personal emails`,
            },
            autoHideDelay: 2000,
          });
        } else {
          this.rowsPersonalEmail = [];
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Error',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
              text: response.data.message || 'Failed to load personal emails',
            },
            autoHideDelay: 3000,
          });
        }

      } catch (error) {
        console.error('Error loading personal emails:', error);
        this.rowsPersonalEmail = [];

        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Error',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
            text: `Failed to load personal emails: ${error.message}`,
          },
          autoHideDelay: 5000,
        });
      }
    },

    async viewPersonalEmailDetail(personalEmail) {
      try {
        console.log('Loading personal email detail for order ID:', personalEmail.order_id);
        
        // Show loading
        this.selectedPersonalEmail = { ...personalEmail, loading: true };
        this.showModalPersonalEmailDetail = true;
        
        // Fetch detailed data from API
        const userData = JSON.parse(localStorage.getItem('userData'));
        const form = new FormData();

        form.append("userid", userData.username);
        form.append("token", userData.token);
        form.append("orderId", personalEmail.order_id);
        form.append("username", userData.username);

        const response = await this.GetPersonalEmailByOrderId(form);
        
        if (response.data.status === 'success' && response.data.data && response.data.data.length > 0) {
          this.selectedPersonalEmail = response.data.data[0];
          console.log('Personal email detail loaded:', this.selectedPersonalEmail);
        } else {
          console.log('No personal email detail found:', response.data.message);
          this.selectedPersonalEmail = personalEmail; // Fallback to row data
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Warning',
              icon: 'AlertTriangleIcon',
              variant: 'warning',
              text: response.data.message || 'Failed to load detailed information',
            },
            autoHideDelay: 3000,
          });
        }
      } catch (error) {
        console.error('Error loading personal email detail:', error);
        this.selectedPersonalEmail = personalEmail; // Fallback to row data
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Error',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
            text: `Failed to load detail: ${error.message}`,
          },
          autoHideDelay: 5000,
        });
      }
    },

    resetModalPersonalEmailDetail() {
      this.selectedPersonalEmail = null;
    },

    async togglePersonalEmailStatus(personalEmail) {
      try {
        const newStatus = personalEmail.status_regis == 1 ? 0 : 1;
        const statusText = newStatus == 1 ? 'Active' : 'Inactive';

        const confirmed = await this.$bvModal.msgBoxConfirm(
          this.$t(`คุณต้องการเปลี่ยนสถานะเป็น ${statusText} ใช่หรือไม่?`),
          {
            title: this.$t('Please Confirm'),
            size: 'sm',
            buttonSize: 'sm',
            okVariant: newStatus == 1 ? 'success' : 'warning',
            okTitle: 'YES',
            cancelTitle: 'NO',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          }
        );

        if (!confirmed) return;

        const userData = JSON.parse(localStorage.getItem('userData'));
        const form = new FormData();

        form.append("userid", userData.username);
        form.append("token", userData.token);
        form.append("orderId", personalEmail.order_id);
        form.append("status", newStatus);

        const response = await this.UpdatePersonalEmailStatus(form);

        if (response.data.status == "success") {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Update Status',
              icon: 'CheckIcon',
              variant: 'success',
              text: this.$t('Update Status Successful'),
            },
            autoHideDelay: 3000,
          });

          await this.loadPersonalEmails();
        } else {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Update Status',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
              text: this.$t('Update Status Unsuccessful') + ` ${response.data.message}`,
            },
            autoHideDelay: 3000,
          });
        }
      } catch (error) {
        console.error('Error toggling status:', error);
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Error',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
            text: `Failed to update status: ${error.message}`,
          },
          autoHideDelay: 3000,
        });
      }
    },

    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Copied!',
            icon: 'CheckIcon',
            variant: 'success',
            text: 'Credentials copied to clipboard',
          },
          autoHideDelay: 2000,
        });
      } catch (err) {
        console.error('Failed to copy: ', err);
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Error',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
            text: 'Failed to copy credentials',
          },
          autoHideDelay: 3000,
        });
      }
    },

    formatDateAssigned(value) {
      let formattedDate = new Date(value);
      formattedDate = new Date(formattedDate.getTime() - 3600000); // 60 * 60 * 1000 * 1
      return (
        formattedDate.getFullYear() +
        "-" +
        ("0" + (formattedDate.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + formattedDate.getDate()).slice(-2) +
        " " +
        formattedDate.toLocaleTimeString("th-TH", { hour12: false })
      );
    },
    async deleteitem(row) {
      this.boxTwo = '';
      await this.$bvModal.msgBoxConfirm('Please confirm that you want to Delete.', {
        title: this.$t('Please Confirm'),
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {

          if (value) {
            let selectID = [];
            selectID.push(row.id);            
            this.deleteEmail(selectID);

          }

        })
        .catch(err => {

        })
    },
    async deleteEmail(listId) {
      //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

      console.log("deleteEmail");

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      var headers = {
        userid: userData.username,
        token: userData.token,
      }

      var body = {
        listId: listId
      }

      // console.log(body);

      let response;
      await axios.post("api/personalemail/deletePersonalEmail/", body,
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
            title: `Delete`,
            icon: 'PowerIcon',
            variant: 'warning',
            text: `Delete Succesful.`,
          },
          autoHideDelay: 3000,
        });
        this.loadPersonalEmails();

      }
      else {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: `Delete`,
            icon: 'PowerIcon',
            variant: 'danger',
            text: `Delete UnSuccesful ${response.data.message}`,
          },
          autoHideDelay: 3000,
        });
        this.loadPersonalEmails();
      }

    }, 
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-good-table.scss";

// Personal Email Modal Styles
.personal-email-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 24px;
  margin: 16px 0;
  border: 1px solid #e9ecef;
}

.email-info-container {
  .info-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #e9ecef;

    &:last-child {
      border-bottom: none;
    }

    .info-label {
      display: flex;
      align-items: center;
      min-width: 140px;
      font-weight: 600;
      color: #6c757d;
      font-size: 14px;

      svg {
        margin-right: 8px;
        color: #007bff;
      }
    }

    .info-value {
      flex: 1;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 14px;
      color: #495057;

      &.email-value {
        color: #007bff;
        font-weight: 500;
      }

      &.password-value {
        color: #dc3545;
        font-weight: 500;
        letter-spacing: 1px;
      }

      &.userid-value {
        color: #6c757d;
        font-size: 12px;
        word-break: break-all;
      }
    }
  }
}

.status-badge {
  font-size: 12px;
  padding: 4px 12px;
}
</style>

