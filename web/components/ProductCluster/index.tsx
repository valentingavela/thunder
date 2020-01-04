import React, { PureComponent } from 'react';
import { IProduct } from '@models/shopping';
import styles from './style.scss';
import { bind } from 'decko';
import { withRouter, RouteComponentProps } from 'react-router-dom';

class ProductCluster extends PureComponent<Props> {
  priceSymbol: string;
  shipping: string;

  constructor(props: Props) {
    super(props);

    const { free_shipping, price } = props.product;
    this.priceSymbol = price.currency === 'USD' ? 'U$S' : '$';
    this.shipping = free_shipping && 'Envío gratis';
  }

  @bind
  price({ price }: { price: { currency: string; amount: number; decimals: number } }) {
    const { amount, decimals } = price;
    return (
      <div className="d-flex">
        <span className={styles.priceSymbol}>{this.priceSymbol}</span>
        <span>{amount}</span>
        {decimals > 0 && <span className={styles.decimals}>{decimals}</span>}
      </div>
    );
  }

  handleItemClick(productId: string) {
    this.props.history.push(`/items/${productId}/description`);
  }

  render() {
    const { id, picture, price, title } = this.props.product;
    const PriceContent = this.price;

    return (
      <div className={styles.clusterContainer}>
        <a onClick={_e => this.handleItemClick(id)}>
          <div className={styles.imageContainer}>
            <img src={picture} className={styles.img} />
          </div>
        </a>
        <div className={styles.productStack}>
          <div className={styles.priceContainer}>
            <PriceContent price={price} />
            {this.shipping && <span className={styles.shipping}>{this.shipping}</span>}
          </div>
          <h2 className={styles.productTitle}>
            <a onClick={_e => this.handleItemClick(id)}>
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
