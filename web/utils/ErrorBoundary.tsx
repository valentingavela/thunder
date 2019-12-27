import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { navigateToError } from '@utils/navigation.utils';
import { __IS_PRODUCTION__ } from '@constants/global';

class ErrorBoundary extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    // for async cases
    window.onunhandledrejection = (event: any) => {
      this.logAndRedirect(event.reason.toString(), { redirect: false });
    };
  }

  async logAndRedirect(_errorMessage: object, { redirect }: HandleErrorOptions) {
    if (redirect && __IS_PRODUCTION__) navigateToError('500');
  }

  componentDidCatch(error: Error) {
    // for sync cases

    this.logAndRedirect(error, { redirect: true });
  }

  render() {
    return this.props.children;
  }
}
type routesType = RouteComponentProps<null>;

interface Props extends routesType {
  children: any;
}

interface HandleErrorOptions {
  redirect: boolean;
}

export default withRouter(ErrorBoundary);
