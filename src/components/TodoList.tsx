import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../TodosContext/TodosContext';
import { Todo } from '../types/Todo';

export const TodoList: React.FC = () => {
  const { filteredTodos, status } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos(status).map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
};
