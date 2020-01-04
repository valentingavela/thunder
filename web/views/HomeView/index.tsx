import React, { PureComponent } from 'react';
import ProductCluster from '@components/ProductCluster';
import { IProduct } from '@models/shopping';

class HomeView extends PureComponent {
  render() {
    const product: IProduct = {
      id: 'MLA771862908',
      title: 'Corven Mirage 110 R/t 0km Cycles',
      condition: 'new',
      price: { currency: 'ARS', amount: 35900, decimals: 0 },
      picture: 'http://mla-s1-p.mlstatic.com/720206-MLA33063893049_122019-I.jpg',
      free_shipping: false,
    };
    return (
      <div>
        <ProductCluster product={product} />
      </div>
    );
  }
}

export default HomeView;
