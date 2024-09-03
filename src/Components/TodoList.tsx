import React, { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { Filter } from '../Types/Filter';
import { TodoItem } from './TodoItem';

interface Props {
  input: React.RefObject<HTMLInputElement>;
  filter: Filter;
}

export const TodoList: React.FC<Props> = ({ input, filter }) => {
  const { todos } = useContext(TodosContext);

  let displayedTodos = [...todos];

  switch (filter) {
    case Filter.completed:
      displayedTodos = displayedTodos.filter(todo => todo.completed);
      break;

    case Filter.active:
      displayedTodos = displayedTodos.filter(todo => !todo.completed);
      break;
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {displayedTodos.map((todo, todoIndex) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          todoIndex={todoIndex}
          input={input}
        />
      ))}
    </section>
  );
};
