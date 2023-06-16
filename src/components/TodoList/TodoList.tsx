import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[],
  areAllCompleted: boolean,
  onToggleComplete: (todoId: number) => void,
  onToggleAll: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onDeleteTodo: (todoId: number) => void,
  onPatchTodo: (todoId: number, title: string) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  areAllCompleted,
  onToggleComplete,
  onToggleAll,
  onDeleteTodo,
  onPatchTodo,
}) => (
  <section className="main">
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      data-cy="toggleAll"
      checked={areAllCompleted}
      onChange={onToggleAll}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>

    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onHandleToggleComplete={onToggleComplete}
          onDeleteTodo={onDeleteTodo}
          onPatchTodo={onPatchTodo}
        />
      ))}
    </ul>
  </section>
);
