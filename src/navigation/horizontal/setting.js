export default [
  {
    header: "Setting",
    submenu : ["apps-setting-general","apps-setting-uxui","apps-setting-banner","apps-line-linesettingmain"
    ,"apps-affilate-affilatesettingmain","apps-settingpopup-manage","apps-setting-game","apps-setting-daily"
    ,"apps-setting-announcement","apps-promotion-setting","apps-bank-admin","apps-bank-transaction","apps-truewallet-admin"
    ,"apps-staff-manage","apps-staff-permission"
    ,"apps-agent-account"
    ,"apps-agent-refer","apps-setting-admin-pin","apps-loantype-setting","apps-setting-percentreport","apps-setting-subscription-type","apps-product-setting"
    ],
  },
  // {
  //   title: "Loan Setting",
  //   icon: "CreditCardIcon",
  //   children: [
  //     {
  //       title: "Loan Type",
  //       route: "apps-loantype-setting",
  //     },
  //   ],
  // },
  {
    title: "Basic Setting",
    icon: "SettingsIcon",
    children: [
      {
        title: "Subscription Type",
        route: "apps-setting-subscription-type",
      },
      {
        title: "Product Setting",
        route: "apps-product-setting",
      },
      //   {
      //     title: "General Setting",
      //     route: "apps-setting-general",
      //   },
      // {
      //   title: "General Setting",
      //   route: "apps-setting-general",
      // },
      // {
      //   title: "Ux/Ui Setting",
      //   route: "apps-setting-uxui",
      // },
      // {
      //   title: "Banner Setting",
      //   route: "apps-setting-banner",
      // },
      // {
      //   title: "Setting % Report",
      //   route: "apps-setting-percentreport",
      // },
      {
        title: "Line Setting",
        route: "apps-line-linesettingmain",
      },
      // {
      //   title: "Friend Reccommend Setting",
      //   route: "apps-affilate-affilatesettingmain",
      // },      
      // {
      //   title: "Popup Setting",
      //   route: "apps-settingpopup-manage",
      // },
      // {
      //   title: "Game Setting",
      //   route: "apps-setting-game",
      // },
      // {
      //   title: "Daily Deposit Setting",
      //   route: "apps-setting-daily",
      // },
      // {
      //   title: "Announcement Setting",
      //   route: "apps-setting-announcement",
      // },
      
      ],
    },
  // {
  //   title: "Promotion Setting",
  //   icon: "GiftIcon",
  //   children: [
  //     {
  //       title: "Promotion Setting",
  //       route: "apps-promotion-setting",
  //     },
  //   ],
  // },
   
  {
    title: "Bank Setting",
    icon: "CreditCardIcon",
    children: [
      {
        title: "Bank Setting",
        route: "apps-bank-admin",
      },
      // {
      //   title: "Bank Transaction",
      //   route: "apps-bank-transaction",
      // },
      // {
      //   title: "True Wallet Setting",
      //   route: "apps-truewallet-admin",
      // },
    ],
  },
  {
    title: "Staff Setting",
    icon: "UsersIcon",
    children: [
      {
        title: "Staff Setting",
        route: "apps-staff-manage",
      },
      {
        title: "Group Setting",
        route: "apps-staff-permission",
      },
    ],
  },
  // {
  //   title: "Agent Setting",
  //   icon: "PocketIcon",
  //   children: [
  //     {
  //       title: "Agent Setting",
  //       route: "apps-agent-account",
  //     },
  //     {
  //       title: "Source Setting",
  //       route: "apps-agent-refer",
  //     },
  //   ],
  // },
  // {
  //   title: "Pin Setting",
  //   icon: "PocketIcon",
  //   children: [
  //     {
  //       title: "Change Pin",
  //       route: "apps-setting-admin-pin",
  //     },      
  //   ],
  // },
 
];
