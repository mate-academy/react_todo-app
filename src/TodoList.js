import React from 'react';
import PropTypes from 'prop-types';

import Todo from './Todo';

const TodoList = (props) => {
  const { selectAllButton,
    markAll,
    todos,
    deleteTodo,
    editTodo,
    changeTodoStatus,
    hideOnStart } = props;

  return (
    <>
      {hideOnStart && (
        <form>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={() => markAll()}
            checked={selectAllButton}
          />
          <label
            htmlFor="toggle-all"
          >
            Mark all as complete
          </label>
        </form>
      )}

      <ul className="todo-list">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            changeTodoStatus={changeTodoStatus}
            editTodo={editTodo}
          />
        ))
        }
      </ul>
    </>
  );
};

export default TodoList;

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTodoStatus: PropTypes.func.isRequired,
  markAll: PropTypes.func.isRequired,
  selectAllButton: PropTypes.bool.isRequired,
  hideOnStart: PropTypes.bool.isRequired,
  editTodo: PropTypes.func.isRequired,
};
