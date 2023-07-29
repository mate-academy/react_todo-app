import React, { useContext } from 'react';
import { TodosContex } from '../../TodosContex';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = React.memo(() => {
  const { visibleTodos } = useContext(TodosContex);

  return (
    <ul className="todo-list" data-cy="todoList">
      {visibleTodos().map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
});
