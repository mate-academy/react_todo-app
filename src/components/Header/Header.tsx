import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import React, { useEffect, useState } from 'react';
import { useDispatch, useGlobalState } from '../../GlobalProvider';

type Props = {
  inputRef: React.RefObject<HTMLInputElement>;
};

const Header: React.FC<Props> = ({ inputRef }) => {
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();
  const { todos } = useGlobalState();

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      return;
    }

    if (normalizedTitle) {
      const newTemp: Todo = {
        id: +new Date(),
        title: normalizedTitle,
        completed: false,
      };

      dispatch({
        type: 'addTodo',
        payload: newTemp,
      });
      setTitle('');
      inputRef.current?.focus();
    }
  };

  const toggleAllTodos = () => {
    dispatch({ type: 'toggleAll' });
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAllTodos}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          value={title}
          onChange={handleTitleChange}
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

export default Header;
