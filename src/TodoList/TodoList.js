import React from 'react';

import TodoItem from '../TodoItem/TodoItem';
import PropTypes from 'prop-types';

function TodoList(props) {
  const {
    todosList,
    deleteTodo,
    togleAllComplete,
    completeTodo,
    completedLength,
  } = props;

  const togleCheckbox = completedLength > 0;

  return (

    <section className="main">
      <input
        onChange={togleAllComplete}
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={togleCheckbox}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {
          todosList.map(todo => (
            <TodoItem
              key={todo.id}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
              todo={todo}
            />))
        }
      </ul>
    </section>
  );
}

TodoList.propTypes = {
  todosList: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  togleAllComplete: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
  completedLength: PropTypes.number.isRequired,
};

export default TodoList;
