import { useEffect, useRef, useState } from 'react';
import { useTodoDispatch, useTodoState } from './TodoProvider';
import classNames from 'classnames';

export const Header = () => {
  const [title, setTitle] = useState('');
  const { todos } = useTodoState();
  const allCompleted = todos.every(todo => todo.completed);
  const dispatch = useTodoDispatch();
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, [todos]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (trimmedTitle === '') {
      return;
    }

    dispatch({ type: 'ADD', payload: trimmedTitle });

    setTitle('');
  };

  const handleToogleAll = () => {
    dispatch({ type: 'TOGGLE_ALL', payload: !allCompleted });
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToogleAll}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          ref={newTodoField}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
