import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  visibleTodos: Todo[],
  onSetTodos: (value: Todo[]) => void
  onCheck: React.Dispatch<React.SetStateAction<boolean>>
};

export const TodoList: React.FC<Props> = ({
  todos,
  visibleTodos,
  onSetTodos,
  onCheck,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {visibleTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todos={todos}
          todo={todo}
          onSetTodos={onSetTodos}
          onCheck={onCheck}
        />
      ))}
    </ul>
  );
};
