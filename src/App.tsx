import React, { ChangeEvent, useContext, useState } from 'react';
import { DispatchContext, StateContext } from './TodosContext';
import { TodoList } from './components/TodoList/TodoList';
import { ReducerType } from './types/enums/ReducerType';
import { TodosFilter } from './components/TodosFilter/TodosFilter';

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);
  const [titleTodo, setTitleTodo] = useState('');

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (titleTodo.trim()) {
      dispatch({
        type: ReducerType.AddTodo,
        payload: {
          id: +new Date(),
          title: titleTodo.trim(),
          completed: false,
        },
      });
    }

    setTitleTodo('');
  };

  const handleInputTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;

    setTitleTodo(value);
  };

  const handleInputToggleAllChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ReducerType.ToggleAll,
      payload: event.target.checked,
    });
  };

  const handleClearCompleted = () => {
    dispatch({
      type: ReducerType.ClearCompletedTodos,
    });
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleFormSubmit} onBlur={handleFormSubmit}>
          <input
            type="text"
            name="titleTodo"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={titleTodo}
            onChange={handleInputTitleChange}
          />
        </form>
      </header>

      {
        todos.length !== 0 && (
          <>
            <section className="main">
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                data-cy="toggleAll"
                checked={todos.every(todo => todo.completed)}
                onChange={handleInputToggleAllChange}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>

              <TodoList />
            </section>

            <footer className="footer">
              <span className="todo-count" data-cy="todosCounter">
                3 items left
              </span>

              <TodosFilter />

              <button
                type="button"
                className="clear-completed"
                onClick={handleClearCompleted}
              >
                Clear completed
              </button>
            </footer>
          </>
        )
      }
    </div>
  );
};
