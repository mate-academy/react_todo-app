import {
  FC,
  useState,
  FormEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import classNames from 'classnames';
import { Error } from '../../types/Error';
import { Todo } from '../../types/Todo';
import { addTodo } from '../../api/todos';
import { TodoCondition } from '../../types/TodoCondition';

type Props = {
  containsActive: boolean,
  handleError: (err: Error) => void,
  setTodoCondition: (arg: TodoCondition) => void,
  onTrickTempTodo: (newTodo: Todo | null) => void,
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  toggleAllTodos: () => void,
  USER_ID: number,
};

export const Header: FC<Props> = ({
  containsActive,
  handleError,
  setTodoCondition,
  onTrickTempTodo,
  setTodos,
  toggleAllTodos,
  USER_ID,
}) => {
  const [title, setTitle] = useState<string>('');
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      return handleError(Error.EmptyInput);
    }

    setIsInputDisabled(true);
    setTodoCondition(TodoCondition.saving);

    const newTodo = {
      id: 0,
      userId: USER_ID,
      title,
      completed: false,
    };

    onTrickTempTodo(newTodo);
    setTitle('');

    return addTodo(newTodo)
      .then((result) => {
        onTrickTempTodo(null);
        setTodos((prev: Todo[]) => [...prev, result]);
      })
      .catch(() => handleError(Error.Add))
      .finally(() => {
        setTodoCondition(TodoCondition.neutral);
        setIsInputDisabled(false);
      });
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: containsActive },
        )}
        aria-label="Complete all todos button"
        onClick={toggleAllTodos}
      />

      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          disabled={isInputDisabled}
        />
      </form>
    </header>
  );
};
