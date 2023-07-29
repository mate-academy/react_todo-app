import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { TodosContex } from '../../TodosContex';

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
