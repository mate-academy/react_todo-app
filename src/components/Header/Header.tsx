/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Actions } from '../../constants/Actions';
import { useTodosContext } from '../../context/useTodosContext';

interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
  focusInput: () => void;
}

const Header = ({ inputRef, focusInput }: Props) => {
  const {
    state: { todos },
    dispatch,
  } = useTodosContext();

  const [title, setTitle] = useState('');
  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const handleToggleAll = () => {
    dispatch({ type: Actions.TOGGLE_ALL });
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    dispatch({ type: Actions.ADD, payload: newTodo });
    setTitle('');
  };

  useEffect(() => {
    if (todos.length === 0 || !todos.some(todo => todo.completed)) {
      focusInput();
    }
  }, [todos, focusInput]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleOnSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
          value={title}
          autoFocus
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};

export default Header;
