/* eslint-disable react/display-name */
import React, {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Form } from './Form';
import { Todo } from '../types/Todo';
import { TodosStateContext } from '../providers/TodosProvider';
import classNames from 'classnames';

interface Props {
  todo: Todo;
}

export const TodoItem = memo(({ todo }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [todoValue, setTodoValue] = useState<string>(todo.title);
  const { state, dispatch } = useContext(TodosStateContext);
  const inputEditRef = useRef<HTMLInputElement>(null);

  const setIsEdditing = () => {
    setIsEditing(true);
  };

  const changeTodoValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value);
  };

  const removeTodo = () => {
    dispatch({
      type: 'remove',
      payload: { id: todo.id },
    });
  };

  const toggleChecked = () => {
    dispatch({
      type: 'update',
      payload: { ...todo, completed: !todo.completed },
    });
  };

  const changeTodoTitleHandler = () => {
    if (todoValue.trim()) {
      dispatch({
        type: 'update',
        payload: { ...todo, title: todoValue.trim() },
      });
      setIsEditing(false);
    } else {
      dispatch({ type: 'remove', payload: { id: todo.id } });
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeTodoTitleHandler();
  };

  const onBlurHandler = () => {
    changeTodoTitleHandler();
  };

  const keyUpHandler = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        setIsEditing(false);
        setTodoValue(todo.title);
      }
    },
    [todo.title],
  );

  useEffect(() => {
    if (inputEditRef.current) {
      inputEditRef.current.focus();
    }
  }, [state.todos]);

  return (
    <div
      key={todo.id}
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={toggleChecked}
        />
      </label>

      {isEditing ? (
        <Form
          className="todo__title-field"
          value={todoValue}
          onChange={changeTodoValueHandler}
          onSubmit={submitHandler}
          onBlur={onBlurHandler}
          inputRef={inputEditRef}
          onCancel={keyUpHandler}
          dataCy="TodoTitleField"
        />
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={setIsEdditing}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={removeTodo}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
});
