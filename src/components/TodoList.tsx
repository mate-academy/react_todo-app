/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../Types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[],
  visibleTodos: Todo[],
  onSetTodos: (newValue: Todo[]) => void
  onCheckTodos: React.Dispatch<React.SetStateAction<boolean>>
}

export const TodoList: React.FC<Props> = ({
  todos,
  visibleTodos,
  onSetTodos,
  onCheckTodos,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {visibleTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todos={todos}
          currentTodo={todo}
          onSetTodos={onSetTodos}
          onCheckTodos={onCheckTodos}
        />
      ))}
    </ul>
  );
};
