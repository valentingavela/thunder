import React, { PureComponent, Suspense } from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import shoppingRoutes from './shopping.routes';
import Spinner from '@components/Spinner';
import { navigateToError, getNavigationPath } from '@utils/navigation.utils';

class Routes extends PureComponent {
  myRoutes: RouteProps[] = [...shoppingRoutes];

  routesMapping = (route: RouteProps, i: number) => <Route exact {...route} key={i} />;

  notFoundComponent(): JSX.Element {
    navigateToError('404');

    return null;
  }

  render() {
    const AppRoutes = this.myRoutes.map(this.routesMapping);
    const NotFound = this.notFoundComponent;
    const notFoundPath = getNavigationPath('404');

    return (
      <div>
        <Suspense fallback={<Spinner size="large" />}>
          <Switch>
            {AppRoutes}
            <Route exact path={notFoundPath} component={NotFound} />
            <Redirect to={notFoundPath} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default Routes;
