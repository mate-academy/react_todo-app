/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useContext } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Error } from './Error';
import { TodoList } from './TodoList';
import { Header } from './Header';
import { Footer } from './Footer';
import { TodosContext } from './TodoContext';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';

type Props = {
  visibleTodos: Todo[];
  filter: FilterStatus,
  setFilter(filterType: FilterStatus): void,
};

const USER_ID = 9968;

export const App: React.FC<Props> = ({
  visibleTodos,
  filter,
  setFilter,
}) => {
  const {
    todos,
    setTodos,
    isDeleteError,
    setIsDeleteError,
    isAddError,
    setIsAddError,
    isUpdateError,
    setIsUpdateError,
  } = useContext(TodosContext);
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
    getTodos(USER_ID)
      .then(value => {
        setTodos(value);
      });
  }, []);

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
          <TodoList
            todos={todos}
            visibleTodos={visibleTodos}
            toggleAll={toggleAll}
            untoggleAll={untoggleAll}
          />
        )}
      </div>

      <Footer
        todos={todos}
        active={active}
        completed={completed}
        filter={filter}
        setFilter={setFilter}
        setTodos={setTodos}
      />

      {isAddError && (
        <Error
          text="Unable to add a todo"
          setIsError={setIsAddError}
        />
      )}

      {isDeleteError && (
        <Error
          text="Unable to delete a todo"
          setIsError={setIsDeleteError}
        />
      )}

      {isUpdateError && (
        <Error
          text="Unable to update a todo"
          setIsError={setIsUpdateError}
        />
      )}
    </div>
  );
};
