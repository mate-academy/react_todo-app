import React, { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = () => {
  const { todosFilter } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {todosFilter().map(({ id, title, completed }) => (
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
