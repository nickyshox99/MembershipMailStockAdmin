// Theme Colors - White, Black, Red Theme with proper status colors
export const $themeColors = {
  primary: '#dc3545',    // Red for primary actions
  secondary: '#000000',  // Black for secondary
  success: '#28c76f',    // Green for positive status (active, enabled, success)
  info: '#00cfe8',       // Blue for information
  warning: '#ff9f43',    // Orange for warnings
  danger: '#dc3545',     // Red for negative status (inactive, disabled, error)
  light: '#ffffff',      // White
  dark: '#000000'        // Black
}

// App Breakpoints
// Initially this will be blank. Later on when app is initialized we will assign bootstrap breakpoints to this object from CSS variables.
export const $themeBreakpoints = {}

// APP CONFIG
export const $themeConfig = {
  app: {
    
    appName: 'MemberShip', // Will update name in navigation menu (Branding)
    // eslint-disable-next-line global-require
    appLogoImage: require('@/assets/images/logo/logo1.png'), // Will update logo in navigation menu (Branding)
  },
  layout: {
    isRTL: false,
    skin: 'light', // light, dark, bordered, semi-dark
    routerTransition: 'fade', // zoom-fade, slide-fade, fade-bottom, fade, zoom-out, none
    type: 'vertical', // vertical, horizontal
    contentWidth: 'full', // full, boxed
    menu: {
      hidden: false,
      isCollapsed: true,
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: 'static', // static , sticky , floating, hidden
      backgroundColor: 'primary', // BS color options [primary, success, etc]
    },
    footer: {
      type: 'static', // static, sticky, hidden
    },
    customizer: true,
    enableScrollToTop: true,
  },
}
