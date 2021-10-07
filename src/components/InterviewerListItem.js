import classNames from 'classnames';
import React from 'react';

import './InterviewerListItem.scss';

const InterviewerListItem = (props) => {
  const { id, name, avatar, setInterviewer, selected } = props;

  const imgContainer = classNames('interviewers__item', {
    'interviewers__item--selected': selected
  });
  return (
    <li className={imgContainer} onClick={setInterviewer}>
      <img
        key={id}
        className='interviewers__item-image'
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;
