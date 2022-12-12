// import classNames from 'classnames';
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
    <ul className="todo-list" data-cy="todosList">
      {todos.map(todo => (
        <li
          key={todo.id}
        >
          <TodoItem
            todo={todo}
            deleteHandler={deleteHandler}
            completeHandler={completeHandler}
            editHandler={editHandler}
          />
        </li>
      ))}
    </ul>
  );
};
