// import classNames from 'classnames';
import classNames from 'classnames';
import React, { useState } from 'react';
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
  const [editing, setEditing] = useState(false);

  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.map(todo => (
        <li
          key={todo.id}
          className={classNames({
            completed: todo.completed,
            editing,
          })}
          onDoubleClick={() => setEditing(!editing)}
        >
          <TodoItem
            todo={todo}
            deleteHandler={deleteHandler}
            completeHandler={completeHandler}
            editHandler={editHandler}
            onEditing={setEditing}
          />
        </li>
      ))}
    </ul>
  );
};
