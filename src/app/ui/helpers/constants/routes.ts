export const ROUTES = {
  Home: '',
  Tasks: 'tasks',
  Auth: 'auth',
  Login: 'login',
  Register: 'register',
  Admin: 'admin-123xyz',
  NotFound: '404',
};

export const COMPLETE_ROUTES = {
  Home: `/${ROUTES.Home}`,
  Tasks: `/${ROUTES.Tasks}`,
  Auth: `/${ROUTES.Auth}`,
  Login: `/${ROUTES.Auth}/${ROUTES.Login}`,
  Register: `/${ROUTES.Auth}/${ROUTES.Register}`,
  Admin: `/${ROUTES.Admin}`,
  NotFound: `/${ROUTES.NotFound}`,
};
