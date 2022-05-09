import React from 'react';
import { Redirect } from 'react-router-dom';

// Authentication related pages
import Login from '../pages/Authentication/Login';
import Logout from '../pages/Authentication/Logout';
import Register from '../pages/Authentication/Register';
import ForgetPwd from '../pages/Authentication/ForgetPassword';
import AuthLockScreen from '../pages/Authentication/AuthLockScreen';

// Dashboard
import Dashboard from '../pages/Dashboard/index';

import Maintenance from '../pages/Utility/Maintenance';
import CommingSoon from '../pages/Utility/CommingSoon';
import Error404 from '../pages/Utility/Error404';
import Error500 from '../pages/Utility/Error500';

import usersDataTable from '../pages/Tables/usersDataTable';
import TranactionTable from '../pages/Tables/TransactionTable';
import OrderTable from '../pages/Tables/OrderTable';
import withdrawtable from '../pages/Tables/withdrawtable';

import Profile from '../pages/TopBarMenu/profile';
import Settings from '../pages/TopBarMenu/settings';

const authProtectedRoutes = [
  { path: '/users', component: usersDataTable },

  { path: '/transactions', component: TranactionTable },

  { path: '/orders', component: OrderTable },

  { path: '/withdraw-requests', component: withdrawtable },

  { path: '/dashboard', component: Dashboard },

  { path: '/settings', component: Settings },

  { path: '/profile', component: Profile },

  // this route should be at the end of all other routes
  { path: '/', exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  { path: '/logout', component: Logout },
  { path: '/login', component: Login },
  { path: '/forgot-password', component: ForgetPwd },
  { path: '/register', component: Register },
  { path: '/lock-screen', component: AuthLockScreen },
  { path: '/maintenance', component: Maintenance },
  { path: '/comingsoon', component: CommingSoon },
  { path: '/404', component: Error404 },
  { path: '/500', component: Error500 },
];

export { authProtectedRoutes, publicRoutes };
