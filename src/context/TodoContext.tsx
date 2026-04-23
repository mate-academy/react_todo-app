/* eslint-disable @typescript-eslint/indent */
import React, { createContext, useReducer, useEffect, useState } from 'react';
import { Todo } from '../types/todo';
import { useTodoLocalStorage } from '../hooks/useTodoLocalStorage';

type Filter = 'all' | 'active' | 'completed';

export const TodoContext = createContext<Todo[]>([]);
export const TodoContextDispatch = createContext<React.Dispatch<Action> | null>(
  null,
);

export const TodoFilterContext = createContext<Filter | null>(null);
export const TodoFilterContextDispatch = createContext<React.Dispatch<
  React.SetStateAction<Filter>
> | null>(null);

type Action =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'DELETE_TODO'; payload: { id: Todo['id'] } }
  | { type: 'TOGGLE_TODO_STATUS'; payload: { id: Todo['id'] } }
  | { type: 'UPDATE_TODO_TITLE'; payload: { id: Todo['id']; title: string } };

const reducer = (state: Todo[], action: Action) => {
  if (action.type === 'ADD_TODO') {
    return [...state, { ...action.payload }];
  }

  if (action.type === 'SET_TODOS') {
    return action.payload;
  }

  if (action.type === 'DELETE_TODO') {
    return state.filter(todo => todo.id !== action.payload.id);
  }

  if (action.type === 'TOGGLE_TODO_STATUS') {
    const targetTodoIndex = state.findIndex(todo => {
      return todo.id === action.payload.id;
    });
    const targetTodo = state[targetTodoIndex];

    if (!targetTodo) {
      return state;
    }

    return [
      ...state.slice(0, targetTodoIndex),
      { ...targetTodo, completed: !targetTodo?.completed },
      ...state.slice(targetTodoIndex + 1),
    ];
  }

  if (action.type === 'UPDATE_TODO_TITLE') {
    const targetTodoIndex = state.findIndex(todo => {
      return todo.id === action.payload.id;
    });
    const targetTodo = state[targetTodoIndex];

    if (!targetTodo) {
      return state;
    }

    return [
      ...state.slice(0, targetTodoIndex),
      { ...targetTodo, title: action.payload.title },
      ...state.slice(targetTodoIndex + 1),
    ];
  }

  return state;
};

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const { getTodosFromLS, setTodosToLS } = useTodoLocalStorage();

  const [todos, dispatch] = useReducer(reducer, [], getTodosFromLS);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    setTodosToLS(todos);
  }, [todos, setTodosToLS]);

  return (
    <TodoContext.Provider value={todos}>
      <TodoContextDispatch.Provider value={dispatch}>
        <TodoFilterContext.Provider value={filter}>
          <TodoFilterContextDispatch.Provider value={setFilter}>
            {children}
          </TodoFilterContextDispatch.Provider>
        </TodoFilterContext.Provider>
      </TodoContextDispatch.Provider>
    </TodoContext.Provider>
  );
};
