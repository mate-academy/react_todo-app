import React, { useContext, useMemo } from 'react';
import { TodoContext } from '../context/TodoProvider';
import { Todo } from './Todo';
import { Filter, FilterContext } from '../context/FilterProvider';

type Props = {};

export const TodoList: React.FC<Props> = () => {
  const { todos } = useContext(TodoContext);
  const { filter } = useContext(FilterContext);

  const filteredTodos = useMemo(() => {
    if (filter === Filter.Active) {
      return todos.filter(todo => !todo.completed);
    } else if (filter === Filter.Completed) {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  }, [filter, todos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
