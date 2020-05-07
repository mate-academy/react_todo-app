import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Todo from './Todo';

const TodoList = (props) => {
  const { selectAllButton,
    markAll,
    todos,
    deleteTodo,
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
          <li
            key={todo.id}
            className={cn({ completed: todo.completed })}
          >
            <Todo
              todo={todo}
              deleteTodo={deleteTodo}
              changeTodoStatus={changeTodoStatus}

            />
          </li>
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
};
