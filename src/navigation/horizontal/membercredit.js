export default [

  {
    header: "Management",
    submenu : ["apps-members-depwit","apps-loan-onduedate","apps-loan-overduedate","apps-loan-closed","apps-loan-all","order-wait-approve","order-wait-invite","order-wait-payment","order-checked-payment"],
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
        route: "apps-loan-onduedate",
      },      
      {
        title: "Over Due",
        route: "apps-loan-overduedate",
      }, 
      {
        title: "All",
        route: "apps-loan-all",
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
