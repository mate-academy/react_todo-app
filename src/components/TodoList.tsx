import React from 'react';
import { Todo } from '../Types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  deleteTodo: (todoId: number) => void,
  toggleCompleted: (todoId: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  deleteTodo,
  toggleCompleted,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleCompleted={toggleCompleted}
        />
      ))}
    </ul>
  );
};
