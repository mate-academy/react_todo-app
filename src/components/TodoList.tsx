import classNames from 'classnames';
import { useState } from 'react';
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
            toggleCompleteStatus={toggleCompleteStatus}
            deleteHandler={deleteHandler}
            editTitle={editTitle}
            onEditing={setItemEdited}
          />
        </li>
      ))}
    </ul>
  );
};
