/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useReducer } from 'react';
import { FilterForTodos } from './utils/enum';
import { State } from './utils/interface';
import { Action, DispatchFunction, GlobalStateProps } from './utils/types';

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    }

    case 'onEdit': {
      return {
        ...state,
        todoEdit: action.payload,
      };
    }

    case 'edit': {
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

    case 'delete': {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    }

    case 'complited': {
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

    case 'clearComplited': {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.completed !== true),
      };
    }

    case 'filterBy': {
      return {
        ...state,
        todofilter: action.payload,
      };
    }

    case 'toggleAll': {
      return {
        ...state,
        todoToggleAll: !state.todoToggleAll,
        todos: state.todos.map(todo => ({
          ...todo, completed: !state.todoToggleAll,
        })),
      };
    }

    case 'cancelEdit': {
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
  todofilter: FilterForTodos.All,
  todoToggleAll: false,
};

export const StateContext = React.createContext<State>(initialState);
export const DispatchContext = React.createContext<DispatchFunction>((_action: Action) => {});

export const GlobalStateProvider: React.FC<GlobalStateProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
