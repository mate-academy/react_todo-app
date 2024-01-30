/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useReducer } from 'react';
import { ActionType, TodoFilterType } from './utils/enums';
import { State } from './utils/interfaces';
import { Action, DispatchFunction, GlobalStateProps } from './utils/types';

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.Add: {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    }

    case ActionType.OnEdit: {
      return {
        ...state,
        todoEdit: action.payload,
      };
    }

    case ActionType.Edit: {
      const changeTodo = () => {
        const indexOfTodo = state.todos.indexOf(action.payload.todo);
        const newStateTodos = [...state.todos];

        newStateTodos[indexOfTodo].title = action.payload.title;

        return [...newStateTodos];
      };

      return {
        ...state,
        todoEdit: 0,
        todos: changeTodo(),
      };
    }

    case ActionType.Delete: {
      return {
        ...state,
        todoEdit: 0,
        todos: [...state.todos.filter((todo) => todo.id !== action.payload)],
      };
    }

    case ActionType.Completed: {
      const complitedTodo = () => {
        const indexOfTodo = state.todos.indexOf(action.payload);
        const newStateTodos = [...state.todos];

        newStateTodos[indexOfTodo].completed
        = !newStateTodos[indexOfTodo].completed;

        return [...newStateTodos];
      };

      return {
        ...state,
        todos: complitedTodo(),
      };
    }

    case ActionType.ClearCompleted: {
      return {
        ...state,
        todos: [...state.todos.filter(todo => todo.completed !== true)],
      };
    }

    case ActionType.FilterBy: {
      return {
        ...state,
        todofilter: action.payload,
      };
    }

    case ActionType.ToggleAll: {
      return {
        ...state,
        todoToggleAll: !state.todoToggleAll,
        todos: state.todos.map(todo => ({
          ...todo, completed: !state.todoToggleAll,
        })),
      };
    }

    case ActionType.CancelEdit: {
      return {
        ...state,
        todoEdit: 0,
      };
    }

    default:
      return { ...state };
  }
}

const initialState: State = {
  todos: [],
  todoEdit: 0,
  todofilter: TodoFilterType.All,
  todoToggleAll: false,
};

export const StateContext = React.createContext<State>(initialState);
export const DispatchContext = React.createContext<DispatchFunction>((_action: Action) => {});

export const GlobalStateProvider: React.FC<GlobalStateProps> = ({ children }) => {
  const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
  const [state, dispatch] = useReducer(reducer, { ...initialState, todos: storedTodos });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
