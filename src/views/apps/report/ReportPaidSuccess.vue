<template>  
  
  <div>

    <b-card no-body v-if="!showInspectApprove" >
        <div class="m-2">

        <!-- Table Top -->
        <b-row>
          <b-col
            cols="12"
            md="3"
            class="d-flex align-items-center justify-content-start mb-1"
          > 
            <b-form-datepicker id="fromDate" v-model="fromDate" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="th"></b-form-datepicker>          
          </b-col>
      
          <b-col
            cols="12"
            md="3"
            class="d-flex align-items-center justify-content-start mb-1"
          > 
            <b-form-datepicker id="toDate" v-model="toDate" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="th" ></b-form-datepicker>          
          </b-col>

          
          <b-col
            cols="3"
            md="4"
            class="d-flex align-items-center justify-content-start mb-1"
          > 
            <b-button variant="primary" @click="search">
            <feather-icon
              icon="SearchIcon"              
            />            
            </b-button>
          </b-col>

           
           <b-col
            cols="9"
            md="2"
            class="d-flex align-items-center justify-content-start mb-1"
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

        </b-row>

      </div>
    </b-card>

    <Transition name="bounce">
            <b-card-code v-if="showInspectApprove">
                <b-tabs v-model="tabIndex" pills @input="tabChange">
                        <b-tab>
                          <template #title>
                              <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
                              <span class="d-none d-sm-inline">{{t('Information')}}</span>
                          </template>
                          <div>
                            <b-row >
                                  <b-col md="12">
                                      <hr/>
                                  </b-col>
                              </b-row> 
                            <b-row>
                              <b-col md="12">                                
                                  <b-form-group              
                                      :label="t('Loan Type')"
                                      label-for="loan-type-selected"
                                      >
                                      {{ inspectApproveData.interest_name }}
                                      
                                  </b-form-group>
                              </b-col>
                            </b-row>  
                            <b-row>
                                <b-col md="12">
                                    <hr/>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col md="2">
                                    <b-form-group :label="t('Period Type')" label-for="period-name">                                                
                                        {{ period_name2 }}
                                    </b-form-group>
                                </b-col>
                                <b-col md="2">
                                    <b-form-group :label="t('Collateral')" label-for="Collateral">                                                
                                        {{ collateral_name2 }}
                                    </b-form-group>
                                </b-col>
                                <b-col md="2">
                                    <b-form-group :label="t('Calculate Interest Every')" label-for="cal-interest-every">                                                
                                        {{ period_number2 }}&nbsp;{{ period_unit2 }}
                                    </b-form-group>
                                </b-col>
                                
                            </b-row>
                            <b-row>
                                <b-col md="12">
                                    <hr/>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col md="2">
                                    <b-form-group :label="t('Need Loan Amount')" label-for="loan-amount">                                                
                                        {{ loan_amount2 }}
                                    </b-form-group>
                                </b-col>
                                <b-col md="2">
                                    <b-form-group :label="t('Interest')" label-for="interest">                                                
                                        {{ interest2 }}
                                    </b-form-group>
                                </b-col>
                                <b-col md="2">
                                    <b-form-group :label="t('Longtime')+' ('+period_unit2+')'" label-for="loan_longtime_number">                                                
                                        {{ loan_longtime_number2 }}
                                    </b-form-group>
                                </b-col>
                                <b-col md="2">
                                    <b-form-group :label="t('Start Date')" label-for="loan_start_at">                                    
                                        {{ formatDateAssigned2(loan_start_at2) }}
                                    </b-form-group>
                                </b-col>

                                <b-col md="2">
                                    <b-form-group :label="t('Effective Rate')" label-for="effective_rate">
                                        <b-form-checkbox
                                            id="effective_rate2"
                                            name="effective_rate2"
                                            v-model="effective_rate2"
                                            value="1"
                                            unchecked-value="0"    
                                            :disabled="true"
                                        >
                                            {{t('Yes')}}          
                                        </b-form-checkbox>                        
                                    </b-form-group>
                                </b-col>

                            </b-row>
                            <b-row>
                                <b-col md="12">
                                    <hr/>
                                </b-col>
                            </b-row>
                              <b-row>
                                  <b-col md="3" v-if="inspectApproveData.collateral_img1.length>0">
                                      <b-form-group              
                                          :label="t('Attach File')"
                                          label-for="attach-file1"
                                          >
                                          <a target="_blank" :href="inspectApproveData.collateral_img1">
                                              <b-img :src="inspectApproveData.collateral_img1" fluid thumbnail style="height: 200px;" />
                                          </a>
                                      </b-form-group>
                                      
                                  </b-col>

                                  <b-col md="3" v-if="inspectApproveData.collateral_img2.length>0">
                                      <b-form-group              
                                          :label="t('Attach File')"
                                          label-for="attach-file2"
                                          >
                                          <a target="_blank" :href="inspectApproveData.collateral_img2">
                                              <b-img :src="inspectApproveData.collateral_img2" fluid thumbnail style="height: 200px;" />
                                          </a>  
                                      </b-form-group>                                          
                                  </b-col>

                                  <b-col md="3" v-if="inspectApproveData.collateral_img3.length>0">
                                      <b-form-group              
                                          :label="t('Attach File')"
                                          label-for="attach-file3"
                                          >
                                          <a target="_blank" :href="inspectApproveData.collateral_img3">
                                              <b-img :src="inspectApproveData.collateral_img3" fluid thumbnail style="height: 200px;" />
                                          </a>          
                                      </b-form-group>                                   
                                  </b-col>

                                  <b-col md="3" v-if="inspectApproveData.collateral_img4.length>0">
                                      <b-form-group              
                                          :label="t('Attach File')"
                                          label-for="attach-file4"
                                          >
                                          <a target="_blank" :href="inspectApproveData.collateral_img4">
                                              <b-img :src="inspectApproveData.collateral_img4" fluid thumbnail style="height: 200px;" />
                                          </a>
                                      </b-form-group>
                                  </b-col>
                              </b-row>

                              <b-row v-if="inspectApproveData.collateral_img1.length>0 || inspectApproveData.collateral_img2.length>0 || inspectApproveData.collateral_img3.length>0 || inspectApproveData.collateral_img4.length>0" >
                                  <b-col md="12">
                                      <hr/>
                                  </b-col>
                              </b-row>
                              
                              
                          </div>
                        </b-tab>

                        <b-tab>
                          <template #title>
                              <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
                              <span class="d-none d-sm-inline">{{t('Payment All')}}</span>
                          </template>
                          <div>
                            <b-row >
                                  <b-col md="12">
                                      <hr/>
                                  </b-col>
                              </b-row> 
                            <b-row>
                                <b-col md="12" v-if="!showLoanPayment">                                            
                                    <vue-good-table ref="my-table-calculate2" :columns="columnsCal" :rows="rowsCal" :rtl="direction" :line-numbers="true"
                                    :search-options="{
                                        enabled: false,                                        
                                    }" :select-options="{
                                        enabled: false,
                                        selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
                                        selectionInfoClass: 'custom-class',
                                        selectionText: 'rows selected',
                                        clearSelectionText: 'clear',
                                        disableSelectInfo: true, // disable the select info panel on top
                                        selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
                                    }" :pagination-options="{
                                        enabled: true,
                                        perPage: pageLength3
                                    }" theme="polar-bear">                                        
                                        <template slot="table-row" slot-scope="props">

                                            <span v-if="props.column.field === 'payment_date2'">              
                                                {{formatDateAssigned2(props.row.payment_date)}}
                                            </span>
                                            
                                            <span v-if="props.column.field === 'principle_amount2'">       
                                                
                                                    {{(props.row.principle_amount).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                                                
                                            </span>
                                            
                                            <span v-if="props.column.field === 'interest_amount2'">              
                                                
                                                
                                                    {{(props.row.interest_amount).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                                                
                                            </span>

                                            <span v-if="props.column.field === 'payment_status2'">
                                              <b-badge
                                                  pill
                                                  :variant="`light-success`"
                                                  class="text-capitalize"
                                                  v-if="props.row.paid==1"
                                              >
                                                  {{ t('Paid') }}
                                              </b-badge>
                                              <br v-if="props.row.paid==1" />
                                              <b-badge
                                                  pill
                                                  :variant="`light-success`"
                                                  class="text-capitalize"
                                                  v-if="props.row.paid==1"
                                              >
                                                  {{  formatDateAssigned2(props.row.paid_at) }}
                                              </b-badge>    
                                              <br v-if="props.row.paid==1" />
                                              <b-badge
                                                  pill
                                                  :variant="`light-success`"
                                                  class="text-capitalize"
                                                  v-if="props.row.paid==1"
                                              >
                                                  {{t('Receive Amount')}} :
                                                  {{  (props.row.total_received_amount)?(props.row.total_received_amount).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }):'0.00' }}
                                              </b-badge>  

                                              <b-badge
                                                  pill
                                                  :variant="`light-warning`"
                                                  class="text-capitalize"
                                                  v-if="props.row.closed==1"
                                              >
                                                  {{t('Forward To Next Due')}} :                           
                                              </b-badge>
                                              <br v-if="props.row.closed==1" />
                                              <b-badge
                                                  pill
                                                  :variant="`light-warning`"
                                                  class="text-capitalize"
                                                  v-if="props.row.closed==1"
                                              >
                                                  {{  formatDateAssigned2(props.row.close_at) }}
                                              </b-badge>   
                                              
                                              <b-badge
                                                  pill
                                                  :variant="`light-danger`"
                                                  class="text-capitalize"
                                                  v-if="props.row.paid==0"
                                              >
                                                  {{ t('Not Paid')}}
                                              </b-badge>

                                            </span>

                                            <span>
                                            {{ props.formattedRow[props.column.field] }}
                                            </span>

                                        </template>
                                        
                                        <template slot="pagination-bottom" slot-scope="props">
                                            <div class="d-flex justify-content-between flex-wrap">
                                            <div class="d-flex align-items-center mb-0 mt-1">
                                                <span class="text-nowrap ">
                                                {{t("Showing") +" 1 " + t("to") }}
                                                </span>
                                                <b-form-select v-model="pageLength3" :options="['3', '5', '10', '20', '50', '100']" class="mx-1"
                                                @input="(value) => props.perPageChanged({ currentPerPage: value })" />
                                                <span class="text-nowrap"> {{t('of')}} {{ props.total }} {{t('entries')}} </span>
                                            </div>
                                            <div>
                                                <b-pagination :value="1" :total-rows="props.total" :per-page="pageLength3" first-number last-number
                                                    align="right" prev-class="prev-item" next-class="next-item" class="mt-1 mb-0"
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
                                </b-col>

                                <b-col md="12" v-if="showLoanPayment">                                            
                                    <vue-good-table ref="my-table-payment" :columns="columnsPayment" :rows="rowsPayment" :rtl="direction" :line-numbers="true"
                                    :search-options="{
                                        enabled: false,                                        
                                    }" :select-options="{
                                        enabled: false,
                                        selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
                                        selectionInfoClass: 'custom-class',
                                        selectionText: 'rows selected',
                                        clearSelectionText: 'clear',
                                        disableSelectInfo: true, // disable the select info panel on top
                                        selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
                                    }" :pagination-options="{
                                        enabled: true,
                                        perPage: pageLength3
                                    }" theme="polar-bear">                                        
                                        <template slot="table-row" slot-scope="props">

                                            <span v-if="props.column.field === 'due_date2'">              
                                                {{formatDateAssigned2(props.row.due_date)}}
                                            </span>
                                            
                                            <span v-if="props.column.field === 'principle_amount2'">       
                                                
                                                    {{(props.row.principle_amount).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                                                
                                            </span>
                                            
                                            <span v-if="props.column.field === 'interest_amount2'">              
                                                
                                                
                                                    {{(props.row.interest_amount).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                                                
                                            </span>

                                            <span v-if="props.column.field === 'total_amount2'">    
                                                <b-badge
                                                    pill
                                                    variant="success"
                                                >
                                                {{(props.row.total_amount).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                                                </b-badge>                                                
                                            </span>

                                            <span v-if="props.column.field === 'payment_status2'">
                                              <b-badge
                                                  pill
                                                  :variant="`light-success`"
                                                  class="text-capitalize"
                                                  v-if="props.row.paid==1"
                                              >
                                                  {{ t('Paid') }}
                                              </b-badge>
                                              <br v-if="props.row.paid==1" />
                                              <b-badge
                                                  pill
                                                  :variant="`light-success`"
                                                  class="text-capitalize"
                                                  v-if="props.row.paid==1"
                                              >
                                                  {{  formatDateAssigned2(props.row.paid_at) }}
                                              </b-badge>    
                                              <br v-if="props.row.paid==1" />
                                              <b-badge
                                                  pill
                                                  :variant="`light-success`"
                                                  class="text-capitalize"
                                                  v-if="props.row.paid==1"
                                              >
                                                  {{t('Receive Amount')}} :
                                                  {{  (props.row.total_received_amount)?(props.row.total_received_amount).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }):'0.00' }}
                                              </b-badge>  

                                              <b-badge
                                                  pill
                                                  :variant="`light-warning`"
                                                  class="text-capitalize"
                                                  v-if="props.row.closed==1"
                                              >
                                                  {{t('Forward To Next Due')}} :                           
                                              </b-badge>
                                              <br v-if="props.row.closed==1" />
                                              <b-badge
                                                  pill
                                                  :variant="`light-warning`"
                                                  class="text-capitalize"
                                                  v-if="props.row.closed==1"
                                              >
                                                  {{  formatDateAssigned2(props.row.close_at) }}
                                              </b-badge>   
                                              
                                              <b-badge
                                                  pill
                                                  :variant="`light-danger`"
                                                  class="text-capitalize"
                                                  v-if="props.row.paid==0"
                                              >
                                                  {{ t('Not Paid')}}
                                              </b-badge>

                                            </span>
                                            <span v-if="props.column.field === 'action'">                                                    
                                                <b-badge style="cursor: pointer; margin-right:2px" variant="info" @click="showPaymentNote(props.row)">
                                                    <feather-icon icon="SearchIcon" size="16" class="mr-0 mr-sm-50" />
                                                    <span class="d-none d-sm-inline">{{t('Inspect')}}</span>
                                                </b-badge>
                                            </span>


                                            <span>
                                            {{ props.formattedRow[props.column.field] }}
                                            </span>

                                        </template>
                                        
                                        <template slot="pagination-bottom" slot-scope="props">
                                            <div class="d-flex justify-content-between flex-wrap">
                                            <div class="d-flex align-items-center mb-0 mt-1">
                                                <span class="text-nowrap ">
                                                {{t("Showing") +" 1 " + t("to") }}
                                                </span>
                                                <b-form-select v-model="pageLength3" :options="['3', '5', '10', '20', '50', '100']" class="mx-1"
                                                @input="(value) => props.perPageChanged({ currentPerPage: value })" />
                                                <span class="text-nowrap"> {{t('of')}} {{ props.total }} {{t('entries')}} </span>
                                            </div>
                                            <div>
                                                <b-pagination :value="1" :total-rows="props.total" :per-page="pageLength3" first-number last-number
                                                    align="right" prev-class="prev-item" next-class="next-item" class="mt-1 mb-0"
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
                                </b-col>
                            </b-row>
                            <b-row >
                                  <b-col md="12">
                                      <hr/>
                                  </b-col>
                              </b-row>
                            
                          </div>
                        </b-tab>

                        <b-tab>
                          <template #title>
                              <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
                              <span class="d-none d-sm-inline">{{t('Share Person')}}</span>
                          </template>
                          <div>          
                            <b-row >
                                  <b-col md="12">
                                      {{ t('Share Profit') }} : 
                                      <b-badge v-if="parseFloat(inspectprofitAmount)>=0" 
                                            pill
                                            variant="success"
                                          >
                                          {{ (parseFloat(inspectprofitAmount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) }} 
                                        </b-badge>    
                                        
                                        <b-badge v-if="parseFloat(inspectprofitAmount)<0" 
                                            pill
                                            variant="danger"
                                          >
                                          {{ (parseFloat(inspectprofitAmount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) }} 
                                        </b-badge>

                                  </b-col>
                            </b-row>        
                            <b-row >
                                  <b-col md="12">
                                      <hr/>
                                  </b-col>
                            </b-row>           
                            
                            <b-row v-for="item in rowsShareLoan"
                                    :key="item.id"   >
                                
                                  <b-col md="12">
                                    <b-row>
                                      <b-col md="3">
                                        {{ item.fullName }}
                                      </b-col>
                                      <b-col md="3">
                                          {{ item.share_percent }} %
                                      </b-col>
                                      <b-col md="3">
                                        <b-badge v-if="parseFloat(item.profitAmount)>=0" 
                                            pill
                                            variant="success"
                                          >
                                          {{ (parseFloat(item.profitAmount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) }} 
                                        </b-badge>    
                                        
                                        <b-badge v-if="parseFloat(item.profitAmount)<0" 
                                            pill
                                            variant="danger"
                                          >
                                          {{ (parseFloat(item.profitAmount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) }} 
                                        </b-badge>
                                      </b-col>
                                      <b-col md="3">

                                      </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col md="12">
                                          <hr/>
                                        </b-col>
                                    </b-row>
                                  </b-col>
                            </b-row>
                            <b-row >
                                  <b-col md="12">
                                      <hr/>
                                  </b-col>
                              </b-row>  

                          </div>
                        </b-tab>

                </b-tabs>
               
             

                <b-button @click="closeInspectionApprove" v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="outline-secondary" >
                        <feather-icon icon="DeleteIcon" />
                        {{t('Back')}}
                </b-button>  &nbsp;

                                
            </b-card-code>
    </Transition>

    <b-card :title="t('Report Paid Success')" v-if="!showInspectApprove">
      <!-- table -->
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :rtl="direction"
        :line-numbers="false"
        :search-options="{
          enabled: false,
          externalQuery: searchTerm }"
        :select-options="{
          enabled: false,
          selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
          selectionInfoClass: 'custom-class',
          selectionText: 'rows selected',
          clearSelectionText: 'clear',
          disableSelectInfo: true, // disable the select info panel on top
          selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
        }"
        :pagination-options="{
          enabled: true,
          perPage:pageLength
        }"         
        theme="polar-bear"
      >
        <template
          slot="table-row"
          slot-scope="props"
        >
            
            <div v-if="props.column.field === 'id2'">
                <b-media vertical-align="center">
                  <template #aside>                
                  </template>
                  <b-link                
                    class="font-weight-bold d-block text-nowrap"
                  >
                    {{ props.row.sl_users_id }}
                    <b-badge v-if="pagePermission.canViewAll==1" style="cursor: pointer; margin-right:2px" variant="info" @click="showDeptorInfo(props.row)">
                        <feather-icon icon="SearchIcon" size="16" class="mr-0 mr-sm-50" />                          
                    </b-badge>
                  </b-link>

                  <h6 class="text-muted" v-if="pagePermission.canViewAll==1">@{{ props.row.sl_users_fullname }}</h6>
                  <h6 class="text-muted" v-if="pagePermission.canViewAll==0">@xxxxxxx</h6>
                  
                </b-media>
            </div>

            <span v-if="props.column.field === 'loan_amount2'">

              <b-row v-if="parseFloat(props.row.unpaid_previous_principle_amount)>0">
                  <b-col md="6" class="text-right">
                    {{ t('Unpaid Principle Amount')}} :
                  </b-col>
                  <b-col md="6" class="text-right">
                   
                        {{(parseFloat(props.row.unpaid_previous_principle_amount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                    
                  </b-col>
                </b-row>

                <b-row v-if="parseFloat(props.row.unpaid_previous_interest_amount)>0">
                  <b-col md="6" class="text-right">
                    {{ t('Unpaid Interest Amount')}} :
                  </b-col>
                  <b-col md="6" class="text-right">
                   
                        {{(parseFloat(props.row.unpaid_previous_interest_amount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                    
                  </b-col>
                </b-row>

                <b-row v-if="parseFloat(props.row.unpaid_previous_fine_amount)>0">
                  <b-col md="6" class="text-right">
                    {{ t('Unpaid Fine Amount')}} :
                  </b-col>
                  <b-col md="6" class="text-right">
                   
                        {{(parseFloat(props.row.unpaid_previous_fine_amount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                    
                  </b-col>
                </b-row>
                                
                <b-row>
                  <b-col md="6" class="text-right">
                    {{ t('Principle Amount')}} :
                  </b-col>
                  <b-col md="6" class="text-right">
                   
                        {{(parseFloat(props.row.principle_amount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                    
                  </b-col>
                </b-row>

                <b-row>
                  <b-col md="6" class="text-right">
                    {{ t('Interest Amount')}} :
                  </b-col>
                  <b-col md="6" class="text-right">
                    
                        {{(parseFloat(props.row.interest_amount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                    
                  </b-col>
                </b-row>

                <b-row>
                  <b-col md="6" class="text-right">
                    {{ t('Fine Amount')}} :
                  </b-col>
                  <b-col md="6" class="text-right">
                    
                        {{(parseFloat(props.row.fine_amount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                    
                  </b-col>
                </b-row>

                <b-row>
                  <b-col md="6" class="text-right">
                    {{ t('Total Amount')}} :
                  </b-col>
                  <b-col md="6" class="text-right">
                      <b-badge
                          pill
                          variant="info"
                      >
                        {{(parseFloat(props.row.total_amount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                    </b-badge>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col md="12">
                    <hr/>
                  </b-col>
                </b-row>

                
            </span>

            <span v-if="props.column.field === 'payment_total_received_amount2'"> 
              <b-row>
                <b-col md="12" class="text-right">
                  <b-badge
                    pill
                    variant="success"
                >
                    {{(parseFloat(props.row.total_received_amount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
                </b-badge>
                </b-col>
              </b-row>      
                
            </span>
            


            <span v-if="props.column.field === 'action'">
              <span>
                <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
                  <template v-slot:button-content>
                    <feather-icon icon="MoreVerticalIcon" size="16" class="text-body align-middle mr-25" />
                  </template>
                
                  <b-dropdown-item @click="inspectData(props.row)">
                    <feather-icon icon="Edit2Icon" class="mr-50" />
                    <span>{{t('Inspect')}}</span>
                  </b-dropdown-item>

                </b-dropdown>
              </span>
            </span>
          
          <span>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>

        
        <template
          slot="pagination-bottom"
          slot-scope="props"
        >
          <div class="d-flex justify-content-between flex-wrap">
            <div class="d-flex align-items-center mb-0 mt-1">
              <span class="text-nowrap ">
                {{t("Showing") +" 1 " + t("to") }}
              </span>
              <b-form-select
                v-model="pageLength"
                :options="['3','5','10']"
                class="mx-1"
                @input="(value)=>props.perPageChanged({currentPerPage:value})"
              />
              <span class="text-nowrap"> {{t('of')}} {{ props.total }} {{t('entries')}} </span>
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
                @input="(value)=>props.pageChanged({currentPage:value})"
              >
                <template #prev-text>
                  <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                  />
                </template>
                <template #next-text>
                  <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                  />
                </template>
              </b-pagination>
            </div>
          </div>
        </template>
      </vue-good-table>
     
    </b-card>

    <b-card  v-if="!showInspectApprove">
      <b-row>
        <b-col md="12">
          {{ t('Paid Success Amount') }} : 
                  <b-badge v-if="parseFloat(summaryReceive)>=0" 
                      pill
                      variant="success"
                    >
                    {{ (parseFloat(summaryReceive)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) }} 
                  </b-badge>    
                  
                  <b-badge v-if="parseFloat(summaryReceive)<0" 
                      pill
                      variant="danger"
                    >
                    {{ (parseFloat(summaryReceive)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) }} 
                  </b-badge>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <hr/>
        </b-col>
      </b-row>
      <b-row v-for="item in rowsShareReceive"
                                    :key="item.id"   >
          <b-col md="12">
            <b-row>
              <b-col md="2">
              {{ item.fullName }}
              </b-col>
              <b-col md="4">      
                      <b-badge v-if="parseFloat(item.totalReceiveAmount)>=0" 
                          pill
                          variant="success"
                        >
                        {{ (parseFloat(item.totalReceiveAmount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) }} 
                      </b-badge>    
                      
                      <b-badge v-if="parseFloat(item.totalReceiveAmount)<0" 
                          pill
                          variant="danger"
                        >
                        {{ (parseFloat(item.totalReceiveAmount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) }} 
                      </b-badge>
                  
              </b-col>
              <b-col md="6">

              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <hr/>
              </b-col>
            </b-row>
          </b-col>              
      </b-row>
      
    </b-card>
    
    <b-modal
            id="modal-payment-note"
            ref="modalPaymentNote"
            v-model="showModalPaymentNote"
            :title="t('Note')"
            @show="resetModalPaymentNote"
            @hidden="resetModalPaymentNote"
            @ok="handleOkPaymentNote"      
            size="sm"  
            :hideHeaderClose="false"            
            ok-variant="info"
            :okTitle="t('Close')"
            buttonSize="lg"            
            footerClass="p-2"
            ok-only
            
        >
            <form ref="form" @submit.stop.prevent="handleOkPaymentNote">
                <b-row>
                    <b-col md="12">
                        <b-form-group 
                        :label="t('Attach File')"
                        label-for="payment-note-img1"                    
                        >
                            <a target="_blank" :href="paymentRefImg">
                                <b-img :src="paymentRefImg" fluid thumbnail style="height: 200px;" /><br/>
                            </a>
                        </b-form-group>
                    </b-col>
                </b-row>
                
                <b-row>
                    <b-col md="12">
                        <b-form-group
                            :label="t('Note')"
                            label-for="payment-note-input"                    
                            >
                            <b-form-textarea
                                id="payment-note-input"
                                v-model="paymentRefNote"                
                                rows="3"
                                max-rows="6"
                                readonly
                            ></b-form-textarea>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="12">
                        <b-form-group
                        :label="t('Note Date')"
                        label-for="payment-note-input"                    
                        >
                            <b-badge style="cursor: pointer; margin-right:2px" variant="info" >                                        
                                        <span class="d-none d-sm-inline">{{ paymentNoteAt }}</span>
                            </b-badge>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="12">
                        <b-form-group
                        :label="t('Note By')"
                        label-for="payment-note-input"                    
                        >
                            <b-badge style="cursor: pointer; margin-right:2px" variant="info" >                                        
                                        <span class="d-none d-sm-inline">{{ paymentNoteBy }}</span>
                            </b-badge>
                            
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
                        <b-pagination :value="paymentNotePage" :total-rows="4" :per-page="1" first-number last-number
                                align="right" prev-class="prev-item" next-class="next-item" class="mt-1 mb-0"
                                @input="(value) => paymentNoteChange(value)"
                        >
                                <template #prev-text>
                                    <feather-icon icon="ChevronLeftIcon" size="18" />
                                </template>
                                <template #next-text>
                                    <feather-icon icon="ChevronRightIcon" size="18" />
                                </template>
                        </b-pagination>
                    </b-col>
                </b-row>
                
            </form>
    </b-modal>



    <loan-information
      :showModal="showModalDeptorInfo"
      :deptorId="deptorId"
      @close-deptor-info="closeModalDeptorInfo"
    />

  </div>
  
</template>

<script>

import BCardCode from '@core/components/b-card-code/BCardCode.vue';

import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,BRow, BCol,BButton,BFormDatepicker,BCard,BInputGroup, BInputGroupPrepend,BMedia,BLink,BFormCheckbox,BTabs,
    BTab,BFormTextarea,BImg
} from 'bootstrap-vue';
import { VueGoodTable } from 'vue-good-table';

import store from '@/store/index';
import { mapActions } from "vuex";

import { ref, onUnmounted } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'


import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { useUtils as useI18nUtils } from '@core/libs/i18n'

import LoanInformation from '../loan/LoanInformation.vue'

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
    BMedia,
    BLink,
    BFormCheckbox,
    BTabs,
    BTab,
    BFormTextarea,
    BImg,
    ToastificationContent,  
    LoanInformation,  

  },  
  directives: {
        Ripple,
    },
  // setup()
  // {
    
  //   const isAddNewUserSidebarActive = ref(false);
    
  //   return {
  //     // Sidebar
  //     isAddNewUserSidebarActive,
  //   }
  // }
  // ,
  setup() {
    const { t } = useI18nUtils();

    function formatDateAssigned(value) {
      let formattedDate = new Date(value);
      formattedDate = new Date(formattedDate.getTime() - 25200000); // 60 * 60 * 1000 * 8
      // const formattedDate = new Date().fromISO(value).toLocaleString(DateTime.DATETIME_SHORT);
      return formattedDate.getFullYear()+'-'+ ('0' + (formattedDate.getMonth()+1)).slice(-2) +'-'+ ('0' + (formattedDate.getDate())).slice(-2) +' '+formattedDate.toLocaleTimeString('th-TH', {hour12: false});
    };

    function formatDateAssigned2(value) {
            let formattedDate = new Date(value);
            formattedDate = new Date(formattedDate.getTime() - 3600000); // 60 * 60 * 1000 * 1
            return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2);
    };

    let columns =  [
         {
          label: t('Due Date'),
          field: 'due_date',          
          formatFn: formatDateAssigned2,
        },
        {
          label: t('Username/Fullname'),
          field: 'id2',                    
        },

        {
            label: t('Loan Amount'),
            field: 'loan_amount2',   
            width : '30%',
            thClass: 'text-center',
        },
        {
            label: t('Total Received'),
            field: 'payment_total_received_amount2',   
            thClass: 'text-center',
        },         

        {
            label: t('Assign To'),
            field: 'staff_id',   
            thClass: 'text-center',
        },
       
        {
          label: t('Action'),
          field: 'action',
          width: '5%',
        },
      ];    

      const columnsPayment =  [
            {
                label: t('Due Date'),
                field: 'due_date2',
            },
            {
                label: t('Principle Amount'),
                field: 'principle_amount2',  
                
            },
            {
                label: t('Interest Amount'),
                field: 'interest_amount2',
                
            },       
            {
                label: t('Total Payment'),
                field: 'total_amount2',                
            },
            {
                label: t('Payment Status'),
                field: 'payment_status2',                
            },    
            {
                label: t('Action'),
                field: 'action',                
            },                 
        ];

    return {
      t,
      columns,  
      columnsPayment,    
    }
  },
  data() {
    let now = new Date();    
    let now2 = new Date();
    now.setDate(now2.getDate()+1);
    now2.setDate(now2.getDate()-30);
    const fDate =now2.getFullYear()+'-'+ ('0' + (now2.getMonth()+1)).slice(-2) +'-'+ ('0' + (now2.getDate())).slice(-2);
    const tDate =now.getFullYear()+'-'+ ('0' + (now.getMonth()+1)).slice(-2) +'-'+ ('0' + (now.getDate())).slice(-2);
    
    const blankData = {
        credit: 0.00,
        credit_bonus: 0.00,
        date: null,
        username: '',        
      };

    return {
      tabIndex : 0,

      fromDate: fDate,
      toDate: tDate,
      pageLength: 10,
      pageLength3: 10,

      dir: false,   
      
      
      rows: [],
      searchTerm: '',
      
      selectedDataRow : blankData,

      showModalDeptorInfo: false,
      deptorId:'',

      showInspectApprove:false,      
            
      inspectApproveData:[],
      inspectCanAction:false,
      
      period_name2:"",
      period_unit2:"",
      collateral_name2:"",
      period_number2:0,            
      loan_amount2:1000.0,
      interest2:3.0,
      loan_longtime_number2:10,
      effective_rate2:0,
      loan_start_at2: fDate,
      showLoanPayment:false,
      showModalPaymentNote:false,
      loanPaymentData:[],

      rowsPayment:[],
      rowsShareLoan:[],

      paymentNoteData :[],
      paymentNotePage:1,

      paymentRefImg:'',
      paymentRefNote:'',
      paymentNoteAt:'',
      paymentNoteBy:'',

      pagePermission:[],
      rowsShareReceive:[],

      inspectLoanAmount:0.0,
      inspectTotalReceiveAmount:0.0,
      inspectprofitAmount:0.0,

      summaryReceive:0,

    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Current      : 'light-primary',
        Professional : 'light-success',
        Rejected     : 'light-danger',
        Resigned     : 'light-warning',
        Applied      : 'light-info',
        /* eslint-enable key-spacing */
      }

      return status => statusColor[status]
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  async created() {    

    await this.getPagePermission();
    this.$http.get('/good-table/basic').then(res => { this.rows = res.data });  
    
    await this.search();  
  },
  methods: {   
   ...mapActions(["GetPaidPayment"]),
   ...mapActions(["GetLoanPaymentByLoanId"]),        
   ...mapActions(["GetShareLoanByLoanId"]), 
   ...mapActions(["GetPagePermission"]),
   async search(){
      console.log('search');
      
      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();
    
      formData.append("userid", userData.username);
      formData.append("token", userData.token);

      formData.append("page_name", this.$route.name);
      formData.append("startDate", this.fromDate);
      formData.append("endDate", this.toDate);
      

      const response = await this.GetPaidPayment(formData);
      if (response.data.status=='success') 
      {
                     
          this.rows = response.data.data;
          if (this.pagePermission.canViewAll==1) 
          {
            this.rowsShareReceive = response.data.receiveData;
          }
          else
          { 
            this.rowsShareReceive = response.data.receiveData.filter(x=> x._id==userData.username);
          }

          this.summaryReceive = response.data.summaryReceive;
          
      }
      else
      {
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
   async getPagePermission(){
      console.log('getPagePermission');

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();
    
      formData.append("userid", userData.username);
      formData.append("token", userData.token);

      formData.append("admin_id", userData.username);
      formData.append("page_name", this.$route.name);
      
      const response = await this.GetPagePermission(formData);
      if (response.data.status=='success') 
      {         
          this.pagePermission = response.data.data;
      }
      else
      {
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

   async getLoanPaymentByLoanId()
    {
        console.log("GetLoanPaymentByLoanId");

        const userData = JSON.parse(localStorage.getItem('userData'));
        const form = new FormData();

        form.append("userid", userData.username);
        form.append("token", userData.token);

        form.append("loanId", this.inspectApproveData.loan_id);

        const response = await this.GetLoanPaymentByLoanId(form);
        if (response.data.status == "success") {              
            this.rowsPayment = response.data.data;
        } else {
            this.rowsPayment = [];
            this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                    title: `Get Request Loan`,
                    icon: 'TrashIcon',
                    variant: 'danger',
                    text: `${response.data.message}`,
                },
                autoHideDelay: 3000,
            });
            
        }
    },
    async getShareLoanByLoanId()
    {
        console.log("getShareLoanByLoanId");

        const userData = JSON.parse(localStorage.getItem('userData'));
        const form = new FormData();

        form.append("userid", userData.username);
        form.append("token", userData.token);

        form.append("loanId", this.inspectApproveData.loan_id);

        const response = await this.GetShareLoanByLoanId(form);
        if (response.data.status == "success") {              
            this.rowsShareLoan = response.data.data;
        } else {
            this.rowsShareLoan = [];
            this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                    title: `Get Request Share Loan`,
                    icon: 'TrashIcon',
                    variant: 'danger',
                    text: `${response.data.message}`,
                },
                autoHideDelay: 3000,
            });
            
        }
    },
   formatDateAssigned(value) {
      let formattedDate = new Date(value);
      formattedDate = new Date(formattedDate.getTime() - 25200000); // 60 * 60 * 1000 * 8
      // const formattedDate = new Date().fromISO(value).toLocaleString(DateTime.DATETIME_SHORT);
      return formattedDate.getFullYear()+'-'+ ('0' + (formattedDate.getMonth()+1)).slice(-2) +'-'+ ('0' + (formattedDate.getDate())).slice(-2) +' '+formattedDate.toLocaleTimeString('th-TH', {hour12: false});
      
   },
   formatDateAssigned2(value) {
            let formattedDate = new Date(value);
            formattedDate = new Date(formattedDate.getTime() - 3600000); // 60 * 60 * 1000 * 1
            return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2);
    },
   viewitem(row)
   {       
    this.selectedDataRow = row;
   },
   async handleOkPaymentNote()
    {
        this.showModalPaymentNote = false;
    },
   async showPaymentNote(paymentData)
    {
        
        this.paymentNoteData = paymentData;
        this.showModalPaymentNote = true;
        this.paymentNotePage = 1;
        this.paymentNoteChange(1);
    },
   showDeptorInfo(deptorInfo)
    {
      this.showModalDeptorInfo = true;
      this.deptorId = deptorInfo.sl_users_id;
    },
    closeModalDeptorInfo()
    {
      this.showModalDeptorInfo = false;
    },
    closeInspectionApprove()
        {
            this.showInspectApprove = false;
        },
    async inspectData(loanData)
    {
        this.inspectCanAction = false;

        this.showInspectApprove = true;
        this.inspectApproveData = loanData;

        this.showLoanPayment = true;

        this.period_name2=this.$t(loanData.period_name);
        this.period_unit2=this.$t(loanData.period_unit);
        this.collateral_name2=this.$t(loanData.collateral_name);
        this.period_number2=loanData.period_number;
                
        this.loan_amount2=loanData.loan_amount;
        this.interest2=loanData.interest;
        this.loan_longtime_number2=loanData.loan_longtime_number;
        this.effective_rate2=loanData.effective_rate;
        this.loan_start_at2= loanData.loan_start_at;

        this.inspectLoanAmount = parseFloat(loanData.loan_amount);
        this.inspectTotalReceiveAmount = parseFloat(loanData.payment_total_received_amount);
        this.inspectprofitAmount = parseFloat(loanData.profitAmount);        

        this.getLoanPaymentByLoanId();
        await this.getShareLoanByLoanId();

        if (this.inspectprofitAmount && this.rowsShareLoan) {
          for (let index = 0; index < this.rowsShareLoan.length; index++) {
            this.rowsShareLoan[index]['profitAmount']= this.inspectprofitAmount*this.rowsShareLoan[index]['share_percent']/100 ;          
          }
        }

        this.tabIndex=0;
        
        
    },
    tabChange()
    {
        
    },
    paymentNoteChange(pageValue)
    {
        const tmpPaymentNoteData = this.paymentNoteData;
        
        this.paymentRefImg = tmpPaymentNoteData['ref_img'+pageValue]!=''?tmpPaymentNoteData['ref_img'+pageValue]:'/images/noimage.jpg';
        this.paymentRefNote = tmpPaymentNoteData['note'+pageValue]!=''?tmpPaymentNoteData['note'+pageValue]:'';
        this.paymentNoteAt = tmpPaymentNoteData['note'+pageValue+'_at']!=null?this.formatDateAssigned(tmpPaymentNoteData['note'+pageValue+'_at']):'';
        this.paymentNoteBy = tmpPaymentNoteData['note'+pageValue+'_by']!=''?tmpPaymentNoteData['note'+pageValue+'_by']:'';
    },
    resetModalPaymentNote()
    {
        
    },
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>

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