import React, { useCallback, useContext, useMemo } from 'react';
import { TodosContext } from '../services/TodosContext';
import { TodoItem } from './TodoItem';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

type Props = {
  status: Status;
};

function getFilteredTodos(allTodos: Todo[], selectedStatus: Status): Todo[] {
  const filteredTodos = [...allTodos];

  switch (selectedStatus) {
    case Status.active:
      return filteredTodos.filter(todoItem => !todoItem.completed);

    case Status.completed:
      return filteredTodos.filter(todoItem => todoItem.completed);

    default:
      return filteredTodos;
  }
}

export const TodoList: React.FC<Props> = ({ status }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const visibleTodos = useMemo(
    () => getFilteredTodos(todos, status),
    [todos, status],
  );

  const isAllTodosCompleted = useMemo(
    () => todos.every(todoItem => todoItem.completed),
    [todos],
  );

  const toggleAllTodos = useCallback(
    (completedStatus: boolean): void => {
      setTodos(
        todos.map(todoItem => ({
          ...todoItem,
          completed: completedStatus,
        })),
      );
    },
    [todos, setTodos],
  );

  const handleToggleChange = useCallback((): void => {
    if (isAllTodosCompleted) {
      toggleAllTodos(false);
    } else {
      toggleAllTodos(true);
    }
  }, [isAllTodosCompleted, toggleAllTodos]);

  return (
    <section className="main">
      {!!todos.length && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={isAllTodosCompleted}
            onChange={handleToggleChange}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}

      <ul className="todo-list" data-cy="todosList">
        {visibleTodos.map(todo => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </ul>
    </section>
  );
};
