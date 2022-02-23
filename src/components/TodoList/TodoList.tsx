import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo: Todo) => (
        <React.Fragment key={todo.id}>
          <TodoItem todo={todo} />
        </React.Fragment>
      ))}
    </ul>
  );
};
