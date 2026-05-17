export const ApiUrls = {
  auth: {
    login: '/auth/login',
    refreshToken: '/auth/refresh-token',
    currentUser: '/auth/me',
    register: '/auth/register',
    verifyEmail: '/auth/verify-email',
    resendVerifyEmail: '/auth/resend-verify-email',
  },
} as const;
