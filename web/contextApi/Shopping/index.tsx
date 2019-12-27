import React from 'react';
import ProviderBase, { IProviderBaseState } from '@contextApi/ProviderBase';
import { IShopping } from '@models/shopping';

export const ShoppingContext = React.createContext<ShoppingContextState>({} as ShoppingContextState);

class ShoppingProvider extends ProviderBase<Props, ShoppingContextState, IShoppingData> {
  state: ShoppingContextState = {
    data: {
      shopping: window.__SHOPPING_JSON,
      username: window.__USERNAME__,
    },
    setData: this.setData,
  };

  render() {
    return <ShoppingContext.Provider value={this.state}>{this.props.children}</ShoppingContext.Provider>;
  }
}

interface Props {
  children: any;
}

export interface ShoppingContextState extends IProviderBaseState<IShoppingData> {
  data: IShoppingData;
}

export interface IShoppingData {
  shopping: IShopping;
  username: string;
}

export default ShoppingProvider;
