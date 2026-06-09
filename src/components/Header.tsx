import React, {
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { TodoContext } from '../context/TodoContext';

export const Header: React.FC = () => {
  const {
    state: { todos },
    dispatch,
  } = useContext(TodoContext);

  const [title, setTitle] = useState('');

  const newTodoFieldRef = useRef<HTMLInputElement>(null);

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  useEffect(() => {
    newTodoFieldRef.current?.focus();
  }, [todos]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    dispatch({
      type: 'addTodo',
      payload: {
        id: +new Date(),
        title: trimmedTitle,
        completed: false,
      },
    });

    setTitle('');
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: 'toggleAll' })}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={newTodoFieldRef}
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
