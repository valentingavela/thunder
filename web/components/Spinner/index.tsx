import React from 'react';
import classNames from 'classnames';
import styles from './style.scss';

function setSizeClass(size: string) {
  if (size === 'large') {
    return '-lg';
  }

  if (size === 'medium') {
    return '-md';
  }

  if (size === 'small') {
    return '-sm';
  }
}

const Spinner: React.SFC<SpinnerProps> = props => {
  const { size, direction, className, noFullscreen } = props;
  const sizeClass = setSizeClass(size);

  return (
    <div className={classNames(!noFullscreen && styles.fullscreen, styles[direction])}>
      <div className={classNames('loader', sizeClass, className)}>
        <div className={styles.ldsRing}>
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
};

Spinner.defaultProps = {
  direction: 'center',
  size: 'medium',
  noFullscreen: false,
};

interface SpinnerProps {
  size?: 'large' | 'small' | 'medium';
  direction?: 'left' | 'right' | 'center' | 'top';
  noFullscreen?: boolean;
  className?: string;
}

export default Spinner;
