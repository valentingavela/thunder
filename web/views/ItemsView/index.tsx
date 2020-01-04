import React, { PureComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { bind } from 'decko';
import SearchServices from '@services/search.services';
import { getURLParams } from '@utils/navigation.utils';
import { IProduct } from '@models/shopping';
import ProductCluster from '@components/ProductCluster';
import Spinner from '@components/Spinner';
import styles from './style.scss';
import classNames from 'classnames';

class ItemsView extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { products: [], loading: true };
  }

  componentDidMount() {
    const { productId } = getURLParams(this.props.location.pathname);
    this.searchProducts(productId);

    this.props.history.listen(location => {
      const { productId: id } = getURLParams(location.pathname);
      this.searchProducts(id);
    });
  }

  @bind
  searchProducts(productId: string) {
    this.setState({ loading: true });
    SearchServices.getProducts(productId).then(response =>
      this.setState({ products: response.items, loading: false }),
    );
  }

  render() {
    return (
      <div className={classNames('d-flex', styles.itemsContainer)}>
        {this.state.loading ? (
          <Spinner size={'large'} />
        ) : (
          <div>
            {this.state.products.map((product, i) => (
              <div className="mb-1">
                <ProductCluster key={i} product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

interface State {
  loading: boolean;
  products: IProduct[];
}

type Props = RouteComponentProps;

export default withRouter(ItemsView);
