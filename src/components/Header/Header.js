import React from 'react';
import PropTypes from 'prop-types';
import { HeaderInput } from './HeaderInput/HeaderInput';

export const Header = (props) => {
  const { handleAddTask, task, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} className="header">
      <h1>todos</h1>
      <HeaderInput handleAddTask={handleAddTask} task={task} />
    </form>
  );
};

Header.propTypes = {
  handleAddTask: PropTypes.func.isRequired,
  task: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
