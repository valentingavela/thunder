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
  handleButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const payload = this.state.searchBoxInput;
    this.props.onSearchButtonClick(payload);
  }

  render() {
    return (
      <form className={styles.form}>
        <input
          className={styles.input}
          onChange={this.handleInputChange}
          // TODO add translation in place of hardcoded text
          placeholder="Nunca dejes de buscar"
        />
        <button className={styles.button} onClick={this.handleButtonClick}>
          <i className={styles.icoMglass} />
        </button>
      </form>
    );
  }
}

interface Props {
  onSearchButtonClick: (payload: string) => void;
}

interface State {
  searchBoxInput: string;
}

export default SearchBox;
