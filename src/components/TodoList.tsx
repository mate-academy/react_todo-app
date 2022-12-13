import classNames from 'classnames';
import { useState } from 'react';
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
  const [itemEdited, setItemEdited] = useState(-1);

  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.map(todo => (
        <li
          key={todo.id}
          className={classNames({
            completed: todo.completed,
            editing: itemEdited === todo.id,
          })}
        >
          <TodoItem
            todo={todo}
            deleteHandler={deleteHandler}
            completeHandler={completeHandler}
            editHandler={editHandler}
            onEditing={setItemEdited}
          />
        </li>
      ))}
    </ul>
  );
};
