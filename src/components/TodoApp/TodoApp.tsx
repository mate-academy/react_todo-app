import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { getTodos, patchTodo } from '../../api/todos';
import { AuthContext } from '../Auth/AuthContext';
import { TodoList } from '../TodoList';

import { Error } from '../../types/Error';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setTodos: (arg: Todo[]) => void,
  setIsError: (arg: Error | null) => void,
  filter: Status,
  setFilter: (arg: Status) => void,
};

export const TodoApp: React.FC<Props> = ({
  todos,
  setTodos,
  setIsError,
  filter,
  setFilter,
}) => {
  const [isActiveToggleAll, setIsActiveToggleAll] = useState(false);

  const user = useContext(AuthContext);
  const locate = useLocation();

  const setTodosList = () => {
    if (!user) {
      return;
    }

    getTodos(user.id)
      .then(data => setTodos(data))
      .catch(() => {
        setIsError(Error.Update);
        setTodos([]);
      });
  };

  const isAllTodosCompleted = () => {
    for (let i = 0; i < todos.length; i += 1) {
      if (!todos[i].completed) {
        return false;
      }
    }

    return true;
  };

  const toggleAllTodos = useCallback(() => {
    const todosList = [...todos];
    let countCompleted = 0;

    const patchAllToggledTodos = (index: number, isCompleted: boolean) => {
      return patchTodo(todos[index].id, { completed: isCompleted })
        .then(() => {
          todosList[index].completed = isCompleted;

          return todosList[index];
        })
        .catch(() => {
          setIsError(Error.Update);
        });
    };

    let promises = todos.map((todo, index) => {
      if (!todo.completed) {
        return patchAllToggledTodos(index, true);
      }

      countCompleted += 1;

      return [];
    });

    if (countCompleted === todos.length) {
      promises = todos.map((_, index) => {
        return patchAllToggledTodos(index, false);
      });
    }

    Promise.all(promises)
      .then(() => {
        setTodos(todosList);
      });
  }, [todos]);

  const setFiltersParam = () => {
    const location = locate.pathname;

    switch (true) {
      case location.includes(Status.Completed.toLowerCase()):
        setFilter(Status.Completed);
        break;
      case location.includes(Status.Active.toLowerCase()):
        setFilter(Status.Active);
        break;
      default:
        setFilter(Status.All);
    }
  };

  const getFilteredTodos = () => {
    if (!todos || todos.length === 0) {
      return null;
    }

    const todosList = [...todos];

    if (filter === Status.All) {
      return todosList;
    }

    return todosList.filter((todo) => {
      switch (filter) {
        case Status.Active: return !todo.completed;
        case Status.Completed: return todo.completed;
        default:
          return true;
      }
    });
  };

  const filteredTodos = useMemo(() => getFilteredTodos(), [todos, filter]);

  useEffect(() => {
    Promise.all(
      [isAllTodosCompleted()],
    ).then(([value]) => setIsActiveToggleAll(value));
  }, [todos]);

  useEffect(() => {
    setTodosList();
    setFiltersParam();
  }, [locate]);

  return (
    <section className="main">
      <input
        checked={isActiveToggleAll}
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={toggleAllTodos}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <TodoList
        filteredTodos={filteredTodos}
        setIsError={setIsError}
        todos={todos}
        setTodos={setTodos}
        setTodosList={setTodosList}
      />
    </section>
  );
};
