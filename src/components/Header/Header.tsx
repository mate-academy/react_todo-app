import {
  ChangeEvent,
  FC,
  FormEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TodosContext } from '../TodosProvider';
import classNames from 'classnames';

export const Header: FC = () => {
  const { todos, dispatch } = useContext(TodosContext);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  const allCompleted = useMemo(() => todos.every(t => t.completed), [todos]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const title = inputValue.trim();

    if (title) {
      dispatch({ type: 'add', payload: { title } });
    }

    setInputValue('');
  };

  const handleSetAll = (completed: boolean) => () =>
    dispatch({ type: 'setAll', payload: { completed } });

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleSetAll(!allCompleted)}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={handleInputChange}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
