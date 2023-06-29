import {
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  onDeleteTodos: (todoId: number) => void;
  changeTodoTitle: (id: number, title: string) => void;
  changeTodoStatus: (id: number, completed: boolean) => void;
};

export const TodoItem: FC<Props> = ({
  todo,
  onDeleteTodos,
  changeTodoTitle,
  changeTodoStatus,
}) => {
  const [query, setQuery] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const { id, completed, title } = todo;

  const onDoubleClick = () => {
    setIsEdit(true);
    setQuery(title);
  };

  const onEscUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEdit(false);
      setQuery(title);
    }
  };

  const onNewTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeTodoTitle(id, query);

    if (query === '') {
      onDeleteTodos(id);
    }

    if (query === title) {
      setIsEdit(false);
      setQuery(title);
    }

    setQuery(query);
    setIsEdit(false);
  };

  useEffect(() => {
    input.current?.focus();
  }, [isEdit]);

  return (
    <>
      <li className={classNames({
        editing: isEdit,
        completed,
      })}
      >
        {isEdit ? (
          <form
            onSubmit={onNewTitle}
            onBlur={onNewTitle}
          >
            <input
              type="text"
              className="edit"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              ref={input}
              onKeyUp={onEscUp}
            />
          </form>
        ) : (
          <>
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                id="toggle-view"
                onClick={() => changeTodoStatus(id, !completed)}
                checked={completed}
              />
              <label
                onDoubleClick={onDoubleClick}
              >
                {title}
              </label>
              <button
                type="button"
                aria-label="label"
                className="destroy"
                data-cy="deleteTodo"
                onClick={() => onDeleteTodos(id)}
              />
            </div>
            <input type="text" className="edit" />
          </>
        )}
      </li>

      {/* <li className="completed">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-completed" />
          <label htmlFor="toggle-completed">qwertyuio</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li> */}

      {/* <li className="editing">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-editing" />
          <label htmlFor="toggle-editing">zxcvbnm</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li> */}

      {/* <li>
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-view2" />
          <label htmlFor="toggle-view2">1234567890</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li> */}
    </>
  );
};
