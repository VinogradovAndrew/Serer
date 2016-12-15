import React from 'react';

const Button = ({handleClick, children, classNames}) => (
    <div className="input-group-btn">
         <button onClick={handleClick}
                 className={classNames || "btn btn-secondary"}
                 type="button">{children}</button>
    </div>
);

export default Button;