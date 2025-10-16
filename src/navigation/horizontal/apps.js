export default [
  {
    header: "Manage Member",
    submenu: ["apps-members-manage", "apps-alliances-manage", "apps-agent-refer", "apps-group-sub", "apps-personal-email-manage", "apps-individual-email-stock"],
  },
  {
    title: "Member",
    icon: "UserIcon",
    children: [

      {
        title: "Group Subscription",
        route: "apps-group-sub",
      },
      {
        title: "Manage Member personal",
        route: "apps-members-manage",
      },
      {
        title: "Personal Email",
        route: "apps-personal-email-manage",
        icon: "MailIcon",
      },
      {
        title: "Email Stock แบบบุคคล",
        route: "apps-individual-email-stock",
        icon: "MailIcon",
      },
    ],
  },
  // {
  //   header: "Manage Alliance",
  // },
  // {
  //   title: "Alliances",
  //   icon: "UsersIcon",
  //   children: [
  //     {
  //       title: "Manage Alliance",
  //       route: "apps-alliances-manage",
  //     },     
  //     {
  //       title: "Manage Reference",
  //       route: "apps-agent-refer",
  //     },
  //   ],
  // },  
];
