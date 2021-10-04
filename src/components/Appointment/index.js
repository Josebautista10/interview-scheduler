import React from 'react';

import './styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Status from './Status';
import Form from './Form';

import useVisualMode from "hooks/useVisualMode";

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';



const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );
    
    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING)
      props.bookInterview(props.id, interview)
        .then(() => transition(SHOW))
    }

  return (
    <article className='appointment'>
      <Header time={props.time} />

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          save={save}
        />
      )}
      {mode === SAVING && <Status />}
    </article>
  );
};

export default Appointment;
