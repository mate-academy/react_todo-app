import React, { useReducer, useEffect } from 'react';
import { Action, Status, State } from '../../types';

function reducer(state: State, action: Action): State {
  const { todoList } = state;
  const isComplete = todoList.some(item => !item.completed);

  switch (action.type) {
    case 'add':
      return {
        ...state,
        todoList: [
          ...todoList,
          { id: +new Date(), title: action.payload, completed: false },
        ],
      };

    case 'isComplete':
      return {
        ...state,
        todoList: todoList.map(todo => {
          return todo.id === action.id
            ? { ...todo, completed: action.payload }
            : { ...todo };
        }),
      };

    case 'isCompleteAll':
      return {
        ...state,
        todoList: todoList.map(todo => {
          return {
            ...todo,
            completed: isComplete,
          };
        }),
      };

    case 'deleteTodo':
      return {
        ...state,
        todoList: todoList.filter(todo => todo.id !== action.id),
      };

    case 'editTodo':
      return {
        ...state,
        todoList: todoList.map(todo => {
          return todo.id === action.id
            ? { ...todo, title: action.newTodoTitle }
            : { ...todo };
        }),
      };

    case 'deleteAllCompleted':
      return {
        ...state,
        todoList: todoList.filter(todo => !todo.completed),
      };

    case 'filter':
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
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
    return {
      todoList: JSON.parse(data),
      filter: Status.all,
    };
  } catch {
    return startState;
  }
}

// const initialState: State = {
//   todos: JSON.parse(localStorage.getItem('todos') || '[]'),
//   filter: StatusType.All,
// };

export const StateContext = React.createContext(getState());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((_action: Action) => { });

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  // если в качестве стартового значения в useReducer передать функцию
  // const [state, dispatch] = useReducer(reducer, getState()); - то она будет вызываться при каждом рендере
  // (будет вызываться в холостую, а значение будет присваиваться только при первом рендере)
  // что бы этого избежать вторым аргументом передаем null, а третим функцию без вызова
  const [state, dispatch] = useReducer(reducer, null, getState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todoList));
  }, [state.todoList]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
