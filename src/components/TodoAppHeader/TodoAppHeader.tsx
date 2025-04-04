import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { StateContext } from '../../utils/GlobalStateContext';

export const TodoAppHeader: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { todos, hasAllCompleted, toggleAllTodo, addTodo } =
    useContext(StateContext);

  const focusOnInput = useCallback(() => inputRef.current?.focus(), []);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTitle = newTodoTitle.trim();

    if (!newTitle) {
      focusOnInput();

      return;
    }

    addTodo(newTitle);
    setNewTodoTitle('');
  };

  useEffect(() => {
    focusOnInput();
  }, [todos.length, focusOnInput]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: hasAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAllTodo}
        />
      )}

      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={onInputChange}
          autoFocus
        />
      </form>
    </header>
  );
};
