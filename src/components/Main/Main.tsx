import React, { useContext, useState, useMemo } from 'react';
import { TodoList } from '../TodoList';
import { DispatchContext, FilterContext, StateContext } from '../TodosContext';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

export const Main: React.FC = () => {
  const todos = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const filterStatus = useContext(FilterContext);

  const [checked, setChecked] = useState(false);

  let filteredTodos: Todo[] = [...todos];

  useMemo(() => {
    switch (filterStatus) {
      case Status.All:
        filteredTodos = [...todos];
        break;

      case Status.Active:
        filteredTodos = [...todos].filter(todo => !todo.completed);
        break;

      case Status.Completed:
        filteredTodos = [...todos].filter(todo => todo.completed);
        break;

      default:
        break;
    }
  }, [filterStatus]);

  const handleToggleAllClick = () => {
    setChecked(!checked);
    dispatch({
      type: 'toggleAll',
      payload: !checked,
    });
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={checked}
        onClick={handleToggleAllClick}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList items={filteredTodos} />
    </section>
  );
};
