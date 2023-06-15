import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  onUpdateTodo: (id: number, parameter: Partial<Todo>) => void;
  onDeleteTodo: (id: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onUpdateTodo,
  onDeleteTodo,
}) => {
  return (
    <ul className="todolist" data-cy="todosList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
};
