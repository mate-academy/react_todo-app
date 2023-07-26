import React, { useReducer, useEffect } from 'react';
import { Action, Status, State } from '../../types';

function reducer(state: State, action: Action): State {
  let { todoList, filter } = { ...state };
  const isComplete = todoList.some(item => !item.completed);

  switch (action.type) {
    case 'add':
      todoList = [
        ...todoList,
        { id: +new Date(), title: action.payload, completed: false },
      ];
      break;

    case 'isComplete':
      todoList = todoList.map(todo => {
        return todo.id === action.id
          ? { ...todo, completed: action.payload }
          : { ...todo };
      });
      break;

    case 'isCompleteAll':
      todoList = todoList.map(todo => {
        return {
          ...todo,
          completed: isComplete,
        };
      });
      break;

    case 'deleteTodo':
      todoList = todoList.filter(todo => todo.id !== action.id);
      break;

    case 'editTodo':
      todoList = todoList.map(todo => {
        return todo.id === action.id
          ? { ...todo, title: action.newTodoTitle }
          : { ...todo };
      });
      break;

    case 'deleteAllCompleted':
      todoList = todoList.filter(todo => !todo.completed);
      break;

    case 'filter':
      filter = action.payload;
      break;

    default:
      return state;
  }

  return { todoList, filter };
}

function getState(): State {
  const data = localStorage.getItem('todos');
  const startState = {
    todoList: [],
    filter: Status.all,
  };

  if (data === null) {
    return startState;
  }

  try {
    return JSON.parse(data);
  } catch {
    return startState;
  }
}

export const StateContext = React.createContext(getState());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getState());

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
