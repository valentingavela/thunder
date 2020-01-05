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
    this.props.history.push(`/items?q=${payload}`);
  }

  render() {
    return (
      <ErrorBoundary>
        <div className="mb-3">
          <Header onSearch={this.handleSearch} />
        </div>
        <Routes />
      </ErrorBoundary>
    );
  }
}

type Props = RouteComponentProps;

export default withRouter(App);
