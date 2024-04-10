/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FormEvent, useReducer } from 'react';
import { Todo } from '../types/types';

type Action =
  | { type: 'allComplate' }
  | { type: 'onSubmit'; event: FormEvent<HTMLFormElement> }
  | { type: 'setQuery'; value: string }
  | { type: 'checked'; currentId: number }
  | { type: 'edit'; currentId: number }
  | { type: 'setNewTitle'; value: string; currentId: number }
  | { type: 'editSubmit'; event?: FormEvent<HTMLFormElement>; currentId: number }
  | { type: 'delete'; currentId: number }
  | { type: 'filterAll' }
  | { type: 'filterActive' }
  | { type: 'filterComplate' }
  | { type: 'clearComplate' }
  | { type: 'inputHeaderFocus'}
  | { type: 'escape' , key: string; currentId: number };

interface State {
  todos: Todo[];
  filterTodos: Todo[];
  allComplate: boolean;
  query: string;
  checked: boolean;
  currentId: number;
  all: boolean;
  complate: boolean;
  active: boolean;
  focusTodo: boolean;
  prevTitle: string;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'allComplate':
      const complateTodos = state.todos.map(todo => ({
        ...todo,
        complate: true,
      }));

      const unComplateTodos = state.todos.map(todo => ({
        ...todo,
        complate: false,
      }));

      const hasComplate = state.allComplate ? false : true;
      const hasAllComplate = hasComplate ? complateTodos : unComplateTodos;

      return {
        ...state,
        todos: hasAllComplate,
        filterTodos: state.active
          ? hasAllComplate.filter(todo => !todo.complate)
          : hasAllComplate.filter(todo => todo.complate),
        allComplate: hasAllComplate.every(todo => todo.complate),
      };

    case 'setQuery':
      return {
        ...state,
        query: action.value,
      };

    case 'onSubmit':
      action.event.preventDefault();

      if (!state.query.trim()) {
        return state;
      }

      const newTodo: Todo = {
        text: state.query.trim(),
        id: +new Date(),
        complate: false,
        edit: false,
        editTitle: 'newTitle',
      };

      const addTodo = [...state.todos, newTodo];

      return {
        ...state,
        query: '',
        todos: addTodo,
        filterTodos: state.active
          ? addTodo.filter(todo => !todo.complate)
          : addTodo.filter(todo => todo.complate),
        allComplate: addTodo.every(todo => todo.complate),
        prevTitle: state.query.trim(),
      };

    case 'editSubmit':
      let prevText = '';

      const editTitle = state.todos.map(todo => {
        if (todo.id === action.currentId) {
          return { ...todo, edit: false };
        }

        prevText = todo.text;

        return todo;
      });

      const emptyFilter = editTitle.filter(todo => todo.text);

      return {
        ...state,
        todos: emptyFilter,
        filterTodos: state.active
          ? emptyFilter.filter(todo => !todo.complate)
          : emptyFilter.filter(todo => todo.complate),
        currentId: action.currentId,
        focusTodo: true,
        prevTitle: prevText,
      };

    case 'checked':
      const updatedTodos = state.todos.map(todo => {
        if (todo.id === action.currentId) {
          return !todo.complate
            ? { ...todo, complate: true }
            : { ...todo, complate: false };
        }

        return todo;
      });

      const allTodosComplete = updatedTodos.every(todo => todo.complate);

      return {
        ...state,
        todos: updatedTodos,
        allComplate: allTodosComplete,
        filterTodos: state.active
          ? updatedTodos.filter(todo => !todo.complate)
          : updatedTodos.filter(todo => todo.complate),
        currentId: action.currentId,
      };

    case 'edit':
      const editTodos = state.todos.map(todo => {
        if (todo.id === action.currentId) {
          return { ...todo, edit: true };
        }

        return todo;
      });

      return {
        ...state,
        todos: editTodos,
        filterTodos: state.active
          ? editTodos.filter(todo => !todo.complate)
          : editTodos.filter(todo => todo.complate),
        currentId: action.currentId,
      };

    case 'setNewTitle':
      const changeTodo =  state.todos.map(todo => {
        if (todo.id === action.currentId) {
          return { ...todo, text: action.value };
        }

        return todo;
      });

      return {
        ...state,
        todos: changeTodo,
      };

    case 'delete':
      const deleteTodo = state.todos.filter(
        todo => todo.id !== action.currentId,
      );

      return {
        ...state,
        todos: deleteTodo,
        filterTodos: state.active
          ? deleteTodo.filter(todo => !todo.complate)
          : deleteTodo.filter(todo => todo.complate),
        currentId: action.currentId,
        allComplate: deleteTodo.every(todo => todo.complate),
      };

    case 'filterAll':
      return {
        ...state,
        all: true,
        complate: false,
        active: false,
      };

    case 'filterActive':
      const filterActive = state.todos.filter(todo => !todo.complate);

      return {
        ...state,
        active: true,
        all: false,
        complate: false,
        filterTodos: filterActive,
      };

    case 'filterComplate':
      const filterComplate = state.todos.filter(todo => todo.complate);

      return {
        ...state,
        complate: true,
        active: false,
        all: false,
        filterTodos: filterComplate,
      };

    case 'clearComplate':
      const deleteComplate = state.todos.filter(todo => !todo.complate);

      return {
        ...state,
        allComplate: false,
        todos: deleteComplate,
        filterTodos: state.active
          ? deleteComplate.filter(todo => !todo.complate)
          : deleteComplate.filter(todo => todo.complate),
        focusTodo: true,
      };

    case 'inputHeaderFocus':
      return {
        ...state,
        focusTodo: false,
      };

    case 'escape':
      if (action.key === 'Escape') {
        const disable = state.todos.map(todo => {
          if (todo.id === action.currentId) {
            return { ...todo, text: state.prevTitle, edit: false };
          }

          return todo;
        });

        return {
          ...state,
          todos: disable,
          filterTodos: state.active
            ? disable.filter(todo => !todo.complate)
            : disable.filter(todo => todo.complate),
          currentId: action.currentId,
          focusTodo: false,
        };
      }

      return state;
  }
}

const initialState: State = {
  todos: [],
  filterTodos: [],
  allComplate: false,
  query: '',
  checked: false,
  currentId: 0,
  all: true,
  complate: false,
  active: false,
  focusTodo: true,
  prevTitle: '',
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const GlobelStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
