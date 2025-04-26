export default [
  {
    header: "Manage Member",
    submenu : ["apps-members-manage","apps-alliances-manage","apps-agent-refer","apps-group-sub"],
  },
  {
    title: "Member",
    icon: "UserIcon",
    children: [
      {
        title: "Manage Member",
        route: "apps-members-manage",        
      },   
      {
        title: "Group Subscription",
        route: "apps-group-sub",        
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
