import React, { Dispatch, ReactNode, createContext, useReducer } from 'react';
import { TodoInterface, ActionInTodoContextReducer } from '../utils/';

// This interface is used only in this parte of code, general interfaces are in ~./utils dir
interface TodoContextInterface {
  state: TodoInterface[];
  dispatch: Dispatch<ActionInTodoContextReducer>;
}

// This 'undefined' context is related to flexibility to create many providers as possible to this Context.
export const TodoContext = createContext<TodoContextInterface | undefined>(
  undefined,
);

// More eficient way is use an Object with keys: ActionInTodoContextReducer and value: () => void;
const reducer = (
  state: TodoInterface[],
  action: ActionInTodoContextReducer,
): TodoInterface[] => {
  const { type, payload } = action;
  const copyState = state.map(e => {
    return { ...e };
  });

  switch (type) {
    case 'SAVE':
      copyState.push({
        id: +new Date(),
        title: payload!.content!.trim(),
        completed: false,
      });
      break;
    case 'DELETE':
      copyState.splice(payload!.idx, 1);
      break;
    case 'UPDATESTATUS':
      copyState[payload!.idx].completed = !copyState[payload!.idx].completed;
      break;
    case 'UPDATETITLE':
      copyState[payload!.idx].title = payload!.content!.trim();
      break;
    case 'CLEARCOMPLETEDTODOS':
      const clearTodos = copyState.filter(e => !e.completed);

      localStorage.setItem('todos', JSON.stringify(clearTodos));

      return clearTodos.map(e => {
        return { ...e };
      });
      break;
    case 'COMPLETETODOS':
      const all = copyState.some(e => e.completed === false);

      if (all) {
        copyState.forEach((el, idx) => {
          if (el.completed === false) {
            copyState[idx].completed = true;
          }
        });
      } else {
        copyState.forEach((_, idx) => {
          copyState[idx].completed = false;
        });
      }

      break;
    default:
      return [...copyState];
  }

  localStorage.setItem('todos', JSON.stringify(copyState));

  return copyState;
};

export const TodoContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const checkData = localStorage.getItem('todos');

  if (checkData === null) {
    localStorage.setItem('todos', '[]');
  }

  const initalData = JSON.parse(localStorage.getItem('todos')!);
  const [state, dispatch] = useReducer(reducer, initalData);

  return (
    <TodoContext.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
