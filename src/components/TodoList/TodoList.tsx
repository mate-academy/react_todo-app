import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodosContext } from '../../TodoContext';

export const TodoList: React.FC = React.memo(() => {
  const { visibleTodos } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todosList">
      {visibleTodos().map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
        />
      ))}
    </ul>
  );
});
