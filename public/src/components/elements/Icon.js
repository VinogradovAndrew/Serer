import React from 'react';
import styles from '../styles';

const Icon = ({handleClick, stylesKey, classNames}) => (
    <span onClick={handleClick}
          style={styles[stylesKey]}
          className={classNames}/>
);

export default Icon;