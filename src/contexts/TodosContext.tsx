import React, { createContext, useReducer } from 'react';

interface ITodo {
  id: number;
  completed: boolean;
  title: string;
}

type InitialStateType = {
  todos: ITodo[];
};

const initialState = {
  todos: [],
};

type Action = { type: 'ADD_TODO_ITEM'; title: string } |
{ type: 'REMOVE_TODO_ITEM', id: number } |
{ type: 'MARK_ALL_AS_COMPLETED' } |
{ type: 'SAVE_EDITED_TITLE', title: string, id: number };

export const todosReducer = (state: InitialStateType, action: Action) => {
  switch (action.type) {
    case 'ADD_TODO_ITEM':
      return {
        ...state,
        todos: state.todos.concat({
          title: action.title,
          completed: false,
          id:
            state.todos.length > 0
              ? Math.max(...state.todos.map((elem) => elem.id)) + 1
              : 1,
        }),
      };

    case 'SAVE_EDITED_TITLE':
      return {
        ...state,
        todos: state.todos.map((todo) => (
          todo.id === action.id
            ? { ...todo, title: action.title }
            : todo
        )),
      };

    case 'REMOVE_TODO_ITEM':

      return {
        ...state,
        todos: state.todos.filter((todoItem) => todoItem.id !== action.id),
      };

    case 'MARK_ALL_AS_COMPLETED':
      return {
        ...state,
        todos: state.todos.map((todo) => !todo.completed),
      };

    default:
      return state;
  }
};

export const TodosContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const Provider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
