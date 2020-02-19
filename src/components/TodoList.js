import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = props => {
  const { todos, onTodoToggle, onTodoRemove, onTodoTextUpdate } = props;

  return (
    <ul className="todo-list">
      {todos.map((todo, index) => {
        const { id, title, completed } = todo;

        return (
          <TodoItem
            key={id}
            id={id}
            title={title}
            completed={completed}
            index={index}
            onToggle={() => onTodoToggle(id)}
            onRemove={() => onTodoRemove(id)}
            onUpdate={onTodoTextUpdate}
          />
        );
      })}
    </ul>
  );
};
