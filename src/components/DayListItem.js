import React from 'react';

import './DayListItem.scss'

import classnames from 'classnames';

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  
  const containerClass = classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });
  
  const formatSpots = (spots) => {
    if (spots === 0) {
      return <h3>no spots remaining</h3>
    } else if (spots === 1) {
      return <h3>1 spot remaining</h3>
    }
      return <h3>{spots} spots remaining</h3>
  }


  return ( 
    <li className={containerClass} onClick={setDay}>
      <h2 >{props.name}</h2>
      {formatSpots(spots)}
    </li>
  );
}

