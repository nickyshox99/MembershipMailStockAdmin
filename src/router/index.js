import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import apps from './routes/apps'
import dashboard from './routes/dashboard'
import pages from './routes/pages'
import customer from './routes/customer'
import customer2 from './routes/customer2'
import customer3 from './routes/customer3'
import customer4 from './routes/customer4'
import store from '@/store/index'
import useJwt from '@/auth/jwt/useJwt'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,  
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: 'order-wait-payment' } },
    ...apps,
    ...dashboard,    
    ...pages,      
    ...customer,
    // ...customer2,
    // ...customer3,
    // ...customer4,
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

 router.beforeEach(async (to, _, next) => {
  const isLoggedIn = isUserLoggedIn();
  
  let canGo = false;
  // console.log("Is login");  
  // console.log(isLoggedIn);

  if (to.name=="recommend-join-family"||to.name=="registeremail"||to.name=="buy-product"||to.name=="confirm-payment"||to.name=="select-topic"||to.name=="select-plan-type"||to.name=="user-regis" ) {
    return next()
  }
  
  if (isLoggedIn) 
  {
     //refresh token
     let userData = JSON.parse(localStorage.getItem('userData'))    
     const token =  JSON.parse(localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName));

     const expireAt = new Date(userData.expireAt);
     const tmpNow = new Date();
     console.log(expireAt);
     console.log(tmpNow);

     if (tmpNow > expireAt) 
     {
        console.log('token is expired');
        localStorage.removeItem('userData');
        localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName);
        localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName);
        return next({ name: 'auth-login' });
     }
     else
     {
        let response;
        store.dispatch('RefreshToken', { userid:userData.username,token:token.token }).then
        (
        res => {
          response=res;
          // console.log(response);
  
          if (response.data.status=='success') 
          {
            userData.token = response.data.token;
            userData.creatAt = response.data.createAt;
            userData.expireAt = response.data.expireAt;
      
            localStorage.setItem('userData',JSON.stringify(userData));
            localStorage.setItem(useJwt.jwtConfig.storageTokenKeyName,JSON.stringify({token:response.data.token}));
            localStorage.setItem(useJwt.jwtConfig.storageRefreshTokenKeyName,JSON.stringify({token:response.data.token})); 
            console.log('Refresh Token Success');
          }
        }
      )
     }

     console.log(to.name);    
     if (to.name!="misc-not-authorized" && to.name!="auth-login" && to.name!="error-404") {      
        let response;
        
        await store.dispatch('CheckStaffPageAuthen2', { userid:userData.username, pagename : to.name }).then
        (
        res => 
          {
            canGo=res;
            // console.log(to.name+":"+canGo);            
          }
        );
     }
     else
     {
        // go misc-not-authorized or auth-login
        canGo = true;
     }
    
  }
  

  if (!canGo && to.name!="auth-login" && to.name!="misc-not-authorized" && to.name!="error-404") 
  {

    // Redirect to login if not logged in    
    // console.log("isLoggedIn");
    // console.log(isLoggedIn);
    if (!isLoggedIn)
    {
      return next({ name: 'misc-not-authorized' });
    } 
    else
    {      
      return next({ name: 'misc-not-authorized' });
    }    
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    next({name: 'order-wait-payment'});
  }

  return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
