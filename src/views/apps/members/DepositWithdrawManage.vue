<template>

  <div>
    <deposit-manage-form :isDepositFormActive="isDepositFormActive" :pRowData="selectedDataRow" 
      @refetch-data="search" @close-edit-form="closeEditForm" />

    <withdraw-manage-form :isWithdrawFormActive="isWithdrawFormActive" :pRowData="selectedDataRow"
      @refetch-data="search" @close-edit-form="closeEditForm" />

    <member-manage-add :isAddFormActive="isAddFormActive" :pRowData="selectedDataRow"
      @refetch-data="search" @close-edit-form="closeEditForm" />

    <member-manage-edit :isEditFormActive="isEditFormActive" :pRowData="selectedDataRow" :isModeEdit="isModeEdit"
      @refetch-data="search" @close-edit-form="closeEditForm" />

    <Transition name="fade" mode="out-in">
      
        <div class="m-2" v-if="isOpenMenu"  >
          <b-row>                       
            <b-col cols="12" md="12"  >              
              <b-card>
                <b-row>
                  <b-col class="mt-1 col-md-2 col-6">
                    <b-button variant="success" @click="deposit(rowMenu)" class="w-100" style="padding: 0.786rem 0.5rem;">                  
                      <feather-icon icon="ArrowUpIcon" class="mr-50" />
                      {{t("Deposit Credit")}}
                    </b-button>
                  </b-col>
                  <b-col  class="mt-1 col-md-2 col-6">
                    <b-button variant="danger" @click="withdraw(rowMenu)" class="w-100" style="padding: 0.786rem 0.5rem;">                   
                      <feather-icon icon="ArrowDownIcon" class="mr-50" />
                      {{t('Withdraw Credit')}}
                    </b-button>
                  </b-col>
                  <b-col  class="mt-1 col-md-2 col-6">
                    <b-button variant="info" @click="showPromotionModal(rowMenu)" class="w-100" style="padding: 0.786rem 0.5rem;">                    
                      <feather-icon icon="GiftIcon" class="mr-50" />
                    {{ t('Current Promotion') }}
                    </b-button>
                  </b-col>
                  <b-col  class="mt-1 col-md-2 col-6">
                    <b-button variant="info" @click="promotionModal(rowMenu)" class="w-100" style="padding: 0.786rem 0.5rem;">                    
                      <feather-icon icon="GiftIcon" class="mr-50" />
                      {{ t('Set Promotion') }}
                    </b-button>
                  </b-col>

                  <b-col  class="mt-1 col-md-2 col-6">
                    <b-button variant="info" @click="cancelPromotion(rowMenu)" class="w-100" style="padding: 0.786rem 0.5rem;">                   
                      <feather-icon icon="PocketIcon" class="mr-50" />
                      {{ t('Cancel Promotion') }}
                    </b-button>
                  </b-col>

                  <b-col  class="mt-1 col-md-2 col-6">
                    <b-button variant="info" @click="reloadCredit(rowMenu)" class="w-100" style="padding: 0.786rem 0.5rem;">                   
                      <feather-icon icon="PocketIcon" class="mr-50" />                      
                      {{ t('Update Credit') }}
                    </b-button>
                  </b-col>
                  <b-col  class="mt-1 col-md-2 col-6">
                    <b-button variant="primary" @click="edititem(rowMenu)" class="w-100" style="padding: 0.786rem 0.5rem;">                  
                      <feather-icon icon="Edit2Icon" class="mr-50" />                      
                      {{ t('Edit') }}
                    </b-button>
                  </b-col>
                  <b-col  class="mt-1 col-md-2 col-6">
                    <b-button variant="primary" @click="infoModal4(rowMenu)" class="w-100">                  
                      <feather-icon icon="InfoIcon" class="mr-50" />                      
                      {{ t('Credit Log') }}
                    </b-button>
                  </b-col>
                  <b-col  class="mt-1 col-md-2 col-6">
                    <b-button variant="primary" @click="infoModal(rowMenu)" class="w-100">                  
                      <feather-icon icon="InfoIcon" class="mr-50" />                      
                      {{ t('History Cash') }}
                    </b-button>
                  </b-col>
                  <b-col  class="mt-1 col-md-2 col-6">
                    <b-button variant="primary" @click="infoModal2(rowMenu)" class="w-100">                  
                      <feather-icon icon="InfoIcon" class="mr-50" />
                      {{ t('History Bet') }}
                    </b-button>
                  </b-col>
                  <b-col  class="mt-1 col-md-2 col-6">
                    <b-button variant="warning" @click="autoBank(rowMenu)" class="w-100" style="padding: 0.786rem 0.5rem;">                  
                      <feather-icon icon="CreditCardIcon" class="mr-50" />
                      {{ t('On/Off Auto') }}
                      
                    </b-button>
                  </b-col>
                  <b-col  class="mt-1 col-md-2 col-6">
                    <b-button variant="warning" @click="deleteitem(rowMenu)" class="w-100">                  
                      <feather-icon icon="PowerIcon" class="mr-50" />
                      {{ t('On/Off User') }}
                    </b-button>
                  </b-col>
                </b-row>  
                <b-row>
                  <b-col  class="mt-1 col-md-12 col-12">
                    <b-button variant="danger" @click="closeMenu()" class="w-100">                  
                      <feather-icon icon="XIcon" class="mr-50" />                      
                      {{ t('Close') }}
                    </b-button>
                  </b-col>
                </b-row>    
              </b-card>
            </b-col>            
          </b-row>
        </div>      
    </Transition>

    <Transition name="fade" mode="out-in">
      <b-card :title="titleDepWit" v-if="!(isDepositFormActive)&&!(isWithdrawFormActive)&&!(isEditFormActive)&&!(isAddFormActive)&&!(isOpenMenu)">
        <b-col  class="col-md-2 col-12 mb-1">
          <b-button variant="success" @click="addnew" class="w-100">
                <feather-icon icon="PlusCircleIcon" />
                {{ t('Register Member') }}
            </b-button>
        </b-col>
        <b-row style="justify-content: space-between!important;">
          <b-col cols="6" md="3">
          </b-col>
          <b-col cols="12" md="3" class="d-flex align-items-right justify-content-start mb-1">
            <b-button variant="primary" @click="search" class="w-20 mr-1">
                <feather-icon icon="SearchIcon" />
              </b-button>
              <b-input-group class="input-group-merge">
                <b-input-group-prepend is-text>
                  <feather-icon icon="SearchIcon" />
                </b-input-group-prepend>
                <b-form-input id="icons-search" v-model="searchTerm" :placeholder="t('Search')" />
              </b-input-group>
          </b-col>
        </b-row>

        <vue-good-table ref="my-table" :columns="columns" :rows="rows" :rtl="direction" :line-numbers="true"
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
            perPage: pageLength
          }" theme="polar-bear">
          <template slot="table-row" slot-scope="props">

            <div v-if="props.column.field === 'id2'">
              <b-media vertical-align="center">
              <template #aside>
                <b-avatar
                  size="40"
                  :text="avatarText(props.row.fullname)"
                  :variant="resolveStatusVariant(props.row.status)"
                />
              </template>
              <b-link                
                class="font-weight-bold d-block text-nowrap"
              >
                {{ props.row.id }}
              </b-link>              
              <h6 class="text-muted">{{ props.row.alias_id }}</h6>
              <h6 class="text-muted">@{{ props.row.fullname }}</h6>              
              </b-media>
            </div>

            <div v-if="props.column.field === 'create_at2'">               
              <b-media vertical-align="center">            
                <h6 ><feather-icon icon="ClockIcon" size="16" class="align-middle mr-25" /> {{ formatDateAssigned(props.row.create_at) }}</h6>                
              </b-media>    
            </div>

            <div v-if="props.column.field === 'bank_name2'">
              <div  class="myavatar">
                <img v-bind:src="props.row.bank_ico" alt="avatar" style="margin-right:10px;" />
                <span class="text-muted">{{ props.row.bank_name }}</span>
              </div>    
              <div class="font-weight-bold d-block text-nowrap">
                  {{ props.row.bank_acc_no }}
                </div>              
            </div>

            <div v-if="props.column.field === 'status2'">              
                <b-badge
                    pill
                    :variant="resolveStatusVariant(props.row.AutoBank)"
                    class="text-capitalize"
                >
                    {{t(resolveStatusText(props.row.AutoBank))}}
                </b-badge>
            </div>

            <div v-if="props.column.field === 'status3'">              
                <b-badge
                    pill
                    :variant="resolveStatusVariant(props.row.status)"
                    class="text-capitalize"
                >
                    {{t(resolveStatusText(props.row.status))}}
                </b-badge>
            </div>

            <span v-if="props.column.field === 'action'">
              <span>
                <feather-icon icon="MoreVerticalIcon" size="16" class="text-body align-middle mr-25" @click="openMenu(props.row)" style="cursor: pointer;" />
                <!-- <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
                  <template v-slot:button-content>
                    <feather-icon icon="MoreVerticalIcon" size="16" class="text-body align-middle mr-25" />
                  </template>
                
                  <b-dropdown-item @click="deposit(props.row)">
                    <feather-icon icon="ArrowUpIcon" class="mr-50" />
                    <span>Deposit</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="withdraw(props.row)">
                    <feather-icon icon="ArrowDownIcon" class="mr-50" />
                    <span>Withdraw</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="reloadCredit(props.row)">
                    <feather-icon icon="PocketIcon" class="mr-50" />
                    <span>Reload Credit</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="promotionModal(props.row)">
                    <feather-icon icon="GiftIcon" class="mr-50" />
                    <span>Active Promotion</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="cancelPromotion(props.row)">
                    <feather-icon icon="XIcon" class="mr-50" />
                    <span>Cancel Turn Over/Promotion</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="autoBank(props.row)">
                    <feather-icon icon="CreditCardIcon" class="mr-50" />
                    <span>Auto Bank On/Off</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="edititem(props.row)">
                    <feather-icon icon="Edit2Icon" class="mr-50" />
                    <span>Edit Member</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="infoModal(props.row)">
                    <feather-icon icon="InfoIcon" class="mr-50" />
                    <span>Information Member</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="infoModal2(props.row)">
                    <feather-icon icon="InfoIcon" class="mr-50" />
                    <span>Bet Log</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="infoModal4(props.row)">
                    <feather-icon icon="InfoIcon" class="mr-50" />
                    <span>Credit Log</span>
                  </b-dropdown-item>

                  <b-dropdown-item @click="deleteitem(props.row)">
                    <feather-icon icon="PowerIcon" class="mr-50" />
                    <span>Active/InActive Member</span>
                  </b-dropdown-item>

                </b-dropdown> -->
              </span>
            </span>
                      
                       
            <span>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>

          <!-- pagination -->
          <template slot="pagination-bottom" slot-scope="props">
            <div class="d-flex justify-content-between flex-wrap">
              <div class="d-flex align-items-center mb-0 mt-1">
                <span class="text-nowrap ">
                  {{t("Showing") +" 1 " + t("to") }}
                </span>
                <b-form-select v-model="pageLength" :options="['3', '5', '10', '20', '50', '100']" class="mx-1"
                  @input="(value) => props.perPageChanged({ currentPerPage: value })" />
                <span class="text-nowrap"> {{t('of')}} {{ props.total }} {{t('entries')}} </span>
              </div>
              <div>
                <b-pagination :value="1" :total-rows="props.total" :per-page="pageLength" first-number last-number
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
      </b-card>
    </Transition>

    <Transition name="fade" mode="out-in">
      <b-modal ref="bv-modal-deposit" hide-footer>
        <template #modal-title>
          {{t('Deposit')}}
        </template>
        <div class="d-block text-left">
          <div class="text-left">
            <b-row>
              <b-col md="3">
                <h6>{{t('Username')}} : </h6>
              </b-col>  
              <b-col md="9">
                <h6>{{depositRow.id}}</h6>
              </b-col>  
            </b-row>

            <b-row>
              <b-col md="3">
                <h6>{{t('Fullname')}} : </h6>
              </b-col>  
              <b-col md="9">
                <h6>{{depositRow.fullname}}</h6>
              </b-col>  
            </b-row>
          
          </div>
          <hr/>
          <b-row>
            <b-col md="6">
              <b-form-group label-for="depositAmount" :label="t('Deposit Amount')" >
                <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                        <feather-icon icon="ArrowUpIcon" />
                    </b-input-group-prepend>
                    <b-form-input id="depositAmount" v-model="depositAmount" placeholder="100" type="number"  />
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col md="6">        
              <b-form-group label-for="aliaswallet" :label="t('Wallet')">
                <b-form-checkbox
                    id="aliaswallet"
                    name="aliaswallet"                
                    v-model="aliaswallet"
                    value="1"
                    unchecked-value="0"
                  >                    
                    {{ t('For Promotion Credit') }}
                </b-form-checkbox>      
              </b-form-group>         
            </b-col>

          </b-row>

          <b-row>
            <b-col md="12">             
              <b-form-checkbox
                  id="entertimerinformation"
                  name="entertimerinformation"                
                  v-model="entertimeSelected"
                  value="1"
                  unchecked-value="0"
                >
                  {{t('Enter Time Information')}}
                </b-form-checkbox>
              
            </b-col>
          </b-row>
          <b-row>
            <hr/>
          </b-row>

          <b-row v-if="(entertimeSelected==1)" >
            <b-col md="6">
              <b-form-group label-for="datetime" :label="t('Date and Time')" >
                <flat-pickr
                  v-model="depositDateTime"
                  class="form-control"
                  :config="{ altInput: true,altFormat: 'F j, Y', enableTime: true,dateFormat: 'Y-m-d H:i',time_24hr: true } "  
                  :onChange="timeChange()" 
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label-for="time" :label="t('Time')" >                
                {{ depositTime }}
              </b-form-group>
            </b-col>
          </b-row>

          <b-row v-if="(entertimeSelected==1)">
            <b-col md="12">
              <b-form-group label-for="depositAccNo" :label="t('Bank Account Number')" >
                <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                        <feather-icon icon="CreditCardIcon" />
                    </b-input-group-prepend>
                    <b-form-input id="depositAccNo" v-model="depositAccNo" placeholder="1242100000"  />
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row v-if="(entertimeSelected==1)">
            <b-col md="12">
              <b-form-group label-for="depositBankApp" :label="t('Bank App')" >
                <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                        <feather-icon icon="CreditCardIcon" />
                    </b-input-group-prepend>
                    <b-form-input id="depositBankApp" v-model="depositBankApp" placeholder="SCB"  />
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row >
            <b-col md="12">
              <b-form-group label-for="depositRemark" :label="t('Remark')">
                <b-input-group class="input-group-merge">                    
                    <b-form-input id="depositRemark" v-model="depositRemark" placeholder="..."  />
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>

          <hr/>          
          <b-button type="submit" variant="primary" class="mr-1" @click="depositConfirm()"  >
            <feather-icon icon="EditIcon" />                  
                  {{t('Confirm')}}
          </b-button>

          <b-button variant="danger" class="mr-1" @click="modalclose()"  >
            <feather-icon icon="DeleteIcon" />
                  {{t('Cancel')}}
          </b-button>

        </div>
      </b-modal>
    </Transition>

    <Transition name="fade" mode="out-in">
      <b-modal ref="bv-modal-withdraw" hide-footer>
        <template #modal-title>
          {{t('Withdraw')}}
        </template>
        <div class="d-block text-left">
          <div class="text-left">
            <b-row>
              <b-col md="3">
                <h6>{{t('Username')}} : </h6>
              </b-col>  
              <b-col md="9">
                <h6>{{withdrawRow.id}}</h6>
              </b-col>  
            </b-row>

            <b-row>
              <b-col md="3">
                <h6>{{t('Fullname')}} : </h6>                
              </b-col>  
              <b-col md="9">
                <h6>{{withdrawRow.fullname}}</h6>
              </b-col>  
            </b-row>
          
          </div>
          <hr/>
          <b-row>
            <b-col md="6">
              <b-form-group label-for="withdrawAmount" :label="t('Withdraw Amount')">
                <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                        <feather-icon icon="ArrowUpIcon" />
                    </b-input-group-prepend>
                    <b-form-input id="withdrawAmount" v-model="withdrawAmount" placeholder="100" type="number"  />
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col md="6">        
              <b-form-group label-for="aliaswallet2" :label="t('Wallet')">   
                <b-form-checkbox
                    id="aliaswallet2"
                    name="aliaswallet2"                
                    v-model="aliaswallet2"
                    value="1"
                    unchecked-value="0"
                  >                  
                    {{t('Withdraw Promotion Wallet')}}
                </b-form-checkbox>      
              </b-form-group>         
            </b-col>

          </b-row>

          <b-row>
            <hr/>
          </b-row>

          <b-row >
            <b-col md="12">
              <b-form-group label-for="withdrawRemark" :label="t('Remark')" >
                <b-input-group class="input-group-merge">                    
                    <b-form-input id="withdrawRemark" v-model="withdrawRemark" placeholder="..."  />
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>

          <hr/>          
          <b-button type="submit" variant="primary" class="mr-1" @click="withdrawConfirm()"  >
            <feather-icon icon="EditIcon" />
            {{t('Confirm')}}                  
          </b-button>

          <b-button variant="danger" class="mr-1" @click="modalclose()"  >
            <feather-icon icon="DeleteIcon" />                  
                  {{t('Cancel')}}
          </b-button>

        </div>
      </b-modal>
    </Transition>

    <Transition name="fade" mode="out-in">
      <b-modal ref="bv-modal-promotion" hide-footer size="lg">
        <template #modal-title>
          {{t('Set Promotion')}}
        </template>
        <div class="d-block text-left">
          <div class="text-left">
            <b-row>
              <b-col md="3">
                <h6>{{t('Username')}} : </h6>
              </b-col>  
              <b-col md="9">
                <h6>{{promotionRow.id}}</h6>
              </b-col>  
            </b-row>

            <b-row>
              <b-col md="3">
                <h6>{{t('Fullname')}} : </h6>
              </b-col>  
              <b-col md="9">
                <h6>{{promotionRow.fullname}}</h6>
              </b-col>  
            </b-row>
          
          </div>
          <hr/>
          <b-row>
            <b-col md="12">
              <b-form-group label-for="promotionSelected" :label="t('Promotion')">
                <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                        <feather-icon icon="ArrowUpIcon" />
                    </b-input-group-prepend>
                    <b-form-select v-model="promotionSelected" :options="promotionOptions"></b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <hr/>
          </b-row>
        
          <hr/>          
          <b-button type="submit" variant="primary" class="mr-1" @click="promotionConfirm()"  >
            <feather-icon icon="EditIcon" />
                 {{ t('Confirm') }} 
          </b-button>

          <b-button variant="danger" class="mr-1" @click="modalclose()"  >
            <feather-icon icon="DeleteIcon" />
            {{ t('Cancel') }} 
          </b-button>

        </div>
      </b-modal>
    </Transition>

    <Transition name="fade" mode="out-in">
      <b-modal ref="bv-modal-info" hide-footer size="lg" >
        <template #modal-title>
          {{t('Deposit-Withdraw Information')}}
        </template>
        <h6>{{ infoRow.username }}</h6>
        <h6>{{ infoRow.bank_acc_name }}</h6>
        <hr/>
        <vue-good-table ref="mytable2" :columns="columns2" :rows="rows2" :rtl="direction" :line-numbers="true" 
          :search-options="{
            enabled: false,
            externalQuery: searchTerm2
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
            perPage: pageLength2
          }" theme="polar-bear">
          <template slot="table-row" slot-scope="props" >

            
            <div v-if="props.column.field === 'bankinfo2'">
              <b-media vertical-align="center">            
                <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" /> {{ props.row.bank_name }}</h6>
                <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" />{{ props.row.bank_acc_no }}</h6>                
              </b-media>
            </div>

            <div v-if="props.column.field === 'transaction_type2'">              
                <b-badge
                    pill
                    :variant="resolveStatusVariantDepWit(props.row.transaction_type)"
                    class="text-capitalize"                    
                >   
                {{resolveStatusTextDepWit(props.row.transaction_type)}}
                
                </b-badge>
            </div>

            <div v-if="props.column.field === 'calculate'">
              <b-media vertical-align="center" v-if="(props.row.transaction_type=='BONUS')" >
                  <b-row>
                    <b-col md="6"> <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" />{{t('Bonus')}}</h6></b-col>
                    <b-col md="6" ><h6 class="text-danger" >{{ parseFloat(props.row.credit_bonus).toFixed(2) }}</h6></b-col>
                  </b-row>     
                  <b-row>
                    <b-col md="6"> <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" />{{t('Promotion')}}</h6></b-col>
                    <b-col md="6" ><h6 class="text-danger" >{{ props.row.promotion }}</h6></b-col>
                  </b-row>     
              </b-media>

              <b-media vertical-align="center" v-if="(props.row.transaction_type!='BONUS')">     
                  <b-row>
                    <b-col md="6"> <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" />{{t('Before')}}</h6></b-col>
                    <b-col md="6"><h6 class="text-success">{{parseFloat(props.row.credit_before).toFixed(2) }}</h6></b-col>
                  </b-row>
                  <b-row>
                    <b-col md="6"> <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" />{{t('Withdraw')}}</h6></b-col>
                    <b-col md="6" ><h6 class="text-danger" >{{ parseFloat(props.row.credit).toFixed(2) }}</h6></b-col>
                  </b-row>
                  <b-row>
                    <b-col md="6"> <h6 ><feather-icon icon="CreditCardIcon" size="16" class="align-middle mr-25" />{{t('After')}}</h6></b-col>
                    <b-col md="6"><h6 class="text-info">{{ parseFloat(props.row.credit_after).toFixed(2)  }}</h6></b-col>
                  </b-row>                
              </b-media>
            </div>

            <div v-if="props.column.field === 'time2'">
              <b-media vertical-align="center">            
                <h6 ><feather-icon icon="ClockIcon" size="16" class="align-middle mr-25" /> {{ formatDateAssigned(props.row.date) }}</h6>                
              </b-media>
            </div>

            <div v-if="props.column.field === 'approve_status2'">              
                <b-badge
                    pill
                    :variant="resolveStatusVariant(props.row.approve_status)"
                    class="text-capitalize"                    
                >   
                {{resolveStatusText2(props.row.approve_status)}}
                
                </b-badge>
            </div>
     
            <div>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>

          <!-- pagination -->
          <template slot="pagination-bottom" slot-scope="props">
            <div class="d-flex justify-content-between flex-wrap">
              <div class="d-flex align-items-center mb-0 mt-1">
                <span class="text-nowrap ">
                  {{t("Showing") +" 1 " + t("to") }}
                </span>
                <b-form-select v-model="pageLength2" :options="['3', '5']" class="mx-1"
                  @input="(value) => props.perPageChanged({ currentPerPage: value })" />
                <span class="text-nowrap"> {{t('of')}} {{ props.total }} {{t('entries')}} </span>
              </div>
              <div>
                <b-pagination :value="1" :total-rows="props.total" :per-page="pageLength2" first-number last-number
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

      </b-modal>
    </Transition>

    <Transition name="fade" mode="out-in">
      <b-modal ref="bv-modal-info2" hide-footer size="lg" >
        <template #modal-title>
          {{t('Bet Log Information')}}
        </template>
        <h6>{{ infoRow.username }}</h6>
        <h6>{{ infoRow.bank_acc_name }}</h6>
        <hr/>

        <b-card no-body >
            <div class="m-2">
            <b-row>
              <b-col
                cols="4"
                md="4"
                class="d-flex align-items-center justify-content-start"
              > 
                <b-form-datepicker id="fromDate" v-model="fromDate" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="th"></b-form-datepicker>          
              </b-col>

              <b-col
                cols="4"
                md="4"
                class="d-flex align-items-center justify-content-start"
              > 
                <b-form-datepicker id="toDate" v-model="toDate" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="th" ></b-form-datepicker>          
              </b-col>
                        
              <b-col
                cols="4"
                md="4"
                class="d-flex align-items-center justify-content-start"
              >
                <b-button variant="primary" @click="searchInfo2">
                <feather-icon
                  icon="SearchIcon"              
                />            
                </b-button>
              </b-col>
            </b-row>

            </div>
          </b-card>

        <vue-good-table ref="mytable3" :columns="columns3" :rows="rows3" :rtl="direction" :line-numbers="true" 
          :search-options="{
            enabled: false,
            externalQuery: searchTerm3
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
          <template slot="table-row" slot-scope="props" >
     
            <div>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>

          <!-- pagination -->
          <template slot="pagination-bottom" slot-scope="props">
            <div class="d-flex justify-content-between flex-wrap">
              <div class="d-flex align-items-center mb-0 mt-1">
                <span class="text-nowrap ">
                  {{t("Showing") +" 1 " + t("to") }}
                </span>
                <b-form-select v-model="pageLength3" :options="['3', '5']" class="mx-1"
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

      </b-modal>
    </Transition>

    <Transition name="fade" mode="out-in">
      <b-modal ref="bv-modal-info4" hide-footer size="lg" >
        <template #modal-title>
          {{t('Credit Log Information')}}
        </template>
        <h6>{{ infoRow.username }}</h6>
        <h6>{{ infoRow.bank_acc_name }}</h6>
        <hr/>

        <b-card no-body >
            <div class="m-2">
            <b-row>
              <b-col
                cols="4"
                md="4"
                class="d-flex align-items-center justify-content-start"
              > 
                <b-form-datepicker id="fromDate4" v-model="fromDate4" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="th"></b-form-datepicker>          
              </b-col>

              <b-col
                cols="4"
                md="4"
                class="d-flex align-items-center justify-content-start"
              > 
                <b-form-datepicker id="toDate4" v-model="toDate4" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="th" ></b-form-datepicker>          
              </b-col>
                        
              <b-col
                cols="4"
                md="4"
                class="d-flex align-items-center justify-content-start"
              >
                <b-button variant="primary" @click="searchInfo4">
                <feather-icon
                  icon="SearchIcon"              
                />            
                </b-button>
              </b-col>
            </b-row>

            </div>
          </b-card>

        <vue-good-table ref="mytable4" :columns="columns4" :rows="rows4" :rtl="direction" :line-numbers="true" 
          :search-options="{
            enabled: false,
            externalQuery: searchTerm4
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
            perPage: pageLength4
          }" theme="polar-bear">
          <template slot="table-row" slot-scope="props" >
     
            <div v-if="props.column.field === 'amount2'">              
                <b-badge
                    pill
                    :variant="resolveAmountVariant(props.row.amount)"
                    class="text-capitalize"                    
                >   
                {{props.row.amount}}
                </b-badge>
            </div>

            <div>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>

          <!-- pagination -->
          <template slot="pagination-bottom" slot-scope="props">
            <div class="d-flex justify-content-between flex-wrap">
              <div class="d-flex align-items-center mb-0 mt-1">
                <span class="text-nowrap ">
                  {{t("Showing") +" 1 " + t("to") }}
                </span>
                <b-form-select v-model="pageLength4" :options="['3', '5']" class="mx-1"
                  @input="(value) => props.perPageChanged({ currentPerPage: value })" />
                <span class="text-nowrap"> {{t('of')}} {{ props.total }} {{t('entries')}} </span>
              </div>
              <div>
                <b-pagination :value="1" :total-rows="props.total" :per-page="pageLength4" first-number last-number
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

      </b-modal>
    </Transition>

    <Transition name="fade" mode="out-in">
      <b-modal ref="bv-modal-showpromotion" hide-footer size="lg">
        <template #modal-title>
          {{t('Current Promotion')}}
        </template>
        <div class="d-block text-left">
          <div class="text-left">
            <b-row>
              <b-col md="3">
                <h6>{{t('Username')}} : </h6>
              </b-col>  
              <b-col md="9">
                <h6>{{promotionRow2.id}}</h6>
              </b-col>  
            </b-row>

            <b-row>
              <b-col md="3">
                <h6>{{t('Fullname')}} : </h6>
              </b-col>  
              <b-col md="9">
                <h6>{{promotionRow2.fullname}}</h6>
              </b-col>  
            </b-row>
          
          </div>
          <hr/>

          <b-row>
            <b-col md="3">
                <h6>{{t('Date')}} : </h6>
            </b-col>  
            <b-col md="9">
              <h6>{{formatDateAssigned(userPromotion.date)}}</h6>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="3">
                <h6>{{t('Title')}} : </h6>
            </b-col>  
            <b-col md="9">
              <h6>{{userPromotion.Title}}</h6>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="3">
                <h6>{{t('Promotion Type')}} : </h6>
            </b-col>  
            <b-col md="9">
              <h6>{{userPromotion.Type}}</h6>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="3">
                <h6>{{t('Banner')}} : </h6>
            </b-col>  
            <b-col md="9">
                <img :src="userPromotion.Banner" height="100px;" />
            </b-col>
          </b-row>
          <b-row>
            <b-col md="3">
                <h6>{{t('Note')}} : </h6>
            </b-col>  
            <b-col md="9">
              <h6>{{userPromotion.note_pro}}</h6>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="3">
                <h6>{{t('Play Only')}} : </h6>
            </b-col>  
            <b-col md="9">
              <h6>{{userPromotion.TypeTakeTurn}}</h6>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="3">
                <h6>{{t('Turn Type')}} : </h6>
            </b-col>  
            <b-col md="9">
              <h6>{{userPromotion.TurnTypeWithdraw}}</h6>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="3">
                <h6>{{t('Need Turn')}} : </h6>
            </b-col>  
            <b-col md="9">
              <h6>{{userPromotion.TurnOver}}</h6>
            </b-col>
          </b-row>
          
          <b-row>
            <b-col md="3">
                <h6>{{t('Remain Turn')}} : </h6>
            </b-col>  
            <b-col md="9">
              <h6>{{userPromotion.remain_turn}}</h6>
            </b-col>
          </b-row>

          <b-row>
            <hr/>
          </b-row>        
          <hr/>   
          <b-button variant="danger" class="mr-1" @click="modalclose()"  >
            <feather-icon icon="DeleteIcon" />
                  {{t('Close')}}
          </b-button>

        </div>
      </b-modal>
    </Transition>

    <loading :isLoading="isLoading" />
  </div>

</template>

<script>

import BCardCode from '@core/components/b-card-code/BCardCode.vue';
import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BRow, BCol, BButton, BFormDatepicker, BCard, BInputGroup, BInputGroupPrepend,BMedia,BLink,BFormCheckbox
} from 'bootstrap-vue';
import { VueGoodTable } from 'vue-good-table';

import store from '@/store/index';
import { mapActions } from "vuex";
import axios from "axios";
import { ref, onUnmounted } from '@vue/composition-api'

import DepositManageForm from './DepositManageForm.vue';
import WithdrawManageForm from './WithdrawManageForm.vue';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import MemberManageEdit from './MemberManageEdit.vue';
import MemberManageAdd from './MemberManageAdd.vue';

import flatPickr from 'vue-flatpickr-component'
import Loading from "../../../components/Loading.vue";

import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    WithdrawManageForm,
    DepositManageForm,
    MemberManageAdd,
    MemberManageEdit,
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
    flatPickr,
    Loading,
  },
  setup() {
    const { t } = useI18nUtils();

    function formatDateAssigned4(value) {
      let formattedDate = new Date(value);
      formattedDate = new Date(formattedDate.getTime() - 3600000); // 60 * 60 * 1000 * 1
      return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });
    };
        
    let columns = 
    [
        {
          label: t('Username/Fullname'),
          field: 'id2',
        },
        {
          label: t('Tel No.'),
          field: 'mobile_no',
        },        
        {
          label: t('Create Date'),
          field: 'create_at2',          
        },
        {
          label: t('Account number'),
          field: 'bank_name2',
        },        
        {
          label: t('Credit'),
          field: 'credit',
          type: 'decimal',          
        },      
        {
          label: t('Promotion Credit'),
          field: 'alias_credit',
          type: 'decimal',
        },         
        {
          label: t('AutoBank'),
          field: 'status2',          
        },       
        {
          label: t('Status'),
          field: 'status3',          
        },
        {
          label: t('Action'),
          field: 'action',
          width: '5%',
        },
        {
          label : 'bank_name',
          field : 'bank_name',
          hidden: true,
        },
        {
          label : 'bank_acc_no',
          field : 'bank_acc_no',
          hidden: true,
        },
        {
          label : 'fullname',
          field : 'fullname',
          hidden: true,
        },
        {
          label : 'username',
          field : 'username',
          hidden: true,
        },       
      ];

      let columns2 = [ 
        {
          label: t('Bank Info'),
          field: 'bankinfo2',
        },
        {
          label: t('Type'),
          field: 'transaction_type2',
        },
        {
          label: t('Amount'),
          field: 'calculate',
          width: '30%',
        },
        {
          label: t('Time'),
          field: 'time2',
        },

        {
          label: t('Approve Status'),
          field: 'approve_status2',          
        },
  
      ];

      let columns3 = [ 
        {
          label: t('Game'),
          field: 'provider',
        },
        {
          label: t('Turn over'),
          field: 'turnover',
        },
        {
          label: t('Valid Amount'),
          field: 'valid_amount',          
        },
        {
          label: t('Winloss'),
          field: 'winloss',
        },

        {
          label: t('Total'),
          field: 'total',          
        },
  
      ];

      let columns4 = [ 
        {
          label: t('Create At'),
          field: 'created_at',
          formatFn: formatDateAssigned4,
        },
        {
          label: t('Note'),
          field: 'note',
        },
                
        {
          label: t('Amount'),
          field: 'amount2',          
        },
        {
          label: t('Before Wallet'),
          field: 'before_wallet',
        },

        {
          label: t('After Wallet'),
          field: 'after_wallet',          
        },
  
      ];
      
    let titleDepWit=t("Deposit-Withdraw (Manual)");

    return {
      t,
      columns,
      columns2,
      columns3,
      columns4,
      titleDepWit,
    }
  },
  data() {
    const now = new Date();    
    const fDate =now.getFullYear()+'-'+ ('0' + (now.getMonth()+1)).slice(-2) +'-'+ ('0' + (now.getDate())).slice(-2);
    const tDate =now.getFullYear()+'-'+ ('0' + (now.getMonth()+1)).slice(-2) +'-'+ ('0' + (now.getDate())).slice(-2);

    const blankData = {
      credit: 0.00,
      credit_bonus: 0.00,
      date: null,
      username: '',
    };

    return {
            
      isOpenMenu:false,
      rowMenu : [],
      fromDate: fDate,
      toDate: tDate,
      fromDate4: fDate,
      toDate4: tDate,
      pageLength: 10,
      pageLength2: 10,
      pageLength3: 10,
      pageLength4: 10,
      dir: false,      
      
      rows: [],

      
      rows2: [],

      
      rows3: [],

      
      rows4: [],

      searchTerm: '',
      searchTerm2: '',
      searchTerm3: '',
      searchTerm4: '',
      AgentSelected: '',
      AgentOptions: [
        { value: null, text: 'Agent' },
        // { value: 'ufgkxc11', text: 'ufgkxc11' },
      ],
      selectedDataRow: blankData,
      isWithdrawFormActive: false,
      isDepositFormActive: false,      
      isAddFormActive: false,
      isEditFormActive: false,      
      isModeEdit: false,
      isModeDeposit: false,
      acting:false,

      depositRow:[],
      depositAmount:0,
      entertimeSelected:0,
      aliaswallet:0,
      aliaswallet2:0,
      depositDateTime:null,
      depositTime:"00:00",
      depositAccNo:"",
      depositBankApp:"",
      depositRemark:"",
      
      withdrawRow:[],
      withdrawAmount:0,      
      withdrawRemark:"",

      promotionRow:[],
      promotionRow2:[],
      promotionSelected:0,
      promotionOptions:[],
      boxTwo:"",
      infoRow : [],
      infoRow2 : [],
      infoRow4 : [],

      isLoading: false,
      userPromotion:[],
    }
  },
  computed: {
    resolveStatusVariant() {      
        const statusColor = {                    
          1: 'light-success',
          0: 'light-danger',          
        }
        return data => statusColor[data]
    },
    resolveStatusText() {            
      const statusActive = {                    
          1: 'Active',
          0: 'InActive',          
        }
        return data => statusActive[data]
    },      
    resolveStatusText2() {            
      const statusActive = {                    
          1: 'Approved',
          0: 'Rejected',          
        }
        return data => statusActive[data]
    }, 
    resolveStatusTextDepWit() {    
      return data => {
        if (data.indexOf("DEP")>-1) 
        {
          return "DEPOSIT";
        }
        else if(data.indexOf("BONUS")>-1) 
        {
          return "BONUS";
        }
        else
        {
          return "WITHDRAW";
        }
      }
    }, 
    resolveStatusVariantDepWit() {     
      return data => {       
        if (data.indexOf("DEP")>-1) 
        {
          return "light-success";
        }
        else if(data.indexOf("BONUS")>-1) 
        {
          return "light-info";
        }
        else
        {
          return "light-warning";
        }
      }
    },
    resolveAmountVariant() {     
      return data => {       
        if (parseFloat(data)>=0) 
        {
          return "light-success";
        }
        else
        {
          return "light-danger";
        }
      }
    }, 
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Current: 'light-primary',
        Professional: 'light-success',
        Rejected: 'light-danger',
        Resigned: 'light-warning',
        Applied: 'light-info',
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
    this.$http.get('/good-table/basic').then(res => { this.rows = res.data });
    // await this.getAgent();
    await this.search();
    await this.initPromotion();

    this.isOpenMenu = false;
    this.rowMenu = [];

    this.isModeDeposit = true;
    this.acting =false;
    
  },
  methods: {
    ...mapActions(["GetAgent"]),
    ...mapActions(["GetPromotion"]),
    ...mapActions(["GetReportBetlog"]),
    ...mapActions(["GetReportBetlog2"]),
    ...mapActions(["GetReportBetlog4"]),
    ...mapActions(["GetUserPromotion"]),
    async initPromotion()
    {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      formData.append("userid", userData.username);
      formData.append("token", userData.token);

      formData.append("searchWord", this.searchTerm);
      formData.append("pageLength", this.pageLength);

      const response = await this.GetPromotion(formData);
      if (response.data.status == 'success') 
      {         
        const promotionRows = response.data.data;
        let tmpArray = [];        
        promotionRows.forEach(element => {
                    tmpArray.push({value : element.id ,text: element.Title+' : '+element.promotion_type+' '+element.note_pro });
                });
        this.promotionOptions = tmpArray;
        this.promotionSelected = promotionRows[0].id?promotionRows[0].id:1;
      }
      else
      {

      }
    },
    async search() {
      console.log('search');

      // console.log(this.fromDate);
      // console.log(this.toDate);
      // console.log(this.AgentSelected);       
      // console.log(this.searchTerm);
      // console.log(this.pageLength);

      const userData = JSON.parse(localStorage.getItem('userData'));

      // console.log(userData);

      var headers = {
        userid: userData.username,
        token: userData.token,
      }

      var body = {        
          searchWord: this.searchTerm,
      }

      let response;
      this.loading= true;
      await axios.post("api/member/getmember",body,
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
      this.loading= false;

      // console.log(response.data.status);
      // console.log(response.data.data);

      if (response.data.status == 'success') {
        
        let tmpData = response.data.data;
        let listData = [];   
        for (let index = 0; index < tmpData.length; index++) {
          let rowData = tmpData[index];          
          rowData.bank_ico = require('@/assets/images/bank_bg/' + tmpData[index]['bank_ico']);
          rowData.bank_name2 = '';
          listData.push(rowData);
        }

        // this.rows = tmpData;
        // console.log(response.data.data);
        // console.log(listData);
        this.rows = listData;
      }
      else {
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
    async getAgent() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const User = new FormData();

      User.append("userid", userData.username);
      User.append("token", userData.token);

      const response = await this.GetAgent(User);
      if (response.data.status == 'success') {
        const agent = response.data.data;
        let tmpArray = [];
        agent.forEach(element => {
          tmpArray.push({ value: element.agent, text: element.agent });
        });
        this.AgentOptions = tmpArray;
        this.AgentSelected = tmpArray[0].text;
      } else {

      }

    },    
    formatDateAssigned(value) {
      let formattedDate = new Date(value);
      formattedDate = new Date(formattedDate.getTime() - 25200000); // 60 * 60 * 1000 * 8
      return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });
    },
    formatTimeAssigned(value) {
      let formattedDate = new Date(value);      
      return formattedDate.toLocaleTimeString('th-TH', { hour12: false });

    },
    
    async confirmDelete() {
      const selectedRow = this.$refs['my-table'].selectedRows;

      if (selectedRow.length > 0) {
        this.boxTwo = '';
        await this.$bvModal.msgBoxConfirm(this.$t('Please confirm that you want to delete'), {
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
              const selectID = selectedRow.map(obj => obj.id);
              // console.log(selectID);
              this.inactiveMember(selectID);

            }

          })
          .catch(err => {

          })
      }


    },
    async deleteitem(row) {
    this.boxTwo = '';
    await this.$bvModal.msgBoxConfirm('Please confirm that you want to Active/InActive.', {
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
          // console.log(selectID);
          this.inactiveMember(selectID);

        }

      })
      .catch(err => {

      })


      },
    addnew() {
      this.isAddFormActive = true;
      this.isEditFormActive = false;
      this.isSearchFormActive = false;
      this.isModeEdit = false;

      const EmptyRow =
      {
        id: "",
        fullname: '',                        
        mobile_no: "",
        bank_id : 1,
        bank_account_no: "",
        //create_at: new Date().toLocaleString('en-US',{timeZone: "asia/bangkok"}),
        create_at: new Date().toISOString('en-US',{timeZone: "asia/bangkok"}),
        knowus: "",
        status: 0,        
      };

      this.selectedDataRow = EmptyRow;
    },
    async edititem(row) {
      
      this.isOpenMenu = false;

      this.isAddFormActive = false;
      this.isEditFormActive = true;
      this.isSearchFormActive = false;
      this.isModeEdit = true;
      
      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
          userid: userData.username,
          token: userData.token,
      }

      var body = {
          username: row.id,
      }

      // console.log(body);

      let response;
      await axios.post("api/member/getMemberDepWitByID/", body,
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

      if (response.data.status == "success")             
      {
          let tmpData  = response.data.data;                                
          row.sumdeposit = tmpData.SumAD?tmpData.SumAD:0.00;
          row.sumwithdraw = tmpData.SumAW?tmpData.SumAW:0.00;
          row.sumprofit = tmpData.Profit?tmpData.Profit:0.00;
      }

      this.selectedDataRow = row;
      
    },
    closeEditForm() {
      this.isWithdrawFormActive = false;
      this.isDepositFormActive = false;
      this.isAddFormActive = false;
      this.isEditFormActive = false;
    },
    async inactiveMember(listId) {
      //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

      console.log("inactiveMember");

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
      await axios.post("api/member/inactivememberbyid/", body,
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
            title: `Active/Inactive`,
            icon: 'PowerIcon',
            variant: 'warning',
            text: `Active/Inactive Succesful.`,
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
            title: `Active/Inactive`,
            icon: 'PowerIcon',
            variant: 'danger',
            text: `Active/Inactive UnSuccesful ${response.data.message}`,
          },
          autoHideDelay: 3000,
        });
        this.search();
      }

    },    
    avatarText(fullname)
    {      
      if (!fullname) return ''
      const nameArray = fullname.split(' ')
      return nameArray.map(word => word.charAt(0).toUpperCase()).join('')              
    },
    async reloadCredit(row)
    {
      console.log("reloadCredit");

      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
          userid: userData.username,
          token: userData.token,
      }

      var body = row;
      
      let response;
      await axios.post("api/member/getCreditByUsername", body, {
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
                  title: `Update`,
                  icon: 'EditIcon',
                  variant: 'success',
                  text: `Update Succesful.`,
              },
              autoHideDelay: 3000,
          });
          
          // this.search();
          row.credit = response.data.data.credit;
          row.alias_credit = response.data.data.alias_credit;

          await this.search();
          this.closeMenu();
          

      } else {
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
    async autoBank(row)
    {
      console.log("autoBank");
      this.isOpenMenu = false;

      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
          userid: userData.username,
          token: userData.token,
      }

      var body = row;
      
      let response;
      await axios.post("api/member/updateAutoBank", body, {
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
                  title: `Update`,
                  icon: 'EditIcon',
                  variant: 'success',
                  text: `Update Succesful.`,
              },
              autoHideDelay: 3000,
          });
          
          // this.search();
          row.AutoBank = (row.AutoBank*-1)+1;
          

      } else {
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
    async cancelPromotion(row)
    {
      console.log("cancelPromotion");
      this.isOpenMenu = false;
      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
          userid: userData.username,
          token: userData.token,
      }

      var body = row;
      
      let response;
      await axios.post("api/member/cancelPromotion", body, {
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
                  title: `Update`,
                  icon: 'EditIcon',
                  variant: 'success',
                  text: `Update Succesful.`,
              },
              autoHideDelay: 3000,
          });
          
          // this.search();
          
      } else {
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
    modalclose()
    {
      this.$refs['bv-modal-deposit'].hide();      
      this.$refs['bv-modal-withdraw'].hide();
      this.$refs['bv-modal-promotion'].hide();
      this.$refs['bv-modal-info'].hide();
      this.$refs['bv-modal-info2'].hide();
      this.$refs['bv-modal-info4'].hide();
      this.$refs['bv-modal-showpromotion'].hide();
      this.acting=false;
    },
    openMenu(row)
    {
      this.isOpenMenu=true;
      this.rowMenu = row;      
    },
    closeMenu()
    {
      this.isOpenMenu=false;
      this.rowMenu = [];
    },
    async deposit(row)
    {
      this.acting=true;
      this.depositRow = row;
      this.depositAmount = 0;
      this.entertimeSelected= 0;
      this.aliaswallet=0;
      this.depositTime="00:00";
      this.$refs['bv-modal-deposit'].show();      
      this.isOpenMenu = false;
    },
    async depositConfirm()
    {
      console.log("depositConfirm");

      if (parseFloat(this.depositAmount)<=0) 
      {
        this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                  title: `Update`,
                  icon: 'TrashIcon',
                  variant: 'danger',
                  text: `Deposit Amount Must More Than 0`,
              },
              autoHideDelay: 3000,
          });
          return;
      }

      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
          userid: userData.username,
          token: userData.token,
      }

      var body = this.depositRow;

      body.username = this.depositRow.id;
      body.depositAmount= this.depositAmount;
      body.parent = this.depositRow.parent;
      
      body.entertimeSelected= this.entertimeSelected;
      body.depositDateTime= this.depositDateTime;
      body.depositAccNo = this.depositAccNo;
      body.depositBankApp = this.depositBankApp;
      body.depositRemark= this.depositRemark;
      body.aliaswallet = this.aliaswallet;

      let response;
      this.isLoading = true;
      await axios.post("api/member/depositCreditMemberByid", body, {
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
      this.isLoading = false;

      // console.log(response);
      if (response.data.status == "success") {
          //

          this.depositRow.credit = response.data.data.credit;
          this.depositRow.alias_credit = response.data.data.alias_credit;

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
          
          this.modalclose();
          this.search();
          

      } else {
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

          // this.search();
      }
    },
    timeChange()
    {      
      this.depositTime = this.formatTimeAssigned(this.depositDateTime);
    },
    async withdraw(row)
    {
      this.acting=true;
      this.withdrawRow = row;
      this.withdrawAmount = 0;
      this.aliaswallet2=0;
      this.$refs['bv-modal-withdraw'].show();     
      this.isOpenMenu = false; 
    },
    async withdrawConfirm()
    {
      console.log("withdrawConfirm");

      if (parseFloat(this.withdrawAmount)<=0) 
      {
        this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                  title: `Update`,
                  icon: 'TrashIcon',
                  variant: 'danger',
                  text: `Withdraw Amount Must More Than 0`,
              },
              autoHideDelay: 3000,
          });
          return;
      }

      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
          userid: userData.username,
          token: userData.token,
      }

      var body = this.withdrawRow;

      body.username = this.withdrawRow.id;
      body.withdrawAmount= this.withdrawAmount;
      body.parent = this.withdrawRow.parent;
      
      body.withdrawRemark= this.withdrawRemark;
      body.aliaswallet= this.aliaswallet2;
      

      let response;
      this.isLoading = true;
      await axios.post("api/member/withdrawCreditMemberByid", body, {
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

      this.isLoading = false;

      // console.log(response);
      if (response.data.status == "success") {
          //

          this.withdrawRow.credit = response.data.data.credit;
          this.withdrawRow.alias_credit = response.data.data.alias_credit;

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
          
          this.modalclose();
          this.search();
          

      } else {
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

          // this.search();
      }
    },
    async getUserPromotion(userid) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const User = new FormData();

      User.append("userid", userData.username);
      User.append("username", userid);
      User.append("token", userData.token);

      // console.log(userData.username);

      const response = await this.GetUserPromotion(User);
      if (response.data.status == 'success') {

          if (response.data.data.length<=0) 
          {
              return;    
          }
          
          let tmpData = response.data.data[0];
          

          for (const [key, value] of Object.entries(JSON.parse(tmpData.meta))) {
              tmpData[key] = value;
          }

          // console.log(tmpData);

          tmpData['taken_turn'] = response.data.data2.taken_turn;
          tmpData['need_turn'] = response.data.data2.need_turn;
          tmpData['credit'] = response.data.data2.credit;
          tmpData['alias_credit'] = response.data.data2.alias_credit;

          // console.log(tmpData);

          if (tmpData['TurnTypeWithdraw'] == 'credit') {
              tmpData['remain_turn'] = parseFloat(tmpData['need_turn']) - parseFloat(tmpData['alias_credit']);
              if (tmpData['remain_turn'] < 0) {
                  tmpData['remain_turn'] = 0;
              }
          }
          else {
              tmpData['remain_turn'] = parseFloat(tmpData['need_turn']) - parseFloat(tmpData['taken_turn']);
              if (tmpData['remain_turn'] < 0) {
                  tmpData['remain_turn'] = 0;
              }
          }

          console.log(tmpData);
          this.userPromotion = tmpData;

      } else {
          this.userPromotion = [];
      }
    },
    async showPromotionModal(row)
    {
      this.acting=true;      
      this.promotionRow2 = row;
      this.$refs['bv-modal-showpromotion'].show();      
      this.isOpenMenu = false;

      this.isLoading = true;
      await this.getUserPromotion(row.id);
      this.isLoading = false;
    },
    async promotionModal(row)
    {
      this.acting=true;
      this.promotionRow = row;      
      this.$refs['bv-modal-promotion'].show();
      this.isOpenMenu = false;
    },
    async promotionConfirm()
    {
      console.log("promotionConfirm");

      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
          userid: userData.username,
          token: userData.token,
      }

      var body = this.promotionRow;

      body.username = this.promotionRow.id;
      body.promotionSelected = this.promotionSelected;

      let response;
      this.isLoading = true;
      await axios.post("api/member/changePromotionMemberByid", body, {
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
      this.isLoading = false;

      // console.log(response);
      if (response.data.status == "success") {
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
          
          this.modalclose();
          // this.search();
          

      } else {
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

          // this.search();
      }
    },
    async infoModal(row)
    {
      this.acting=true;
      this.infoRow = row;
      this.$refs['bv-modal-info'].show();
      this.rows2 = [];
      this.searchInfo();
      this.isOpenMenu = false;
    },
    async infoModal2(row)
    {
      this.acting=true;
      this.infoRow = row;
      this.$refs['bv-modal-info2'].show();
      this.rows2 = [];
      this.searchInfo2();
      this.isOpenMenu = false;
    },
    async infoModal4(row)
    {
      this.acting=true;
      this.infoRow4 = row;
      this.$refs['bv-modal-info4'].show();
      this.rows4 = [];
      this.searchInfo4();
      this.isOpenMenu = false;
    },
    async searchInfo()
    {
      console.log('searchInfo');

      const userData = JSON.parse(localStorage.getItem('userData'));

      var headers = {
        userid: userData.username,
        token: userData.token,
      }


      var body = {        
          searchWord: this.searchTerm,
          username : this.infoRow.id,
      }

      let response;
      this.isLoading = true;
      await axios.post("api/transaction/gettransactionbyusername",body,
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

      this.isLoading = false;

      if (response.data.status == 'success') {
        
        let tmpData = response.data.data;
        console.log(tmpData);
        this.rows2 = tmpData;
      }
      else {
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
    async searchInfo2()
    {
      console.log('searchInfo2');

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      formData.append("adminid", userData.username);

      formData.append("userid", this.infoRow.id);
      formData.append("token", userData.token);

      let tmpStart = new Date(this.fromDate);
      tmpStart = new Date(tmpStart.getTime()- (60 * 60 * 1000 * 24) + (60 * 60 * 1000 * 8)); //Last 48 Hours

      let tmpEnd = new Date(this.toDate);
      tmpEnd = new Date(tmpEnd.getTime() + (60 * 60 * 1000 * 24) + (60 * 60 * 1000 * 8));


      formData.append("dateFrom", tmpStart);
      formData.append("dateTo", tmpEnd);
      formData.append("agent", "");
      formData.append("searchWord", "");

      
      this.isLoading = true;
      const response = await this.GetReportBetlog2(formData);
      this.isLoading = false;
      if (response.data.status == 'success') {
        
        // console.log(response.data.data);
        let tmpData = response.data.data;
        this.rows3 = tmpData;
      }
      else {
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
    async searchInfo4()
    {
      console.log('searchInfo4');

      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();

      formData.append("adminid", userData.username);

      formData.append("userid", this.infoRow4.id);
      formData.append("token", userData.token);

      let tmpStart = new Date(this.fromDate4);
      tmpStart = new Date(tmpStart.getTime()); //Last 48 Hours

      let tmpEnd = new Date(this.toDate4);
      tmpEnd = new Date(tmpEnd.getTime() + (60 * 60 * 1000 * 24) + (60 * 60 * 1000 * 8));

      formData.append("dateFrom", tmpStart);
      formData.append("dateTo", tmpEnd);
      formData.append("agent", "");
      formData.append("searchWord", "");
      
      this.isLoading = true;
      const response = await this.GetReportBetlog4(formData);
      this.isLoading = false;
            
      if (response.data.status == 'success') {
        
        // console.log(response.data.data);
        let tmpData = response.data.data;
        this.rows4 = tmpData;
      }
      else {
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
    }

  },
}
</script>


<style lang="scss">
@import '@core/scss/vue/libs/vue-good-table.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';

.myavatar {
  display: flex;
  align-items: center;
}

.myavatar img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// .vgt-responsive {
//   height: 450px;
//   max-height: 500px;
//   width: 100%;
//     overflow-x: auto;
//     position: relative;
// }

</style>

