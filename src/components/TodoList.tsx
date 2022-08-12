import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  updateTodo: (updatedTodo: Todo) => void,
  deleteTodos: (value: number | boolean) => void
  competedAll: () => void,
  completedTodos: Todo[],
};

export const TodoList: React.FC<Props> = (
  {
    todos,
    updateTodo,
    deleteTodos,
    competedAll,
    completedTodos,
  },
) => (
  <section className="main">
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      data-cy="toggleAll"
      onChange={competedAll}
      checked={todos.length > 0 && completedTodos.length === todos.length}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>

    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          updateTodo={updateTodo}
          deleteTodo={deleteTodos}
        />
      ))}
    </ul>
  </section>
);
