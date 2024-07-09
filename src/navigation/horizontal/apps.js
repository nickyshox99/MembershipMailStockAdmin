export default [
  {
    header: "Manage Member",
    submenu : ["apps-members-manage","apps-alliances-manage","apps-agent-refer"],
  },
  {
    title: "Member",
    icon: "UserIcon",
    children: [
      {
        title: "Manage Member",
        route: "apps-members-manage",        
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
