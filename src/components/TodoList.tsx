import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../contexts/TodosContext';

export const TodoList: React.FC = () => {
  const { isShownTodos } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {isShownTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
