import React, { useContext, useMemo } from 'react';
import { StateContext } from '../context/GlobalContextProvider';
import { FilterOption } from '../types/FilterOption';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(StateContext);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case FilterOption.active:
        return todos.filter(todo => !todo.completed);

      case FilterOption.completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [filter, todos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
