export const ApiUrls = {
  auth: {
    login: '/auth/login',
    refreshToken: '/auth/refresh-token',
    currentUser: '/auth/me',
    register: '/auth/register',
    verifyEmail: '/auth/verify-email',
    resendVerifyEmail: '/auth/resend-verify-email',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
} as const;
