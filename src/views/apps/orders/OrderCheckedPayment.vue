<template>
  <div>
    <b-card no-body>
      <div class="m-2">
        <b-row>
          <b-col cols="2" class="d-flex align-items-center justify-content-start mb-1">
            <b-button variant="primary" @click="search">
              <feather-icon icon="SearchIcon" />
              {{ t("Load") }}
            </b-button>
          </b-col>

          <b-col cols="3" md="3" class="d-flex align-items-left justify-content-start mb-1">
            <b-input-group class="input-group-merge">
              <b-input-group-prepend is-text>
                <feather-icon icon="SearchIcon" />
              </b-input-group-prepend>
              <b-form-input id="icons-search" v-model="searchTerm" :placeholder="t('Search')" />
            </b-input-group>
            &nbsp;
          </b-col>

          <b-col cols="6" md="3" class="d-flex align-items-left justify-content-start mb-1">
          </b-col>
        </b-row>
      </div>
    </b-card>

    <b-card :title="t('Checked Payment')">

      <vue-good-table ref="my-table-order-history" :columns="columnsOrderHistory" :rows="rowsOrderHistory"
        :rtl="directionOrderHistory" :line-numbers="true" 
        :sort-options="{
          enabled: true,
          initialSortBy: {
            field: 'create_date2',
            type: 'desc', // 'asc' | 'desc'
          },
        }"
        :search-options="{
          enabled: true,
          externalQuery: searchTerm,
          searchFn: searchOnTable,
        }"
        :select-options="{
          enabled: false,
          selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
          selectionInfoClass: 'custom-class',
          selectionText: 'rows selected',
          clearSelectionText: 'clear',
          disableSelectInfo: true, // disable the select info panel on top
          selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
          
        }" :pagination-options="{
          enabled: true,
          perPage: pageLengthOrderHistory,
        }" theme="polar-bear">
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field === 'type_purchase'">
            <b-badge :variant="getPurchaseTypeVariant(props.row.purchase_type)" class="text-capitalize">
              {{ getPurchaseTypeLabel(props.row.purchase_type) }}
            </b-badge>
            <div v-if="props.row.purchase_type === 'personal' || props.row.purchase_type === 'email'">
              <br />
              <b-badge v-if="props.row.personal_email_status === 0" pill variant="light-danger"
                class="text-capitalize mt-1" style="font-size: 10px;">
                ยังไม่ได้สมัครสมาชิก
              </b-badge>
              <b-badge v-if="props.row.personal_email_status === 1" pill variant="light-success"
                class="text-capitalize mt-1" style="font-size: 10px;">
                สมัครสมาชิกแล้ว
              </b-badge>
            </div>
          </span>
          <span v-if="props.column.field === 'line_name'">
            <div style="font-size: 14px;">
              <b-img v-if="props.row.line_profile_url" :src="props.row.line_profile_url" fluid thumbnail
                style="height: 30px; width: 30px; border-radius: 50%; margin-right: 8px; vertical-align: middle;" />
              <span style="vertical-align: middle;">{{ props.row.line_display_name || props.row.line_user_id || '-'
                }}</span>
            </div>
          </span>
          <span v-if="props.column.field === 'subscription_img2'">

            <div style="font-size: 14px; color: gray">
              <b-img :src="props.row.subscription_img" fluid thumbnail style="height: 30px" />
              {{ props.row.product_name }}
            </div>
          </span>

          <span v-if="props.column.field === 'create_date2'">
            {{
              props.row.create_date != null
                ? formatDateAssigned2(props.row.create_date)
                : ""
            }}
          </span>

          <span v-if="props.column.field === 'end_date2'" style="cursor: pointer;" @click="showModalChangeDate(props.row)">
            {{
              props.row.end_date != null
                ? formatDateAssigned(props.row.end_date)
                : ""
            }}
          </span>

          <span v-if="props.column.field === 'slip_file_at2'">
            {{
              props.row.create_date != null
                ? formatDateAssigned2(props.row.slip_file_at)
                : ""
            }}
          </span>
          <span v-if="props.column.field === 'slip'">
            <b-img v-if="props.row.slip_file_url && props.row.slip_file_url !== '' && props.row.slip_file_url !== null"
              @click="showImage(props.row)" :src="getSlipImageUrl(props.row.slip_file_url)" fluid thumbnail
              style="cursor: pointer; height: 100px" @error="handleImageError" />
            <div v-else style="color: #6c757d; font-style: italic;">
              ไม่มีรูป slip
            </div>
            <div style="font-size: 14px;">
              {{
                props.row.slip_file_at != null
                  ? formatDateAssigned(props.row.slip_file_at)
                  : ""
              }}
            </div>
          </span>

          <span v-if="props.column.field === 'approved'">
            <b-badge v-if="
              props.row.slip_correct == 1
            " pill :variant="`light-success`" class="text-capitalize">
              {{ t("Correct Slip") }}
              {{
                props.row.slip_file_at != null
                  ? formatDateAssigned(props.row.slip_file_at)
                  : ""
              }}ทน
            </b-badge>
            <b-badge v-if="
              props.row.slip_correct == 0
            " pill :variant="`light-danger`" class="text-capitalize">
              {{ t("Incorrect Slip") }}
              {{
                props.row.slip_file_at != null
                  ? formatDateAssigned(props.row.slip_file_at)
                  : ""
              }}
            </b-badge>
            <b-badge v-if="
              props.row.wait_check_payment == 1
            " pill :variant="`light-info`" class="text-capitalize">
              <feather-icon icon="ClockIcon" size="16" class="mr-0 mr-sm-50" />
              {{ t('Wait Admin Verify') }}
            </b-badge>

          </span>

          <span>
            {{ props.formattedRow[props.column.field] }}
          </span>

          <span v-if="props.column.field === 'action'">
            <b-badge v-if="props.row.slip_correct == 0 || props.row.slip_correct == 1"
              style="cursor: pointer; margin-right: 2px; min-width: 100px; display: inline-block; margin-bottom: 2px"
              variant="info" @click="inspectData(props.row)">
              <feather-icon icon="SearchIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline">{{ t("Information") }}</span>
            </b-badge>

            <!-- ปุ่ม Personal/Email -->
            <b-badge v-if="props.row.purchase_type === 'personal' || props.row.purchase_type === 'email'"
              style="cursor: pointer; margin-right: 2px; min-width: 100px; display: inline-block; margin-bottom: 2px"
              variant="primary" @click="handlePersonalAction(props.row)">
              <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline">{{ props.row.purchase_type === 'email' ? t("Email") : t("Personal") }}</span>
            </b-badge>

            <!-- ปุ่ม Update Status (สำหรับ personal และ email) -->
            <b-badge v-if="props.row.purchase_type === 'personal' || props.row.purchase_type === 'email'"
              style="cursor: pointer; margin-right: 2px; min-width: 100px; display: inline-block; margin-bottom: 2px"
              :variant="props.row.personal_email_status === 1 ? 'success' : 'warning'" 
              @click="updateEmailStatus(props.row)">
              <feather-icon icon="EditIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline">{{ props.row.personal_email_status === 1 ? t("Active") : t("Inactive") }}</span>
            </b-badge>

                    
            <b-badge v-if="props.row.purchase_type === 'personal' || props.row.purchase_type === 'email'"
              :style="{
                cursor: props.row.personal_email_status === 1 || props.row.status_regis==1 ? 'pointer' : 'not-allowed',
                marginRight: '2px',
                minWidth: '100px',
                display: 'inline-block',
                marginBottom: '2px',
                opacity: props.row.personal_email_status === 1  ? '1' : '0.5'
              }"
              :variant="props.row.personal_email_status === 1  ? 'success' : 'secondary'" 
              @click="props.row.personal_email_status === 1 ? sendEmailPassword(props.row) : null">
              <feather-icon icon="SendIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline">{{ t("Send Code") }}</span>
            </b-badge>

            <b-badge v-if="props.row.purchase_type === 'personal' || props.row.purchase_type === 'email'" 
              style="cursor: pointer; margin-right: 2px; min-width: 100px; display: inline-block; margin-bottom: 2px"
              variant="success" 
              @click="renewOrder(props.row)">
              <feather-icon icon="EditIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline"> {{ t("Renew")}}</span>
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
        </template>

        <template slot="pagination-bottom" slot-scope="props">
          <div class="d-flex justify-content-between flex-wrap">
            <div class="d-flex align-items-center mb-0 mt-1">
              <span class="text-nowrap">
                {{ t("Showing") + " 1 " + t("to") }}
              </span>
              <b-form-select v-model="pageLengthOrderHistory" :options="['3', '5', '10', '20', '50', '100']"
                class="mx-1" @input="
                  (value) => props.perPageChanged({ currentPerPage: value })
                " />
              <span class="text-nowrap">
                {{ t("of") }} {{ props.total }} {{ t("entries") }}
              </span>
            </div>
            <div>
              <b-pagination :value="1" :total-rows="props.total" :per-page="pageLengthOrderHistory" first-number
                last-number align="right" prev-class="prev-item" next-class="next-item" class="mt-1 mb-0"
                @input="(value) => props.pageChanged({ currentPage: value })">
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

      <br />


    </b-card>


    <b-modal id="modal-approve" ref="modalApprove" v-model="showModalApprove"
      :title="t('Please confirm that you want to approve')" @show="resetModalApprove" @hidden="resetModalApprove"
      @ok="handleOkApprove" size="sm" :hideHeaderClose="false" ok-variant="success" :okTitle="t('YES')" buttonSize="sm"
      :cancelTitle="t('NO')" footerClass="p-2">

      <b-row>
        <b-col md="12">
          <b-form-group :label="t('Note')" label-for="approve-note-input">

            <b-form-textarea id="approve-note-input" v-model="approveNoteInput" rows="3" max-rows="6"></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal id="modal-reject" ref="modalReject" v-model="showModalReject"
      :title="t('Please confirm that you want to reject')" @show="resetModalReject" @hidden="resetModalReject"
      @ok="handleOkReject" size="sm" :hideHeaderClose="false" ok-variant="danger" :okTitle="t('YES')" buttonSize="sm"
      :cancelTitle="t('NO')" footerClass="p-2">
      <b-row>
        <b-col md="12">
          <b-form-group :label="t('Note')" label-for="cancel-note-input">

            <b-form-textarea id="cancel-note-input" v-model="cancelNoteInput" rows="3" max-rows="6"></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal id="modal-cancel" ref="modalCancel" v-model="showModalCancel"
      :title="t('Please confirm that you want to cancel')" @show="resetModalCancel" @hidden="resetModalCancel"
      @ok="handleOkCancel" size="sm" :hideHeaderClose="false" ok-variant="success" :okTitle="t('YES')" buttonSize="sm"
      :cancelTitle="t('NO')" footerClass="p-2">

      <b-row>
        <b-col md="12">
          <b-form-group :label="t('Note')" label-for="cancel-note-input">

            <b-form-textarea id="cancel-note-input" v-model="cancelNoteInput" rows="3" max-rows="6"></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal id="modal-note" ref="modalNote" v-model="showModalNote" :title="t('Note')" @show="resetModalNote"
      @hidden="resetModalNote" @ok="handleOkNote" size="sm" :hideHeaderClose="false" ok-variant="success"
      :okTitle="t('Ok')" buttonSize="sm" hide-footer>

      <b-row>
        <b-col md="12">
          <b-form-group :label="t('Note')" label-for="cancel-note-input">

            <b-form-textarea id="cancel-note-input" v-model="cancelNoteInput" rows="3" max-rows="6"></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal id="modal-image" ref="modalImage" v-model="showModalImage" :title="t('Slip')" @show="resetModalImage"
      @hidden="resetModalImage" @ok="handleOkImage" @cancel="handleCancelImage" size="md" :hideHeaderClose="false"
      ok-variant="success" :okTitle="t('Correct Slip')" buttonSize="sm" :cancelTitle="t('Incorrect Slip')"
      cancel-variant="danger" hide-footer>
      <b-row>
        <b-col md="12">
          <b-form-group label-for="cancel-note-input">
            <img :src="getSlipImageUrl(imageModal)" style="min-width: 300px;max-width: 300px; max-height: 600px;"
              @error="handleImageError" />

          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <b-badge v-if="
            selectImageData.slip_correct == 1
          " pill :variant="`light-success`" class="text-capitalize">
            {{ t("Correct Slip") }}
            {{
              selectImageData.slip_file_at != null
                ? formatDateAssigned2(selectImageData.slip_file_at)
                : ""
            }}
          </b-badge>
          <b-badge v-if="
            selectImageData.slip_correct == 0
          " pill :variant="`light-danger`" class="text-capitalize">
            {{ t("Incorrect Slip") }}
            {{
              selectImageData.slip_file_at != null
                ? formatDateAssigned(selectImageData.slip_file_at)
                : ""
            }}
            {{
              selectImageData.check_slip_by
            }}
          </b-badge>
        </b-col>
      </b-row>

    </b-modal>

    
    <b-modal id="modal-personal-email" ref="modalPersonalEmail" v-model="showModalPersonalEmail"
      :title="t('Personal Email Information')" @show="resetModalPersonalEmail" @hidden="resetModalPersonalEmail"
      @ok="handleOkPersonalEmail" size="lg" :hideHeaderClose="false" ok-variant="primary" :okTitle="t('Close')"
      buttonSize="sm" hide-footer>
      <div v-if="loadingPersonalEmail" class="text-center">
        <b-spinner variant="primary" label="Loading..."></b-spinner>
        <p class="mt-2">{{ t("Loading...") }}</p>
      </div>

      <div v-else-if="personalEmailData && personalEmailData.length > 0">
        <div v-for="email in personalEmailData" :key="email.id" class="personal-email-card">
          <div class="text-center mb-4">
            <feather-icon icon="MailIcon" size="48" class="text-primary mb-2" />
            <h5 class="mb-1">{{ t("Email Account") }}</h5>
            <p class="text-muted">{{ t("Order ID") }}: {{ email.order_id }}</p>
          </div>

          <div class="email-info-container">
            <div class="info-item">
              <div class="info-label">
                <feather-icon icon="MailIcon" size="16" />
                {{ t("Email Address") }} : 
              </div>
              <div class="info-value email-value">{{ email.email }}</div>
            </div>

            <div class="info-item" v-if="loadPurchaseType=='personal'">
              <div class="info-label">
                <feather-icon icon="LockIcon" size="16" />
                {{ t("Password") }} :  
              </div>
              <div class="info-value password-value">{{ email.password }}</div>
            </div>

            <div class="info-item" v-if="loadPurchaseType!='personal'">
              <div class="info-label">
                <feather-icon icon="LockIcon" size="16" />
                กลุ่มผู้ใช้งาน : 
              </div>
              <div class="info-value password-value"> {{ personalEmailData.group_name }}</div>
            </div>

            <div class="info-item">
              <div class="info-label">
                <feather-icon icon="UserIcon" size="16" />
                {{ t("User ID") }} : 
              </div>
              <div class="info-value userid-value">{{ email.user_id }}</div>
            </div>

            <div class="info-item">
              <div class="info-label">
                <feather-icon icon="ActivityIcon" size="16" />
                {{ t("Status") }}
              </div>
              <div class="info-value">
                <b-badge :variant="email.status_regis == 1 ? 'success' : 'danger'" pill class="status-badge">
                  {{ email.status_regis == 1 ? t("Active") : t("Inactive") }}
                </b-badge>
              </div>
            </div>
          </div>

          <div class="text-center mt-4">
            <b-button variant="outline-primary" size="sm" @click="copyToClipboard(email.email + '\n' + email.password)">
              <feather-icon icon="CopyIcon" size="14" />
              {{ t("Copy Credentials") }}
            </b-button>
          </div>
        </div>
      </div>

      <div v-else class="text-center">
        <p class="text-muted">{{ t("No personal email data found for this order") }}</p>
      </div>
    </b-modal>

    <b-modal id="modal-change-date" ref="modalChangeDate" v-model="showChangeDate"
      :title="t('End Date')" @show="resetModalChangeDate" @hidden="resetModalChangeDate"
      @ok="handleOkChangeDate" size="sm" :hideHeaderClose="false" ok-variant="primary" :okTitle="t('Save')"
      :cancelTitle="t('Cancel')" 
      buttonSize="sm" >
     
      <div >        
        
          <div class="end-date">
            <div class="info-item">
              <div class="info-label">
                <feather-icon icon="CalendarIcon" size="16" />
                {{ t("End date") }} : 
              </div>
              <div class="">
                <b-form-datepicker id="endDate" v-model="selectChangeDate.end_date" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="th"></b-form-datepicker>
              </div>
            </div>
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
  BDropdown,
  BDropdownItem,
  BRow,
  BCol,
  BButton,
  BFormDatepicker,
  BCard,
  BInputGroup,
  BInputGroupPrepend,
  BModal,
  BImg,
  BFormTextarea,
  BMedia,
  BLink,
} from "bootstrap-vue";
import { VueGoodTable } from "vue-good-table";
import store from "@/store/index";
import { mapActions } from "vuex";
import axios from 'axios'

import { useUtils as useI18nUtils } from "@core/libs/i18n";

import { ref, onUnmounted } from "@vue/composition-api";

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import LoanInformation from "../loan/LoanInformation.vue";
import LoanAssignStaff from "../loan/LoanAssignStaff.vue";
import LoanKeyPayment from "../loan/LoanKeyPayment.vue";
import LoanKeyFine from "../loan/LoanKeyFine.vue";
import LoanForwardPayment from "../loan/LoanForwardPayment.vue";
import LoanTotalPayment from "../loan/LoanTotalPayment.vue";
import { imageOverlay } from "leaflet";

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
    BDropdown,
    BDropdownItem,
    BButton,
    BFormDatepicker,
    BCard,
    BInputGroup,
    BInputGroupPrepend,
    BCardCode,
    BModal,
    BImg,
    BFormTextarea,
    LoanInformation,
    BMedia,
    BLink,
    LoanAssignStaff,
    LoanKeyPayment,
    LoanKeyFine,
    LoanForwardPayment,
    LoanTotalPayment,
  },
  setup() {
    const { t } = useI18nUtils();

    const columnsOrderHistory = [
      {
        label: t('type_purchase'),
        field: 'type_purchase',
        width: '10%',
        sortable: true,
            sortFn: (x, y, col, rowX, rowY) => {
              const a = rowX.purchase_type || ''
              const b = rowY.purchase_type || ''
              return col.sortDirection === 'asc'
                ? a.localeCompare(b)
                : b.localeCompare(a)
            },
      },
      {
        label: t('Email'),
        field: 'email',
        width: '10%',
        sortable: true,
            sortFn: (x, y, col, rowX, rowY) => {
              const a = rowX.email || ''
              const b = rowY.email || ''
              return col.sortDirection === 'asc'
                ? a.localeCompare(b)
                : b.localeCompare(a)
            },
      },
      {
        label: t('LINE'),
        field: 'line_name',
        width: '15%',
        sortable: true,
            sortFn: (x, y, col, rowX, rowY) => {
              const a = rowX.line_name || ''
              const b = rowY.line_name || ''
              return col.sortDirection === 'asc'
                ? a.localeCompare(b)
                : b.localeCompare(a)
            },
      },
      {
        label: t('Product'),
        field: 'subscription_img2',
        width: '20%',
        sortable: true,
            sortFn: (x, y, col, rowX, rowY) => {
              const a = rowX.product_name || ''
              const b = rowY.product_name || ''
              return col.sortDirection === 'asc'
                ? a.localeCompare(b)
                : b.localeCompare(a)
            },
      },
      {
        label: t('Create Date'),
        field: 'create_date2',
        width: '10%',
        sortable: true,
            sortFn: (x, y, col, rowX, rowY) => {
              const a = rowX.create_date
                ? new Date(rowX.create_date).getTime()
                : 0
              const b = rowY.create_date
                ? new Date(rowY.create_date).getTime()
                : 0

              return col.sortDirection === 'asc'
                ? a - b
                : b - a
            },
      },
      {
        label: t('End Date'),
        field: 'end_date2',
        width: '10%',
        sortable: true,
            sortFn: (x, y, col, rowX, rowY) => {
              const a = rowX.end_date
                ? new Date(rowX.end_date).getTime()
                : 0
              const b = rowY.end_date
                ? new Date(rowY.end_date).getTime()
                : 0

              return col.sortDirection === 'asc'
                ? a - b
                : b - a
            },
      },
      {
        label: t('Slip'),
        field: 'slip',
        width: '10%',
        sortable: true,
            sortFn: (x, y, col, rowX, rowY) => {
              const a = rowX.slip || ''
              const b = rowY.slip || ''
              return col.sortDirection === 'asc'
                ? a.localeCompare(b)
                : b.localeCompare(a)
            },
      },
      {
        label: t('Verify'),
        field: 'approved',
        width: '10%',
        sortable: true,
            sortFn: (x, y, col, rowX, rowY) => {
              const a = rowX.approved ? 1 : 0
              const b = rowY.approved ? 1 : 0
              return col.sortDirection === 'asc'
                ? a - b
                : b - a
            },
      },
      {
        label: t('Verify By'),
        field: 'check_slip_by',
        width: '10%',
        sortable: true,
            sortFn: (x, y, col, rowX, rowY) => {
              const a = rowX.check_slip_by || ''
              const b = rowY.check_slip_by || ''
              return col.sortDirection === 'asc'
                ? a.localeCompare(b)
                : b.localeCompare(a)
            },
      },
      {
        label: t('Action'),
        field: 'action',
      },
    ];

    return {
      t,
      columnsOrderHistory,
    };
  },
  data() {
    const now = new Date();
    const fDate =
      now.getFullYear() +
      "-" +
      ("0" + (now.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + now.getDate()).slice(-2);
    const tDate =
      now.getFullYear() +
      "-" +
      ("0" + (now.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + now.getDate()).slice(-2);

    const blankData = {
      credit: 0.0,
      credit_bonus: 0.0,
      date: null,
      username: "",
    };

    return {
      fromDate: fDate,
      toDate: tDate,
      rowsOrderHistory: [],
      dirOrderHistory: false,
      pageLengthOrderHistory: 10,

      searchTerm: "",
      deptorId: "",
      paymentId: 0,
      page_name: "",
      oldstaft_id: "",
      keyPaymentReadonly: false,
      keyFineReadonly: false,
      keyForwardReadonly: false,

      showModalNote: false,
      showModalCancel: false,
      showModalApprove: false,
      showModalReject: false,
      showInspectApprove: false,

      cancelNoteInput: "",
      cancelOrderId: 0,
      approveOrderId: 0,
      approveNoteInput: "",

      pagePermission: [],
      showModalImage: false,
      imageModal: "",
      selectImageData: {},

      // Personal Email Modal
      showModalPersonalEmail: false,
      personalEmailData: [],
      loadingPersonalEmail: false,
      selectedOrderId: null,

      showChangeDate: false,
      selectChangeDate : [],
      loadPurchaseType: "",
      
    };
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Current: "light-primary",
        Professional: "light-success",
        Rejected: "light-danger",
        Resigned: "light-warning",
        Applied: "light-info",
        /* eslint-enable key-spacing */
      };

      return (status) => statusColor[status];
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true;
        return this.dir;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false;
      return this.dir;
    },
    directionOrderHistory() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dirOrderHistory = true
        return this.dirOrderHistory
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dirOrderHistory = false
      return this.dirOrderHistory
    },
  },
  async created() {
    this.page_name = this.$route.name;

    await this.getPagePermission();
    await this.search();

    console.log(this.page_name);
  },
  methods: {

    ...mapActions(["GetPagePermission"]),
    ...mapActions(["GetHistorySubScribeOrderCheckedPayment"]),
    ...mapActions(["VerifySlipOrder"]),
    ...mapActions(["GetPersonalEmailStatusByOrderId"]),
    ...mapActions(["GetPersonalEmailByOrderId"]),
    ...mapActions(["UpdateEmailStatus"]),
    ...mapActions(["GetEmailStatusByOrderId"]),
    ...mapActions(["GetEmailByOrderId"]),
    ...mapActions(["UpdateEndDateById"]),
    ...mapActions(["RenewSubScribeOrder"]),
    
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
    formatDateAssigned2(value) {
      let formattedDate = new Date(value);
      formattedDate = new Date(formattedDate.getTime() - 3600000); // 60 * 60 * 1000 * 1
      return (
        formattedDate.getFullYear() +
        "-" +
        ("0" + (formattedDate.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + formattedDate.getDate()).slice(-2)
      );
    },
    async search() {
      console.log("search");

      const userData = JSON.parse(localStorage.getItem('userData'));
      const form = new FormData();

      form.append("userid", userData.username);
      form.append("token", userData.token);

      const response = await this.GetHistorySubScribeOrderCheckedPayment(form);
      if (response.data.status == 'success') {
        this.rowsOrderHistory = response.data.data;

        // Fetch personal email status for personal and email orders
        for (let index = 0; index < this.rowsOrderHistory.length; index++) {
          const element = this.rowsOrderHistory[index];

          if (element.purchase_type === 'personal') {
            //await this.fetchPersonalEmailStatus(element, index);
            this.rowsOrderHistory[index].personal_email_status = this.rowsOrderHistory[index].user_email_status_regis            
          } else if (element.purchase_type === 'email') {
            //await this.fetchEmailStatus(element, index);
            this.rowsOrderHistory[index].personal_email_status = this.rowsOrderHistory[index].personal_email_status_regis
          }
          
        }
      } else {
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
    async fetchPersonalEmailStatus(data, rowIndex) {
      try {
        // const userData = JSON.parse(localStorage.getItem('userData'));
        // const form = new FormData();

        // form.append("userid", userData.username);
        // form.append("token", userData.token);
        // form.append("orderId", orderId);

        // const response = await this.GetPersonalEmailStatusByOrderId(form);

        // if (response.data.status === 'success' && response.data.data.length > 0) {
        //   this.$set(this.rowsOrderHistory[rowIndex], 'personal_email_status', response.data.data[0].status_regis);
        // } else {
        //   this.$set(this.rowsOrderHistory[rowIndex], 'personal_email_status', null);
        // }

        this.$set(this.rowsOrderHistory[rowIndex], 'personal_email_status', data.status_regis);

      } catch (error) {
        console.error('Error fetching personal email status:', error);
        this.$set(this.rowsOrderHistory[rowIndex], 'personal_email_status', null);
      }
    },
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
    async handleOkApprove() {
      const note = this.approveNoteInput;
      console.log("handleOkApprove");

      const userData = JSON.parse(localStorage.getItem('userData'));
      const form = new FormData();

      form.append("userid", userData.username);
      form.append("token", userData.token);

      form.append("admin_id", userData.username);
      form.append("order_id", this.approveOrderId);
      form.append("note", note ? note : '');
      form.append("slip_correct", 1);

      const response = await this.VerifySlipOrder(form);
      if (response.data.status == "success") {
        //

        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: `Verify Payment`,
            icon: 'EditIcon',
            variant: 'success',
            text: this.$t(`Update Order Succesful`),
          },
          autoHideDelay: 3000,
        });

        this.search();


      } else {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: `Verify Payment`,
            icon: 'TrashIcon',
            variant: 'danger',
            text: this.$t('Update Order UnSuccesful') + ` ${response.data.message}`,
          },
          autoHideDelay: 3000,
        });

      }


    },
    async handleOkCancel() {
      //CancelSubScribeOrder
      const note = this.cancelNoteInput;
      console.log("handleOkCancel");

      const userData = JSON.parse(localStorage.getItem('userData'));
      const form = new FormData();

      form.append("userid", userData.username);
      form.append("token", userData.token);

      form.append("admin_id", userData.username);
      form.append("order_id", this.cancelOrderId);
      form.append("note", note ? note : '');

      const response = await this.CancelSubScribeOrder(form);
      if (response.data.status == "success") {
        //

        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: `Cancel Order`,
            icon: 'EditIcon',
            variant: 'success',
            text: this.$t(`Cancel Order Succesful`),
          },
          autoHideDelay: 3000,
        });

        this.search();


      } else {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: `Cancel Order`,
            icon: 'TrashIcon',
            variant: 'danger',
            text: this.$t('Cancel Order UnSuccesful') + ` ${response.data.message}`,
          },
          autoHideDelay: 3000,
        });

      }
    },
    async handleOkReject() {
      const note = this.cancelNoteInput;
      console.log("handleOkReject");

      const userData = JSON.parse(localStorage.getItem('userData'));
      const form = new FormData();

      form.append("userid", userData.username);
      form.append("token", userData.token);

      form.append("admin_id", userData.username);
      form.append("order_id", this.cancelOrderId);
      form.append("note", note ? note : '');
      form.append("slip_correct", 0);

      const response = await this.VerifySlipOrder(form);
      if (response.data.status == "success") {
        //

        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: `Verify Payment`,
            icon: 'EditIcon',
            variant: 'success',
            text: this.$t(`Update Order Succesful`),
          },
          autoHideDelay: 3000,
        });

        this.search();


      } else {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: `Verify Payment`,
            icon: 'TrashIcon',
            variant: 'danger',
            text: this.$t('Update Order UnSuccesful') + ` ${response.data.message}`,
          },
          autoHideDelay: 3000,
        });

      }
    },
    async handleOkNote() {
      this.showModalNote = false;
    },
    resetModalReject() {

    },
    resetModalCancel() {

    },
    resetModalNote() {

    },
    resetModalApprove() {

    },
    async inspectData(itemData) {
      this.showModalNote = true;
      this.cancelNoteInput = itemData.note;
    },
    async inspectCancel(itemData) {
      this.showModalCancel = true;
      this.cancelNoteInput = itemData.note;
      this.cancelOrderId = itemData.id;

    },
    async inspectApprove(itemData) {
      this.showModalApprove = true;
      this.approveNoteInput = itemData.note;
      this.approveOrderId = itemData.id;
    },
    async inspectReject(itemData) {
      this.showModalReject = true;
      this.cancelNoteInput = itemData.note;
      this.cancelOrderId = itemData.id;
    },
    closeInspectionApprove() {
      this.showInspectApprove = false;
    },    
    showImage(item) {
      this.selectImageData = item;
      this.imageModal = item.slip_file_url;
      this.showModalImage = true;
    },

    getSlipImageUrl(slipUrl) {
      if (!slipUrl) return '';

      // ถ้า URL เริ่มต้นด้วย http หรือ https แล้ว ให้ใช้ตามเดิม
      if (slipUrl.startsWith('http://') || slipUrl.startsWith('https://')) {
        return slipUrl;
      }

      // ถ้า URL เริ่มต้นด้วย / ให้เพิ่ม base URL
      if (slipUrl.startsWith('/')) {
        return `${window.location.origin}${slipUrl}`;
      }

      // ถ้าเป็นชื่อไฟล์ธรรมดา ให้เข้าถึงจาก API backend
      const apiBaseUrl = process.env.VUE_APP_API_BASE_URL || 'http://localhost:10600';
      return `${apiBaseUrl}/assets/${slipUrl}`;
    },

    handleImageError(event) {
      console.error('Image load error:', event.target.src);
      event.target.style.display = 'none';
    },
    resetModalImage() {
      this.showModalImage = false;
    },
    handleOkImage() {
      this.showModalImage = false;
      this.inspectApprove(this.selectImageData);
    },
    handleCancelImage() {
      this.showModalImage = false;
      this.inspectReject(this.selectImageData);
    },
    async handlePersonalAction(itemData) {
      console.log("handlePersonalAction", itemData);

      this.selectedOrderId = itemData.id;
      this.showModalPersonalEmail = true;

      // ใช้ API ที่แตกต่างกันตาม purchase_type
      if (itemData.purchase_type === 'email') {
        this.loadPurchaseType = "email"
        await this.loadEmailData(itemData.id);        
      } else {
        await this.loadPersonalEmailData(itemData.id);
        this.loadPurchaseType = "personal"
      }
    },

    async loadPersonalEmailData(orderId) {
      try {
        this.loadingPersonalEmail = true;
        this.personalEmailData = [];
        

        console.log('Loading personal email data for order ID:', orderId);

        const userData = JSON.parse(localStorage.getItem('userData'));
        const form = new FormData();

        form.append("userid", userData.username);
        form.append("token", userData.token);
        form.append("orderId", orderId);
        form.append("username", userData.username);

        const response = await this.GetPersonalEmailByOrderId(form);

        if (response.data.status === 'success') {
          this.personalEmailData = response.data.data;
          console.log('Personal email data loaded:', this.personalEmailData);
        } else {
          console.log('No personal email data found:', response.data.message);
          this.personalEmailData = [];
        }

      } catch (error) {
        console.error('Error loading personal email data:', error);
        this.personalEmailData = [];

        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: `Error`,
            icon: 'AlertTriangleIcon',
            variant: 'danger',
            text: `Failed to load personal email data: ${error.message}`,
          },
          autoHideDelay: 5000,
        });
      } finally {
        this.loadingPersonalEmail = false;
      }
    },

    resetModalPersonalEmail() {
      this.personalEmailData = [];
      this.selectedOrderId = null;
      this.loadingPersonalEmail = false;
    },

    handleOkPersonalEmail() {
      this.showModalPersonalEmail = false;
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

    async fetchEmailStatus(data, rowIndex) {
      try {
        // const userData = JSON.parse(localStorage.getItem('userData'));
        // const form = new FormData();

        // form.append("userid", userData.username);
        // form.append("token", userData.token);
        // form.append("orderId", orderId);

        // const response = await this.GetEmailStatusByOrderId(form);

        // if (response.data.status === 'success' && response.data.data.length > 0) {
        //   this.$set(this.rowsOrderHistory[rowIndex], 'personal_email_status', response.data.data[0].status_regis);
        // } else {
        //   this.$set(this.rowsOrderHistory[rowIndex], 'personal_email_status', null);
        // }

        this.$set(this.rowsOrderHistory[rowIndex], 'personal_email_status', data.status_regis);
      } catch (error) {
        console.error('Error fetching email status:', error);
        this.$set(this.rowsOrderHistory[rowIndex], 'personal_email_status', null);
      }
    },

    async loadEmailData(orderId) {
      try {
        this.loadingPersonalEmail = true;
        this.personalEmailData = [];
        

        console.log('Loading email data for order ID:', orderId);

        const userData = JSON.parse(localStorage.getItem('userData'));
        const form = new FormData();

        form.append("userid", userData.username);
        form.append("token", userData.token);
        form.append("orderId", orderId);
        form.append("username", userData.username);

        const response = await this.GetEmailByOrderId(form);

        if (response.data.status === 'success') {
          this.personalEmailData = response.data.data;
          console.log('Email data loaded:', this.personalEmailData);
        } else {
          console.log('No email data found:', response.data.message);
          this.personalEmailData = [];
        }

      } catch (error) {
        console.error('Error loading email data:', error);
        this.personalEmailData = [];

        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: `Error`,
            icon: 'AlertTriangleIcon',
            variant: 'danger',
            text: `Failed to load email data: ${error.message}`,
          },
          autoHideDelay: 5000,
        });
      } finally {
        this.loadingPersonalEmail = false;
      }
    },

    getPurchaseTypeVariant(purchaseType) {
      const variants = {
        'personal': 'primary',
        'shop': 'success',
        'email': 'info',
        'shop_family': 'warning',
        'shop_personal': 'secondary'
      };
      return variants[purchaseType] || 'light';
    },

    getPurchaseTypeLabel(purchaseType) {
      const labels = {
        'personal': 'Personal',
        'shop': 'Shop',
        'email': 'Email',
        'shop_family': 'Shop Family',
        'shop_personal': 'Shop Personal'
      };
      return labels[purchaseType] || purchaseType;
    },

    async updateEmailStatus(order) {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const form = new FormData();

        form.append("userid", userData.username);
        form.append("token", userData.token);
        form.append("orderId", order.id);
        form.append("username", userData.username);
        
        // ส่ง status parameter (toggle ระหว่าง 0 และ 1)
        const newStatus = order.personal_email_status === 1 ? 0 : 1;
        form.append("status", newStatus);
        form.append("purchase_type",order.purchase_type)

        const response = await this.UpdateEmailStatus(form);

        console.log('UpdateEmailStatus response:', response);

        // API UpdateEmailStatus return axios response object
        if (response && response.data && response.data.status === 'success') {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'อัพเดทสถานะสำเร็จ',
              icon: 'CheckIcon',
              variant: 'success',
            },
          });

          // Refresh data
          await this.search();
        } else {
          throw new Error((response && response.data && response.data.message) || 'เกิดข้อผิดพลาด');
        }

      } catch (error) {
        console.error('Error updating email status:', error);
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'เกิดข้อผิดพลาด: ' + (error.message || error),
            icon: 'AlertCircleIcon',
            variant: 'danger',
          },
        });
      }
    },

    async sendEmailPassword(order) {
      try {
        console.log('sendEmailPassword for order:', order.id);

        // ยืนยันก่อนส่ง
        const confirmed = await this.$bvModal.msgBoxConfirm(
          `คุณต้องการยืนยันการเปลี่ยนสถานะเป็น "สมัครสมาชิกแล้ว" ใช่หรือไม่?`,
          {
            title: 'Confirm Update Status',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'success',
            okTitle: 'ส่ง',
            cancelTitle: 'ยกเลิก',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          }
        );

        if (!confirmed) return;

        const userData = JSON.parse(localStorage.getItem('userData'));

        const response = await axios.post(
          'api/product/send-email-password-manual',
          { order_id: order.id },
          {
            headers: {
              'Content-Type': 'application/json',
              userid: userData.username,
              token: userData.token,
            },
          }
        );

        console.log('Response:', response.data);

        if (response.data && response.data.status === 'success') {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'ส่งข้อมูลสำเร็จ',
              icon: 'CheckIcon',
              variant: 'success',
            },
          });

          // Refresh data
          await this.search();
        } else {
          throw new Error(response.data.message || 'เกิดข้อผิดพลาด');
        }

      } catch (error) {
        console.error('Error sending email/password:', error);
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'เกิดข้อผิดพลาด: ' + (error.message || error),
            icon: 'AlertCircleIcon',
            variant: 'danger',
          },
        });
      }
    },

    async loadData() {
      await this.search();
    },
    showModalChangeDate(val){
      this.showChangeDate = true;
      this.selectChangeDate = val
    },
    resetModalChangeDate() {      
      this.showChangeDate = false;
    },
    handleOkChangeDate(){
      this.updateEndDate();
    },
    async updateEndDate() {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const form = new FormData();

        form.append("userid", userData.username);
        form.append("token", userData.token);        
        form.append("username", userData.username);

        form.append("id", this.selectChangeDate.id);
        form.append("end_date", this.selectChangeDate.end_date);
                
        const response = await this.UpdateEndDateById(form);
        

        // API UpdateEmailStatus return axios response object
        if (response && response.data && response.data.status === 'success') {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'อัพเดทสถานะสำเร็จ',
              icon: 'CheckIcon',
              variant: 'success',
            },
          });

          // Refresh data
          await this.search();
        } else {
          throw new Error((response && response.data && response.data.message) || 'เกิดข้อผิดพลาด');
        }

      } catch (error) {
        console.error('Error updating email status:', error);
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'เกิดข้อผิดพลาด: ' + (error.message || error),
            icon: 'AlertCircleIcon',
            variant: 'danger',
          },
        });
      }
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
            console.log(selectID);
            this.deleteOrder(selectID);

          }

        })
        .catch(err => {

        })
    },
    async deleteOrder(listId) {
      //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

      console.log("deleteOrder");

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
      await axios.post("api/product/deleteOrderById/", body,
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
        this.search();

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
        this.search();
      }

    }, 
    searchOnTable(row, col, cellValue, searchTerm) {
      
      if (searchTerm.length < 2) {
        return true;
      }

      let found = false;
      Object.keys(row).forEach((key) => {
        if (row[key]) {
          if (row[key].toString().indexOf(searchTerm) > -1) {
            found = true;
            return true;
          }
        }
      });

      return found;
    },
    async renewOrder(row) {
      
      const confirmed = await this.$bvModal.msgBoxConfirm(this.$t('Please confirm that you want to Renew.'), {
        title: this.$t('Please Confirm'),
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'success',
        okTitle: 'YES',
        cancelTitle: 'NO',
      });

      if (confirmed) {
        this.renewOrderAction(row);
      }
      
    },
    async renewOrderAction(row) {
      console.log('renewOrderAction', row);

      const userData = JSON.parse(localStorage.getItem('userData'));
      const form = new FormData();

      form.append("userid", userData.username);
      form.append("token", userData.token);
      form.append("previous_order_id", row.id);
      form.append("username", userData.username);

      const response = await this.RenewSubScribeOrder(form);

      if (response.data.status === 'success') {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'ต่ออายุสำเร็จ',
            icon: 'CheckIcon',
            variant: 'success',
          },
        });
      } else {
        //toast error
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'เกิดข้อผิดพลาด: ' + (response.data.message || 'เกิดข้อผิดพลาด'),
            icon: 'AlertCircleIcon',
            variant: 'danger',
          },
        });
      }
    }
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
      min-width: 120px;
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

// Modal customization
.modal-lg {
  max-width: 600px;
}

.modal-header {
  border-bottom: 1px solid #e9ecef;
  padding: 20px 24px 16px;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  border-top: 1px solid #e9ecef;
  padding: 16px 24px;
}

// Button styling
.btn-outline-primary {
  border-color: #007bff;
  color: #007bff;

  &:hover {
    background-color: #007bff;
    border-color: #007bff;
    color: white;
  }
}

// Loading spinner
.text-center .spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
