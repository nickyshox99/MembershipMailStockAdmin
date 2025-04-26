export default [

  {
    header: "Management",
    submenu : ["apps-members-depwit","apps-loan-onduedate","apps-loan-overduedate","apps-loan-closed","apps-loan-all"],
  },
  {
    title: "MemberShip List",
    icon: "CreditCardIcon",
    children: [
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
