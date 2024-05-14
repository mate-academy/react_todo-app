import React, { useContext, useMemo } from 'react';
import { StateContext } from '../../store/TodoContext';
import { FilterFields } from '../../store/types';
import { TodoItem } from '../TodoItem/TodoItem';

export function TodoList() {
  const { todos, filter } = useContext(StateContext);
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case FilterFields.Active:
          return !todo.completed;
        case FilterFields.Completed:
          return todo.completed;
        default:
          return todo;
      }
    });
  }, [todos, filter]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos?.map(todo => <TodoItem todo={todo} key={todo.id} />)}
    </section>
  );
}
