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
              <div key={i} className="mb-1">
                <ProductCluster product={product} />
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
