/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo, TodosContext } from '../utils/context';
import { TodoItem } from './TodoItem';

interface Props {
  onDelete: (todo: Todo) => void;
  onComplete: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  onDelete,
  onComplete,
}) => {
  const todos = React.useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos && todos.length > 0 && todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onComplete={onComplete}
        />
      ))}
    </ul>
  );
};
