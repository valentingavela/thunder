import { lazy } from 'react';
import { RouteProps } from 'react-router';

const SearchView = lazy(() => import('@views/SearchView/index'));

export default [
  {
    path: '**/',
    component: SearchView,
  },
] as RouteProps[];
