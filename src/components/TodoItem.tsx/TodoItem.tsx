import React, {
  Dispatch,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../store/TodoContext';
import { State, Action } from '../../types/Context';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);
  const [, dispatch]
  = useContext(TodosContext) as [State, Dispatch<Action>];
  const editInputElem = useRef<HTMLInputElement>(null);

  const toggleCompletedHandler = () => {
    dispatch({ type: 'TOGGLE_TODO', payload: todo.id });
  };

  const removeTodoHandler = () => {
    dispatch({ type: 'REMOVE_TASK', payload: todo.id });
  };

  const editTodoHandler = () => {
    setIsEditing(true);
  };

  const changeEditInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEditText(event.target.value);
  };

  const saveChangesHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsEditing(false);

    if (!editText.trim()) {
      removeTodoHandler();
    }

    dispatch({
      type: 'CHANGE_TODO',
      payload: {
        id: todo.id,
        title: event.currentTarget.value,
        completed: false,
      },
    });
  };

  const keyDownEditInputHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Escape' && isEditing) {
      setIsEditing(false);
      setEditText(todo.title);
    }

    if (event.key === 'Enter' && isEditing) {
      if (!editText.trim()) {
        removeTodoHandler();
      }
    }

    if (event.key === 'Enter' && isEditing) {
      dispatch({
        type: 'CHANGE_TODO',
        payload: {
          id: todo.id,
          title: event.currentTarget.value,
          completed: false,
        },
      });

      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (editInputElem.current !== null && isEditing) {
      editInputElem.current.focus();
    }
  });

  return (
    <>
      <li className={cn({
        completed,
        editing: isEditing,
      })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`toggle-view${todo.id}`}
            checked={completed}
            onChange={toggleCompletedHandler}
          />
          <label
            onDoubleClick={editTodoHandler}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="deleteTodo"
            onClick={removeTodoHandler}
          />
        </div>
        <input
          type="text"
          className="edit"
          ref={editInputElem}
          value={editText}
          onChange={changeEditInputHandler}
          onKeyDown={keyDownEditInputHandler}
          onBlur={saveChangesHandler}
        />
      </li>
    </>
  );
};
