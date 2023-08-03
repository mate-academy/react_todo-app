import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { useTodo } from '../../context/TodosContext';

export const TodoList = () => {
  const { todosFilter } = useTodo();

  return (
    <ul className="todo-list" data-cy="todoList">
      {todosFilter.map(({ id, title, completed }) => (
        <TodoItem
          id={id}
          title={title}
          completed={completed}
          key={id}
        />
      ))}
    </ul>
  );
};
