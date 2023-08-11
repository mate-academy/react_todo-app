import React, { useReducer } from 'react';
import { todos } from './Data/todos';
import { Todo } from './Types/Todo';

interface State {
  todos: Todo[],
  value: string,
  todosCompleted: boolean,
  selectedAll: boolean,
  selectedActive: boolean,
  selectedCompleted: boolean,
  edit: number,
  newTitle: string,
}

type Action = { type: 'addTodo', payLoad: string }
| { type: 'changeValue', payLoad: string }
| { type: 'todosCompleted' }
| { type: 'changeTodosCompletedTrue' }
| { type: 'changeTodosCompletedFalse' }
| { type: 'selectedAll' }
| { type: 'selectedActive' }
| { type: 'selectedCompleted' }
| { type: 'todoCompleted', payLoad: Todo }
| { type: 'removeTodo', payLoad: Todo }
| { type: 'removeTodosCompleted' }
| { type: 'edit', payLoad: Todo }
| { type: 'changeTitleTodo', payLoad: string }
| { type: 'saveNewTitleTodo', payLoad: Todo }
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

    case 'todosCompleted':
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
        selectedActive: false,
        selectedCompleted: false,
      };

    case 'selectedActive':
      return {
        ...state,
        selectedActive: true,
        selectedAll: false,
        selectedCompleted: false,
      };

    case 'selectedCompleted':
      return {
        ...state,
        selectedCompleted: true,
        selectedAll: false,
        selectedActive: false,
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
      const removeTodo = copyTodos.splice(index, 1);

      window.console.log(removeTodo);

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
        newTitle: action.payLoad.title,
      };

    case 'changeTitleTodo':
      return {
        ...state,
        newTitle: action.payLoad,
      };

    case 'saveNewTitleTodo': {
      const changeTitleTodo = state.todos.map(todo => {
        if (todo.id === action.payLoad.id) {
          return { ...todo, title: state.newTitle };
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
  selectedActive: false,
  selectedCompleted: false,
  edit: 0,
  newTitle: '',
};

export const TodosContext = React.createContext(initialState);
export const DispatchContext = React.createContext((action: Action) => {});

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
