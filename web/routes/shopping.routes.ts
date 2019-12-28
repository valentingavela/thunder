import { lazy } from 'react';
import { RouteProps } from 'react-router';

const Shopping = lazy(() => import('@views/Search/index'));

export default [
  {
    path: '**/',
    component: Shopping,
  },
] as RouteProps[];
