import { lazy } from 'react';
import { RouteProps } from 'react-router';

const HomeView = lazy(() => import('@views/HomeView/index'));
const ItemsView = lazy(() => import('@views/ItemsView/index'));
const DetailView = lazy(() => import('@views/DetailView/index'));

export default [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/items',
    component: ItemsView,
  },
  {
    path: '/items/:productId',
    component: DetailView,
  },
] as RouteProps[];
