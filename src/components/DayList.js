import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  const { days, value, onChange } = props;

  const dayList = days.map((currentDay) => {
    return (
      <DayListItem
        key={currentDay.id}
        name={currentDay.name}
        spots={currentDay.spots}
        selected={currentDay.name === value}
        setDay={() => onChange(currentDay.name)}
      />
    );
  });

  return <ul>{dayList}</ul>;
}
