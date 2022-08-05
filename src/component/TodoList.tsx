/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[]
  completedTodos: Todo[]
  onTodoDeleted: (value: number) => void,
  onTodoUpdate: (updatedTodo: Todo) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  completedTodos,
  onTodoDeleted,
  onTodoUpdate,
}) => {
  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={todos.length > 0 && completedTodos.length === todos.length}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {todos.map(todo => (
          <TodoItem
            todo={todo}
            onDelete={onTodoDeleted}
            onUpdate={onTodoUpdate}
          />
        ))}
      </ul>
    </section>
  );
};
