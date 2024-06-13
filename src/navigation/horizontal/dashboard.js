export default 
[
  {
    header: "Super Dashboard",
    submenu : ["dashboard"],
  },
  {
    title: "Dashboard",
    icon: "HomeIcon",
    children: [
      // {
      //   title: "Main Dashboard",
      //   route: "dashboard",        
      // },    
      {
        title: "Summary Dashboard",
        route: "dashboardsummary",        
      }, 
    ],
  },  
];