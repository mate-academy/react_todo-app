/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { Header } from './components/Header/Header';
import { TodoItem } from './components/TodoItem/TodoItsm';
import { Todo } from './types/Todo';
import { SortBy } from './types/SortBy';
import { Footer } from './components/Footer/Footer';
import { DispatchContext, StateContext } from './store/Store';

export const App: React.FC = () => {
  const todos = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [howSort, setHowSort] = useState<SortBy>(SortBy.All);

  const sortList = (sort: SortBy) => {
    switch (sort) {
      case SortBy.Active:
        return todos.filter(todo => !todo.completed);
      case SortBy.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const sortedTodos: Todo[] = sortList(howSort);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <section className="todoapp__main" data-cy="TodoList">
          {sortedTodos.map(todo => (
            <TodoItem
              todo={todo}
              key={todo.id}
              handleDelete={() =>
                dispatch({ type: 'delete', payload: todo.id })
              }
              handleChangeCheckbox={() =>
                dispatch({ type: 'toggleCompleted', payload: todo.id })
              }
              handleUpdateTodo={(id, newTitle) =>
                dispatch({
                  type: 'updateTitle',
                  payload: { id, title: newTitle },
                })
              }
            />
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer howSort={howSort} setHowSort={setHowSort} />
        )}
      </div>
    </div>
  );
};
