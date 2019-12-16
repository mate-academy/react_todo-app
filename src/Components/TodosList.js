import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({
  filteredTodosList,
  handleCheck,
  handleRemove,
  toggleCompleted,
  filterField,
  showTodos,
}) => (
  <section className="main" style={{ display: 'block' }}>
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onClick={event => toggleCompleted(event)}
    />
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label htmlFor="toggle-all">
      Mark all as complete
    </label>
    <ul className="todo-list">
      {filteredTodosList
        .map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleCheck={handleCheck}
            handleRemove={handleRemove}
            filterField={filterField}
            showTodos={showTodos}
          />
        ))
      }
    </ul>
  </section>
);

TodoList.propTypes = {
  filteredTodosList: PropTypes.arrayOf(PropTypes.shape({
    todoTitle: PropTypes.string,
    id: PropTypes.number,
    completed: PropTypes.bool,
  })),
  handleCheck: PropTypes.func,
  handleRemove: PropTypes.func,
  toggleCompleted: PropTypes.func,
}.isRequired;

export default TodoList;
