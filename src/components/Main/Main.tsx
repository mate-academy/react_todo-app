import React, { useContext, useState } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';

import { DispatchContext, StateContext } from '../../Store';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

export const Main: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, filter } = useContext(StateContext);

  const [toggle, setToggle] = useState(false);

  const handleOnToggle = () => {
    dispatch({ type: 'toggleAll', value: !toggle });
    setToggle(!toggle);
  };

  const preparedTodos = todos.filter(todo => {
    switch (filter) {
      case Status.All:
        return todo;
      case Status.Active:
        return todo.completed === false;
      case Status.Completed:
        return todo.completed === true;
      default:
        return todo;
    }
  });

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={() => handleOnToggle()}
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {preparedTodos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
};
