import React from 'react';
import { useAppContext } from '../context/Context';
import { TodoElement } from './Todo';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export const Main: React.FC = () => {
  const {
    state: { todos, filter },
  } = useAppContext();

  const filterFunctions: { [key: string]: (todo: Todo) => void } = {
    [Filter.Active]: todo => !todo.completed,
    [Filter.Completed]: todo => todo.completed,
    [Filter.All]: () => true,
  };

  const filteredTodos = todos.filter(todo => filterFunctions[filter](todo));

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoElement key={todo.id} todoData={todo} />
      ))}
    </section>
  );
};
