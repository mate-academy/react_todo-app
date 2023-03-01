import classNames from 'classnames';
import { useContext, useState } from 'react';
import { deleteTodo, patchTodo } from '../../api/todos';
import { Error } from '../../types/Error';
import { Todo } from '../../types/Todo';
import { AppContext } from '../AppContext/AppContext';
import { AuthContext } from '../Auth/AuthContext';

type Props = {
  todo: Todo,
  isActiveField: number,
  setIsActiveField: (arg: number) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  isActiveField,
  setIsActiveField,
}) => {
  const [query, setQuery] = useState('');

  const todosData = useContext(AppContext);
  const user = useContext(AuthContext);

  const deleteTodosItem = async (todoId: number) => {
    if (user) {
      todosData?.setIsError(null);
      await deleteTodo(todoId)
        .then(() => {
          if (todosData?.filteredTodos) {
            todosData?.setTodos(
              todosData?.filteredTodos
                .filter((item: Todo) => item.id !== todoId),
            );
          }
        })
        .catch(() => todosData?.setIsError(Error.Delete));
    }
  };

  const toggleTodo = (completed = false) => {
    if (user && todosData?.filteredTodos) {
      const data = {
        completed,
      };

      const getChangedTodos = (completedTodo: boolean) => {
        if (todosData?.filteredTodos) {
          const todosList = [...todosData?.filteredTodos];

          todosList[todosData?.filteredTodos
            .indexOf(todo)].completed = completedTodo;

          return todosList;
        }

        return [];
      };

      patchTodo(todo.id, data)
        .then(() => {
          todosData?.setTodos(getChangedTodos(completed));
        })
        .catch(() => {
          todosData?.setTodos(getChangedTodos(!completed));
          todosData?.setIsError(Error.Update);
        });
    }
  };

  const onChangeTodosTitle = () => {
    if (user && todosData?.filteredTodos) {
      const todosList = [...todosData?.todos];

      if (todo.title === query) {
        return;
      }

      if (!query) {
        deleteTodosItem(todo.id);

        return;
      }

      const patchChangedTitle = (index: number, todosTitle: string) => {
        todosData?.setIsError(null);
        const data = {
          completed: todo.completed,
          title: todosTitle,
        };

        todosList[index].title = query;
        todosData?.setTodos(todosList);

        return patchTodo(todo.id, data)
          .then(() => {
            todosList[index].title = query;

            return todosList;
          })
          .catch(() => {
            todosData.setTodosList();
            todosData?.setIsError(Error.Update);
          });
      };

      todosData?.filteredTodos.map((item, index) => {
        if (todo.id === item.id) {
          return patchChangedTitle(index, query);
        }

        return [];
      });

      todosData?.setTodos(todosList);
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
            onKeyUp={(event) => keyUpHandler(event)}
            onBlur={() => leaveInput()}
          />
        )}
    </li>
  );
};
