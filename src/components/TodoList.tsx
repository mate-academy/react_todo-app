/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  onClose(todoId: number): void;
  onToggle(todoId: number, completed: boolean): void;
  onChange(value: string, todoId: number): void
};

export const TodoList: React.FC<Props> = React.memo(
  ({
    todos,
    onClose,
    onToggle,
    onChange,
  }) => {
    return (
      <section className="main">
        <ul className="todo-list" data-cy="todoList">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onClose={onClose}
              onToggle={onToggle}
              onChange={onChange}
            />
          ))}
        </ul>
      </section>
    );
  },
);
