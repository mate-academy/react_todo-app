import React, { useContext, useMemo } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../services/TodosContext';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

type Props = {
  status: Status;
};

function getFilteredTodos(allTodos: Todo[], selectedStatus: Status) {
  const filtederTodos = [...allTodos];

  switch (selectedStatus) {
    case Status.all:
      return filtederTodos;
    case Status.completed:
      return filtederTodos.filter(todo => todo.completed);
    case Status.active:
      return filtederTodos.filter(todo => !todo.completed);
  }
}

export const TodoList: React.FC<Props> = ({ status }) => {
  const { todos } = useContext(TodosContext);

  const visibleTodos = useMemo(
    () => getFilteredTodos(todos, status),
    [todos, status],
  );

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <ul className="todo-list" data-cy="todosList">
        {visibleTodos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>
    </section>
  );
};
