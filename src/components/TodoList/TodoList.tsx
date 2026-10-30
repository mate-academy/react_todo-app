import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  onTodoDelete: (todoId: number) => void;
  onTodoUpdate: (todo: Todo) => void;
};

export const TodoList = React.memo(
  ({ todos, onTodoDelete, onTodoUpdate }: Props) => {
    return (
      <section className="todoapp__main" data-cy="TodoList">
        {todos.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
            onTodoDelete={onTodoDelete}
            onTodoUpdate={onTodoUpdate}
          />
        ))}
      </section>
    );
  },
);

TodoList.displayName = 'TodoList';
