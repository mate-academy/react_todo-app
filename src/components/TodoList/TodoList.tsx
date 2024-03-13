import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, newTitle: string) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  toggleTodo,
  removeTodo,
  updateTodo,
}) => (
  <ul className="todo-list" data-cy="todosList">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    ))}
  </ul>
);
