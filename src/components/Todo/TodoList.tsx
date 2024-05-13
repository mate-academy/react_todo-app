import React, { useContext } from 'react';
import { TodoInfo } from './TodoInfo';
import { StateContext } from './TodoContext';
import { Todo } from '../../types/Todo';
import { FilterBy } from '../../types/FilterBy';

export const TodoList: React.FC = () => {
  const { todos, filterStatus } = useContext(StateContext);
  const filteredTodo = todos.filter((todo: Todo) => {
    switch (filterStatus) {
      case FilterBy.Active:
        return !todo.completed;
      case FilterBy.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodo.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
