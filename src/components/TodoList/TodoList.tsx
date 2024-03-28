import React from 'react';
import TodoItem from '../TodoItem/TodoItem';

import { useTodos } from '../../store/Store';

const TodoList: React.FC = () => {
  const { filteredTodos } = useTodos();

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
