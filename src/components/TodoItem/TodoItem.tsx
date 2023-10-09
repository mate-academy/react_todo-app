import React, {
  useContext,
  useRef,
  useEffect,
} from 'react';

import { DispatchContext, TodosContext } from '../../Store';
import { Todo } from '../../Types/Todo';

type Props = {
  title: string
  completed: boolean,
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ title, completed, todo }) => {
  const dispatch = useContext(DispatchContext);
  const { edit } = useContext(TodosContext);

  const titleField = useRef<HTMLInputElement>(null);

  const hasPressedEnter = (key: string) => {
    return key === 'Enter';
  };

  const handlerChange = () => {
    dispatch({ type: 'todoCompleted', payLoad: todo });
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (hasPressedEnter(event.key) && !event.target.value) {
      dispatch({ type: 'removeTodo', payLoad: todo });
    }

    if (hasPressedEnter(event.key)) {
      dispatch({
        type: 'saveNewTitleTodo', payLoad: todo, newTitle: event.target.value,
      });
    }

    if (event.key === 'Escape') {
      dispatch({ type: 'removeEdit' });
    }
  };

  useEffect(() => {
    if (edit) {
      titleField.current?.focus();
    }
  }, [edit]);

  return (
    <li
      className={`${edit === todo.id && 'editing'} ${completed && 'completed'}`}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onChange={handlerChange}
          checked={completed === true}
        />
        <label
          htmlFor="toggle-view"
          onDoubleClick={() => {
            dispatch({ type: 'edit', payLoad: todo });
          }}
        >
          {title}
        </label>

        <button
          aria-label={title}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => dispatch({ type: 'removeTodo', payLoad: todo })}
        />
      </div>
      <input
        ref={titleField}
        defaultValue={title}
        type="text"
        className="edit"
        onKeyUp={handleKeyUp}
        onBlur={(event) => dispatch({
          type: 'saveNewTitleTodo', payLoad: todo, newTitle: event.target.value,
        })}
      />
    </li>
  );
};
