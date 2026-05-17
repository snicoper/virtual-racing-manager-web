export const SiteUrls = {
  home: '/',

  auth: {
    login: '/auth/login',
    register: '/auth/register',
    verifyEmail: '/auth/verify-email',
    resendVerifyEmail: '/auth/resend-verify-email',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    logout: '/auth/logout',
  },

  errors: {
    notFound: '/errors/404',
    forbidden: '/errors/403',
  },
} as const;
