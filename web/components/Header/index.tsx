import React, { PureComponent } from 'react';
import styles from './style.scss';
import SearchBox from '@components/SearchBox';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { parse } from 'query-string';

class Header extends PureComponent<Props> {
  initialValue: string;

  constructor(props: Props) {
    super(props);
    const { q } = parse(location.search);
    this.initialValue = q as string;
  }

  render() {
    return (
      <div className={classNames(styles.header, 'd-flex')}>
        <Link to="/">
          <div className={classNames('pr-1', styles.logo)} />
        </Link>
        <SearchBox initialValue={this.initialValue} onSearchButtonClick={this.props.onSearch} />
      </div>
    );
  }
}

interface Props {
  onSearch: (playlaod: string) => void;
}

export default Header;
