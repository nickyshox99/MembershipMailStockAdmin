export default [

  {
    header: "Management",
    submenu : ["apps-members-depwit","order-nearexpire","order-all","order-wait-approve","order-wait-invite","order-wait-payment","order-checked-payment","order-expired"],
  },
  {
    title: "MemberShip List",
    icon: "CreditCardIcon",
    children: [
      {
        title: "Wait Approve",
        route: "order-wait-approve",
      },
      {
        title: "Wait Family Invite",
        route: "order-wait-invite",
      },
      {
        title: "Wait Payment",
        route: "order-wait-payment",
      },
      {
        title: "Checked Payment",
        route: "order-checked-payment",
      },
      {
        title: "On Due Date",
        route: "order-nearexpire",
      },      
      {
        title: "Over Due",
        route: "order-expired",
      }, 
      {
        title: "All",
        route: "order-all",
      },
    ],
    
  },
  
  {
    header: "Reports",
    submenu : ["apps-report-loanall","apps-report-paidsuccess","apps-report-oldsummary"],
  },
  {
    title: "Report",
    icon: "CreditCardIcon",
    children: [
      {
        title: "List All",
        route: "apps-report-loanall",
      },
      
      {
        title: "Paid Success",
        route: "apps-report-paidsuccess",
      },

      
    ],
  },
]
