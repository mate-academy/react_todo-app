import classNames from 'classnames';
import { useContext, useState } from 'react';
import { deleteTodo, patchTodo } from '../../api/todos';
import { Error } from '../../types/Error';
import { Todo } from '../../types/Todo';
import { AuthContext } from '../Auth/AuthContext';

type Props = {
  todo: Todo,
  todos: Todo[],
  setTodos: (arg: Todo[]) => void,
  isActiveField: number,
  setIsActiveField: (arg: number) => void,
  setIsError: (arg: Error | null) => void,
  filteredTodos: Todo[] | null,
  setTodosList: () => void | undefined,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  todos,
  setTodos,
  isActiveField,
  setIsActiveField,
  setIsError,
  filteredTodos,
  setTodosList,
}) => {
  const [query, setQuery] = useState('');
  const user = useContext(AuthContext);

  const deleteTodosItem = async (todoId: number) => {
    if (user) {
      setIsError(null);
      await deleteTodo(todoId)
        .then(() => {
          if (filteredTodos) {
            setTodos(
              filteredTodos
                .filter((item: Todo) => item.id !== todoId),
            );
          }
        })
        .catch(() => setIsError(Error.Delete));
    }
  };

  const toggleTodo = (completed = false) => {
    if (user && filteredTodos) {
      const data = {
        completed,
      };

      const getChangedTodos = (completedTodo: boolean) => {
        if (filteredTodos) {
          const todosList = [...filteredTodos];

          todosList[filteredTodos
            .indexOf(todo)].completed = completedTodo;

          return todosList;
        }

        return [];
      };

      patchTodo(todo.id, data)
        .then(() => {
          setTodos(getChangedTodos(completed));
        })
        .catch(() => {
          setTodos(getChangedTodos(!completed));
          setIsError(Error.Update);
        });
    }
  };

  const onChangeTodosTitle = () => {
    if (user && filteredTodos) {
      const todosList = [...todos];

      if (todo.title === query) {
        return;
      }

      if (!query) {
        deleteTodosItem(todo.id);

        return;
      }

      const patchChangedTitle = (index: number, todosTitle: string) => {
        setIsError(null);
        const data = {
          completed: todo.completed,
          title: todosTitle,
        };

        todosList[index].title = query;
        setTodos(todosList);

        return patchTodo(todo.id, data)
          .then(() => {
            todosList[index].title = query;

            return todosList;
          })
          .catch(() => {
            setTodosList();
            setIsError(Error.Update);
          });
      };

      filteredTodos.map((item, index) => {
        if (todo.id === item.id) {
          return patchChangedTitle(index, query);
        }

        return [];
      });

      setTodos(todosList);
    }
  };

  const leaveInput = () => {
    onChangeTodosTitle();
    setIsActiveField(0);
  };

  const keyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Escape') {
      setQuery(todo.title);
      setIsActiveField(0);
    } else if (event.key === 'Enter') {
      leaveInput();
    }
  };

  return (
    <li
      className={classNames(
        { editing: isActiveField === todo.id },
        { completed: todo.completed },
        { view: isActiveField !== todo.id },
      )}
    >
      {isActiveField !== todo.id ? (
        <div className="view">
          <input
            checked={todo.completed}
            type="checkbox"
            className="toggle"
            onClick={() => {
              toggleTodo(!todo.completed);
            }}
          />
          <label
            onDoubleClick={() => setIsActiveField(todo.id)}
          >
            {todo.title}
          </label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => deleteTodosItem(todo.id)}
            aria-label="delete"
          />
        </div>
      )
        : (
          <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            type="text"
            className="edit"
            onFocus={() => setQuery(todo.title)}
            onChange={(event) => setQuery(event.target.value)}
            value={query}
            onKeyUp={keyUpHandler}
            onBlur={leaveInput}
          />
        )}
    </li>
  );
};
