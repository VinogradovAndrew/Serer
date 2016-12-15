import React from 'react';
import styles from '../styles';

const Input = ({val, defaultVal, type, handleChange, placeholderText, stylesKey,isChecked,isDisabled}) => (
    <input
        onChange={handleChange}
        value={val}
        type={type || "text"}
        style={styles[stylesKey]}
        checked={isChecked}
        disabled={isDisabled}
        placeholder={placeholderText}
        className={(!type || type==="text") ? "form-control" : ""}/>
);

export default Input;