import React, { PureComponent } from 'react';
import styles from './style.scss';
import classNames from 'classnames';

class BreadCrumb extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className={classNames('d-flex', styles.breadcrumb)}>
        {this.props.categories.map((category, i) => {
          const shouldShowSeparator = this.props.categories.length > i + 1;
          return (
            <div key={i}>
              <a>
                <span>{category.name}</span>
              </a>
              {shouldShowSeparator && <span className="px-1"> > </span>}
            </div>
          );
        })}
      </div>
    );
  }
}

interface Props {
  categories: {
    id: string;
    name: string;
  }[];
}

export default BreadCrumb;
