import React from 'react';
import { TodoInfo } from './TodoInfo';
import { Todo } from '../interfaces/Todo';

interface Props {
  todos: Todo[];
  editTodo: (id: number, newTitle: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  editTodo,
  deleteTodo,
  toggleTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </section>
  );
};
