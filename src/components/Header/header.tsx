import classNames from 'classnames';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { addTodo, updateTodo } from '../../api/todos';
import { ErrorTodo } from '../../types/ErrorTodo';
import { Todo } from '../../types/Todo';
import { AppContext } from '../AppContext';

type Props = {
  numberOfCompletedTodo?: number,
  onSetTempTodo: (title: string) => Promise<void>,
  newTodo: Todo | null;
  setNewTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
};

export const Header: React.FC<Props> = ({
  numberOfCompletedTodo,
  onSetTempTodo,
  newTodo,
  setNewTodo,
}) => {
  const [isForbiddenFocus, setIsForbiddenFocus] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const newTodoField = useRef<HTMLInputElement>(null);
  const {
    showErrorMessage,
    closeErrorMessage,
    todosFromServer,
    setTodosFromServer,
    setIdOfTodosForLoader: seiIdOfTodosForUpdate,
  } = useContext(AppContext);

  const handleTitle = (value: string) => {
    setNewTitle(value);
    closeErrorMessage();
  };

  const createNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTitle.trim()) {
      showErrorMessage(ErrorTodo.EmptyTitle);

      return;
    }

    onSetTempTodo(newTitle);
    setNewTitle('');
  };

  async function addingTodo() {
    if (newTodo) {
      setIsForbiddenFocus(true);
      const addedTodo = await addTodo(newTodo);

      try {
        if ('Error' in addedTodo) {
          throw new Error();
        }

        if (todosFromServer) {
          setTodosFromServer([...todosFromServer, addedTodo]);
        }

        if (!todosFromServer) {
          setTodosFromServer([addedTodo]);
        }
      } catch {
        showErrorMessage(ErrorTodo.Add);
      } finally {
        setIsForbiddenFocus(false);
        setNewTodo(null);
      }
    }
  }

  const handleUpdateStatus = () => {
    let newTodos = todosFromServer;

    closeErrorMessage();

    if (todosFromServer?.find(
      todoFromServer => !todoFromServer.completed,
    )) {
      const todosForUpdating = todosFromServer
        .filter(todoFromServer => !todoFromServer.completed);

      seiIdOfTodosForUpdate(todosForUpdating.map(todo => todo.id));

      Promise.allSettled(todosForUpdating.map(updatedTodo => updateTodo({
        ...updatedTodo,
        completed: !updatedTodo.completed,
      })))
        .then(results => results.forEach(result => {
          if (result.status === 'fulfilled' && 'Error' in result.value) {
            showErrorMessage(ErrorTodo.Update);
          } else if (result.status === 'fulfilled') {
            newTodos = newTodos?.map(todoFromServer => {
              if (todoFromServer.id === result.value.id) {
                return result.value;
              }

              return todoFromServer;
            });

            setTodosFromServer(newTodos);
          }

          seiIdOfTodosForUpdate([]);
        }));
    } else if (todosFromServer) {
      seiIdOfTodosForUpdate(todosFromServer.map(todo => todo.id));

      Promise.allSettled(todosFromServer?.map(updatedTodo => updateTodo({
        ...updatedTodo,
        completed: !updatedTodo.completed,
      })))
        .then(results => results.forEach(result => {
          if (result.status === 'fulfilled' && 'Error' in result.value) {
            showErrorMessage(ErrorTodo.Update);
          } else if (result.status === 'fulfilled') {
            newTodos = newTodos?.map(todoFromServer => {
              if (todoFromServer.id === result.value.id) {
                return result.value;
              }

              return todoFromServer;
            });

            setTodosFromServer(newTodos);
          }

          seiIdOfTodosForUpdate([]);
        }));
    }
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    addingTodo();
  }, [newTodo]);

  return (
    <header className="todoapp__header">
      <button
        onClick={handleUpdateStatus}
        aria-label="ToggleAllButton"
        data-cy="ToggleAllButton"
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          {
            active: !numberOfCompletedTodo,
          },
        )}
      />

      <form onSubmit={createNewTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={(event) => handleTitle(event.currentTarget.value)}
          disabled={isForbiddenFocus}
        />
      </form>
    </header>
  );
};
