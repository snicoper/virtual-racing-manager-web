import { Routes } from '@angular/router';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ResendVerifyEmail } from './pages/resend-verify-email/resend-verify-email';
import { ResetPassword } from './pages/reset-password/reset-password';
import { VerifyEmail } from './pages/verify-email/verify-email';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    title: 'Login',
  },
  {
    path: 'register',
    component: Register,
    title: 'Register',
  },
  {
    path: 'verify-email',
    component: VerifyEmail,
    title: 'Verify Email',
  },
  {
    path: 'resend-verify-email',
    component: ResendVerifyEmail,
    title: 'Resend Verification Email',
  },
  {
    path: 'forgot-password',
    component: ForgotPassword,
    title: 'Forgot Password',
  },
  {
    path: 'reset-password',
    component: ResetPassword,
    title: 'Reset Password',
  },
];
