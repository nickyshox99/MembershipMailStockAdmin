<template>
  <div>
    <b-card no-body>
      <div class="m-2">
        <b-row>
          <b-col
            cols="2"
            class="d-flex align-items-center justify-content-start mb-1"
          >
            <b-button variant="primary" @click="search">
              <feather-icon icon="SearchIcon" />
              {{ t("Load") }}
            </b-button>
          </b-col>

          <b-col
            cols="3"
            md="3"
            class="d-flex align-items-left justify-content-start mb-1"
          >
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

          <b-col
            cols="6"
            md="3"
            class="d-flex align-items-left justify-content-start mb-1"
          >
          </b-col>
        </b-row>
      </div>
    </b-card>

    <b-card :title="t('Wait Payment')">
      
      <vue-good-table
        ref="my-table-order-history"
        :columns="columnsOrderHistory"
        :rows="rowsOrderHistory"
        :rtl="directionOrderHistory"
        :line-numbers="true"
        :search-options="{
          enabled: false,
        }"
        :select-options="{
          enabled: false,
          selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
          selectionInfoClass: 'custom-class',
          selectionText: 'rows selected',
          clearSelectionText: 'clear',
          disableSelectInfo: true, // disable the select info panel on top
          selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
          searchFn: searchOnTable,
        }"
        :pagination-options="{
          enabled: true,
          perPage: pageLengthOrderHistory,
        }"
        theme="polar-bear"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field === 'type_purchase'">
            <b-badge
              :variant="getPurchaseTypeVariant(props.row.purchase_type)"
              class="text-capitalize"
            >
              {{ getPurchaseTypeLabel(props.row.purchase_type) }}
            </b-badge>
            <div v-if="props.row.purchase_type === 'personal' || props.row.purchase_type === 'email'">
              <br/>
              <b-badge
                v-if="props.row.personal_email_status === 0"
                pill
                variant="light-danger"
                class="text-capitalize mt-1"
                style="font-size: 10px;"
              >
                ยังไม่ได้สมัครสมาชิก
              </b-badge>
              <b-badge
                v-if="props.row.personal_email_status === 1"
                pill
                variant="light-success"
                class="text-capitalize mt-1"
                style="font-size: 10px;"
              >
                สมัครสมาชิกแล้ว
              </b-badge>
            </div>
          </span>
          <span v-if="props.column.field === 'line_name'">
            <div style="font-size: 14px;">
              <b-img
                v-if="props.row.line_profile_url"
                :src="props.row.line_profile_url"
                fluid
                thumbnail
                style="height: 30px; width: 30px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"
              />
              <span style="vertical-align: middle;">{{ props.row.line_display_name || props.row.line_user_id || '-' }}</span>
            </div>
          </span>
          <span v-if="props.column.field === 'subscription_img2'">
            
            <div style="font-size: 14px; color: gray">
              <b-img
              :src="props.row.subscription_img"
              fluid
              thumbnail
              style="height: 30px"
            />
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

          <span v-if="props.column.field === 'sent_message_at2'">
            {{
              props.row.sent_message_at != null
                ? formatDateAssigned(props.row.sent_message_at)
                : ""
            }}
            {{
              props.row.sent_message_by != null&&props.row.sent_message_by!=''
                ? props.row.sent_message_by
                : ""
            }}
          </span>

          
          <span v-if="props.column.field === 'slip'" >
            <b-img v-if="props.row.slip_file_url && props.row.slip_file_url !== '' && props.row.slip_file_url !== null" 
              @click="showImage(props.row)"
              :src="getSlipImageUrl(props.row.slip_file_url)"
              fluid
              thumbnail
              style="cursor: pointer; height: 100px"
              @error="handleImageError"
            />
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
            <b-badge
              v-if="
                props.row.slip_correct == 1 
              "
              pill
              :variant="`light-success`"
              class="text-capitalize"
            >
              {{ t("Slip Correct") }}
              {{
                props.row.check_slip_at != null
                  ? formatDateAssigned(props.row.check_slip_at)
                  : ""
              }}
            </b-badge>
            <b-badge
              v-if="
                props.row.wait_check_payment == 1
              "
              pill
              :variant="`light-info`"
              class="text-capitalize"
            >
              <feather-icon icon="ClockIcon" size="16" class="mr-0 mr-sm-50" />
              {{ t('Wait Admin Verify') }}
            </b-badge>
            
          </span>

          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>

          <span v-if="props.column.field === 'action'" style="display: flex; flex-direction: column; gap: 4px;">
            <b-badge
              v-if="props.row.slip_correct"
              style="cursor: pointer; width: 100%; display: block; text-align: center"
              variant="info"
              @click="inspectData(props.row)"
            >
              <feather-icon icon="SearchIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline">{{ t("Information") }}</span>
            </b-badge>
            <b-badge
              v-if="props.row.wait_check_payment==1"
              :style="((props.row.purchase_type === 'personal' || props.row.purchase_type === 'email') && props.row.personal_email_status === 0) ? 'cursor: not-allowed; opacity: 0.6; width: 100%; display: block; text-align: center' : 'cursor: pointer; width: 100%; display: block; text-align: center'"
              :variant="((props.row.purchase_type === 'personal' || props.row.purchase_type === 'email') && props.row.personal_email_status === 0) ? 'secondary' : 'success'"
              @click="((props.row.purchase_type === 'personal' || props.row.purchase_type === 'email') && props.row.personal_email_status === 0) ? null : inspectApprove(props.row)"
            >
              <feather-icon icon="CheckIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline">{{ t("Correct Slip") }}</span>
              <span v-if="(props.row.purchase_type === 'personal' || props.row.purchase_type === 'email') && props.row.personal_email_status === 0" class="d-none d-sm-inline" style="font-size: 9px;"> (รอสมัครสมาชิก)</span>
            </b-badge>
            <b-badge
              v-if="props.row.wait_check_payment==1"
              style="cursor: pointer; width: 100%; display: block; text-align: center"
              variant="danger"
              @click="inspectReject(props.row)"
            >
              <feather-icon icon="XIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline">{{ t("Incorrect Slip") }}</span>
            </b-badge>
            <b-badge
              v-if="props.row.wait_check_payment==1"
              style="cursor: pointer; width: 100%; display: block; text-align: center"
              variant="info"
              @click="sendLineMessage(props.row)"
            >
              <feather-icon icon="MailIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline">{{ t("Send Payment") }}</span>
            </b-badge>
            <b-badge
              v-if="props.row.purchase_type === 'personal' || props.row.purchase_type === 'email'"
              style="cursor: pointer; width: 100%; display: block; text-align: center"
              :variant="props.row.personal_email_status === 1 ? 'warning' : 'primary'"
              @click="updateEmailStatus(props.row)"
            >
              <feather-icon icon="RefreshCwIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline">{{ props.row.personal_email_status === 1 ? t("Unregistered") : t("Update Status") }}</span>
            </b-badge>
            <b-badge
              v-if="props.row.purchase_type === 'personal' || props.row.purchase_type === 'email'"
              style="cursor: pointer; width: 100%; display: block; text-align: center"
              variant="info"
              @click="handlePersonalAction(props.row)"
            >
              <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline">{{ props.row.purchase_type === 'email' ? t("Email") : t("Personal") }}</span>
            </b-badge>
          </span>
        </template>

        <template slot="pagination-bottom" slot-scope="props">
          <div class="d-flex justify-content-between flex-wrap">
            <div class="d-flex align-items-center mb-0 mt-1">
              <span class="text-nowrap">
                {{ t("Showing") + " 1 " + t("to") }}
              </span>
              <b-form-select
                v-model="pageLengthOrderHistory"
                :options="['3', '5', '10', '20', '50', '100']"
                class="mx-1"
                @input="
                  (value) => props.perPageChanged({ currentPerPage: value })
                "
              />
              <span class="text-nowrap">
                {{ t("of") }} {{ props.total }} {{ t("entries") }}
              </span>
            </div>
            <div>
              <b-pagination
                :value="1"
                :total-rows="props.total"
                :per-page="pageLengthOrderHistory"
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

      <br/>
      <b-col style="color:red;" >
          ขั้นตอนนี้ถ้ากดปุ่ม 
      </b-col>
      <b-col style="color:red;">
          "ส่งข้อความเรียกเก็บเงิน" ระบบจะทำการแจ้งยอดชำระไปทางไลน์ไปให้ลูกค้าชำระหลังจากกดปุ่ม
      </b-col>
      

    </b-card>

    
        <b-modal
            id="modal-approve"
            ref="modalApprove"
            v-model="showModalApprove"
            :title="t('Please confirm that you want to approve')"
            @show="resetModalApprove"        
            @hidden="resetModalApprove"
            @ok="handleOkApprove"      
            size="sm"  
            :hideHeaderClose="false"            
            ok-variant="success"
            :okTitle="t('YES')"
            buttonSize="sm"
            :cancelTitle="t('NO')"
            footerClass="p-2"
        >
            
            <b-row>
                <b-col md="12">
                    <b-form-group
                        :label="t('Note')"
                        label-for="approve-note-input"                    
                        >
                        
                        <b-form-textarea
                            id="approve-note-input"
                            v-model="approveNoteInput"                
                            rows="3"
                            max-rows="6"
                        ></b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="12">
                    <b-form-group
                        :label="t('Invite Link')"
                        label-for="invite-link-input"                    
                        >
                        
                        <b-form-input
                            id="invite-link-input"
                            v-model="inviteLink"                
                        ></b-form-input>                          
                        
                    </b-form-group>
                </b-col>
            </b-row>
        </b-modal>

        <b-modal
            id="modal-reject"
            ref="modalReject"
            v-model="showModalReject"
            :title="t('Please confirm that you want to reject')"
            @show="resetModalReject"        
            @hidden="resetModalReject"
            @ok="handleOkReject"      
            size="sm"  
            :hideHeaderClose="false"            
            ok-variant="danger"
            :okTitle="t('YES')"
            buttonSize="sm"
            :cancelTitle="t('NO')"
            footerClass="p-2"
        >
        <b-row>
                <b-col md="12">
                    <b-form-group
                        :label="t('Note')"
                        label-for="cancel-note-input"                    
                        >
                        
                        <b-form-textarea
                            id="cancel-note-input"
                            v-model="cancelNoteInput"                
                            rows="3"
                            max-rows="6"
                        ></b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-modal>

        <b-modal
            id="modal-cancel"
            ref="modalCancel"
            v-model="showModalCancel"
            :title="t('Please confirm that you want to cancel')"
            @show="resetModalCancel"        
            @hidden="resetModalCancel"
            @ok="handleOkCancel"      
            size="sm"  
            :hideHeaderClose="false"            
            ok-variant="success"
            :okTitle="t('YES')"
            buttonSize="sm"
            :cancelTitle="t('NO')"
            footerClass="p-2"
        >
            
            <b-row>
                <b-col md="12">
                    <b-form-group
                        :label="t('Note')"
                        label-for="cancel-note-input"                    
                        >
                        
                        <b-form-textarea
                            id="cancel-note-input"
                            v-model="cancelNoteInput"                
                            rows="3"
                            max-rows="6"
                        ></b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-modal>

        <b-modal
            id="modal-note"
            ref="modalNote"
            v-model="showModalNote"
            :title="t('Note')"
            @show="resetModalNote"        
            @hidden="resetModalNote"
            @ok="handleOkNote"      
            size="sm"  
            :hideHeaderClose="false"            
            ok-variant="success"
            :okTitle="t('Ok')"
            buttonSize="sm"
            hide-footer
        >
            
            <b-row>
                <b-col md="12">
                    <b-form-group
                        :label="t('Note')"
                        label-for="cancel-note-input"                    
                        >
                        
                        <b-form-textarea
                            id="cancel-note-input"
                            v-model="cancelNoteInput"                
                            rows="3"
                            max-rows="6"
                        ></b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-modal>

        <b-modal
            id="modal-image"
            ref="modalImage"
            v-model="showModalImage"
            :title="t('Slip')"
            @show="resetModalImage"        
            @hidden="resetModalImage"
            @ok="handleOkImage"      
            @cancel="handleCancelImage"
            size="md"  
            :hideHeaderClose="false"            
            ok-variant="success"
            :okTitle="t('Correct Slip')"
            buttonSize="sm"
            :cancelTitle="t('Incorrect Slip')"
            cancel-variant="danger"
        >
            <b-row>
                <b-col md="12">
                    <b-form-group
                        label-for="cancel-note-input"                    
                        >
                        <img :src="getSlipImageUrl(imageModal)"
                          style="min-width: 300px;max-width: 300px; max-height: 600px;"
                          @error="handleImageError"
                        />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="12">
                    
                </b-col>
            </b-row>

        </b-modal>

        <b-modal
            id="modal-update-status"
            ref="modalUpdateStatus"
            v-model="showModalUpdateStatus"
            :title="t('Confirm Update Status')"
            @show="resetModalUpdateStatus"        
            @hidden="resetModalUpdateStatus"
            @ok="handleOkUpdateStatus"      
            size="sm"  
            :hideHeaderClose="false"            
            :ok-variant="updateStatusItem.personal_email_status === 1 ? 'warning' : 'primary'"
            :okTitle="t('YES')"
            buttonSize="sm"
            :cancelTitle="t('NO')"
            footerClass="p-2"
        >
            <b-row>
                <b-col md="12">
                    <p v-if="updateStatusItem.personal_email_status === 1">
                      {{ t('คุณต้องการเปลี่ยนสถานะเป็น "ยังไม่ได้สมัครสมาชิก" ใช่หรือไม่?') }}
                    </p>
                    <p v-else>
                      {{ t('คุณต้องการยืนยันการเปลี่ยนสถานะเป็น "สมัครสมาชิกแล้ว" ใช่หรือไม่?') }}
                    </p>
                    <p v-if="updateStatusItem && updateStatusItem.email" style="font-weight: bold; color: #7367f0;">
                      Email: {{ updateStatusItem.email }}
                    </p>
                </b-col>
            </b-row>
        </b-modal>

        <!-- Personal Email Modal -->
        <b-modal
            id="modal-personal-email"
            ref="modalPersonalEmail"
            v-model="showModalPersonalEmail"
            :title="t('Personal Email Information')"
            @show="resetModalPersonalEmail"        
            @hidden="resetModalPersonalEmail"
            @ok="handleOkPersonalEmail"      
            size="lg"  
            :hideHeaderClose="false"            
            ok-variant="primary"
            :okTitle="t('Close')"
            buttonSize="sm"
            hide-footer
        >
            <div v-if="loadingPersonalEmail" class="text-center">
                <b-spinner variant="primary" label="Loading..."></b-spinner>
                <p class="mt-2">{{ t("Loading...") }}</p>
            </div>
            
            <div v-else-if="personalEmailData && personalEmailData.length > 0">
                <div v-for="email in personalEmailData" :key="email.id" class="personal-email-card">
                    <div class="text-center mb-4">
                        <feather-icon icon="MailIcon" size="48" class="text-primary mb-2" />
                        <h5 class="mb-1">{{ t("Personal Email Account") }}</h5>
                        <p class="text-muted">{{ t("Order ID") }}: {{ email.order_id }}</p>
                    </div>
                    
                    <div class="email-info-container">
                        <div class="info-item">
                            <div class="info-label">
                                <feather-icon icon="MailIcon" size="16" />
                                {{ t("Email Address") }}
                            </div>
                            <div class="info-value email-value">{{ email.email }}</div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-label">
                                <feather-icon icon="LockIcon" size="16" />
                                {{ t("Password") }}
                            </div>
                            <div class="info-value password-value">{{ email.password }}</div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-label">
                                <feather-icon icon="UserIcon" size="16" />
                                {{ t("User ID") }}
                            </div>
                            <div class="info-value userid-value">{{ email.user_id }}</div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-label">
                                <feather-icon icon="ActivityIcon" size="16" />
                                {{ t("Status") }}
                            </div>
                            <div class="info-value">
                                <b-badge 
                                    :variant="email.status_regis == 1 ? 'success' : 'danger'"
                                    pill
                                    class="status-badge"
                                >
                                    {{ email.status_regis == 1 ? t("Active") : t("Inactive") }}
                                </b-badge>
                            </div>
                        </div>
                    </div>
                    
                    <div class="text-center mt-4">
                        <b-button 
                            variant="outline-primary" 
                            size="sm"
                            @click="copyToClipboard(email.email + '\n' + email.password)"
                        >
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
  BSpinner,
} from "bootstrap-vue";
import { VueGoodTable } from "vue-good-table";
import store from "@/store/index";
import { mapActions } from "vuex";

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
    BSpinner,
    LoanAssignStaff,
    LoanKeyPayment,
    LoanKeyFine,
    LoanForwardPayment,
    LoanTotalPayment,
  },
  setup() {
    const { t } = useI18nUtils();

    const columnsOrderHistory =  [
            {
            label: t('type_purchase'),
            field: 'type_purchase',  
            width: '10%',          
            },
            {
            label: t('LINE'),
            field: 'line_name',  
            width: '15%',          
            },
            {
            label: t('Product'),
            field: 'subscription_img2',  
            width: '20%',          
            },
            {
            label: t('Create Date'),
            field: 'create_date2',
            width: '10%',
            },
            {
            label: t('Sent Message Date'),
            field: 'sent_message_at2',
            width: '10%',
            },
            {
            label: t('Sent By'),
            field: 'sent_message_by',
            width: '10%',
            },
            {
            label: t('Slip'),
            field: 'slip',
            width: '10%',
            },   
            {
            label: t('Verify'),
            field: 'approved',
            width: '10%',
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
      rowsOrderHistory:[],
      dirOrderHistory:false,
      pageLengthOrderHistory:10,

      searchTerm: "",      
      deptorId: "",
      paymentId: 0,
      page_name: "",
      oldstaft_id: "",
      keyPaymentReadonly: false,
      keyFineReadonly: false,
      keyForwardReadonly: false,
      
      showModalNote:false,
      showModalCancel:false,
      showModalApprove:false,
      showModalReject:false,
      showInspectApprove: false,

      cancelNoteInput:"",
      cancelOrderId:0,
      approveOrderId:0,
      approveNoteInput:"",
      
      pagePermission:[],
      showModalImage:false,
      imageModal : "",
      selectImageData : {},
      
      showModalUpdateStatus:false,
      updateStatusItem: {},
      
      // Personal Email Modal
      showModalPersonalEmail: false,
      personalEmailData: [],
      loadingPersonalEmail: false,
      selectedOrderId: null,
      inviteLink :'',
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
    ...mapActions(["GetHistorySubScribeOrderWaitCheckPayment"]),
    ...mapActions(["VerifySlipOrder"]),
    ...mapActions(["SentPaymentMessageOrder"]),
    ...mapActions(["UpdatePersonalEmailStatus"]),
    ...mapActions(["GetPersonalEmailStatusByOrderId"]),
    ...mapActions(["GetPersonalEmailByOrderId"]),
    ...mapActions(["UpdateEmailStatus"]),
    ...mapActions(["GetEmailStatusByOrderId"]),
    ...mapActions(["GetEmailByOrderId"]),
    
    
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
    async search()
      {
          console.log("search");

          const userData = JSON.parse(localStorage.getItem('userData'));
          const form = new FormData();

          form.append("userid", userData.username);
          form.append("token", userData.token);

          const response = await this.GetHistorySubScribeOrderWaitCheckPayment(form);
          if (response.data.status == 'success') {           
              this.rowsOrderHistory = response.data.data;
              
              // Fetch personal email status for personal and email orders
              for (let index = 0; index < this.rowsOrderHistory.length; index++) {
                  const element = this.rowsOrderHistory[index];
                  
                  if (element.purchase_type === 'personal') {
                      await this.fetchPersonalEmailStatus(element.id, index);
                  } else if (element.purchase_type === 'email') {
                      await this.fetchEmailStatus(element.id, index);
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
    async fetchPersonalEmailStatus(orderId, rowIndex) {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const form = new FormData();
            
            form.append("userid", userData.username);
            form.append("token", userData.token);
            form.append("orderId", orderId);
            
            const response = await this.GetPersonalEmailStatusByOrderId(form);
            
            if (response.data.status === 'success' && response.data.data.length > 0) {
                this.$set(this.rowsOrderHistory[rowIndex], 'personal_email_status', response.data.data[0].status_regis);
            } else {
                this.$set(this.rowsOrderHistory[rowIndex], 'personal_email_status', null);
            }
        } catch (error) {
            console.error('Error fetching personal email status:', error);
            this.$set(this.rowsOrderHistory[rowIndex], 'personal_email_status', null);
        }
    },
    async fetchEmailStatus(orderId, rowIndex) {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const form = new FormData();
            
            form.append("userid", userData.username);
            form.append("token", userData.token);
            form.append("orderId", orderId);
            
            const response = await this.GetEmailStatusByOrderId(form);
            
            if (response.data.status === 'success' && response.data.data.length > 0) {
                this.$set(this.rowsOrderHistory[rowIndex], 'personal_email_status', response.data.data[0].status_regis);
            } else {
                this.$set(this.rowsOrderHistory[rowIndex], 'personal_email_status', null);
            }
        } catch (error) {
            console.error('Error fetching email status:', error);
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
    async handleOkApprove()
    {
        const note = this.approveNoteInput;
        console.log("handleOkApprove");

        const userData = JSON.parse(localStorage.getItem('userData'));
        const form = new FormData();

        form.append("userid", userData.username);
        form.append("token", userData.token);

        form.append("admin_id", userData.username);
        form.append("order_id", this.approveOrderId);
        form.append("note", note?note:'');
        form.append("slip_correct", 1);
        form.append("invite_link", this.inviteLink);
                                                        
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
                    text: this.$t('Update Order UnSuccesful') +` ${response.data.message}`,
                },
                autoHideDelay: 3000,
            });
            
        }
        
        
    },        
    async handleOkCancel()
    {
        //CancelSubScribeOrder
        const note = this.cancelNoteInput;
        console.log("handleOkCancel");

        const userData = JSON.parse(localStorage.getItem('userData'));
        const form = new FormData();

        form.append("userid", userData.username);
        form.append("token", userData.token);

        form.append("admin_id", userData.username);
        form.append("order_id", this.cancelOrderId);
        form.append("note", note?note:'');
                                                        
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
                    text: this.$t('Cancel Order UnSuccesful') +` ${response.data.message}`,
                },
                autoHideDelay: 3000,
            });
            
        }
    },
    async handleOkReject()
    {
        const note = this.cancelNoteInput;
        console.log("handleOkReject");

        const userData = JSON.parse(localStorage.getItem('userData'));
        const form = new FormData();

        form.append("userid", userData.username);
        form.append("token", userData.token);

        form.append("admin_id", userData.username);
        form.append("order_id", this.cancelOrderId);
        form.append("note", note?note:'');
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
                    text: this.$t('Update Order UnSuccesful') +` ${response.data.message}`,
                },
                autoHideDelay: 3000,
            });
            
        }
    },
    async handleOkNote()
    {
        this.showModalNote = false;
    },    
    resetModalReject()
    {
        
    },
    resetModalCancel()
    {
        
    },
    resetModalNote()
    {
        
    },
    resetModalApprove()
    {
          
    },
    async inspectData(itemData)
    {
        this.showModalNote = true;
        this.cancelNoteInput = itemData.note;
    },
    async inspectCancel(itemData)
    {
        this.showModalCancel = true;            
        this.cancelNoteInput = itemData.note;
        this.cancelOrderId = itemData.id;
        
    },
    async inspectApprove(itemData)
    {
        this.showModalApprove=true;
        this.approveNoteInput = itemData.note;
        this.approveOrderId = itemData.id;
    },
    async inspectReject(itemData)
    {
        this.showModalReject=true;                   
        this.cancelNoteInput = itemData.note;
        this.cancelOrderId = itemData.id;
    },
    closeInspectionApprove()
    {
        this.showInspectApprove = false;
    },
    searchOnTable(row, col, cellValue, searchTerm) {
      if (searchTerm.length < 3) {
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
    showImage(item)
    {
      this.selectImageData = item;
      this.imageModal = item.slip_file_url;
      this.showModalImage= true;
    },
    resetModalImage()
    {
      this.showModalImage= false;
    },
    handleOkImage()
    {
        this.showModalImage= false;
        this.inspectApprove(this.selectImageData);
    },
    handleCancelImage()
    {
        this.showModalImage= false;
        this.inspectReject(this.selectImageData);
    },
    async sendLineMessage(item)
    {
        const note = this.cancelNoteInput;
        console.log("handleOkReject");

        const userData = JSON.parse(localStorage.getItem('userData'));
        const form = new FormData();

        form.append("userid", userData.username);
        form.append("token", userData.token);

        form.append("admin_id", userData.username);
        form.append("order_id", item.id);
        
                                                        
        const response = await this.SentPaymentMessageOrder(form);
        if (response.data.status == "success") {
            //

            this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                    title: `Verify Payment`,
                    icon: 'EditIcon',
                    variant: 'success',
                    text: this.$t(`Send Message Succesful`),
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
                    text: this.$t('Send Message UnSuccesful') +` ${response.data.message}`,
                },
                autoHideDelay: 3000,
            });
            
        }
    },
    async updateEmailStatus(item)
    {
        this.updateStatusItem = item;
        this.showModalUpdateStatus = true;
    },
    async updateEmailStatusNew(item)
    {
        this.updateStatusItem = item;
        this.showModalUpdateStatus = true;
    },
    resetModalUpdateStatus()
    {
        
    },
    async handleOkUpdateStatus()
    {
        console.log("handleOkUpdateStatus");

        const userData = JSON.parse(localStorage.getItem('userData'));
        const form = new FormData();

        // Toggle status: ถ้าเป็น 1 ให้เปลี่ยนเป็น 0, ถ้าเป็น 0 หรือ null ให้เปลี่ยนเป็น 1
        const newStatus = this.updateStatusItem.personal_email_status === 1 ? 0 : 1;

        form.append("userid", userData.username);
        form.append("token", userData.token);
        form.append("orderId", this.updateStatusItem.id);
        form.append("status", newStatus);
        form.append("purchase_type", this.updateStatusItem.purchase_type);
        
        // ใช้ API ที่แตกต่างกันตาม purchase_type
        let response;
        if (this.updateStatusItem.purchase_type === 'email') {
          
            response = await this.UpdateEmailStatus(form);
        } else {
            response = await this.UpdatePersonalEmailStatus(form);
        }
        
        if (response.data.status == "success") {
            const statusText = newStatus === 1 ? 'สมัครสมาชิกแล้ว' : 'ยังไม่ได้สมัครสมาชิก';
            this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                    title: `Update Email Status`,
                    icon: 'CheckIcon',
                    variant: 'success',
                    text: this.$t(`Update Status Successful`) + ` (${statusText})`,
                },
                autoHideDelay: 3000,
            });

            this.search();
        } else {
            this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                    title: `Update Email Status`,
                    icon: 'AlertTriangleIcon',
                    variant: 'danger',
                    text: this.$t('Update Status Unsuccessful') + ` ${response.data.message}`,
                },
                autoHideDelay: 3000,
            });
        }
    },
    async handlePersonalAction(itemData)
    {
      console.log("handlePersonalAction", itemData);
      
      this.selectedOrderId = itemData.id;
      this.showModalPersonalEmail = true;
      
      // ใช้ API ที่แตกต่างกันตาม purchase_type
      if (itemData.purchase_type === 'email') {
        await this.loadEmailData(itemData.id);
      } else {        
        await this.loadPersonalEmailData(itemData.id);          
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
      // ใช้ environment variable สำหรับ API base URL
      const apiBaseUrl = process.env.VUE_APP_API_BASE_URL || 'https://api.allpremium.shop';
      return `${apiBaseUrl}/assets/${slipUrl}`;
    },
    
    handleImageError(event) {
      console.error('Image load error:', event.target.src);
      event.target.style.display = 'none';
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
</style>
