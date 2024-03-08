import React, { useContext, useState } from 'react';
import { TodoList } from '../TodoList';
import { DispatchContext, StateContext } from '../../TodosContext';
import { Status } from '../../types/Status';

export const Main: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, status } = useContext(StateContext);

  const preparedTodos = todos.filter(todo => {
    switch (status) {
      case Status.All:
        return todo;
      case Status.Active:
        return !todo.completed;
      case Status.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  const [toggle, setToggle] = useState(false);

  const handleOnToggleAll = () => {
    dispatch({ type: 'toggleAll', payload: !toggle });
    setToggle(!toggle);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={handleOnToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList todos={preparedTodos} />
    </section>
  );
};
