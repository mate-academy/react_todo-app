import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodosList/TodosList';
import ToggleInput from './ToggleInput/ToggleInput';

const TodosContainer = (props) => {
  const { todos,
    toggleAllCompleted,
    isCompleted,
    deleteTodo } = props;

  return (
    <section className="main">
      <ToggleInput
        toggleAllCompleted={toggleAllCompleted}
      />

      <TodoList
        todos={todos}
        isCompleted={isCompleted}
        deleteTodo={deleteTodo}
      />
    </section>
  );
};

TodosContainer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ).isRequired,
  toggleAllCompleted: PropTypes.func.isRequired,
  isCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodosContainer;
