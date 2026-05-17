export const SiteUrls = {
  home: '/',

  auth: {
    login: '/auth/login',
    register: '/auth/register',
    verifyEmail: '/auth/verify-email',
    resendVerifyEmail: '/auth/resend-verify-email',
  },

  errors: {
    notFound: '/errors/404',
    forbidden: '/errors/403',
  },
} as const;
