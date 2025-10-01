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

    <b-card :title="t('Order Near Expire')">
      
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

          <span v-if="props.column.field === 'start_date2'">
            {{
              props.row.start_date != null
                ? formatDateAssigned2(props.row.start_date)
                : ""
            }}
          </span>
          <span v-if="props.column.field === 'end_date2'">
            {{
              props.row.end_date != null
                ? formatDateAssigned2(props.row.end_date)
                : ""
            }}
          </span>
          
          
          <span v-if="props.column.field === 'days_left2'">
            <b-badge
              v-if="
                props.row.days_left <=7 && props.row.days_left >3
              "
              pill
              :variant="`light-success`"
              class="text-capitalize"
            >
              {{ props.row.days_left }} วัน
            </b-badge>
            <b-badge
              v-if="
                props.row.days_left <=3
              "
              pill
              :variant="`light-danger`"
              class="text-capitalize"
            >
              {{ props.row.days_left }} วัน
            </b-badge>
            <b-badge
              v-if="
                props.row.days_left <=0
              "
              pill
              :variant="`light-danger`"
              class="text-capitalize"
            >
              {{ t('Expired') }}
            </b-badge>
          </span>

          <span v-if="props.column.field === 'latest_offer_message_at2'">
          {{
            props.row.latest_offer_message_at != null
              ? formatDateAssigned(props.row.latest_offer_message_at)
              : ""
          }}
          {{ 
          props.row.offer_by != null && props.row.offer_by != ""
              ? "("+props.row.offer_by+")"
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
          <span v-if="props.column.field === 'slip'" >
            <b-img v-if="props.row.slip_file_url!=''" 
              @click="showImage(props.row)"
              :src="props.row.slip_file_url"
              fluid
              thumbnail
              style="cursor: pointer; height: 100px"
            />
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
              {{ t("Correct Slip") }}
              {{
                props.row.slip_file_at != null
                  ? formatDateAssigned(props.row.slip_file_at)
                  : ""
              }}
            </b-badge>
            <b-badge
              v-if="
                props.row.slip_correct == 0 
              "
              pill
              :variant="`light-danger`"
              class="text-capitalize"
            >
              {{ t("Incorrect Slip") }}
              {{
                props.row.slip_file_at != null
                  ? formatDateAssigned(props.row.slip_file_at)
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

          <span>
            {{ props.formattedRow[props.column.field] }}
          </span>

          <span v-if="props.column.field === 'action'">
            <b-badge
              v-if="props.row.slip_correct==0||props.row.slip_correct==1"
              style="cursor: pointer; margin-right: 2px"
              variant="info"
              @click="inspectData(props.row)"
            >
              <feather-icon icon="SearchIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline">{{ t("Information") }}</span>
            </b-badge>

            <b-badge
              style="cursor: pointer; margin-right: 2px"
              variant="info"
              @click="sendLineMessageOffer(props.row)"
            >
              <feather-icon icon="MailIcon" size="16" class="mr-0 mr-sm-50" />
              <span class="d-none d-sm-inline">{{ t("Send Message Offer") }}</span>
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
            hide-footer
        >
            <b-row>
                <b-col md="12">
                    <b-form-group
                        label-for="cancel-note-input"                    
                        >
                        <img :src="imageModal"
                          style="min-width: 300px;max-width: 300px; max-height: 600px;"
                        />
                        
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="12">
                    <b-badge
                      v-if="
                        selectImageData.slip_correct == 1 
                      "
                      pill
                      :variant="`light-success`"
                      class="text-capitalize"
                    >
                      {{ t("Correct Slip") }}
                      {{
                        selectImageData.slip_file_at != null
                          ? formatDateAssigned2(selectImageData.slip_file_at)
                          : ""
                      }}
                    </b-badge>
                    <b-badge
                      v-if="
                        selectImageData.slip_correct == 0 
                      "
                      pill
                      :variant="`light-danger`"
                      class="text-capitalize"
                    >
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

    const columnsOrderHistory =  [
            {
            label: t('Email'),
            field: 'email',  
            width: '10%',          
            },
            {
            label: t('Product'),
            field: 'subscription_img2',  
            width: '20%',          
            },
            {
            label: t('Start Date'),
            field: 'start_date2',
            width: '10%',
            },
            {
            label: t('End Date'),
            field: 'end_date2',
            width: '10%',
            },     
            {
            label: t('Days Left'),
            field: 'days_left2',
            width: '10%',
            },         
            {
            label: t('Latest Sent Message'),
            field: 'latest_offer_message_at2',
            width: '20%',
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
    ...mapActions(["GetOrderNearExpire"]),
    ...mapActions(["VerifySlipOrder"]),
    ...mapActions(["SentPaymentMessageOrder"]),
    ...mapActions(["SentPaymentMessageNearOrder"]),
     
    
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

          const response = await this.GetOrderNearExpire(form);
          if (response && response.data && response.data.status == 'success') {           
              this.rowsOrderHistory = response.data.data;                
              // for (let index = 0; index < this.rowsOrderHistory.length; index++) {
              //     const element = this.rowsOrderHistory[index];
              //     // if (element.end_date!=null) {
              //     //     let diffDay = new Date(element.end_date).getTime() - new Date().getTime();
              //     //     diffDay = Math.ceil(diffDay / (1000 * 3600 * 24)); // days
              //     //     this.rowsOrderHistory[index]['diffDay'] = diffDay;
              //     // }
              // }
          } else {
              this.$toast(
              {
                  component: ToastificationContent,
                  props: {
                  title: (response && response.data && response.data.message) || 'ไม่พบข้อมูลคำสั่งซื้อ',
                  icon: 'EditIcon',
                  variant: 'error',
                  },
              });
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
      if (response && response.data && response.data.status == "success") {
        this.pagePermission = response.data.data;
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: (response && response.data && response.data.message) || 'ไม่สามารถเข้าถึงได้',
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
                                                        
        const response = await this.VerifySlipOrder(form);
        if (response && response.data && response.data.status == "success") {
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
                    text: this.$t('Update Order UnSuccesful') + ` ${(response && response.data && response.data.message) || 'ไม่ทราบสาเหตุ'}`,
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
        if (response && response.data && response.data.status == "success") {
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
                    text: this.$t('Cancel Order UnSuccesful') + ` ${(response && response.data && response.data.message) || 'ไม่ทราบสาเหตุ'}`,
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
        form.append("slip_correct", 1);
                                                        
        const response = await this.VerifySlipOrder(form);
        if (response && response.data && response.data.status == "success") {
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
                    text: this.$t('Update Order UnSuccesful') + ` ${(response && response.data && response.data.message) || 'ไม่ทราบสาเหตุ'}`,
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
    async sendLineMessageOffer(item)
    {
        const note = this.cancelNoteInput;
        console.log("handleOkReject");

        const userData = JSON.parse(localStorage.getItem('userData'));
        const form = new FormData();

        form.append("userid", userData.username);
        form.append("token", userData.token);

        form.append("admin_id", userData.username);
        form.append("order_id", item.id);
        form.append("days_left", item.days_left);
                                                        
        const response = await this.SentPaymentMessageNearOrder(form);
        
        // Check if response and response.data exist
        if (response && response.data) {
          if (response && response.data && response.data.status == "success") {
            //

            this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                    title: `Send Message`,
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
                title: `Send Message`,
                icon: 'TrashIcon',
                variant: 'danger',
                text: this.$t('Send Message UnSuccesful') + ` ${response.data.message || 'ไม่ทราบสาเหตุ'}`,
              },
              autoHideDelay: 3000,
            });
          }
        } else {
          console.error('Invalid response structure:', response);
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: `Send Message`,
              icon: 'TrashIcon',
              variant: 'danger',
              text: this.$t('Send Message UnSuccesful') + ' tmpReturnData is not defined',
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
</style>
