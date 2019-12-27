import { PureComponent } from 'react';
import { bind } from 'decko';

class ProviderBase<T, K, M> extends PureComponent<T, K, M> {
  @bind
  setData<J extends keyof M>(newState: CustomState<M, J>, callback?: () => void) {
    // @ts-ignore
    const data = Object.assign({}, this.state.data, newState);
    // @ts-ignore
    this.setState({ data }, callback);
  }
}

export interface IProviderBaseState<M> {
  setData: <K extends keyof M>(state: CustomState<M, K>, callback?: () => void) => void;
}

type CustomState<M, K extends keyof M> =
  | ((prevState: Readonly<M>) => Pick<M, K> | M | null)
  | (Pick<M, K> | M | null);

export default ProviderBase;
