import React, { PureComponent } from 'react';
import ErrorBoundary from '@utils/ErrorBoundary';
import { withRouter, RouteComponentProps } from 'react-router-dom';
// tslint:disable-next-line: no-implicit-dependencies
import Routes from 'web/routes';

class App extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
    );
  }
}

type Props = RouteComponentProps;

export default withRouter(App);
