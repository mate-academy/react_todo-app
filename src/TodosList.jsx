import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

const TodoList = (props) => {
  const {
    displayedTodos,
    handleTodoDelete,
    handleComplete,
    handleCompleteAll,
        } = props;

  return (
    <section className="main" style={{ display: 'block' }}>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onClick={handleCompleteAll}
      />
      <label htmlFor="toggle-all">
        Mark all as complete
      </label>
       {displayedTodos.map(todo =>
        (<TodoItem
            todo={todo}
            key={todo.id + 1}
            handleDelete={handleTodoDelete}
            handleComplete={handleComplete}
          />
        ))}
    </section>
    )
  };

  TodoList.propTypes = {
    displayedTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleTodoDelete: PropTypes.func.isRequired,
    handleComplete: PropTypes.func.isRequired,
    handleCompleteAll: PropTypes.func.isRequired,
};

export default TodoList;
