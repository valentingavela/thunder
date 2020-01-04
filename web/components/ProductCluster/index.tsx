import React, { PureComponent } from 'react';
import { IProduct } from '@models/shopping';
import styles from './style.scss';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ProductPrice from '@components/ProductPrice';

class ProductCluster extends PureComponent<Props> {
  shipping: string;

  constructor(props: Props) {
    super(props);

    const { free_shipping } = props.product;
    this.shipping = free_shipping && 'Envío gratis';
  }

  handleItemClick(productId: string) {
    this.props.history.push(`/items/${productId}/description`);
  }

  render() {
    const { id, picture, price, title } = this.props.product;
    const productUrl = `${this.props.location.pathname}/${id}`;

    return (
      <div className={styles.clusterContainer}>
        <a href={productUrl}>
          <div className={styles.imageContainer}>
            <img src={picture} className={styles.img} />
          </div>
        </a>
        <div className={styles.productStack}>
          <div className={styles.priceContainer}>
            <ProductPrice price={price} />
            {this.shipping && <span className={styles.shipping}>{this.shipping}</span>}
          </div>
          <h2 className={styles.productTitle}>
            <a href={productUrl}>
              <span>{title}</span>
            </a>
          </h2>
        </div>
      </div>
    );
  }
}

interface Props extends RouteComponentProps {
  product: IProduct;
}

export default withRouter(ProductCluster);
