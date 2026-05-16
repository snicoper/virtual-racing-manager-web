export const SiteUrls = {
  home: '/',

  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },

  errors: {
    notFound: '/errors/404',
    forbidden: '/errors/403',
  },
} as const;
