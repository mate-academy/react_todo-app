/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Error } from './Error';
import { TodoList } from './TodoList';
import { Header } from './Header';
import { Footer } from './Footer';
import { useTodo } from './TodoContext';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { ErrorStatus } from './types/Error';

type Props = {
  visibleTodos: Todo[];
};

const USER_ID = 9968;

export const App: React.FC<Props> = ({
  visibleTodos,
}) => {
  const {
    todos,
    setTodos,
    error,
    setError,
  } = useTodo();
  const [isVisible, setIsVisible] = useState(true);
  const { pathname } = useLocation();
  const [filter, setFilter] = useState(FilterStatus.all);

  const active = todos.filter(todo => todo.completed === false).length;
  const completed = todos.filter(todo => todo.completed).length;

  const toggleAll = todos.map(todo => (
    {
      ...todo,
      completed: true,
    }
  ));

  const untoggleAll = todos.map(todo => (
    {
      ...todo,
      completed: false,
    }
  ));

  useEffect(() => {
    if (pathname === '/completed') {
      setFilter(FilterStatus.completed);
    }

    if (pathname === '/active') {
      setFilter(FilterStatus.active);
    }
  }, [pathname]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos);
  }, []);

  useEffect(() => {
    let timer1;
    let timer2;

    if (error) {
      if (timer1) {
        clearTimeout(timer1);
      }

      if (timer2) {
        clearTimeout(timer2);
      }

      timer1 = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      timer2 = setTimeout(() => {
        setError(ErrorStatus.none);
      }, 3700);
    } else {
      setIsVisible(true);
    }
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          setTodos={setTodos}
        />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={todos}
              visibleTodos={visibleTodos}
              toggleAll={toggleAll}
              untoggleAll={untoggleAll}
            />

            <Footer
              todos={todos}
              active={active}
              completed={completed}
              filter={filter}
              setFilter={setFilter}
              setTodos={setTodos}
            />
          </>
        )}
      </div>

      {error && (
        <Error
          text={error}
          isVisible={isVisible}
        />
      )}
    </div>
  );
};
