import React, { useEffect, useReducer } from 'react';
import { Todo } from '../Types/Todo';

export const todos: Todo[] = [];

interface State {
  todos: Todo[],
  value: string,
  todosCompleted: boolean,
  filterActive: boolean,
  selectedCompleted: boolean,
  selectedAll: boolean,
  edit: number,
}

type Action = { type: 'addTodo', payLoad: string }
| { type: 'changeValue', payLoad: string }
| { type: 'toggleCompleted' }
| { type: 'filterActive' }
| { type: 'selectedCompleted' }
| { type: 'changeTotoCompletedTrue' }
| { type: 'changeTodoCompletedFalse' }
| { type: 'selectedAll' }
| { type: 'todoCompleted', payLoad: Todo }
| { type: 'removeTodo', payLoad: Todo }
| { type: 'edit', payLoad: Todo }
| { type: 'newTitleTodo', payLoad: Todo, newTitle: string }
| { type: 'removeEdit' }
| { type: 'clearCompleted' };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: +new Date(),
            title: action.payLoad,
            completed: false,
          },
        ],
      };

    case 'changeValue':
      return {
        ...state,
        value: action.payLoad,
      };

    case 'toggleCompleted':
      return {
        ...state,
        todosCompleted: !state.todosCompleted,
      };

    case 'changeTotoCompletedTrue': {
      const newTodos = state.todos.map(todo => {
        return { ...todo, completed: true };
      });

      return {
        ...state,
        todos: newTodos,
      };
    }

    case 'changeTodoCompletedFalse': {
      const newTodos = state.todos.map(todo => {
        return { ...todo, completed: false };
      });

      return {
        ...state,
        todos: newTodos,
      };
    }

    case 'todoCompleted': {
      const changeTodo = state.todos.map(todo => {
        if (todo.id === action.payLoad.id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });

      return {
        ...state,
        todos: [...changeTodo],
      };
    }

    case 'removeTodo': {
      const copyTodos = [...state.todos];
      const index = copyTodos.indexOf(action.payLoad);

      copyTodos.splice(index, 1);

      return {
        ...state,
        todos: [...copyTodos],
      };
    }

    case 'edit': {
      return {
        ...state,
        edit: action.payLoad.id,
      };
    }

    case 'newTitleTodo': {
      const changeTitle = state.todos.map(todo => {
        if (todo.id === action.payLoad.id) {
          return { ...todo, title: action.newTitle };
        }

        return todo;
      });

      return {
        ...state,
        edit: 0,
        todos: [...changeTitle],
      };
    }

    case 'removeEdit': {
      return {
        ...state,
        edit: 0,
      };
    }

    case 'selectedAll': {
      return {
        ...state,
        selectedAll: true,
        filterActive: false,
        selectedCompleted: false,
      };
    }

    case 'filterActive': {
      return {
        ...state,
        filterActive: true,
        selectedAll: false,
        selectedCompleted: false,
      };
    }

    case 'selectedCompleted': {
      return {
        ...state,
        selectedCompleted: true,
        selectedAll: false,
        filterActive: false,
      };
    }

    case 'clearCompleted': {
      const todosNotCompleted = state.todos
        .filter(todo => todo.completed === false);

      return {
        ...state,
        todos: [...todosNotCompleted],
      };
    }

    default:
      return state;
  }
}

const initialState: State = {
  todos,
  value: '',
  todosCompleted: false,
  filterActive: false,
  selectedCompleted: false,
  selectedAll: false,
  edit: 0,
};

export function useLocalStorage(key: string, startValue: State): [State, React.Dispatch<Action>] {
  const storedValue
    = JSON.parse(localStorage.getItem(key)
    || JSON.stringify(startValue));

  const [store, dispatch] = useReducer(reducer, storedValue);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(store))
  }, [key, store]);

  return [store, dispatch];
}

export const TodoContext = React.createContext(initialState);
/* eslint-disable */
export const DispatchContext = React.createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode;
};


export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useLocalStorage('todos', initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodoContext.Provider value={state}>
        {children}
      </TodoContext.Provider>
    </DispatchContext.Provider>
  );
};
