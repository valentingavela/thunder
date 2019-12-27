import React, { PureComponent } from 'react';
import ShoppingProvider from './Shopping';

class AppProvidersContainer extends PureComponent<{ children: any }> {
  render() {
    return <ShoppingProvider>{this.props.children}</ShoppingProvider>;
  }
}

export default AppProvidersContainer;
