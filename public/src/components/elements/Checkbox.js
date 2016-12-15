import React from 'react';
import styles from '../styles';

const Checkbox = ({handleChange,children,stylesKey,classNames,isChecked}) => (
    <div className={classNames || "checkbox col-sm-4"}>
        <label>
            <input style={styles[stylesKey]}
                   onChange={handleChange}
                   type="checkbox"
                   checked={isChecked}
                   value=""/>{children}
        </label>
    </div>
);

export default Checkbox;