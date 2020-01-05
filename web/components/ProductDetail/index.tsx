import React, { PureComponent } from 'react';
import { IProduct } from '@models/shopping';
import ProductPrice from '@components/ProductPrice';
import styles from './style.scss';
import classNames from 'classnames';

class ProductDetail extends PureComponent<Props> {
  condition: string;
  soldUnits: string;

  constructor(props: Props) {
    super(props);
    const { condition, sold_quantity } = props.product;
    this.condition = condition === 'new' ? 'Nuevo' : 'Usado';
    this.soldUnits =
      sold_quantity === 0
        ? null
        : sold_quantity > 1
        ? `${sold_quantity} vendidos`
        : `${sold_quantity} vendido`;
  }

  render() {
    const { picture, price, title, description } = this.props.product;
    return (
      <div className={classNames(styles.container, 'pt-3 pr-3 mb-3')}>
        <div className="d-flex">
          <img className={styles.img} src={picture} />
          <div>
            <div className={styles.condition}>
              <span>{this.condition}</span>
              {this.soldUnits && <span> | {this.soldUnits}</span>}
            </div>
            <h2 className={styles.title}>{title}</h2>
            <ProductPrice className={classNames('pb-3', styles.price)} price={price} />
            <div>
              <button className={styles.button}>Comprar</button>
            </div>
          </div>
        </div>
        <div className="pb-3 px-3">
          <h2>Descripción del producto</h2>
          <p className={classNames(styles.descriptionText, 'pr-3')}>{description}</p>
        </div>
      </div>
    );
  }
}

interface Props {
  product: IProduct;
}

export default ProductDetail;
