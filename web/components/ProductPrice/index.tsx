import React, { PureComponent } from 'react';
import styles from './style.scss';
import classNames from 'classnames';

class ProductPrice extends PureComponent<Props> {
  priceSymbol: string;

  constructor(props: Props) {
    super(props);
    this.priceSymbol = props.price.currency === 'USD' ? 'U$S' : '$';
  }

  render() {
    const { price, className } = this.props;
    const { amount, decimals } = price;
    return (
      <div className={classNames('d-flex', className)}>
        <span className={styles.priceSymbol}>{this.priceSymbol}</span>
        <span>{amount}</span>
        {decimals > 0 && <span className={styles.decimals}>{decimals}</span>}
      </div>
    );
  }
}

interface Props {
  price: { currency: string; amount: number; decimals: number };
  className?: string;
}

export default ProductPrice;
