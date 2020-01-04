import React, { PureComponent } from 'react';
import styles from './style.scss';
import SearchBox from '@components/SearchBox';
import classNames from 'classnames';

class Header extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className={classNames(styles.header, 'd-flex')}>
        <i className={styles.logo} />
        <SearchBox onSearchButtonClick={this.props.onSearch} />
      </div>
    );
  }
}

interface Props {
  onSearch: (playlaod: string) => void;
}

export default Header;
