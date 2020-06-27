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
        path: '/test',
        exact: true,
        component: './TestField',
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
      {
        path: '/toolbar',
        component: './Toolbar',
        exact: true,
      },
    ],
  },
];

export default routes;
