import { Todo } from '../types/Todo';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todo: Todo;
  removeTodo: (id: number) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  removeTodo,
}) => {
  const {
    id,
    title,
  } = todo;

  return (
    <>
      <div className="view">
        <input type="checkbox" className="toggle" id="toggle-view" />
        <label htmlFor="toggle-view">{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => removeTodo(id)}
        />
      </div>
      <input type="text" className="edit" />
    </>
  );
};
