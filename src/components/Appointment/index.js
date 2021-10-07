import React from 'react';

import './styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import Form from './Form';

import useVisualMode from 'hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  const deleteAppt = (id) => {
    transition(DELETING, true);
    props
      .cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  return (
    <article className='appointment'>
      <Header time={props.time} />

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message='Saving' />}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === CONFIRM && (
        <Confirm
          message='Are you sure you would like to delete this appointment?'
          onCancel={() => back()}
          save={save}
          onConfirm={() => deleteAppt(props.id)}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message='Could not make this appointment'
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message='Could not cancel appointment' onClose={() => back()} />
      )}
    </article>
  );
};

export default Appointment;
