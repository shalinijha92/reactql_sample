import React from 'react';
import {
  Link,
} from 'react-router-dom';

import css from './header.scss';

export default () => {
  return (
    <div className={css.appHeader}>
      <ul className={css.headerBar}>
        <li className={css.headerItem}>
          <Link to="/" className={css.headerLink}>GridWall</Link>
        </li>
        <li className={css.cartInfo}>
          <Link className={css.headerLink} to={'/cart'}>
            Cart
          </Link>
        </li>
      </ul>
    </div>
  );
};

