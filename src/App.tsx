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
  UserStatus,
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
import { ErrorType } from './types/ErrorType';
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
    setIsError({
      message: Error.NONE,
      status: false,
    });

    try {
      if (user) {
        const newTodo = {
          id: 0,
          userId: user.id,
          completed: false,
          title,
        };

        await postTodo(newTodo);

        const lastTodoId = await getTodos(user.id);

        newTodo.id = lastTodoId[lastTodoId.length - 1].id;
        const updatedTodos = [...todos, newTodo];

        todosUpdater(updatedTodos);
      }
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
      <Header>
        <>
          <UserStatus user={user} />
          <HeaderTitle />
          <ToggleAllTodos
            todoUpdater={todosUpdater}
            todos={todos}
            errorNotification={errorNotification}
          />
          <HeaderInput
            createNewTodo={createNewTodo}
            inputRef={inputRef}
            errorNotification={errorNotification}
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
                  errorNotification={errorNotification}
                />
              )}
            </>
          </Footer>
        </>
      )}

      <ErrorNotifications
        isError={isError}
        handleErrorClose={handleErrorClose}
      />
    </div>
  );
};
