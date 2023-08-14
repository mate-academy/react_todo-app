import React, { useReducer } from 'react';
import { todos } from './Data/todos';
import { Todo } from './Types/Todo';

interface State {
  todos: Todo[],
  value: string,
  todosCompleted: boolean,
  selectedAll: boolean,
  showActiveTodos: boolean,
  selectedCompleted: boolean,
  edit: number,
}

type Action = { type: 'addTodo', payLoad: string }
| { type: 'changeValue', payLoad: string }
| { type: 'toggleTodosCompleted' }
| { type: 'changeTodosCompletedTrue' }
| { type: 'changeTodosCompletedFalse' }
| { type: 'selectedAll' }
| { type: 'selectedActive' }
| { type: 'selectedCompleted' }
| { type: 'todoCompleted', payLoad: Todo }
| { type: 'removeTodo', payLoad: Todo }
| { type: 'removeTodosCompleted' }
| { type: 'edit', payLoad: Todo }
| { type: 'saveNewTitleTodo', payLoad: Todo, newTitle: string }
| { type: 'removeEdit' };

function reducer(state: State, action: Action): State {
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

    case 'toggleTodosCompleted':
      return {
        ...state,
        todosCompleted: !state.todosCompleted,
      };

    case 'changeTodosCompletedFalse': {
      const changeTodos = state.todos.map(todo => {
        return { ...todo, completed: false };
      });

      return {
        ...state,
        todos: [...changeTodos],
      };
    }

    case 'changeTodosCompletedTrue': {
      const changeTodos = state.todos.map(todo => {
        return { ...todo, completed: true };
      });

      return {
        ...state,
        todos: [...changeTodos],
      };
    }

    case 'selectedAll':
      return {
        ...state,
        selectedAll: true,
        showActiveTodos: false,
        selectedCompleted: false,
      };

    case 'selectedActive':
      return {
        ...state,
        showActiveTodos: true,
        selectedAll: false,
        selectedCompleted: false,
      };

    case 'selectedCompleted':
      return {
        ...state,
        selectedCompleted: true,
        selectedAll: false,
        showActiveTodos: false,
      };

    case 'todoCompleted': {
      const changeOneTodo = state.todos.map(todo => {
        if (todo.id === action.payLoad.id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });

      return {
        ...state,
        todos: [...changeOneTodo],
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

    case 'removeTodosCompleted': {
      const onlyNotCompleted = state.todos
        .filter(todo => todo.completed === false);

      return {
        ...state,
        todos: [...onlyNotCompleted],
      };
    }

    case 'edit':
      return {
        ...state,
        edit: action.payLoad.id,
      };

    case 'saveNewTitleTodo': {
      const changeTitleTodo = state.todos.map(todo => {
        if (todo.id === action.payLoad.id) {
          return { ...todo, title: action.newTitle };
        }

        return todo;
      });

      return {
        ...state,
        edit: 0,
        todos: [...changeTitleTodo],
      };
    }

    case 'removeEdit':
      return {
        ...state,
        edit: 0,
      };

    default:
      return state;
  }
}

const initialState: State = {
  todos,
  value: '',
  todosCompleted: false,
  selectedAll: false,
  showActiveTodos: false,
  selectedCompleted: false,
  edit: 0,
};

export const TodosContext = React.createContext(initialState);
/* eslint-disable */
export const DispatchContext = React.createContext((_action: Action) => {});
/* eslint-enable */

type Props = {
  children: React.ReactNode,
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={state}>
        {children}
      </TodosContext.Provider>
    </DispatchContext.Provider>
  );
};
