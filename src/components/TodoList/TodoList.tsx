import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { TodoContext } from '../../context/TodoContext';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useContext(TodoContext);

  return (
    <ul
      className="todo-list"
      data-cy="todosList"
    >
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
};
