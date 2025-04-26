<template>
    <div>
        <Transition name="bounce">
            
            <b-card-code v-if="isEditFormActive" id="member-manage-edit" :title="titleCard" 
            @hidden="resetForm" @change="(val) => $emit('update:is-member-manage-edit-active', val)">

                <b-tabs v-model="tabIndex" pills @input="tabChange">

                    
                    <b-tab>
                        <template #title>
                            <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
                            <span class="d-none d-sm-inline">{{t('Account')}}</span>
                        </template>
                        <div>
                            <b-media class="mb-2">
                                <template #aside>
                                    <b-avatar ref="previewEl" :src="pRowData.img_url" :text="pRowData.fullname" size="90px" rounded />
                                </template>
                                <h4 class="mb-1">
                                    {{ pRowData.fullname }}
                                </h4>
                                <h4 class="mb-1">
                                    {{ pRowData.id }}
                                </h4>
                                <b-badge
                                    pill
                                    :variant="`light-${this.resolveStatusVariant(pRowData.status)}`"
                                    class="text-capitalize"
                                >
                                    {{t(this.resolveStatusText(pRowData.status))}}
                                </b-badge>
                                <div class="d-flex flex-wrap">

                                </div>
                            </b-media>

                            <b-form>
                                <b-row>

                                    
                                    <b-col md="6">                                
                                        <b-form-group :label="t('Fullname')" label-for="fullname">
                                            <b-input-group class="input-group-merge">
                                                <b-input-group-prepend is-text>
                                                    <feather-icon icon="UserIcon" />
                                                </b-input-group-prepend>
                                                <b-form-input
                                                    id="fullname" v-model="pRowData.fullname"
                                                />
                                            </b-input-group>
                                        </b-form-group>

                                    </b-col>

                                    
                                    <b-col md="6">                                
                                        <b-form-group :label="t('Mobile No')"  label-for="mobile_no">
                                            <b-input-group class="input-group-merge">
                                                <b-input-group-prepend is-text>
                                                    <feather-icon icon="SmartphoneIcon" />
                                                </b-input-group-prepend>
                                                <b-form-input id="mobile_no" v-model="pRowData.mobile_no" />
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>

                                </b-row>
                                <b-row v-if="1==0">
                                    
                                    <b-col md="6">                                
                                        <b-form-group :label="t('Bank')" label-for="bank-selected">
                                            <b-input-group class="input-group-merge">
                                                <b-input-group-prepend is-text>
                                                    <feather-icon icon="CreditCardIcon" />
                                                </b-input-group-prepend>
                                                <b-form-select v-model="bankSelected" :options="bankOptions"></b-form-select>
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>

                                    <b-col md="6">                                
                                        <b-form-group :label="t('Bank Account Number')" label-for="bank_account_no">
                                            <b-input-group class="input-group-merge">
                                                <b-input-group-prepend is-text>
                                                    <feather-icon icon="CreditCardIcon" />
                                                </b-input-group-prepend>
                                                <b-form-input id="bank_account_no" v-model="pRowData.bank_acc_no" />
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>

                                
                                </b-row>
                                <b-row>                            
                                    <b-col md="6">                                
                                        <b-form-group :label="t('Bank')"  label-for="bank-selected">
                                            <b-input-group class="input-group-merge">
                                                <b-input-group-prepend is-text>
                                                    <feather-icon icon="CreditCardIcon" />
                                                </b-input-group-prepend>
                                                <b-form-select v-model="bankSelected" :options="bankOptions"></b-form-select>
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>

                                    <b-col md="6">                                
                                        <b-form-group :label="t('Bank Account Number')"  label-for="bank_account_no">
                                            <b-input-group class="input-group-merge">
                                                <b-input-group-prepend is-text>
                                                    <feather-icon icon="CreditCardIcon" />
                                                </b-input-group-prepend>
                                                <b-form-input id="bank_account_no" v-model="pRowData.bank_acc_no" />
                                                <b-input-group-append is-text>                                                                                        
                                                        <feather-icon icon="SearchIcon" /> &nbsp;<small> {{t('Get Fullname')}}</small>                                            
                                                </b-input-group-append>
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    
                                    <b-col md="6">                                
                                        <b-form-group :label="t('Line Id')"  label-for="lineid">
                                            <b-input-group class="input-group-merge">
                                                <b-input-group-prepend is-text >
                                                    <feather-icon icon="UserIcon" />
                                                </b-input-group-prepend>
                                                <b-form-input id="lineid" :value="pRowData.lineid" />
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>       
                                    
                                    <b-col md="6">                                
                                        <b-form-group :label="t('Register Date')" label-for="register_date">
                                            <b-input-group class="input-group-merge">
                                                <b-input-group-prepend is-text >
                                                    <feather-icon icon="CalendarIcon" />
                                                </b-input-group-prepend>
                                                <b-form-input id="register_date" :value="formatDateAssigned(pRowData.create_at)" readonly />
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>

                                </b-row>
                                <b-row>
                                    

                                    

                                    <b-col md="6">                                
                                        <b-form-group :label="t('Created By')" label-for="createdBy">
                                            <b-input-group class="input-group-merge">
                                                <b-input-group-prepend is-text >
                                                    <feather-icon icon="TvIcon" />
                                                </b-input-group-prepend>
                                                <b-form-input id="createdBy" v-model="pRowData.createdBy" readonly />
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>
                                    
                                </b-row>
                            </b-form>

                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary" class="mr-1" v-if="isModeEdit" @click="updateMember" :disabled="!pagePermission.canEdit">
                                <feather-icon icon="EditIcon" />
                                {{t('Save')}}
                            </b-button>

                            <b-button @click="close" v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="outline-secondary">
                                <feather-icon icon="DeleteIcon" />
                                {{t('Close')}}
                            </b-button>

                        </div>
                    </b-tab>
                    
                    <b-tab>
                        <template #title>
                            <feather-icon icon="InfoIcon" size="16" class="mr-0 mr-sm-50" />
                            <span class="d-none d-sm-inline">{{t('Information')}}</span>
                        </template>
                        <div>
                            <b-media class="mb-2">
                                <template #aside>
                                    <b-avatar ref="previewEl" :src="pRowData.img_url" :text="pRowData.fullname" size="90px" rounded />
                                </template>
                                <h4 class="mb-1">
                                    {{ pRowData.fullname }}
                                </h4>
                                <h4 class="mb-1">
                                    {{ pRowData.id }}
                                </h4>
                                <b-badge
                                    pill
                                    :variant="`light-${this.resolveStatusVariant(pRowData.status)}`"
                                    class="text-capitalize"
                                >
                                    {{t(this.resolveStatusText(pRowData.status))}}
                                </b-badge>
                                <div class="d-flex flex-wrap">

                                </div>
                            </b-media>

                            <b-form>
                                <b-row>
                                    <b-col md="6">                                
                                        <input type="file" @change="uploadFile('profileImg')" ref="profileImg">
                                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('profileImg')" :disabled="!pagePermission.canEdit">
                                            Upload
                                        </b-button>
                                    </b-col>                            
                                </b-row>       
                                <b-row>
                                    <b-col md="12">
                                        <hr/>
                                    </b-col>
                                </b-row>       
                                <b-row>
                                    <b-col md="6">
                                        <b-img :src="pRowData.card_img_url" fluid thumbnail style="height: 200px;" /><br/>
                                        <input type="file" @change="uploadFile('card_img_url')" ref="card_img_url">
                                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('card_img_url')" :disabled="!pagePermission.canEdit">
                                            Upload
                                        </b-button>
                                    </b-col>
                                </b-row>  
                                <b-row>
                                    <b-col md="12">
                                        <hr/>
                                    </b-col>
                                </b-row>  
                                
                                <b-row>
                                    <b-col md="12">
                                        <b-form-group :label="t('Address')" label-for="address">
                                            <b-form-input id="address" v-model="pRowData.address"  />
                                        </b-form-group>
                                    </b-col>                                    
                                </b-row>  
                            
                                <b-row>
                                    <b-col md="6">
                                        <b-form-group :label="t('Province')" label-for="province-selected">
                                            <b-form-select id="province-selected" v-model="provinceSelected" :options="provinceOptions" @change="provinceChange()" ></b-form-select>
                                        </b-form-group>
                                    </b-col>
                                    <b-col md="6">
                                        <b-form-group :label="t('District')" label-for="district-selected">
                                            <b-form-select id="district-selected" v-model="districtSelected" :options="districtOptions" @change="districtChange()" ></b-form-select>
                                        </b-form-group>
                                    </b-col>
                                </b-row>  

                                <b-row>
                                    <b-col md="6">
                                        <b-form-group :label="t('Sub District')" label-for="subdistrict-selected">
                                            <b-form-select id="subdistrict-selected" v-model="subDistrictSelected" :options="subDistrictOptions" @change="subDistrictChange()" ></b-form-select>
                                        </b-form-group>
                                    </b-col>
                                    <b-col md="6">
                                        <b-form-group :label="t('Zipcode')" label-for="zipcode">
                                            <b-form-input id="zipcode" v-model="pRowData.zipcode" maxlength="5"  />
                                        </b-form-group>
                                    </b-col>
                                </b-row>  


                            </b-form>


                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary" class="mr-1" v-if="isModeEdit" @click="updateMember" :disabled="!pagePermission.canEdit">
                                <feather-icon icon="EditIcon" />
                                {{t('Save')}}
                            </b-button>
                            
                            <b-button @click="close" v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="outline-secondary">
                                <feather-icon icon="DeleteIcon" />
                                {{t('Close')}}
                            </b-button>

                        </div>
                    </b-tab> 

                    
                    <b-tab>
                        <template #title>
                            <feather-icon icon="InfoIcon" size="16" class="mr-0 mr-sm-50" />
                            <span class="d-none d-sm-inline">{{t('Email')}}</span>
                        </template>
                        <div>
                            <b-media class="mb-2">
                                <template #aside>
                                    <b-avatar ref="previewEl" :src="pRowData.img_url" :text="pRowData.fullname" size="90px" rounded />
                                </template>
                                <h4 class="mb-1">
                                    {{ pRowData.fullname }}
                                </h4>
                                <h4 class="mb-1">
                                    {{ pRowData.id }}
                                </h4>
                                <b-badge
                                    pill
                                    :variant="`light-${this.resolveStatusVariant(pRowData.status)}`"
                                    class="text-capitalize"
                                >
                                    {{t(this.resolveStatusText(pRowData.status))}}
                                </b-badge>
                                <div class="d-flex flex-wrap">

                                </div>
                            </b-media>

                            <b-form>
                                <b-row>
                                    <b-col md="6">
                                        <b-form-group :label="t('Add Email')" label-for="inputEmail">
                                            <b-form-input id="inputEmail" v-model="inputEmail"  />
                                        </b-form-group>
                                    </b-col>                                    
                                </b-row>  
                            </b-form>

                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary" class="mr-1" v-if="isModeEdit" @click="addMemberEmail" :disabled="!pagePermission.canEdit">
                                <feather-icon icon="EditIcon" />
                                {{t('Add')}}
                            </b-button>
                            
                            <b-button @click="close" v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="outline-secondary">
                                <feather-icon icon="DeleteIcon" />
                                {{t('Close')}}
                            </b-button>
                            <b-form>
                                <b-row style="padding:20px;">
                                   <h3>{{ t('Email List') }}</h3>
                                </b-row>
                                <b-row v-for="item in emailList" :key="item.id" style="padding-left: 30px;" >
                                    <b-col>
                                        <b-icon-trash style="color:red;cursor: pointer;" @click="confirmDeleteEmail(item.id)"></b-icon-trash>
                                        <span style="padding-left: 10px;color:grey;cursor: pointer;"> {{ item.email }} </span>
                                    </b-col>
                                </b-row>
                            </b-form>

                        </div>
                    </b-tab> 


                    <!-- 
                    <b-tab>
                        <template #title>
                            <feather-icon icon="Share2Icon" size="16" class="mr-0 mr-sm-50" />
                            <span class="d-none d-sm-inline">{{t('Change Password')}}</span>
                        </template>
                        <div>
                            <b-media class="mb-2">
                                <template #aside>
                                    <b-avatar ref="previewEl" :src="pRowData.img_url" :text="pRowData.fullname" size="90px" rounded />
                                </template>
                                <h4 class="mb-1">
                                    {{ pRowData.fullname }}
                                </h4>
                                <h4 class="mb-1">
                                    {{ pRowData.id }}
                                </h4>
                                <b-badge
                                    pill
                                    :variant="`light-${this.resolveStatusVariant(pRowData.status)}`"
                                    class="text-capitalize"
                                >
                                    {{t(this.resolveStatusText(pRowData.status))}}
                                </b-badge>
                                <div class="d-flex flex-wrap">

                                </div>
                            </b-media>

                            <b-form>
                                <b-row>
                                    
                                    <b-col md="6">
                                        <b-form-group :label="t('New Password')" label-for="new_password">               
                                            <b-form-input id="new_password" v-model="newPassword" type="password" :disabled="!pagePermission.canEdit" />
                                        </b-form-group>
                                    </b-col>
                                
                                </b-row>

                            </b-form>

                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary" class="mr-1" v-if="isModeEdit" @click="changePassword" :disabled="!pagePermission.canEdit" >
                                <feather-icon icon="EditIcon" />
                                {{t('Change Password')}}
                            </b-button>

                            <b-button @click="close" v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="outline-secondary">
                                <feather-icon icon="DeleteIcon" />
                                {{t('Close')}}
                            </b-button>

                        </div>
                    </b-tab> -->

                    <b-tab>
                        <template #title>
                            <feather-icon icon="UpIcon" size="16" class="mr-0 mr-sm-50" />
                            <span class="d-none d-sm-inline">{{t('Subscription History')}}</span>
                        </template>
                        <div>
                            <b-media class="mb-2">
                                <template #aside>
                                    <b-avatar ref="previewEl" :src="pRowData.img_url" :text="pRowData.fullname" size="90px" rounded />
                                </template>
                                <h4 class="mb-1">
                                    {{ pRowData.fullname }}
                                </h4>
                                <h4 class="mb-1">
                                    {{ pRowData.id }}
                                </h4>
                                <b-badge
                                    pill
                                    :variant="`light-${this.resolveStatusVariant(pRowData.status)}`"
                                    class="text-capitalize"
                                >
                                    {{t(this.resolveStatusText(pRowData.status))}}
                                </b-badge>
                                <div class="d-flex flex-wrap">

                                </div>
                            </b-media>

                            <b-form>
                                <b-row>
                                    <b-col md="12">
                                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="success" class="mr-1" v-if="isModeEdit" @click="confirmRequest" >
                                        <feather-icon icon="EditIcon" />
                                        {{t('Add Subscription')}}
                                    </b-button>
                                    </b-col>
                                </b-row>                               
                                
                                <b-row>
                                    <b-col md="12">
                                        <hr/>
                                    </b-col>
                                </b-row>                               
                                <b-row>
                                    <b-col md="12">
                                        <hr/>
                                    </b-col>
                                </b-row>
                            </b-form>

                        </div>
                    </b-tab> 

                    
                </b-tabs>
            </b-card-code>

        </Transition>

        <Transition name="bounce">
            <b-card-code v-if="showInspectApprove">
                
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
                    <b-col md="12">
                        <b-form-group
                            :label="t('Share Person')"
                            label-for="share-person-input"                    
                            >                            
                        </b-form-group>  
                    </b-col>
                </b-row>
                <b-row v-for="item in rowsShareLoan"
                        :key="item.id"   >
                    <b-col md="3">
                        {{ item.fullName }}
                    </b-col>
                    <b-col md="3">
                        {{ item.share_percent }} %
                    </b-col>
                    <b-col md="6">

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

                                <span v-if="props.column.field === 'payment_amount2'">    
                                    <b-badge
                                        pill
                                        variant="success"
                                    >
                                    {{(props.row.payment_amount).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}}
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
                                        {{ t('Paid')+' '+ formatDateAssigned(props.row.paid_at) }}                                        
                                    </b-badge>
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

                

                <b-row>
                    <b-col md="12">
                        <hr/>
                    </b-col>
                </b-row>

                <b-button @click="closeInspectionApprove" v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="outline-secondary" >
                        <feather-icon icon="DeleteIcon" />
                        {{t('Back')}}
                </b-button>  &nbsp;

                <b-button @click="confirmApprove(inspectApproveData.id)" v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="success" v-if="inspectCanAction" :disabled="pagePermission.canApprove==0" >
                        <feather-icon icon="CheckSquareIcon" />
                        {{t('Approve')}}
                </b-button>&nbsp;

                <b-button @click="confirmReject(inspectApproveData.id)" v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="warning" v-if="inspectCanAction" :disabled="pagePermission.canApprove==0">
                        <feather-icon icon="XSquareIcon" />
                        {{t('Reject')}}
                </b-button>
                
            </b-card-code>
        </Transition>
    
        <b-modal
            id="modal-request"
            ref="modalRequest"
            v-model="showModalRequest"
            :title="t('Please confirm that you want to subscribe')"
            @show="resetModalApprove"        
            @hidden="resetModalApprove"
            @ok="handleOkRequest"      
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
                        label-for="request-note-input"                    
                        >
                        
                        <b-form-textarea
                            id="request-note-input"
                            v-model="requestNoteInput"                
                            rows="2"
                            max-rows="4"
                        ></b-form-textarea>
                    </b-form-group>
                </b-col>                
            </b-row>
            <b-row>
                <b-col md="12">
                    <b-form-group :label="t('Select Email')" label-for="email-selected">
                        <b-input-group class="input-group-merge">
                            <b-input-group-prepend is-text>
                                <feather-icon icon="EmailIcon" />
                            </b-input-group-prepend>
                            <b-form-select v-model="selectedSubScribeEmail" :options="optionSubScribeEmail"></b-form-select>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
    
            <b-row>                
                <div class="dialog-content2" style="padding-left: 20px;">
                    <h4>{{t('Select Product')}}</h4>
                    <div class="content-container">     
                        <div class="grid-container">
                            <div class="grid-item" style="padding-top: 10px;padding-bottom: 10px; padding-left: 10px; padding-right: 10px;  cursor: pointer;" 
                                v-for="(product) in productList" :key="product.id" >
                                
                                <div v-if="product.id==selectedProductId" @click="changeSelectedProduct(product.id)" style="color:black;background-color: antiquewhite;" > 
                                    <img :src="product.product_img" height="50px" width="50px" /> <br/>
                                    <span style="color:grey;font-size: 12px; font-weight: 500;" > {{product.product_name}}</span><br/>
                                    <span style="color:grey;font-size: 10px;" > {{product.product_desc}}</span>
                                </div>
                                
                                <div v-if="product.id!=selectedProductId" @click="changeSelectedProduct(product.id)" > 
                                    <img :src="product.product_img" height="50px" width="50px" /> <br/>
                                    <span style="color:grey;font-size: 12px;font-weight: 500;" > {{product.product_name}}</span><br/>
                                    <span style="color:grey;font-size: 10px;" > {{product.product_desc}}</span>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
            </b-row>
             
        </b-modal>

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
                        :label="t('Share Person')"
                        label-for="share-person-input"                    
                        >                            
                    </b-form-group>  
                </b-col>
            </b-row>
            <b-row v-for="item in sharePersonList"
                    :key="item.id"   >
                <b-col md="6">
                    {{ item.fullName }}
                </b-col>
                <b-col md="4">
                    {{ item.percent }} %
                </b-col>
                <b-col md="2">
                    <b-badge style="cursor: pointer; margin-right:2px" variant="warning" @click="deleteSharePerson(item.id)" >
                                <feather-icon icon="XSquareIcon" size="16" class="mr-0 mr-sm-50" />                                                    
                        </b-badge>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="12">
                    <hr/>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="5">
                    <b-form-group
                        :label="t('Select Share Person')"
                        label-for="select-share-percent"                    
                        >
                        <b-form-select id="select-share-percent" v-model="shareSelected" :options="shareOptions"  ></b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="3">
                    <b-form-group
                        :label="t('Percent')"
                        label-for="share-percent"                    
                        >
                        <b-form-input
                            id="sharePercent" v-model="sharePercent" type="number"
                        />
                    </b-form-group>
                </b-col>
                <b-col md="4">
                    <b-form-group
                        :label="t('Percent')"
                        label-for="share-percent"                    
                        >
                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mr-1" @click="addSharePerson">
                                <feather-icon icon="PlusIcon" />
                                {{t('Add')}}
                        </b-button>
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
            <form ref="form" @submit.stop.prevent="handleOkReject">
                <b-form-group
                :label="t('Note')"
                label-for="reject-note-input"                    
                >
                
                <b-form-textarea
                    id="reject-note-input"
                    v-model="rejectNoteInput"                
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>

                </b-form-group>
            </form>
        </b-modal>

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

    </div>
</template>

<script>
import BCardCode from '@core/components/b-card-code'
import {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BFormSelect,
    BTabs,
    BTab,
    BMedia,
    BAvatar,    
    BInputGroup, 
    BInputGroupPrepend,
    BBadge,
    BImg,
    BFormDatepicker,
    BPagination,
    BModal,
    BFormTextarea,
    BInputGroupAppend,
    BIconTrash,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table';
import {
    ref
} from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import formValidation from '@core/comp-functions/forms/form-validation'
import {
    mapActions
} from "vuex";
import axios from "axios";

import { useUtils as useI18nUtils } from '@core/libs/i18n'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { formatDate } from '@/@core/utils/filter'

import store from '@/store/index';

export default {
    components: {
        BCardCode,   
        BBadge,     
        BAvatar,
        BTabs,
        BTab,
        BMedia,
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
        BFormCheckbox,
        BForm,
        BButton,
        BFormSelect,
        BInputGroup, 
        BInputGroupPrepend,
        BImg,
        BFormDatepicker,  
        VueGoodTable,
        BPagination,
        BModal,
        BFormTextarea,
        BInputGroup,         
        BInputGroupAppend,
        BIconTrash,
    },
    directives: {
        Ripple,
    },
    computed: {        
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
    setup(props, {
        emit
    }) {

        const { t } = useI18nUtils();

        const blankData = {
            credit: 0.00,
            credit_bonus: 0.00,
            date: null,
            username: '',
        }

        let tmpData = JSON.parse(JSON.stringify(blankData));
        const resetuserData = () => {
            tmpData = JSON.parse(JSON.stringify(blankData));
        }

        const {
            resetForm,
        } = formValidation(resetuserData)


        const columns =  [
            {
            label: t('Payment Date'),
            field: 'payment_date2',
            },
            {
            label: t('Principle Amount'),
            field: 'principle_amount2',  
            width: '20%',          
            },
            {
            label: t('Interest Amount'),
            field: 'interest_amount2',
            width: '10%',
            },       
            {
            label: t('Total Payment'),
            field: 'payment_amount2',
            width: '30%',
            },                   
        ];

        const columnsRequestLoan =  [
            {
                label: t('Request Date'),
                field: 'create_at2',
            },
            {
                label: t('Create By'),
                field: 'create_by',            
            },  
            {
                label: t('Loan Name'),
                field: 'interest_name',            
            },
            {
                label: t('Loan Amount'),
                field: 'loan_amoun2',                   
            },   
            {
                label: t('Loan Time'),
                field: 'loan_longtime_number2',                   
            }, 
            {
                label: t('Interest'),
                field: 'interest2',                   
            },    
             
            {
                label: t('Calculate Interest Every'),
                field: 'period_number2',                   
            },  
            {
                label: t('Start Date Contract'),
                field: 'loan_start_at2',
            },
            {
                label: t('Action'),
                field: 'action',
            },
        ];

        const columnsRejectLoan =  [
            {
                label: t('Request Date'),
                field: 'create_at2',
            },
            {
                label: t('Create By'),
                field: 'create_by',            
            },  
            {
                label: t('Loan Name'),
                field: 'interest_name',            
            },
            {
                label: t('Loan Amount'),
                field: 'loan_amoun2',                   
            },   
            {
                label: t('Loan Time'),
                field: 'loan_longtime_number2',                   
            }, 
            {
                label: t('Interest'),
                field: 'interest2',                   
            },    
            
            {
                label: t('Calculate Interest Every'),
                field: 'period_number2',                   
            },  
            {
                label: t('Start Date Contract'),
                field: 'loan_start_at2',
            },   
            {
                label: t('Reject By'),
                field: 'reject_by2',
            },    
            {
                label: t('Note'),
                field: 'reject_note',
            },      
            {
                label: t('Action'),
                field: 'action',
            },
        ];

        const columnsApproveLoan =  [
            {
                label: t('Request Date'),
                field: 'create_at2',
            },
            {
                label: t('Create By'),
                field: 'create_by',            
            },  
            {
                label: t('Loan Name'),
                field: 'interest_name',            
            },
            {
                label: t('Loan Amount'),
                field: 'loan_amoun2',                   
            },   
            {
                label: t('Remain Principle'),
                field: 'remain_loan2',                   
            },   
            {
                label: t('Loan Time'),
                field: 'loan_longtime_number2',                   
            }, 
            {
                label: t('Interest'),
                field: 'interest2',                   
            },    
            
            {
                label: t('Calculate Interest Every'),
                field: 'period_number2',                   
            },  
            {
                label: t('Start Date Contract'),
                field: 'loan_start_at2',
            },   
            {
                label: t('Approve By'),
                field: 'approve_by2',
            },    
            {
                label: t('Note'),
                field: 'approve_note',
            },      
            {
                label: t('Action'),
                field: 'action',
            },
        ];
        
        const columnsCal =  [
            {
            label: t('Payment Date'),
            field: 'payment_date2',
            },
            {
            label: t('Principle Amount'),
            field: 'principle_amount2',  
            width: '20%',          
            },
            {
            label: t('Interest Amount'),
            field: 'interest_amount2',
            width: '10%',
            },       
            {
            label: t('Total Payment'),
            field: 'payment_amount2',
            width: '30%',
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
            resetForm,
            t,
            columns,
            columnsRequestLoan,
            columnsRejectLoan,
            columnsApproveLoan,
            columnsCal,
            columnsPayment,
        }
    },      
    model: {        
        event: 'update:is-member-manage-edit-active',
        bankSelected: 1,
        bankOptions: [{
            value: null,
            text: 'Select Bank'
        }, ],

        titleCard: "",        
        newPassword:"",     

        effective_rate:0,
    },
    data() {
        const now = new Date();   
        const fDate = now.getFullYear()+'-'+ ('0' + (now.getMonth()+1)).slice(-2) +'-'+ ('0' + (now.getDate())).slice(-2);

        
        return {            
            pageLength: 10,
            pageLength2: 10,
            pageLength3: 10,

            dir: false,            
            dir2: false,
            rows: [],
            rowsCal:[],
            rowsPayment:[],
            rowsShareLoan:[],
            
            searchTerm: '',            
            searchTerm2: '',            
            searchTerm3: '',

            tmpFileUpload:[],
            tmpFileUpload2:[],

            period_name:"",
            period_unit:"",
            collateral_name:"",
            period_number:0,            
            loan_amount:1000.0,
            interest:3.0,
            loan_longtime_number:10,
            effective_rate:0,
            loan_start_at: fDate,
            calculated_interest : false,

            tabIndex:0,

            collateral_img1:"",
            collateral_img2:"",
            collateral_img3:"",
            collateral_img4:"",

            requestLoan : [],
            rejectLoan : [],
            approveLoan : [],
            view_detail_request_loan:false,
            view_detail_reject_loan:false,
            view_detail_approve_loan:false,

            selectedLoanId: 0,
            showModalApprove:false,
            showModalRequest:false,

            approveNoteInput:"",
            requestNoteInput:"",

            showModalReject:false,
            rejectNoteInput:"",

            interestTypeSelected: 0,
            interestTypeOptions: [{
                value: 0,
                text: this.$t('Select Loan Type')
            }, ],
            interestTypeData:[],

            interestPerSelected:1,
            interestPerOptions: [
                {
                    value: 1,
                    text: '1 '+this.$t('Days')
                }, 
                {
                    value: 7,
                    text: '7 '+this.$t('Days')
                },
                {
                    value: 15,
                    text: '15 '+this.$t('Days')
                },
                {
                    value: 30,
                    text: '1 '+this.$t('Months')
                }, 
                {
                    value: 365,
                    text: '1 '+this.$t('Year')
                }, 
            ],

            provinceSelected: 0,
            provinceOptions: [{
                value: 0,
                text: this.$t('Select Province')
            }, ],
            provinceData:[],

            districtSelected: 0,
            districtOptions: [{
                value: null,
                text: this.$t('Select District')
            }, ],
            districtData:[],

            subDistrictSelected: 0,
            subDistrictOptions: [{
                value: null,
                text: 'Select Sub District'
            }, ],
            subDistrictData:[],

            showCollateralImg1:false,     
            showInspectApprove:false,      
            
            inspectApproveData:[],
            inspectCanAction:false,
            period_name2:"",
            period_unit2:"",
            collateral_name2:"",
            period_number2:0,            
            loan_amount2:1000.0,
            interest2:3.0,
            interestper2:"วัน",
            loan_longtime_number2:10,
            effective_rate2:0,
            loan_start_at: fDate,

            showLoanPayment:false,
            loanPaymentData:[],

            showModalPaymentNote:false,
            paymentNoteInput:'',
            paymentNoteData:[],

            paymentRefImg:'',
            paymentRefNote:'',
            paymentNoteAt:'',
            paymentNoteBy:'',

            paymentNotePage:1,

            shareSelected:'',
            shareDatas:[],

            shareOptions: [{
                value: "",
                text: 'Select Share Person'
            }, ],

            sharePersonList:[],
            sharePercent:100,
            pagePermission:[],

            productList:[],
            selectedProductId:0,
            inputEmail:'',
            emailList:[],

            selectedSubScribeEmail :0,
            optionSubScribeEmail : [{
                value: "",
                text: 'Select Email'
            },],
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
        },
    },
    watch: {
        pRowData: async function (newVal, oldVal) {
            this.bankSelected = newVal.bank_id;           
            this.newPassword = newVal.password;
            
            this.getMemberEmail(),
            
            this.provinceSelected = newVal.province_id;
            this.districtSelected = newVal.district_id;
            this.subDistrictSelected = newVal.subdistrict_id;
        },
        isModeEdit: function (newVal, oldVal) {
            if (newVal == true) {
                this.titleCard = "Member Data (Edit)";
            } else {
                this.titleCard = "Member Data (Add)";
            }
        }
    },    
    async created() {
        this.period_name="";
        this.period_unit="";
        this.collateral_name="";
        this.period_number="";

        await this.getPagePermission();
        await Promise.all([
            this.getAllSubDistrict(),
            this.getBankInfo(),
            this.getInterestType(),
            this.getAllProvince(),
            this.getAllDistrict(),
            this.getAllAdminActive(),         
            this.getProductList(),  
        ]);        
            
        this.titleCard = "";        
        this.newPassword ="";

        //console.log(this.$i18n.locale);
        //console.log(this.$t('View'));
    },
    methods: {
        ...mapActions(["GetBankInfo"]),
        ...mapActions(["UploadFile"]),    
        ...mapActions(["UploadFileAndDeleteOldFile"]),  
        ...mapActions(["DeleteOldFile"]),  
        ...mapActions(["GetInterestType"]),
        ...mapActions(["CalculateLoanInterest"]),        
        ...mapActions(["RequestLoan"]),    
        ...mapActions(["GetRequestLoan"]),            
        ...mapActions(["GetRejectLoan"]),
        ...mapActions(["GetApproveLoan"]),
        ...mapActions(["GetLoanPaymentByLoanId"]),        
        ...mapActions(["GetShareLoanByLoanId"]), 
        ...mapActions(["ApproveLoanById"]),
        ...mapActions(["RejectLoanById"]),
        ...mapActions(["GetAllProvince"]),
        ...mapActions(["GetAllDistrict"]),
        ...mapActions(["GetAllSubDistrict"]),
        ...mapActions(["GetAllAdminActive"]),
        ...mapActions(["GetPagePermission"]), 
        ...mapActions(["GetActiveProductSetting"]), 
        ...mapActions(["GetMemberEmail"]), 
        
        formatDateAssigned(value) {
            let formattedDate = new Date(value);
            formattedDate = new Date(formattedDate.getTime() - 3600000); // 60 * 60 * 1000 * 1
            return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2) + ' ' + formattedDate.toLocaleTimeString('th-TH', { hour12: false });
        },
        formatDateAssigned2(value) {
            let formattedDate = new Date(value);
            formattedDate = new Date(formattedDate.getTime() - 3600000); // 60 * 60 * 1000 * 1
            return formattedDate.getFullYear() + '-' + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (formattedDate.getDate())).slice(-2);
        },
        close() {
            this.$emit('close-edit-form');
        },
        clearForm() {
            console.log("Clear Form");
        },
        changeSelectedProduct(id)
        {
            this.selectedProductId= id;
        },
        loanTypeChange()
        {
            const item = this.interestTypeData.find(x=> x.id == this.interestTypeSelected);            
            if (item) 
            {
                this.period_name=this.$t(item.period_name);
                this.period_unit=this.$t(item.period_unit);
                this.collateral_name=this.$t(item.collateral_name);
                this.period_number=item.period_number;
            }
            else
            {
                this.period_name="";
                this.period_unit="";
                this.collateral_name="";
                this.period_number=0.0;
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
        async getBankInfo() {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const User = new FormData();

            User.append("userid", userData.username);
            User.append("token", userData.token);

            const response = await this.GetBankInfo(User);
            if (response.data.status == 'success') {
                const bankinfo = response.data.data;
                let tmpArray = [];
                bankinfo.forEach(element => {
                    tmpArray.push({
                        value: element.bank_id,
                        text: element.bank_name
                    });
                });
                this.bankOptions = tmpArray;
                this.bankSelected = 1;
            } else {

            }
        },
        async getInterestType() {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const User = new FormData();

            User.append("userid", userData.username);
            User.append("token", userData.token);

            const response = await this.GetInterestType(User);
            if (response.data.status == 'success') {
                const interestInfo = response.data.data;                
                let tmpArray = [];
                interestInfo.forEach(element => {
                    tmpArray.push({
                        value: element.id,
                        text: element.interest_name
                    });
                });

                this.interestTypeData = interestInfo;
                this.interestTypeOptions = tmpArray;
                this.interestTypeSelected = tmpArray[0].value;
                this.loanTypeChange();
            } else {

            }
        },
        async getAllProvince() {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const User = new FormData();

            User.append("userid", userData.username);
            User.append("token", userData.token);

            const response = await this.GetAllProvince(User);
            if (response.data.status == 'success') {
                const provinceInfo = response.data.data;                
                let tmpArray = [];
                provinceInfo.forEach(element => {
                    tmpArray.push({
                        value: element.id,
                        text: element.name_th
                    });
                });

                this.provinceData = provinceInfo;
                this.provinceOptions = tmpArray;
                this.provinceSelected = tmpArray[0].value;

            } else {

            }
        },
        async getAllDistrict() {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const User = new FormData();

            User.append("userid", userData.username);
            User.append("token", userData.token);

            const response = await this.GetAllDistrict(User);
            if (response.data.status == 'success') {
                const districtInfo = response.data.data;                
                let tmpArray = [];
                districtInfo.forEach(element => {
                    tmpArray.push({
                        value: element.id,
                        text: element.name_th
                    });
                });

                this.districtData = districtInfo;
                this.districtOptions = tmpArray;
                this.districtSelected = tmpArray[0].value;
            } else {

            }
        },
        async getAllSubDistrict() {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const User = new FormData();

            User.append("userid", userData.username);
            User.append("token", userData.token);

            const response = await this.GetAllSubDistrict(User);
            if (response.data.status == 'success') {
                const subDistrictInfo = response.data.data;                
                let tmpArray = [];
                subDistrictInfo.forEach(element => {
                    tmpArray.push({
                        value: element.id,
                        text: element.name_th
                    });
                });

                this.subDistrictData = subDistrictInfo;
                this.subDistrictOptions = tmpArray;
                this.subDistrictSelected = tmpArray[0].value;
            } else {

            }
        },
        async getAllAdminActive() {
            console.log('getAllAdminActive');    
            
            const userData = JSON.parse(localStorage.getItem('userData'));

            const formData = new FormData();
            
            formData.append("userid", userData.username);
            formData.append("token", userData.token);
            
            const response = await this.GetAllAdminActive(formData);
            if (response.data.status=='success') 
            {         
                const tmpAdminData =response.data.data;
                let tmpArray = [];
                tmpAdminData.forEach(element => {
                    tmpArray.push({
                        value: element.adminName,
                        text: element.fullName
                    });
                });

                this.shareDatas = tmpAdminData;
                this.shareOptions = tmpArray;
                this.shareSelected = tmpArray[0].value;
                
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
        provinceChange()
        {
            if (this.districtData.length>0) {
                const filterData = this.districtData.filter(x => x.province_id==this.provinceSelected);                
                let tmpArray = [];
                filterData.forEach(element => {
                    tmpArray.push({
                        value: element.id,
                        text: element.name_th
                    });
                });
                this.districtOptions = tmpArray;
            }
        },
        districtChange()
        {
            if (this.subDistrictData.length>0) {
                const filterData = this.subDistrictData.filter(x => x.district_id==this.districtSelected);
                let tmpArray = [];
                filterData.forEach(element => {
                    tmpArray.push({
                        value: element.id,
                        text: element.name_th
                    });
                });
                this.subDistrictOptions = tmpArray;
            }
        },
        subDistrictChange()
        {
        },
        async getRequestLoan()
        {
            console.log("getRequestLoan");

            const userData = JSON.parse(localStorage.getItem('userData'));
            const form = new FormData();

            form.append("userid", userData.username);
            form.append("token", userData.token);

            form.append("member_id", this.pRowData.id);

            const response = await this.GetRequestLoan(form);
            if (response.data.status == "success") {                
                this.requestLoan = response.data.data;
            } else {
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
        async getRejectLoan()
        {
            console.log("getRejectLoan");

            const userData = JSON.parse(localStorage.getItem('userData'));
            const form = new FormData();

            form.append("userid", userData.username);
            form.append("token", userData.token);

            form.append("member_id", this.pRowData.id);

            const response = await this.GetRejectLoan(form);
            if (response.data.status == "success") {                
                this.rejectLoan = response.data.data;
            } else {
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
        async getApproveLoan()
        {
            console.log("getApproveLoan");

            const userData = JSON.parse(localStorage.getItem('userData'));
            const form = new FormData();

            form.append("userid", userData.username);
            form.append("token", userData.token);

            form.append("member_id", this.pRowData.id);

            const response = await this.GetApproveLoan(form);
            if (response.data.status == "success") {                
                this.approveLoan = response.data.data;
            } else {
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
        async getLoanPaymentByLoanId()
        {
            console.log("GetLoanPaymentByLoanId");

            const userData = JSON.parse(localStorage.getItem('userData'));
            const form = new FormData();

            form.append("userid", userData.username);
            form.append("token", userData.token);

            form.append("loanId", this.inspectApproveData.id);

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

            form.append("loanId", this.inspectApproveData.id);

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
        async getProductList() {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const User = new FormData();

            User.append("userid", userData.username);
            User.append("token", userData.token);
            User.append("page_name", this.$route.name);

            const response = await this.GetActiveProductSetting(User);
            if (response.data.status == 'success') {                
                this.productList = response.data.data; 
            } else {

            }
        },
        async getMemberEmail() {
            console.log("getMemberEmail")
            const userData = JSON.parse(localStorage.getItem('userData'));
            const User = new FormData();

            User.append("userid", userData.username);
            User.append("token", userData.token);

            User.append("selected_id", this.pRowData.id);            
            User.append("page_name", this.$route.name);

            const response = await this.GetMemberEmail(User);
            if (response.data.status == 'success') {                       
                this.emailList = response.data.data; 
                let tmpArray = [];                
                this.emailList.forEach(element => {
                        tmpArray.push({
                            value: element.email,
                            text: element.email
                        });
                    });             
                this.optionSubScribeEmail = tmpArray;
                this.selectedSubScribeEmail = tmpArray[0].value;

            } else {

            }
        },
        async addMemberEmail()
        {
            console.log('addMemberEmail');
            
            const userData = JSON.parse(localStorage.getItem('userData'));
            
            var headers = {
                userid: userData.username,
                token: userData.token,
            }

            var body = {        
                selected_userid: this.pRowData.id,
                email : this.inputEmail,
            }

            let response;
            await axios.post("api/member/addMemberEmail",body,
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
        
            if (response.data.status == 'success') {
                this.getMemberEmail();
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
        async updateMember() {
            //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

            console.log("updateMember");

            const userData = JSON.parse(localStorage.getItem('userData'));
            
            var headers = {
                userid: userData.username,
                token: userData.token,
            }

            var body = this.pRowData;
            body.bank_acc_no = body.mobile_no;
            body.bank_id = this.bankSelected?this.bankSelected:1;
            body.bank_name = this.bankOptions.find(element => element.value == this.bankSelected).text;

            body.province_id = this.provinceSelected?this.provinceSelected:1;
            body.district_id = this.districtSelected?this.districtSelected:1;
            body.subdistrict_id = this.subDistrictSelected?this.subDistrictSelected:1;

            body.zipcode = this.pRowData.zipcode??'';
            
            // console.log(body);

            let response;
            await axios.post("api/member/updatememberbyid", body, {
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

                // this.$emit('refetch-data');
                // this.close();

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
                
            }

        },        
        async changePassword() {
            //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

            console.log("changePassword");

            const userData = JSON.parse(localStorage.getItem('userData'));
            
            var headers = {
                userid: userData.username,
                token: userData.token,
            }

            var body = this.pRowData;
            body.username = this.pRowData.id;
            body.newpassword = this.newPassword;
            body.oldpassword = this.pRowData.password;

            if (body.newpassword==body.oldpassword) {
                
                return;
            }
            
            // console.log(body);

            let response;
            await axios.post("api/member/changePasswordMemberByID", body, {
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
                        text: `Change Password Succesful.`,
                    },
                    autoHideDelay: 3000,
                });

                this.$emit('refetch-data');
                this.close();

            } else {
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Update`,
                        icon: 'TrashIcon',
                        variant: 'danger',
                        text: `Change Password UnSuccesful ${response.data.message}`,
                    },
                    autoHideDelay: 3000,
                });
                
                
            }

        },
        async calculateLoanInterest() {

            const item = this.interestTypeData.find(x=> x.id == this.interestTypeSelected);
            if (!item) {
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Calculate Loan Interest`,
                        icon: 'TrashIcon',
                        variant: 'danger',
                        text: this.$t(`Not found loan type`),
                    },
                    autoHideDelay: 3000,
                });
                return;
            }

            if (parseFloat(this.loan_amount)<1) 
            {
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Calculate Loan Interest`,
                        icon: 'TrashIcon',
                        variant: 'danger',
                        text: this.$t(`Loan amount must more than 1`),
                    },
                    autoHideDelay: 3000,
                });
                return;
            }

            if (parseFloat(this.interest)<0) 
            {
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Calculate Loan Interest`,
                        icon: 'TrashIcon',
                        variant: 'danger',
                        text: this.$t(`Interest must more than or equal 0`),
                    },
                    autoHideDelay: 3000,
                });
                return;
            }

            if (parseInt(this.period_number)<1) 
            {
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Calculate Loan Interest`,
                        icon: 'TrashIcon',
                        variant: 'danger',
                        text: this.$t(`Calculate every xx must more than 0`),
                    },
                    autoHideDelay: 3000,
                });
                return;
            }
            

            let loan_longtime_number = parseFloat(this.period_number);
            try {
                loan_longtime_number = Math.ceil(parseFloat(this.loan_longtime_number)/parseFloat(this.period_number)) * parseFloat(this.period_number);
                if (loan_longtime_number==NaN) {
                    loan_longtime_number = parseFloat(this.period_number);
                }  
                this.loan_longtime_number = loan_longtime_number;

            } catch (error) {
                this.loan_longtime_number = loan_longtime_number;
            }
            

            if (parseInt(this.loan_longtime_number)<=0) 
            {
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Calculate Loan Interest`,
                        icon: 'TrashIcon',
                        variant: 'danger',
                        text: this.$t(`Loan time must more than 0`),
                    },
                    autoHideDelay: 3000,
                });
                return;
            }

            
            
            const userData = JSON.parse(localStorage.getItem('userData'));
            const form = new FormData();

            form.append("userid", userData.username);
            form.append("token", userData.token);

            const item3 = this.interestPerOptions.find(x=> x.value == this.interestPerSelected);
            form.append("loan_amount", parseFloat(this.loan_amount));
            // if (loan_longtime_number <= parseFloat(this.interestPerSelected))
            // {
            //     form.append("interest", parseFloat(this.interest)/parseFloat(loan_longtime_number));
            // }
            // else
            // {
            //     form.append("interest", parseFloat(this.interest)/parseFloat(this.interestPerSelected));
            // }
            form.append("interest", parseFloat(this.interest)/parseFloat(this.interestPerSelected));            
            form.append("interestper" , item3.text);
            form.append("interestpernumber" , this.interestPerSelected);
            form.append("loan_longtime_number", loan_longtime_number);
            form.append("effective_rate", this.effective_rate);
            form.append("period_id", item.period_id);
            form.append("cal_every_number", parseInt(this.period_number));
            form.append("loan_start_at", this.loan_start_at);

            const response = await this.CalculateLoanInterest(form);
            if (response.data.status == 'success') {
                const interestInfo = response.data.data; 
                this.calculated_interest = true;
                this.rows = interestInfo;
            } else {
                this.rows = [];
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Calculate Loan Interest`,
                        icon: 'TrashIcon',
                        variant: 'danger',
                        text: `${response.data.message}`,
                    },
                    autoHideDelay: 3000,
                });
            }
        },        
        clearCalculate()
        {
            this.calculated_interest = false;
        },
        async requestApprove()
        {
            console.log("requestApprove");

            const userData = JSON.parse(localStorage.getItem('userData'));
            const form = new FormData();

            const item = this.interestTypeData.find(x=> x.id == this.interestTypeSelected);

            form.append("userid", userData.username);
            form.append("token", userData.token);

            form.append("member_id", this.pRowData.id);
            form.append("owner_admin_id", userData.username);
            form.append("interest_name", item.interest_name);
            
            form.append("loan_amount", parseFloat(this.loan_amount));
            
            const item3 = this.interestPerOptions.find(x=> x.value == this.interestPerSelected);                 
            // if (loan_longtime_number <= parseFloat(this.interestPerSelected))
            // {
            //     form.append("interest", parseFloat(this.interest)/parseFloat(loan_longtime_number));
            // }
            // else
            // {
            //     form.append("interest", parseFloat(this.interest)/parseFloat(this.interestPerSelected));
            // }
            form.append("interest", parseFloat(this.interest)/parseFloat(this.interestPerSelected));
            form.append("interestper", item3.text);
            form.append("interestpernumber" , this.interestPerSelected);
            
            form.append("loan_longtime_number", parseInt(this.loan_longtime_number));
            form.append("effective_rate", this.effective_rate);
            form.append("period_id", item.period_id);
            form.append("cal_every_number", parseInt(this.period_number));
            form.append("loan_start_at", this.loan_start_at);
            form.append("collateral_type_id", item.collateral_type_id);

            form.append("collateral_img1", this.collateral_img1);
            form.append("collateral_img2", this.collateral_img2);
            form.append("collateral_img3", this.collateral_img3);
            form.append("collateral_img4", this.collateral_img4);
                                                
            const response = await this.RequestLoan(form);
            if (response.data.status == "success") {
                //

                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Request Loan`,
                        icon: 'EditIcon',
                        variant: 'success',
                        text: this.$t(`Request Succesful`),
                    },
                    autoHideDelay: 3000,
                });
                
                this.clearCalculate();
                this.getRequestLoan();
                this.getRejectLoan();
                this.tabIndex = 4;

            } else {
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Request Loan`,
                        icon: 'TrashIcon',
                        variant: 'danger',
                        text: this.$t('Request UnSuccesful') +` ${response.data.message}`,
                    },
                    autoHideDelay: 3000,
                });
                
            }
        },
        resolveStatusVariant(inStatus) {            
            if (inStatus === 1) return 'success'
            if (inStatus === 0) return 'warning'
            return ''
        },
        resolveStatusText(inStatus) {            
            if (inStatus === 1) return 'Active'
            if (inStatus === 0) return 'InActive'
            return ''
        },
        uploadFile(tmpName) {                                    
            this.tmpFileUpload[tmpName] = this.$refs[tmpName].files[0];            
            //console.log(this.tmpFileUpload[tmpName]); 
        },
        async submitFile(tmpName) {                       
            console.log('submitFile');
            
            const userData = JSON.parse(localStorage.getItem('userData'));
            const formData = new FormData();

            formData.append("userid", userData.username);
            formData.append("token", userData.token);

            formData.append("file", this.tmpFileUpload[tmpName]);
            formData.append("tofilename", tmpName);
            
            const response = await this.UploadFile(formData);
            if (response.data.status == 'success') 
            {                 
                this.pRowData[tmpName] = response.data.url;
                if (tmpName=="profileImg") {
                    this.pRowData['img_url'] = response.data.url;
                }
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
        uploadFile2(tmpName) {                                    
            this.tmpFileUpload2[tmpName] = this.$refs[tmpName].files[0];            
            //console.log(this.tmpFileUpload2[tmpName]); 
        },
        async submitFile2(tmpName) {                       
            console.log('submitFile2');

            if (this.tmpFileUpload2[tmpName]==null) 
            {
                this.$toast(
                {
                    component: ToastificationContent,
                    props: {
                    title: 'No file for upload.',
                    icon: 'EditIcon',
                    variant: 'error',
                    },
                });
                return;    
            }
            
            const userData = JSON.parse(localStorage.getItem('userData'));
            const formData = new FormData();

            formData.append("userid", userData.username);
            formData.append("token", userData.token);

            formData.append("file", this.tmpFileUpload2[tmpName]);
            formData.append("tofilename", tmpName);
            formData.append("oldFilePath", this[tmpName]);
            
            const response = await this.UploadFileAndDeleteOldFile(formData);
            if (response.data.status == 'success') 
            {                 
                this[tmpName] = response.data.url;
                this.tmpFileUpload2[tmpName] = null;
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
        async deleteFile(tmpName)
        {
            console.log('deleteFile');
            
            const userData = JSON.parse(localStorage.getItem('userData'));
            const formData = new FormData();

            formData.append("userid", userData.username);
            formData.append("token", userData.token);

            formData.append("oldFilePath", this[tmpName]);            
            
            const response = await this.DeleteOldFile(formData);
            if (response.data.status == 'success') 
            {                 
                this[tmpName] = "";
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
        async confirmRequest()
        {
            console.log('confirmRequest');
            this.showModalRequest=true;
            
        },
        async confirmApprove(loanId)
        {
            console.log('confirmApprove');
            if(this.selectedLoanId!=loanId)
            {
                this.selectedLoanId = loanId;
                this.sharePersonList=[];
                this.sharePercent = 100;
                this.rejectNoteInput = "";

                const tmpDataListId = this.sharePersonList.map(x => x.id);

                const tmpAdminData = this.shareDatas;
                let tmpArray = [];
                    tmpAdminData.forEach(element => {
                        if (!tmpDataListId.includes(element.adminName)) {
                            
                            tmpArray.push({
                                value: element.adminName,
                                text: element.fullName
                            });

                        }                    
                    });             
                this.shareOptions = tmpArray;
                this.shareSelected = tmpArray[0].value;
            }

            this.showModalApprove=true;
            
        },
        async confirmDeleteEmail(emailId)
        {
            console.log('confirmDeleteEmail');
            
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
                this.deleteEmail(emailId);

                }

            })
            .catch(err => {

            })
            
            
        },
        async deleteEmail(emailId)
        {
            const userData = JSON.parse(localStorage.getItem('userData'));
            
            var headers = {
                userid: userData.username,
                token: userData.token,
            }

            var body = {        
                listId: [emailId]
            }

            let response;
            await axios.post("api/member/deleteMemberEmail",body,
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
        
            if (response.data.status == 'success') {
                this.getMemberEmail();
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
        resetModalApprove()
        {
            this.approveNoteInput = "";
        },
        async handleOkRequest()
        {   
            const note = this.requestNoteInput;
            console.log("handleOkRequest");

            const userData = JSON.parse(localStorage.getItem('userData'));
            const form = new FormData();

            form.append("userid", userData.username);
            form.append("token", userData.token);

            form.append("admin_id", userData.username);
            form.append("request_note", note?note:'');
            form.append("product_id", this.selectedProductId);


        },
        async handleOkApprove()
        {
            
            const note = this.approveNoteInput;
            console.log("handleOkApprove");

            const sumPercent = this.sharePersonList.reduce((accumulator, currentValue) => accumulator + currentValue.percent, 0);
            if(sumPercent!=100)
            {
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Approve Loan`,
                        icon: 'EditIcon',
                        variant: 'danger',
                        text: this.$t(`Sum of percent must be 100`),
                    },
                    autoHideDelay: 3000,
                });

                this.showInspectApprove = false;
                return;
            }
            else
            {
                const userData = JSON.parse(localStorage.getItem('userData'));
                const form = new FormData();

                form.append("userid", userData.username);
                form.append("token", userData.token);

                form.append("id", this.selectedLoanId);
                form.append("admin_id", userData.username);
                form.append("approve_note", note?note:'');

                form.append("sharePersonList", JSON.stringify(this.sharePersonList));
                                                                
                const response = await this.ApproveLoanById(form);
                if (response.data.status == "success") {
                    //

                    this.$toast({
                        component: ToastificationContent,
                        position: 'top-right',
                        props: {
                            title: `Approve Loan`,
                            icon: 'EditIcon',
                            variant: 'success',
                            text: this.$t(`Approve Succesful`),
                        },
                        autoHideDelay: 3000,
                    });
                                    
                    this.getRequestLoan();
                    this.getRejectLoan();
                    this.getApproveLoan();
                    this.tabIndex = 6;

                    this.showInspectApprove = false;

                } else {
                    this.$toast({
                        component: ToastificationContent,
                        position: 'top-right',
                        props: {
                            title: `Approve Loan`,
                            icon: 'TrashIcon',
                            variant: 'danger',
                            text: this.$t('Approve UnSuccesful') +` ${response.data.message}`,
                        },
                        autoHideDelay: 3000,
                    });
                    this.showInspectApprove = false;
                }
            }

            
        },
        async confirmReject(loanId)
        {
            this.selectedLoanId = loanId;
            console.log('confirmReject');
            this.showModalReject=true;
        },
        resetModalReject()
        {
            
        },
        resetModalPaymentNote()
        {
            
        },
        async handleOkReject()
        {
            const note = this.rejectNoteInput;
            console.log("requestApprove");

            const userData = JSON.parse(localStorage.getItem('userData'));
            const form = new FormData();

            form.append("userid", userData.username);
            form.append("token", userData.token);

            form.append("id", this.selectedLoanId);
            form.append("admin_id", userData.username);
            form.append("reject_note", note?note:'');
                                                            
            const response = await this.RejectLoanById(form);
            if (response.data.status == "success") {
                //

                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Reject Loan`,
                        icon: 'EditIcon',
                        variant: 'success',
                        text: this.$t(`Reject Succesful`),
                    },
                    autoHideDelay: 3000,
                });
                
                
                this.getRequestLoan();
                this.getRejectLoan();
                this.getApproveLoan();
                this.tabIndex = 5;

            } else {
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Reject Loan`,
                        icon: 'TrashIcon',
                        variant: 'danger',
                        text: this.$t('Reject UnSuccesful') +` ${response.data.message}`,
                    },
                    autoHideDelay: 3000,
                });
                
            }
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
        async inspectApprove(loanData)
        {
            this.inspectCanAction = true;

            this.showInspectApprove = true;
            this.inspectApproveData = loanData;

            this.showLoanPayment = false;

            const item = this.interestTypeData.find(x=> x.interest_name == loanData.interest_name);            
            if (item) 
            {
                this.period_name2=this.$t(item.period_name);
                this.period_unit2=this.$t(item.period_unit);
                this.collateral_name2=this.$t(item.collateral_name);
                this.period_number2=item.period_number;
            }
            else
            {
                this.period_name2="";
                this.period_unit2="";
                this.collateral_name2="";
                this.period_number2=0.0;
            }
                    
            this.loan_amount2=loanData.loan_amount;
            this.interest2=loanData.interest;
            this.interestper2=loanData.interestper;
            this.loan_longtime_number2=loanData.loan_longtime_number;
            this.effective_rate2=loanData.effective_rate;
            this.loan_start_at2= loanData.loan_start_at;

            this.calculateLoanInterest2();
        },
        async inspectApprovedData(loanData)
        {
            this.inspectCanAction = false;

            this.showInspectApprove = true;
            this.inspectApproveData = loanData;

            this.showLoanPayment = true;

            const item = this.interestTypeData.find(x=> x.interest_name == loanData.interest_name);            
            if (item) 
            {
                this.period_name2=this.$t(item.period_name);
                this.period_unit2=this.$t(item.period_unit);
                this.collateral_name2=this.$t(item.collateral_name);
                this.period_number2=item.period_number;
            }
            else
            {
                this.period_name2="";
                this.period_unit2="";
                this.collateral_name2="";
                this.period_number2=0.0;
            }
                    
            this.loan_amount2=loanData.loan_amount;
            this.interest2=loanData.interest;
            this.interestper2=loanData.interestper;
            this.loan_longtime_number2=loanData.loan_longtime_number;
            this.effective_rate2=loanData.effective_rate;
            this.loan_start_at2= loanData.loan_start_at;

            this.getLoanPaymentByLoanId();
            this.getShareLoanByLoanId();
            
        },
        async inspectData(loanData)
        {
            this.inspectCanAction = false;

            this.showInspectApprove = true;
            this.inspectApproveData = loanData;

            this.showLoanPayment = false;

            const item = this.interestTypeData.find(x=> x.interest_name == loanData.interest_name);            
            if (item) 
            {
                this.period_name2=this.$t(item.period_name);
                this.period_unit2=this.$t(item.period_unit);
                this.collateral_name2=this.$t(item.collateral_name);
                this.period_number2=item.period_number;
            }
            else
            {
                this.period_name2="";
                this.period_unit2="";
                this.collateral_name2="";
                this.period_number2=0.0;
            }
                    
            this.loan_amount2=loanData.loan_amount;
            this.interest2=loanData.interest;
            this.interestper2=loanData.interestper;
            this.loan_longtime_number2=loanData.loan_longtime_number;
            this.effective_rate2=loanData.effective_rate;
            this.loan_start_at2= loanData.loan_start_at;

            this.calculateLoanInterest2();
        },
       
        closeInspectionApprove()
        {
            this.showInspectApprove = false;
        },
        async calculateLoanInterest2() {

            const item = this.interestTypeData.find(x=> x.interest_name == this.inspectApproveData.interest_name);  
            if (!item) {
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Calculate Loan Interest`,
                        icon: 'TrashIcon',
                        variant: 'danger',
                        text: this.$t(`Not found loan type`),
                    },
                    autoHideDelay: 3000,
                });
                return;
            }

            if (parseFloat(this.loan_amount2)<1) 
            {
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Calculate Loan Interest`,
                        icon: 'TrashIcon',
                        variant: 'danger',
                        text: this.$t(`Loan amount must more than 1`),
                    },
                    autoHideDelay: 3000,
                });
                return;
            }

            if (parseFloat(this.interest2)<0) 
            {
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Calculate Loan Interest`,
                        icon: 'TrashIcon',
                        variant: 'danger',
                        text: this.$t(`Interest must more than or equal 0`),
                    },
                    autoHideDelay: 3000,
                });
                return;
            }

            if (parseInt(this.period_number2)<0) 
            {
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Calculate Loan Interest`,
                        icon: 'TrashIcon',
                        variant: 'danger',
                        text: this.$t(`Calculate every xx must more than 0`),
                    },
                    autoHideDelay: 3000,
                });
                return;
            }
                const userData = JSON.parse(localStorage.getItem('userData'));
                const form = new FormData();

                form.append("userid", userData.username);
                form.append("token", userData.token);

                form.append("loan_amount", parseFloat(this.loan_amount2));

                const item3 = this.interestPerOptions.find(x=> x.text == this.interestper2);                    
                form.append("interest", parseFloat(this.interest2)/parseFloat(item3.value));

                form.append("loan_longtime_number", parseInt(this.loan_longtime_number2));
                form.append("effective_rate", this.effective_rate2);
                form.append("period_id", item.period_id);
                form.append("cal_every_number", parseInt(this.period_number2));
                form.append("loan_start_at", this.loan_start_at2);

                const response = await this.CalculateLoanInterest(form);
                if (response.data.status == 'success') {
                    const interestInfo = response.data.data;                 
                    this.rowsCal = interestInfo;
                } else {
                    this.rowsCal = [];
                    this.$toast({
                        component: ToastificationContent,
                        position: 'top-right',
                        props: {
                            title: `Calculate Loan Interest`,
                            icon: 'TrashIcon',
                            variant: 'danger',
                            text: `${response.data.message}`,
                        },
                        autoHideDelay: 3000,
                    });
                }
        },
        tabChange()
        {
            this.showInspectApprove = false;
        },
        paymentNoteChange(pageValue)
        {
            const tmpPaymentNoteData = this.paymentNoteData;
            
            this.paymentRefImg = tmpPaymentNoteData['ref_img'+pageValue]!=''?tmpPaymentNoteData['ref_img'+pageValue]:'/images/noimage.jpg';
            this.paymentRefNote = tmpPaymentNoteData['note'+pageValue]!=''?tmpPaymentNoteData['note'+pageValue]:'';
            this.paymentNoteAt = tmpPaymentNoteData['note'+pageValue+'_at']!=null?this.formatDateAssigned(tmpPaymentNoteData['note'+pageValue+'_at']):'';
            this.paymentNoteBy = tmpPaymentNoteData['note'+pageValue+'_by']!=''?tmpPaymentNoteData['note'+pageValue+'_by']:'';
        },
        addSubscribeRequest()
        {

        },
        addSharePerson()
        {
            const sumPercent = this.sharePersonList.reduce((accumulator, currentValue) => accumulator + currentValue.percent, 0);

            const sharePercent = parseFloat(this.sharePercent);
            if (sharePercent<=0) {
                this.$toast({
                        component: ToastificationContent,
                        position: 'top-right',
                        props: {
                            title: `Warning`,
                            icon: 'TrashIcon',
                            variant: 'danger',
                            text: this.$t(`Share percent must more than 0`),
                        },
                        autoHideDelay: 3000,
                    });
                return;
            }

            console.log(sumPercent+sharePercent);

            if (sumPercent+sharePercent>100) {
                this.$toast({
                        component: ToastificationContent,
                        position: 'top-right',
                        props: {
                            title: `Warning`,
                            icon: 'TrashIcon',
                            variant: 'danger',
                            text: this.$t(`Sum of percent not more than 100`),
                        },
                        autoHideDelay: 3000,
                    });
                return;
            }

            const tmpData = 
            {
                id : this.shareSelected,
                fullName : this.shareOptions.find(element => element.value == this.shareSelected).text,
                percent : parseFloat(this.sharePercent),
            };

            this.sharePersonList.push(tmpData);

            const tmpDataListId = this.sharePersonList.map(x => x.id);
            
            let tmpArray = this.shareOptions;
            tmpArray = tmpArray.filter(x=> !tmpDataListId.includes(x.value));            

            this.shareOptions = tmpArray;
            this.shareSelected = tmpArray[0].value;

            const remainPercent = 100 - sumPercent - sharePercent;
            this.sharePercent = remainPercent.toString();

        },
        deleteSharePerson(person_id)
        {
            const newData = this.sharePersonList.filter(x=> x.id!=person_id);
            this.sharePersonList = newData;

            const tmpDataListId = this.sharePersonList.map(x => x.id);

            const tmpAdminData = this.shareDatas;
                let tmpArray = [];
                tmpAdminData.forEach(element => {
                    if (!tmpDataListId.includes(element.adminName)) {
                        
                        tmpArray.push({
                            value: element.adminName,
                            text: element.fullName
                        });

                    }                    
            });

            this.shareOptions = tmpArray;
            this.shareSelected = tmpArray[0].value;

            const sumPercent = this.sharePersonList.reduce((accumulator, currentValue) => accumulator + currentValue.percent, 0);
            const remainPercent = 100 - sumPercent;
            this.sharePercent = remainPercent.toString();
        },
    },
}
</script>

<style lang="scss">
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

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  z-index: 9999; /* Adjust z-index to bring it front of other elements */
}

.dialog-content {
  /* Add your styles for dialog content */
  min-width: 400px;
  min-height: 600px;
}

.dialog2 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  z-index: 9999; /* Adjust z-index to bring it front of other elements */
}

.dialog-content2 {
  /* Add your styles for dialog content */
  min-width: 380px;
  min-height: 300px;
}

.dialog3 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  z-index: 9999; /* Adjust z-index to bring it front of other elements */
}

.dialog-content3 {
  /* Add your styles for dialog content */
  min-width: 400px;
  min-height: 500px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.content-container {
  max-height: 300px; /* Set your desired max height */
  overflow-y: auto; /* Add vertical scrollbar */
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); /* Adjust as needed */
  gap: 10px; /* Adjust gap between grid items */
}

.grid-item {
  /* Add any additional styling for grid items */
  color:grey;
}

</style>

