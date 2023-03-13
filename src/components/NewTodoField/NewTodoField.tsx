/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Todo } from '../../types/Todo';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  isUploadError: boolean,
  onAdd: (todo: Todo) => void,
  isTodoLoading: boolean,
  toggleAll: () => void,
  setError: (value: ErrorType) => void,
};

export const NewTodoField: React.FC<Props> = ({
  isUploadError,
  onAdd,
  isTodoLoading,
  toggleAll,
  setError,
}) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const newTodoField = useRef<HTMLInputElement>(null);
  const user = useContext(AuthContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTodoTitle.trim()) {
      const newTodo = {
        title: newTodoTitle.trim(),
        completed: false,
        userId: user?.id,
        id: 0,
      };

      onAdd(newTodo);
      setNewTodoTitle('');
    } else {
      setError(ErrorType.EmptyTitle);
    }
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        type="button"
        className="todoapp__toggle-all active"
        onClick={toggleAll}
      />

      <form
        onSubmit={handleSubmit}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={event => setNewTodoTitle(event.target.value)}
          disabled={isUploadError || isTodoLoading}
        />
      </form>
    </header>
  );
};
