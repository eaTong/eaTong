/**
 * Created by eatong on 18-1-24.
 */
import React from 'react';

const Notice = props => {
  const birthday = new Date('2018-01-22 19:22:00');
  const days = Math.round((new Date().getTime() - birthday.getTime()) / (1000 * 60 * 60 * 24));
  return (
    <div className="notification is-primary has-text-centered">
      <span>2018-01-22 喜得一千金! &nbsp;</span>
      <span className="tag">{` ${days}天`}</span>
    </div>
  )
};
Notice.propsType = {};

export default Notice;
