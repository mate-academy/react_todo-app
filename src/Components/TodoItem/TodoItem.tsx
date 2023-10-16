import React, { useContext, useRef, useEffect } from 'react';
import { Todo } from '../../Types/Todo';
import { DispatchContext, TodoContext } from '../../Data/Store';

interface Props {
  title: string,
  completed: boolean,
  todo: Todo,
}

export const TodoItem: React.FC<Props> = ({ title, completed, todo }) => {
  const dispatch = useContext(DispatchContext);
  const { edit } = useContext(TodoContext);

  const titleField = useRef<HTMLInputElement>(null);
  const pressedEnter = (key: string) => key === 'Enter';

  const handleChange = () => {
    dispatch({
      type: 'todoCompleted',
      payLoad: todo,
    });
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (pressedEnter(event.key) && !event.currentTarget.value) {
      dispatch({ type: 'removeTodo', payLoad: todo });
    }

    if (pressedEnter(event.key)) {
      dispatch({
        type: 'newTitleTodo',
        payLoad: todo,
        newTitle: event.currentTarget.value,
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
    <li className={`${edit === todo.id && 'editing'} ${completed && 'completed'}`}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onChange={handleChange}
          checked={completed === true}
        />

        <label
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
          onClick={() => {
            dispatch({ type: 'removeTodo', payLoad: todo });
          }}
        />

      </div>
      <input
        ref={titleField}
        type="text"
        className="edit"
        defaultValue={title}
        onKeyUp={handleKeyUp}
        onBlur={() => {
          dispatch({
            type: 'newTitleTodo',
            payLoad: todo,
            newTitle: title,
          });
        }}
      />
    </li>
  );
};
