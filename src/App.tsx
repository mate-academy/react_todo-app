import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Header,
  HeaderInput,
  HeaderTitle,
  ToggleAllTodos,
} from './Header';

import {
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
import { Todo } from './types/todo';

import {
  getTodosFromLS,
  uploadTodosToLS,
} from './api/LocalStorageManipulation';
import { Main } from './Main/Main';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(getTodosFromLS());
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteringMethod = useCallback(() => {
    let todosToFilter = [...todos];

    if (filter !== 'All') {
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
    if (inputRef) {
      inputRef.current?.focus();
    }

    setTodos(getTodosFromLS());
  }, []);

  useEffect(() => filteringMethod(), [filteringMethod]);

  const todosUpdater = (todosToChange: Todo[]) => {
    setTodos(todosToChange);
    uploadTodosToLS(todosToChange);
  };

  const filterChange = useCallback(
    (todosFilter: Filter) => setFilter(todosFilter), [filter],
  );

  const createNewTodo = (title: string) => {
    if (!title.trim()) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      completed: false,
      title,
    };

    const updatedTodos = [...todos, newTodo];

    todosUpdater(updatedTodos);
  };

  const checkCompletedTodo = todos.filter(todo => todo.completed);

  return (
    <div className="todoapp">
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

      {todos.length > 0 && (
        <>
          <Main>
            <TodoList>
              <>
                {visibleTodos.map(todo => {
                  const { id, title, completed } = todo;

                  return (
                    <TodoCard
                      key={id}
                      id={id}
                      title={title}
                      completed={completed}
                      todosUpdater={todosUpdater}
                      todos={todos}
                    />
                  );
                })}
              </>
            </TodoList>
          </Main>

          <Footer>
            <>
              <TodoCounter todos={todos} />

              <Filters
                filterChange={filterChange}
                filter={filter}
              />

              {Boolean(checkCompletedTodo.length) && (
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
  );
};
