import cn from 'classnames';
import {
  ChangeEvent,
  useCallback,
  useContext,
  useState,
} from 'react';
import { Todo } from '../Types/Todo';
import { DispatchContext } from '../Store/TodosProvider';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const { title, completed } = todo;

  const toggleComplete = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'toggleCompleted',
      payload: {
        toComplete: todo,
        completed: event.target.checked,
      },
    });
  }, [dispatch, todo]);

  const handleOnDelete = useCallback(() => {
    dispatch({ type: 'deleteTodo', payload: todo });
  }, [dispatch, todo]);

  const handleChangeTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTitle(event.target.value);
    }, [],
  );

  const saveNewTitle = useCallback(() => {
    if (newTitle.trim()) {
      dispatch({
        type: 'editTodo',
        payload: {
          toEditTodo: todo,
          newTitle,
        },
      });
    } else {
      dispatch({ type: 'deleteTodo', payload: todo });
    }

    setIsEditing(false);
  }, [dispatch, newTitle, todo]);

  // work with buttons //
  const onEnter = useCallback((
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      saveNewTitle();
    }
  }, [saveNewTitle]);

  const onEsc = useCallback((
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Escape') {
      setNewTitle(todo.title);
      setIsEditing(false);
    }
  }, [todo.title]);

  return (
    <li className={cn({
      completed,
      editing: isEditing,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={toggleComplete}
        />
        <label
          onDoubleClick={() => setIsEditing(true)}
        >
          {title}
        </label>
        <button
          aria-label="destroy"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleOnDelete}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={handleChangeTitle}
        onBlur={saveNewTitle}
        onKeyUp={onEnter}
        onKeyDown={onEsc}
      />
    </li>
  );
};
