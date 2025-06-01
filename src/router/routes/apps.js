export default [
    

  //Agent
  // {
  //   path: '/apps/agentaccount/',
  //   name: 'apps-agent-account',
  //   component: () => import('@/views/apps/agent/AgentAccount.vue'),
  // },

  //Agent-Refer
  // {
  //   path: '/apps/agentaccount/',
  //   name: 'apps-agent-refer',
  //   component: () => import('@/views/apps/agent/AgentRefer.vue'),
  // },

  //Report
  {
    path: '/apps/report/loanall/',
    name: 'apps-report-loanall',
    component: () => import('@/views/apps/report/ReportLoanAll.vue'),
  },
  

  {
    path: '/apps/report/paidsuccess/',
    name: 'apps-report-paidsuccess',
    component: () => import('@/views/apps/report/ReportPaidSuccess.vue'),
  },

  // {
  //   path: '/apps/report/oldsummary/',
  //   name: 'apps-report-oldsummary',
  //   component: () => import('@/views/apps/report/ReportOldSummary.vue'),
  // },

  // {
  //   path: '/apps/report/deposit/',
  //   name: 'apps-report-deposit',
  //   component: () => import('@/views/apps/report/ReportDeposit.vue'),
  // },

  // //Withdraw
  // {
  //   path: '/apps/report/withdraw/',
  //   name: 'apps-report-withdraw',
  //   component: () => import('@/views/apps/report/ReportWithdraw.vue'),
  // },

  //   //Activity
  // {
  //   path: '/apps/report/activity/',
  //   name: 'apps-report-activity',
  //   component: () => import('@/views/apps/report/ReportActivity.vue'),
  // },

  //   //InviteFriends
  // {
  //   path: '/apps/report/aff/',
  //   name: 'apps-report-aff',
  //   component: () => import('@/views/apps/report/ReportInviteFriends.vue'),
  // },

  // {
  //   path: '/apps/report/affdeposit/',
  //   name: 'apps-report-affdeposit',
  //   component: () => import('@/views/apps/report/ReportInviteFriendsDeposit.vue'),
  // },
  
  //   //Refund
  // {
  //   path: '/apps/report/refund/',
  //   name: 'apps-report-refund',
  //   component: () => import('@/views/apps/report/ReportRefund.vue'),
  // },

  //   //Summary
  // {
  //   path: '/apps/report/summary',
  //   name: 'apps-report-summary',
  //   component: () => import('@/views/apps/report/ReportSummary.vue'),
  // },

  // //Summary
  // {
  //   path: '/apps/report/betlog',
  //   name: 'apps-report-betlog',
  //   component: () => import('@/views/apps/report/ReportBetlog.vue'),
  // },

  // //Summary
  // {
  //   path: '/apps/report/transferout',
  //   name: 'apps-report-transferout',
  //   component: () => import('@/views/apps/report/ReportTransferOut.vue'),
  // },

  // {
  //   path: '/apps/report/smslog',
  //   name: 'apps-report-smslog',
  //   component: () => import('@/views/apps/report/ReportSMS.vue'),
  // },

  // Members
  {
    path: '/apps/members/manage',
    name: 'apps-members-manage',
    component: () => import('@/views/apps/members/MemberManage.vue'),
  },
  {
    path: '/apps/members/groupsub',
    name: 'apps-group-sub',
    component: () => import('@/views/apps/members/GroupSub.vue'),
  },

  {
    path: '/apps/orders/orderwaitapprove',
    name: 'order-wait-approve',
    component: () => import('@/views/apps/orders/OrderWaitApprove.vue'),
  },

  {
    path: '/apps/loan/onduedate',
    name: 'apps-loan-onduedate',
    component: () => import('@/views/apps/loan/LoanOnDue.vue'),
  },

  {
    path: '/apps/loan/overduedate',
    name: 'apps-loan-overduedate',
    component: () => import('@/views/apps/loan/LoanOverDue.vue'),
  },

  {
    path: '/apps/loan/closed',
    name: 'apps-loan-closed',
    component: () => import('@/views/apps/loan/LoanClosed.vue'),
  },

  {
    path: '/apps/loan/all',
    name: 'apps-loan-all',
    component: () => import('@/views/apps/loan/LoanAll.vue'),
  },

  //Bank
  {
    path: '/apps/bank/',
    name: 'apps-bank-admin',
    component: () => import('@/views/apps/bank/AdminBank.vue'),
  },

  
  {
    path: '/apps/bank/',
    name: 'apps-truewallet-admin',
    component: () => import('@/views/apps/bank/AdminTrueWallet.vue'),
  },

  {
    path: '/apps/settinggeneral/',
    name: 'apps-setting-general',
    component: () => import('@/views/apps/setting/AdminSetting.vue'),
  },

  {
    path: '/apps/settingpromotion/',
    name: 'apps-promotion-setting',
    component: () => import('@/views/apps/promotion/PromotionSetting.vue'),
  },

  {
    path: '/apps/loantype/',
    name: 'apps-loantype-setting',
    component: () => import('@/views/apps/loantype/LoanType.vue'),
  },

  {
    path: '/apps/setting/subscriptiontype',
    name: 'apps-setting-subscription-type',
    component: () => import('@/views/apps/setting/SubscriptionType.vue'),
  },

  {
    path: '/apps/setting/productsetting',
    name: 'apps-product-setting',
    component: () => import('@/views/apps/setting/ProductSetting.vue'),
  },

  {
    path: '/apps/setting/',
    name: 'apps-setting-percentreport',
    component: () => import('@/views/apps/setting/ReportPercentSettingMain.vue'),
  },

  {
    path: '/apps/settingline/',
    name: 'apps-line-linesettingmain',
    component: () => import('@/views/apps/setting/LineSettingMain.vue'),
  },

  {
    path: '/apps/settingaffilate/',
    name: 'apps-affilate-affilatesettingmain',
    component: () => import('@/views/apps/setting/AffilateSettingMain.vue'),
  },

  

  {
    path: '/apps/staffmanage/',
    name: 'apps-staff-manage',
    component: () => import('@/views/apps/staff/StaffSetting.vue'),
  },
  
  {
    path: '/apps/staffpermission/',
    name: 'apps-staff-permission',
    component: () => import('@/views/apps/staff/StaffGroupSetting.vue'),
  },

  {
    path: '/apps/settingpopup/',
    name: 'apps-settingpopup-manage',
    component: () => import('@/views/apps/setting/PopupSetting.vue'),
  },
  
  {
    path: '/apps/settingdaily/',
    name: 'apps-setting-daily',
    component: () => import('@/views/apps/setting/DailySettingMain.vue'),
  },

  {
    path: '/apps/settingannouncement/',
    name: 'apps-setting-announcement',
    component: () => import('@/views/apps/setting/AnnouncementSetting.vue'),
  },

  {
    path: '/apps/settingbanner/',
    name: 'apps-setting-banner',
    component: () => import('@/views/apps/setting/BannerSetting.vue'),
  },

  {
    path: '/apps/settinggame/',
    name: 'apps-setting-game',
    component: () => import('@/views/apps/setting/GameSettingMain.vue'),
  },
  
  {
    path: '/apps/settinguxui/',
    name: 'apps-setting-uxui',
    component: () => import('@/views/apps/setting/UxuiSettingMain.vue'),
  },
  {
    path: '/apps/settingadminpassword/',
    name: 'apps-setting-admin-password',
    component: () => import('@/views/apps/setting/AdminPasswordSetting.vue'),
  },
  {
    path: '/apps/settingadminpin/',
    name: 'apps-setting-admin-pin',
    component: () => import('@/views/apps/setting/AdminPinSetting.vue'),
  },
]
