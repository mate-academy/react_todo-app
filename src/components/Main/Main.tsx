import React, { useContext, useState } from 'react';

import './Main.scss';
import { TodoList } from '../TodoList';
import { TodosContext } from '../TodosContext';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

export const Main: React.FC = () => {
  const { todos, dispatch, currentFilter } = useContext(TodosContext);

  const [isChecked, setIsChecked] = useState(false);

  let filteredTodos: Todo[] = [];

  switch (currentFilter) {
    case Status.All:
      filteredTodos = [...todos];
      break;

    case Status.Active:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case Status.Completed:
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default:
      throw new Error('Unknown filter!');
  }

  const handleToggleAllClick = () => {
    setIsChecked(!isChecked);
    dispatch({
      type: 'toggleAll',
      payload: !isChecked,
    });
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={isChecked}
        onClick={handleToggleAllClick}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList items={filteredTodos} />
    </section>
  );
};
