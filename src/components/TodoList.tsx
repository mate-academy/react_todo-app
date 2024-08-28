import React from 'react';
import { Todo } from '../types/Todo';
import { TodoComponent } from './Todo';

type Props = {
  todos: Todo[];
  toggleTodo: (todo: Todo) => void;
  deletePost: (id: number) => void;
  loadingTodos: number[];
  updatedPost: (todo: Todo) => Promise<void>;
};

export const TodoList: React.FC<Props> = ({
  todos,
  toggleTodo,
  deletePost,
  loadingTodos,
  updatedPost,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoComponent
        key={todo.id}
        todo={todo}
        toggleTodo={toggleTodo}
        deletePost={deletePost}
        isLoading={loadingTodos.includes(todo.id)}
        updatedPost={updatedPost}
      />
    ))}
  </section>
);
