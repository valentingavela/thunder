import React, { PureComponent, ChangeEvent } from 'react';
import styles from './style.scss';
import { bind } from 'decko';
import _debounce from 'lodash/debounce';

class SearchBox extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { searchBoxInput: '' };
  }

  @bind
  handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ searchBoxInput: e.target.value });
  }

  @bind
  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = this.state.searchBoxInput;
    this.props.onSearchButtonClick(payload);
  }

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <input
          className={styles.input}
          onChange={this.handleInputChange}
          defaultValue={this.props.initialValue}
          // TODO add translation in place of hardcoded text
          placeholder="Nunca dejes de buscar"
        />
        <button className={styles.button}>
          <i className={styles.icoMglass} />
        </button>
      </form>
    );
  }
}

interface Props {
  onSearchButtonClick: (payload: string) => void;
  initialValue?: string;
}

interface State {
  searchBoxInput: string;
}

export default SearchBox;
