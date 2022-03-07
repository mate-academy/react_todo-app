import React from 'react';
import './TodoList.scss';
import { TodoItem } from './TodoItem';
import { useTodos } from './hooks/useTodos';

export const TodoList: React.FC = () => {
  const content = useTodos();
  const todos = content?.filteredTodos;

  return (
    <>
      {todos && todos.length > 0 && (
        <ul className="todo-list">
          {todos && todos.map(todo => (
            <TodoItem
              key={todo.id}
              {...todo}
            />
          ))}
        </ul>
      )}
    </>
  );
};
