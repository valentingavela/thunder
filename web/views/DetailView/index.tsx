import React, { PureComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { bind } from 'decko';
import SearchServices from '@services/search.services';
import { IProduct } from '@models/shopping';
import Spinner from '@components/Spinner';
import styles from './style.scss';
import classNames from 'classnames';
import { getURLParams } from '@utils/navigation.utils';
import ProductDetail from '@components/ProductDetail';

class DetailsView extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { product: null, loading: true };
  }

  componentDidMount() {
    const { productId } = getURLParams(this.props.location.pathname);
    this.searchProducts(productId);
  }

  @bind
  searchProducts(productId: string) {
    this.setState({ loading: true });
    SearchServices.getProductDetail(productId).then(response =>
      this.setState({ product: response.item, loading: false }),
    );
  }

  render() {
    return (
      <div className={classNames('d-flex', styles.itemsContainer)}>
        {this.state.loading ? (
          <Spinner size={'large'} />
        ) : (
          <div>{this.state.product && <ProductDetail product={this.state.product} />}</div>
        )}
      </div>
    );
  }
}

interface State {
  loading: boolean;
  product: IProduct;
}

type Props = RouteComponentProps;

export default withRouter(DetailsView);
