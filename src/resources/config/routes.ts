import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/',
    component: '@/layouts/BridgeLayout',
    routes: [
      {
        path: '/home',
        exact: true,
        component: './Home',
      },
      {
        path: '/replace',
        exact: true,
        component: './Replace',
      },
      {
        path: '/table',
        component: './Table',
        exact: true,
      },
    ],
  },
];

export default routes;
