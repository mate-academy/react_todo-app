import React from 'react';
import PropTypes from 'prop-types';

import Toggle from '../Toggle/Toggle';
import Destroy from '../Destroy/Destroy';

const View = (props) => {
  const {
    index,
    title,
    id,
    completed,
    toggleCompleted,
    onEdit,
    destroyTodo,
  } = props;

  return (
    <div className="view">
      <Toggle
        index={index}
        title={title}
        id={id}
        completed={completed}
        onEdit={onEdit}
        toggleCompleted={toggleCompleted}
      />
      <Destroy id={id} destroyTodo={destroyTodo} />
    </div>
  );
};

export default View;

View.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  destroyTodo: PropTypes.func.isRequired,
};
