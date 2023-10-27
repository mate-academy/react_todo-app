import React, { useContext, useRef, useEffect } from 'react';
import { TodosContext } from '../../store/store';
import { TodoItem } from '../TodoItem';
import { Status } from '../../types/enums/Status';
import { Todo } from '../../types/Todo';
import { Dispatchers } from '../../types/enums/Dispatchers';

const filter = (list: Todo[], status: Status = Status.All): Todo[] => {
  if (!status) {
    return list;
  }

  switch (status) {
    case Status.Active:
      return list.filter(todo => !todo.completed);

    case Status.Completed:
      return list.filter(todo => todo.completed);

    default:
      return list;
  }
};

interface Props {
  filterParam: Status;
}

export const TodoList: React.FC<Props> = ({ filterParam }) => {
  const checkbox = useRef<HTMLInputElement>(null);
  const { state } = useContext(TodosContext);
  const { dispatch } = useContext(TodosContext);

  const todos = filter(state, filterParam);

  const toggleStatus = (todoId: number): void => {
    dispatch({ type: Dispatchers.ChangeStatus, payload: todoId });
  };

  const toggleAllStatuses = (): void => {
    if (checkbox.current?.checked === false) {
      dispatch({ type: Dispatchers.ChangeAllStatuses, payload: false });
    }

    if (checkbox.current?.checked === true) {
      dispatch({ type: Dispatchers.ChangeAllStatuses, payload: true });
    }
  };

  useEffect(() => {
    if (checkbox.current) {
      checkbox.current.checked = state.every(elem => elem.completed);
    }
  }, [state]);

  return (
    <>
      <input
        type="checkbox"
        ref={checkbox}
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={() => toggleAllStatuses()}
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleStatus={toggleStatus}
          />
        ))}
      </ul>
    </>
  );
};
