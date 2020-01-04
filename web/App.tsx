import React, { PureComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ErrorBoundary from '@utils/ErrorBoundary';
import { bind } from 'decko';
import Routes from './routes';
import Header from '@components/Header';

class App extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  @bind
  handleSearch(payload: string) {
    this.props.history.push(`/items/${payload}`);
  }

  render() {
    return (
      <ErrorBoundary>
        <Header onSearch={this.handleSearch} />
        <Routes />
      </ErrorBoundary>
    );
  }
}

type Props = RouteComponentProps;

export default withRouter(App);
