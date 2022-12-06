import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  toggleCompleteStatus: (todoId: number) => void,
  deleteHandler: (todoId: number) => void,
  editTitle: (todoId: number, newTitle: string) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  toggleCompleteStatus,
  deleteHandler,
  editTitle,
}) => {
  return (
    <>
      <ul className="todo-list" data-cy="todosList">
        {todos.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
            toggleCompleteStatus={toggleCompleteStatus}
            deleteHandler={deleteHandler}
            editTitle={editTitle}
          />
        ))}
      </ul>
    </>
  );
};
