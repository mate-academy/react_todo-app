import {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface Props {
  addTodoToServer: (todoTitle: string) => void;
  isAdding: boolean;
  generateError: (message: string) => void;
  toggleAllTodosStatusOnServer: () => Promise<void>;
}

export const TodoForm: FC<Props> = memo(({
  addTodoToServer,
  isAdding,
  generateError,
  toggleAllTodosStatusOnServer,
}) => {
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todoText, setTodoText] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todoText.trim() === '') {
      generateError('Title can\'t be empty');

      return;
    }

    addTodoToServer(todoText);
  }, [todoText]);

  useEffect(() => {
    if (!isAdding) {
      setTodoText('');
    }
  }, [isAdding]);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, [isAdding]);

  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        type="button"
        className="todoapp__toggle-all active"
        aria-label="ToggleAllButton"
        onClick={toggleAllTodosStatusOnServer}
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          value={todoText}
          onChange={handleChange}
          disabled={isAdding}
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
});
