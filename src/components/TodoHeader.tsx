import React, {
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { TodoContext } from './TodoContext';

export const TodoHeader: React.FC = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const newTodoRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    newTodoRef.current?.focus();
  }, [state.todos.length]);

  const handleToggleAll = useCallback(() => {
    dispatch({ type: 'TOGGLE_ALL' });
  }, [dispatch]);

  const handleNewTodoSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      if (newTodoTitle.trim()) {
        dispatch({ type: 'ADD_TODO', title: newTodoTitle });
        setNewTodoTitle('');
      }
    },
    [newTodoTitle, dispatch],
  );

  const handleNewTodoChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTodoTitle(event.target.value);
    },
    [],
  );

  return (
    <header className="todoapp__header">
      {state.todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${state.todos.every(todo => todo.completed) ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleNewTodoSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={handleNewTodoChange}
          ref={newTodoRef}
        />
      </form>
    </header>
  );
};
