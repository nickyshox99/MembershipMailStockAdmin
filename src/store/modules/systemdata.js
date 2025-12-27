import axios from "axios";

const state = {
  
};

const getters = {
  
};

const actions = {  

//   async GetAgent({commit}, user) {
        
//     //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
//     var headers = {
//         userid: user.get("userid"),
//         token: user.get("token"),
//     }

//     // console.log(body);

//     let response;
//     await axios.get("api/admin/getagent",
//     {
//         headers: {            
//             'Content-Type': 'application/json',
//             'userid': headers.userid,
//             'token': headers.token,
//         }        
//     }).then(
//         resp => 
//         {
//             response = resp;
//         }
//     );

//     // console.log(response);

//     if (response.data.status=="success") 
//     {
      
//     }

//     return response;

//   },    
async GetAdminBank({commit}, search) {
        
    var headers = {
        userid: search.get("userid"),
        token: search.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {        
        searchWord: search.get("searchWord"),
    }

    // console.log(body);

    let response;
    await axios.post("api/adminbank/getadminbank",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;            
        }
    );

    // console.log(response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

},
async GetActiveAdminBank({commit}, search) {
        
    var headers = {
        userid: "",
        token: "",
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {        
        searchWord: "",
    }

    // console.log(body);

    let response;
    await axios.post("api/adminbank/getactiveadminbank",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;            
        }
    );

    // console.log(response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

},
//   async GetAdminTrueWallet({commit}, search) {
        
//     var headers = {
//         userid: search.get("userid"),
//         token: search.get("token"),
//     }

//     //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
//     var body = {        
//         searchWord: search.get("searchWord"),
//     }

//     // console.log(body);

//     let response;
//     await axios.post("api/admintruewallet/getadmintruewallet",body,
//     {
//         headers: {            
//         'Content-Type': 'application/json',
//         'userid': headers.userid,
//         'token': headers.token,
//         }
//     }).then(
//         resp => 
//         {
//             response = resp;
//         }
//     );

//     // console.log(response);

//     if (response.data.status=="success") 
//     {
        
//     }

//     return response;

//   },
  async GetBankInfo({commit}, search) {
        
    var headers = {
        userid: search.get("userid"),
        token: search.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        searchWord: search.get("searchWord"),
    }

    // console.log(body);

    let response;
    await axios.post("api/adminbank/getbankinfo",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  
//   async GetPromotion({commit}, search) {
        
//     var headers = {
//         userid: search.get("userid"),
//         token: search.get("token"),
//     }

//     //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
//     var body = {
//         // userid: search.get("userid"),
//         // token: search.get("token"),
//         searchWord: search.get("searchWord"),
//     }

//     // console.log(body);

//     let response;
//     await axios.post("api/promotion/getpromotion",body,
//     {
//         headers: {            
//         'Content-Type': 'application/json',
//         'userid': headers.userid,
//         'token': headers.token,
//         }
//     }).then(
//         resp => 
//         {
//             response = resp;
//         }
//     );

//     // console.log(response);
//     if (response.data.status=="success") 
//     {
      
//     }
//     return response;
//   },
  async GetStaffPage({commit}, search) {
        
    var headers = {
        userid: search.get("userid"),
        token: search.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        // searchWord: search.get("searchWord"),
    }

    // console.log(body);

    let response;
    await axios.post("api/staffgroup/getstaffpage",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetStaffGroup({commit}, search) {
        
    var headers = {
        userid: search.get("userid"),
        token: search.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        searchWord: search.get("searchWord"),
        page_name: search.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/staffgroup/getstaffgroup",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetStaff({commit}, search) {
        
    var headers = {
        userid: search.get("userid"),
        token: search.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        searchWord: search.get("searchWord"),
        page_name: search.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/staff/getstaff",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
//   async GetPopup({commit}, search) {
        
//     var headers = {
//         userid: search.get("userid"),
//         token: search.get("token"),
//     }

//     //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
//     var body = {
//         // userid: search.get("userid"),
//         // token: search.get("token"),
//         searchWord: search.get("searchWord"),
//     }

//     // console.log(body);

//     let response;
//     await axios.post("api/popup/getpopup",body,
//     {
//         headers: {            
//         'Content-Type': 'application/json',
//         'userid': headers.userid,
//         'token': headers.token,
//         }
//     }).then(
//         resp => 
//         {
//             response = resp;
//         }
//     );

//     // console.log(response);
//     if (response.data.status=="success") 
//     {
      
//     }
//     return response;
//   },
  async GetAnnouncement({commit}, search) {
        
    var headers = {
        userid: search.get("userid"),
        token: search.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        searchWord: search.get("searchWord"),
    }

    // console.log(body);

    let response;
    await axios.post("api/announcement/getannouncement",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetBanner({commit}, search) {
        
    var headers = {
        userid: search.get("userid"),
        token: search.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        searchWord: search.get("searchWord"),
    }

    // console.log(body);

    let response;
    await axios.post("api/banner/getbanner",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },  
//   async GetReportSMS({commit}, search) {
        
//     //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

//     var headers = {
//         userid: search.get("userid"),
//         token: search.get("token"),
//     }

//     var body = {
//         userid: search.get("userid"),
//         dateFrom: search.get("dateFrom"),
//         dateTo: search.get("dateTo"),
//         agent: search.get("agent"),
//         searchWord: search.get("searchWord"),
//     }

//     console.log(body);

//     let response;
//     await axios.post("api/report/getReportSMS",body,
//     {
//         headers: {            
//         'Content-Type': 'application/json',
//         'userid': headers.userid,
//         'token': headers.token,
//         }
//     }).then(
//         resp => 
//         {
//             response = resp;
//         }
//     );

//     // console.log(response);

//     if (response.data.status=="success") 
//     {
      
//     }

//     return response;

//   },
//   async GetReportBankTransaction({commit}, search) {
        
//     //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

//     var headers = {
//         userid: search.get("userid"),
//         token: search.get("token"),
//     }

//     var body = {
//         bank_acc_no: search.get("bank_acc_no"),
//         bank_id: search.get("bank_id"),
//         startDate: search.get("startDate"),
//         endDate: search.get("endDate"),        
//         pageSelected: search.get("pageSelected"),
//         nextPageId: search.get("nextPageId"),
//     }

//     // console.log(body);

//     let response;
//     if (body.bank_id==5) 
//     {
//         await axios.post("api/scb/getTransactionByBankID",body,
//         {
//             headers: {            
//             'Content-Type': 'application/json',
//             'userid': headers.userid,
//             'token': headers.token,
//             }
//         }).then(
//             resp => 
//             {
//                 response = resp;
//             }
//         );
    
//     }else if (body.bank_id==1) 
//     {
//         await axios.post("api/kbank/getTransactionByBankID",body,
//         {
//             headers: {            
//             'Content-Type': 'application/json',
//             'userid': headers.userid,
//             'token': headers.token,
//             }
//         }).then(
//             resp => 
//             {
//                 response = resp;
//             }
//         );
    
//     }
   
//     if (response.data.status=="success") 
//     {
      
//     }

//     return response;

//   },
//   async GetReportDeposit({commit}, search) {
        
//     //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

//     var headers = {
//         userid: search.get("userid"),
//         token: search.get("token"),
//     }

//     var body = {
//         userid: search.get("userid"),
//         dateFrom: search.get("dateFrom"),
//         dateTo: search.get("dateTo"),
//         agent: search.get("agent"),
//         searchWord: search.get("searchWord"),
//     }

//     console.log(body);

//     let response;
//     await axios.post("api/report/getReportDesposit",body,
//     {
//         headers: {            
//         'Content-Type': 'application/json',
//         'userid': headers.userid,
//         'token': headers.token,
//         }
//     }).then(
//         resp => 
//         {
//             response = resp;
//         }
//     );

//     // console.log(response);

//     if (response.data.status=="success") 
//     {
      
//     }

//     return response;

//   },
//   async GetReportWithdraw({commit}, search) {
        
//     //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

//     var headers = {
//         userid: search.get("userid"),
//         token: search.get("token"),
//     }

//     var body = {
//         userid: search.get("userid"),
//         dateFrom: search.get("dateFrom"),
//         dateTo: search.get("dateTo"),
//         agent: search.get("agent"),
//         searchWord: search.get("searchWord"),
//     }

//     // console.log(body);

//     let response;
//     await axios.post("api/report/getReportWithdraw",body,
//     {
//         headers: {            
//         'Content-Type': 'application/json',
//         'userid': headers.userid,
//         'token': headers.token,
//         }
//     }).then(
//         resp => 
//         {
//             response = resp;
//         }
//     );

//     // console.log(response);

//     if (response.data.status=="success") 
//     {
      
//     }

//     return response;

//   },
//   async GetReportTransferOut({commit}, search) {
        
//     //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

//     var headers = {
//         userid: search.get("userid"),
//         token: search.get("token"),
//     }

//     var body = {
//         userid: search.get("userid"),
//         dateFrom: search.get("dateFrom"),
//         dateTo: search.get("dateTo"),
//         agent: search.get("agent"),
//         searchWord: search.get("searchWord"),
//     }

//     // console.log(body);

//     let response;
//     await axios.post("api/report/getReportTransferOut",body,
//     {
//         headers: {            
//         'Content-Type': 'application/json',
//         'userid': headers.userid,
//         'token': headers.token,
//         }
//     }).then(
//         resp => 
//         {
//             response = resp;
//         }
//     );

//     // console.log(response);

//     if (response.data.status=="success") 
//     {
      
//     }

//     return response;

//   },
//   async GetReportAff({commit}, search) {
        
//     //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

//     var headers = {
//         userid: search.get("userid"),
//         token: search.get("token"),
//     }

//     var body = {
//         userid: search.get("userid"),
//         dateFrom: search.get("dateFrom"),
//         dateTo: search.get("dateTo"),
//         agent: search.get("agent"),
//         searchWord: search.get("searchWord"),
//     }

//     // console.log(body);

//     let response;
//     await axios.post("api/report/getReportAff",body,
//     {
//         headers: {            
//         'Content-Type': 'application/json',
//         'userid': headers.userid,
//         'token': headers.token,
//         }
//     }).then(
//         resp => 
//         {
//             response = resp;
//         }
//     );

//     // console.log(response);

//     if (response.data.status=="success") 
//     {
      
//     }

//     return response;

//   },
//   async GetReportAffDeposit({commit}, inputData) {
        
//     //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

//     var headers = {
//         userid: inputData.get("userid"),
//         token: inputData.get("token"),
//     }

//     var body = {
//         userid: inputData.get("userid"),
//         dateFrom: inputData.get("dateFrom"),
//         dateTo: inputData.get("dateTo"),
//         agent: inputData.get("agent"),
//         searchWord: inputData.get("searchWord"),
//     }

//     // console.log(body);

//     let response;
//     await axios.post("api/report/getReportAffDeposit",body,
//     {
//         headers: {            
//         'Content-Type': 'application/json',
//         'userid': headers.userid,
//         'token': headers.token,
//         }
//     }).then(
//         resp => 
//         {
//             response = resp;
//         }
//     );

//     // console.log(response);

//     if (response.data.status=="success") 
//     {
      
//     }

//     return response;

//   },
//   async GetReportRefund({commit}, inputData) {
        
//     //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

//     var headers = {
//         userid: inputData.get("userid"),
//         token: inputData.get("token"),
//     }

//     var body = {
//         userid: inputData.get("userid"),
//         dateFrom: inputData.get("dateFrom"),
//         dateTo: inputData.get("dateTo"),
//         agent: inputData.get("agent"),
//         searchWord: inputData.get("searchWord"),
//     }

//     // console.log(body);

//     let response;
//     await axios.post("api/report/GetReportRefund",body,
//     {
//         headers: {            
//         'Content-Type': 'application/json',
//         'userid': headers.userid,
//         'token': headers.token,
//         }
//     }).then(
//         resp => 
//         {
//             response = resp;
//         }
//     );

//     // console.log(response);

//     if (response.data.status=="success") 
//     {
      
//     }

//     return response;

//   },
//   async GetReportSummaryMember({commit}, inputData) {
        
//     //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

//     var headers = {
//         userid: inputData.get("userid"),
//         token: inputData.get("token"),
//     }

//     var body = {
//         userid: inputData.get("userid"),
//         dateFrom: inputData.get("dateFrom"),
//         dateTo: inputData.get("dateTo"),
//         agent: inputData.get("agent"),
//         searchWord: inputData.get("searchWord"),
//     }

//     // console.log(body);

//     let response;
//     await axios.post("api/report/GetReportSummaryMember",body,
//     {
//         headers: {            
//         'Content-Type': 'application/json',
//         'userid': headers.userid,
//         'token': headers.token,
//         }
//     }).then(
//         resp => 
//         {
//             response = resp;
//         }
//     );

//     // console.log(response);

//     if (response.data.status=="success") 
//     {
      
//     }

//     return response;

//   },
//   async GetReportBetlog({commit}, inputData) {
        
//     //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

//     var headers = {
//         userid: inputData.get("userid"),
//         token: inputData.get("token"),
//     }

//     var body = {
//         userid: inputData.get("userid"),
//         dateFrom: inputData.get("dateFrom"),
//         dateTo: inputData.get("dateTo"),
//         agent: inputData.get("agent"),
//         searchWord: inputData.get("searchWord"),
//     }

//     // console.log(body);

//     let response;
//     await axios.post("api/report/getReportBetlog",body,
//     {
//         headers: {            
//         'Content-Type': 'application/json',
//         'userid': headers.userid,
//         'token': headers.token,
//         }
//     }).then(
//         resp => 
//         {
//             response = resp;
//         }
//     );

//     // console.log(response);

//     if (response.data.status=="success") 
//     {
      
//     }

//     return response;

//   },
//   async GetReportBetlog2({commit}, inputData) {
        
//     //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

//     var headers = {
//         userid: inputData.get("adminid"),
//         token: inputData.get("token"),
//     }

//     var body = {
//         userid: inputData.get("userid"),
//         dateFrom: inputData.get("dateFrom"),
//         dateTo: inputData.get("dateTo"),
//         agent: inputData.get("agent"),
//         searchWord: inputData.get("searchWord"),
//     }

//     // console.log(body);

//     let response;
//     await axios.post("api/report/getReportBetlog2",body,
//     {
//         headers: {            
//         'Content-Type': 'application/json',
//         'userid': headers.userid,
//         'token': headers.token,
//         }
//     }).then(
//         resp => 
//         {
//             response = resp;
//         }
//     );

//     // console.log(response);

//     if (response.data.status=="success") 
//     {
      
//     }

//     return response;

//   },
//   async GetReportBetlog4({commit}, inputData) {
        
//     //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

//     var headers = {
//         userid: inputData.get("adminid"),
//         token: inputData.get("token"),
//     }
    
//     var body = {        
//         id: inputData.get("userid"),        
//         username: inputData.get("userid"),
//         start: inputData.get("dateFrom"),
//         end: inputData.get("dateTo"),
//     }


//     // console.log(body);

//     let response;
//     await axios.post("api/member/getCreditHistoryByMemberId",body,
//     {
//         headers: {            
//         'Content-Type': 'application/json',
//         'userid': headers.userid,
//         'token': headers.token,
//         }
//     }).then(
//         resp => 
//         {
//             response = resp;
//         }
//     );

//     // console.log(response);

//     if (response.data.status=="success") 
//     {
      
//     }

//     return response;

//   },
  async GetDashboardData({commit}, inputData) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        userid: inputData.get("userid"),
    }

    // console.log(body);

    let response;
    await axios.post("api/report/getdashboarddata",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async GetDashboardDataByDate({commit}, inputData) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        userid: inputData.get("userid"),
        dateFrom : inputData.get("dateFrom"),
        dateTo : inputData.get("dateTo"),        
    }

    // console.log(body);

    let response;
    await axios.post("api/report/getdashboarddatabydate",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async GetDashboardDataByDate2({commit}, inputData) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        userid: inputData.get("userid"),
        dateFrom : inputData.get("dateFrom"),
        dateTo : inputData.get("dateTo"),        
        page_name : inputData.get("page_name"),  
    }

    // console.log(body);

    let response;
    await axios.post("api/report/getdashboarddatabydate2",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async GetAccountSummaryReport({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        userid: inputData.get("userid"),
        page_name : inputData.get("page_name") || "report_summary",  
    }

    let response;
    await axios.post("api/report/getAccountSummaryReport",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async GetSubscriptionTypeReport({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        userid: inputData.get("userid"),
        page_name : inputData.get("page_name") || "report_summary",  
    }

    let response;
    await axios.post("api/report/getSubscriptionTypeReport",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async GetOrderStatusReport({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        userid: inputData.get("userid"),
        page_name : inputData.get("page_name") || "report_summary",  
    }

    let response;
    await axios.post("api/report/getOrderStatusReport",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async GetMonthlyRevenueReport({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        userid: inputData.get("userid"),
        page_name : inputData.get("page_name") || "report_summary",
        from_date: inputData.get("from_date"),
        to_date: inputData.get("to_date"),
    }

    console.log('GetMonthlyRevenueReport - Request body:', body);

    let response;
    await axios.post("api/report/getMonthlyRevenueReport",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    console.log('GetMonthlyRevenueReport - API Response:', response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async TestOrderStatusData({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        userid: inputData.get("userid"),
        page_name : inputData.get("page_name") || "report_summary",  
    }

    let response;
    await axios.post("api/report/testOrderStatusData",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async GetLastBonusTransaction({commit}, inputData) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        userid: inputData.get("userid"),
    }

    // console.log(body);

    let response;
    await axios.post("api/report/getlastbonustransaction",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async GetLastTransaction({commit}, inputData) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        userid: inputData.get("userid"),
    }

    // console.log(body);

    let response;
    await axios.post("api/report/getlasttransaction",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async GetLastDepTransaction({commit}, inputData) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        userid: inputData.get("userid"),
    }

    // console.log(body);

    let response;
    await axios.post("api/report/getlastDeptransaction",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async GetLastWitTransaction({commit}, inputData) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        userid: inputData.get("userid"),
    }

    // console.log(body);

    let response;
    await axios.post("api/report/getlastWittransaction",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async GetLastRegTransaction({commit}, inputData) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        userid: inputData.get("userid"),
    }

    // console.log(body);

    let response;
    await axios.post("api/report/getlastRegtransaction",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async GetOnlineUser({commit}, inputData) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {        
    }

    // console.log(body);

    let response;
    await axios.post("api/member/getuseronline",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async RegisterMemberWithEmail({commit}, inputData) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {        
        email: inputData.get("email"),
        line_id: inputData.get("line_id"),
        display_name: inputData.get("display_name"),
        line_displayurl : inputData.get("line_displayurl"),
    }

    // console.log(body);

    let response;
    await axios.post("api/member/RegisterMemberWithEmail",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
//   async GetAgentBalance({commit}, inputData) {
        
//     //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

//     var headers = {
//         userid: inputData.get("userid"),
//         token: inputData.get("token"),
//     }

//     var body = {        
//     }

//     // console.log(body);

//     let response;
//     await axios.post("api/agent/getremaincredit",body,
//     {
//         headers: {            
//         'Content-Type': 'application/json',
//         'userid': headers.userid,
//         'token': headers.token,
//         }
//     }).then(
//         resp => 
//         {
//             response = resp;
//         }
//     );

//     // console.log(response);

//     if (response.data.status=="success") 
//     {
      
//     }

//     return response;

//   },  
  async UploadFile({commit}, inputData) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    // var body = {
    //     tofilename : search.get("tofilename"),
    //     file : search.get("file"),
    // }

    const formData = new FormData();
    formData.append('tofilename', inputData.get("tofilename"));
    formData.append('file', inputData.get("file"));

    // console.log(search.get("file"));

    // console.log(body);

    let response;
    await axios.post("api/file/uploadFile",formData,
    {
        headers: {            
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async UploadFileAndDeleteOldFile({commit}, inputData) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    // var body = {
    //     tofilename : search.get("tofilename"),
    //     file : search.get("file"),
    // }

    const formData = new FormData();
    formData.append('tofilename', inputData.get("tofilename"));
    formData.append('file', inputData.get("file"));
    formData.append('oldFilePath', inputData.get("oldFilePath"));

    // console.log(search.get("file"));

    // console.log(body);

    let response;
    await axios.post("api/file/uploadFileAndDeleteOldFile",formData,
    {
        headers: {            
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async DeleteOldFile({commit}, inputData) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        oldFilePath : inputData.get("oldFilePath")        
    }

    // console.log(search.get("file"));

    // console.log(body);

    let response;
    await axios.post("api/file/deleteFile",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async CustomerUploadFileAndDeleteOldFile({commit}, inputData) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    // var body = {
    //     tofilename : search.get("tofilename"),
    //     file : search.get("file"),
    // }

    const formData = new FormData();
    formData.append('order_id', inputData.get("order_id"));
    formData.append('email', inputData.get("email"));
    formData.append('tofilename', inputData.get("tofilename"));
    formData.append('file', inputData.get("file"));
    formData.append('oldFilePath', inputData.get("oldFilePath"));

    // console.log(search.get("file"));

    // console.log(body);

    let response;
    await axios.post("api/file/customerUploadFileAndDeleteOldFile",formData,
    {
        headers: {            
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async CustomerDeleteOldFile({commit}, inputData) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        oldFilePath : inputData.get("oldFilePath"), 
        order_id : inputData.get("order_id"), 
        user_id : inputData.get("user_id"), 
    }

    // console.log(search.get("file"));

    // console.log(body);

    let response;
    await axios.post("api/file/customerdeleteFile",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async GetUserPromotion({commit},inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }
    
    var body = {        
        username: inputData.get("username"),
        avatar:"" 
    }

    // console.log(body);

    let response;
    await axios.post("api/member/getUserPromotion",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async CreateAndApproveSubScribeOrder({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {        
        username : inputData.get("admin_id"),
        page_name: inputData.get("page_name"),
        user_id: inputData.get("user_id"),
        line_id: inputData.get("line_id"),
        email: inputData.get("email"),
        product_id: inputData.get("product_id"),
        note: inputData.get("note"),
        purchase_type: inputData.get("purchase_type"),
    }
    
    let response;
    await axios.post("api/product/CreateAndApproveSubScribeOrder",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async RenewSubScribeOrder({commit}, inputData) {
    var headers = {
      userid: inputData.get("userid"),
      token: inputData.get("token"),
    }
    
    var body = {
        previous_order_id: inputData.get("previous_order_id"),
    }

    let response;
    await axios.post("api/product/RenewSubScribeOrder",body,
    {
      headers: {            
      'Content-Type': 'application/json',
      'userid': headers.userid,
      'token': headers.token,
    }
    }).then(
      resp => 
      {
        response = resp;
      }
    );

    return response;
  },

  async GetHistorySubScribeOrderByMemberID({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        member_id: inputData.get("member_id"),
        page_name: inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/product/GetHistorySubScribeOrderByMemberID",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetHistorySubScribeOrderNotApprove({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),        
        page_name: inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/product/GetHistorySubScribeOrderNotApprove",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetHistorySubScribeOrderWaitInvitation({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),        
        page_name: inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/product/GetHistorySubScribeOrderWaitInvitation",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetHistorySubScribeOrderWaitCheckPayment({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),        
        page_name: inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/product/GetHistorySubScribeOrderWaitCheckPayment",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetHistorySubScribeOrderCheckedPayment({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),        
        page_name: inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/product/GetHistorySubScribeOrderCheckedPayment",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetSubScribeOrderById({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),        
        id: inputData.get("id"),
        user_id: inputData.get("user_id"),
        page_name: inputData.get("page_name"),

    }

    // console.log(body);

    let response;
    await axios.post("api/product/GetSubScribeOrderById",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetHistorySubScribeOrderAll({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),        
        page_name: inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/product/GetHistorySubScribeOrderAll",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async CancelSubScribeOrder({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        username: inputData.get("userid"),        
        order_id: inputData.get("order_id"),       
        note :  inputData.get("note"),       
    }

    // console.log(body);

    let response;
    await axios.post("api/product/CancelSubScribeOrder",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async ApproveSubScribeOrder({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        username: inputData.get("userid"),        
        order_id: inputData.get("order_id"),       
        note :  inputData.get("note"),       
    }

    // console.log(body);

    let response;
    await axios.post("api/product/ApproveSubScribeOrder",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async SentFamliyInviteOrder({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        username: inputData.get("userid"),        
        order_id: inputData.get("order_id"),       
        note :  inputData.get("note"),       
    }

    // console.log(body);

    let response;
    await axios.post("api/product/SentFamliyInviteOrder",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async SkipFamliyInviteOrder({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        username: inputData.get("userid"),        
        order_id: inputData.get("order_id"),       
        note :  inputData.get("note"),       
    }

    // console.log(body);

    let response;
    await axios.post("api/product/SkipFamliyInviteOrder",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async PaymentOrderWithSlip({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        //username: inputData.get("userid"),        
        order_id: inputData.get("order_id"),       
        email: inputData.get("email"),       
        slip_file_url: inputData.get("slip_file_url"),
        //note :  inputData.get("note"),       
    }

    // console.log(body);

    let response;
    await axios.post("api/product/PaymentOrderWithSlip",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async VerifySlipOrder({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        username: inputData.get("userid"),        
        order_id: inputData.get("order_id"),       
        slip_correct: inputData.get("slip_correct"),    
        note :  inputData.get("note"),       
        invite_link : inputData.get("invite_link"),
    }

    // console.log(body);

    let response;
    await axios.post("api/product/VerifySlipOrder",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async UpdateEndDateById({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        username: inputData.get("userid"),        
        id: inputData.get("id"),               
        end_date :  inputData.get("end_date"),               
    }

    // console.log(body);

    let response;
    await axios.post("api/product/UpdateEndDateById",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetOrderNearExpire({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        username: inputData.get("userid"),        
    }

    // console.log(body);

    let response;
    await axios.post("api/product/GetOrderNearExpire",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetOrderData({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        id: inputData.get("id"),
        user_id: inputData.get("user_id"),
    }

    let response;
    await axios.post("api/product/GetSubScribeOrderById",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetOrderExpired({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        username: inputData.get("userid"),        
    }

    // console.log(body);

    let response;
    await axios.post("api/product/GetOrderExpired",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async SentPaymentMessageOrder({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        username: inputData.get("userid"),        
        order_id: inputData.get("order_id"),       
        days_left: inputData.get("days_left"),       
    }

    // console.log(body);

    let response;
    await axios.post("api/product/SentPaymentMessageOrder",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async UpdatePersonalEmailStatus({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        orderId: inputData.get("orderId"),
        status: inputData.get("status"),
    }

    let response;
    await axios.put("api/personalemail/updatePersonalEmailStatusByOrderId", body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetPersonalEmailStatusByOrderId({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    const orderId = inputData.get("orderId");

    let response;
    await axios.get(`api/personalemail/getPersonalEmailStatusByOrderId/${orderId}`,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    ).catch(error => {
        response = error.response || { data: { status: 'error', message: 'Network error' } };
    });

    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async SentPaymentMessageNearOrder({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        username: inputData.get("userid"),        
        order_id: inputData.get("order_id"),       
        days_left: inputData.get("days_left"),       
    }

    console.log('SentPaymentMessageNearOrder - Request body:', body);

    let response;
    await axios.post("api/product/SentPaymentMessageNearOrder",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
        response = resp;
        }
    );

    console.log('SentPaymentMessageNearOrder - API Response:', response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async SentPaymentMessageExpired({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        username: inputData.get("userid"),        
        order_id: inputData.get("order_id"),       
        days_left: inputData.get("days_left"),       
    }

    console.log('SentPaymentMessageExpired - Request body:', body);

    let response;
    await axios.post("api/product/SentPaymentMessageExpired",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
        response = resp;
        }
    );

    console.log('SentPaymentMessageExpired - API Response:', response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetAllPersonalEmail({commit}, inputData) {
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    let response;
    await axios.get("api/personalemail/getAllPersonalEmail/",
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    ).catch(error => {
        response = error.response || { data: { status: 'error', message: 'Network error' } };
    });

    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetPersonalEmailByOrderId({commit}, inputData) {
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }
    
    const orderId = inputData.get("orderId");
    const username = inputData.get("username");

    let response;
    await axios.get(`api/personalemail/getPersonalEmailByOrderId/${orderId}`,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userdata': JSON.stringify({
          username: username
        }),
        'Authorization': `Bearer ${headers.token}`
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    ).catch(error => {
        response = error.response || { data: { status: 'error', message: 'Network error' } };
    });

    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetMemberEmail({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        selected_id: inputData.get("selected_id"),
        page_name: inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/member/getMemberEmail",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetLineProfileByLineSourceId({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        line_source_id: inputData.get("line_source_id"),
        page_name: inputData.get("page_name"),
        
    }

    // console.log(body);

    let response;
    await axios.post("api/member/getLineProfileByLineSourceId",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetEmailByLineSourceId({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        line_source_id: inputData.get("line_source_id"),
        page_name: inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/member/getEmailByLineSourceId",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetAllMemberEmail({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),        
        page_name: inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/member/getAllMemberEmail",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetSubscriptionType({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        searchWord: inputData.get("searchWord"),
        page_name: inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/subscriptiontype/GetSubscriptionType",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetProductSetting({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        searchWord: inputData.get("searchWord"),
        page_name: inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/product/GetProductSetting",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetActiveProductSetting({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        searchWord: inputData.get("searchWord"),
        page_name: inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/product/GetActiveProduct",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetSubscriptionGroup({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        searchWord: inputData.get("searchWord"),
        page_name: inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/subscriptiongroup/getSubscriptionGroup",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetSubscriptionGroupStock({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        searchWord: inputData.get("searchWord"),
        page_name: inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/subscriptiongroup/getSubscriptionGroupStock",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetSubscriptionGroupForReport({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        searchWord: inputData.get("searchWord"),
        page_name: inputData.get("page_name"),
    }

    let response;
    await axios.post("api/subscriptiongroup/getSubscriptionGroupForReport",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetActiveSubscriptionGroup({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        searchWord: inputData.get("searchWord"),
        page_name: inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/subscriptiongroup/getActiveSubscriptionGroup",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetSubscribeMemberByGroupById({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        id: inputData.get("id"),
        page_name: inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/subscriptiongroup/getSubscribeMemberByGroupById",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetSubscribeMemberByGroupStockById({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        id: inputData.get("id"),
        page_name: inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/subscriptiongroup/getSubscribeMemberByGroupStockById",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetGroupOfMemberByMemberId({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        user_id: inputData.get("user_id"),
        page_name: inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/subscriptiongroup/GetGroupOfMemberByMemberId",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetSubscribePaymentById({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        group_id: inputData.get("group_id"),
        page_name: inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/subscriptiongroup/getSubscribePaymentById",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetSubscribePaymentStockById({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        group_id: inputData.get("group_id"),
        page_name: inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/subscriptiongroup/getSubscribePaymentStockById",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async CreateSubScribeOrder({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {        
        username : null,
        page_name: null,
        user_id: inputData.get("user_id"),
        line_id: inputData.get("line_id"),
        email: inputData.get("email"),
        product_id: inputData.get("product_id"),
        note: inputData.get("note"),
    }

    // console.log(body);

    let response;
    await axios.post("api/product/CreateSubScribeOrder",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async AddMemberToGroup({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {        
        username : inputData.get("admin_id"),
        page_name: inputData.get("page_name"),
        user_id: inputData.get("user_id"),
        email: inputData.get("email"),
        group_id: inputData.get("group_id"),
    }

    // console.log(body);

    let response;
    await axios.post("api/subscriptiongroup/addMemberToGroup",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async AddMemberToGroupById({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {        
        username : inputData.get("admin_id"),
        page_name: inputData.get("page_name"),
        id: inputData.get("id"),        
        group_id: inputData.get("group_id"),
    }

    // console.log(body);

    let response;
    await axios.post("api/subscriptiongroup/addMemberToGroupById",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async AddPaymentNoteGroup({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {        
        username : inputData.get("admin_id"),
        page_name: inputData.get("page_name"),        
        group_id: inputData.get("group_id"),
        start_at: inputData.get("start_at"),
        end_at: inputData.get("end_at"),
        paid_amount: inputData.get("paid_amount"),
        paid_by: inputData.get("paid_by"),
        ref_img1: inputData.get("ref_img1"),
        ref_img2: inputData.get("ref_img2"),
    }

    // console.log(body);

    let response;
    await axios.post("api/subscriptiongroup/addPaymentNoteGroup",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async AddPaymentNoteGroupStock({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {        
        username : inputData.get("admin_id"),
        page_name: inputData.get("page_name"),        
        group_id: inputData.get("group_id"),
        start_at: inputData.get("start_at"),
        end_at: inputData.get("end_at"),
        paid_amount: inputData.get("paid_amount"),
        paid_by: inputData.get("paid_by"),
        ref_img1: inputData.get("ref_img1"),
        ref_img2: inputData.get("ref_img2"),
    }

    // console.log(body);

    let response;
    await axios.post("api/addPaymentNoteGroupStock/addPaymentNoteGroupStock",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetInterestType({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        searchWord: inputData.get("searchWord"),
    }

    // console.log(body);

    let response;
    await axios.post("api/interesttype/getActiveInterestType",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  }, 
  async GetInterestPeriod({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        searchWord: inputData.get("searchWord"),
    }

    // console.log(body);

    let response;
    await axios.post("api/interesttype/getInterestPeriod",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async CalculateLoanInterest({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        
        loan_amount: inputData.get("loan_amount"),
        interest: inputData.get("interest"),        
        interestper: inputData.get("interestper"),        
        interestpernumber: inputData.get("interestpernumber"),        
        loan_longtime_number: inputData.get("loan_longtime_number"),
        effective_rate: inputData.get("effective_rate"),
        period_id: inputData.get("period_id"),
        cal_every_number: inputData.get("cal_every_number"),
        loan_start_at: inputData.get("loan_start_at"),
    }

    // console.log(body);

    let response;
    await axios.post("api/loan/calculateLoanInterest",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async RequestLoan({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        member_id: inputData.get("member_id"),
        owner_admin_id: inputData.get("owner_admin_id"),
        interest_name: inputData.get("interest_name"),

        loan_amount: inputData.get("loan_amount"),
        interest: inputData.get("interest"),
        interestper: inputData.get("interestper"),
        interestpernumber: inputData.get("interestpernumber"),        
        loan_longtime_number: inputData.get("loan_longtime_number"),
        effective_rate: inputData.get("effective_rate"),
        period_id: inputData.get("period_id"),
        cal_every_number: inputData.get("cal_every_number"),
        loan_start_at: inputData.get("loan_start_at"),
        collateral_type_id: inputData.get("collateral_type_id"),

        collateral_img1: inputData.get("collateral_img1"),
        collateral_img2: inputData.get("collateral_img2"),
        collateral_img3: inputData.get("collateral_img3"),
        collateral_img4: inputData.get("collateral_img4"),
    }

    // console.log(body);

    let response;
    await axios.post("api/loan/requestLoan",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetRequestLoan({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        member_id: inputData.get("member_id"),        
    }

    // console.log(body);

    let response;
    await axios.post("api/loan/getRequestLoan",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetRejectLoan({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        member_id: inputData.get("member_id"),        
    }

    // console.log(body);

    let response;
    await axios.post("api/loan/GetRejectLoan",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetApproveLoan({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        member_id: inputData.get("member_id"),        
    }

    // console.log(body);

    let response;
    await axios.post("api/loan/GetApproveLoan",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetLoanPaymentByLoanId({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        loanId: inputData.get("loanId"),        
    }

    // console.log(body);

    let response;
    await axios.post("api/loan/getLoanPaymentByLoanId",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetShareLoanByLoanId({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        loanId: inputData.get("loanId"),        
    }

    // console.log(body);

    let response;
    await axios.post("api/loan/GetShareLoanByLoanId",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetLoanPaymentByPaymentId({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }
    
    var body = {
        paymentId: inputData.get("paymentId"),        
        
    }

    // console.log(body);

    let response;
    await axios.post("api/loan/getLoanPaymentByPaymentId",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetLoanOnDueDate({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        admin_id: inputData.get("admin_id"),
        page_name: inputData.get("page_name"),
        startDate: inputData.get("startDate"),
        endDate: inputData.get("endDate"),
    }

    // console.log(body);

    let response;
    await axios.post("api/loan/getLoanOnDueDate",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetLoanOverDueDate({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        admin_id: inputData.get("admin_id"),
        page_name: inputData.get("page_name"),
        startDate: inputData.get("startDate"),
        endDate: inputData.get("endDate"),
    }

    // console.log(body);

    let response;
    await axios.post("api/loan/getLoanOverDueDate",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetLoanPaidOrClosed({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        admin_id: inputData.get("admin_id"),
        page_name: inputData.get("page_name"),
        startDate: inputData.get("startDate"),
        endDate: inputData.get("endDate"),
    }

    // console.log(body);

    let response;
    await axios.post("api/loan/getLoanPaidOrClosed",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetLoanAll({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        admin_id: inputData.get("admin_id"),
        page_name: inputData.get("page_name"),
        startDate: inputData.get("startDate"),
        endDate: inputData.get("endDate"),
    }

    // console.log(body);

    let response;
    await axios.post("api/loan/getLoanAll",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetPagePermission({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }
    
    var body = {
        admin_id: inputData.get("admin_id"),
        page_name: inputData.get("page_name"),        
    }

    // console.log(body);

    let response;
    await axios.post("api/admin/getPagePermission",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async ApproveLoanById({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        id: inputData.get("id"),        
        admin_id: inputData.get("admin_id"),        
        approve_note: inputData.get("approve_note"),        
        sharePersonList: inputData.get("sharePersonList"),      
    }

    // console.log(body);

    let response;
    await axios.post("api/loan/approveLoanById",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async RejectLoanById({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        id: inputData.get("id"),        
        admin_id: inputData.get("admin_id"),        
        reject_note: inputData.get("reject_note"),        
    }

    // console.log(body);

    let response;
    await axios.post("api/loan/rejectLoanById",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetCollateralType({commit}, search) {
        
    var headers = {
        userid: search.get("userid"),
        token: search.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        searchWord: search.get("searchWord"),
    }

    // console.log(body);

    let response;
    await axios.post("api/interesttype/GetCollateralType",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetAllProvince({commit}, search) {
        
    var headers = {
        userid: search.get("userid"),
        token: search.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        // searchWord: search.get("searchWord"),
    }

    // console.log(body);

    let response;
    await axios.post("api/general/GetAllProvince",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetAllDistrict({commit}, search) {
        
    var headers = {
        userid: search.get("userid"),
        token: search.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        // searchWord: search.get("searchWord"),
    }

    // console.log(body);

    let response;
    await axios.post("api/general/GetAllDistrict",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetAllSubDistrict({commit}, search) {
        
    var headers = {
        userid: search.get("userid"),
        token: search.get("token"),
    }

    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        // userid: search.get("userid"),
        // token: search.get("token"),
        // searchWord: search.get("searchWord"),
    }

    // console.log(body);

    let response;
    await axios.post("api/general/GetAllSubDistrict",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },  
  async GetAllAdminActive({commit}, search) {
        
    var headers = {
        userid: search.get("userid"),
        token: search.get("token"),
    }

    
    var body = {
    
    }

    // console.log(body);

    let response;
    await axios.post("api/admin/GetAllAdminActive",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  }, 
  async AssignPaymentById({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        paymentId: inputData.get("paymentId"),        
        page_name: inputData.get("page_name"),        
        assign_to: inputData.get("assign_to"),        
    }

    // console.log(body);

    let response;
    await axios.post("api/loan/assignPaymentById",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async UpdateLoanPaymentByPaymentId({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        paymentId: inputData.get("paymentId"),       
        total_received_amount: parseFloat(inputData.get("total_received_amount")), 
        paid: inputData.get("paid"), 
        paid_at: inputData.get("paid_at"),  
        page_name:inputData.get("page_name"),
         
        ref_img1: inputData.get("ref_img1"), 
        note1: inputData.get("note1"), 
        note1_at: inputData.get("note1_at"), 
        note1_by: inputData.get("note1_by"), 

        ref_img2: inputData.get("ref_img2"), 
        note2: inputData.get("note2"), 
        note2_at: inputData.get("note2_at"), 
        note2_by: inputData.get("note2_by"), 

        ref_img3: inputData.get("ref_img3"), 
        note3: inputData.get("note3"), 
        note3_at: inputData.get("note3_at"), 
        note3_by: inputData.get("note3_by"), 

        ref_img4: inputData.get("ref_img4"), 
        note4: inputData.get("note4"), 
        note4_at: inputData.get("note4_at"), 
        note4_by: inputData.get("note4_by") 
        
    }

    // console.log(body);

    let response;
    await axios.post("api/loan/updateLoanPaymentByPaymentId",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async UpdateFinePaymentByPaymentId({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        paymentId: inputData.get("paymentId"),       
        fine_amount: parseFloat(inputData.get("fine_amount")), 
        notefine: inputData.get("notefine"),
        total_amount: parseFloat(inputData.get("total_amount")), 
        page_name:inputData.get("page_name"),
    }

    // console.log(body);

    let response;
    await axios.post("api/loan/updateFinePaymentByPaymentId",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async UpdateForwardPaymentByPaymentId({commit}, inputData) {
        
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    
    var body = {
        page_name:inputData.get("page_name"),
        paymentId: inputData.get("paymentId"),   
    }

    // console.log(body);

    let response;
    await axios.post("api/loan/updateForwardPaymentByPaymentId",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);
    if (response.data.status=="success") 
    {
      
    }
    return response;
  },
  async GetReportLoanAll({commit}, search) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

    var headers = {
        userid: search.get("userid"),
        token: search.get("token"),
    }

    var body = {        
        page_name: search.get("page_name"),
        startDate: search.get("startDate"),
        endDate: search.get("endDate"),
    }

    //console.log(body);

    let response;
    await axios.post("api/loan/getApproveLoanByOwner",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async GetPaidPayment({commit}, search) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

    var headers = {
        userid: search.get("userid"),
        token: search.get("token"),
    }

    var body = {        
        page_name: search.get("page_name"),
        startDate: search.get("startDate"),
        endDate: search.get("endDate"),
    }

    //console.log(body);

    let response;
    await axios.post("api/loan/getPaidPayment",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  async GetOldSummaryReport({commit}, inputData) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        userid: inputData.get("userid"),
        dateFrom : inputData.get("dateFrom"),
        dateTo : inputData.get("dateTo"),        
        page_name : inputData.get("page_name"),  
    }

    // console.log(body);

    let response;
    await axios.post("api/report/getOldSummaryReport",body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    // console.log(response);

    if (response.data.status=="success") 
    {
      
    }

    return response;

  },
  
  // New actions for personal_email API
  async GetEmailStatusByOrderId({commit}, inputData) {
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    const orderId = inputData.get("orderId");

    let response;
    await axios.get(`api/personal_email/getPersonalEmailStatusByOrderId/${orderId}`,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    if (response.data.status=="success") 
    {
      
    }

    return response;
  },
  
  async GetEmailByOrderId({commit}, inputData) {
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    const orderId = inputData.get("orderId");

    let response;
    await axios.get(`api/personal_email/getPersonalEmailByOrderId/${orderId}`,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    if (response.data.status=="success") 
    {
      
    }

    return response;
  },
  
  async UpdateEmailStatus({commit}, inputData) {
    var headers = {
        userid: inputData.get("userid"),
        token: inputData.get("token"),
    }

    var body = {
        orderId: inputData.get("orderId"),
        status: inputData.get("status"),
    }

    var purchase_type = inputData.get("purchase_type")
    var url = "api/personalemail/updatePersonalEmailStatusByOrderId"
    if (purchase_type=="email") {
        url = "api/personal_email/updatePersonalEmailStatusByOrderId"
    }

    let response;
    await axios.post(url, body,
    {
        headers: {            
        'Content-Type': 'application/json',
        'userid': headers.userid,
        'token': headers.token,
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );

    if (response.data.status=="success") 
    {
      
    }

    return response;
  },
  async CheckOutStripe({commit}, inputData) {

    try {
        var headers = {
            userid: inputData.get("userid"),
            token: inputData.get("token"),
        }
    
        var body = {
            amount: inputData.get("amount"),
            currency: inputData.get("currency"),
            username: inputData.get("username"),
            user_id: inputData.get("user_id"),
            server_id: inputData.get("server_id"),
            order_id: inputData.get("order_id"),
            description: inputData.get("description"),
            imageurl: inputData.get("imageurl"),
            email: inputData.get("email"),
            purchase_type: inputData.get("purchase_type"),
        }
    
        // อ่าน webhook URL จาก environment variable
        const webhookBaseUrl = process.env.VUE_APP_WEBHOOK_BASE_URL || 'http://localhost:11000';
        
        let response;
        await axios.post(`https://payment.allpremium.online/api/strippayment/checkout`, body,
        {
            headers: {            
            'Content-Type': 'application/json',
            'userid': headers.userid,
            'token': headers.token,
            }
        }).then(
            resp => 
            {  
                response = resp;
            }
        );
    
        if (response.data.status=="success") 
        {
          
        }
    
        return response;
    } catch (error) {
      console.log('CheckOutStripe error:', error);
      return {
        status: 'error',
        message: error.message,
      };
    }
   
  },
};

const mutations = {
  
};

export default {
  state,
  getters,
  actions,
  mutations,
};
