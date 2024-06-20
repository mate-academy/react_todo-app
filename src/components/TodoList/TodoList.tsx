import React, { useContext } from 'react';

import { TodoItem } from '../TodoItem/TodoItem';
import { TodosContext } from '../StoreTodos/StoreTodos';
import { FilterContext } from '../FilterProvider/FilterProvider';
import { getVisibleTodos } from '../../utils/getVisibleTodos';

export const TodoList: React.FC = () => {
  const todos = useContext(TodosContext);
  const { filter } = useContext(FilterContext);

  const visibleTodos = getVisibleTodos(todos, filter);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
