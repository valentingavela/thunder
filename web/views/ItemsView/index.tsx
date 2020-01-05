import React, { PureComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { bind } from 'decko';
import SearchServices from '@services/search.services';
import { IProduct } from '@models/shopping';
import ProductCluster from '@components/ProductCluster';
import Spinner from '@components/Spinner';
import styles from './style.scss';
import classNames from 'classnames';
import { parse } from 'query-string';
import ProductNotFound from '@components/ProductNotFound';

class ItemsView extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { products: [], loading: true };
  }

  componentDidMount() {
    const { q } = parse(this.props.location.search);
    this.searchProducts(q as string);

    this.searchOnUrlChange();
  }

  @bind
  searchOnUrlChange() {
    this.props.history.listen(location => {
      const { q } = parse(location.search);
      this.searchProducts(q as string);
    });
  }

  @bind
  searchProducts(productId: string) {
    this.setState({ loading: true });
    SearchServices.getProducts(productId).then(response => {
      const resultsFound = !!response.items && response.items.length > 0;
      this.setState({ products: resultsFound ? response.items : [], loading: false });
    });
  }

  render() {
    const { loading, products } = this.state;
    return (
      <div className={classNames('d-flex', styles.itemsContainer)}>
        {loading ? (
          <Spinner size={'large'} />
        ) : (
          <div>
            {products.length === 0 ? (
              <ProductNotFound />
            ) : (
              products.map((product, i) => (
                <div key={i} className="mb-1">
                  <ProductCluster product={product} />
                </div>
              ))
            )}
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
