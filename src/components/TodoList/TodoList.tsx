import React, { useContext } from 'react';
import { StateContext } from '../../TodoContext';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/Todo';
import { FilterStatus } from '../../types/FilterStatus';

export const TodoList: React.FC = () => {
  const { todos, filterStatus } = useContext(StateContext);

  const filteredTodos = todos.filter((todo: Todo) => {
    switch (filterStatus) {
      case FilterStatus.Active:
        return !todo.completed;

      case FilterStatus.Completed:
        return todo.completed;

      default:
        return todo;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
