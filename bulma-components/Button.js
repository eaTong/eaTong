/**
 * Created by eatong on 17-11-10.
 */
import React from 'react';

const Button = props => {
  return (
    <button className={`button ${props.type ? 'is-' + props.type : ''} `}
            disabled={props.disabled}
            onClick={props.disabled ? undefined : props.onClick}>
      {props.children}
    </button>
  )
};
Button.propsType = {};

export default Button;
