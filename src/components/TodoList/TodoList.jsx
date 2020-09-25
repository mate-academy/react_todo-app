import React, { useState } from 'react';
import classNames from 'classnames';

import { TodoItem } from '../TodoItem/TodoItem';
import { changeCompletedTodo } from '../../api/todos';

export function TodoList({ todos, upDateUserTodos , promiseAll}) {
  const everyCompleted = todos.every(todo => todo.completed);

  function flagComplited() {
    const some = todos.some(todo => !todo.completed);

    if (some) {
      const changeCompleted = todos
        .map(todo => changeCompletedTodo(todo.id, true));
      promiseAll(changeCompleted);
    } else {
      const changeCompleted = todos
        .map(todo => changeCompletedTodo(todo.id, false));
      promiseAll(changeCompleted);
    }

    // подумать как упростить это код когда буду сдавать,
    // здесь можно много что повыносить так как код такой же
    // только true false разные
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
