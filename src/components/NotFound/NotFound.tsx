import { Link } from 'react-router-dom';

import icon from './img/sad.svg';
import React from 'react';

import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFound__container}>
      {' '}
      <div className={styles.icon__container}>
        <img src={icon} alt="sad smile"></img>
      </div>
      <h1>Noting found</h1>
      <Link className="button" to="..">
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
