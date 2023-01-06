import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ClearCompleted } from './ClearCompleted';
import { Filters } from './Filters';
import { Footer } from './Footer';
import { Header } from './Header';
import { HeaderInput } from './HeaderInput';
import { HeaderTitle } from './HeaderTitle';
import { Main } from './Main';
import { TodoCard } from './TodoCard';
import { TodoCounter } from './TodoCounter';
import { TodoList } from './TodoList';
import { ToggleAllTodos } from './ToggleAllTodos';
import { Filter } from './types/Filter';
import { Todo } from './types/todo';
import {
  getTodosFromLS,
  uploadTodosToLS,
} from './utils/LocalStorageManipulation';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef) {
      inputRef.current?.focus();
    }

    // console.log('todos setted');
    setTodos(getTodosFromLS());
  }, []);

  useEffect(() => {
    // console.log('filtered');
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

    return () => setVisibleTodos(todos);
  }, [todos, filter]);

  const todosUpdater = (todosToChange: Todo[]) => {
    // console.log('some todo has updated');
    uploadTodosToLS(todosToChange);
    setTodos(todosToChange);
  };

  const filterChange = useCallback(
    (todosFilter: Filter) => setFilter(todosFilter), [todos],
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

              <Filters filterChange={filterChange} filter={filter} />

              <ClearCompleted todosUpdater={todosUpdater} todos={todos} />
            </>
          </Footer>
        </>
      )}
    </div>
  );
};
