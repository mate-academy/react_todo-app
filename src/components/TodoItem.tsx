import { Todo } from '../types/Todo';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todo: Todo;
  removeTodoFromServer: (id: number) => void,
  updateStatusTodoOnServer: (id: number, status: boolean) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  removeTodoFromServer,
  updateStatusTodoOnServer,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;

  return (
    <>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={() => (
            updateStatusTodoOnServer(id, completed))}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => removeTodoFromServer(id)}
        />
      </div>
      <input type="text" className="edit" />
    </>
  );
};
