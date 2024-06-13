export default [
  {
    header: "Manage Deptor",
    submenu : ["apps-members-manage","apps-alliances-manage","apps-agent-refer"],
  },
  {
    title: "Deptor",
    icon: "UserIcon",
    children: [
      {
        title: "Manage Deptor",
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
