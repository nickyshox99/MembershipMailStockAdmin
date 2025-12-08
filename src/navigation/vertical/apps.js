export default [
  {
    header: "Manage Member",
    submenu: ["apps-group-sub-stock","apps-members-manage", "apps-alliances-manage", "apps-agent-refer", "apps-group-sub", "apps-personal-email-manage", "apps-individual-email-stock"],
  },
  {
    title: "Member",
    icon: "UserIcon",
    children: [

      {
        title: "เมลร้านบุคคล",
        route: "apps-individual-email-stock",
        icon: "MailIcon",
      },
      {
        title: "เมลร้านแฟมมิลี่",
        route: "apps-group-sub",
        icon: "MailIcon",
      },
      {
        title: "เมลลูกค้าแบบบุคคล",
        route: "apps-personal-email-manage",
        icon: "MailIcon",
      },
      {
        title: "เมลลูกค้าแฟมมิลี่",
        route: "apps-group-sub-stock",
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
