import React, { PureComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { bind } from 'decko';
import SearchServices from '@services/search.services';
import { IProduct, ICategory } from '@models/shopping';
import ProductCluster from '@components/ProductCluster';
import Spinner from '@components/Spinner';
import styles from './style.scss';
import classNames from 'classnames';
import { parse } from 'query-string';
import ProductNotFound from '@components/ProductNotFound';
import BreadCrumb from '@components/BreadCrumb';

class ItemsView extends PureComponent<Props, State> {
  searchHandler: any;

  constructor(props: Props) {
    super(props);
    this.state = { products: [], loading: true, categories: [] };
  }

  componentDidMount() {
    const { q } = parse(this.props.location.search);
    this.searchProducts(q as string);

    this.searchHandler = this.searchOnUrlChange();
  }

  componentWillUnmount() {
    this.searchHandler();
  }

  @bind
  searchOnUrlChange() {
    return this.props.history.listen(location => {
      const { q } = parse(location.search);
      this.searchProducts(q as string);
    });
  }

  @bind
  searchProducts(productId: string) {
    this.setState({ loading: true }, () => {
      SearchServices.getProducts(productId).then(response => {
        const resultsFound = !!response.items && response.items.length > 0;
        this.setState({
          products: resultsFound ? response.items : [],
          loading: false,
          categories: response.categories,
        });
      });
    });
  }

  render() {
    const { loading, products, categories } = this.state;
    return (
      <div className={classNames('d-flex', styles.itemsContainer)}>
        {loading ? (
          <Spinner size={'large'} />
        ) : (
          <div>
            <div className="pb-3">
              <BreadCrumb categories={categories} />
            </div>
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
  categories: ICategory[];
}

type Props = RouteComponentProps;

export default withRouter(ItemsView);
