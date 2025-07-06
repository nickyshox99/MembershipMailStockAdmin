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
                            <feather-icon icon="MailIcon" size="16" class="mr-0 mr-sm-50" />
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
                            <feather-icon icon="BookIcon" size="16" class="mr-0 mr-sm-50" />
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
                                        <b-button @click="close" v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="outline-secondary">
                                            <feather-icon icon="DeleteIcon" />
                                            {{t('Close')}}
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
                                        <vue-good-table ref="my-table-order-history" :columns="columnsOrderHistory" :rows="rowsOrderHistory" :rtl="directionOrderHistory" :line-numbers="true"
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
                                                perPage: pageLengthOrderHistory
                                            }" theme="polar-bear">                                        
                                                <template slot="table-row" slot-scope="props">

                                                    <span v-if="props.column.field === 'subscription_img2'">       
                                                        <b-img :src="props.row.subscription_img" fluid thumbnail style="height: 50px;" />                                                        
                                                        <div style="font-size: 14px;color:gray">{{props.row.product_name}}</div>
                                                    </span>

                                                    <span v-if="props.column.field === 'create_date2'">              
                                                        {{ (props.row.create_date != null)?formatDateAssigned2(props.row.create_date):"" }}
                                                    </span>

                                                    <span v-if="props.column.field === 'start_date2'">              
                                                        {{(props.row.start_date != null)?formatDateAssigned2(props.row.start_date):"" }}
                                                    </span>

                                                    <span v-if="props.column.field === 'end_date2'">              
                                                        {{(props.row.end_date != null)?formatDateAssigned2(props.row.end_date):"" }}
                                                    </span>

                                                    <span v-if="props.column.field === 'remain'">              
                                                            <b-badge
                                                                v-if="props.row.diffDay<=0"
                                                                pill
                                                                :variant="`light-warning`"
                                                                class="text-capitalize"
                                                            >                                                                 
                                                                {{ t('Expired') }}
                                                            </b-badge> 
                                                            <b-badge
                                                                v-if="props.row.diffDay>0"
                                                                pill
                                                                :variant="`light-success`"
                                                                class="text-capitalize"
                                                            >                                                                 
                                                                {{ t('Remaining') }} {{props.row.diffDay}} {{t('Day')}}
                                                            </b-badge> 
                                                    </span>

                                                    <span v-if="props.column.field === 'approved'">              
                                                            <b-badge
                                                                v-if="props.row.canceled==0 && props.row.approve_by != null &&props.row.approve_by !=''"
                                                                pill
                                                                :variant="`light-success`"
                                                                class="text-capitalize"
                                                            >                                                                 
                                                                {{ t('Approved') }}
                                                                {{ ((props.row.approve_date != null) ? formatDateAssigned2(props.row.approve_date) : '') }}
                                                            </b-badge> 
                                                            <b-badge
                                                                v-if="props.row.canceled==0 && (props.row.approve_by =='' || props.row.approve_by == null)"
                                                                pill
                                                                :variant="`light-info`"
                                                                class="text-capitalize"
                                                            >                                                                 
                                                                <feather-icon icon="ClockIcon" size="16" class="mr-0 mr-sm-50" />      
                                                                รอพิจารณาอนุมัติ                                                     
                                                            </b-badge>  
                                                            <b-badge
                                                                v-if="props.row.canceled==1"
                                                                pill
                                                                :variant="`light-danger`"
                                                                class="text-capitalize"
                                                            >   
                                                                {{ t('Canceled') }}
                                                            </b-badge> 
                                                    </span>

                                                    <span>
                                                    {{ props.formattedRow[props.column.field] }}
                                                    </span>

                                                    <span v-if="props.column.field === 'action'">  
                                                        <b-badge v-if="(props.row.approve_by!=''&&props.row.approve_by!=null)&&props.row.canceled!=1" style="cursor: pointer; margin-right:2px" variant="danger" @click="inspectCancel(props.row)">
                                                            <feather-icon icon="XIcon" size="16" class="mr-0 mr-sm-50" />
                                                            <span class="d-none d-sm-inline">{{t('Cancel')}}</span>
                                                        </b-badge>  
                                                        <b-badge v-if="props.row.canceled==1" style="cursor: pointer; margin-right:2px" variant="info" @click="inspectData(props.row)">
                                                            <feather-icon icon="SearchIcon" size="16" class="mr-0 mr-sm-50" />
                                                            <span class="d-none d-sm-inline">{{t('Information')}}</span>
                                                        </b-badge>                                                
                                                        <b-badge v-if="(props.row.approve_by==''|| props.row.approve_by==null)" style="cursor: pointer; margin-right:2px" variant="success" @click="inspectApprove(props.row)">
                                                            <feather-icon icon="CheckIcon" size="16" class="mr-0 mr-sm-50" />
                                                            <span class="d-none d-sm-inline">{{t('Approve')}}</span>
                                                        </b-badge>
                                                        <b-badge v-if="(props.row.approve_by==''|| props.row.approve_by==null)" style="cursor: pointer; margin-right:2px" variant="warning" @click="inspectReject(props.row)">
                                                            <feather-icon icon="XIcon" size="16" class="mr-0 mr-sm-50" />
                                                            <span class="d-none d-sm-inline">{{t('Reject')}}</span>
                                                        </b-badge>
                                                    </span>

                                                </template>
                                                
                                                <template slot="pagination-bottom" slot-scope="props">
                                                    <div class="d-flex justify-content-between flex-wrap">
                                                    <div class="d-flex align-items-center mb-0 mt-1">
                                                        <span class="text-nowrap ">
                                                        {{t("Showing") +" 1 " + t("to") }}
                                                        </span>
                                                        <b-form-select v-model="pageLengthOrderHistory" :options="['3', '5', '10', '20', '50', '100']" class="mx-1"
                                                        @input="(value) => props.perPageChanged({ currentPerPage: value })" />
                                                        <span class="text-nowrap"> {{t('of')}} {{ props.total }} {{t('entries')}} </span>
                                                    </div>
                                                    <div>
                                                        <b-pagination :value="1" :total-rows="props.total" :per-page="pageLengthOrderHistory" first-number last-number
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
                            </b-form>

                        </div>
                    </b-tab> 

                    <b-tab>
                        <template #title>
                            <feather-icon icon="UsersIcon" size="16" class="mr-0 mr-sm-50" />
                            <span class="d-none d-sm-inline">{{t('Group')}}</span>
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
                                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="success" class="mr-1" v-if="isModeEdit" @click="confirmJoinGroup" >
                                        <feather-icon icon="UsersIcon" />
                                        {{t('Join Group')}}
                                        </b-button>
                                        <b-button @click="close" v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="outline-secondary">
                                            <feather-icon icon="DeleteIcon" />
                                            {{t('Close')}}
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
                                        <vue-good-table ref="my-table-group-of-member" :columns="columnsGroupOfMember" :rows="rowsGroupOfMember" :rtl="directionGroupOfMember" :line-numbers="true"
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
                                                perPage: pageLengthGroupOfMember
                                            }" theme="polar-bear">                                        
                                                <template slot="table-row" slot-scope="props">

                                                    <span v-if="props.column.field === 'group_name2'">       
                                                        <b-img :src="props.row.subscription_img" fluid thumbnail style="height: 50px;" />                                                        
                                                        <div style="font-size: 14px;color:gray">{{props.row.subscription_name}}</div>
                                                    </span>

                                                    <span v-if="props.column.field === 'update_date2'">              
                                                        {{formatDateAssigned2(props.row.update_at)}}
                                                    </span>

                                                    <span>
                                                    {{ props.formattedRow[props.column.field] }}
                                                    </span>

                                                    <span v-if="props.column.field === 'action'">  
                                                        <b-badge style="cursor: pointer; margin-right:2px" variant="warning" @click="confirmDeleteMemberInGroup(props.row)">
                                                            <feather-icon icon="XIcon" size="16" class="mr-0 mr-sm-50" />
                                                            <span class="d-none d-sm-inline">{{t('Delete')}}</span>
                                                        </b-badge>
                                                    </span>

                                                </template>
                                                
                                                <template slot="pagination-bottom" slot-scope="props">
                                                    <div class="d-flex justify-content-between flex-wrap">
                                                    <div class="d-flex align-items-center mb-0 mt-1">
                                                        <span class="text-nowrap ">
                                                        {{t("Showing") +" 1 " + t("to") }}
                                                        </span>
                                                        <b-form-select v-model="pageLengthGroupOfMember" :options="['3', '5', '10', '20', '50', '100']" class="mx-1"
                                                        @input="(value) => props.perPageChanged({ currentPerPage: value })" />
                                                        <span class="text-nowrap"> {{t('of')}} {{ props.total }} {{t('entries')}} </span>
                                                    </div>
                                                    <div>
                                                        <b-pagination :value="1" :total-rows="props.total" :per-page="pageLengthGroupOfMember" first-number last-number
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
                            </b-form>

                        </div>
                    </b-tab> 
                    
                </b-tabs>
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
                                <feather-icon icon="MailIcon" />
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
                    <b-form-group :label="t('Select Email')" label-for="email-selected">
                        <b-input-group class="input-group-merge">
                            <b-input-group-prepend is-text>
                                <feather-icon icon="MailIcon" />
                            </b-input-group-prepend>
                            <b-form-select v-model="selectedSubScribeEmail" :options="optionSubScribeEmail"></b-form-select>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
    
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
        directionGroupOfMember() {
        if (store.state.appConfig.isRTL) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.dirGroupOfMember = true
            return this.dirGroupOfMember
        }
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dirGroupOfMember = false
        return this.dirGroupOfMember
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

        const columnsOrderHistory =  [
            {
            label: t('Product'),
            field: 'subscription_img2',  
            width: '15%',          
            },
            {
            label: t('Email'),
            field: 'email',  
            width: '10%',          
            },
            {
            label: t('Create Date'),
            field: 'create_date2',
            width: '10%',
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
            label: t('Remain'),
            field: 'remain',
            width: '10%',
            }, 
            {
            label: t('Approve'),
            field: 'approved',
            width: '10%',
            },
           
            {
            label: t('Approve By'),
            field: 'approve_by',
            width: '10%',
            },   
            {
                label: t('Action'),
                field: 'action',                
            },             
        ];

        const columnsGroupOfMember =  [
            {
                label: t('Group Name'),
                field: 'group_name2',  
                width: '20%',          
            },
            {
                label: t('Email'),
                field: 'email',                  
            },
            {
                label: t('Latest Update'),
                field: 'update_date2',
                width: '10%',
            },  
            {
                label: t('Update By'),
                field: 'update_by',
                width: '10%',
            },   
            {
                label: t('Action'),
                field: 'action',    
                width: '10%',            
            },             
        ];

        return {
            resetForm,
            t,
            columns,
            columnsOrderHistory,
            columnsGroupOfMember,
            
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
            pageLengthOrderHistory:10,
            pageLengthGroupOfMember:10,

            dir: false,            
            dir2: false,
            dirOrderHistory:false,
            dirGroupOfMember:false,

            rows: [],
            rowsOrderHistory:[],
            rowsGroupOfMember:[],
            
            searchTerm: '',            
            searchTerm2: '',            
            searchTerm3: '',

            tmpFileUpload:[],
            tmpFileUpload2:[],

            tabIndex:0,

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
            showModalRequest:false,
            showInspectApprove:false,
            showLoanPayment:false,
            showModalReject:false,
            showModalApprove:false,
            showModalCancel:false,
            showModalJoinGroup:false,
            approveNoteInput:'',
            rejectNoteInput:'',
            requestNoteInput:'',
            loanPaymentData:[],

            showModalNote:false,
            
            productList:[],
            groupList:[],
            selectedProductId:0,
            inputEmail:'',

            emailList:[],
            selectedSubScribeGroupId:0,
            optionSubScribeGroup : [{
                value: 0,
                text: 'Select Group'
            },],

            selectedSubScribeEmail :"",
            optionSubScribeEmail : [{
                value: "",
                text: 'Select Email'
            },],

            cancelNoteInput:"",
            cancelOrderId : 0,
            approveOrderId : 0,

            memberInGroupList:[],
            pagePermission:[],
            
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
            
            this.getMemberEmail();
            this.getHistoryOrder();
            this.getGroupOfMemberByMemberId();
            
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
            this.getAllProvince(),
            this.getAllDistrict(),            
            this.getProductList(),  
            this.getActiveGroupList(),            
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
        ...mapActions(["GetAllProvince"]),
        ...mapActions(["GetAllDistrict"]),
        ...mapActions(["GetAllSubDistrict"]),
        ...mapActions(["GetAllAdminActive"]),
        ...mapActions(["GetPagePermission"]), 
        ...mapActions(["GetActiveProductSetting"]), 
        ...mapActions(["GetMemberEmail"]), 
        ...mapActions(["CreateAndApproveSubScribeOrder"]), 
        ...mapActions(["GetHistorySubScribeOrderByMemberID"]),  
        ...mapActions(["CancelSubScribeOrder"]), 
        ...mapActions(["ApproveSubScribeOrder"]), 
        ...mapActions(["GetActiveSubscriptionGroup"]), 
        ...mapActions(["GetSubscribeMemberByGroupById"]),
        ...mapActions(["AddMemberToGroup"]),
        ...mapActions(["GetGroupOfMemberByMemberId"]),
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
        async getGroupOfMemberByMemberId() {
            console.log("getGroupOfMemberByMemberId")
            const userData = JSON.parse(localStorage.getItem('userData'));
            const User = new FormData();

            User.append("userid", userData.username);
            User.append("token", userData.token);

            User.append("user_id", this.pRowData.id);            
            User.append("page_name", this.$route.name);

            const response = await this.GetGroupOfMemberByMemberId(User);
            if (response.data.status == 'success') {           
                this.rowsGroupOfMember = response.data.data;
            } else {

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
            this.showModalApprove=false;
            
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
        async confirmReject(loanId)
        {
            this.showModalReject=true;
        },
        async confirmJoinGroup()
        {
            this.showModalJoinGroup=true;
            this.groupChange();
        },
        async confirmDeleteMemberInGroup(rowData)
        {   
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
                    //const selectID = rowData.map(obj => obj.id);
                    // console.log(selectID);
                    this.deleteMemberFromGroup(rowData.id);

                    }
                })
                .catch(err => {

                })
        },
        async deleteMemberFromGroup(selectID)
        {
            const userData = JSON.parse(localStorage.getItem('userData'));
            
            var headers = {
                userid: userData.username,
                token: userData.token,
            }

            var body = {        
                listId: [selectID]
            }

            let response;
            await axios.post("api/subscriptiongroup/deleteMemberFromGroupByID",body,
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
                this.getGroupOfMemberByMemberId();
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
            
        },
        resetModalJoinGroup()
        {
            
        },
        async getHistoryOrder()
        {
            console.log("getHistoryOrder");

            const userData = JSON.parse(localStorage.getItem('userData'));
            const form = new FormData();

            form.append("userid", userData.username);
            form.append("token", userData.token);

            form.append("member_id", this.pRowData.id);

            const response = await this.GetHistorySubScribeOrderByMemberID(form);
            if (response.data.status == 'success') {           
                this.rowsOrderHistory = response.data.data;                
                for (let index = 0; index < this.rowsOrderHistory.length; index++) {
                    const element = this.rowsOrderHistory[index];
                    if (element.end_date!=null) {
                        let diffDay = new Date(element.end_date).getTime() - new Date().getTime();
                        diffDay = Math.ceil(diffDay / (1000 * 3600 * 24)); // days
                        this.rowsOrderHistory[index]['diffDay'] = diffDay;
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
        async handleOkRequest()
        {   
            const note = this.requestNoteInput;
            console.log("handleOkRequest");

            const userData = JSON.parse(localStorage.getItem('userData'));
            const form = new FormData();

            form.append("userid", userData.username);
            form.append("token", userData.token);

            form.append("admin_id", userData.username);            
            form.append("product_id", this.selectedProductId);
            form.append("email", this.selectedSubScribeEmail);
            form.append("user_id", this.pRowData.id);
            form.append("note", note?note:'');

            const response = await this.CreateAndApproveSubScribeOrder(form);
            if (response.data.status == 'success') {                       
                this.getHistoryOrder();

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
                                                            
            const response = await this.ApproveSubScribeOrder(form);
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

                this.getHistoryOrder();
                
               
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

                this.getHistoryOrder();
                
               
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

                this.getHistoryOrder();
                
               
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
        async handleOkJoinGroup()
        {
            
            console.log("handleOkJoinGroup");

            const userData = JSON.parse(localStorage.getItem('userData'));
            const form = new FormData();

            form.append("userid", userData.username);
            form.append("token", userData.token);

            form.append("admin_id", userData.username);            
            form.append("group_id", this.selectedSubScribeGroupId);
            form.append("email", this.selectedSubScribeEmail);
            form.append("user_id", this.pRowData.id);

            const response = await this.AddMemberToGroup(form);
            if (response.data.status == 'success') {                       
                this.getGroupOfMemberByMemberId();

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
        resetModalReject()
        {
            
        },
        resetModalCancel()
        {
            
        },
        resetModalNote()
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
        tabChange()
        {
            this.showInspectApprove = false;
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

