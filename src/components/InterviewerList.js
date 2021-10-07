import React from 'react';
import PropTypes from 'prop-types';
import './InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';

const InterviewerList = (props) => {
  const { interviewers, value, onChange } = props;

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };

  const interviewerList = interviewers.map((interviewerObj) => {
    return (
      <InterviewerListItem
        key={interviewerObj.id}
        name={interviewerObj.name}
        avatar={interviewerObj.avatar}
        selected={interviewerObj.id === value}
        setInterviewer={() => onChange(interviewerObj.id)}
      />
    );
  });

  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>interviewer</h4>
      <ul className='interviewers__list'>{interviewerList}</ul>
    </section>
  );
};

export default InterviewerList;
