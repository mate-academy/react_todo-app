import classNames from 'classnames';
import {
  useCallback, useState,
} from 'react';
import { Todo } from '../types/types';

type Props = {
  todo: Todo,
  todos: Todo[],
  onSettingTodo: (totos: Todo[]) => void,
  onUpdate: (id: number, str: string) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  todos,
  onSettingTodo,
  onUpdate,
}) => {
  const [isUpdating, updateTodo] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const deleteHandler = () => {
    onSettingTodo(todos.filter(elem => elem.id !== todo.id));
  };

  const completeHandler = () => {
    onSettingTodo(todos.map(elem => {
      if (elem.id === todo.id) {
        return {
          ...elem,
          completed: !todo.completed,
        };
      }

      return elem;
    }));
  };

  const updateHandler: React.FormEventHandler<HTMLFormElement> = (
    event,
  ) => {
    event.preventDefault();
    if (newTitle === '') {
      deleteHandler();

      return;
    }

    onUpdate(todo.id, newTitle);
    updateTodo(false);
  };

  const inputTextHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setNewTitle(event.target.value);
  };

  const callbackRef = useCallback((inputElement: HTMLInputElement | null) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  return (
    <>
      {!isUpdating ? (
        <li className={classNames({ completed: todo.completed })}>
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={todo.completed}
              onChange={completeHandler}
            />
            <label
              onDoubleClick={() => {
                updateTodo(true);
              }}
            >
              {todo.title}
            </label>
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              onClick={deleteHandler}
              aria-label="remove todo"
            />
          </div>
          <input type="text" className="edit" />
        </li>
      ) : (
        <li className="editing">
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id="toggle-editing"
            />
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              aria-label="remove todo"
            />
          </div>
          <form onSubmit={updateHandler}>
            <input
              type="edit"
              data-cy="editTodo"
              className="edit"
              value={newTitle}
              ref={callbackRef}
              onFocus={e => e.currentTarget.select()}
              onBlur={() => {
                if (newTitle === '') {
                  deleteHandler();
                  return;
                }
                onUpdate(todo.id, newTitle);
                updateTodo(false);
              }}
              onChange={inputTextHandler}
              placeholder="What needs to be re-done?"
              onKeyDown={event => {
                if (event.key === 'Escape') {
                  setNewTitle(todo.title);
                  updateTodo(false);
                }
              }}
            />
          </form>
        </li>
      )}
    </>
  );
};
