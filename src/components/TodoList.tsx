import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  toggleCompleted: (id: number) => void,
  removeTodo: (id: number) => void;
  renameTodo: (id: number, title: string) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  toggleCompleted,
  removeTodo,
  renameTodo,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleCompleted={toggleCompleted}
          removeTodo={removeTodo}
          renameTodo={renameTodo}
        />
      ))}
    </ul>
  );
};
