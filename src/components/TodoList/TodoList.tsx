/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[],
  toggleComplete: (todoId: number) => void,
  onDeleteTodo: (todo: Todo) => void,
  updateTodo: (todoId: number, title: string) => void
};

export const TodoList: React.FC<Props> = ({
  todos,
  toggleComplete,
  onDeleteTodo,
  updateTodo,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          onDeleteTodo={onDeleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </ul>
  );
};
