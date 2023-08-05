import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../TodoContext';

export const TodoList: React.FC = () => {
  const { filterTodos, filter } = useContext(TodoContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {filterTodos(filter).map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
