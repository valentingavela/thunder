import { lazy } from 'react';
import { RouteProps } from 'react-router';

const HomeView = lazy(() => import('@views/HomeView/index'));
const ItemsView = lazy(() => import('@views/ItemsView/index'));

export default [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/items/:itemId',
    component: ItemsView,
  },
] as RouteProps[];
