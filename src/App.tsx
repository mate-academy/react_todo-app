/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { TodoList } from './components/todoList';
import React, { useReducer, useEffect } from 'react';
import { TodoContext } from './context/TodoContext';
import { NewTodo } from './components/NewTodo';
import { FILTERS } from './constants/filters';
import { Filter } from './components/Filter';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface State {
  todos: Todo[];
  filter: FilterType;
}

const savedTodos = localStorage.getItem('todos');

type FilterType = (typeof FILTERS)[keyof typeof FILTERS];

const initialState: State = {
  todos: savedTodos ? JSON.parse(savedTodos) : [],
  filter: FILTERS.all,
};

interface UpdatePayload {
  id: number;
  title: string;
}

export type Action =
  | { type: 'add'; payload: Todo }
  | { type: 'remove'; payload: number }
  | { type: 'toggle'; payload: number }
  | { type: 'setFilter'; payload: FilterType }
  | { type: 'clearCompleted' }
  | { type: 'update'; payload: UpdatePayload }
  | { type: 'toggleAll' };

function reducer(state: State, action: Action): State {
  if (action.type === 'add') {
    return {
      ...state,
      todos: [...state.todos, action.payload],
    };
  }

  if (action.type === 'remove') {
    return {
      ...state,
      todos: state.todos.filter(todo => todo.id !== action.payload),
    };
  }

  if (action.type === 'toggle') {
    return {
      ...state,
      todos: state.todos.map(todo => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    };
  }

  if (action.type === 'setFilter') {
    return {
      ...state,
      filter: action.payload,
    };
  }

  if (action.type === 'clearCompleted') {
    return {
      ...state,
      todos: state.todos.filter(todo => !todo.completed),
    };
  }

  if (action.type === 'update') {
    return {
      ...state,
      todos: state.todos.map(todo => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            title: action.payload.title,
          };
        }

        return todo;
      }),
    };
  }

  if (action.type === 'toggleAll') {
    const allCompleted = state.todos.every(todo => todo.completed);

    return {
      ...state,
      todos: state.todos.map(todo => ({
        ...todo,
        completed: !allCompleted,
      })),
    };
  }

  return state;
}

export const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const allCompleted = state.todos.every(todo => todo.completed);
  const activeTodosCount = state.todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = state.todos.some(todo => todo.completed);
  const hasTodos = state.todos.length > 0;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  let visibleTodos = state.todos;

  if (state.filter === FILTERS.active) {
    visibleTodos = state.todos.filter(todo => !todo.completed);
  }

  if (state.filter === FILTERS.completed) {
    visibleTodos = state.todos.filter(todo => todo.completed);
  }

  return (
    <TodoContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <header className="todoapp__header">
            {/* this button should have `active` class only if all todos are completed */}
            {hasTodos && (
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: 'toggleAll',
                  })
                }
                className={classNames('todoapp__toggle-all', {
                  active: allCompleted,
                })}
                data-cy="ToggleAllButton"
              />
            )}

            {/* Add a todo on form submit */}
            <NewTodo />
          </header>

          {hasTodos && <TodoList todos={visibleTodos} />}

          {/* Hide the footer if there are no todos */}
          {hasTodos && (
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {activeTodosCount} items left
              </span>

              {/* Active link should have the 'selected' class */}
              <Filter />

              {/* this button should be disabled if there are no completed todos */}
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={!hasCompletedTodos}
                onClick={() =>
                  dispatch({
                    type: 'clearCompleted',
                  })
                }
              >
                Clear completed
              </button>
            </footer>
          )}
        </div>
      </div>
    </TodoContext.Provider>
  );
};
