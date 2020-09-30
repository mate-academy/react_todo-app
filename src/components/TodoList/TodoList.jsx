import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import { TodoItem } from '../TodoItem/TodoItem';
import { changeTodoField } from '../../api/todos';

export function TodoList({ todos, upDateUserTodos , promiseAll}) {
  const everyCompleted = todos.every(todo => todo.completed);

  function flagComplited() {
    const some = todos.some(todo => !todo.completed);
    let changeCompleted = [];

    if (some) {
      changeCompleted = todos
        .map(todo => changeTodoField(todo.id, true, "completed"));
    } else {
      changeCompleted = todos
        .map(todo => changeTodoField(todo.id, false, "completed"));
    }
    promiseAll(changeCompleted);
  }

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        checked={everyCompleted}
        className={classNames("toggle-all")}
        onChange={flagComplited}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {
          todos.map(todo => (
            <TodoItem 
              key={todo.id}
              {...todo}
              upDateUserTodos={upDateUserTodos}
            />
          ))
        }
      </ul>
    </>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  upDateUserTodos: PropTypes.func.isRequired,
  promiseAll: PropTypes.func.isRequired,
}
