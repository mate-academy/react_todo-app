import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  deleteHandler: (todoId: number) => void,
  completeHandler: (todoId: number) => void,
  editHandler: (todoId: number, newTitle: string) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  deleteHandler,
  completeHandler,
  editHandler,
}) => {
  return (
    <>
      <ul className="todo-list" data-cy="todosList">
        {todos.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
            deleteHandler={deleteHandler}
            completeHandler={completeHandler}
            editHandler={editHandler}
          />
        ))}
      </ul>
    </>
  );
};
