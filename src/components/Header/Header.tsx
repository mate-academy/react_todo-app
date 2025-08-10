import { useContext, useEffect, useState } from 'react';
import { TodosContext } from '../../context/TodosContext';
import classNames from 'classnames';
import { Actions } from '../../constants/Actions';

const Header = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('TodosContext must be used within a TodosProvider');
  }

  const {
    state: { todos },
    dispatch,
    inputRef,
    focusInput,
  } = context;

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
