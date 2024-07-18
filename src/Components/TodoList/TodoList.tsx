import React, { useContext, useMemo } from 'react';
import { StateContext } from '../../Store';
import { Status } from '../../types/Status';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const { todos, filterBy } = useContext(StateContext);

  const filteredTodos = useMemo(() => {
    if (filterBy === Status.Active) {
      return todos.filter(todo => !todo.completed);
    }

    if (filterBy === Status.Completed) {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  }, [todos, filterBy]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
