import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { USER_ID } from '../../api/todos';
import classNames from 'classnames';
import { ErrorMessage } from '../../types/ErrorMessage';
import { useTodosContext } from '../../contexts/TodosContext';
import { useAddContext } from '../../contexts/AddContext';
import { useErrorContext } from '../../contexts/ErrorContext';
import { useUpdateContext } from '../../contexts/UpdateContext';
import { useDeleteContext } from '../../contexts/DeleteContext';

type Props = {
  onAddLoader: (value: boolean) => void;
  isAddLoader: boolean;
  IsLoadLoader: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
};

export const Header: React.FC<Props> = ({
  onAddLoader,
  isAddLoader,
  IsLoadLoader,
  inputRef,
}) => {
  const [title, setTitle] = useState('');

  const { todos, setTodos } = useTodosContext();
  const { setErrorMessage, setIsHiddenErrorMessage } = useErrorContext();
  const { addTodo } = useAddContext();
  const { updateTodo } = useUpdateContext();
  const { beforeDeleteBlur } = useDeleteContext();

  const checkCompleted = todos.every(todo => todo.completed);

  const handleToggleTodos = () => {
    setTodos((prev: Todo[]) =>
      prev.map(todo => {
        if (todo.completed !== !checkCompleted) {
          const updated = {
            ...todo,
            completed: !checkCompleted,
            isLoading: false,
          };

          updateTodo(updated);

          return updated;
        }

        return todo;
      }),
    );
  };

  useEffect(() => {
    if (!isAddLoader) {
      inputRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddLoader]);

  useEffect(() => {
    if (!beforeDeleteBlur) {
      inputRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beforeDeleteBlur]);

  return (
    <header className="todoapp__header">
      {!IsLoadLoader && todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: checkCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleTodos}
        />
      )}

      <form
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          const cleanTitle = title.trim();

          if (cleanTitle !== '') {
            onAddLoader(true);
            addTodo({
              title: cleanTitle,
              completed: false,
              userId: USER_ID,
            })
              .then(() => setTitle(''))
              .catch(() => {})
              .finally(() => {
                onAddLoader(false);
              });
          } else {
            setErrorMessage(ErrorMessage.emptyTitleError);
            setIsHiddenErrorMessage(false);
          }
        }}
      >
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
          disabled={isAddLoader}
        />
      </form>
    </header>
  );
};
