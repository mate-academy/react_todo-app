import React, { useContext, useEffect, useRef } from 'react';
import { Todo } from './Types/Todo';
import { DispatchContext, TodosContext } from '../TodosContext';

type Props = {
  title: string,
  completed: boolean,
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({
  title,
  completed,
  todo,
}) => {
  const dispatch = useContext(DispatchContext);
  const { edit, newTitle } = useContext(TodosContext);

  const titleField = useRef<HTMLInputElement>(null);

  const handlerChange = () => {
    dispatch({ type: 'todoCompleted', payLoad: todo });
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.target.value) {
      dispatch({ type: 'removeTodo', payLoad: todo });
    }

    if (event.key === 'Enter') {
      dispatch({ type: 'saveNewTitleTodo', payLoad: todo });
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
        type="text"
        className="edit"
        ref={titleField}
        value={newTitle}
        onChange={(event) => dispatch({
          type: 'changeTitleTodo',
          payLoad: event.target.value,
        })}
        onKeyUp={handleKeyUp}
        onBlur={() => dispatch({ type: 'saveNewTitleTodo', payLoad: todo })}
      />
    </li>
  );
};
