import axios from "axios";
import useJwt from '@/auth/jwt/useJwt'

// const bcrypt = require('bcrypt');
// const saltRounds = 60;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

const state = {
  user: null,  
  pageAuthen : [],
  am_rank: 0,  
};

const getters = {
  isAuthenticated: (state) => !!state.user,  
  StateUser: (state) => state.user,
  pageAuthen : (state) => state.pageAuthen,
  am_rank : (state) => state.am_rank,
};

const actions = {
  async Register({dispatch}, form) {
    await axios.post('register', form)
    let UserForm = new FormData()
    UserForm.append('userid', form.username)
    UserForm.append('password', form.password)
    await dispatch('LogIn', UserForm)
  },
  async LogIn({commit}, user) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        userid: user.get("userid"),
        password: user.get("password"),
    }

    // console.log(body);

    let response;
    await axios.post("api/admin/login",body,
    {
        headers: {            
        'Content-Type': 'application/json'
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
      await commit("setUser", user.get("userid"));            
      localStorage.removeItem('amRank');
      localStorage.setItem('pageAuthen',response.data.pageAuthen);
      localStorage.setItem('amRank',response.data.am_rank);
      
    }

    return response;

  },
  async RefreshToken({dispatch}, user) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        userid: user.userid,
        token: user.token,
    }

    // console.log(body);

    let response;
    await axios.post("api/admin/refreshtoken",body,
    {
        headers: {            
        'Content-Type': 'application/json'
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
      // await commit("setUser", user.get("userid"));  
    }

    return response;

  },
  async LogOut({ commit }) {

    console.log("Logout");
    let user = null;
    await commit("logout", user);
    
    localStorage.removeItem('userData');
    localStorage.removeItem('pageAuthen');
    localStorage.removeItem('amRank');
    localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName);
    localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName);
  },
  async CheckStaffPageAuthen({dispatch}, form) {
    
    var body = {
        userid: form.userid,
        pagename: form.pagename,
    }


    // console.log(body);

    let response;
    await axios.post("api/staffgroup/checkstaffpageauthen",body,
    {
        headers: {            
        'Content-Type': 'application/json'
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
      // await commit("setUser", user.get("userid"));  
    }

    return response;

  },
  async CheckStaffPageAuthen2(context, form) {
    var body = {
        userid: form.userid,
        pagename: form.pagename,
    }

    let am_rank = localStorage.getItem("amRank");
    let pageAuthen = localStorage.getItem("pageAuthen");
    if (am_rank==4) 
    {
      return true;
    }
    
    if (pageAuthen) {
      // console.log(state.pageAuthen.indexOf(body.pagename));
      if(pageAuthen.indexOf(body.pagename)>-1)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    else
    {
      return false;
    }
  },
  async CheckGoogleAuthen({commit}, user) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
        otp: user.get("otp"),        
    }

    // console.log(body);

    let response;
    await axios.post("api/admin/GoogleAuthen",body,
    {
        headers: {            
        'Content-Type': 'application/json'
        }
    }).then(
        resp => 
        {
            response = resp;
        }
    );
    
    return response;

  },
  async GetTime({commit}, user) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
               
    }

    // console.log(body);

    let response;
    await axios.post("api/admin/getTime",body,
    {
        headers: {            
        'Content-Type': 'application/json'
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
  async GetGoogleAuthen({commit}, user) {
        
    //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);
    var body = {
               
    }

    // console.log(body);

    let response;
    await axios.post("api/admin/getGoogleAuthen",body,
    {
        headers: {            
        'Content-Type': 'application/json'
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
  async InsertUserEmail({commit}, formData) {
    console.log('InsertUserEmail action');
    
    let response;
    await axios.post("api/usersemail/insert", formData, {
      headers: {            
        'Content-Type': 'application/json'
      }
    }).then(
      resp => {
        response = resp;
      }
    ).catch(error => {
      console.error('InsertUserEmail error:', error);
      response = error.response || { data: { status: 'error', message: error.message } };
    });

    return response;
  },

  async InsertPersonalEmail({commit}, formData) {
    console.log('InsertPersonalEmail action');
    let response;
    await axios.post("api/personalemail/createPersonalEmail", formData, {
      headers: {            
        'Content-Type': 'application/json'
      }
    }).then(
      resp => {
        response = resp;
      }
    ).catch(error => {
      console.error('InsertPersonalEmail error:', error);
      response = error.response || { data: { status: 'error', message: error.message } };
    });

    return response;
  },

  
  async UpdateStatusRegis({commit}, formData) {
    console.log('UpdateStatusRegis action');
    
    let response;
    await axios.post("api/usersemail/updatestatus", formData, {
      headers: {            
        'Content-Type': 'application/json'
      }
    }).then(
      resp => {
        response = resp;
      }
    ).catch(error => {
      console.error('UpdateStatusRegis error:', error);
      response = error.response || { data: { status: 'error', message: error.message } };
    });

    return response;
  },
};

const mutations = {
  setUser(state, username) {
    state.user = username;    
  },
  
  logout(state, user) {
    state.user = user;    
  },

  


};

export default {
  state,
  getters,
  actions,
  mutations,
};
