import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/',
    component: '@/layouts/BridgeLayout',
    routes: [
      {
        path: '/systemInfo',
        exact: true,
        component: './SystemInfo',
      },
      {
        path: '/replace',
        exact: true,
        component: './Replace',
      },
    ],
  },
];

export default routes;
