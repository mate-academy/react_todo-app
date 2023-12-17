import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';
import { TodoItem } from '../TodoItem/TodoItem';

export const Todolist: React.FC = () => {
  const { visibleTodos } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todosList">
      {visibleTodos().map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
};
