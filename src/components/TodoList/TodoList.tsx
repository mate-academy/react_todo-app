import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
  deleteTodo: (id: number) => void,
  updateTodo: (updatedTodo: Todo) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  deleteTodo,
  updateTodo,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          key={todo.id}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </ul>
  );
};
