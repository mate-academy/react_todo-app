import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { AuthContext } from './Auth/AuthContext';

import {
  Header,
  HeaderInput,
  HeaderTitle,
  ToggleAllTodos,
} from './Header';

import {
  Main,
  TodoList,
  TodoCard,
} from './Main';

import {
  Footer,
  Filters,
  ClearCompleted,
  TodoCounter,
} from './Footer';

import { Filter } from './types/FilterEnum';
import { Error } from './types/ErrorEnum';
import { ErrorType } from './types/Error';
import { Todo } from './types/Todo';

import {
  getTodosFromLS,
  uploadTodosToLS,
} from './api/LocalStorageManipulation';
import { getTodos, postTodo } from './api/todos';
import { ErrorNotifications } from './ErrorNotifications';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>(getTodosFromLS());
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [isError, setIsError] = useState<ErrorType>({
    message: Error.NONE,
    status: false,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const errorNotification = useCallback((text: Error) => {
    setIsError({ message: text, status: true });

    setTimeout(() => {
      setIsError({
        message: text,
        status: false,
      });
    }, 3000);
  }, []);

  const fetchTodos = useCallback(async () => {
    try {
      if (user) {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      }
    } catch (error) {
      errorNotification(Error.LOAD);
    }
  }, [user]);

  const filteringMethod = useCallback(() => {
    let todosToFilter = [...todos];

    if (filter !== Filter.All) {
      todosToFilter = todosToFilter.filter(todo => {
        switch (filter) {
          case Filter.Active:
            return !todo.completed;

          case Filter.Completed:
            return todo.completed;

          default:
            return true;
        }
      });
    }

    setVisibleTodos(todosToFilter);
  }, [todos, filter]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // setTodos(getTodosFromLS());
    fetchTodos();
  }, []);

  useEffect(() => filteringMethod(), [filteringMethod]);

  const todosUpdater = (todosToChange: Todo[]) => {
    setTodos(todosToChange);
    uploadTodosToLS(todosToChange);
  };

  const filterChange = useCallback(
    (todosFilter: Filter) => setFilter(todosFilter), [filter],
  );

  const createNewTodo = async (title: string) => {
    try {
      if (!title.trim()) {
        return;
      }

      const newTodo = {
        id: +new Date(),
        completed: false,
        title,
      };

      const updatedTodos = [...todos, newTodo];

      await postTodo(newTodo);
      todosUpdater(updatedTodos);
    } catch (error) {
      errorNotification(Error.ADD);
    }
  };

  const handleErrorClose = useCallback(() => setIsError({
    message: isError.message,
    status: false,
  }), []);

  const checkCompletedTodo = todos.filter(todo => todo.completed);

  return (
    <div className="todoapp">
      <div className="todoapp__content">
        <Header>
          <>
            <HeaderTitle />
            <ToggleAllTodos
              todoUpdater={todosUpdater}
              todos={todos}
            />
            <HeaderInput
              createNewTodo={createNewTodo}
              inputRef={inputRef}
            />
          </>
        </Header>

        {!!todos.length && (
          <>
            <Main>
              <TodoList>
                {visibleTodos.map(todo => (
                  <React.Fragment key={todo.id}>
                    <TodoCard
                      todo={todo}
                      todosUpdater={todosUpdater}
                      todos={todos}
                      errorNotification={errorNotification}
                    />
                  </React.Fragment>
                ))}
              </TodoList>
            </Main>

            <Footer>
              <>
                <TodoCounter todos={todos} />

                <Filters
                  filterChange={filterChange}
                  filter={filter}
                />

                {!!checkCompletedTodo.length && (
                  <ClearCompleted
                    todosUpdater={todosUpdater}
                    todos={todos}
                  />
                )}
              </>
            </Footer>
          </>
        )}
      </div>

      <ErrorNotifications
        isError={isError}
        handleErrorClose={handleErrorClose}
      />
    </div>
  );
};
