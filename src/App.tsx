/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { Footer } from './components/Footer';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { Filter } from './enums/Filter';
import { reducer } from './utils/reducer';
import { useLocalStorage } from './utils/useLocalStorage';
import { ErrorNotification } from './components/ErrorNotification';

const INITIAL_STATE = {
  todos: [],
  error: '',
};

export const App: React.FC = () => {
  const [storageTodos, setStorageTodos] = useLocalStorage('todos', []);
  const [{ todos, error }, dispatch] = useReducer(
    reducer,
    { ...INITIAL_STATE, todos: storageTodos },
  );
  const { filter } = useParams();

  useEffect(() => {
    setStorageTodos(todos);
  }, [todos]);

  const unfinishedTodos = useMemo(
    () => todos.filter(todo => !todo.completed).length, [todos],
  );

  const isSomeFinished = useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  const isAllFinished = useMemo(() => {
    return todos.every(todo => todo.completed);
  }, [todos]);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case Filter.ACTIVE:
        return todos.filter((todo) => !todo.completed);

      case Filter.COMPLETED:
        return todos.filter((todo) => todo.completed);

      default:
        return todos;
    }
  }, [filter, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <NewTodo
          dispatch={dispatch}
          isAllFinished={isAllFinished}
        />

        {!!todos.length && (
          <>
            <TodoList
              todos={visibleTodos}
              dispatch={dispatch}
            />

            <Footer
              dispatch={dispatch}
              unfinishedTodosLeft={unfinishedTodos}
              isSomeFinished={isSomeFinished}
            />
          </>
        )}

        {!!error && (
          <ErrorNotification
            error={error}
            dispatch={dispatch}
          />
        )}
      </div>
    </div>
  );
};
