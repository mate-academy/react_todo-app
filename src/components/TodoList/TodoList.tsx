import React from 'react';
import { TodoItem } from '../TodoItem';

type Props = {
  items: Todo[],
  removeTodo: (todoId: number) => void,
  changeStatus: (todoId: number) => void,
  editTitle: (newTitle: string, todoId: number) => void,
};

export const TodoList: React.FC<Props> = ({
  items,
  removeTodo,
  changeStatus,
  editTitle,
}) => {
  return (
    <ul className="todo-list">
      {items.map(todo => (
        <TodoItem
          todo={todo}
          removeTodo={removeTodo}
          changeStatus={changeStatus}
          editTitle={editTitle}
        />
      ))}
    </ul>
  );
};
