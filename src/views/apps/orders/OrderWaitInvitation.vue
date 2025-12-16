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

    <b-card :title="t('Wait Family Invitation')">
      
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
              v-if="props.row.purchase_type === 'shop'"
              pill
              variant="info"
              class="text-capitalize"
            >
              Shop
            </b-badge>
            <div v-if="props.row.purchase_type === 'personal'">
              <b-badge
                pill
                variant="warning"
                class="text-capitalize"
              >
                Personal
              </b-badge>
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
            <span v-if="!props.row.purchase_type || (props.row.purchase_type !== 'shop' && props.row.purchase_type !== 'personal')">
              -
            </span>
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

          <span v-if="props.column.field === 'group_name2'">

            <b-badge
              style="cursor: pointer;"
              @click="()=>{confirmJoinGroup(props.row.group_id,props.row.email,props.row.user_id)}"
              v-if="props.row.group_name && props.row.group_name.length > 0"
              pill
              :variant="`light-success`"
              class="text-capitalize"
            >
              {{ props.row.group_name }}
            </b-badge>

            <b-badge
              style="cursor: pointer;"
              v-if="!props.row.group_name"              
              @click="()=>{confirmJoinGroup(props.row.group_id,props.row.email,props.row.user_id)}"
              pill
              :variant="`light-warning`"
              class="text-capitalize"
            >
              {{ t('No Group') }}
            </b-badge>

          </span>
          
          <!-- 
          <span v-if="props.column.field === 'remain'">
            <b-badge
              v-if="props.row.diffDay <= 0"
              pill
              :variant="`light-warning`"
              class="text-capitalize"
            >
              {{ t("Expired") }}
            </b-badge>
            <b-badge
              v-if="props.row.diffDay > 0"
              pill
              :variant="`light-success`"
              class="text-capitalize"
            >
              {{ t("Remaining") }} {{ props.row.diffDay }} {{ t("Day") }}
            </b-badge>
          </span> -->

          <span v-if="props.column.field === 'approved'">
            <b-badge
              v-if="
                props.row.canceled == 0 &&
                props.row.approve_by != null &&
                props.row.approve_by != ''
              "
              pill
              :variant="`light-success`"
              class="text-capitalize"
            >
              {{ t("Approved") }}
              {{
                props.row.approve_date != null
                  ? formatDateAssigned2(props.row.approve_date)
                  : ""
              }}
            </b-badge>
            <b-badge
              v-if="
                props.row.canceled == 0 &&
                (props.row.approve_by == '' || props.row.approve_by == null)
              "
              pill
              :variant="`light-info`"
              class="text-capitalize"
            >
              <feather-icon icon="ClockIcon" size="16" class="mr-0 mr-sm-50" />
              รอพิจารณาอนุมัติ
            </b-badge>
            <b-badge
              v-if="props.row.canceled == 1"
              pill
              :variant="`light-danger`"
              class="text-capitalize"
            >
              {{ t("Canceled") }}
            </b-badge>
          </span>

          <span>
            {{ props.formattedRow[props.column.field] }}
          </span>

          <span v-if="props.column.field === 'action'">
            <b-badge
              v-if="
                props.row.sent_email_by != '' &&
                props.row.sent_email_by != null &&
                props.row.canceled != 1
              "
              style="cursor: pointer; margin-right: 2px"
              variant="danger"
              @click="inspectCancel(props.row)"
            >
              <feather-icon icon="XIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline">{{ t("Cancel") }}</span>
            </b-badge>
            <b-badge
              v-if="props.row.canceled == 1"
              style="cursor: pointer; margin-right: 2px"
              variant="info"
              @click="inspectData(props.row)"
            >
              <feather-icon icon="SearchIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline">{{ t("Information") }}</span>
            </b-badge>
            <b-badge
              v-if="props.row.sent_email_by == '' || props.row.sent_email_by == null"
              style="cursor: pointer; margin-right: 2px"
              variant="success"
              @click="inspectApprove(props.row)"
            >
              <feather-icon icon="CheckIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline">{{ t("Sent Invite") }}</span>
            </b-badge>
            <b-badge
              v-if="props.row.sent_email_by == '' || props.row.sent_email_by == null"
              style="cursor: pointer; margin-right: 2px"
              variant="warning"
              @click="inspectSkip(props.row)"
            >
              <feather-icon icon="CheckIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline">{{ t("Use Old Group") }}</span>
            </b-badge>
            <b-badge
              v-if="props.row.purchase_type === 'personal'"
              style="cursor: pointer; margin-right: 2px"
              variant="info"
              @click="handlePersonalAction(props.row)"
            >
              <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline">{{ t("Personal") }}</span>
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
          "ใช้กลุ่มเดิม" ระบบจะทำการแจ้งยอดชำระไปทางไลน์ไปให้ลูกค้าชำระทันที
      </b-col>
      <b-col  style="color:red;">
          "ส่งคำเชิญเข้ากลุ่มแล้ว" ระบบจะทำการรอ Email การตอบรับคำเชิญ และทำการแจ้งยอดชำระไปทางไลน์อัตโนมัติ <br/>
      </b-col>

    </b-card>

    
        <b-modal
            id="modal-approve"
            ref="modalApprove"
            v-model="showModalApprove"
            :title="t('Please confirm')"
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
        </b-modal>

        <b-modal
            id="modal-reject"
            ref="modalReject"
            v-model="showModalReject"
            :title="t('Please confirm')"
            @show="resetModalReject"        
            @hidden="resetModalReject"
            @ok="handleOkReject"      
            size="sm"  
            :hideHeaderClose="false"            
            ok-variant="warning"
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
                            v-model="skipNoteInput"                
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
                            v-model="skipNoteInput"                
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
                            v-model="skipNoteInput"                
                            rows="3"
                            max-rows="6"
                        ></b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-modal>

        <b-modal
            id="modal-join-group"
            ref="modalJoinGroup"
            v-model="showModalJoinGroup"
            :title="t('Join Group')"
            @show="resetModalJoinGroup"        
            @hidden="resetModalJoinGroup"
            @ok="handleOkJoinGroup"      
            size="md"  
            :hideHeaderClose="false"            
            ok-variant="success"
            :okTitle="t('YES')"
            buttonSize="md"
            :cancelTitle="t('NO')"
            footerClass="p-2"
        >
                
            <b-row>                
                <b-col md="12">
                    <b-form-group :label="t('Select Group')" label-for="group-selected">
                        <b-input-group class="input-group-merge">
                            <b-input-group-prepend is-text>
                                <feather-icon icon="UsersIcon" />
                            </b-input-group-prepend>
                            <b-form-select v-model="selectedSubScribeGroupId" :options="optionSubScribeGroup" @change="groupChange()"></b-form-select>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="12">
                   <hr/>
                </b-col>
            </b-row>
           
            <b-row>
                <b-col md="12">
                    <span>{{ t('Amount') }}: <b-badge pill :variant="`light-success`" class="text-capitalize">{{memberInGroupList.length}}</b-badge> {{ t('Member') }}</span>
                </b-col>                
            </b-row>
            <b-row>
                <b-col md="12">
                   <hr/>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="12">
                    <b-form-group :label="t('Member in group')" label-for="member-in-group">
                        <b-row v-for="item in memberInGroupList" :key="item.email" style="padding-left: 30px;" >
                            <b-col>
                                <span style="padding-left: 10px;color:grey;cursor: pointer;"> {{ item.email }} </span>
                            </b-col>
                        </b-row>
                    </b-form-group>
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
            label: t('Email'),
            field: 'email',  
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
            label: t('Group Name'),
            field: 'group_name2',
            width: '10%',
            },
            {
            label: t('Invite Date'),
            field: 'sent_invite_at',
            width: '10%',
            },
           
            {
            label: t('Invite By'),
            field: 'sent_email_by',
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

      skipNoteInput:"",
      skipOrderId:0,
      approveOrderId:0,
      approveNoteInput:"",
      
      pagePermission:[],
      showModalJoinGroup:false,

      selectedSubScribeGroupId : 0,
      selectedSubScribeEmail : '',
      selected_user_id : '',

      memberInGroupList:[],
      groupList:[],

      selectedSubScribeGroupId:0,
      optionSubScribeGroup : [{
          value: 0,
          text: 'Select Group'
      },],
      
      // Personal Email Modal
      showModalPersonalEmail: false,
      personalEmailData: [],
      loadingPersonalEmail: false,
      selectedOrderId: null,
      
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
    
    await Promise.all([
          this.search(),
          this.getActiveGroupList(),
      ]);           

    console.log(this.page_name);
  },
  methods: {
    
    ...mapActions(["GetPagePermission"]),
    ...mapActions(["GetHistorySubScribeOrderWaitInvitation"]),
    ...mapActions(["SentFamliyInviteOrder"]),
    ...mapActions(["SkipFamliyInviteOrder"]),
    ...mapActions(["GetActiveSubscriptionGroup"]),
    ...mapActions(["GetSubscribeMemberByGroupById"]),
    ...mapActions(["AddMemberToGroup"]),
    ...mapActions(["GetPersonalEmailStatusByOrderId"]),
    ...mapActions(["GetPersonalEmailByOrderId"]),
    
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

          const response = await this.GetHistorySubScribeOrderWaitInvitation(form);
          if (response.data.status == 'success') {           
              this.rowsOrderHistory = response.data.data;
              
              // Fetch personal email status for personal orders
              for (let index = 0; index < this.rowsOrderHistory.length; index++) {
                  const element = this.rowsOrderHistory[index];
                  
                  // if (element.purchase_type === 'personal') {
                  //     await this.fetchPersonalEmailStatus(element.id, index);
                  // }
                  if (element.purchase_type === 'personal') {
                    //await this.fetchPersonalEmailStatus(element, index);
                    this.rowsOrderHistory[index].personal_email_status = this.rowsOrderHistory[index].personal_email_status_regis
                  } else if (element.purchase_type === 'email') {
                    //await this.fetchEmailStatus(element, index);
                    this.rowsOrderHistory[index].personal_email_status = this.rowsOrderHistory[index].user_email_status_regis
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
                                                        
        const response = await this.SentFamliyInviteOrder(form);
        if (response.data.status == "success") {
            //

            this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                    title: `Approve Order`,
                    icon: 'EditIcon',
                    variant: 'success',
                    text: this.$t(`Approve Order Succesful`),
                },
                autoHideDelay: 3000,
            });

            this.search()
            
            
        } else {
            this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                    title: `Approve Order`,
                    icon: 'TrashIcon',
                    variant: 'danger',
                    text: this.$t('Approve Order UnSuccesful') +` ${response.data.message}`,
                },
                autoHideDelay: 3000,
            });
            
        }
        
        
    },        
    async handleOkCancel()
    {
        //CancelSubScribeOrder
        const note = this.skipNoteInput;
        console.log("handleOkCancel");

        const userData = JSON.parse(localStorage.getItem('userData'));
        const form = new FormData();

        form.append("userid", userData.username);
        form.append("token", userData.token);

        form.append("admin_id", userData.username);
        form.append("order_id", this.skipOrderId);
        form.append("note", note?note:'');
                                                        
        const response = await this.SkipFamliyInviteOrder(form);
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

            this.search()
            
            
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
        const note = this.skipNoteInput;
        console.log("handleOkReject");

        const userData = JSON.parse(localStorage.getItem('userData'));
        const form = new FormData();

        form.append("userid", userData.username);
        form.append("token", userData.token);

        form.append("admin_id", userData.username);
        form.append("order_id", this.skipOrderId);
        form.append("note", note?note:'');
                                                        
        const response = await this.SkipFamliyInviteOrder(form);
        if (response.data.status == "success") {
            //

            this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                    title: `Skip Invitation`,
                    icon: 'EditIcon',
                    variant: 'success',
                    text: this.$t(`Skip Invitation Succesful`),
                },
                autoHideDelay: 3000,
            });

            this.search()
            
            
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
        this.skipNoteInput = itemData.note;
    },
    async inspectCancel(itemData)
    {
        this.showModalCancel = true;            
        this.skipNoteInput = itemData.note;
        this.skipOrderId = itemData.id;
        
    },
    async inspectApprove(itemData)
    {
        this.showModalApprove=true;
        this.approveNoteInput = itemData.note;
        this.approveOrderId = itemData.id;
    },
    async inspectSkip(itemData)
    {
        this.showModalReject=true;                   
        this.skipNoteInput = itemData.note;
        this.skipOrderId = itemData.id;
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
    resetModalJoinGroup()
    {
        
    },
    async handleOkJoinGroup()
    {
        

        const userData = JSON.parse(localStorage.getItem('userData'));
        const form = new FormData();

        form.append("userid", userData.username);
        form.append("token", userData.token);

        form.append("admin_id", userData.username);            
        form.append("group_id", this.selectedSubScribeGroupId);
        form.append("email", this.selectedSubScribeEmail);
        form.append("user_id", this.selected_user_id);
        
        const response = await this.AddMemberToGroup(form);
        if (response.data.status == 'success') {                       
            this.search();
            this.groupChange();

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
            this.showModalJoinGroup = true;
        }
    },
    async getActiveGroupList() {
          const userData = JSON.parse(localStorage.getItem('userData'));
          const User = new FormData();

          User.append("userid", userData.username);
          User.append("token", userData.token);
          User.append("page_name", this.$route.name);

          const response = await this.GetActiveSubscriptionGroup(User);
          if (response.data.status == 'success') {                
              this.groupList = response.data.data; 
              let tmpArray = [];                
              this.groupList.forEach(element => {
                      tmpArray.push({
                          value: element.id,
                          text: "["+element.subscription_name+"] "+ element.group_name
                      });
                  });             
              this.optionSubScribeGroup = tmpArray;
              this.selectedSubScribeGroupId = tmpArray[0].value;

          } else {

          }
      },
    
    async groupChange()
        {
            console.log("groupChange")
            const userData = JSON.parse(localStorage.getItem('userData'));
            const User = new FormData();

            User.append("userid", userData.username);
            User.append("token", userData.token);
            User.append("page_name", this.$route.name);
            User.append("id", this.selectedSubScribeGroupId);

            const response = await this.GetSubscribeMemberByGroupById(User);
            if (response.data.status == 'success') {                
                this.memberInGroupList = response.data.data; 
                
            } else {

            }
        },
    async confirmJoinGroup(selectedSubScribeGroupId,selectedSubScribeEmail,selected_user_id)
    {
      console.log("confirmJoinGroup");
        this.selectedSubScribeGroupId =selectedSubScribeGroupId;
        this.selectedSubScribeEmail = selectedSubScribeEmail;
        this.selected_user_id =selected_user_id;
          this.showModalJoinGroup=true;
          this.groupChange();
    },
    async handlePersonalAction(itemData)
    {
      console.log("handlePersonalAction", itemData);
      
      this.selectedOrderId = itemData.id;
      this.showModalPersonalEmail = true;
      await this.loadPersonalEmailData(itemData.id);
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
